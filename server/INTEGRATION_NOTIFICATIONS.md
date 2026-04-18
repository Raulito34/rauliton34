# 알림 봇 통합 가이드

예약 신청이 들어올 때 슬랙/카카오 워크/디스코드로 자동 알림을 받기 위한 3단계 가이드입니다.

---

## 1단계. 서버 코드 2줄 추가

`server/src/index.ts` 파일을 열고 아래 두 군데만 수정합니다.

### (A) 파일 상단에 import 추가

**파일 최상단의 import 블록**에 한 줄 추가:

```ts
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { notifyNewBooking, notifyStatusChange } from './notifications';  // ← 이 줄 추가
```

### (B) `POST /api/rentals` 엔드포인트에 알림 호출 추가

`app.post('/api/rentals', ...)` 블록을 찾아서 **Prisma create 직후**에 알림 호출을 끼워넣습니다.

**기존 코드 (대략 이런 형태):**
```ts
app.post('/api/rentals', async (req, res) => {
  const booking = await prisma.rental.create({
    data: {
      spaceName: req.body.spaceName,
      applicantName: req.body.applicantName,
      // ... 기타 필드
    },
  });
  res.json(booking);
});
```

**수정 후:**
```ts
app.post('/api/rentals', async (req, res) => {
  const booking = await prisma.rental.create({
    data: {
      spaceName: req.body.spaceName,
      applicantName: req.body.applicantName,
      // ... 기타 필드
    },
  });

  // ↓ 이 한 줄 추가 — await 하지 않음으로써 응답 지연 없음
  notifyNewBooking(booking).catch(err => console.error('notify failed:', err));

  res.json(booking);
});
```

### (C) (선택) 상태 변경 시 알림

`PATCH /api/rentals/:id` 핸들러에서 status가 바뀔 때도 알림:

```ts
if (req.body.status && req.body.status !== existing.status) {
  notifyStatusChange(updated, req.body.status).catch(() => {});
}
```

---

## 2단계. 환경 변수 설정

Railway 대시보드에서 사용하실 플랫폼의 Webhook URL만 추가하시면 됩니다. **전부 설정하실 필요 없고, 하나만 해도 됩니다.**

| 환경 변수 | 설명 | 필수 |
|----------|------|------|
| `SLACK_WEBHOOK_URL` | 슬랙 채널 incoming webhook | 선택 |
| `KAKAO_WEBHOOK_URL` | 카카오 워크 incoming webhook | 선택 |
| `DISCORD_WEBHOOK_URL` | 디스코드 채널 webhook | 선택 |
| `GENERIC_WEBHOOK_URL` | 커스텀 (Zapier/Make/n8n 등) | 선택 |
| `ADMIN_URL` | 관리자 페이지 URL (기본값: `https://rauliton34.vercel.app/admin/rentals`) | 선택 |

설정 방법: Railway 프로젝트 → `Variables` 탭 → `New Variable`

---

## 3단계. 플랫폼별 Webhook URL 발급 방법

### 🔵 슬랙 (Slack) — 가장 쉬움, 5분 세팅

1. https://api.slack.com/apps → **Create New App** → "From scratch"
2. 앱 이름: `Sun Art Center`, 워크스페이스 선택
3. 왼쪽 메뉴 **Incoming Webhooks** → 활성화
4. **Add New Webhook to Workspace** → 알림 받을 채널 선택 (예: `#대관알림`)
5. 생성된 URL 복사 (형태: `https://hooks.slack.com/services/T.../B.../...`)
6. Railway Variables에 `SLACK_WEBHOOK_URL` 로 저장

### 🟡 카카오 워크 (Kakao Work)

1. 카카오 워크 앱 접속 → **관리자 콘솔** (web.kakaowork.com/admin)
2. **빌더 → 커스텀 앱** → 새 앱 생성
3. **Incoming Webhook** 활성화 → 알림 받을 채널 선택
4. 발급된 URL을 Railway `KAKAO_WEBHOOK_URL` 로 저장

> **참고**: 카카오톡(개인용)이 아닌 **카카오 워크(업무용)** 입니다. 개인 카톡으로 직접 알림 받으려면 카카오톡 비즈메시지(알림톡) API가 필요하며 사업자 등록이 필요합니다.

### 🟣 디스코드 (Discord) — 개인/소규모팀 추천

1. 서버 설정 → **채널 편집** → **통합** → **웹후크** → **새 웹후크**
2. 이름: `대관 알림`, 채널 선택
3. **웹후크 URL 복사**
4. Railway `DISCORD_WEBHOOK_URL` 로 저장

### 🔧 커스텀 (Zapier / Make / n8n)

- Zapier/Make에서 Webhook trigger 만들고 URL 복사
- Railway `GENERIC_WEBHOOK_URL` 로 저장
- 이메일, SMS, 노션 DB 등 거의 모든 후속 액션 연결 가능

---

## 4단계. 테스트

### 로컬 테스트
```bash
cd server
npm install
# .env 파일에 webhook URL 추가 후
npm run dev
```

다른 터미널에서:
```bash
curl -X POST http://localhost:4000/api/rentals \
  -H "Content-Type: application/json" \
  -d '{
    "spaceName":"2F 2전시관",
    "applicantName":"테스트",
    "email":"test@example.com",
    "phone":"010-0000-0000",
    "startDate":"2026-06-01",
    "endDate":"2026-06-07",
    "purpose":"테스트 신청",
    "message":"알림 작동 확인"
  }'
```

해당 채널에 알림이 도착하면 성공.

### 프로덕션 테스트
실제 사이트 `/rental/apply` 에서 테스트 신청을 한 건 넣어보고 알림 도착 확인.

---

## 알림 예시

**슬랙** (Block Kit으로 깔끔한 카드 UI)
```
🎨 새 대관 신청
━━━━━━━━━━━━━━━
공간: 2F 2전시관         기간: 2026.06.01 — 2026.06.07
신청자: 김작가            소속: 홍대 미술대학
이메일: artist@example.com  연락처: 010-0000-0000
목적: 개인전
상세: 회화 20점 설치 예정...
[ 관리자 페이지 열기 ]
```

**카카오 워크** (텍스트 베이스, 구분선 있음)
```
🎨 새 대관 신청
━━━━━━━━━━━━━━━
공간 · 2F 2전시관
기간 · 2026.06.01 — 2026.06.07
신청자 · 김작가 (홍대 미술대학)
이메일 · artist@example.com
...
```

**디스코드** (임베드 카드)
```
┌─────────────────────┐
│ 🎨 새 대관 신청      │
│ ──────────────────  │
│ 공간: 2F 2전시관     │
│ 기간: 06.01 — 06.07 │
│ ...                 │
│ #42 · 10분 전        │
└─────────────────────┘
```

---

## 트러블슈팅

**Q. 신청은 성공하는데 알림이 안 와요.**
- Railway 로그 확인: `[notify]` 로 시작하는 라인 찾기
- `[notify] No webhook configured` → 환경변수 미설정
- `[notify][slack] 401` → Webhook URL 만료/잘못됨
- `[notify] Sent N webhook(s)` 보이면 URL은 발송된 것이므로 해당 플랫폼에서 봇 권한 확인

**Q. 중복 알림이 와요.**
- Railway에서 `SLACK_WEBHOOK_URL` 등을 하나만 설정했는지 확인
- 여러 환경(production + staging)에서 같은 URL 쓰면 양쪽에서 발송됨

**Q. 알림이 느려요.**
- `notifyNewBooking(booking).catch(...)` 앞에 `await`를 붙이지 마세요 (응답 지연 방지)
- 슬랙/카카오 서버 지연은 무관 — 실제 API 응답 속도에 영향 없음

---

## 보안 주의사항

- **Webhook URL은 비밀키입니다.** Git에 커밋 금지, `.env` 는 `.gitignore`에 포함 확인
- 슬랙 webhook은 URL을 아는 사람은 누구든 메시지 발송 가능 (spam 방지 차원에서 유출 시 재발급 필수)
- 프로덕션에서는 환경변수를 Railway Variables UI 로만 관리
