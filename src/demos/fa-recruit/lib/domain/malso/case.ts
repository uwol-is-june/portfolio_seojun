export type MalsoOrg = 'company' | 'agency';

export type MalsoForm = 'jeon' | 'gyo';

export type MalsoAssoc = 'son' | 'life' | 'both';

export type MalsoProof = 'yes' | 'no';

export type MalsoCaseId =
  'jeon-son' | 'jeon-life' | 'gyo' | 'agency-son' | 'agency-life' | 'agency-both';

export type MalsoCase = {
  id: MalsoCaseId;

  label: string;

  hint: string;

  typeLabel: string;
  org: MalsoOrg;
  assoc: MalsoAssoc;

  both: boolean;

  copies: number;

  mailTargets: readonly string[];
};

export const ASSOC_NAME: Record<MalsoAssoc, string> = {
  son: '손해보험협회',
  life: '생명보험협회',
  both: '양쪽 협회',
};

export const KEEP_TARGETS = ['우체국 (발송 보관)', '본인 (보관용)'] as const;

const SON = '손해보험협회';
const LIFE = '생명보험협회';

const CASE_SEEDS: readonly Omit<MalsoCase, 'copies'>[] = [
  {
    id: 'jeon-son',
    label: '전속 · 손보',
    hint: '손해보험협회 1곳',
    typeLabel: '전속사 등록자 (손해보험협회)',
    org: 'company',
    assoc: 'son',
    both: false,
    mailTargets: ['소속 보험회사 본사 (대표이사 앞)', SON],
  },
  {
    id: 'jeon-life',
    label: '전속 · 생보',
    hint: '생명보험협회 1곳',
    typeLabel: '전속사 등록자 (생명보험협회)',
    org: 'company',
    assoc: 'life',
    both: false,
    mailTargets: ['소속 보험회사 본사 (대표이사 앞)', LIFE],
  },
  {
    id: 'gyo',
    label: '교차',
    hint: '손보+생보 양쪽',
    typeLabel: '전속사 교차등록자',
    org: 'company',
    assoc: 'both',
    both: true,

    mailTargets: ['소속(전속) 보험회사 본사 (대표이사 앞)', SON, LIFE],
  },
  {
    id: 'agency-son',
    label: '대리점 · 손보',
    hint: '손해보험협회 1곳',
    typeLabel: 'GA대리점 등록자 (손해보험협회)',
    org: 'agency',
    assoc: 'son',
    both: false,
    mailTargets: ['소속 대리점 본사 (대표이사 앞)', SON],
  },
  {
    id: 'agency-life',
    label: '대리점 · 생보',
    hint: '생명보험협회 1곳',
    typeLabel: 'GA대리점 등록자 (생명보험협회)',
    org: 'agency',
    assoc: 'life',
    both: false,
    mailTargets: ['소속 대리점 본사 (대표이사 앞)', LIFE],
  },
  {
    id: 'agency-both',
    label: '대리점 · 양쪽',
    hint: '손보+생보 양쪽',
    typeLabel: 'GA대리점 등록자 (양쪽 협회)',
    org: 'agency',
    assoc: 'both',
    both: true,
    mailTargets: ['소속 대리점 본사 (대표이사 앞)', SON, LIFE],
  },
];

export const MALSO_CASES: Readonly<Record<MalsoCaseId, MalsoCase>> = Object.fromEntries(
  CASE_SEEDS.map((seed) => [seed.id, { ...seed, copies: seed.mailTargets.length + 2 }]),
) as Record<MalsoCaseId, MalsoCase>;

export const CASE_GROUPS: readonly { title: string; ids: readonly MalsoCaseId[] }[] = [
  { title: '전속사 (보험회사 소속)', ids: ['jeon-son', 'jeon-life', 'gyo'] },
  { title: 'GA대리점 (대리점 소속)', ids: ['agency-son', 'agency-life', 'agency-both'] },
];

export const DEFAULT_CASE_ID: MalsoCaseId = 'jeon-son';

export function recipientList(c: MalsoCase): string[] {
  return [...c.mailTargets, ...KEEP_TARGETS];
}

export type MalsoCaseAnswers = {
  org: MalsoOrg | null;

  form: MalsoForm | null;
  assoc: MalsoAssoc | null;
};

export function resolveCase(a: MalsoCaseAnswers): MalsoCase | null {
  if (!a.org) return null;

  if (a.org === 'agency') {
    if (!a.assoc) return null;
    if (a.assoc === 'both') return MALSO_CASES['agency-both'];
    return a.assoc === 'son' ? MALSO_CASES['agency-son'] : MALSO_CASES['agency-life'];
  }

  if (!a.form) return null;

  if (a.form === 'gyo') return MALSO_CASES.gyo;

  if (!a.assoc || a.assoc === 'both') return null;
  return a.assoc === 'son' ? MALSO_CASES['jeon-son'] : MALSO_CASES['jeon-life'];
}

export function caseSummaryText(c: MalsoCase, proof: MalsoProof): string {
  const orgTxt = c.org === 'company' ? '전속사(보험회사 소속)' : 'GA대리점(대리점 소속)';
  const regTxt =
    c.org === 'agency'
      ? c.both
        ? '양쪽 협회 등록'
        : `${ASSOC_NAME[c.assoc]} 등록`
      : c.both
        ? '교차 등록'
        : '전속 등록';
  const pathTxt =
    proof === 'yes'
      ? '회사가 발급한 해촉증명서로 바로 말소를 신청합니다. (내용증명·대기 없음)'
      : `내용증명을 ${c.copies}부 발송하고 11일째부터 말소를 신청합니다.`;
  return `${orgTxt} / ${regTxt}. ${pathTxt}`;
}

export const BOTH_ASSOC_WARNING =
  '손보협회 + 생보협회 양쪽 모두 말소 신청 필수 — 한 곳만 말소하면 나머지 코드가 남아 위촉 서류 접수가 불가합니다.';

export const RECIPIENT_ADDRESS_WARNING =
  '협회 수신처는 본인 관할 지역본부·지부 등록 주소와 정확히 일치해야 합니다. 본점·엉뚱한 지점으로 보내면 말소가 거부됩니다.';

export const GYO_COMPANY_WARNING =
  '교차등록자 주의 — 내용증명을 받는 회사는 본인이 전속으로 소속된 회사 1곳입니다. 교차로 위탁받은 회사가 아니라 전속 소속사를 적으세요. (손보·생보 협회는 양쪽 모두 말소합니다)';
