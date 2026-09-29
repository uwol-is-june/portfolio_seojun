'use client';

import { useState } from 'react';

import { Button } from '@/demos/fa-recruit/components/ui/button';
import { Card, CardBody, CardHead } from '@/demos/fa-recruit/components/ui/card';
import { useToast } from '@/demos/fa-recruit/components/ui/toast';
import type { CandidateInfo } from '@/demos/fa-recruit/lib/domain/candidates';
import type { DiagnosisState } from '@/demos/fa-recruit/lib/domain/diagnosis-state';
import { copyText } from '@/demos/fa-recruit/lib/share/clipboard';
import {
  COPY_FAILED_MESSAGE,
  COPY_FULL_DONE_MESSAGE,
  COPY_SHORT_DONE_MESSAGE,
  formatFullResult,
  formatShortResult,
} from '@/demos/fa-recruit/lib/share/copy-text';
import { buildDiagnosisSnapshot, type DiagnosisSnapshot } from '@/demos/fa-recruit/lib/share/diagnosis-snapshot';

type ShareActionsProps = {
  state: DiagnosisState;

  info?: CandidateInfo | null;
};

export function ShareActions({ state, info = null }: ShareActionsProps) {
  const { showToast } = useToast();
  const [busy, setBusy] = useState(false);

  const snapshotOf = () => buildDiagnosisSnapshot(state, { info });

  const copy = async (
    format: (snapshot: DiagnosisSnapshot) => string,
    doneMessage: string,
  ): Promise<void> => {
    setBusy(true);
    try {
      showToast((await copyText(format(snapshotOf()))) ? doneMessage : COPY_FAILED_MESSAGE);
    } finally {
      setBusy(false);
    }
  };

  const handleExcel = async () => {
    setBusy(true);
    try {
      const { EXCEL_DONE_MESSAGE, downloadDiagnosisExcel } =
        await import('@/demos/fa-recruit/lib/excel/diagnosis-excel');
      showToast(`${EXCEL_DONE_MESSAGE} — ${downloadDiagnosisExcel(snapshotOf())}`);
    } finally {
      setBusy(false);
    }
  };

  const handleImage = async () => {
    setBusy(true);
    try {
      const { IMAGE_DONE_MESSAGE, downloadResultImage } = await import('@/demos/fa-recruit/lib/image/result-image');
      showToast(`${IMAGE_DONE_MESSAGE} — ${downloadResultImage(snapshotOf())}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card>
      <CardHead step="📤" title="결과 공유" />
      <CardBody>
        <div className="grid gap-2.5">
          <Button
            variant="subtle"
            size="lg"
            disabled={busy}
            onClick={() => copy(formatShortResult, COPY_SHORT_DONE_MESSAGE)}
          >
            📋 간단 복사 (카톡·문자용)
          </Button>
          <Button
            variant="outline"
            size="lg"
            disabled={busy}
            onClick={() => copy(formatFullResult, COPY_FULL_DONE_MESSAGE)}
          >
            📄 상세 복사 (서류·필수이행 포함)
          </Button>
          <Button variant="outline" size="lg" disabled={busy} onClick={handleExcel}>
            📊 엑셀 저장 (.xlsx · 4시트)
          </Button>
          <Button variant="outline" size="lg" disabled={busy} onClick={handleImage}>
            🖼️ 이미지 저장 (.png · 한 장 요약)
          </Button>
        </div>
        <p className="text-muted mt-2.5 text-center text-[11px] font-semibold break-keep">
          저장한 파일은 브라우저 기본 다운로드 폴더에 들어갑니다.
        </p>
      </CardBody>
    </Card>
  );
}
