'use client';

import { Modal } from '@/demos/fa-recruit/components/ui/modal';
import { RECRUIT_SITES } from '@/demos/fa-recruit/lib/domain/rules/external-links';

export function RecruitSitesModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="🔗 위촉 관련 사이트"
      description="새 탭으로 열립니다."
    >
      <ul>
        {RECRUIT_SITES.map((site) => (
          <li key={site.key} className="border-surface-alt border-b last:border-b-0">
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-body hover:bg-brand-50 hover:text-brand-700 group flex items-center gap-3 px-5 py-3.5 text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2"
            >
              <span className="w-5 shrink-0 text-center text-[13px]">{site.icon}</span>
              <span className="min-w-0 flex-1 break-keep">{site.label}</span>
              <span className="text-muted group-hover:text-brand-700 shrink-0 text-[10px]">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
