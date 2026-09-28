import type { Project } from "../types";

export const podoTicket: Project = {
  slug: "podo-ticket",
  title: "포도티켓",
  subtitle: "NFC 기반 O2O 티켓 발권 서비스",
  summary:
    "소규모 공연의 수기 발권을 NFC 발권으로 바꿔 발권 시간을 평균 73.5% 줄였습니다. 현장에서 찾은 혼선은 예매 방식 자동 판별로 풀어 VOC를 80% 줄였습니다.",
  category: "startup",
  positions: ["service-planner", "product-manager"],
  featured: true,
  role: "Product Manager",
  period: "2025.01 – 2025.07",
  organization: "창업 · 포도상점",
  team: [
    { role: "PM", count: 1 },
    { role: "디자이너", count: 1 },
    { role: "FE", count: 2 },
    { role: "BE", count: 2 },
  ],
  tags: ["O2O", "NFC", "유저 플로우", "현장 운영", "VOC"],
  logo: { src: "/projects/podo-ticket/logo.webp", alt: "포도티켓 로고" },
  thumbnail: { src: "/projects/podo-ticket/cover.webp", alt: "포도티켓 모바일 화면 목업" },
  highlights: [
    "총 13회 공연, 관객 495명 대상 서비스 운영",
    "발권 시간 평균 73.5% 단축 · 발권 오류율 0.4%",
    "예매 자동 판별 로직으로 현장 예매 발권 22.6% 추가 단축 · VOC 80% 감소",
    "사용자 만족도 4.92 · 서비스 추천 지수(NPS) 80",
  ],
  background: {
    title: "수기 발권이 일반적인 소규모 공연 시장",
    stats: ["국내 소규모 공연 및 독립극단 약 70% 이상이 수기 발권으로 운영"],
    source: "2024 KOPIS 공연예술조사",
  },
  research: {
    title: "고객들은 기존 수기 발권 과정에서 높은 비효율을 경험",
    stats: [
      "현재 티켓 발권 과정이 비효율적이라고 응답한 티켓 매니저 95%",
      "수기 발권이 불편하고 개선이 필요하다고 답한 관객 86%",
    ],
    source: "2024.11 티켓 매니저 · 관객 64명 대상 심층 인터뷰",
  },
  problem: {
    statement: "수기 발권 방식이 발권 지연과 현장 혼선을 낳고 있었습니다",
    points: [
      "공연 시작 5~10분 전 관객이 몰리며 입장 대기열 지연 발생",
      "수기 발권으로 인한 처리 지연, 중복 발권, 입장 기록 누락 등 오류 발생",
    ],
  },
  hypothesis:
    "NFC 기반 디지털 티켓 발권 서비스를 도입하면, 고객은 빠르고 정확한 발권 경험을 하게 되고 만족도와 추천 의향(NPS)이 높아질 것이다",
  metrics: [
    { name: "발권 소요 시간", definitions: ["사전 예매자 발권 소요 시간", "현장 예매자 발권 소요 시간"] },
    { name: "발권 오류율", definitions: ["전체 발권 건수 중 발권 오류 발생 비율"] },
    { name: "서비스 만족도", definitions: ["관객의 서비스 만족도 (평점, NPS)"] },
  ],
  actions: [
    {
      title: "NFC 발권 서비스 기획 · 개발",
      description: "NFC 기반 디지털 티켓 발권 서비스를 기획 · 개발하고, 티켓 정보 · 명단 관리 · 실시간 좌석 현황 화면을 설계했습니다.",
      artifact: "서비스 기획, 화면 설계",
    },
    {
      title: "현장 운영",
      description: "실제 공연 현장에 태블릿과 NFC 카드를 두고 총 13회 공연, 관객 495명을 대상으로 직접 운영했습니다.",
    },
  ],
  outcome: {
    verdict: "핵심 가설 검증 성공",
    metrics: [
      { label: "사전 예매 발권 시간", value: "14.2초", description: "기존 대비 76% 감소" },
      { label: "현장 예매 발권 시간", value: "26.56초", description: "기존 대비 71% 감소" },
      { label: "발권 오류율", value: "0.4%", description: "495명 중 2건" },
      { label: "서비스 만족도", value: "4.92 / 5", description: "NPS 80.0" },
    ],
  },
  iterations: [
    {
      verdict: "현장 운영에서 추가 개선 사항 도출",
      findings: [
        "NFC 발권은 수기 방식보다 효율적이었지만, 일부 관객이 프로세스를 인지하지 못해 현장 혼선 발생",
      ],
      analysis: {
        title: "현장 인터뷰로 확인한 문제",
        stats: [
          "\"사전 예매와 현장 예매 중 뭘 골라야 하는지 모르겠다\"는 의견 다수",
          "예매 방식(사전 · 현장)을 고르는 과정에서 대기 시간 증가와 피로도 상승",
        ],
      },
      insight: "관객이 예매 방식을 직접 판단하게 하지 말고, 시스템이 판별해야 한다",
      actions: [
        {
          title: "예매 방식 자동 판별",
          description: "관객은 예매 정보만 입력하고, 백엔드가 예매 내역을 조회해 사전 예매와 현장 예매를 자동으로 나누도록 바꿨습니다.",
          points: ["예매 내역 있음 → 바로 좌석 선택", "예매 내역 없음 → 현장 예매로 자동 분기"],
        },
      ],
      flow: {
        title: "발권 플로우",
        before: {
          title: "AS-IS · 사용자가 판단",
          description: "관객이 예매 방식을 먼저 골라야 했습니다.",
          nodes: [
            { label: "관객 극장 도착" },
            {
              label: "예매 방식 선택",
              kind: "decision",
              note: "사용자가 판단",
              branches: [
                { condition: "사전 예매", label: "예매 정보 확인" },
                { condition: "현장 예매", label: "현장 예매 프로세스" },
              ],
            },
            { label: "좌석 선택" },
            { label: "티켓 발권", kind: "end" },
          ],
        },
        after: {
          title: "TO-BE · 시스템이 판별",
          description: "예매 정보만 입력하면 시스템이 나눕니다.",
          nodes: [
            { label: "관객 극장 도착" },
            { label: "예매 정보 입력" },
            {
              label: "예매 내역 자동 판별",
              kind: "system",
              note: "백엔드",
              branches: [
                { condition: "예매 내역 있음", label: "좌석 선택으로" },
                { condition: "예매 내역 없음", label: "현장 예매 자동 분기" },
              ],
            },
            { label: "좌석 선택" },
            { label: "티켓 발권", kind: "end" },
          ],
        },
      },
      after: {
        verdict: "발권 시간 추가 단축, 현장 혼선 VOC 80% 감소",
        metrics: [
          { label: "현장 혼선 VOC", value: "80% 감소", description: "앱 내 피드백 기준" },
          { label: "사전 예매 발권 시간", value: "13.37초", description: "14.2초 → 약 6% 추가 단축" },
          { label: "현장 예매 발권 시간", value: "20.57초", description: "26.56초 → 22.6% 추가 단축" },
        ],
      },
    },
  ],
  gallery: [
    { src: "/projects/podo-ticket/screen-ticket.webp", alt: "포도티켓 티켓 정보 화면", caption: "티켓 정보" },
    { src: "/projects/podo-ticket/screen-admin.webp", alt: "포도티켓 명단 관리 화면", caption: "명단 관리" },
    { src: "/projects/podo-ticket/screen-seat.webp", alt: "포도티켓 실시간 좌석 현황 화면", caption: "실시간 좌석 현황" },
    { src: "/projects/podo-ticket/photo-tagging.webp", alt: "관객이 NFC 카드를 태그하는 현장", caption: "현장 NFC 발권" },
    { src: "/projects/podo-ticket/photo-onsite.webp", alt: "공연장 입구에 설치된 포도티켓 태블릿과 안내판", caption: "현장 설치" },
    { src: "/projects/podo-ticket/photo-nfc-cards.webp", alt: "포도티켓 NFC 카드", caption: "NFC 카드" },
  ],
};
