import type { MalsoAssoc } from '../malso/case';
import { EXTERNAL_URLS } from './external-links';

export type MethodLink = { label: string; url: string };

export type MethodBlock = {
  id: string;
  icon: string;
  title: string;

  steps: readonly string[];

  supplies: readonly string[];

  hot?: string;
  links?: readonly MethodLink[];

  note?: string;
};

export type MethodSection = {
  assoc: 'son' | 'life';

  title: string;
  blocks: readonly MethodBlock[];
};

const SON_LINK: MethodLink = {
  label: '손해보험협회 인터넷 말소 신청 바로가기 ↗',
  url: EXTERNAL_URLS.nonLifeMalso,
};
const SON_BRANCH_LINK: MethodLink = {
  label: '손해보험협회 지역본부 안내 ↗',
  url: EXTERNAL_URLS.nonLifeMalso,
};
const LIFE_LINK: MethodLink = {
  label: '생명보험협회 말소 절차 페이지 ↗',
  url: EXTERNAL_URLS.lifeMalso,
};
const LIFE_BRANCH_LINK: MethodLink = {
  label: '생명보험협회 지역본부 연락처 ↗',
  url: EXTERNAL_URLS.lifeMalso,
};

export function proofCommonSteps(org: 'company' | 'agency'): string[] {
  const issuer = org === 'agency' ? '대리점' : '보험회사';
  return [
    `**${issuer}**에서 **해촉증명서 원본** 발급받기`,
    '기재사항 확인: **성명 · 주민번호 13자리 · 해촉일자 · 회사 명판+대표이사 직인**',
  ];
}

export const PROOF_BASE_SUPPLY =
  '해촉증명서 **원본** (성명·주민번호 13자리·해촉일자·회사 명판+대표이사 직인) · 유효기간 발급일~3개월';

const PROOF_SON: readonly MethodBlock[] = [
  {
    id: 'proof-son-net',
    icon: '💻',
    title: '인터넷 말소',
    steps: [
      '해촉증명서 원본을 **촬영 또는 스캔** (pdf·jpg·png)',
      `[손해보험협회 홈페이지](${EXTERNAL_URLS.nonLifeMalso}) → **모집종사자 관리센터 → 인터넷 말소 신청**`,
      '자격선택 → 서류선택(**해촉증명서**) → **휴대폰번호** 입력 + 파일 업로드',
      '심사 → 말소',
    ],
    supplies: [
      PROOF_BASE_SUPPLY,
      '해촉증명서 **스캔 파일** (pdf·jpg·png)',
      '**휴대폰번호** (카카오톡 알림 수신)',
    ],
    hot: '⏰ 평일 **16:30 이전** 신청 시 당일 접수',
    links: [SON_LINK],
    note: '✅ 인터넷으로 바로 신청 가능합니다. 지역본부 방문·우편 없이 전자파일 업로드만으로 말소 신청이 됩니다. (방문 신청도 가능)',
  },
  {
    id: 'proof-son-visit',
    icon: '🏢',
    title: '방문 말소',
    steps: [
      '신분증 + 해촉증명서 원본 지참',
      '관할 **지역본부** 방문 (09:00~18:00, 점심 12:00~13:00)',
      '현장 접수 → 심사 → 말소',
    ],
    supplies: [PROOF_BASE_SUPPLY, '**신분증** 원본 (사본·전자신분증 불가)'],
    links: [SON_BRANCH_LINK],
  },
];

const PROOF_LIFE: readonly MethodBlock[] = [
  {
    id: 'proof-life-net',
    icon: '💻',
    title: '인터넷 말소',
    steps: [
      '⚠ **인터넷 신청 전 필수** — 해촉증명서 원본을 **관할 지역본부·지부로 먼저 우편 발송**',
      `[생명보험협회 홈페이지](${EXTERNAL_URLS.lifeMalso}) → **직접말소 신청 → 인터넷** (09:00~15:00)`,
      '협회 처리 → 말소',
    ],
    supplies: [
      PROOF_BASE_SUPPLY,
      '해촉증명서 원본 **사전 우편 발송** (지역본부·지부, 인터넷 신청 전 필수)',
    ],
    links: [LIFE_LINK],
    note: '⚠ 인터넷 신청 전 해촉증명서 원본을 **관할 지역본부·지부로 먼저 발송**해야 합니다. · 지역본부 주소 → 위 링크 → "지역본부 연락처 바로가기"',
  },
  {
    id: 'proof-life-visit',
    icon: '🏢',
    title: '방문 말소',
    steps: [
      '신분증 + 해촉증명서 원본 지참',
      '관할 **지역본부·지부** 방문 (09:00~17:30, 점심 12:00~13:00)',
      '현장 접수 → 협회 처리 → 말소',
    ],
    supplies: [PROOF_BASE_SUPPLY, '**신분증**', '관할 **지역본부·지부** 직접 방문 (본점 불가)'],
    hot: '⚠ 본점(충무로·퇴계로) 말소 업무 안 함. 사본 불가, **원본 필수**.',
    links: [LIFE_BRANCH_LINK],
  },
];

export const DOC_BASE_SUPPLY = '발신인 보관용 내용증명 **원본** (우체국 소인 있는 것)';

const DOC_SON: readonly MethodBlock[] = [
  {
    id: 'doc-son-net',
    icon: '💻',
    title: '인터넷 말소 신청',
    steps: [
      `[손해보험협회 홈페이지](${EXTERNAL_URLS.nonLifeMalso}) → **모집종사자 관리센터 → 인터넷 말소 신청**`,
      '자격선택 → 서류선택(**내용증명서**)',
      '**휴대폰번호·등기번호(13자리)·내용증명발급일자** 입력 + 내용증명 파일 업로드',
      '서류 심사 → 말소',
    ],
    supplies: [
      DOC_BASE_SUPPLY,
      '내용증명 **스캔 파일** (pdf·jpg·png, 업로드용)',
      '**등기번호(13자리)·내용증명발급일자·휴대폰번호** 입력',
    ],
    hot: '⏰ 평일 **16:30 이전** 신청 시 당일 접수',
    links: [SON_LINK],
  },
  {
    id: 'doc-son-visit',
    icon: '🏢',
    title: '협회 방문',
    steps: [
      '내용증명 원본 + 신분증 지참',
      '관할 **지역본부** 방문 (09:00~18:00, 점심 12:00~13:00)',
      '현장 접수 → 심사 → 말소',
    ],
    supplies: [DOC_BASE_SUPPLY, '**신분증** (원본 필수, 사본·전자신분증 불가)'],
    links: [SON_BRANCH_LINK],
  },
];

const DOC_LIFE: readonly MethodBlock[] = [
  {
    id: 'doc-life-net-assoc',
    icon: '💻',
    title: '인터넷 — 협회에도 발송한 경우',
    steps: [
      `[생보협회 홈페이지](${EXTERNAL_URLS.lifeMalso}) → **직접말소 신청 → 해촉신청서 → 인터넷** (09:00~15:00)`,
      '**등기번호(13자리)·내용증명발급일자·휴대폰번호** 입력',
      '협회 처리 → 말소',
    ],
    supplies: [DOC_BASE_SUPPLY, '**등기번호(13자리)·내용증명발급일자·휴대폰번호** 입력'],
    links: [LIFE_LINK],
  },
  {
    id: 'doc-life-net-hq',
    icon: '💻',
    title: '인터넷 — 본사에만 발송한 경우',
    steps: [
      '내용증명서류를 스캔 (pdf·jpg·png)',
      `[생보협회 홈페이지](${EXTERNAL_URLS.lifeMalso}) → **직접말소 신청 → 해촉신청서 → 인터넷** (09:00~15:00)`,
      '**등기번호·내용증명발급일자·휴대폰번호** 입력 + 파일 업로드',
      '협회 처리 → 말소',
    ],
    supplies: [
      DOC_BASE_SUPPLY,
      '내용증명 **스캔 파일** (pdf·jpg·png, 업로드용)',
      '**등기번호(13자리)·내용증명발급일자·휴대폰번호** 입력',
    ],
    links: [LIFE_LINK],
  },
  {
    id: 'doc-life-visit',
    icon: '🏢',
    title: '방문·우편',
    steps: [
      '내용증명 원본 + (방문 시) 신분증 지참',
      '관할 **지역본부·지부** 방문 또는 우편 발송 (09:00~17:30)',
      '처리 → 말소',
    ],
    supplies: [
      DOC_BASE_SUPPLY,
      '**신분증** (방문 시)',
      '관할 **지역본부·지부**로 방문 또는 우편 발송 (본점 불가)',
    ],
    hot: '⚠ 본점(충무로·퇴계로) 말소 업무 안 함.',
    links: [LIFE_BRANCH_LINK],
  },
];

function sections(
  assoc: MalsoAssoc,
  son: readonly MethodBlock[],
  life: readonly MethodBlock[],
): MethodSection[] {
  const s: MethodSection = { assoc: 'son', title: '손해보험협회', blocks: son };
  const l: MethodSection = { assoc: 'life', title: '생명보험협회', blocks: life };
  if (assoc === 'son') return [s];
  if (assoc === 'life') return [l];
  return [s, l];
}

export function proofSections(assoc: MalsoAssoc): MethodSection[] {
  return sections(assoc, PROOF_SON, PROOF_LIFE);
}

export function docSections(assoc: MalsoAssoc): MethodSection[] {
  return sections(assoc, DOC_SON, DOC_LIFE);
}

export const PROOF_INTRO =
  '회사가 해촉증명서를 발급해 주므로 **내용증명을 보낼 필요가 없습니다.** 받은 증명서로 협회에서 바로 말소를 신청하면 됩니다. (11일 대기 없음)';

export const BOTH_ASSOC_ALERT =
  '⚠ **손보협회 + 생보협회 양쪽 모두 말소 신청 필수** — 한 곳만 말소하면 나머지 코드가 남아 위촉 서류 접수가 불가합니다. 아래 두 협회 절차를 각각 완료하세요.';

export function addressWarning(assoc: MalsoAssoc, proof: boolean): string {
  const SON_PROOF =
    '✅ **인터넷으로 바로 신청 가능**합니다. 지역본부 방문·우편 없이 전자파일 업로드만으로 말소 신청이 됩니다. (방문 신청도 가능)';
  const SON_DOC =
    '⚠ 협회 **본점(충무로 등)은 말소 업무를 하지 않습니다.** 내용증명 발송 시 반드시 **지역본부**로 보내세요. · 지역본부 주소 → 위 링크 → **"지역본부 안내"**';
  const LIFE =
    '⚠ **인터넷 신청 전** 해촉증명서 원본을 **관할 지역본부·지부로 먼저 발송**해야 합니다. 본점(충무로·퇴계로) 말소 업무 안 함. · 지역본부 주소 → 위 링크 → **"지역본부 연락처 바로가기"**';
  const BOTH_PROOF =
    '✅ **손보협회는 인터넷으로 바로 신청 가능**합니다. ⚠ **생보협회는 인터넷 신청 전** 해촉증명서 원본을 **지역본부·지부로 먼저 발송**해야 합니다. · 생보 지역본부 → 위 링크 → **"지역본부 연락처 바로가기"**';
  const BOTH_DOC =
    '⚠ 협회 **본점은 말소 업무를 하지 않습니다.** 반드시 **지역본부**로 발송하세요. · 손보 → **"지역본부 안내"** · 생보 → **"지역본부 연락처 바로가기"**';

  if (assoc === 'son') return proof ? SON_PROOF : SON_DOC;
  if (assoc === 'life') return LIFE;
  return proof ? BOTH_PROOF : BOTH_DOC;
}

export const DOC_FLOW_STEPS: readonly {
  num: string;
  title: string;
  sub: string;
  wait?: boolean;
}[] = [
  { num: '①', title: '부수·수신처 확인', sub: '몇 부, 어디로' },
  { num: '②', title: '우체국 발송', sub: '내용증명으로 접수' },
  { num: '11일', title: '대기', sub: '발송일 기준', wait: true },
  { num: '③', title: '협회 말소 신청', sub: '인터넷 또는 방문' },
];

export function postOfficeSteps(copies: number): string[] {
  return [
    `내용증명(해촉신청서) **${copies}부** 준비 — 수신처별 1부씩, 동일 내용 · 모두 원본`,
    '각 부에 **자필서명** 완료 · 주민번호 13자리 · 수신처 주소 정확히 기재',
    '우체국 창구에서 **내용증명**으로 접수',
    '**발신인 보관용 원본 + 소인** 반드시 보관 (협회 말소 신청 시 필요)',
  ];
}

export const WAIT_PERIOD_NOTE =
  '**⏱ 대기기간** — 발송일(D-day) → 10일 경과 → **11일째 되는 날부터** 협회 말소 신청 가능. 정확한 날짜는 📅 날짜 계산기 탭에서 확인하세요.';

export function applySummary(assocName: string): string {
  return `발송일 포함 11일째부터 **${assocName}**에 직접 말소를 신청합니다. 신청 방법은 **💻 인터넷** 또는 **🏢 방문** 두 가지이며, 준비물·절차는 케이스마다 다릅니다.`;
}

export const APPLY_SUPPLY_NOTE =
  '💻 **인터넷 신청 시** — 내용증명 스캔파일 + 등기번호(13자리)·발급일자·휴대폰번호 / 🏢 **방문 시** — 신분증 + 내용증명 원본';

export const SON_MAIL_ENDING_NOTICE =
  '⚠ **손해보험협회**는 내용증명 **등기우편 방식을 종료하고 인터넷 전자파일 업로드로 전환할 예정**입니다. 정확한 시행 시점은 손보협회 공지를 확인하세요. (생보협회는 기존과 동일하게 내용증명 원본 발송 유지)';

export const HISTORY_LOOKUP = {
  rows: [
    '**이클린서비스** 조회내역지 → **경력** 항목에서 전속/교차/대리점 소속여부를 확인하세요',
    '**손보협회** — 로그인 후 보험설계사 → **설계사 이력 조회**',
    `**생보협회** — [등록·말소 이력조회](${EXTERNAL_URLS.lifeHistoryVerify}) → 개인정보동의 → 본인인증 → 조회`,
  ],
  note: '각 협회 홈페이지에서도 직접 조회 가능합니다 (아래 링크 → 이력조회)',
  links: [
    { label: '손보협회 이력조회 ↗', url: EXTERNAL_URLS.nonLifeHistory },
    { label: '생보협회 이력조회 ↗', url: EXTERNAL_URLS.lifeHistory },
  ],
} as const;

export const FORM_LOOKUP_ROW =
  '**이클린서비스** 조회내역지의 **경력**에서 등록 협회가 한 곳이면 전속, 손보·생보 양쪽이면 교차입니다.';
