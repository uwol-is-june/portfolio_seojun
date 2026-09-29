'use client';

import { isRecordInverted, type CareerRecord } from '@/demos/fa-recruit/lib/domain/career';
import { parseDate, startOfToday } from '@/demos/fa-recruit/lib/utils/date';
import { Button } from '@/demos/fa-recruit/components/ui/button';
import { DateField } from '@/demos/fa-recruit/components/ui/date-field';

type CareerRecordListProps = {
  records: CareerRecord[];
  onChange: (next: CareerRecord[]) => void;

  itemLabel?: string;
  startLabel?: string;
  endLabel?: string;
  addLabel?: string;

  showPendingHint?: boolean;
};

const PENDING_INPUT_HINT =
  '아직 말소하지 않았다면 말소 예정일을 적으세요 — 예정일로도 진단이 진행됩니다.';

export function CareerRecordList({
  records,
  onChange,
  itemLabel,
  startLabel = '위촉일',
  endLabel = '말소일',
  addLabel = '+ 회사 경력 추가',
  showPendingHint = false,
}: CareerRecordListProps) {

  const add = () =>
    onChange([...records, { id: `${Date.now()}-${records.length}`, start: '', end: '' }]);

  const remove = (id: string) => onChange(records.filter((r) => r.id !== id));

  const update = (id: string, key: 'start' | 'end', value: string) =>
    onChange(records.map((r) => (r.id === id ? { ...r, [key]: value } : r)));

  const today = startOfToday();

  return (
    <div>
      {showPendingHint && records.length > 0 && (
        <p className="text-muted mb-2 text-[10.5px] leading-snug break-keep">
          {PENDING_INPUT_HINT}
        </p>
      )}

      {records.map((r, i) => {

        const end = parseDate(r.end);

        const inverted = isRecordInverted(r);

        const pending = !inverted && showPendingHint && end !== null && end > today;
        const rowEndLabel = pending ? `${endLabel}(예정)` : endLabel;

        return (
          <div
            key={r.id}
            className="animate-rise border-line relative mb-2 rounded-[12px] border p-3"
          >
            <button
              type="button"
              aria-label={`${i + 1}번째 경력 삭제`}
              onClick={() => remove(r.id)}
              className="text-muted hover:text-danger focus-visible:outline-danger absolute top-2 right-2 cursor-pointer rounded px-1.5 text-[15px] leading-none focus-visible:outline-2"
            >
              ×
            </button>
            <p className="text-muted mb-1.5 text-[11px] font-semibold">
              {itemLabel ?? `경력 ${i + 1}`}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <DateField
                value={r.start}
                onChange={(v) => update(r.id, 'start', v)}
                placeholder={startLabel}
                aria-label={`${i + 1}번째 경력 ${startLabel}`}
              />
              <DateField
                value={r.end}
                onChange={(v) => update(r.id, 'end', v)}
                placeholder={rowEndLabel}
                aria-label={`${i + 1}번째 경력 ${rowEndLabel}`}
              />
            </div>

            {inverted && (
              <p className="text-danger mt-2 text-[10.5px] leading-snug font-semibold break-keep">
                {startLabel}이 {endLabel}보다 뒤입니다 — 두 날짜를 확인해주세요. 이대로는 경력이
                0일로 계산됩니다.
              </p>
            )}

            {pending && (
              <p className="text-warn mt-2 text-[10.5px] leading-snug font-semibold break-keep">
                말소 예정일이 아직 지나지 않았습니다. 실제 위촉 서류 접수는 협회 말소가 완료된 뒤에
                가능합니다.
              </p>
            )}
          </div>
        );
      })}

      <Button variant="ghost" size="lg" onClick={add} className="border-line border">
        {addLabel}
      </Button>
    </div>
  );
}
