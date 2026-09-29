'use client';

import { useCallback, useState } from 'react';

import { createEmptyDiagnosisState, type DiagnosisState } from '@/demos/fa-recruit/lib/domain/diagnosis-state';
import { hasSeenIntro, markIntroSeen } from '@/demos/fa-recruit/lib/storage/intro-seen';
import { BatchShell } from '@/demos/fa-recruit/components/batch/batch-shell';
import { DiagnosisIntro } from '@/demos/fa-recruit/components/layout/diagnosis-intro';
import { DiagnosisShell } from '@/demos/fa-recruit/components/layout/diagnosis-shell';
import { ModeLanding, type DiagnosisScope } from '@/demos/fa-recruit/components/layout/mode-landing';
import { MalsoGuide } from '@/demos/fa-recruit/components/malso/malso-guide';
import { ToastProvider } from '@/demos/fa-recruit/components/ui/toast';

type Phase = 'landing' | 'intro' | 'diagnosis' | 'malso';

export default function FaRecruitApp() {
  const [phase, setPhase] = useState<Phase>('landing');
  const [scope, setScope] = useState<DiagnosisScope | null>(null);

  const [diagnosis, setDiagnosis] = useState<DiagnosisState>(createEmptyDiagnosisState);

  const handleSelect = (next: DiagnosisScope) => {
    setScope(next);
    setPhase(hasSeenIntro() ? 'diagnosis' : 'intro');
  };

  const handleIntroDone = useCallback(() => {
    markIntroSeen();
    setPhase('diagnosis');
  }, []);

  const handleExit = () => {
    setScope(null);
    setPhase('landing');
    setDiagnosis(createEmptyDiagnosisState());
  };

  return (
    <ToastProvider>
      {phase === 'malso' ? (
        <MalsoGuide onExit={() => setPhase('landing')} />
      ) : phase === 'landing' || scope === null ? (
        <ModeLanding onSelect={handleSelect} onOpenMalsoGuide={() => setPhase('malso')} />
      ) : phase === 'intro' ? (
        <DiagnosisIntro scope={scope} onDone={handleIntroDone} />
      ) : scope === 'multi' ? (
        <BatchShell onExit={handleExit} />
      ) : (
        <DiagnosisShell
          scope={scope}
          onExit={handleExit}
          state={diagnosis}
          onStateChange={setDiagnosis}
        />
      )}
    </ToastProvider>
  );
}
