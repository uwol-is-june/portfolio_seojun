import { EXTERNAL_URLS } from './external-links';
import type { ForeignerCode, SpecialCondition } from '../special-condition';
import type { ApplicantType, Role } from '../self-diagnosis';

export type DocLink = {
  label: string;

  url?: string;

  file?: { path: string; downloadAs: string };

  sample?: { path: string; title: string; width: number; height: number };
};

export type DocItem = {
  n: string;
  s: string;

  org: boolean;
  link?: string;
  links?: readonly DocLink[];
  guide?: string;
};

export type DocGroup = {

  t: string;

  i: readonly DocItem[];

  note?: string;

  review?: true;
};

const COMMON_ITEMS: readonly DocItem[] = [
  {

    n: '개인정보활용동의서',
    s: '사번 생성 필수',
    org: false,
    guide:
      "대외비\n대외비 대외비 대외비\n대외비\n대외비 대외비\n\n대외비 대외비 대외비",
  },
  {
    n: '보험설계사/유자격자 등록신청서',
    s: '협회 제출 · 원본',
    org: true,
    guide:
      "대외비 대외비 대외비 대외비 대외비\n대외비 대외비 대외비",
  },
  { n: '고지사항', s: '협회 제출 · 등록신청서와 함께', org: true },
  {
    n: '이클린활용동의서',
    s: '협회 제출 · 원본',
    org: true,
    guide: "대외비\n대외비 대외비 대외비",
    links: [{ label: 'E-클린서비스 바로가기', url: EXTERNAL_URLS.eClean }],
  },
  { n: '신분증 사본', s: '공통', org: false },
  {
    n: '통장 사본',
    s: '공통 · 본인 명의만 · 별도 업로드 필수',
    org: false,
    guide:
      "대외비 대외비 대외비 대외비\n대외비 대외비 대외비 대외비 대외비\n대외비 대외비 대외비",
  },
  {
    n: '당사 모집경력동의서',
    s: '협회 제출 · 원본',
    org: true,
    guide: "대외비",
  },
  { n: '반명함 사진(파일가능)', s: '공통 · 최근 3개월 이내 · 필수 아님', org: false },
];

export const QUALIFICATION_GROUP_NOTE =
  "대외비 대외비 대외비 대외비 대외비";

function getQualificationDocs(role: Role): readonly DocItem[] {
  const isQualified = role === 'qualified';

  const EXAM_GUIDE =
    '【확인 항목】\n이름 / 주민번호\n손해보험 등록접수 시 "손해보험" 합격증, 생명보험 등록접수 시 "생명보험" 합격증인지 확인\n합격일자가 협회등록 예정일로부터 1년 이내인지 확인';
  const examPass: DocItem = isQualified
    ? {
        n: '손3보/생3보 시험합격증 (1년이내 유효)',
        s: '유자격자 · 보험연수원 발급',
        org: false,
        guide: EXAM_GUIDE,
        link: EXTERNAL_URLS.insuranceInstitute,
      }
    : {
        n: '손3보/생3보 시험합격증 (1년이내 유효)',
        s: '설계사 · 손보/생보협회 발급',
        org: false,
        guide: EXAM_GUIDE,
        links: [
          { label: '손보협회 바로가기', url: EXTERNAL_URLS.nonLifeExam },
          { label: '생보협회 바로가기', url: EXTERNAL_URLS.lifeExam },
        ],
      };

  const eduCert: DocItem = {
    n: '(신규) 손3보/생3보 교육수료증 (1년이내 유효)',
    s: isQualified ? '유자격자 · 보험연수원 발급' : '설계사 · 보험연수원 발급',
    org: false,
    guide:
      "대외비\n대외비\n대외비 대외비 대외비\n대외비 대외비 대외비",
    links: [{ label: '보험연수원 바로가기', url: EXTERNAL_URLS.insuranceInstitute }],
  };

  return [examPass, eduCert];
}

const CAREER_DOCS: readonly DocItem[] = [
  {
    n: '경력증명서 (금융사고여부 포함)',
    s: '경력 · 3개월 이내 발급',
    org: false,
    guide:
      "대외비 대외비\n\n대외비\n대외비 대외비\n대외비 대외비 대외비 대외비\n\n대외비 대외비\n대외비 대외비\n대외비 대외비 대외비\n대외비 대외비",
  },
  {
    n: 'E-클린서비스 조회내역지 출력본(1달 이내)',
    s: '경력 · 1개월 이내 발급',
    org: false,
    guide:
      "대외비 대외비\n대외비 대외비 대외비\n\n대외비\n대외비 대외비 대외비\n대외비 대외비 대외비 대외비\n대외비 대외비 대외비 대외비\n대외비 대외비 대외비\n대외비 대외비 대외비",
    links: [{ label: 'E-클린서비스 바로가기', url: EXTERNAL_URLS.eClean }],
  },
  {
    n: '변액합격확인서',
    s: '변액자격 보유자',
    org: false,
    links: [{ label: '생보협회 바로가기', url: EXTERNAL_URLS.lifeExam }],
  },
];

const SENIOR_EDU_DOCS: readonly DocItem[] = [
  {

    n: '경력(보수) 손3보/생3보 교육수료증 (1년이내 유효)',
    s: '경력(경력자등록or보수)',
    org: false,
    guide:
      "대외비\n대외비\n대외비 대외비 대외비\n대외비 대외비 대외비",
    links: [{ label: '보험연수원 바로가기', url: EXTERNAL_URLS.insuranceInstitute }],
  },
];

const INSURER_COMMON_NOTE =
  "\n\n대외비\n대외비 대외비 대외비 대외비\n대외비 대외비";
const INSURER_COMMON_PATH =
  "대외비\n대외비 대외비 대외비 대외비 대외비\n\n";

const INSURER_BASIC: readonly DocItem[] = [
  {
    n: '손보위촉서류 원본',
    s: '손보자격 보유자',
    org: true,
    guide: "대외비 대외비 대외비 대외비 대외비",
  },
  {
    n: '생보위촉서류 원본',
    s: '생보자격 보유자',
    org: true,
    guide: "대외비 대외비 대외비 대외비 대외비",
  },
];

const INSURER_FULL: readonly DocItem[] = [
  ...INSURER_BASIC,
  { n: '변액서류 원본', s: '변액자격 보유자', org: true },
];

const EXEMPT_EDU_GROUP_TITLE = '📄 2. 교육 증빙 (경력자 등록교육)';

export const EXEMPT_EDU_GROUP_NOTE =
  "대외비 대외비 대외비 대외비 대외비";

export function getDocGroups(type: ApplicantType, role: Role, typeReplaced = false): DocGroup[] {
  const qualification = getQualificationDocs(role);

  const evidenceGroup = (label: string, index: number): DocGroup =>
    typeReplaced
      ? { t: EXEMPT_EDU_GROUP_TITLE, i: SENIOR_EDU_DOCS, note: EXEMPT_EDU_GROUP_NOTE }
      : {
          t: `📄 ${index}. 자격 증빙 (${label})`,
          i: qualification,
          note: QUALIFICATION_GROUP_NOTE,
        };

  if (type === 'new') {
    return [
      { t: '📄 1. 공통서류', i: COMMON_ITEMS },
      evidenceGroup('신인', 2),
      { t: '🏢 3. 보험사 위촉서류', i: INSURER_BASIC },
    ];
  }
  if (type === 'junior') {
    return [
      { t: '📄 1. 공통서류', i: COMMON_ITEMS },
      evidenceGroup('경력신입', 2),
      { t: '📄 3. 경력 증빙 (경력신입)', i: CAREER_DOCS },
      { t: '🏢 4. 보험사 위촉서류', i: INSURER_FULL },
    ];
  }

  return [
    { t: '📄 1. 공통서류', i: COMMON_ITEMS },
    { t: '📄 2. 교육 증빙 (경력자)', i: SENIOR_EDU_DOCS },
    { t: '📄 3. 경력 증빙 (경력자)', i: CAREER_DOCS },
    { t: '🏢 4. 보험사 위촉서류', i: INSURER_FULL },
  ];
}

export const DEBT_DOC_GUIDE =
  "대외비 대외비\n\n대외비\n대외비 대외비\n대외비\n대외비 대외비\n대외비\n대외비 대외비";

export const REVIEW_COMMON_DOCS: readonly DocItem[] = [
  {
    n: '소명서',
    s: '사본 가능 · 공통 필수',
    org: false,

    guide:
      "대외비\n대외비 대외비 대외비 대외비 대외비\n\n대외비 대외비 대외비",
    links: [
      {
        label: '양식 다운로드',
        file: { path: '/demos/fa-recruit/forms/somyeongseo.pdf', downloadAs: '위촉제한_내용_및_소명서.pdf' },
      },
      {
        label: '샘플 보기',
        sample: {
          path: '/demos/fa-recruit/forms/somyeongseo-sample.jpg',
          title: '소명서 작성 샘플',
          width: 565,
          height: 775,
        },
      },
    ],
  },
  {
    n: '즉시상위차감확인서',
    s: '사본 가능 · 공통 필수',
    org: false,
    guide:
      "대외비 대외비 대외비 대외비\n대외비 대외비",
    links: [
      {
        label: '양식 다운로드',
        file: { path: '/demos/fa-recruit/forms/chagam.pdf', downloadAs: '즉시상위차감_확인서.pdf' },
      },
      {
        label: '샘플 보기',
        sample: {
          path: '/demos/fa-recruit/forms/chagam-sample.jpg',
          title: '즉시상위차감 확인서 샘플',
          width: 565,
          height: 783,
        },
      },
    ],
  },
];

export const REVIEW_DOCS_GROUP_TITLE = '⚠️ 심사 보완 서류 (필수)';

export const REVIEW_DOCS_GROUP_NOTE =
  "대외비 대외비 대외비 대외비 대외비";

export const REVIEW_CAREER_DOCS: readonly DocItem[] = [
  {
    n: '경력증명서 (금융사고여부 포함)',
    s: '📌 위촉제한자 필수',
    org: false,
    guide:
      "대외비 대외비\n대외비 대외비 대외비 대외비 대외비\n대외비 대외비 대외비",
  },
  {
    n: 'E-클린서비스 조회내역지 출력본(1달 이내)',
    s: '📌 위촉제한자 필수',
    org: false,
    guide: "대외비 대외비 대외비",
    links: [{ label: 'E-클린서비스 바로가기', url: EXTERNAL_URLS.eClean }],
  },
];

export const TRANSFER_DOCS_GROUP: DocGroup = {
  t: '🔄 재입사 소속변경 서류 (필수)',
  i: [
    {
      n: '소속변경신청서',
      s: '재입사 소속변경 처리 필수',
      org: false,
      links: [
        {
          label: '양식 다운로드',
          file: { path: '/demos/fa-recruit/forms/sosok-sincheong.pdf', downloadAs: '소속이관_신청서.pdf' },
        },
      ],
    },
    {
      n: '지표현황',
      s: '재입사 소속변경 처리 필수',
      org: false,
      links: [
        {
          label: '양식 다운로드',
          file: { path: '/demos/fa-recruit/forms/sosok-jipyo.pdf', downloadAs: '소속이관_대상자_지표현황.pdf' },
        },
      ],
    },
  ],
};

const GOV_LINK = 'https://www.gov.kr/';
const HOMETAX_LINK = 'https://www.hometax.go.kr/';

export function getSpecialConditionDocs(
  condition: SpecialCondition | null,
  foreignerCode: ForeignerCode | null,
): DocGroup | null {
  if (condition === 'foreigner') {

    if (!foreignerCode || foreignerCode === 'other') return null;
    const isF4 = foreignerCode === 'F4';
    return {
      t: `🌍 외국인 추가 서류 (${isF4 ? 'F-4' : 'F-2/F-5/F-6'})`,
      i: isF4
        ? [
            { n: '국내거소신고사실증명서', s: '3개월 이내 발급', org: false, link: GOV_LINK },
            { n: '국내거소신고증 사본 (앞면+뒷면)', s: 'F-4 재외동포', org: false },
          ]
        : [
            { n: '외국인등록사실증명서', s: '3개월 이내 발급', org: false, link: GOV_LINK },
            {
              n: '외국인등록증 사본 (앞면+뒷면) 또는 영주증',
              s: '체류기간 확인용',
              org: false,
            },
          ],
    };
  }

  if (condition === 'minor') {
    return {
      t: '👶 미성년자 추가 서류 (손보·생보 공통)',
      i: [
        {
          n: '등록동의서',
          s: '법정대리인 인감날인 · 동의서↔인감증명서 도장 일치 필수',
          org: false,
        },
        {
          n: '법정대리인 인감증명서',
          s: '용도: 모집인 등록용 · 3개월 이내',
          org: false,
          link: GOV_LINK,
        },
        { n: '미성년자 취업동의서', s: '친권자 인감날인 (손보협회)', org: false },
        {
          n: '가족관계증명서 또는 주민등록등본',
          s: '3개월 이내 발급',
          org: false,
          link: GOV_LINK,
        },
      ],
    };
  }

  if (condition === 'ins_career') {
    return {
      t: '🏢 보험사 내근직 추가 서류',
      i: [{ n: '경력증명서 원본', s: '주민번호 전체 표기 · 용도: 협회제출용', org: true }],
    };
  }

  if (condition === 'adjuster') {
    return {

      t: '⚖️ 손해사정사 추가 서류',
      i: [
        {
          n: '손해사정법인 경력증명서',
          s: '업종란 [신체 또는 병력] 필수 기재 · 주민번호 전체 · 3개월 내 원본',
          org: true,
        },
        { n: '손해사정 업무경력 확인서', s: '손보협회 · 직인날인', org: true },
        { n: '심사명부', s: '생보협회 · 3개월 이내 발급', org: false },
        { n: '원천징수영수증', s: '손해사정사', org: false, link: HOMETAX_LINK },
      ],
    };
  }

  return null;
}
