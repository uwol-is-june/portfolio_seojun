import { otherCareerCriteria } from '../career';
import type { Role } from '../self-diagnosis';
import {
  ELIGIBLE_FOREIGNER_CODES,
  type SpecialCondition,
  type SpecialConditionState,
} from '../special-condition';

export type GuideBanner = { tone: 'warn' | 'ok' | 'danger'; text: string; sub?: string };
export type GuideDoc = { name: string; sub?: string };
export type GuideBullets = { heading: string; tone: 'warn' | 'brand'; items: string[] };

export type SpecialConditionGuide = {
  title: string;

  badges?: readonly string[];
  badgeNote?: string;
  banners: GuideBanner[];
  docsHeading?: string;
  docsTone?: 'ok' | 'brand';
  docs: GuideDoc[];
  docsFootnote?: string;
  bulletGroups: GuideBullets[];
  footnote?: string;
};

const TITLE: Record<SpecialCondition, string> = {
  foreigner: '🌍 외국인 협회 등록 안내',
  minor: '👶 미성년자 협회 등록 안내',
  ins_career: '🏢 보험사 내근직 경력자 안내',
  adjuster: '⚖️ 손해사정사 협회 등록 안내 (서류심사 대상)',
};

const REVIEW_BANNER: GuideBanner = {
  tone: 'warn',
  text: "대외비 대외비 대외비",
};

export function getSpecialConditionGuide(
  state: SpecialConditionState,
  role: Role | null,
): SpecialConditionGuide | null {
  const { condition, foreignerCode } = state;
  if (!condition) return null;

  if (condition === 'foreigner') {
    const guide: SpecialConditionGuide = {
      title: TITLE.foreigner,
      badges: ELIGIBLE_FOREIGNER_CODES,
      badgeNote: "대외비 대외비",
      banners: [],
      docs: [],
      bulletGroups: [],
    };

    if (foreignerCode === 'other') {
      guide.banners.push({
        tone: 'danger',
        text: "대외비",
        sub: "대외비 대외비\n대외비 대외비 대외비",
      });
      return guide;
    }

    if (foreignerCode === 'F4') {
      guide.docsHeading = '✅ 등록 가능 · 제출 서류 (F-4)';
      guide.docsTone = 'ok';
      guide.docs = [
        { name: '국내거소신고사실증명서 (3개월 이내)' },
        { name: '국내거소신고증 사본 (앞면 + 뒷면)' },
      ];
      guide.docsFootnote = '⏱ 유효기간: 발급일로부터 3개월 이내';
    } else if (foreignerCode === 'eligible') {
      guide.docsHeading = '✅ 등록 가능 · 제출 서류 (F-2/F-5/F-6)';
      guide.docsTone = 'ok';
      guide.docs = [
        { name: '외국인등록사실증명서 (3개월 이내)' },
        { name: '외국인등록증 사본 (앞면 + 뒷면) 또는 영주증 (체류기간 확인용)' },
      ];
      guide.docsFootnote = '⏱ 유효기간: 발급일로부터 3개월 이내';
    }

    if (foreignerCode === 'F4' || foreignerCode === 'eligible') {
      guide.bulletGroups.push(
        {
          heading: '🏢 보험사 위촉 — 이름 표기',
          tone: 'brand',
          items: [
            "대외비 대외비",
            "대외비 대외비 대외비",
            "대외비 대외비 대외비 대외비 대외비",
          ],
        },
        {
          heading: '🏢 보험사 위촉 — 추가 서류',
          tone: 'warn',
          items: [
            "대외비 대외비",
            "대외비",
            "대외비 대외비",
            "대외비 대외비 대외비 대외비 대외비",
          ],
        },
      );
    }

    return guide;
  }

  if (condition === 'minor') {
    return {
      title: TITLE.minor,
      banners: [REVIEW_BANNER],
      docs: [
        {
          name: '등록동의서 (법정대리인 인감날인)',
          sub: "대외비 대외비",
        },
        {
          name: '법정대리인 인감증명서',
          sub: "대외비 대외비",
        },
        { name: '미성년자 취업동의서 (친권자 인감날인)', sub: "대외비" },
        { name: '가족관계증명서 또는 주민등록등본', sub: "대외비" },
      ],
      bulletGroups: [
        {
          heading: '⚠️ 추가 서류',
          tone: 'warn',
          items: [
            "대외비 대외비 대외비",
            "대외비 대외비",
          ],
        },

        {
          heading: '🏢 보험사 위촉 가능 여부',
          tone: 'warn',
          items: [
            "대외비",
            "대외비 대외비 대외비",
            "대외비 대외비 대외비 대외비 대외비",
            "대외비 대외비 대외비 대외비",
            "대외비 대외비 대외비 대외비 대외비",
          ],
        },
      ],
    };
  }

  if (condition === 'ins_career') {
    return {
      title: TITLE.ins_career,
      banners: [
        REVIEW_BANNER,
        {
          tone: 'ok',
          text: "대외비 대외비",
          sub: "대외비 대외비 대외비",
        },
      ],
      docs: [{ name: '경력증명서 원본', sub: "대외비 대외비" }],
      bulletGroups: [
        {
          heading: '📋 경력요건 및 교육',
          tone: 'brand',
          items: [
            role === 'qualified'
              ? "대외비 대외비 대외비 대외비 대외비"
              : "대외비 대외비 대외비 대외비 대외비",
            "대외비 대외비 대외비",
          ],
        },
        {
          heading: '⚠️ 인정 불가',
          tone: 'warn',
          items: [
            "대외비 대외비",
            "대외비",
            "대외비",
          ],
        },
      ],
      footnote:
        "대외비 대외비 대외비 대외비 대외비",
    };
  }

  return {
    title: TITLE.adjuster,
    banners: [REVIEW_BANNER],
    docsHeading: '📄 제출 서류',
    docsTone: 'brand',
    docs: [
      {
        name: '손해사정법인 경력증명서',
        sub: "대외비 대외비 대외비",
      },
      { name: '심사명부', sub: "대외비" },
      { name: '원천징수영수증' },
    ],
    bulletGroups: [
      {
        heading: '⚠️ 체크포인트',
        tone: 'warn',
        items: [

          "대외비 대외비 대외비 대외비 대외비",
          "대외비",
          "대외비",
        ],
      },
    ],
  };
}
