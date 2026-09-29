import type { ApplicantType, Role } from '../self-diagnosis';

export type TypeDescription = { title: string; body: string };

export const TYPE_DESCRIPTION: Record<Role, Record<ApplicantType, TypeDescription>> = {
  sales: {
    new: {
      title: '보험 경력이 없거나 협회등록 이력이 없는 사람',
      body: '시험 합격 + 신규등록교육 이수 후 등록 (둘 사이 1년 이내, 두 조건을 최종 만족한 날부터 등록예정일 1년 이내)',
    },
    junior: {
      title: '경력 있으나 1년 미만',
      body: '기존 신규 합격증 + 신규 등록교육 수료증으로 등록 (신인 루트와 동일하게 진행 · 둘 사이 1년 이내, 두 조건을 최종 만족한 날부터 등록예정일 1년 이내)',
    },
    senior: {
      title: '경력 1년(365일) 이상',
      body: '경력자등록교육 또는 보수교육 이수 후 시험 없이 경력등록 가능 (교육수료증 1년 이내)',
    },
  },
  qualified: {
    new: {
      title: '보험 경력이 없거나 협회등록 이력이 없는 사람',
      body: '대리점 시험 합격 + 대리점 신규등록교육 이수 후 등록 (둘 사이 1년 이내, 두 조건을 최종 만족한 날부터 등록예정일 1년 이내)',
    },
    junior: {
      title: '경력 있으나 1년 미만',
      body: '기존 신규 합격증 + 신규 등록교육 수료증으로 등록 (신인 루트와 동일하게 진행 · 둘 사이 1년 이내, 두 조건을 최종 만족한 날부터 등록예정일 1년 이내)',
    },
    senior: {
      title: '경력 2년(730일) 이상',
      body: '경력자등록교육 또는 보수교육 이수 후 시험 없이 경력등록 가능 (교육수료증 1년 이내)',
    },
  },
};
