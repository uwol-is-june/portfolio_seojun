'use client';

import {
  getSpecialConditionGuide,
  type GuideBanner,
} from '@/demos/fa-recruit/lib/domain/rules/special-condition-guide';
import type { Role } from '@/demos/fa-recruit/lib/domain/self-diagnosis';
import type { SpecialConditionState } from '@/demos/fa-recruit/lib/domain/special-condition';
import { Card, CardBody, CardHead } from '@/demos/fa-recruit/components/ui/card';
import { cn } from '@/demos/fa-recruit/lib/utils/cn';
import { Confidential } from '@/demos/fa-recruit/components/ui/confidential';

const BANNER_TONE: Record<GuideBanner['tone'], string> = {
  warn: 'bg-warn-light border-warn text-warn',
  ok: 'bg-ok-light border-ok text-ok',
  danger: 'bg-danger-light border-danger text-danger',
};

type SpecialConditionInfoCardProps = {
  value: SpecialConditionState;
  role: Role | null;
};

export function SpecialConditionInfoCard({ value, role }: SpecialConditionInfoCardProps) {
  const guide = getSpecialConditionGuide(value, role);
  if (!guide) return null;

  return (
    <Card>
      <CardHead title={guide.title} />
      <CardBody>
        {guide.badges && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1.5">
              {guide.badges.map((b) => (
                <span
                  key={b}
                  className="bg-ok-light text-ok rounded-[5px] px-2 py-0.5 text-[11px] font-bold"
                >
                  {b}
                </span>
              ))}
            </div>
            {guide.badgeNote && <p className="text-muted mt-1.5 text-[11px]"><Confidential text={guide.badgeNote} /></p>}
          </div>
        )}

        {guide.banners.map((b, i) => (
          <div
            key={i}
            className={cn('mb-3 rounded-lg border px-3 py-2 text-[11.5px]', BANNER_TONE[b.tone])}
          >
            <p className="font-extrabold"><Confidential text={b.text} /></p>
            {b.sub && <p className="mt-0.5 whitespace-pre-line opacity-85"><Confidential text={b.sub} /></p>}
          </div>
        ))}

        {guide.docs.length > 0 && (
          <div className="mb-2.5">
            {guide.docsHeading && (
              <p
                className={cn(
                  'mb-2 text-[12.5px] font-extrabold',
                  guide.docsTone === 'ok' ? 'text-ok' : 'text-brand-700',
                )}
              >
                {guide.docsHeading}
              </p>
            )}
            {guide.docs.map((d) => (
              <div key={d.name} className="py-1 text-[12px]">
                📄 <span className="font-bold">{d.name}</span>
                {d.sub && <p className="text-muted pl-4 text-[11px]"><Confidential text={d.sub} /></p>}
              </div>
            ))}
            {guide.docsFootnote && (
              <p className="border-line text-muted mt-2 border-t pt-1.5 text-[11px]">
                <Confidential text={guide.docsFootnote} />
              </p>
            )}
          </div>
        )}

        {guide.bulletGroups.map((g) => (
          <div key={g.heading} className="border-line mt-0.5 border-t pt-2.5">
            <p
              className={cn(
                'mb-1.5 text-[12px] font-extrabold',
                g.tone === 'warn' ? 'text-warn' : 'text-brand-700',
              )}
            >
              {g.heading}
            </p>
            {g.items.map((item, i) => (
              <p key={i} className="text-body py-0.5 text-[11.5px]">
                • <Confidential text={item} />
              </p>
            ))}
          </div>
        ))}

        {guide.footnote && (
          <p className="border-line text-muted mt-2.5 border-t pt-2.5 text-[11px] leading-relaxed">
            <Confidential text={guide.footnote} />
          </p>
        )}
      </CardBody>
    </Card>
  );
}
