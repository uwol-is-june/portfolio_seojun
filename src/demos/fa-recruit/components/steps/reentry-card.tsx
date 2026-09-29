'use client';

import {
  MALSO_TERM_LABEL,
  REASON_FORCED_LABEL,
  REASON_LONG_LABEL,
  REENTRY_COUNT_OPTIONS,
  REPAYMENT_EXPECTED_OPTIONS,
  REPAYMENT_OPTIONS,
  REPAYMENT_RELATION_NOTE,
  askForcedExit,
  askLongUnrepaid,
  askRepayment,
  getReentryNotice,
  type MalsoTerm,
  type ReentryCount,
  type ReentryState,
  type RepaymentStatus,
} from '@/demos/fa-recruit/lib/domain/reentry';
import { Card, CardBody, CardHead } from '@/demos/fa-recruit/components/ui/card';
import { Checkbox } from '@/demos/fa-recruit/components/ui/checkbox';
import { Collapse } from '@/demos/fa-recruit/components/ui/collapse';
import { Field, Select } from '@/demos/fa-recruit/components/ui/select';
import { cn } from '@/demos/fa-recruit/lib/utils/cn';
import { Confidential } from '@/demos/fa-recruit/components/ui/confidential';

const NOTICE_TONE = {
  danger: 'border-danger bg-danger-light text-danger',
  warn: 'border-warn bg-warn-light text-warn',
  ok: 'border-ok bg-ok-light text-ok',
} as const;

type ReentryCardProps = {
  value: ReentryState;
  onChange: (next: ReentryState) => void;

  malsoTerm: MalsoTerm | null;

  malsoTermBasis: string | null;
};

export function ReentryCard({ value, onChange, malsoTerm, malsoTermBasis }: ReentryCardProps) {
  const set = <K extends keyof ReentryState>(key: K, v: ReentryState[K]) =>
    onChange({ ...value, [key]: v });

  const handleCount = (count: ReentryCount) => {
    if (count === '0') {
      onChange({
        count,
        repayment: null,
        repaymentExpected: null,
        reasonLong: false,
        reasonForced: false,
      });
      return;
    }
    set('count', count);
  };

  const handleRepayment = (repayment: RepaymentStatus | null) =>
    onChange({
      ...value,
      repayment,
      reasonLong: askLongUnrepaid(malsoTerm, repayment) ? value.reasonLong : false,
    });

  const notice = getReentryNotice(value, malsoTerm);

  return (
    <Card>
      <CardHead step="R" title="재입사 상세 기준 확인" tone="pending" />
      <CardBody>

        <Field label="① 당사 등록 횟수" hint="(확인처: 당사)">
          <Select value={value.count} onChange={(e) => handleCount(e.target.value as ReentryCount)}>
            {REENTRY_COUNT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </Field>

        <Collapse open={askForcedExit(value)} spacing="mb-3.5">
          <div>
            <p className="text-danger mb-2 text-[11.5px] font-extrabold">
              ② 재입사 제한사유 확인
              <span className="text-muted ml-1.5 text-[10px] font-semibold">
                (해당 시 체크 · 확인처: 당사)
              </span>
            </p>
            <Checkbox
              checked={value.reasonForced}
              onChange={(c) => set('reasonForced', c)}
              className="text-body text-[12px] font-semibold"
            >
              {REASON_FORCED_LABEL}
            </Checkbox>
          </div>
        </Collapse>

        <Collapse open={askRepayment(value) && malsoTerm !== null} spacing="mb-3.5">
          <div className="border-line bg-surface rounded-[10px] border px-3 py-2">
            <p className="text-muted text-[10.5px] font-bold">
              ③ 협회 말소 후 경과 기간
              <span className="ml-1 font-semibold">(① 날짜에서 자동 판정)</span>
            </p>
            <p className="text-strong mt-0.5 text-[12.5px] font-extrabold">
              {malsoTerm ? MALSO_TERM_LABEL[malsoTerm] : ''}
            </p>
            {malsoTermBasis && (
              <p className="text-muted mt-0.5 text-[10.5px] leading-snug break-keep">
                {malsoTermBasis}
              </p>
            )}
          </div>
        </Collapse>

        <Collapse open={askRepayment(value)} spacing="mb-3.5">
          <Field label="④ 환수금 현황" hint="(전 소속 계약 잔여 환수금)">
            <Select
              value={value.repayment ?? ''}
              onChange={(e) => handleRepayment((e.target.value || null) as RepaymentStatus | null)}
            >
              <option value="">-- 선택 --</option>
              {REPAYMENT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </Field>
        </Collapse>

        <Collapse open={askLongUnrepaid(malsoTerm, value.repayment)} spacing="mb-3.5">
          <Checkbox
            checked={value.reasonLong}
            onChange={(c) => set('reasonLong', c)}
            className="text-body text-[12px] font-semibold"
          >
            {REASON_LONG_LABEL}
          </Checkbox>
        </Collapse>

        <Collapse open={askRepayment(value)} className="delay-75">
          <Field label="⑤ 환수예상금 현황" hint="(전 소속 계약 예상 환수금)">
            <Select
              value={value.repaymentExpected ?? ''}
              onChange={(e) =>
                set('repaymentExpected', (e.target.value || null) as RepaymentStatus | null)
              }
            >
              <option value="">-- 선택 --</option>
              {REPAYMENT_EXPECTED_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </Field>

          <p className="text-muted mt-1.5 text-[10.5px] leading-snug break-keep">
            {REPAYMENT_RELATION_NOTE}
          </p>
        </Collapse>

        <Collapse open={notice !== null}>
          {notice && (
            <div
              className={cn(
                'mt-3 rounded-[10px] border-[1.5px] px-3.5 py-3',
                NOTICE_TONE[notice.tone],
              )}
            >
              <p className="text-[12px] leading-relaxed font-bold break-keep whitespace-pre-line">
                <Confidential text={notice.text} />
              </p>
              {notice.sub && (
                <p className="text-muted mt-1 text-[10px] leading-snug break-keep"><Confidential text={notice.sub} /></p>
              )}
            </div>
          )}
        </Collapse>
      </CardBody>
    </Card>
  );
}
