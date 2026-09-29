'use client';

import { useState } from 'react';

import {
  CASE_GROUPS,
  GYO_COMPANY_WARNING,
  KEEP_TARGETS,
  MALSO_CASES,
  RECIPIENT_ADDRESS_WARNING,
  recipientList,
  type MalsoCaseId,
} from '@/demos/fa-recruit/lib/domain/malso/case';
import {
  ASSOC_ADDRESS_HINT,
  buildBlankDocument,
  buildDocument,
  companyPlaceholder,
  documentToText,
  formatRrn,
  formatTel,
  isRrnComplete,
  PRIVACY_NOTE,
  SIGN_NOTE,
  type MalsoFormValues,
} from '@/demos/fa-recruit/lib/domain/malso/document';
import { EXTERNAL_URLS } from '@/demos/fa-recruit/lib/domain/rules/external-links';
import {
  DOC_FLOW_STEPS,
  SON_MAIL_ENDING_NOTICE,
  WAIT_PERIOD_NOTE,
} from '@/demos/fa-recruit/lib/domain/rules/malso-procedure';
import { Collapse } from '@/demos/fa-recruit/components/ui/collapse';
import { useToast } from '@/demos/fa-recruit/components/ui/toast';
import { cn } from '@/demos/fa-recruit/lib/utils/cn';

import { DocPreview } from './doc-preview';
import { Alert, RichText } from './rich';

type Props = {
  caseId: MalsoCaseId;
  onCaseChange: (next: MalsoCaseId) => void;
  form: MalsoFormValues;
  onFormChange: (next: MalsoFormValues) => void;
  onGoToDiagnosis: () => void;
  onGoToCalc: () => void;
};

type FieldKey = keyof MalsoFormValues;

function Field({
  label,
  hint,
  hintTone = 'muted',
  value,
  onChange,
  placeholder,
  inputMode,
  error,
  action,
}: {
  label: string;
  hint?: string;
  hintTone?: 'muted' | 'danger';
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  inputMode?: 'numeric';
  error?: string;
  action?: { label: string; url: string };
}) {
  return (
    <label className="block">
      <span className="text-strong flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] font-bold">
        {label}
        {hint && (
          <span
            className={cn(
              'text-[11px] font-semibold',
              hintTone === 'danger' ? 'text-danger' : 'text-muted',
            )}
          >
            {hint}
          </span>
        )}
        {action && (
          <a
            href={action.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-700 focus-visible:outline-brand-700 text-[11.5px] font-bold underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {action.label}
          </a>
        )}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        className={cn(
          'text-strong placeholder:text-muted focus:border-brand-700 mt-1.5 w-full rounded-[10px] border bg-white px-3 py-2.5 text-[13px] transition-colors duration-150 focus:outline-none',
          error ? 'border-danger' : 'border-line',
        )}
      />
      {error && <span className="text-danger mt-1 block text-[11.5px] font-semibold">{error}</span>}
    </label>
  );
}

export function SendTab({
  caseId,
  onCaseChange,
  form,
  onFormChange,
  onGoToDiagnosis,
  onGoToCalc,
}: Props) {
  const { showToast } = useToast();
  const [procedureOpen, setProcedureOpen] = useState(false);

  const [printBlank, setPrintBlank] = useState(false);

  const malsoCase = MALSO_CASES[caseId];
  const doc = printBlank ? buildBlankDocument(caseId) : buildDocument(caseId, form);
  const recipients = recipientList(malsoCase);

  const set = (key: FieldKey) => (v: string) => onFormChange({ ...form, [key]: v });

  const hasSon = malsoCase.assoc === 'son' || malsoCase.both;
  const hasLife = malsoCase.assoc === 'life' || malsoCase.both;
  const rrnError =
    form.rrn && !isRrnComplete(form.rrn)
      ? `13자리를 모두 입력하세요. (현재 ${form.rrn.replace(/\D/g, '').length}자리)`
      : undefined;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(documentToText(doc));
      showToast('복사되었습니다');
    } catch {
      showToast('복사에 실패했습니다. 문서를 직접 선택해 복사해주세요.');
    }
  };

  const printBlankForm = () => {
    setPrintBlank(true);
    requestAnimationFrame(() => {
      window.print();
      setPrintBlank(false);
    });
  };

  return (
    <div className="space-y-4">

      <section className="border-line shadow-card rounded-[16px] border bg-white p-5 print:hidden">
        <p className="text-strong text-[12.5px] font-bold">
          본인 등록 형태를 고르면 부수·수신처·양식·신청방법이 자동으로 바뀝니다
        </p>
        <div className="mt-3.5 space-y-3.5">
          {CASE_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="text-muted mb-2 text-[11.5px] font-bold">{group.title}</p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {group.ids.map((id) => {
                  const c = MALSO_CASES[id];
                  const on = id === caseId;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => onCaseChange(id)}
                      aria-pressed={on}
                      className={cn(
                        'focus-visible:outline-brand-700 cursor-pointer rounded-[10px] border px-3 py-2.5 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2',
                        on
                          ? 'border-brand-700 bg-brand-50'
                          : 'border-line hover:border-brand-300 hover:bg-surface bg-white',
                      )}
                    >
                      <span
                        className={cn(
                          'block text-[12.5px] font-bold break-keep',
                          on ? 'text-brand-700' : 'text-strong',
                        )}
                      >
                        {c.label}
                      </span>
                      <span className="text-muted block text-[11px] break-keep">{c.hint}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-line shadow-card rounded-[16px] border bg-white p-5 print:hidden">
        <div className="mb-3 flex items-center gap-3">
          <span className="text-brand-700 text-[28px] leading-none font-extrabold">
            {malsoCase.copies}
            <span className="ml-0.5 text-[13px] font-bold">부</span>
          </span>
          <span className="text-strong text-[12.5px] font-bold break-keep">
            {malsoCase.typeLabel} → 총 {malsoCase.copies}부 (모두 원본)
          </span>
        </div>

        <p className="text-brand-700 mt-4 mb-2 text-[12px] font-bold">📮 내용증명을 보낼 수신처</p>
        <ul className="space-y-1">
          {recipients.map((r, i) => {
            const keep = i >= recipients.length - KEEP_TARGETS.length;
            return (
              <li
                key={r}
                className={cn(
                  'rounded-[8px] px-3 py-1.5 text-[12px]',
                  keep ? 'bg-surface text-muted' : 'bg-surface-alt text-strong font-semibold',
                )}
              >
                {keep ? '· ' : `${i + 1}. `}
                {r}
              </li>
            );
          })}
        </ul>

        <Alert tone="warn" className="mt-3">
          <b className="font-bold">⚠ 수신처 주소 주의</b> — {RECIPIENT_ADDRESS_WARNING} 아래 양식의
          주소 입력란 옆 링크에서 확인하세요.
        </Alert>

        <ol className="mt-4 flex flex-wrap gap-2">
          {DOC_FLOW_STEPS.map((s) => (
            <li key={s.num} className="bg-surface min-w-0 flex-1 rounded-[8px] px-2.5 py-2">
              <span
                className={cn(
                  'inline-block rounded-full px-1.5 py-[1px] text-[10px] font-extrabold text-white',
                  s.wait ? 'bg-warn' : 'bg-brand-700',
                )}
              >
                {s.num}
              </span>
              <span className="text-strong mt-1 block text-[11.5px] font-bold break-keep">
                {s.title}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-line shadow-card rounded-[16px] border bg-white p-5 print:hidden">
        <h3 className="text-strong text-[14px] font-extrabold">✏️ 내용증명(해촉신청서) 작성</h3>
        <p className="text-muted mt-1 text-[12px] leading-relaxed">
          정보를 입력하면 아래 양식이 자동으로 채워집니다.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          <Field
            label="신청인 성명"
            value={form.name}
            onChange={set('name')}
            placeholder="김인카"
          />
          <Field
            label="주민등록번호 (13자리)"
            value={form.rrn}
            onChange={(v) => set('rrn')(formatRrn(v))}
            placeholder="000000-0000000"
            inputMode="numeric"
            error={rrnError}
          />
          <div className="sm:col-span-2">
            <Field
              label="전화번호"
              value={form.tel}
              onChange={(v) => set('tel')(formatTel(v))}
              placeholder="010-0000-0000"
            />
          </div>
          <div className="sm:col-span-2">
            <Field
              label="신청인 주소"
              value={form.addr}
              onChange={set('addr')}
              placeholder="서울시 ○○구 ○○로 123, 4층"
            />
          </div>
          <div className="sm:col-span-2">
            <Field
              label="신청 사유"
              value={form.reason}
              onChange={set('reason')}
              placeholder="개인 사정"
            />
          </div>
          <div className="sm:col-span-2">
            <Field
              label="작성일"
              hint="예: 2026년 6월 7일 · 비워두면 빈 양식으로 출력"
              value={form.date}
              onChange={set('date')}
              placeholder="2026년 6월 7일"
            />
          </div>

          {malsoCase.both && malsoCase.org === 'company' && (
            <div className="sm:col-span-2">
              <Alert tone="danger">
                <RichText text={`⚠ ${GYO_COMPANY_WARNING}`} />
              </Alert>
            </div>
          )}

          <div className="sm:col-span-2">
            <Field
              label={
                malsoCase.both && malsoCase.org === 'company'
                  ? '전속 소속 보험회사명'
                  : `소속 ${malsoCase.org === 'agency' ? '대리점' : '보험회사'}명`
              }
              hint={
                malsoCase.both && malsoCase.org === 'company'
                  ? '⚠ 교차사 말고 전속으로 소속된 회사 1곳'
                  : '입력하면 수신처에 자동 반영'
              }
              hintTone={malsoCase.both && malsoCase.org === 'company' ? 'danger' : 'muted'}
              value={form.company}
              onChange={set('company')}
              placeholder={companyPlaceholder(malsoCase)}
            />
          </div>
          <div className="sm:col-span-2">
            <Field
              label="본사 주소 기재"
              hint="'대표이사 앞'은 자동 추가"
              value={form.recvAddr}
              onChange={set('recvAddr')}
              placeholder="서울시 성동구 ○○로 123, 4층"
            />
          </div>

          {hasSon && (
            <div className="sm:col-span-2">
              <Field
                label="손해보험협회 지역본부 주소"
                hint={ASSOC_ADDRESS_HINT}
                action={{ label: '손보협회 지역본부 확인 ↗', url: EXTERNAL_URLS.nonLifeMalso }}
                value={form.sonAssocAddr}
                onChange={set('sonAssocAddr')}
                placeholder="○○시 ○○구 ○○로 ○○, ○○층 (관할 지역본부·지부)"
              />
            </div>
          )}
          {hasLife && (
            <div className="sm:col-span-2">
              <Field
                label="생명보험협회 지역본부 주소"
                hint={ASSOC_ADDRESS_HINT}
                action={{ label: '생보협회 지역본부 확인 ↗', url: EXTERNAL_URLS.lifeMalso }}
                value={form.lifeAssocAddr}
                onChange={set('lifeAssocAddr')}
                placeholder="○○시 ○○구 ○○로 ○○, ○○층 (관할 지역본부·지부)"
              />
            </div>
          )}
        </div>

        <p className="bg-surface text-body mt-4 rounded-[10px] px-3.5 py-2.5 text-[12px] leading-[1.7]">
          <RichText text={PRIVACY_NOTE} />
        </p>
      </section>

      <section className="border-line shadow-card overflow-hidden rounded-[16px] border bg-white">
        <div className="border-line bg-surface flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3 print:hidden">
          <span className="text-strong text-[12.5px] font-bold">해촉신청서 (내용증명 발송용)</span>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={printBlankForm}
              className="border-line text-body hover:bg-surface-alt focus-visible:outline-brand-700 cursor-pointer rounded-[7px] border bg-white px-2.5 py-1.5 text-[11.5px] font-bold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              📄 빈 양식 받기
            </button>
            <button
              type="button"
              onClick={copy}
              className="border-line text-body hover:bg-surface-alt focus-visible:outline-brand-700 cursor-pointer rounded-[7px] border bg-white px-2.5 py-1.5 text-[11.5px] font-bold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              텍스트 복사
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="bg-brand-700 hover:bg-brand-600 focus-visible:outline-brand-700 cursor-pointer rounded-[7px] px-2.5 py-1.5 text-[11.5px] font-bold text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              인쇄 / PDF 저장
            </button>
          </div>
        </div>

        <DocPreview doc={doc} printRoot />
      </section>

      <Alert tone="warn" className="print:hidden">
        <RichText text={SIGN_NOTE} />
      </Alert>

      <section className="border-line shadow-card overflow-hidden rounded-[16px] border bg-white print:hidden">
        <button
          type="button"
          onClick={() => setProcedureOpen((v) => !v)}
          aria-expanded={procedureOpen}
          className="hover:bg-surface focus-visible:outline-brand-700 flex w-full cursor-pointer items-center justify-between gap-2 px-5 py-3.5 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:-outline-offset-2"
        >
          <span className="text-strong text-[13px] font-bold break-keep">
            📮 우체국 발송 & 협회 말소 신청 절차
          </span>
          <span
            aria-hidden
            className={`text-muted shrink-0 text-[10px] transition-transform duration-200 ${procedureOpen ? 'rotate-180' : ''}`}
          >
            ▼
          </span>
        </button>
        <Collapse open={procedureOpen}>
          <div className="border-line space-y-3 border-t px-5 py-4">
            <ol className="space-y-2">
              {[
                `위에서 작성한 해촉신청서를 **수신처 부수만큼** 출력 (수신처별 1부씩 · 총 ${malsoCase.copies}부)`,
                '각 부에 **자필서명** 후 우체국에서 **내용증명**으로 발송',
                '**발신인 보관용 원본 + 소인** 보관 (협회 말소 신청 시 필요)',
                '발송 후 **11일째부터** 협회에 말소 신청 (💻 인터넷 또는 🏢 방문)',
              ].map((s, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="bg-brand-50 text-brand-700 mt-[1px] flex size-[18px] shrink-0 items-center justify-center rounded-full text-[10.5px] font-extrabold">
                    {i + 1}
                  </span>
                  <span className="text-body text-[12.5px] leading-[1.7]">
                    <RichText text={s} />
                  </span>
                </li>
              ))}
            </ol>

            <Alert tone="warn">
              <RichText text={WAIT_PERIOD_NOTE} />{' '}
              <button
                type="button"
                onClick={onGoToCalc}
                className="text-brand-700 cursor-pointer font-bold underline underline-offset-2"
              >
                📅 날짜 계산기 열기
              </button>
            </Alert>

            {hasSon && (
              <Alert tone="warn">
                <RichText text={SON_MAIL_ENDING_NOTICE} />
              </Alert>
            )}

            <Alert>
              <b className="font-bold">📋 협회 말소 신청 시</b>
              <br />
              💻 <b className="font-bold">인터넷</b> — 내용증명 스캔파일 +
              등기번호(13자리)·발급일자·휴대폰번호
              <br />
              🏢 <b className="font-bold">방문</b> — 신분증 + 내용증명 원본
              <br />
              케이스별 상세 절차는{' '}
              <button
                type="button"
                onClick={onGoToDiagnosis}
                className="text-brand-700 cursor-pointer font-bold underline underline-offset-2"
              >
                🔍 케이스 진단 탭
              </button>
              에서 확인하세요.
            </Alert>
          </div>
        </Collapse>
      </section>

      <Alert tone={malsoCase.both ? 'warn' : 'info'} className="print:hidden">
        {malsoCase.both ? (
          <>
            <b className="font-bold">⚠ 양쪽 협회 주의</b>
            <br />· 생보·손보 협회에 코드가 <b className="font-bold">각각</b> 있습니다.
            <br />· 한 곳만 말소하면 <b className="font-bold">위촉 서류 접수가 불가</b>합니다.
            <br />· <b className="font-bold">두 협회 모두</b> 말소 완료를 확인하세요.
          </>
        ) : (
          <>
            <b className="font-bold">참고</b> — 코드 현황과 말소 완료 여부는 협회 홈페이지
            이력조회로 최종 확인하세요.
          </>
        )}
      </Alert>

      <p className="text-muted text-center text-[12px] print:hidden">
        정확한 케이스(소속·전속/교차) 진단이 필요하면{' '}
        <button
          type="button"
          onClick={onGoToDiagnosis}
          className="text-brand-700 cursor-pointer font-bold underline underline-offset-2"
        >
          🔍 케이스 진단 탭
        </button>
        을 이용하세요.
      </p>
    </div>
  );
}
