'use client';

import { useState } from 'react';

import {
  MAX_CANDIDATES,
  MAX_CANDIDATES_MESSAGE,
  createCandidateId,
  findNextPending,
  selectDiagnosed,
  type Candidate,
  type CandidateInfo,
} from '@/demos/fa-recruit/lib/domain/candidates';
import { createEmptyDiagnosisState, type DiagnosisState } from '@/demos/fa-recruit/lib/domain/diagnosis-state';
import { downloadCandidateTemplate, parseCandidateSheet } from '@/demos/fa-recruit/lib/excel/candidate-sheet';
import { buildDiagnosisSnapshot } from '@/demos/fa-recruit/lib/share/diagnosis-snapshot';
import {
  STORAGE_FULL_MESSAGE,
  loadCandidates,
  saveCandidates,
} from '@/demos/fa-recruit/lib/storage/candidates-storage';
import { DiagnosisShell } from '@/demos/fa-recruit/components/layout/diagnosis-shell';
import { useToast } from '@/demos/fa-recruit/components/ui/toast';

import { CandidateList } from './candidate-list';

type BatchShellProps = {
  onExit: () => void;
};

export function BatchShell({ onExit }: BatchShellProps) {
  const { showToast } = useToast();

  const [candidates, setCandidates] = useState<readonly Candidate[]>(() =>
    typeof window === 'undefined' ? [] : loadCandidates(),
  );
  const [currentId, setCurrentId] = useState<string | null>(null);

  const [seq, setSeq] = useState(0);

  const commit = (next: readonly Candidate[]) => {
    setCandidates(next);
    if (!saveCandidates(next)) showToast(STORAGE_FULL_MESSAGE);
  };

  const nextId = (offset: number) =>
    createCandidateId(`${Date.now().toString(36)}_${seq + offset}`);

  const addCandidates = (rows: readonly CandidateInfo[]): number => {
    const room = MAX_CANDIDATES - candidates.length;
    if (room <= 0) {
      showToast(MAX_CANDIDATES_MESSAGE);
      return 0;
    }
    const accepted = rows.slice(0, room);
    const now = new Date().toISOString();
    const added: Candidate[] = accepted.map((info, i) => ({
      id: nextId(i),
      info,
      diagnosis: createEmptyDiagnosisState(),
      updatedAt: now,
    }));
    setSeq((s) => s + added.length);
    commit([...candidates, ...added]);
    if (accepted.length < rows.length) showToast(MAX_CANDIDATES_MESSAGE);
    return added.length;
  };

  const handleUpload = async (file: File) => {
    const result = parseCandidateSheet(await file.arrayBuffer());
    if (!result.ok) {
      showToast(result.message);
      return;
    }
    if (result.rows.length === 0) {
      showToast('추가된 대상자가 없습니다. 양식을 확인해주세요.');
      return;
    }
    const added = addCandidates(result.rows);
    if (added > 0) {
      showToast(`${added}명이 추가되었습니다. 목록에서 진단할 대상자를 선택하세요.`);
    }
  };

  const handleDelete = (ids: readonly string[]) => {
    const gone = new Set(ids);
    commit(candidates.filter((c) => !gone.has(c.id)));

    if (currentId && gone.has(currentId)) setCurrentId(null);
  };

  const handleStateChange = (id: string, next: DiagnosisState) => {
    commit(
      candidates.map((c) =>
        c.id === id ? { ...c, diagnosis: next, updatedAt: new Date().toISOString() } : c,
      ),
    );
  };

  const handleExportExcel = async () => {
    const targets = selectDiagnosed(candidates);
    const { downloadMultiExcel, multiExcelDoneMessage, NO_DIAGNOSED_MESSAGE } =
      await import('@/demos/fa-recruit/lib/excel/diagnosis-excel');
    if (targets.length === 0) {
      showToast(NO_DIAGNOSED_MESSAGE);
      return;
    }
    const now = new Date();
    const people = targets.map((candidate, i) => ({
      no: i + 1,
      snapshot: buildDiagnosisSnapshot(candidate.diagnosis, { info: candidate.info, now }),
    }));

    downloadMultiExcel(people, people[0].snapshot.generatedAt);
    showToast(multiExcelDoneMessage(people.length));
  };

  const current = candidates.find((c) => c.id === currentId) ?? null;

  if (current) {
    const next = findNextPending(candidates, current.id);
    return (
      <DiagnosisShell

        key={current.id}
        scope="multi"
        onExit={onExit}
        state={current.diagnosis}
        onStateChange={(state) => handleStateChange(current.id, state)}
        candidateName={`${current.info.name || '대상자'} · 단체 진단`}
        candidateInfo={current.info}
        onBackToList={() => setCurrentId(null)}
        nextCandidateName={next?.info.name ?? null}
        onNextCandidate={next ? () => setCurrentId(next.id) : undefined}
      />
    );
  }

  return (
    <CandidateList
      candidates={candidates}
      onAdd={(info) => {
        if (addCandidates([info]) > 0) showToast(`${info.name}님이 명단에 추가되었습니다.`);
      }}
      onDelete={handleDelete}
      onSelect={setCurrentId}
      onDownloadTemplate={downloadCandidateTemplate}
      onUpload={handleUpload}
      onExportExcel={handleExportExcel}
      onExit={onExit}
    />
  );
}
