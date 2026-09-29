'use client';

import { useState } from 'react';

import type { CareerInput } from '@/demos/fa-recruit/lib/domain/career';
import {
  TYPE_LABEL,
  describeTypeResolution,
  type ApplicantType,
  type ApplicantTypeResolution,
  type Role,
} from '@/demos/fa-recruit/lib/domain/self-diagnosis';
import { TYPE_DESCRIPTION } from '@/demos/fa-recruit/lib/domain/rules/type-description';
import { replacesApplicantType, type SpecialCondition } from '@/demos/fa-recruit/lib/domain/special-condition';
import { Button } from '@/demos/fa-recruit/components/ui/button';
import { Card, CardBody, CardHead } from '@/demos/fa-recruit/components/ui/card';
import { Collapse } from '@/demos/fa-recruit/components/ui/collapse';
import { DateField } from '@/demos/fa-recruit/components/ui/date-field';
import { Reveal, revealDelay } from '@/demos/fa-recruit/components/ui/reveal';

import { CareerRecordList } from './career-record-list';
import { RegistrationPlannerModal } from './registration-planner-modal';

export type CareerFormValue = Omit<CareerInput, 'role' | 'type' | 'assocHistory'>;

type CareerDateFieldsProps = {
  value: CareerFormValue;
  onChange: (next: CareerFormValue) => void;
  role: Role;

  applicantType: ApplicantType | null;

  typeResolution: ApplicantTypeResolution | null;
  specialCondition: SpecialCondition | null;

  assocHistory: boolean;
};

function Field({
  label,
  hint,
  note,
  index,
  action,
  children,
}: {
  label: string;
  hint?: string;
  note?: string;

  index?: number;

  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      className={index === undefined ? 'mb-4 last:mb-0' : 'animate-rise mb-4 last:mb-0'}
      style={index === undefined ? undefined : { animationDelay: revealDelay(index) }}
    >
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <label className="text-strong block text-[12.5px] font-bold">
          {label}
          {hint && <span className="text-muted ml-1 text-[10px] font-semibold">{hint}</span>}
        </label>
        {action}
      </div>
      {note && <p className="text-muted mb-1.5 text-[10.5px]">{note}</p>}
      {children}
    </div>
  );
}

function TypeDescriptionPanel({ role, type }: { role: Role; type: ApplicantType }) {
  const desc = TYPE_DESCRIPTION[role][type];
  return (
    <div className="border-brand-700 bg-brand-50 mb-4 rounded-r-lg border-l-[3px] px-3 py-2.5">
      <p className="text-brand-700 text-[12px] font-extrabold">{desc.title}</p>
      <p className="text-body mt-0.5 text-[11.5px] leading-snug">{desc.body}</p>
    </div>
  );
}

const SHOW_REGISTRATION_PLANNER = false;

export function CareerDateFields({
  value,
  onChange,
  role,
  applicantType,
  typeResolution,
  specialCondition,
  assocHistory,
}: CareerDateFieldsProps) {
  const [plannerOpen, setPlannerOpen] = useState(false);

  const set = <K extends keyof CareerFormValue>(key: K, v: CareerFormValue[K]) =>
    onChange({ ...value, [key]: v });

  const isOtherCareer = replacesApplicantType(specialCondition);

  const plannerButton = SHOW_REGISTRATION_PLANNER ? (
    <Button variant="ghost" size="sm" onClick={() => setPlannerOpen(true)}>
      🗓️ 등록일 계산
    </Button>
  ) : undefined;

  const planner = SHOW_REGISTRATION_PLANNER ? (
    <RegistrationPlannerModal open={plannerOpen} onClose={() => setPlannerOpen(false)} />
  ) : null;

  if (isOtherCareer) {
    return (
      <Card>
        <CardHead step="2" title="경력 및 날짜 입력" />
        <CardBody>
          <Field label="등록예정일" index={0} action={plannerButton}>
            <DateField value={value.targetDate} onChange={(v) => set('targetDate', v)} />
          </Field>
          <Reveal index={1}>
            <CareerRecordList
              records={value.otherCareerRecords}
              onChange={(v) => set('otherCareerRecords', v)}
              itemLabel={specialCondition === 'adjuster' ? '손해사정 경력' : '보험사 경력'}
              startLabel="시작일"
              endLabel="종료일"
              addLabel="+ 경력 추가"
            />
          </Reveal>

          <Field
            label="경력자 등록교육 이수일"
            note="📌 이수 후 1년 이내 등록 신청 · 아직 이수하지 않았으면 예정일"
            index={2}
          >
            <DateField value={value.eduDateSr} onChange={(v) => set('eduDateSr', v)} />
          </Field>

          {assocHistory && (
            <Field
              label="협회 말소일"
              hint="(설계사 등록 이력)"
              note="위 경력의 퇴사일이 아니라, 설계사로 등록했던 협회 등록이 말소된 날입니다. 말소 전이면 예정일을 넣어도 됩니다."
              index={3}
            >
              <DateField value={value.assocMalsoDate} onChange={(v) => set('assocMalsoDate', v)} />
            </Field>
          )}
          {planner}
        </CardBody>
      </Card>
    );
  }

  const targetDateField = (index?: number) => (
    <Field label="등록예정일" index={index} action={plannerButton}>
      <DateField value={value.targetDate} onChange={(v) => set('targetDate', v)} />
    </Field>
  );

  const examField = (index?: number) => (
    <Field label="시험 합격일" index={index}>
      <DateField value={value.examDate} onChange={(v) => set('examDate', v)} />
    </Field>
  );
  const eduNewField = (index?: number) => (
    <Field label="(신규) 등록교육 이수일" index={index}>
      <DateField value={value.eduDateNew} onChange={(v) => set('eduDateNew', v)} />
    </Field>
  );

  if (!assocHistory) {
    return (
      <Card>
        <CardHead step="2" title="경력 및 날짜 입력" />
        <CardBody>
          {applicantType && <TypeDescriptionPanel role={role} type={applicantType} />}
          {examField(0)}
          {eduNewField(1)}
          {targetDateField(2)}
          {planner}
        </CardBody>
      </Card>
    );
  }

  const isSenior = applicantType === 'senior';

  const isRookieRoute = applicantType === 'new' || applicantType === 'junior';

  const converted =
    typeResolution && applicantType && applicantType !== typeResolution.type ? applicantType : null;

  return (
    <Card>
      <CardHead step="2" title="경력 및 날짜 입력" />
      <CardBody>
        {targetDateField(0)}

        <Field
          label="회사 경력"
          hint="(협회 등록 이력이 있으면 필수)"
          note="경력신입은 말소일~등록예정일 1년 초과 시 신인 전환"
          index={1}
        >
          <CareerRecordList
            records={value.careerRecords}
            onChange={(v) => set('careerRecords', v)}
            showPendingHint
          />
        </Field>

        <Collapse open={typeResolution !== null}>
          <div className="border-line bg-surface mb-2 rounded-[10px] border px-3 py-2">
            <p className="text-muted text-[10.5px] font-bold">유형 판정</p>
            <p className="text-strong mt-0.5 text-[12.5px] font-extrabold">
              {typeResolution ? describeTypeResolution(typeResolution) : ''}
            </p>

            {converted && (
              <p className="text-warn mt-1 text-[11px] font-semibold">
                ↳ 말소 후 1년 초과 — {TYPE_LABEL[converted]}으로 전환되었습니다.
              </p>
            )}
          </div>
          {applicantType && <TypeDescriptionPanel role={role} type={applicantType} />}
        </Collapse>

        <Collapse open={isRookieRoute}>
          {examField()}
          {eduNewField()}
        </Collapse>

        <Collapse open={isSenior}>

          <Field
            label="경력자(보수)교육 이수일"
            note="📌 등록예정일로부터 1년 이내 수료분만 유효 · 아직 이수하지 않았으면 예정일"
          >
            <DateField value={value.eduDateSr} onChange={(v) => set('eduDateSr', v)} />
          </Field>
        </Collapse>

        {planner}
      </CardBody>
    </Card>
  );
}
