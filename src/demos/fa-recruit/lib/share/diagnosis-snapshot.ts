import type { CareerResult } from '../domain/career';
import type { CandidateInfo } from '../domain/candidates';
import {
  buildDocGroups,
  checkKey,
  countDocProgress,
  countTodoProgress,
  getTodoGroups,
  todoKey,
  type DocProgress,
} from '../domain/documents';
import {
  assocMalsoDateOf,
  getApplicantType,
  getMalsoTerm,
  isAssocMalsoPending,
  type DiagnosisState,
} from '../domain/diagnosis-state';
import { visibleLimitItems, type FinalDiagnosisResult } from '../domain/final-diagnosis';
import { getPrecheckWarnings, shouldAskEclean } from '../domain/precheck';
import type { PrecheckWarningKey } from '../domain/precheck';
import {
  MALSO_TERM_LABEL,
  REENTRY_COUNT_OPTIONS,
  needsReentryCard,
  type ReentryCount,
  type ReentryState,
  type RepaymentStatus,
} from '../domain/reentry';
import type { DocGroup, DocLink } from '../domain/rules/documents';
import { LIMIT_A, LIMIT_B, LIMIT_SONBO, type LimitAnswer } from '../domain/rules/limit-items';
import { ROLE_LABEL, TYPE_LABEL, type ApplicantType, type Role } from '../domain/self-diagnosis';
import { SPECIAL_CONDITION_LABEL, replacesApplicantType } from '../domain/special-condition';
import {
  formatDate,
  formatIsoTimestamp,
  formatTimestamp,
  parseDate,
  toDisplay,
} from '../utils/date';

const EMPTY_VALUE = '미입력';

const UNRESOLVED_VALUE = '미선택';

const NO_EMPNO_VALUE = '미발급';

const NOT_APPLICABLE = '해당없음 (협회 등록 이력 없음)';

export const DISCLAIMER_SHORT = {
  new: '※ 사전 진단 · 보증보험 확인 후 최종 결정',
  other: '※ 사전 진단 · 보증보험·이클린 확인 후 최종 결정',
} as const;

export const DISCLAIMER_FULL = {
  new: '※ 본 결과는 입력 정보 기반의 사전 진단으로, 보증보험 결과 확인 후 실제 결과가 다를 수 있습니다.',
  other:
    '※ 본 결과는 입력 정보 기반의 사전 진단으로, 보증보험 결과 및 이클린서비스 확인 후 실제 결과가 다를 수 있습니다.',
} as const;

const WARNING_LINE: Record<PrecheckWarningKey, string> = {
  malso: '말소 미완료 → 실제 접수 시 말소 완료 선행 필수',
  bond: '보증보험 미진행 → 자가응답 기반, 실제 결과와 다를 수 있음',
  eclean: 'E-클린 미진행 → 자가응답 기반, 실제 결과와 다를 수 있음',
};

const CAREER_NOT_RUN = '미확인 (경력 계산 미실행)';

export type SnapshotRow = { label: string; value: string };

export type SnapshotWarning = { key: PrecheckWarningKey; line: string };

export type SnapshotLink = { text: string; url: string };

export type SnapshotCheckItem = {
  name: string;

  note: string;

  original: boolean;
  checked: boolean;
  link: SnapshotLink | null;
};

export type SnapshotLimitSection = {
  title: string;
  rows: { id: string; name: string; agency: string; answer: string }[];
};

export type SnapshotCheckGroup = {
  title: string;
  items: SnapshotCheckItem[];

  review?: boolean;
};

export type SnapshotFlaggedItem = {
  id: string;
  name: string;
  answer: Extract<LimitAnswer, 'bad' | 'blocked'>;

  suffix: string;
};

export type DiagnosisSnapshot = {

  generatedAt: string;

  judgedAt: string | null;

  candidate: {
    name: string;
    partner: string;

    birth: string;
    empno: string;

    headline: string;

    hasAny: boolean;

    rows: SnapshotRow[];
  };

  precheck: {

    malso: string;

    malsoDate: string;

    malsoStatus: string;

    bond: string;

    eclean: string;
    rows: SnapshotRow[];

    warnings: SnapshotWarning[];
  };

  identity: {
    role: Role | null;
    type: ApplicantType | null;
    roleLabel: string;

    typeLabel: string;

    specialLabel: string | null;

    targetLabel: string;

    targetDate: string;

    assocHistory: boolean;
    isNew: boolean;
  };

  career: {

    done: boolean;

    examDate: string;
    eduDate: string;
    icon: string;
    title: string;

    desc: string;

    line: string;

    expiresAt: string | null;
    basis: SnapshotRow[];
    alternatives: string[];

    conversionNote: string | null;
  };

  qualify: {

    done: boolean;
    grade: FinalDiagnosisResult['grade'] | null;
    icon: string;
    title: string;
    desc: string;
    line: string;

    flagged: SnapshotFlaggedItem[];

    flaggedText: string;

    sections: SnapshotLimitSection[];

    reentryRows: SnapshotRow[];

    reentryCount: ReentryCount | null;
    reentryCountLabel: string | null;

    malsoTermLabel: string | null;
  };

  docs: {
    groups: SnapshotCheckGroup[];
    progress: DocProgress;
  } | null;

  todos: {
    groups: SnapshotCheckGroup[];
    progress: DocProgress;

    remaining: string[];
  };

  isBlocked: boolean;

  disclaimerShort: string;
  disclaimerFull: string;
};

export type SnapshotOptions = {

  info?: CandidateInfo | null;

  now?: Date;

  today?: Date;
};

function oneLine(text: string): string {
  return text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .join(' ');
}

function displayOrRaw(digits: string): string {
  return digits.length === 8 ? toDisplay(digits) : digits;
}

function buildCandidate(info: CandidateInfo | null): DiagnosisSnapshot['candidate'] {
  const partner = info?.partner.trim() ?? '';
  const name = info?.name.trim() ?? '';
  const birth = displayOrRaw(info?.birth.trim() ?? '');
  const empno = info?.empno.trim() ?? '';

  const rows: SnapshotRow[] = [];
  if (partner) rows.push({ label: '파트너명', value: partner });
  if (name) rows.push({ label: '성명', value: name });
  if (birth) rows.push({ label: '생년월일', value: birth });

  if (info) rows.push({ label: '인카사번', value: empno || NO_EMPNO_VALUE });

  return {
    name,
    partner,
    birth,
    empno,
    headline: [name, partner].filter(Boolean).join(' · '),
    hasAny: Boolean(partner || name || birth || empno),
    rows,
  };
}

function buildPrecheck(
  state: DiagnosisState,
  assocHistory: boolean,
  today: Date | undefined,
): DiagnosisSnapshot['precheck'] {

  const malsoRaw = parseDate(assocMalsoDateOf(state));
  const pending = isAssocMalsoPending(state, today);
  const malso = describeMalso(state, assocHistory, today);
  const bond = answerLabel(state.precheck.bond);
  const eclean = shouldAskEclean(assocHistory, state.specialCondition.condition)
    ? answerLabel(state.precheck.eclean)
    : NOT_APPLICABLE;

  return {
    malso,
    malsoDate: assocHistory && malsoRaw ? formatDate(malsoRaw) : '',
    malsoStatus: !assocHistory ? '해당없음' : !malsoRaw ? NO_ANSWER : pending ? '미완료' : '완료',
    bond,
    eclean,
    rows: [
      { label: '협회 말소일', value: malso },
      { label: '보증보험 동의', value: bond },
      { label: 'E-클린 조회', value: eclean },
    ],
    warnings: getPrecheckWarnings(
      state.precheck,
      assocHistory,
      state.specialCondition.condition,
      pending,
    ).map((w) => ({ key: w.key, line: `⚠️ ${WARNING_LINE[w.key]}` })),
  };
}

function answerLabel(answer: 'done' | 'not-yet' | null): string {
  if (answer === 'done') return '완료';
  if (answer === 'not-yet') return '미진행';
  return EMPTY_VALUE;
}

function describeMalso(
  state: DiagnosisState,
  assocHistory: boolean,
  today: Date | undefined,
): string {
  if (!assocHistory) return NOT_APPLICABLE;
  const malso = parseDate(assocMalsoDateOf(state));
  if (!malso) return EMPTY_VALUE;
  const pending = isAssocMalsoPending(state, today);
  return `${formatDate(malso)} (${pending ? '예정 · 미완료' : '완료'})`;
}

function buildIdentity(
  state: DiagnosisState,
  type: ApplicantType | null,
): DiagnosisSnapshot['identity'] {
  const role = state.selfDiagnosis.role;
  const condition = state.specialCondition.condition;
  const specialLabel = condition ? SPECIAL_CONDITION_LABEL[condition] : null;

  const roleLabel = role ? ROLE_LABEL[role] : UNRESOLVED_VALUE;

  const typeLabel = replacesApplicantType(condition)
    ? SPECIAL_CONDITION_LABEL[condition]
    : type
      ? TYPE_LABEL[type]
      : UNRESOLVED_VALUE;

  const targetLabel = [specialLabel ?? '일반', roleLabel].join(' · ');

  return {
    role,
    type,
    roleLabel,
    typeLabel,
    specialLabel,
    targetLabel,
    targetDate: toDisplay(state.careerForm.targetDate) || EMPTY_VALUE,
    assocHistory: state.selfDiagnosis.assocHistory === true,
    isNew: type === 'new',
  };
}

function buildCareer(
  result: CareerResult | null,
  form: DiagnosisState['careerForm'],
  type: ApplicantType | null,
): DiagnosisSnapshot['career'] {
  const examDate = toDisplay(form.examDate) || NO_ANSWER;

  const eduDate = toDisplay(type === 'senior' ? form.eduDateSr : form.eduDateNew) || NO_ANSWER;

  if (!result) {
    return {
      done: false,
      examDate,
      eduDate,
      icon: '',
      title: CAREER_NOT_RUN,
      desc: '',
      line: CAREER_NOT_RUN,
      expiresAt: null,
      basis: [],
      alternatives: [],
      conversionNote: null,
    };
  }
  const desc = result.desc;
  return {
    done: true,
    examDate,
    eduDate,
    icon: result.icon,
    title: result.title,
    desc,
    line: [result.title, oneLine(desc)].filter(Boolean).join(' · '),
    expiresAt: result.expiresAt ? formatDate(result.expiresAt) : null,
    basis: result.basis.map((row) => ({
      label: row.label,
      value: row.dday ? `${row.value} (${row.dday})` : row.value,
    })),
    alternatives: [...result.alternatives],
    conversionNote: result.conversionNote ?? null,
  };
}

function buildFlagged(
  type: ApplicantType | null,
  answers: DiagnosisState['diagAnswers'],
): SnapshotFlaggedItem[] {
  if (!type) return [];
  const items = [
    ...visibleLimitItems(LIMIT_SONBO, type),
    ...visibleLimitItems(LIMIT_A, type),
    ...visibleLimitItems(LIMIT_B, type),
  ];
  return items.flatMap((item) => {
    const answer = answers[item.id];
    if (answer !== 'bad' && answer !== 'blocked') return [];
    return [
      {
        id: item.id,
        name: item.n,
        answer,
        suffix: answer === 'blocked' ? '위촉불가' : '해당',
      },
    ];
  });
}

const ANSWER_LABEL: Record<LimitAnswer, string> = {
  ok: '해당없음',
  bad: '해당',
  blocked: '해당(불가수준)',
};

const NO_ANSWER = '-';

function buildSections(
  type: ApplicantType | null,
  answers: DiagnosisState['diagAnswers'],
): SnapshotLimitSection[] {
  if (!type) return [];
  const groups = [
    { title: '위촉 불가 항목', list: LIMIT_A },
    { title: '심사 대상 항목', list: LIMIT_B },
    { title: '손보 협회등록 확인', list: LIMIT_SONBO },
  ];
  return groups.flatMap(({ title, list }) => {
    const items = visibleLimitItems(list, type);
    if (items.length === 0) return [];
    return [
      {
        title,
        rows: items.map((item) => ({
          id: item.id,
          name: item.n,
          agency: item.agency || NO_ANSWER,
          answer: answers[item.id] ? ANSWER_LABEL[answers[item.id]!] : NO_ANSWER,
        })),
      },
    ];
  });
}

function buildReentryRows(
  reentry: ReentryState,
  malsoTermText: string | null,
  countLabel: string | null,
): SnapshotRow[] {

  if (reentry.count === '0') return [];
  const repayment = (v: RepaymentStatus | null) =>
    v === 'exist' ? '있음' : v === 'none' ? '없음' : NO_ANSWER;
  return [
    { label: '당사 등록 횟수', value: countLabel ?? NO_ANSWER },
    { label: '협회 말소 경과', value: malsoTermText ?? NO_ANSWER },
    { label: '환수금', value: repayment(reentry.repayment) },
    { label: '환수예상금', value: repayment(reentry.repaymentExpected) },
  ];
}

function linkOf(item: { link?: string; links?: readonly DocLink[] }): SnapshotLink | null {
  const withUrl = item.links?.filter((l) => l.url) ?? [];
  if (withUrl.length > 0) {
    const text = withUrl.length === 1 ? withUrl[0].label : withUrl.map((l) => l.label).join(' / ');
    return { text, url: withUrl[0].url! };
  }
  if (item.link) return { text: '바로가기', url: item.link };
  return null;
}

function reentryCountLabel(
  reentry: ReentryState,
  type: ApplicantType | null,
  assocHistory: boolean,
): string | null {
  if (!needsReentryCard(type, assocHistory)) return null;
  return REENTRY_COUNT_OPTIONS.find((o) => o.value === reentry.count)?.label ?? null;
}

function toCheckGroups(
  groups: readonly DocGroup[],
  keyOf: (name: string) => string,
  checks: DiagnosisState['docChecks'],
): SnapshotCheckGroup[] {
  return groups.map((group) => ({
    title: group.t,
    review: group.review,
    items: group.i.map((item) => ({
      name: item.n,
      note: item.s,
      original: item.org,
      checked: Boolean(checks[keyOf(item.n)]),
      link: linkOf(item),
    })),
  }));
}

export function buildDiagnosisSnapshot(
  state: DiagnosisState,
  options: SnapshotOptions = {},
): DiagnosisSnapshot {
  const { info = null, now = new Date(), today } = options;

  const type = getApplicantType(state);
  const role = state.selfDiagnosis.role;
  const assocHistory = state.selfDiagnosis.assocHistory === true;
  const result = state.qualifyResult;

  const identity = buildIdentity(state, type);
  const flagged = buildFlagged(type, state.diagAnswers);

  const docs =
    result && type && role
      ? (() => {
          const groups = buildDocGroups({
            type,
            role,
            special: state.specialCondition,
            result,
            answers: state.diagAnswers,
          });
          return {
            groups: toCheckGroups(groups, (n) => checkKey(type, n), state.docChecks),
            progress: countDocProgress(groups, type, state.docChecks),
          };
        })()
      : null;

  const todoGroups = toCheckGroups(getTodoGroups(), todoKey, state.docChecks);

  const malsoTerm = getMalsoTerm(state);
  const malsoTermText = malsoTerm ? MALSO_TERM_LABEL[malsoTerm] : null;
  const countLabel = reentryCountLabel(state.reentry, type, assocHistory);

  const disclaimerKey = type === 'new' ? 'new' : 'other';

  return {
    generatedAt: formatTimestamp(now),
    judgedAt: formatIsoTimestamp(state.judgedAt),
    candidate: buildCandidate(info),
    precheck: buildPrecheck(state, assocHistory, today),
    identity,
    career: buildCareer(state.careerResult, state.careerForm, type),
    qualify: {
      done: result !== null,
      grade: result?.grade ?? null,
      icon: result?.icon ?? '',
      title: result?.title ?? '미판정',
      desc: result?.desc ?? '',
      line: result ? [result.title, oneLine(result.desc)].filter(Boolean).join(' · ') : '미판정',
      flagged,
      flaggedText: flagged.map((f) => f.name).join(' / ') || NO_ANSWER,
      sections: buildSections(type, state.diagAnswers),
      reentryRows: buildReentryRows(state.reentry, malsoTermText, countLabel),
      reentryCount: needsReentryCard(type, assocHistory) ? state.reentry.count : null,
      reentryCountLabel: countLabel,
      malsoTermLabel: malsoTermText,
    },
    docs,
    todos: {
      groups: todoGroups,
      progress: countTodoProgress(state.docChecks),
      remaining: todoGroups.flatMap((g) => g.items.filter((i) => !i.checked).map((i) => i.name)),
    },
    isBlocked: result?.grade === 'bad',
    disclaimerShort: DISCLAIMER_SHORT[disclaimerKey],
    disclaimerFull: DISCLAIMER_FULL[disclaimerKey],
  };
}
