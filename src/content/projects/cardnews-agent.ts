import type { Project } from "../types";

export const cardnewsAgent: Project = {
  slug: "cardnews-agent",
  title: "카드뉴스 에이전트",
  subtitle: "인스타그램 카드뉴스를 만드는 Claude Code 스킬",
  summary:
    "cards.json 한 벌로 1080×1350 카드 이미지와 캡션을 만드는 도구입니다. Claude Code 스킬로 불러 쓰며, '다시(DASII)' 인스타그램 카드뉴스를 이 도구로 만들어 운영하고 있습니다.",
  category: "ai",
  deployment: "local",
  status: "운영 중",
  positions: ["ai-product-builder"],
  role: "기획 · 개발 (1인)",
  period: "2026.08 – 2026.09",
  organization: "AI 사이드 프로젝트 · 다시(DASII)",
  tags: ["Claude Code 스킬", "Node.js", "Headless Edge"],
  highlights: [
    "글은 데이터(cards.json)로, 스타일 · 폰트는 공유 템플릿으로",
    "줄표 금지 · 문장 길이 · 줄바꿈 위치 같은 'AI 티' 규칙을 코드로 검사",
    "의존성 없이 시스템 Edge로 헤드리스 렌더",
    "커밋 30개",
  ],
  problem: {
    statement: "카드뉴스를 매번 디자인 툴로 만들면 시간이 오래 걸리고, AI가 쓴 문장은 티가 났습니다",
  },
  actions: [
    {
      title: "데이터와 템플릿 분리",
      description: "한 편을 cards.json 하나와 사진 몇 장으로 관리하고, 스크립트 · CSS · 폰트는 모든 편이 공유합니다.",
      artifact: "src/render.mjs, src/styles",
    },
    {
      title: "문안 규칙 자동 검사",
      description: "사람이 매번 고치던 문장 규칙을 스크립트로 만들어 렌더 전에 검사합니다.",
      artifact: "src/check-text.mjs",
    },
    {
      title: "Claude Code 스킬",
      description: "스킬로 등록해 대화로 카드뉴스를 만들고, 운영하면서 회고를 문서로 남겼습니다.",
      artifact: ".claude/skills/cardnews",
    },
  ],
  architecture: {
    stages: [
      { title: "원고", items: ["cards.json 작성", "Claude Code 스킬로 초안"], tech: ["Claude Code"], kind: "screen" },
      { title: "사진", items: ["사진 검색 · 다운로드"], tech: ["Pexels API"], kind: "system" },
      { title: "문안 검사", items: ["줄표 · 문장 길이 · 줄바꿈 규칙"], tech: ["check-text"], kind: "system" },
      { title: "렌더", items: ["1080×1350 PNG", "캡션 생성"], tech: ["Headless Edge"], kind: "system" },
      { title: "발행", items: ["인스타그램 업로드"], kind: "store" },
    ],
    caption: "cardnews-agent 저장소 코드 기준 · 로컬에서 실행하는 도구",
  },
  outcome: { metrics: [] },
  links: [{ label: "GitHub", href: "https://github.com/uwol-is-june/cardnews-agent" }],
};
