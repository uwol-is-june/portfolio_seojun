import { getDisclaimerText, type FinalDiagnosisResult } from '@/demos/fa-recruit/lib/domain/final-diagnosis';
import type { PrecheckWarning } from '@/demos/fa-recruit/lib/domain/precheck';
import type { ApplicantType } from '@/demos/fa-recruit/lib/domain/self-diagnosis';
import { Reveal, createRevealOrder } from '@/demos/fa-recruit/components/ui/reveal';
import { cn } from '@/demos/fa-recruit/lib/utils/cn';
import { Confidential } from '@/demos/fa-recruit/components/ui/confidential';

const BANNER_TONE = {
  bad: 'border-danger bg-danger-light text-danger',
  warn: 'border-warn bg-warn-light text-warn',
  pending: 'border-pending bg-pending-light text-pending',
  ok: 'border-ok bg-ok-light text-ok',
} as const;

type QualifyResultProps = {
  result: FinalDiagnosisResult;
  applicantType: ApplicantType;
  warnings: readonly PrecheckWarning[];
};

export function QualifyResult({ result, applicantType, warnings }: QualifyResultProps) {

  const order = createRevealOrder();

  return (
    <section className="mt-6">

      <Reveal index={order()} className="mb-3 flex items-center gap-2.5">
        <span className="text-ok shrink-0 text-[12px] font-extrabold">✓ 위촉 진단 완료</span>
        <span className="bg-line h-px flex-1" />
      </Reveal>

      {warnings.map((warning) => (
        <Reveal
          key={warning.key}
          index={order()}
          className="border-warn bg-warn-light mb-2.5 flex items-start gap-2.5 rounded-[12px] border-[1.5px] px-3.5 py-3"
        >
          <span aria-hidden className="shrink-0 text-[17px]">
            ⚠️
          </span>
          <div className="min-w-0">
            <p className="text-warn text-[12.5px] font-extrabold break-keep">{warning.title}</p>
            <p className="text-body mt-0.5 text-[11px] leading-relaxed break-keep whitespace-pre-line">
              {warning.body}
            </p>
          </div>
        </Reveal>
      ))}

      <Reveal
        index={order()}
        className={cn(
          'flex items-start gap-3.5 rounded-[14px] border-[1.5px] px-4 py-4',
          BANNER_TONE[result.grade],
        )}
      >
        <span aria-hidden className="shrink-0 text-[30px] leading-none">
          {result.icon}
        </span>
        <div className="min-w-0">
          <p className="text-[17px] leading-tight font-black break-keep">{result.title}</p>
          <p className="text-body mt-1.5 text-[12px] leading-relaxed break-keep whitespace-pre-line">
            <Confidential text={result.desc} />
          </p>
        </div>
      </Reveal>

      <Reveal
        index={order()}
        className="border-warn bg-warn-light mt-2.5 flex items-start gap-2.5 rounded-[12px] border-[1.5px] px-4 py-3.5"
      >
        <span aria-hidden className="shrink-0 text-[20px]">
          ⚠️
        </span>
        <div>
          <p className="text-warn text-[13px] font-extrabold">사전 진단 결과 · 참고용</p>
          <p className="text-warn mt-1 text-[12px] leading-relaxed break-keep">
            {getDisclaimerText(applicantType)}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
