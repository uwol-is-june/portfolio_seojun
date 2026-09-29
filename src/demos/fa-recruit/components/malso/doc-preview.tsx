'use client';

import type { DocField, MalsoDocument } from '@/demos/fa-recruit/lib/domain/malso/document';
import { cn } from '@/demos/fa-recruit/lib/utils/cn';

function Value({ field }: { field: DocField }) {
  return (
    <span className={cn(field.filled ? 'text-strong font-semibold' : 'text-muted')}>
      {field.text || ' '}
    </span>
  );
}

export function DocPreview({ doc, printRoot }: { doc: MalsoDocument; printRoot?: boolean }) {
  return (
    <div
      {...(printRoot ? { 'data-print-root': '' } : {})}
      className="bg-white px-5 py-7 sm:px-9 sm:py-10"
    >
      <h3 className="text-strong text-center text-[20px] font-extrabold tracking-[0.35em]">
        {doc.title}
      </h3>

      <table className="border-line mt-7 w-full border-collapse border text-[13px]">
        <tbody>
          {doc.senderRows.map((row, i) => (
            <tr key={row.label} className="border-line border-b">
              {i === 0 && (
                <td
                  rowSpan={doc.senderRows.length}
                  className="border-line bg-surface-alt text-strong w-[42px] border-r text-center align-middle text-[12px] leading-[1.4] font-bold"
                >
                  발<br />신<br />처
                </td>
              )}
              <td className="border-line bg-surface text-body w-[110px] border-r px-3 py-2.5 text-[12px] font-semibold whitespace-nowrap">
                {row.label}
              </td>
              <td className="px-3 py-2.5">
                <Value field={row.value} />
              </td>
            </tr>
          ))}
          <tr>
            <td
              colSpan={2}
              className="border-line bg-surface-alt text-strong border-r px-3 py-2.5 text-[12px] font-bold whitespace-nowrap"
            >
              {doc.reasonLabel}
            </td>
            <td className="px-3 py-2.5">
              <Value field={doc.reason} />
            </td>
          </tr>
        </tbody>
      </table>

      <p className="text-body mt-7 text-center text-[13.5px] leading-relaxed">{doc.body}</p>

      <p className="mt-9 text-center text-[13.5px]">
        <Value field={doc.date} />
      </p>

      <p className="text-strong mt-6 text-right text-[13.5px]">
        {doc.signLabel}
        <Value field={doc.signName} />
        <span className="text-muted ml-1">(서명)</span>
      </p>

      <div className="mt-9 flex gap-1 text-[12.5px]">
        <span className="text-body shrink-0 font-semibold whitespace-pre">
          {doc.recipientLabel}
        </span>
        <span className="min-w-0">
          {doc.recipients.map((r) => (
            <span key={r.no} className="block break-keep">
              {r.no}. <Value field={r.name} />
              <span className="text-body">{r.connector}</span>
              <Value field={r.address} />
              <span className="text-body">{r.suffix}</span>
            </span>
          ))}
        </span>
      </div>

      <div className="mt-2 flex gap-1 text-[12.5px]">
        <span className="text-body shrink-0 font-semibold whitespace-pre">
          {doc.referenceLabel}
        </span>
        <span className="text-strong">{doc.reference}</span>
      </div>
    </div>
  );
}
