'use client';

import { useState } from 'react';

import type { DiagAnswers } from '@/demos/fa-recruit/lib/domain/final-diagnosis';
import { visibleLimitItems } from '@/demos/fa-recruit/lib/domain/final-diagnosis';
import type { LimitAnswer, LimitCardKey, LimitItem } from '@/demos/fa-recruit/lib/domain/rules/limit-items';
import type { ApplicantType } from '@/demos/fa-recruit/lib/domain/self-diagnosis';
import { Button } from '@/demos/fa-recruit/components/ui/button';
import { Card, CardBody, CardHead } from '@/demos/fa-recruit/components/ui/card';
import { Collapse } from '@/demos/fa-recruit/components/ui/collapse';
import { Modal } from '@/demos/fa-recruit/components/ui/modal';
import { RadioGroup, type RadioTone } from '@/demos/fa-recruit/components/ui/radio-group';
import { cn } from '@/demos/fa-recruit/lib/utils/cn';
import { Confidential } from '@/demos/fa-recruit/components/ui/confidential';

const HEAD_TONE = { ok: 'ok', warn: 'warn', danger: 'danger' } as const;

type LimitCardProps = {
  cardKey: LimitCardKey;
  badge: string;
  title: string;
  items: readonly LimitItem[];

  tone: 'ok' | 'warn' | 'danger';
  applicantType: ApplicantType;
  answers: DiagAnswers;
  onChange: (next: DiagAnswers) => void;
};

export function LimitCard({
  cardKey,
  badge,
  title,
  items,
  tone,
  applicantType,
  answers,
  onChange,
}: LimitCardProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const visible = visibleLimitItems(items, applicantType);

  if (visible.length === 0) return null;

  const showQuickSelect = !(
    (applicantType === 'new' && cardKey === 'limitA') ||
    cardKey === 'sonbo'
  );

  const setAnswer = (id: string, value: LimitAnswer) => onChange({ ...answers, [id]: value });

  const selectAllOk = () => {
    const next = { ...answers };
    for (const item of visible) next[item.id] = 'ok';
    onChange(next);
    setConfirmOpen(false);
  };

  return (
    <Card>
      <CardHead step={badge} title={title} tone={HEAD_TONE[tone]} />
      <CardBody>
        {showQuickSelect && (
          <Button
            variant="outline"
            onClick={() => setConfirmOpen(true)}
            className={cn(
              'mb-4 w-full py-3',
              tone === 'danger' &&
                'border-danger text-danger bg-danger-light hover:bg-danger-light',
              tone === 'warn' && 'border-warn text-warn bg-warn-light hover:bg-warn-light',
              tone === 'ok' && 'border-ok text-ok bg-ok-light hover:bg-ok-light',
            )}
          >
            ✓ 모두 해당없음
          </Button>
        )}

        <div>
          {visible.map((item) => (
            <LimitItemRow
              key={item.id}
              item={item}
              tone={tone}
              value={answers[item.id]}
              onChange={(v) => setAnswer(item.id, v)}
            />
          ))}
        </div>
      </CardBody>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title={title}
        description='이 카드의 모든 항목을 "해당없음"으로 설정하시겠습니까?'
      >
        <div className="p-5">
          <div className="border-brand-700 bg-brand-50 text-body rounded-r-lg border-l-[3px] px-3 py-2.5 text-[12px] leading-relaxed break-keep">
            ℹ️ <b>{visible.length}개 항목</b>이 &quot;아니오 (해당없음)&quot;로 설정됩니다.
            <br />
            필요시 나중에 개별 항목을 수정할 수 있습니다.
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" className="flex-1 py-3" onClick={() => setConfirmOpen(false)}>
              취소
            </Button>
            <Button variant="ok" className="flex-1 py-3" onClick={selectAllOk}>
              모두 &quot;해당없음&quot; 선택
            </Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
}

function LimitItemRow({
  item,
  tone,
  value,
  onChange,
}: {
  item: LimitItem;
  tone: 'ok' | 'warn' | 'danger';
  value: LimitAnswer | undefined;
  onChange: (value: LimitAnswer) => void;
}) {
  const [guideOpen, setGuideOpen] = useState(false);
  const agencies = item.agency.split('/').map((a) => a.trim());

  const options = item.threeChoice
    ? [
        { value: 'ok' as const, label: `✅ ${item.qOk}`, tone: 'ok' as RadioTone },
        {
          value: 'bad' as const,
          tone: 'warn' as RadioTone,
          label: (
            <span className="flex flex-wrap items-center gap-1.5">
              ⚠️ {item.qBad}
              <span className="bg-warn-light text-warn rounded px-1.5 py-px text-[10px] font-semibold">
                심사대상
              </span>
            </span>
          ),
        },
        {
          value: 'blocked' as const,
          tone: 'danger' as RadioTone,
          label: (
            <span className="flex flex-wrap items-center gap-1.5">
              🛑 {item.qBlocked}
              <span className="bg-danger-light text-danger rounded px-1.5 py-px text-[10px] font-semibold">
                위촉불가
              </span>
            </span>
          ),
        },
      ]
    : [
        { value: 'bad' as const, label: '예 (해당됨)', tone: tone as RadioTone },
        { value: 'ok' as const, label: '아니오 (해당 없음)', tone: 'ok' as RadioTone },
      ];

  return (
    <div className="border-surface-alt mb-3 border-b pb-3 last:mb-0 last:border-b-0 last:pb-0">
      <div className="mb-1.5 flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <b className="text-brand-700 text-[13.5px] font-extrabold break-keep"><Confidential text={item.n} /></b>
          <span className="text-muted text-[10px] font-semibold">확인처:</span>
          {agencies.map((agency) => (
            <span
              key={agency}
              className="bg-surface-alt text-body border-line rounded border px-1.5 py-0.5 text-[10px] font-bold break-keep"
            >
              {agency}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setGuideOpen((v) => !v)}
          aria-expanded={guideOpen}
          className="border-line bg-surface-alt text-body focus-visible:outline-brand-700 shrink-0 cursor-pointer rounded border px-1.5 py-0.5 text-[9px] font-extrabold focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          가이드 🔍
        </button>
      </div>

      <Collapse open={guideOpen}>
        <div className="border-line bg-surface text-body mb-2.5 rounded-[10px] border border-dashed p-2.5 text-[10px] leading-relaxed break-keep whitespace-pre-line">
          <b>기준:</b> <Confidential text={item.note} />
        </div>
      </Collapse>

      <p className="text-strong mb-2.5 text-[11.5px] font-bold break-keep">
        <span className="text-danger">Q.</span> <Confidential text={item.q} />
      </p>

      <RadioGroup
        name={item.id}
        aria-label={item.q}
        options={options}
        value={value ?? ''}
        onChange={(v) => v && onChange(v)}
        vertical={item.threeChoice}
      />
    </div>
  );
}
