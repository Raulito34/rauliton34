# 아트센터 웹사이트 기획안 (Art Center Website Plan)

## 프로젝트 개요
지하 1층 ~ 지상 4층 전시 공간을 보유한 아트센터의 대관 및 전시 안내 웹사이트

## 기술 스택
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Backend**: Node.js + Express
- **Database**: SQLite (개발) → PostgreSQL (운영)
- **ORM**: Prisma

---

## 사이트맵 (메뉴 구조)

```
메인(Home)
├── 센터소개 (About)
│   ├── 인사말 (Greeting)
│   ├── 건축/공간 소개 (Architecture)
│   ├── 오시는 길 (Location/Map)
│   └── 연혁 (History)
├── 전시안내 (Exhibition)
│   ├── 현재전시 (Current)
│   ├── 예정전시 (Upcoming)
│   └── 지난전시 (Past)
├── 공간안내 (Spaces)
│   ├── B1F - 제1전시관
│   ├── 1F - 제2전시관
│   ├── 2F - 제3전시관
│   ├── 3F - 제4전시관
│   └── 4F - 다목적홀/특별관
├── 대관안내 (Rental)
│   ├── 대관절차 (Procedure)
│   ├── 대관료 (Pricing)
│   ├── 대관규약 (Terms)
│   └── 대관신청 (Application Form)
├── 소식 (News)
│   ├── 공지사항 (Notice)
│   └── 아트센터 소식 (News)
└── 문의 (Contact)
```

---

## 구현 단계 (Step-by-Step)

### Step 1: 프로젝트 초기 설정
- Vite + React + TypeScript 프로젝트 생성
- Tailwind CSS 설정
- 프로젝트 폴더 구조 생성
- ESLint, Prettier 설정

```
art-center/
├── client/                 # Frontend
│   ├── src/
│   │   ├── components/     # 공통 컴포넌트
│   │   │   ├── layout/     # Header, Footer, Nav
│   │   │   ├── ui/         # Button, Card, Modal 등
│   │   │   └── common/     # 공통 유틸 컴포넌트
│   │   ├── pages/          # 페이지 컴포넌트
│   │   │   ├── Home/
│   │   │   ├── About/
│   │   │   ├── Exhibition/
│   │   │   ├── Spaces/
│   │   │   ├── Rental/
│   │   │   ├── News/
│   │   │   └── Contact/
│   │   ├── hooks/          # 커스텀 훅
│   │   ├── services/       # API 호출
│   │   ├── types/          # TypeScript 타입
│   │   ├── assets/         # 이미지, 폰트
│   │   └── styles/         # 글로벌 스타일
│   └── public/
├── server/                 # Backend
│   ├── src/
│   │   ├── routes/         # API 라우트
│   │   ├── controllers/    # 비즈니스 로직
│   │   ├── models/         # DB 모델
│   │   ├── middleware/     # 미들웨어
│   │   └── utils/          # 유틸리티
│   └── prisma/
│       └── schema.prisma   # DB 스키마
└── package.json
```

### Step 2: 데이터베이스 스키마 설계
- **Exhibition** (전시): id, title, artist, description, startDate, endDate, floor, images, status
- **Space** (공간): id, name, floor, area, height, capacity, description, images, features
- **Rental** (대관): id, spaceName, applicantName, org, email, phone, startDate, endDate, purpose, status
- **RentalPricing** (대관료): id, spaceId, periodType, price, notes
- **News** (소식): id, title, content, category, createdAt, thumbnail
- **Admin** (관리자): id, email, password, name, role

### Step 3: Backend API 구현
- **전시 API**: GET/POST/PUT/DELETE /api/exhibitions
- **공간 API**: GET /api/spaces, GET /api/spaces/:floor
- **대관 API**: POST /api/rentals (신청), GET /api/rentals (관리자)
- **대관료 API**: GET /api/pricing
- **소식 API**: GET/POST/PUT/DELETE /api/news
- **인증 API**: POST /api/auth/login (관리자)
- **문의 API**: POST /api/contact

### Step 4: Frontend - 공통 레이아웃
- Header (로고, 네비게이션, 모바일 햄버거 메뉴)
- Footer (연락처, 주소, SNS 링크, 저작권)
- 반응형 디자인 (모바일/태블릿/데스크톱)

### Step 5: Frontend - 메인 페이지
- 히어로 섹션 (풀스크린 이미지/슬라이더)
- 현재 전시 하이라이트
- 공간 소개 미리보기
- 공지사항/소식

### Step 6: Frontend - 센터소개 페이지
- 인사말 (대표 인사말, 미션/비전)
- 건축/공간 소개 (건물 전경, 설계 컨셉)
- 오시는 길 (지도 API 연동)
- 연혁 타임라인

### Step 7: Frontend - 전시안내 페이지
- 전시 목록 (카드형 그리드 레이아웃)
- 전시 상세 (이미지 갤러리, 작가 정보, 관람 정보)
- 현재/예정/지난 전시 탭 필터링

### Step 8: Frontend - 공간안내 페이지
- 층별 공간 소개 (B1F ~ 4F)
- 각 공간별 상세 정보 (면적, 천장고, 수용인원, 시설 특징)
- 공간 이미지 갤러리
- 3D 평면도 또는 도면

### Step 9: Frontend - 대관안내 페이지
- 대관절차 (스텝별 안내 인포그래픽)
- 대관료 (층별/기간별 요금표)
- 대관규약 (이용약관)
- 대관신청 폼 (날짜 선택, 공간 선택, 신청자 정보)

### Step 10: Frontend - 소식/문의 페이지
- 공지사항 게시판 (리스트 + 상세)
- 아트센터 소식 (리스트 + 상세)
- 문의 폼 (이름, 이메일, 전화, 내용)

### Step 11: 관리자 페이지 (Admin)
- 로그인
- 전시 관리 (CRUD)
- 대관 신청 관리 (승인/거절)
- 소식 관리 (CRUD)
- 대관료 설정

### Step 12: 배포 및 최적화
- 이미지 최적화 (lazy loading, WebP)
- SEO 메타태그
- 빌드 및 배포 설정

---

## 층별 전시공간 상세

| 층 | 공간명 | 용도 | 면적(예시) |
|---|---|---|---|
| B1F | 제1전시관 | 미디어아트/설치미술 | 200㎡ |
| 1F | 제2전시관 | 기획전시/회화 | 180㎡ |
| 2F | 제3전시관 | 개인전/그룹전 | 160㎡ |
| 3F | 제4전시관 | 사진/공예 | 150㎡ |
| 4F | 다목적홀 | 세미나/공연/특별전 | 200㎡ |

---

## 대관료 체계 (예시)

| 공간 | 1주 | 2주 | 3주 | 4주 |
|---|---|---|---|---|
| B1F 제1전시관 | 200만원 | 350만원 | 500만원 | 600만원 |
| 1F 제2전시관 | 250만원 | 450만원 | 600만원 | 750만원 |
| 2F 제3전시관 | 180만원 | 320만원 | 450만원 | 550만원 |
| 3F 제4전시관 | 170만원 | 300만원 | 420만원 | 520만원 |
| 4F 다목적홀 | 300만원 | 550만원 | 750만원 | 900만원 |
