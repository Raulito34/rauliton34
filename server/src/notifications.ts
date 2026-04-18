/**
 * Booking Notifications Module
 * ─────────────────────────────────────────────
 * Fires webhook notifications to one or more of:
 *   - Slack           (SLACK_WEBHOOK_URL)
 *   - Kakao Work      (KAKAO_WEBHOOK_URL)
 *   - Discord         (DISCORD_WEBHOOK_URL)
 *   - Generic JSON    (GENERIC_WEBHOOK_URL)
 *
 * Each platform is optional — set only the ones you use.
 * Failures are logged but never throw (never block booking save).
 */

export type BookingNotificationData = {
  id: number | string;
  spaceName: string;
  applicantName: string;
  organization?: string | null;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
  purpose: string;
  message?: string | null;
  createdAt?: string;
};

const ADMIN_URL = process.env.ADMIN_URL || 'https://rauliton34.vercel.app/admin/rentals';

/* ══════════════════════════════════════════════════════
   HTTP POST helper (uses global fetch, Node 18+)
   ══════════════════════════════════════════════════════ */

async function postJSON(url: string, body: unknown): Promise<void> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Webhook ${url.slice(0, 40)}... returned ${res.status}`);
  }
}

/* ══════════════════════════════════════════════════════
   PLATFORM FORMATTERS
   ══════════════════════════════════════════════════════ */

/** Slack Block Kit payload */
function formatSlack(b: BookingNotificationData) {
  const fields: Array<{ type: 'mrkdwn'; text: string }> = [
    { type: 'mrkdwn', text: `*공간*\n${b.spaceName}` },
    { type: 'mrkdwn', text: `*기간*\n${b.startDate} — ${b.endDate}` },
    { type: 'mrkdwn', text: `*신청자*\n${b.applicantName}` },
    { type: 'mrkdwn', text: `*소속*\n${b.organization || '—'}` },
    { type: 'mrkdwn', text: `*이메일*\n<mailto:${b.email}|${b.email}>` },
    { type: 'mrkdwn', text: `*연락처*\n${b.phone}` },
  ];

  return {
    text: `🎨 새 대관 신청 — ${b.spaceName} (${b.applicantName})`,
    blocks: [
      { type: 'header', text: { type: 'plain_text', text: '🎨 새 대관 신청' } },
      { type: 'section', fields },
      { type: 'section', text: { type: 'mrkdwn', text: `*목적*\n${b.purpose}` } },
      ...(b.message
        ? [{ type: 'section', text: { type: 'mrkdwn', text: `*상세*\n${b.message.slice(0, 1800)}` } }]
        : []),
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            style: 'primary',
            text: { type: 'plain_text', text: '관리자 페이지 열기' },
            url: ADMIN_URL,
          },
        ],
      },
      { type: 'context', elements: [{ type: 'mrkdwn', text: `신청 #${b.id}` }] },
    ],
  };
}

/** Kakao Work incoming webhook payload */
function formatKakaoWork(b: BookingNotificationData) {
  // Kakao Work supports simple markdown-like text + optional blocks
  const text =
    `🎨 *새 대관 신청*\n` +
    `━━━━━━━━━━━━━━━\n` +
    `*공간* · ${b.spaceName}\n` +
    `*기간* · ${b.startDate} — ${b.endDate}\n` +
    `*신청자* · ${b.applicantName}${b.organization ? ` (${b.organization})` : ''}\n` +
    `*이메일* · ${b.email}\n` +
    `*연락처* · ${b.phone}\n` +
    `*목적* · ${b.purpose}\n` +
    (b.message ? `*상세* · ${b.message.slice(0, 500)}\n` : '') +
    `━━━━━━━━━━━━━━━\n` +
    `관리자 페이지: ${ADMIN_URL}\n` +
    `신청 번호: #${b.id}`;

  return { text };
}

/** Discord embed payload */
function formatDiscord(b: BookingNotificationData) {
  const fields: Array<{ name: string; value: string; inline?: boolean }> = [
    { name: '공간', value: b.spaceName, inline: true },
    { name: '기간', value: `${b.startDate} — ${b.endDate}`, inline: true },
    {
      name: '신청자',
      value: `${b.applicantName}${b.organization ? ` (${b.organization})` : ''}`,
      inline: false,
    },
    { name: '이메일', value: b.email, inline: true },
    { name: '연락처', value: b.phone, inline: true },
    { name: '목적', value: b.purpose || '—', inline: false },
  ];
  if (b.message) fields.push({ name: '상세', value: b.message.slice(0, 1024), inline: false });

  return {
    username: 'Sun Art Center',
    embeds: [
      {
        title: '🎨 새 대관 신청',
        color: 0x1a1a1a,
        fields,
        footer: { text: `신청 #${b.id}` },
        timestamp: b.createdAt || new Date().toISOString(),
        url: ADMIN_URL,
      },
    ],
  };
}

/** Generic JSON payload for custom integrations (Zapier/Make/Railway webhook) */
function formatGeneric(b: BookingNotificationData) {
  return {
    event: 'rental.booking.created',
    booking: b,
    adminUrl: ADMIN_URL,
    timestamp: new Date().toISOString(),
  };
}

/* ══════════════════════════════════════════════════════
   PUBLIC: notifyNewBooking
   Fires all configured webhooks in parallel; never throws.
   ══════════════════════════════════════════════════════ */

export async function notifyNewBooking(booking: BookingNotificationData): Promise<void> {
  const tasks: Array<Promise<void>> = [];

  const slack = process.env.SLACK_WEBHOOK_URL;
  if (slack) {
    tasks.push(
      postJSON(slack, formatSlack(booking)).catch((err) =>
        console.error('[notify][slack]', err instanceof Error ? err.message : err),
      ),
    );
  }

  const kakao = process.env.KAKAO_WEBHOOK_URL;
  if (kakao) {
    tasks.push(
      postJSON(kakao, formatKakaoWork(booking)).catch((err) =>
        console.error('[notify][kakao]', err instanceof Error ? err.message : err),
      ),
    );
  }

  const discord = process.env.DISCORD_WEBHOOK_URL;
  if (discord) {
    tasks.push(
      postJSON(discord, formatDiscord(booking)).catch((err) =>
        console.error('[notify][discord]', err instanceof Error ? err.message : err),
      ),
    );
  }

  const generic = process.env.GENERIC_WEBHOOK_URL;
  if (generic) {
    tasks.push(
      postJSON(generic, formatGeneric(booking)).catch((err) =>
        console.error('[notify][generic]', err instanceof Error ? err.message : err),
      ),
    );
  }

  if (tasks.length === 0) {
    console.log('[notify] No webhook configured; skipping notification.');
    return;
  }

  await Promise.allSettled(tasks);
  console.log(`[notify] Sent ${tasks.length} webhook(s) for booking #${booking.id}`);
}

/* ══════════════════════════════════════════════════════
   OPTIONAL: notify booking status change (approved/rejected)
   ══════════════════════════════════════════════════════ */

export async function notifyStatusChange(
  booking: BookingNotificationData,
  newStatus: string,
): Promise<void> {
  const statusLabel: Record<string, string> = {
    approved: '✅ 승인',
    confirmed: '✅ 확정',
    cancelled: '❌ 취소',
    rejected: '❌ 거절',
  };
  const label = statusLabel[newStatus] || newStatus;

  const tasks: Array<Promise<void>> = [];

  const slack = process.env.SLACK_WEBHOOK_URL;
  if (slack) {
    tasks.push(
      postJSON(slack, {
        text: `${label} — ${booking.spaceName} (${booking.applicantName}) · ${booking.startDate} — ${booking.endDate}`,
      }).catch((err) => console.error('[notify][slack][status]', err)),
    );
  }

  const kakao = process.env.KAKAO_WEBHOOK_URL;
  if (kakao) {
    tasks.push(
      postJSON(kakao, {
        text: `${label}\n${booking.spaceName} (${booking.applicantName})\n${booking.startDate} — ${booking.endDate}`,
      }).catch((err) => console.error('[notify][kakao][status]', err)),
    );
  }

  await Promise.allSettled(tasks);
}
