import type { Profile } from "./types";

export const profile: Profile = {
  name: "[TODO] 이름",
  headline: "문제를 정의하고, 흐름을 설계하고, AI로 직접 만들어 검증합니다.",
  bio: [
    "[TODO] 자기소개 첫 문단: 어떤 문제에 관심이 있고, 어떤 방식으로 일하는 사람인지",
    "[TODO] 자기소개 둘째 문단: 지금까지의 경력 흐름과 앞으로 하고 싶은 일",
  ],
  timeline: [
    {
      period: "[TODO] 2023.01 – 현재",
      organization: "[TODO] 회사명",
      role: "[TODO] 직무",
      description: "[TODO] 담당 업무와 대표 성과 한 줄",
    },
    {
      period: "[TODO] 2021.03 – 2022.12",
      organization: "[TODO] 회사명",
      role: "[TODO] 직무",
      description: "[TODO] 담당 업무와 대표 성과 한 줄",
    },
  ],
  education: [
    {
      period: "[TODO] 2015 – 2021",
      organization: "[TODO] 학교명",
      role: "[TODO] 전공",
      description: "",
    },
  ],
  skills: [
    { category: "Product", items: ["문제 정의", "PRD 작성", "로드맵", "A/B 테스트", "[TODO]"] },
    { category: "Planning", items: ["유저 플로우", "IA", "와이어프레임", "정책 설계", "[TODO]"] },
    { category: "Data", items: ["[TODO] SQL", "[TODO] GA4 / Amplitude", "[TODO]"] },
    { category: "Tools", items: ["Figma", "Notion", "Jira", "[TODO]"] },
    { category: "AI & Build", items: ["Claude Code", "Next.js", "TypeScript", "Tailwind CSS", "[TODO]"] },
  ],
  resume: { label: "이력서 PDF 다운로드", href: "[TODO] /resume.pdf" },
};
