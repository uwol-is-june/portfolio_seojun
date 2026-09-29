'use client';

import {
  CAREER_CRITERIA,
  ROLE_LABEL,
  TYPE_LABEL,
  isSelfDiagnosisComplete,
  type Role,
  type SelfDiagnosis,
} from '@/demos/fa-recruit/lib/domain/self-diagnosis';
import {
  getSpecialConditionLabel,
  type TypeReplacingCondition,
} from '@/demos/fa-recruit/lib/domain/special-condition';
import { Card, CardBody, CardHead } from '@/demos/fa-recruit/components/ui/card';
import { Collapse } from '@/demos/fa-recruit/components/ui/collapse';
import { cn } from '@/demos/fa-recruit/lib/utils/cn';

type SelfDiagnosisCardProps = {
  value: SelfDiagnosis;
  onChange: (next: SelfDiagnosis) => void;

  typeReplacedBy?: TypeReplacingCondition | null;
};

type Choice<T> = { value: T; label: string; sub?: string; icon?: string };

function QuestionBlock<T>({
  question,
  note,
  choices,
  selected,
  onSelect,
}: {
  question: string;
  note?: string;
  choices: readonly Choice<T>[];
  selected: T | null;
  onSelect: (v: T) => void;
}) {
  return (
    <div>
      <p className="text-strong mb-1 text-[13.5px] font-bold">{question}</p>
      {note && <p className="text-muted mb-2 text-[11.5px] leading-snug">{note}</p>}
      <div className="mt-1.5 grid grid-cols-2 gap-2">
        {choices.map((c) => {
          const isOn = selected === c.value;
          return (
            <button
              key={String(c.value)}
              type="button"
              onClick={() => onSelect(c.value)}
              className={cn(
                'flex cursor-pointer flex-col items-center gap-0.5 rounded-[12px] border-[1.5px] px-3 py-3.5 transition-all duration-150',
                'focus-visible:outline-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2',
                isOn
                  ? 'border-brand-700 bg-brand-50 text-brand-700'
                  : 'border-line text-body hover:border-brand-300 bg-white',
              )}
            >
              {c.icon && <span className="text-lg">{c.icon}</span>}
              <span className="text-[13px] font-bold break-keep">{c.label}</span>
              {c.sub && <span className="text-[10.5px] font-semibold opacity-70">{c.sub}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function SelfDiagnosisCard({ value, onChange, typeReplacedBy }: SelfDiagnosisCardProps) {
  const done = isSelfDiagnosisComplete(value);

  const typeReplaced = typeReplacedBy != null;
  const typeOverrideLabel = typeReplacedBy ? getSpecialConditionLabel(typeReplacedBy) : undefined;

  const isRookie = value.assocHistory === false;

  const reset = () => onChange({ role: null, assocHistory: null });

  return (
    <Card>
      <CardHead
        step="Q"
        title="자격 및 유형 자가진단"
        action={
          done ? (
            <button
              type="button"
              onClick={reset}
              className="border-brand-700 text-brand-700 hover:bg-brand-50 cursor-pointer rounded-md border px-2.5 py-1 text-[11px] font-bold"
            >
              다시 답하기
            </button>
          ) : null
        }
      />
      <CardBody>

        <Collapse open={!done}>

          <QuestionBlock<Role>
            question={
              typeReplaced ? '어떤 자격으로 등록하실 예정인가요?' : '어떤 시험을 합격하셨나요?'
            }
            selected={value.role}
            onSelect={(role) => onChange({ ...value, role })}
            choices={[
              {
                value: 'sales',
                label: '보험설계사',
                sub: typeReplaced ? CAREER_CRITERIA.sales.label : '설계사 시험',
                icon: '👤',
              },
              {
                value: 'qualified',
                label: '유자격자',
                sub: typeReplaced ? CAREER_CRITERIA.qualified.label : '대리점 시험',
                icon: '🏢',
              },
            ]}
          />

          <div className="pt-5">
            <QuestionBlock<boolean>
              question="협회에 보험설계사로 등록한 이력이 있나요?"
              selected={value.assocHistory}
              onSelect={(assocHistory) => onChange({ ...value, assocHistory })}
              choices={[
                { value: false, label: '없음', sub: typeReplaced ? undefined : '→ 신인' },
                {
                  value: true,
                  label: '있음',
                  sub: typeReplaced ? undefined : '→ 경력으로 판정',
                },
              ]}
            />
          </div>
        </Collapse>

        <Collapse open={done}>
          <div className="bg-brand-50 border-brand-700 rounded-[12px] border px-4 py-4 text-center">
            <p className="text-body text-[11.5px] font-semibold">내 유형</p>
            <p className="text-brand-700 mt-1 text-[17px] font-extrabold">
              {value.role ? ROLE_LABEL[value.role] : ''}

              {typeOverrideLabel && ` · ${typeOverrideLabel}`}
              {!typeOverrideLabel && isRookie && ` · ${TYPE_LABEL.new}`}
            </p>
            {typeOverrideLabel && (
              <p className="text-muted mt-1.5 text-[11.5px] font-semibold">
                경력 판정에는 신인·경력신입·경력자 구분이 적용되지 않습니다. (제출 서류 기준으로만
                사용)
              </p>
            )}
            {!typeOverrideLabel && !isRookie && (
              <p className="text-muted mt-1.5 text-[11.5px] font-semibold">
                경력신입 · 경력자 구분은 다음 단계에서 실제 경력 구간으로 판정합니다.
              </p>
            )}
          </div>
        </Collapse>
      </CardBody>
    </Card>
  );
}
