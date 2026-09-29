export type RichSegment =
  | { kind: 'text'; text: string }
  | { kind: 'bold'; text: string }
  | { kind: 'link'; text: string; url: string };

const PATTERN = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;

export function parseRich(source: string): RichSegment[] {
  const out: RichSegment[] = [];
  let last = 0;
  for (const m of source.matchAll(PATTERN)) {
    const at = m.index;
    if (at > last) out.push({ kind: 'text', text: source.slice(last, at) });
    if (m[1] !== undefined) out.push({ kind: 'bold', text: m[1] });
    else out.push({ kind: 'link', text: m[2], url: m[3] });
    last = at + m[0].length;
  }
  if (last < source.length) out.push({ kind: 'text', text: source.slice(last) });
  return out;
}

export function plainText(source: string): string {
  return parseRich(source)
    .map((s) => s.text)
    .join('');
}

export type RichBlock =
  | { kind: 'text'; text: string }

  | { kind: 'lead'; label: string; text: string }
  | { kind: 'list'; items: readonly string[] }

  | { kind: 'note'; text: string }
  | { kind: 'table'; head: readonly string[]; rows: readonly (readonly string[])[] };

export function blocksPlainText(blocks: readonly RichBlock[]): string {
  return blocks
    .map((b) => {
      switch (b.kind) {
        case 'text':
        case 'note':
          return plainText(b.text);
        case 'lead':
          return `${plainText(b.label)} ${plainText(b.text)}`;
        case 'list':
          return b.items.map(plainText).join(' ');
        case 'table':
          return [...b.head, ...b.rows.flat()].map(plainText).join(' ');
      }
    })
    .join(' ');
}
