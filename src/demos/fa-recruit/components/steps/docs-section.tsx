'use client';

import { useState } from 'react';

import {
  buildDocGroups,
  checkKey,
  countDocProgress,
  countTodoProgress,
  getTodoGroups,
  isDocsComplete,
  todoKey,
  type DocChecks,
  type DocsInput,
} from '@/demos/fa-recruit/lib/domain/documents';
import { Card } from '@/demos/fa-recruit/components/ui/card';
import { Collapse } from '@/demos/fa-recruit/components/ui/collapse';

import { DocChecklist, ProgressHeader } from './doc-checklist';

type DocsSectionProps = {
  input: DocsInput;
  checks: DocChecks;
  onChecksChange: (next: DocChecks) => void;
};

const NO_STAGGER_INDEX = 6;

export function DocsSection({ input, checks, onChecksChange }: DocsSectionProps) {
  const [open, setOpen] = useState(true);

  const groups = buildDocGroups(input);
  const todoGroups = getTodoGroups();

  const docProgress = countDocProgress(groups, input.type, checks);
  const todoProgress = countTodoProgress(checks);
  const complete = isDocsComplete(groups, input.type, checks);

  const toggle = (key: string, checked: boolean) => onChecksChange({ ...checks, [key]: checked });

  return (
    <Card>

      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="border-surface-alt focus-visible:outline-brand-700 hover:bg-brand-50/60 flex w-full cursor-pointer items-center gap-2.5 border-b bg-[#fafbfc] px-[18px] py-3.5 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:-outline-offset-2"
      >
        <span aria-hidden className="text-[15px]">
          📦
        </span>
        <h2 className="text-brand-700 text-sm font-bold break-keep">서류 · 필수이행</h2>
        <span className="ml-auto flex shrink-0 items-center gap-2">
          <span className="text-muted text-[11px] font-bold whitespace-nowrap">
            {complete ? (
              <span className="text-ok">✓ 모두 체크</span>
            ) : (
              <>
                서류 {docProgress.done}/{docProgress.total} · 이행 {todoProgress.done}/
                {todoProgress.total}
              </>
            )}
          </span>
          <span aria-hidden className="text-muted text-[10px]">
            {open ? '▲' : '▼'}
          </span>
        </span>
      </button>

      <Collapse open={open}>
        <div className="px-[18px] pt-4 pb-5">
          <p className="text-muted mb-4 text-[11px] leading-relaxed break-keep">
            진단 결과에 맞춰 자동 생성된 체크리스트입니다. 체크 상태는 저장되고 엑셀·이미지에 그대로
            나갑니다.
          </p>

          <section className="mb-6">
            <ProgressHeader title="📄 제출 서류" tone="docs" progress={docProgress} showPercent />
            <DocChecklist
              groups={groups}
              checks={checks}
              keyOf={(name) => checkKey(input.type, name)}
              onToggle={(name, checked) => toggle(checkKey(input.type, name), checked)}
              startIndex={NO_STAGGER_INDEX}
            />
          </section>

          <section>
            <ProgressHeader title="✅ 필수 이행" tone="todo" progress={todoProgress} />
            <DocChecklist
              groups={todoGroups}
              checks={checks}
              keyOf={todoKey}
              onToggle={(name, checked) => toggle(todoKey(name), checked)}
              startIndex={NO_STAGGER_INDEX}
            />
          </section>
        </div>
      </Collapse>
    </Card>
  );
}
