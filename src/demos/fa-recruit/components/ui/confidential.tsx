import type { ReactNode } from 'react';

/**
 * 공개 데모 전용: 사내 기준 문구는 데이터 단계에서 "대외비 …" 더미로 바뀌어 있다.
 * 원문은 번들에 없고, 화면에서는 더미를 흐리게 그려 글자 자리만 보여 준다.
 * 일반 문장 뒤에 더미가 이어 붙는 경우도 있어(판정 설명 등) 더미 구간만 골라 흐린다.
 */
const DUMMY = /(대외비(?:[ ,]+대외비)*)/;

export function isConfidential(text: unknown): text is string {
  return typeof text === 'string' && text.includes('대외비');
}

/** 대외비 더미가 있으면 🔒 배지 + 해당 구간 블러로, 없으면 그대로 그린다 */
export function Confidential({ text, children }: { text: string | undefined; children?: ReactNode }) {
  if (!isConfidential(text)) return <>{children ?? text}</>;
  const parts = text.split(DUMMY);
  return (
    <span className="inline">
      <span className="bg-strong/85 mr-1.5 inline-flex items-center gap-0.5 rounded-[5px] px-1.5 py-px align-[1px] text-[10px] font-bold whitespace-nowrap text-white not-italic select-none">
        🔒 대외비
      </span>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} aria-hidden className="blur-[3.5px] select-none">
            {part}
          </span>
        ) : (
          part && <span key={i}>{part}</span>
        ),
      )}
      <span className="sr-only">(대외비 내용 가림)</span>
    </span>
  );
}
