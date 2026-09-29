'use client';

import type { CareerResult } from '@/demos/fa-recruit/lib/domain/career';
import type { CandidateInfo } from '@/demos/fa-recruit/lib/domain/candidates';
import type { DiagnosisState } from '@/demos/fa-recruit/lib/domain/diagnosis-state';
import { buildDocGroups, type DocChecks, type DocsInput } from '@/demos/fa-recruit/lib/domain/documents';
import { getDisclaimerText } from '@/demos/fa-recruit/lib/domain/final-diagnosis';
import { REENTRY_COUNT_OPTIONS, needsReentryCard, type ReentryState } from '@/demos/fa-recruit/lib/domain/reentry';
import { ROLE_LABEL, TYPE_LABEL } from '@/demos/fa-recruit/lib/domain/self-diagnosis';
import {
  SPECIAL_CONDITION_LABEL,
  replacesApplicantType,
  type SpecialConditionState,
} from '@/demos/fa-recruit/lib/domain/special-condition';
import { STEPS } from '@/demos/fa-recruit/lib/steps';
import { formatDate, formatIsoTimestamp } from '@/demos/fa-recruit/lib/utils/date';
import { Button } from '@/demos/fa-recruit/components/ui/button';
import { Card, CardBody, CardHead } from '@/demos/fa-recruit/components/ui/card';
import { Reveal, createRevealOrder } from '@/demos/fa-recruit/components/ui/reveal';
import { cn } from '@/demos/fa-recruit/lib/utils/cn';

import { DocsSection } from './docs-section';
import { ShareActions } from './share-actions';
import { Confidential } from '@/demos/fa-recruit/components/ui/confidential';

const GRADE_TONE = {
  bad: 'border-danger bg-danger-light text-danger',
  warn: 'border-warn bg-warn-light text-warn',
  pending: 'border-pending bg-pending-light text-pending',
  ok: 'border-ok bg-ok-light text-ok',
} as const;

const LAST_STEP_NAME = STEPS[STEPS.length - 1].name;

type DiagnosisSummaryProps = {

  state: DiagnosisState;

  candidateInfo?: CandidateInfo | null;
  docsInput: DocsInput;
  careerResult: CareerResult | null;
  special: SpecialConditionState;
  checks: DocChecks;
  onChecksChange: (next: DocChecks) => void;

  reentry: ReentryState;

  assocHistory: boolean;

  onExit: () => void;

  onBack: () => void;

  onBackToList?: () => void;

  nextCandidateName?: string | null;
  onNextCandidate?: () => void;
};

export function DiagnosisSummary({
  state,
  candidateInfo,
  docsInput,
  careerResult,
  special,
  checks,
  onChecksChange,
  reentry,
  assocHistory,
  onExit,
  onBack,
  onBackToList,
  nextCandidateName,
  onNextCandidate,
}: DiagnosisSummaryProps) {
  const { type, role, result } = docsInput;

  const isBlocked = result.grade === 'bad';

  const reviewGroups = isBlocked ? buildDocGroups(docsInput).filter((g) => g.review) : [];

  const typeLabel = replacesApplicantType(special.condition)
    ? SPECIAL_CONDITION_LABEL[special.condition]
    : TYPE_LABEL[type];

  const rows: { label: string; value: string }[] = [
    { label: '자격 · 유형', value: `${ROLE_LABEL[role]} · ${typeLabel}` },
  ];
  if (special.condition && !replacesApplicantType(special.condition)) {
    rows.push({ label: '특수 조건', value: SPECIAL_CONDITION_LABEL[special.condition] });
  }
  if (careerResult) {
    rows.push({ label: '경력 요건', value: careerResult.title });
    if (careerResult.expiresAt) {
      rows.push({ label: '유효기간 만료일', value: formatDate(careerResult.expiresAt) });
    }
  }

  if (needsReentryCard(type, assocHistory)) {
    const countLabel = REENTRY_COUNT_OPTIONS.find((o) => o.value === reentry.count)?.label;
    if (countLabel) rows.push({ label: '당사 등록 횟수', value: countLabel });
  }

  const judgedAt = formatIsoTimestamp(state.judgedAt);
  if (judgedAt) rows.push({ label: '판정 확정', value: judgedAt });

  const order = createRevealOrder();

  return (
    <>
      <Reveal
        index={order()}
        className={cn(
          'mb-4 rounded-[16px] border-[1.5px] px-5 py-6 text-center',
          GRADE_TONE[result.grade],
        )}
      >
        <span aria-hidden className="text-[34px] leading-none">
          {result.icon}
        </span>
        <p className="mt-2 text-[20px] font-black break-keep">{result.title}</p>
        <p className="text-body mt-2 text-[12px] leading-relaxed break-keep whitespace-pre-line">
          <Confidential text={result.desc} />
        </p>
      </Reveal>

      <Reveal index={order()}>
        <Card>
          <CardHead step="✓" title="진단 요약" tone="ok" />
          <CardBody>
            <dl>
              {rows.map((row) => (
                <div
                  key={row.label}
                  className="border-surface-alt flex items-start justify-between gap-3 border-b py-2 last:border-b-0"
                >
                  <dt className="text-muted shrink-0 text-[11.5px] font-bold">{row.label}</dt>
                  <dd className="text-strong text-right text-[12px] font-bold break-keep">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </CardBody>
        </Card>
      </Reveal>

      {!isBlocked && (
        <Reveal index={order()}>
          <DocsSection input={docsInput} checks={checks} onChecksChange={onChecksChange} />
        </Reveal>
      )}

      {isBlocked && reviewGroups.length > 0 && (
        <Reveal
          index={order()}
          className="border-warn mb-4 rounded-[12px] border-[1.5px] bg-white px-4 py-3.5"
        >
          <p className="text-warn text-[13px] font-extrabold">사유 해소 후 심사에 필요한 서류</p>
          {reviewGroups.map((group) => (
            <div key={group.t} className="mt-2">
              {group.i.map((item) => (
                <p key={item.n} className="text-body py-0.5 text-[12px] leading-relaxed break-keep">
                  · {item.n}
                  {item.s && <span className="text-muted ml-1 text-[11px]">({item.s})</span>}
                </p>
              ))}
            </div>
          ))}
          <p className="text-muted mt-2 text-[11px] leading-relaxed break-keep">
            위 불가 사유가 해소되면 이 서류로 심사를 진행합니다. 나머지 제출 서류는 위촉 가능 판정이
            나온 뒤에 안내됩니다.
          </p>
        </Reveal>
      )}

      <Reveal index={order()}>
        <ShareActions state={state} info={candidateInfo} />
      </Reveal>

      <Reveal
        index={order()}
        className="border-warn bg-warn-light mb-4 rounded-[12px] border-[1.5px] px-4 py-3.5"
      >
        <p className="text-warn text-[13px] font-extrabold">사전 진단 결과 · 참고용</p>
        <p className="text-warn mt-1 text-[12px] leading-relaxed break-keep">
          {getDisclaimerText(type)}
        </p>
      </Reveal>

      {onNextCandidate && nextCandidateName && (
        <Reveal
          index={order()}
          className="border-ok bg-ok-light mb-4 rounded-[12px] border-[1.5px] px-4 py-3.5"
        >
          <p className="text-ok text-[12.5px] font-extrabold break-keep">
            아직 진단하지 않은 대상자가 남아 있습니다
          </p>
          <Button variant="ok" size="lg" className="mt-2.5" onClick={onNextCandidate}>
            {nextCandidateName} 진단하기 →
          </Button>
        </Reveal>
      )}

      <Reveal index={order()} className="flex items-center gap-3">
        <Button variant="outline" className="flex-1" onClick={onBack}>
          ← {LAST_STEP_NAME}으로
        </Button>
        <Button variant="ok" className="flex-[2]" onClick={onBackToList ?? onExit}>
          {onBackToList ? '명단으로' : '처음으로'}
        </Button>
      </Reveal>
    </>
  );
}
