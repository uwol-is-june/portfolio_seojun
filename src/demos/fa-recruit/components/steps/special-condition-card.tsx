'use client';

import {
  FOREIGNER_CODES,
  NO_SPECIAL_CONDITION_LABEL,
  NO_SPECIAL_CONDITION_SHORT_LABEL,
  SPECIAL_CONDITIONS,
  SPECIAL_CONDITION_ICON,
  SPECIAL_CONDITION_LABEL,
  SPECIAL_CONDITION_SHORT_LABEL,
  needsForeignerCode,
  type ForeignerCode,
  type SpecialCondition,
  type SpecialConditionState,
} from '@/demos/fa-recruit/lib/domain/special-condition';
import { Card, CardBody, CardHead } from '@/demos/fa-recruit/components/ui/card';
import { Reveal } from '@/demos/fa-recruit/components/ui/reveal';
import { cn } from '@/demos/fa-recruit/lib/utils/cn';

type SpecialConditionCardProps = {
  value: SpecialConditionState;
  onChange: (next: SpecialConditionState) => void;
};

export function SpecialConditionCard({ value, onChange }: SpecialConditionCardProps) {
  const selected = value.condition;

  const select = (condition: SpecialCondition | null) =>
    onChange({ condition, foreignerCode: null });

  const selectCode = (foreignerCode: ForeignerCode) => onChange({ ...value, foreignerCode });

  return (
    <Card>
      <CardHead step="＋" title="특수 조건" />
      <CardBody>
        <p className="text-muted mb-2.5 text-[11.5px] font-semibold break-keep">
          해당 사항이 있을 때만 선택하세요. 선택에 따라 다음 단계의 입력 항목이 달라집니다.
        </p>

        <div className="grid grid-cols-5 gap-1 sm:gap-1.5">
          <SpecialOption
            icon="✓"
            label={NO_SPECIAL_CONDITION_SHORT_LABEL}

            fullLabel={`${NO_SPECIAL_CONDITION_LABEL} · ${NO_SPECIAL_CONDITION_SHORT_LABEL}`}
            isOn={selected === null}
            onClick={() => select(null)}
          />
          {SPECIAL_CONDITIONS.map((c) => (
            <SpecialOption
              key={c}
              icon={SPECIAL_CONDITION_ICON[c]}
              label={SPECIAL_CONDITION_SHORT_LABEL[c]}
              fullLabel={SPECIAL_CONDITION_LABEL[c]}
              isOn={selected === c}
              onClick={() => select(c)}
            />
          ))}
        </div>

        {needsForeignerCode(selected) && (
          <Reveal className="mt-3">
            <p className="text-strong mb-2 text-[12.5px] font-bold">체류자격을 선택하세요</p>
            <div className="grid grid-cols-3 gap-2">
              {FOREIGNER_CODES.map((c) => {
                const isOn = value.foreignerCode === c.value;
                return (
                  <button
                    key={c.value}
                    type="button"
                    aria-pressed={isOn}
                    onClick={() => selectCode(c.value)}
                    className={cn(
                      'flex cursor-pointer flex-col items-center gap-0.5 rounded-[12px] border-[1.5px] px-2 py-3 transition-all duration-150',
                      'focus-visible:outline-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2',
                      isOn
                        ? 'border-brand-700 bg-brand-50 text-brand-700'
                        : 'border-line text-body hover:border-brand-300 bg-white',
                    )}
                  >
                    <span className="text-lg">{c.icon}</span>
                    <span className="text-[12px] font-bold break-keep">{c.name}</span>
                    <span className="text-[10.5px] font-semibold opacity-70">{c.sub}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        )}
      </CardBody>
    </Card>
  );
}

function SpecialOption({
  icon,
  label,
  fullLabel,
  isOn,
  onClick,
}: {
  icon: string;

  label: string;

  fullLabel: string;
  isOn: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={isOn}
      aria-label={fullLabel}
      title={fullLabel}
      onClick={onClick}
      className={cn(
        'flex cursor-pointer flex-col items-center justify-start gap-1 rounded-[10px] border-[1.5px] px-0.5 py-2.5 transition-colors duration-150',
        'focus-visible:outline-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2',
        isOn
          ? 'border-brand-700 bg-brand-700 text-white'
          : 'border-line text-body hover:border-brand-700 hover:text-brand-700 bg-white',
      )}
    >
      <span aria-hidden className="text-[17px] leading-none">
        {icon}
      </span>
      <span className="text-[10px] leading-tight font-bold tracking-tight break-keep sm:text-[11px]">
        {label}
      </span>
    </button>
  );
}
