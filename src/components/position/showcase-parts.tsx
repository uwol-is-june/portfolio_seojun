import Reveal from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

/** 강조 섹션 안의 소제목 + 설명 + 본문 블록 */
export function ShowcaseBlock({
  title,
  caption,
  className,
  children,
}: {
  title: string;
  caption?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal className={cn("flex flex-col gap-5", className)}>
      <div className="flex flex-col gap-1">
        <h3 className="text-h3 font-semibold text-fg">{title}</h3>
        {caption && <p className="text-small text-subtle">{caption}</p>}
      </div>
      {children}
    </Reveal>
  );
}

/** 모바일에서는 가로 스크롤되는 표 */
export function DataTable({
  columns,
  rows,
  highlightLast = false,
}: {
  columns: string[];
  rows: string[][];
  /** 마지막 열을 태그처럼 강조 */
  highlightLast?: boolean;
}) {
  return (
    <div className="-mx-gutter overflow-x-auto px-gutter md:mx-0 md:px-0">
      <table className="w-full min-w-[36rem] border-collapse text-left text-small">
        <thead>
          <tr className="border-b border-line-strong">
            {columns.map((c) => (
              <th key={c} scope="col" className="py-3 pr-4 font-medium text-subtle">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-b border-line">
              {row.map((cell, i) => {
                const last = highlightLast && i === row.length - 1;
                return i === 0 ? (
                  <th key={i} scope="row" className="py-3 pr-4 font-medium text-fg">
                    {cell}
                  </th>
                ) : (
                  <td key={i} className="py-3 pr-4 text-muted">
                    {last ? (
                      <span className="rounded-pill bg-surface-raised px-2.5 py-1 text-caption text-fg">{cell}</span>
                    ) : (
                      cell
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
