export type LimitAnswer = 'ok' | 'bad' | 'blocked';

export type LimitItem = {
  id: string;

  n: string;

  s: string;
  agency: string;

  note: string;

  q: string;

  qOk?: string;
  qBad?: string;
  qBlocked?: string;

  threeChoice?: true;

  newExclude?: true;

  internalOnly?: true;

  reviewExempt?: true;

  exemptNote?: string;

  doc?: { n: string; s: string };
};

export const LIMIT_A: readonly LimitItem[] = [
  {
    id: 'pasan',
    n: "대외비",
    s: '보증보험',
    agency: '보증보험',
    note: "대외비 대외비\n대외비\n대외비 대외비 대외비 대외비\n대외비 대외비",
    q: "대외비 대외비",
  },
  {
    id: 'ins_acc',
    n: "대외비",
    s: '보증보험',
    agency: '보증보험',
    note: "대외비 대외비\n대외비",
    q: "대외비 대외비",
    newExclude: true,
  },
  {
    id: 'repay_bad_grade',
    n: "대외비",
    s: '이클린',
    agency: '이클린',
    note: "대외비 대외비\n대외비",
    q: "대외비 대외비 대외비",
    newExclude: true,
  },
  {
    id: 'repay_unpaid',
    n: "대외비",
    s: '이클린',
    agency: '이클린',
    note: "대외비 대외비\n대외비",
    q: "대외비 대외비 대외비",
    newExclude: true,
  },
  {
    id: 'bad_recruit',
    n: "대외비",
    s: '이클린/보험사',
    agency: '이클린/보험사',
    note: "대외비",
    q: "대외비",
    newExclude: true,
  },
  {
    id: 'law_violation',
    n: "대외비",
    s: '이클린/보험사',
    agency: '이클린/보험사',
    note: "대외비 대외비",
    q: "대외비 대외비",
    newExclude: true,
  },
  {
    id: 'fin_acc_person',
    n: "대외비",
    s: '경력증명서',
    agency: '경력증명서',
    note: "대외비\n대외비",
    q: "대외비 대외비",
    newExclude: true,
  },
  {
    id: 'reentry_bad',
    n: "대외비",
    s: '당사 확인',
    agency: '당사 확인',
    note: "대외비",
    q: "대외비 대외비",
    internalOnly: true,
  },
  {
    id: 'forced_term',
    n: "대외비",
    s: '당사 확인',
    agency: '당사 확인',
    note: "대외비",
    q: "대외비 대외비",
    internalOnly: true,
  },
];

export const LIMIT_B: readonly LimitItem[] = [
  {
    id: 'fin_acc_reg',
    n: "대외비",
    s: '보증보험 or 개인채무기관',
    agency: '보증보험 or 개인채무기관',
    note: "대외비 대외비\n대외비\n대외비 대외비\n대외비\n대외비 대외비\n대외비\n대외비\n대외비 대외비 대외비 대외비 대외비\n대외비 대외비 대외비 대외비 대외비\n대외비 대외비 대외비",
    q: "대외비 대외비 대외비",
    qOk: "해당없음",
    qBad: "해당 · 기준 이하",
    qBlocked: "해당 · 기준 초과",
    threeChoice: true,
    doc: { n: "대외비", s: '보증보험 or 개인채무기관' },
  },
  {
    id: 'rehab',
    n: "대외비",
    s: '보증보험',
    agency: '보증보험',
    note: "대외비 대외비\n대외비\n대외비 대외비",
    q: "대외비",
    qOk: "해당없음",
    qBad: "해당 · 기준 이하",
    qBlocked: "해당 · 기준 초과",
    threeChoice: true,
    doc: { n: "대외비", s: '법원/신용회복기관' },
  },
  {
    id: 'eclean_ins',
    n: "대외비",
    s: '이클린',
    agency: '이클린',
    note: "대외비\n대외비",
    q: "대외비 대외비 대외비",
    newExclude: true,
  },
  {

    id: 'transfer_limit_b',
    n: "대외비",
    s: '이클린/협회',
    agency: '이클린/협회',
    note: "대외비 대외비\n\n대외비\n대외비 대외비 대외비\n대외비 대외비 대외비\n대외비 대외비 대외비",
    q: "대외비 대외비 대외비 대외비 대외비",
    newExclude: true,
  },
  {

    id: 'incomplete_sale',
    n: "대외비",
    s: '이클린/보험사',
    agency: '이클린/보험사',
    note: "대외비 대외비",
    q: "대외비 대외비 대외비",
    newExclude: true,
  },
  {
    id: 'reentry_limit',
    n: "대외비",
    s: '당사 확인',
    agency: '당사 확인',
    note: "대외비",
    q: "대외비 대외비",
    newExclude: true,
  },
  {

    id: 'repay_ok',
    n: "대외비",
    s: '이클린',
    agency: '이클린',
    note: "대외비\n대외비 대외비 대외비\n대외비 대외비",
    q: "대외비 대외비 대외비",
    doc: { n: "대외비", s: '보험사 외' },
    reviewExempt: true,
    exemptNote:
      "대외비 대외비 대외비 대외비 대외비",
    newExclude: true,
  },
];

export const LIMIT_SONBO: readonly LimitItem[] = [
  {
    id: 'sonbo_limit',
    n: "대외비 대외비",
    s: '협회',
    agency: '협회/이클린',
    note: "대외비 대외비 대외비 대외비 대외비",
    q: "대외비 대외비 대외비 대외비 대외비",
    newExclude: true,
  },
];

export const SONBO_LIMIT_ID = 'sonbo_limit';

export const REENTRY_LIMIT_ID = 'reentry_limit';

export type LimitCardKey = 'sonbo' | 'limitA' | 'limitB';

export const LIMIT_CARDS: readonly {
  key: LimitCardKey;
  badge: string;
  title: string;
  items: readonly LimitItem[];

  tone: 'ok' | 'warn' | 'danger';
}[] = [
  {
    key: 'sonbo',
    badge: 'S',
    title: '손해보험 협회등록사 확인',
    items: LIMIT_SONBO,
    tone: 'warn',
  },
  {
    key: 'limitA',
    badge: 'A',
    title: '위촉 불가 항목 (심사 불가)',
    items: LIMIT_A,
    tone: 'danger',
  },
  {
    key: 'limitB',
    badge: 'B',
    title: '심사 대상 항목 (승인 필요)',
    items: LIMIT_B,
    tone: 'warn',
  },
];
