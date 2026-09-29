import { EXTERNAL_URLS } from './external-links';
import type { DocItem, DocGroup } from './documents';

export const TODO_GROUPS: readonly DocGroup[] = [
  {
    t: '🔒 보증보험 (필수)',
    i: [
      {
        n: '서울보증보험 개인정보 동의',
        s: '진단 전 선행 필수 · 미완료 시 위촉 진단 재확인 권장',
        org: false,
        links: [{ label: '보증보험 동의 바로가기', url: EXTERNAL_URLS.bond }],
        guide:
          "대외비 대외비\n대외비\n대외비 대외비\n\n대외비\n대외비\n대외비 대외비\n대외비 대외비\n대외비 대외비\n대외비 대외비\n\n대외비\n대외비 대외비 대외비\n대외비 대외비\n\n대외비 대외비 대외비\n대외비 대외비 대외비\n대외비 대외비 대외비 대외비 대외비\n\n대외비 대외비\n대외비 대외비 대외비",
      },
    ],
  },
  {
    t: '💻 설치 (필수)',
    i: [
      {
        n: 'IIMS 설치',
        s: 'PC용 · 인카금융서비스 전용 업무시스템',
        org: false,
        links: [{ label: 'IIMS 설치 바로가기', url: EXTERNAL_URLS.iims }],
        guide: "대외비 대외비 대외비 대외비 대외비",
      },
      {
        n: 'IMO 설치',
        s: '모바일 앱 (Android / iOS)',
        org: false,
        guide:
          "대외비\n대외비 대외비 대외비\n대외비 대외비 대외비",
      },
    ],
  },
  {
    t: '📚 입문 교육 및 인카 위촉계약서 제출 (필수)',
    i: [
      {
        n: '사이버캠퍼스 온라인 입문과정 수료',
        s: '신청월 말일까지 수료 필 · 수료 후 준법서약서 작성',
        org: false,
        links: [{ label: '사이버캠퍼스 바로가기', url: EXTERNAL_URLS.cyberCampus }],
        guide:
          "대외비 대외비\n대외비 대외비\n대외비 대외비 대외비 대외비 대외비\n대외비\n\n대외비\n대외비 대외비\n대외비 대외비\n대외비 대외비\n대외비 대외비\n\n대외비\n대외비 대외비\n대외비 대외비\n\n대외비\n대외비 대외비\n대외비 대외비\n\n대외비\n대외비 대외비\n대외비 대외비\n\n대외비\n대외비\n대외비\n대외비 대외비 대외비",
      },
      {
        n: '인카 위촉계약서 전산제출',
        s: 'IIMS에서 제출 · 공통 필수',
        org: false,
        guide:
          "대외비\n대외비 대외비 대외비\n\n대외비 대외비 대외비",
      },
    ],
  },
];

export const TODO_TOTAL: number = TODO_GROUPS.reduce((sum, g) => sum + g.i.length, 0);

export function allTodoItems(): DocItem[] {
  return TODO_GROUPS.flatMap((g) => [...g.i]);
}
