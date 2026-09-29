'use client';

import { useState } from 'react';

import { shouldAskEclean, type PrecheckAnswer, type PrecheckState } from '@/demos/fa-recruit/lib/domain/precheck';
import type { SpecialCondition } from '@/demos/fa-recruit/lib/domain/special-condition';
import { Card, CardBody, CardHead } from '@/demos/fa-recruit/components/ui/card';
import { cn } from '@/demos/fa-recruit/lib/utils/cn';
import { Confidential } from '@/demos/fa-recruit/components/ui/confidential';

type Item = {
  key: 'bond' | 'eclean';
  title: string;
  note: string;
  link: { label: string; url: string };
  guide: { label: string; body: string }[];
};

const ITEMS: readonly Item[] = [
  {
    key: 'bond',
    title: '보증보험 동의',
    note: '정확한 진단을 위한 필수 선행 절차',
    link: { label: '보증보험 동의 바로가기', url: 'https://www.sgic.co.kr/?p=CCPMAN000001F01' },
    guide: [
      {
        label: '⚠️ 사전 확인',
        body: "대외비\n대외비\n대외비 대외비",
      },
      {
        label: '📋 진행 방법',
        body: "대외비\n대외비 대외비\n대외비 대외비\n대외비 대외비\n대외비 대외비",
      },
    ],
  },
  {
    key: 'eclean',
    title: 'E-클린서비스 조회',
    note: '조회내역 1개월 이내',
    link: { label: '이클린서비스 바로가기', url: 'https://www.e-cleanins.or.kr/' },
    guide: [
      {
        label: '📋 진행 방법',
        body: "대외비\n대외비 대외비\n대외비 대외비",
      },
    ],
  },
];

const ANSWERS: readonly { value: PrecheckAnswer; label: string }[] = [
  { value: 'done', label: '완료했어요' },
  { value: 'not-yet', label: '아직 안 했어요' },
];

type PrecheckCardProps = {
  value: PrecheckState;
  onChange: (next: PrecheckState) => void;

  assocHistory: boolean;
  specialCondition: SpecialCondition | null;
};

export function PrecheckCard({
  value,
  onChange,
  assocHistory,
  specialCondition,
}: PrecheckCardProps) {
  const [openGuide, setOpenGuide] = useState<string | null>(null);
  const showEclean = shouldAskEclean(assocHistory, specialCondition);
  const items = ITEMS.filter((i) => i.key === 'bond' || showEclean);

  return (
    <Card>
      <CardHead step="✓" title="선행 절차 확인" tone="ok" />
      <CardBody>
        {items.map((item) => {
          const selected = value[item.key];
          const isOpen = openGuide === item.key;

          return (
            <div key={item.key} className="border-line mb-3 rounded-[12px] border last:mb-0">
              <div className="px-3.5 pt-3.5">
                <span className="text-strong text-[13.5px] font-extrabold">{item.title}</span>
                <p className="text-muted mt-0.5 text-[11.5px]">{item.note}</p>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  {ANSWERS.map((a) => {
                    const isOn = selected === a.value;
                    return (
                      <button
                        key={a.value}
                        type="button"
                        onClick={() => onChange({ ...value, [item.key]: a.value })}
                        className={cn(
                          'cursor-pointer rounded-[10px] border-[1.5px] px-3 py-2.5 text-[12.5px] font-bold transition-all duration-150',
                          'focus-visible:outline-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2',
                          isOn && a.value === 'done' && 'border-ok bg-ok-light text-ok',
                          isOn && a.value === 'not-yet' && 'border-warn bg-warn-light text-warn',
                          !isOn && 'border-line text-body hover:border-brand-300 bg-white',
                        )}
                      >
                        {a.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2 px-3.5 pb-3.5">
                <a
                  href={item.link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="border-brand-700 text-brand-700 hover:bg-brand-50 rounded-md border px-2.5 py-1 text-[11px] font-bold"
                >
                  ↗ {item.link.label}
                </a>
                <button
                  type="button"
                  onClick={() => setOpenGuide(isOpen ? null : item.key)}
                  className="border-line text-body hover:bg-surface cursor-pointer rounded-md border px-2.5 py-1 text-[11px] font-bold"
                >
                  {isOpen ? '▴ 닫기' : '▾ 진행 방법'}
                </button>
              </div>

              {isOpen && (
                <div className="border-line bg-surface animate-fade-in border-t px-3.5 py-3">
                  {item.guide.map((g) => (
                    <div key={g.label} className="mb-2.5 last:mb-0">
                      <p className="text-strong text-[11.5px] font-extrabold">{g.label}</p>
                      <p className="text-body mt-1 text-[11.5px] leading-relaxed whitespace-pre-line">
                        <Confidential text={g.body} />
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {!showEclean && (
          <p className="text-muted mt-1 text-[11.5px]">
            협회 등록 이력이 없어 E-클린서비스 조회 대상이 아닙니다.
          </p>
        )}
      </CardBody>
    </Card>
  );
}
