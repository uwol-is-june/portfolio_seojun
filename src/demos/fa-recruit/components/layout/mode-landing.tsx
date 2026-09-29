'use client';

import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/demos/fa-recruit/lib/utils/cn';

import { RecruitSitesModal } from './recruit-sites-modal';
import { UsageGuideModal } from './usage-guide-modal';

export type DiagnosisScope = 'single' | 'multi';

type ModeCard = {
  scope: DiagnosisScope;
  icon: string;
  title: string;
  desc: string;

  scopeNote: string;
};

type QuickLink = {
  key: 'usage' | 'malso-guide' | 'sites';
  icon: string;
  title: string;

  span: string;
};

const QUICK_LINKS: readonly QuickLink[] = [
  { key: 'usage', icon: '📖', title: '사용법', span: 'col-span-2' },
  { key: 'malso-guide', icon: '📘', title: '말소 셀프 가이드', span: 'col-span-2' },
  { key: 'sites', icon: '🔗', title: '위촉 관련 사이트', span: 'col-span-2' },
];

const CARDS: readonly ModeCard[] = [
  {
    scope: 'single',
    icon: '🔍',
    title: '개인 진단',
    desc: '대상자 정보 없이 바로 시작합니다.\n상담 중 즉시 확인할 때 적합합니다.',
    scopeNote: '한 명의 대상자만 진단해요',
  },
  {
    scope: 'multi',
    icon: '📋',
    title: '단체 진단',
    desc: '명단을 등록해 한 명씩 진단하고 결과를 모아둡니다.\n보고용으로 내보낼 수 있습니다.',
    scopeNote: '여러 명을 한 번에 진단해요',
  },
];

type ModeLandingProps = {
  onSelect: (scope: DiagnosisScope) => void;

  onOpenMalsoGuide: () => void;
};

export function ModeLanding({ onSelect, onOpenMalsoGuide }: ModeLandingProps) {

  const [openLink, setOpenLink] = useState<QuickLink['key'] | null>(null);

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 py-16">

      <Image src="/demos/fa-recruit/brand/intro.jpg" alt="" fill priority sizes="100vw" className="object-cover" />

      <div className="bg-brand-950/75 absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/65" />

      <div className="relative z-10 flex w-full max-w-[860px] flex-col items-center">
        <header className="mb-10 text-center sm:mb-14">
          <p className="text-[13px] font-bold tracking-[0.35em] text-white/70 sm:text-[15px]">
            인카금융서비스
          </p>
          <h1 className="mt-3 text-[30px] leading-tight font-extrabold text-white sm:mt-4 sm:text-[46px]">
            위촉 사전 진단 시뮬레이션
          </h1>
          <p className="mt-4 text-[12.5px] leading-relaxed text-white/60 sm:mt-5 sm:text-[14px]">
            진단 범위를 선택하세요
          </p>
        </header>

        <div className="grid w-full gap-4 sm:grid-cols-2 sm:gap-5">
          {CARDS.map((card) => (
            <button
              key={card.scope}
              type="button"
              onClick={() => onSelect(card.scope)}
              className={cn(
                'group flex cursor-pointer flex-col items-center rounded-[20px] border border-white/20 bg-white/10 p-7 text-center backdrop-blur-md transition-all duration-200 sm:p-9',
                'hover:-translate-y-1 hover:border-white/45 hover:bg-white/20 hover:shadow-[0_18px_50px_rgb(0_0_0_/_0.35)]',
                'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white',
              )}
            >
              <span className="flex size-14 items-center justify-center rounded-2xl bg-white/15 text-[26px] transition-colors duration-200 group-hover:bg-white/25 sm:size-16 sm:text-[30px]">
                {card.icon}
              </span>
              <span className="mt-5 text-[19px] font-extrabold text-white sm:text-[22px]">
                {card.title}
              </span>
              <span className="mt-2.5 text-[12.5px] leading-relaxed whitespace-pre-line text-white/70 sm:text-[13.5px]">
                {card.desc}
              </span>
              <span className="mt-5 rounded-full border border-white/25 px-4 py-1.5 text-[11px] font-semibold text-white/80 sm:text-[11.5px]">
                {card.scopeNote}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-4 grid w-full grid-cols-6 gap-3 sm:mt-5 sm:gap-4">
          {QUICK_LINKS.map((link) => (
            <button
              key={link.key}
              type="button"

              onClick={
                link.key === 'malso-guide' ? onOpenMalsoGuide : () => setOpenLink(link.key)
              }
              className={cn(
                link.span,
                'flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-200 sm:gap-2.5 sm:px-5 sm:py-3.5',
                'hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/20 hover:shadow-[0_12px_32px_rgb(0_0_0_/_0.3)]',
                'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white',
              )}
            >
              <span className="text-[15px] sm:text-[17px]">{link.icon}</span>
              <span className="text-[12.5px] font-bold break-keep text-white sm:text-[14px]">
                {link.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      <UsageGuideModal open={openLink === 'usage'} onClose={() => setOpenLink(null)} />
      <RecruitSitesModal open={openLink === 'sites'} onClose={() => setOpenLink(null)} />
    </div>
  );
}
