import {
  addYears,
  ddayLabel,
  earlier,
  formatDate,
  parseDate,
  startOfToday,
} from '../utils/date';
import {
  careerDaysAt,
  findCareerDeadline,
  hasInvertedRecord,
  latestRecordEnd,
  type CareerRecord,
} from './career-record';
import { CAREER_CRITERIA, type ApplicantType, type Role } from './self-diagnosis';
import {
  isForeignerBlocked,
  replacesApplicantType,
  type SpecialConditionState,
  type TypeReplacingCondition,
} from './special-condition';

export type CareerVerdict = 'ok' | 'warn' | 'bad';

export type CareerBasisRow = {
  label: string;
  value: string;

  dday?: string;
  highlight?: boolean;
};

export type CareerResult = {
  verdict: CareerVerdict;
  icon: string;
  title: string;
  desc: string;
  basis: CareerBasisRow[];

  alternatives: string[];

  note?: string;

  expiresAt?: Date;

  needsGeneralRoute?: true;

  conversionNote?: string;
};

export type CareerOutcome =
  | { kind: 'incomplete'; message: string; convertedType?: ApplicantType }
  | { kind: 'result'; result: CareerResult; convertedType?: ApplicantType };

export {
  careerDaysAt,
  findCareerDeadline,
  hasCompleteRecords,
  hasInvertedRecord,
  isRecordInverted,
  latestRecordEnd,
  latestRecordIndex,
  type CareerRecord,
} from './career-record';

export type CareerInput = {
  role: Role;
  type: ApplicantType;

  assocHistory: boolean;

  targetDate: string;
  examDate: string;
  eduDateNew: string;
  eduDateSr: string;

  careerRecords: CareerRecord[];

  otherCareerRecords: CareerRecord[];

  assocMalsoDate: string;
};

export const EMPTY_CAREER_INPUT: Omit<CareerInput, 'role' | 'type' | 'assocHistory'> = {
  targetDate: '',
  examDate: '',
  eduDateNew: '',
  eduDateSr: '',
  careerRecords: [],
  otherCareerRecords: [],
  assocMalsoDate: '',
};

export function resolveMalsoDate(input: CareerInput): string {
  return latestRecordEnd(input.careerRecords);
}

export function isMalsoDatePending(malsoDate: string, today: Date = startOfToday()): boolean {
  const malso = parseDate(malsoDate);
  return malso !== null && malso > today;
}

export function isMalsoPending(
  records: readonly CareerRecord[],
  today: Date = startOfToday(),
): boolean {
  return isMalsoDatePending(latestRecordEnd(records), today);
}

export function needsNewConversion(input: CareerInput): boolean {
  if (input.type !== 'junior') return false;
  const malso = parseDate(resolveMalsoDate(input));
  const target = parseDate(input.targetDate);
  if (!malso || !target) return false;
  return target > addYears(malso, 1);
}

export const CONVERTED_TO_NEW_MESSAGE = '말소 후 1년 초과 — 신인으로 전환되었습니다.';

export const TYPE_UNRESOLVED_MESSAGE =
  '등록예정일과 경력 구간(위촉일·말소일)을 입력해주세요. 말소 전이면 예정일을 넣어도 됩니다.';

export const INVERTED_RECORD_MESSAGE =
  '경력 구간의 위촉일이 말소일보다 뒤입니다. 두 날짜를 바꿔 넣지 않았는지 확인해주세요.';

export function careerRecordsInUse(
  input: Pick<CareerInput, 'careerRecords' | 'otherCareerRecords' | 'assocHistory'>,
  special: SpecialConditionState,
): readonly CareerRecord[] {
  if (special.condition && replacesApplicantType(special.condition)) {
    return input.otherCareerRecords;
  }
  return input.assocHistory ? input.careerRecords : [];
}

function conversionNote(input: CareerInput): string | undefined {
  const malso = parseDate(resolveMalsoDate(input));
  const target = parseDate(input.targetDate);
  if (!malso || !target) return undefined;
  return `말소일 ${formatDate(malso)} 로부터 1년이 지난 뒤 등록(${formatDate(target)})이라 경력신입에서 신인으로 전환되었습니다.`;
}

export function calculateRookieCareer(input: CareerInput): CareerOutcome {
  const target = parseDate(input.targetDate);
  if (!target) return { kind: 'incomplete', message: '등록예정일(8자리)을 입력해주세요.' };

  const exam = parseDate(input.examDate);
  const edu = parseDate(input.eduDateNew);
  if (!exam || !edu) return { kind: 'incomplete', message: '날짜를 모두 입력해주세요.' };

  const earlierIsExam = exam < edu;
  const earlierItem = earlierIsExam ? '시험 합격증' : '등록교육 수료증';
  const earlierAction = earlierIsExam ? '신규 시험에 다시 응시' : '신규 등록교육을 다시 이수';
  const earlierDate = earlierIsExam ? exam : edu;
  const laterDate = earlierIsExam ? edu : exam;

  const gapWithin1y = laterDate <= addYears(earlierDate, 1);

  const expiresAt = earlier(addYears(exam, 1), addYears(edu, 1));
  const withinExpiry = target <= expiresAt;

  const expiringItem = addYears(exam, 1) <= addYears(edu, 1) ? '시험 합격증' : '등록교육 수료증';

  if (!gapWithin1y) {
    return {
      kind: 'result',
      result: {
        verdict: 'bad',
        icon: '🛑',
        title: '시험·교육 간격 초과',
        desc: `시험 합격일(${formatDate(exam)})과 등록교육 수료일(${formatDate(edu)}) 간격이 1년을 초과하여 위촉 불가합니다.`,
        basis: [],
        alternatives: [
          `먼저 취득한 ${earlierItem}이 1년 이상 앞섭니다 → ${earlierAction}해 두 날짜 간격을 1년 이내로 맞추세요.`,
          '재취득 후, 두 조건을 최종 만족한 날 기준 1년(만료일) 안에 등록예정일이 들어오는지도 확인하세요.',
        ],
      },
    };
  }

  if (!withinExpiry) {
    return {
      kind: 'result',
      result: {
        verdict: 'bad',
        icon: '🛑',
        title: '등록 기한 초과',
        desc: `${expiringItem} 취득 후 1년이 경과했습니다. 시험 합격일(${formatDate(exam)})·등록교육 수료일(${formatDate(edu)}) 각각 취득일로부터 1년 이내에 등록해야 합니다. (만료일 ${formatDate(expiresAt)} · 등록예정일 ${formatDate(target)})`,
        basis: [],
        alternatives: [
          `${expiringItem}을 다시 취득하세요. (${expiringItem === '시험 합격증' ? '신규 시험 재응시' : '신규 등록교육 재이수'})`,
          '재취득 후 두 날짜 간격 1년 이내, 두 증서가 각각 등록예정일로부터 1년 이내인지 확인하세요.',
        ],
      },
    };
  }

  return {
    kind: 'result',
    result: {
      verdict: 'ok',
      icon: '✅',
      title: '등록 요건 충족',
      desc: '유효기간 내 접수 가능 (두 증서가 각각 취득일 + 1년 이내)',
      basis: [
        { label: '시험 합격일', value: formatDate(exam) },
        { label: '등록교육 이수일', value: formatDate(edu) },
        {
          label: '유효기간 만료일',
          value: formatDate(expiresAt),
          dday: ddayLabel(target, expiresAt),
          highlight: true,
        },
        { label: '등록예정일', value: formatDate(target) },
      ],
      alternatives: [],
      note: `유효기간은 먼저 만료되는 증서(${expiringItem}) 기준입니다 — 두 증서가 각각 취득일로부터 1년 유효합니다`,
      expiresAt,
    },
  };
}

export function calculateSeniorCareer(input: CareerInput): CareerOutcome {
  const target = parseDate(input.targetDate);
  if (!target) return { kind: 'incomplete', message: '등록예정일(8자리)을 입력해주세요.' };

  const edu = parseDate(input.eduDateSr);
  if (!edu) return { kind: 'incomplete', message: '등록교육 이수일을 입력해주세요.' };

  const eduExpiresAt = addYears(edu, 1);
  if (target > eduExpiresAt) {
    return {
      kind: 'result',
      result: {
        verdict: 'bad',
        icon: '🛑',
        title: '교육 수료 기간 만료',
        desc: `경력등록교육(보수교육) 재이수 필요
(이수일 ${formatDate(edu)} · 만료일 ${formatDate(eduExpiresAt)} · 등록예정일 ${formatDate(target)})`,
        basis: [],
        alternatives: eduReissueAlternatives('경력등록교육(보수교육)'),
      },
    };
  }

  if (input.careerRecords.length === 0) {
    return { kind: 'incomplete', message: '회사 경력을 1건 이상 추가해주세요.' };
  }

  const hasValidRecord = input.careerRecords.some((r) => parseDate(r.start) && parseDate(r.end));
  if (!hasValidRecord) {
    return { kind: 'incomplete', message: '추가된 경력의 위촉일·말소일을 모두 입력해주세요.' };
  }

  const { windowYears, requiredDays } = CAREER_CRITERIA[input.role];
  const totalDays = careerDaysAt(input.careerRecords, target, windowYears);

  if (totalDays < requiredDays) {
    return {
      kind: 'result',
      result: {
        verdict: 'warn',
        icon: '⚠️',
        title: '경력 일수 부족',
        desc: `시험 응시 + 신규 등록교육 수료 필요 (최근 ${windowYears}년 내 ${totalDays}일, 기준: ${requiredDays}일)`,
        basis: [],
        alternatives: [],
      },
    };
  }

  const careerDeadline = findCareerDeadline(input.careerRecords, target, windowYears, requiredDays);

  const expiresAt = earlier(eduExpiresAt, careerDeadline);
  const bindLabel = eduExpiresAt < careerDeadline ? '보수교육' : '경력 인정 마감';
  const roleLabel = input.role === 'sales' ? '설계사' : '유자격자';

  return {
    kind: 'result',
    result: {
      verdict: 'ok',
      icon: '✅',
      title: '경력자 인정',
      desc: `최근 ${windowYears}년 내 ${totalDays}일 충족 · 유효기간 만료 ${formatDate(expiresAt)} (${bindLabel} 기준)`,
      basis: [
        { label: '등록예정일', value: formatDate(target) },
        {
          label: '경력 조회 기간',
          value: `${formatDate(addYears(target, -windowYears))} ~ ${formatDate(target)}`,
        },
        {
          label: '누적 경력일수',
          value: `${totalDays}일 (기준 ${requiredDays}일 이상 · ${roleLabel})`,
        },
        { label: '경력등록교육(보수교육) 만료일', value: formatDate(eduExpiresAt) },
        { label: '경력 인정 마감일', value: formatDate(careerDeadline) },
        {
          label: '유효기간 만료일',
          value: formatDate(expiresAt),
          dday: ddayLabel(target, expiresAt),
          highlight: true,
        },
      ],
      alternatives: [],
      expiresAt,
    },
  };
}

export function blockedForeignerResult(): CareerResult {
  return {
    verdict: 'bad',
    icon: '🛑',
    title: '등록 불가 체류자격',
    desc: '선택하신 체류자격은 협회 등록이 불가합니다. 경력 요건과 무관하게 위촉이 제한됩니다.',
    basis: [],
    alternatives: ['거주(F-2)·재외동포(F-4)·영주(F-5)·결혼이민(F-6) 자격자만 등록 가능합니다.'],
  };
}

export const GENERAL_ROUTE_ALTERNATIVES: readonly string[] = [
  '시험 응시 + (신규) 등록교육 수료 후 일반 경로로 등록할 수 있습니다.',
  '과거 설계사 경력이 있으면 일반 경로에서 그 경력으로 다시 판정받을 수 있습니다. (경력 요건 충족 시 시험 없이 경력자 등록 가능)',
];

export const OTHER_EDU_REQUIRED_MESSAGE =
  '경력자 등록교육 이수일을 입력해주세요. 아직 이수하지 않았으면 예정일을 넣어도 됩니다.';

export function eduReissueAlternatives(eduName: string): string[] {
  return [
    `${eduName}을 다시 이수하세요.`,
    '아직 이수 전이면 재이수 예정일을 이수일 칸에 넣으면 진단을 이어서 볼 수 있습니다. (이수일 + 1년 안에 등록예정일이 들어와야 합니다)',
  ];
}

export const GENERAL_ROUTE_BUTTON_LABEL = '일반 경로로 다시 진단하기';

export function otherCareerCriteria(

  role: Role | null,
  condition: TypeReplacingCondition,
): { windowYears: number; requiredDays: number; label: string } {
  if (condition === 'adjuster') return CAREER_CRITERIA.sales;
  return CAREER_CRITERIA[role ?? 'sales'];
}

export function calculateOtherCareer(
  input: CareerInput,
  condition: TypeReplacingCondition,
): CareerOutcome {
  const target = parseDate(input.targetDate);
  if (!target) {
    return { kind: 'incomplete', message: '등록예정일(8자리)을 입력해주세요.' };
  }

  const { windowYears, requiredDays } = otherCareerCriteria(input.role, condition);
  const totalDays = careerDaysAt(input.otherCareerRecords, target, windowYears);
  const label = condition === 'adjuster' ? '손해사정사' : '보험사 내근직';

  if (totalDays < requiredDays) {

    return {
      kind: 'result',
      result: {
        verdict: 'warn',
        icon: '⚠️',
        title: '경력 일수 부족',
        desc: `최근 ${windowYears}년 내 ${totalDays}일 (기준: ${requiredDays}일 이상)\n${label} 경력 요건 미충족`,
        basis: [],
        alternatives: [...GENERAL_ROUTE_ALTERNATIVES],
        needsGeneralRoute: true,
      },
    };
  }

  const edu = parseDate(input.eduDateSr);
  if (!edu) {
    return { kind: 'incomplete', message: OTHER_EDU_REQUIRED_MESSAGE };
  }
  const eduExpiresAt = addYears(edu, 1);
  if (target > eduExpiresAt) {
    return {
      kind: 'result',
      result: {
        verdict: 'bad',
        icon: '🛑',
        title: '교육 수료 기간 만료',
        desc: `경력자 등록교육 재이수 필요
(이수일 ${formatDate(edu)} · 만료일 ${formatDate(eduExpiresAt)} · 등록예정일 ${formatDate(target)})`,
        basis: [],
        alternatives: eduReissueAlternatives('경력자 등록교육'),
      },
    };
  }

  return {
    kind: 'result',
    result: {
      verdict: 'ok',
      icon: '✅',
      title: '경력 요건 충족',
      desc: `최근 ${windowYears}년 내 ${totalDays}일\n${label} 경력 인정`,
      basis: [
        { label: '등록예정일', value: formatDate(target) },
        {
          label: '경력 조회 기간',
          value: `${formatDate(addYears(target, -windowYears))} ~ ${formatDate(target)}`,
        },
        { label: '누적 경력일수', value: `${totalDays}일 (기준 ${requiredDays}일 이상)` },
        { label: '경력자 등록교육 이수일', value: formatDate(edu) },
        {
          label: '유효기간 만료일',
          value: formatDate(eduExpiresAt),
          dday: ddayLabel(target, eduExpiresAt),
          highlight: true,
        },
      ],
      alternatives: [],
      expiresAt: eduExpiresAt,
    },
  };
}

export function calculateCareer(input: CareerInput, special: SpecialConditionState): CareerOutcome {
  if (isForeignerBlocked(special)) {
    return { kind: 'result', result: blockedForeignerResult() };
  }

  if (hasInvertedRecord(careerRecordsInUse(input, special))) {
    return { kind: 'incomplete', message: INVERTED_RECORD_MESSAGE };
  }

  if (special.condition && replacesApplicantType(special.condition)) {
    return calculateOtherCareer(input, special.condition);
  }

  if (needsNewConversion(input)) {

    const hasRookieDates = Boolean(input.examDate && input.eduDateNew);
    if (!hasRookieDates) {
      return { kind: 'incomplete', message: CONVERTED_TO_NEW_MESSAGE, convertedType: 'new' };
    }
    const outcome = calculateRookieCareer({ ...input, type: 'new' });
    if (outcome.kind === 'result') {
      return {
        kind: 'result',
        result: { ...outcome.result, conversionNote: conversionNote(input) },
        convertedType: 'new',
      };
    }
    return { ...outcome, convertedType: 'new' };
  }

  return input.type === 'senior' ? calculateSeniorCareer(input) : calculateRookieCareer(input);
}
