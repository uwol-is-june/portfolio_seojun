'use client';

import { useRef, useState } from 'react';

import {
  CANDIDATE_STATUS_LABEL,
  EMPTY_CANDIDATE_INFO,
  countCandidates,
  getCandidateMeta,
  getCandidateStatus,
  getFailReason,
  isCandidateInfoComplete,
  isDiagnosed,
  MAX_CANDIDATES,
  type Candidate,
  type CandidateInfo,
  type CandidateStatus,
} from '@/demos/fa-recruit/lib/domain/candidates';
import { Button } from '@/demos/fa-recruit/components/ui/button';
import { Card, CardBody, CardHead } from '@/demos/fa-recruit/components/ui/card';
import { Checkbox } from '@/demos/fa-recruit/components/ui/checkbox';
import { Collapse } from '@/demos/fa-recruit/components/ui/collapse';
import { Modal } from '@/demos/fa-recruit/components/ui/modal';
import { TextInput } from '@/demos/fa-recruit/components/ui/select';
import { cn } from '@/demos/fa-recruit/lib/utils/cn';
import { Confidential } from '@/demos/fa-recruit/components/ui/confidential';

const STATUS_STYLE: Record<CandidateStatus, string> = {
  none: 'border-line bg-white text-muted',
  progress: 'border-brand-700 bg-brand-50 text-brand-700',
  pass: 'border-ok bg-ok-light text-ok',
  done: 'border-brand-700 bg-brand-50 text-brand-700',
  fail: 'border-danger bg-danger-light text-danger',
};

const FIELDS: readonly { key: keyof CandidateInfo; label: string; placeholder: string }[] = [
  { key: 'partner', label: '소속(파트너명)', placeholder: '홍길동 파트너' },
  { key: 'name', label: '이름', placeholder: '홍길동' },
  { key: 'birth', label: '생년월일', placeholder: 'YYYYMMDD' },
  { key: 'empno', label: '사번', placeholder: '인카 사번' },
];

type CandidateListProps = {
  candidates: readonly Candidate[];
  onAdd: (info: CandidateInfo) => void;
  onDelete: (ids: readonly string[]) => void;
  onSelect: (id: string) => void;
  onDownloadTemplate: () => void;
  onUpload: (file: File) => void;

  onExportExcel: () => void;
  onExit: () => void;
};

export function CandidateList({
  candidates,
  onAdd,
  onDelete,
  onSelect,
  onDownloadTemplate,
  onUpload,
  onExportExcel,
  onExit,
}: CandidateListProps) {
  const [formOpen, setFormOpen] = useState(false);
  const [info, setInfo] = useState<CandidateInfo>(EMPTY_CANDIDATE_INFO);

  const [checked, setChecked] = useState<Set<string>>(new Set());

  const [pendingDelete, setPendingDelete] = useState<readonly string[] | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const progress = countCandidates(candidates);

  const diagnosedCount = progress.diagnosed;
  const canAdd = isCandidateInfoComplete(info) && candidates.length < MAX_CANDIDATES;
  const allChecked = candidates.length > 0 && checked.size === candidates.length;

  const toggleCheck = (id: string, on: boolean) => {
    const next = new Set(checked);
    if (on) next.add(id);
    else next.delete(id);
    setChecked(next);
  };

  const submit = () => {
    if (!canAdd) return;
    onAdd(info);
    setInfo(EMPTY_CANDIDATE_INFO);
    setFormOpen(false);
  };

  const confirmDelete = () => {
    if (pendingDelete) {
      onDelete(pendingDelete);
      setChecked(new Set());
    }
    setPendingDelete(null);
  };

  const pendingNames = (pendingDelete ?? [])
    .map((id) => candidates.find((c) => c.id === id)?.info.name || '이름 없음')
    .join(', ');

  return (
    <div className="bg-surface flex min-h-dvh flex-col">
      <div className="border-line border-b bg-white">
        <div className="mx-auto flex max-w-[820px] items-center justify-between px-3 py-2 sm:px-4">
          <button
            type="button"
            onClick={onExit}
            className="text-muted hover:text-brand-700 focus-visible:outline-brand-700 cursor-pointer rounded px-1 py-0.5 text-[12px] font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            ↺ 처음으로
          </button>
          <span className="text-muted text-[11.5px] font-semibold">단체 진단</span>
        </div>
      </div>

      <main className="mx-auto w-full max-w-[820px] flex-1 px-4 py-7 sm:py-10">
        <header className="mb-6">
          <p className="text-brand-700 text-[12px] font-bold">단체 진단</p>
          <h1 className="text-strong mt-1.5 flex items-center gap-2 text-[22px] font-extrabold sm:text-[26px]">
            <span aria-hidden>👥</span>
            대상자 명단
          </h1>
          <p className="text-body mt-2 text-[12.5px] leading-relaxed break-keep">
            명단을 등록해 한 명씩 진단합니다. 진단 내용은 이 브라우저에 임시 저장되며, 대상자별로
            따로 보관됩니다.
          </p>
        </header>

        <Card>
          <CardHead
            step="👥"
            title={`대상자 ${progress.total}명`}
            action={
              <span className="text-muted text-[10.5px] font-bold">
                진단 완료 {progress.diagnosed} / {progress.total}
              </span>
            }
          />
          <CardBody>
            {progress.total > 0 && (
              <div className="bg-surface-alt mb-4 h-1 overflow-hidden rounded-sm">
                <div
                  className="bg-ok h-1 rounded-sm transition-[width] duration-400"
                  style={{ width: `${progress.percent}%` }}
                />
              </div>
            )}

            <Collapse open={formOpen}>
              <div className="border-brand-700 bg-brand-50 mb-4 rounded-[12px] border px-3.5 py-3.5">
                <p className="text-brand-700 mb-2.5 text-[12.5px] font-extrabold">
                  + 새 대상자 추가
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {FIELDS.map((field) => (
                    <label key={field.key} className="block">
                      <span className="text-strong mb-1 block text-[11px] font-extrabold">
                        {field.label} <span className="text-danger">*</span>
                      </span>
                      <TextInput
                        value={info[field.key]}
                        placeholder={field.placeholder}
                        maxLength={field.key === 'birth' ? 8 : undefined}
                        onChange={(e) => setInfo({ ...info, [field.key]: e.target.value })}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') submit();
                          if (e.key === 'Escape') setFormOpen(false);
                        }}
                        className="p-2.5 text-[13px]"
                      />
                    </label>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  <Button disabled={!canAdd} onClick={submit} className="flex-1">
                    + 목록에 추가
                  </Button>
                  <Button variant="outline" onClick={() => setFormOpen(false)}>
                    취소
                  </Button>
                </div>
                {candidates.length >= MAX_CANDIDATES && (
                  <p className="text-danger mt-2 text-[11px] font-bold">
                    최대 {MAX_CANDIDATES}명까지 등록할 수 있습니다.
                  </p>
                )}
              </div>
            </Collapse>

            {candidates.length > 0 && (
              <div className="border-line mb-2.5 flex items-center justify-between gap-2 rounded-[10px] border px-3 py-2">
                <Checkbox
                  checked={allChecked}
                  onChange={(on) =>
                    setChecked(on ? new Set(candidates.map((c) => c.id)) : new Set())
                  }
                  className="text-body text-[11.5px] font-bold"
                >
                  전체 선택
                  <span
                    className={cn('ml-1.5', checked.size > 0 ? 'text-brand-700' : 'text-muted')}
                  >
                    {checked.size}명 선택됨
                  </span>
                </Checkbox>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={checked.size === 0}
                  onClick={() => setPendingDelete([...checked])}
                  className="border-danger text-danger hover:bg-danger-light"
                >
                  🗑 선택 삭제
                </Button>
              </div>
            )}

            {candidates.length === 0 ? (
              <p className="text-muted py-10 text-center text-[12.5px] font-semibold break-keep">
                등록된 대상자가 없습니다. 아래에서 추가하거나 엑셀 명단을 올려주세요.
              </p>
            ) : (
              <ul>
                {candidates.map((candidate) => {
                  const status = getCandidateStatus(candidate.diagnosis);
                  const diagnosed = isDiagnosed(status);
                  const failReason = getFailReason(candidate.diagnosis);
                  const meta = getCandidateMeta(candidate);
                  return (
                    <li
                      key={candidate.id}
                      className={cn(
                        'mb-1.5 flex items-start gap-2.5 rounded-[10px] border px-3 py-2.5 transition-colors',
                        checked.has(candidate.id)
                          ? 'border-brand-700 bg-brand-50'
                          : 'border-line bg-white',
                      )}
                    >
                      <Checkbox
                        checked={checked.has(candidate.id)}
                        onChange={(on) => toggleCheck(candidate.id, on)}
                        aria-label={`${candidate.info.name || '대상자'} 선택`}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-strong text-[13px] font-extrabold break-keep">
                            {candidate.info.name || '이름 없음'}
                          </span>
                          <span
                            className={cn(
                              'rounded-full border px-1.5 py-0.5 text-[10px] font-bold break-keep',
                              STATUS_STYLE[status],
                            )}
                          >
                            {CANDIDATE_STATUS_LABEL[status]}
                          </span>
                        </div>
                        {meta && (
                          <p className="text-muted mt-0.5 text-[10.5px] font-semibold break-keep">
                            {meta}
                          </p>
                        )}
                        {failReason && (
                          <p className="text-danger mt-0.5 text-[10px] font-semibold break-keep">
                            └ <Confidential text={failReason} />
                          </p>
                        )}
                      </div>
                      <div className="flex shrink-0 gap-1.5">
                        <Button size="sm" onClick={() => onSelect(candidate.id)}>
                          {diagnosed ? '재진단' : '진단하기'}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setPendingDelete([candidate.id])}
                          className="border-line text-muted hover:bg-surface-alt"
                        >
                          삭제
                        </Button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              <Button
                variant="subtle"
                onClick={() => setFormOpen(true)}
                disabled={candidates.length >= MAX_CANDIDATES}
              >
                + 새 대상자
              </Button>
              <Button variant="outline" onClick={onDownloadTemplate}>
                ⬇ 양식 다운로드
              </Button>
              <Button variant="outline" onClick={() => fileRef.current?.click()}>
                ⬆ 명단 업로드
              </Button>
            </div>

            {diagnosedCount > 0 && (
              <Button variant="ok" size="lg" className="mt-2" onClick={onExportExcel}>
                📊 결과 엑셀 저장 ({diagnosedCount}명 · 탭 분리)
              </Button>
            )}
            <input
              ref={fileRef}
              type="file"
              accept=".xlsx,.xls"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onUpload(file);

                e.target.value = '';
              }}
            />
          </CardBody>
        </Card>

        <p className="text-muted text-center text-[10.5px] leading-relaxed break-keep">
          진단 결과 엑셀 저장은 준비 중입니다. 명단은 이 브라우저에만 저장됩니다.
        </p>
      </main>

      <Modal
        open={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        title="대상자를 삭제할까요?"
        description="진단 내용까지 함께 지워지며 되돌릴 수 없습니다."
      >
        <div className="p-5">
          <p className="border-danger bg-danger-light text-danger rounded-r-lg border-l-[3px] px-3 py-2.5 text-[12px] font-bold break-keep">
            {pendingNames}
          </p>
          <div className="mt-4 flex gap-2">
            <Button
              variant="outline"
              className="flex-1 py-3"
              onClick={() => setPendingDelete(null)}
            >
              취소
            </Button>
            <Button
              className="border-danger bg-danger hover:bg-danger flex-1 py-3"
              onClick={confirmDelete}
            >
              삭제
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
