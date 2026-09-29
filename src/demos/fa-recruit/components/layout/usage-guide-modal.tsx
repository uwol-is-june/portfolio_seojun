'use client';

import type { ReactNode } from 'react';

import { Button } from '@/demos/fa-recruit/components/ui/button';
import { Modal } from '@/demos/fa-recruit/components/ui/modal';
import { cn } from '@/demos/fa-recruit/lib/utils/cn';

const TONE = {
  brand: 'bg-brand-50 text-brand-700',
  ok: 'bg-ok-light text-ok',
  warn: 'bg-warn-light text-warn',
  danger: 'bg-danger-light text-danger',
  pending: 'bg-pending-light text-pending',
  muted: 'bg-surface-alt text-body',
} as const;

type Tone = keyof typeof TONE;

function Pill({ tone = 'muted', children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={cn(
        'inline-block rounded-[7px] px-2 py-0.5 text-[11.5px] font-extrabold break-keep',
        TONE[tone],
      )}
    >
      {children}
    </span>
  );
}

function Branch({
  label,
  last = false,
  children,
}: {
  label: string;
  last?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="relative pt-1.5 pl-[70px]">
      <span
        aria-hidden
        className={cn('bg-line absolute top-0 left-[7px] w-px', last ? 'h-[19px]' : 'h-full')}
      />
      <span aria-hidden className="bg-line absolute top-[19px] left-[7px] h-px w-[14px]" />
      <span className="text-muted absolute top-[11px] left-[25px] text-[10.5px] font-bold break-keep">
        {label}
      </span>
      <div className="min-h-[17px]">{children}</div>
    </div>
  );
}

function Stop({ tone = 'muted', children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={cn(
        'rounded-[6px] px-1.5 py-1 text-center text-[10.5px] font-bold break-keep',
        TONE[tone],
      )}
    >
      {children}
    </span>
  );
}

function Seg({ children }: { children: ReactNode }) {
  return (
    <span className="flex min-w-[64px] flex-col items-center gap-0.5 px-1">
      <span className="text-muted text-[9.5px] leading-none font-bold break-keep">{children}</span>
      <span aria-hidden className="bg-line h-px w-full" />
    </span>
  );
}

function Scroller({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[420px]">{children}</div>
    </div>
  );
}

const MODES = [
  {
    icon: '🔍',
    title: '개인 진단',
    desc: '대상자 정보 없이 한 케이스를 즉시 확인. 상담 중에 쓰기 좋습니다.',
    note: '저장되지 않습니다',
  },
  {
    icon: '📋',
    title: '단체 진단',
    desc: '명단을 등록해 한 명씩 진단하고 결과를 모읍니다.',
    note: '저장 · 엑셀 일괄 등록 최대 50명',
  },
] as const;

const STEP_ROWS = [
  {
    badge: '⓪',
    tone: 'brand' as Tone,
    name: '사전 체크',
    input: '특수 조건 · 자가진단 2문항 · 선행 절차',
    output: '자격(설계사/유자격자) · 협회 이력 여부',
    tips: [
      '특수 조건을 먼저 고릅니다 — ① 의 입력 폼이 통째로 바뀝니다.',
      '보증보험·E-클린은 아직 안 했어도 진행됩니다 (결과에 경고만 남습니다).',
    ],
  },
  {
    badge: '①',
    tone: 'brand' as Tone,
    name: '경력 조회',
    input: '등록예정일 · 경력 구간 또는 시험·교육일',
    output: '유형(신인/경력신입/경력자) · 유효기간 만료일',
    tips: [
      '아직 말소 전이면 종료일에 **말소 예정일**을 넣으면 됩니다.',
      '경력 구간이 하나라도 덜 채워지면 유형 판정을 보류합니다.',
    ],
  },
  {
    badge: '②',
    tone: 'brand' as Tone,
    name: '자격 진단',
    input: 'R 재입사 · S 손보 · A 불가 · B 심사 카드에 응답',
    output: '최종 판정 4등급',
    tips: [
      '카드마다 `모두 해당없음` 으로 한 번에 채울 수 있습니다.',
      'R 카드의 **당사 등록 횟수 기본값은 `최초 등록`** — 재입사자면 반드시 바꾸세요.',
    ],
  },
  {
    badge: '✓',
    tone: 'ok' as Tone,
    name: '결과 화면',
    input: '— 단계가 아닙니다',
    output: '판정 · 요약 · 서류 체크리스트 · 내보내기',
    tips: ['위촉 불가여도 이 화면까지 옵니다 — 결과를 남길 수 있습니다.'],
  },
] as const;

const CRITERIA = [
  { role: '보험설계사', exam: '설계사 시험', window: '최근 3년', days: '365일 이상' },
  { role: '유자격자', exam: '대리점 시험', window: '최근 4년', days: '730일 이상' },
] as const;

const EDU_HOURS = [
  {
    kind: '경력자 등록교육 (보수교육)',
    target: '대리점 · 대리점 소속설계사 · 유자격자',
    all: '30H',
    life: '25H',
    nonLife: '25H',
  },
  { kind: '신규 등록교육', target: '설계사', all: '40H', life: '30H', nonLife: '30H' },
  {
    kind: '신규 등록교육',
    target: '보험대리점 (유자격자)',
    all: '70H',
    life: '45H',
    nonLife: '50H',
  },
] as const;

const EDU_NOTES = [
  { icon: '🚫', text: '경력자 등록교육과 신규 등록교육은 **상호 인정되지 않습니다.**' },
  { icon: '🚫', text: '**중개사 교육**은 수료해도 인정되지 않습니다.' },
  {
    icon: '⚠️',
    text: '외부교육은 **내부교육 수료까지 확인**되어야 인정됩니다 (모집종사협의회에서 확인) · 외부+내부 합산 **30시간**.',
  },
  {
    icon: '✅',
    text: '시험 구분과 교육 구분이 **달라도 됩니다** — 설계사 시험+대리점 교육 / 대리점 시험+사용인 교육 모두 가능.',
  },
] as const;

const GRADES = [
  { tone: 'ok' as Tone, icon: '✅', name: '적격', desc: '모든 위촉 기준 충족' },
  {
    tone: 'warn' as Tone,
    icon: '⚠️',
    name: '심사 대상',
    desc: 'B 항목 해당 → 승인 필요',
  },
  { tone: 'pending' as Tone, icon: '🔔', name: '조건부', desc: '소속이관·편입 등을 마치면 가능' },
  {
    tone: 'danger' as Tone,
    icon: '🛑',
    name: '위촉 불가',
    desc: 'A 항목 · 채무 기준 초과 · 재입사 제한(환수금 · 당사 3회차 등)',
  },
] as const;

const RESULT_STACK = [
  { name: '판정 배너', desc: '4등급 중 하나와 그 사유' },
  { name: '진단 요약', desc: '자격·유형·만료일·판정 확정 시각' },
  { name: '서류 · 필수이행', desc: '판정에서 자동으로 만들어지는 체크리스트' },
  { name: '내보내기', desc: '복사 2종 · 엑셀 · 이미지' },
  { name: '참고용 고지', desc: '보증보험·E-클린 최종 확인 안내' },
] as const;

const SHARE = [
  { icon: '📋', name: '간단 복사', desc: '핵심만 — 카톡·문자용' },
  { icon: '📄', name: '상세 복사', desc: '서류·필수이행까지 — 보고용' },
  { icon: '📊', name: '엑셀', desc: '4시트 .xlsx · 단체는 대상자별 탭' },
  { icon: '🖼️', name: '이미지', desc: 'PNG 한 장 요약' },
] as const;

const NOTES = [
  { icon: '✅', text: '단체 진단의 입력은 자동 저장되어 껐다 켜도 남습니다.' },
  { icon: '✅', text: '이전 단계로 돌아가 값을 바꾸면 그 뒤 결과는 다시 계산합니다.' },
  { icon: '✅', text: '①② 의 결과는 `미리 보기` 입니다 — 값을 바꾸면 결과도 바뀝니다.' },
  {
    icon: '⚠️',
    text: '본 결과는 사전 진단 참고용입니다. 보증보험·E-클린 조회 후 반드시 최종 확인하세요.',
  },
] as const;

const SECTION_TITLE =
  'text-brand-700 border-surface-alt mb-2.5 border-b pb-1 text-[12px] font-extrabold';
const BOX = 'bg-surface-alt rounded-[10px] px-3.5 py-3';
const CAPTION = 'text-muted mt-1.5 text-[10.5px] leading-relaxed break-keep';

function emphasize(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <b key={i} className="text-strong">
        {part}
      </b>
    ) : (
      part
    ),
  );
}

export function UsageGuideModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="위촉 사전 진단 시뮬레이터 사용법"
      description="INCAR FINANCIAL SERVICE"
      className="max-w-[680px]"
    >

      <div data-print-root className="px-5 py-4">

        <h1 className="text-brand-700 mb-4 hidden text-[16px] font-extrabold print:block">
          위촉 사전 진단 시뮬레이터 사용법
        </h1>

        <section className="mb-5">
          <h3 className={SECTION_TITLE}>두 가지 진단 모드</h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {MODES.map((mode) => (
              <div key={mode.title} className="border-line rounded-[10px] border px-3.5 py-3">
                <p className="text-brand-700 text-[12.5px] font-extrabold">
                  {mode.icon} {mode.title}
                </p>
                <p className="text-body mt-1 text-[11.5px] leading-relaxed break-keep">
                  {mode.desc}
                </p>
                <p className="text-muted mt-1.5 text-[10.5px] font-bold break-keep">{mode.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-5">
          <h3 className={SECTION_TITLE}>진단 3단계 + 결과 화면</h3>
          <div className="grid gap-1.5">
            {STEP_ROWS.map((step, i) => (
              <div key={step.name} className={cn(BOX, 'relative')}>

                {i < STEP_ROWS.length - 1 && (
                  <span
                    aria-hidden
                    className="bg-line absolute -bottom-1.5 left-[22px] h-1.5 w-px"
                  />
                )}
                <div className="flex items-start gap-2.5">
                  <span
                    className={cn(
                      'grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full text-[13px] font-extrabold',
                      TONE[step.tone],
                    )}
                  >
                    {step.badge}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-strong text-[12.5px] font-extrabold break-keep">
                      {step.name}
                    </p>
                    <dl className="mt-1.5 grid gap-1">
                      <div className="flex gap-1.5">
                        <dt className="text-muted w-[52px] shrink-0 text-[10.5px] font-bold">
                          넣는 것
                        </dt>
                        <dd className="text-body flex-1 text-[11px] leading-relaxed break-keep">
                          {step.input}
                        </dd>
                      </div>
                      <div className="flex gap-1.5">
                        <dt className="text-brand-700 w-[52px] shrink-0 text-[10.5px] font-bold">
                          나오는 것
                        </dt>
                        <dd className="text-strong flex-1 text-[11px] leading-relaxed font-bold break-keep">
                          {step.output}
                        </dd>
                      </div>
                    </dl>
                    <ul className="mt-1.5 grid gap-0.5">
                      {step.tips.map((tip) => (
                        <li
                          key={tip}
                          className="text-body text-[10.5px] leading-relaxed break-keep"
                        >
                          · {emphasize(tip)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className={CAPTION}>
            진단은 ② 에서 끝납니다. 서류·필수이행은 그 판정에서 자동으로 만들어지는 목록이라 결과
            화면 안에 있습니다.
          </p>
        </section>

        <section className="mb-5">
          <h3 className={SECTION_TITLE}>유형은 이렇게 갈립니다</h3>
          <div className={BOX}>
            <p className="text-strong text-[11.5px] font-extrabold break-keep">
              협회에 보험설계사로 등록한 이력이 있나요?
              <span className="text-muted ml-1 font-bold">⓪ 자가진단 Q2</span>
            </p>

            <Branch label="없음">
              <Pill tone="brand">신인</Pill>
              <span className="text-muted ml-1.5 text-[10.5px] break-keep">⓪ 에서 바로 확정</span>
            </Branch>

            <Branch label="있음" last>
              <p className="text-strong text-[11.5px] font-extrabold break-keep">
                ① 누적 경력일수로 판정
                <span className="text-muted ml-1 font-bold">아래 기준 표</span>
              </p>

              <Branch label="기준 이상">
                <Pill tone="brand">경력자</Pill>
              </Branch>

              <Branch label="기준 미만" last>
                <Pill tone="brand">경력신입</Pill>
                <p className="text-body mt-1 text-[10.5px] leading-relaxed break-keep">
                  단, <b className="text-strong">말소일 + 1년</b> 을 넘겨 등록하면{' '}
                  <Pill tone="brand">신인</Pill> 으로 자동 전환됩니다 (근거가 결과에 남습니다).
                </p>
              </Branch>
            </Branch>
          </div>
          <p className={CAPTION}>
            원본과 달리 유형을 담당자에게 묻지 않습니다 — ① 의 실제 경력 구간으로 계산합니다.
          </p>
        </section>

        <section className="mb-5">
          <h3 className={SECTION_TITLE}>경력 인정 기준</h3>
          <div className="border-line overflow-hidden rounded-[10px] border">
            <table className="w-full border-collapse text-[11px]">
              <thead>
                <tr className="bg-surface-alt">
                  {['자격', '시험', '조회 창', '필요 경력'].map((head) => (
                    <th
                      key={head}
                      className="text-muted px-2.5 py-1.5 text-left text-[10.5px] font-bold"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CRITERIA.map((row) => (
                  <tr key={row.role} className="border-line border-t">
                    <td className="text-strong px-2.5 py-2 font-extrabold break-keep">
                      {row.role}
                    </td>
                    <td className="text-body px-2.5 py-2 break-keep">{row.exam}</td>
                    <td className="text-body px-2.5 py-2 break-keep">{row.window}</td>
                    <td className="text-brand-700 px-2.5 py-2 font-extrabold break-keep">
                      {row.days}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={CAPTION}>
            각 경력 구간을 조회 창으로 잘라 더합니다. 창을 넘는 부분은 계산에 들어가지 않습니다.
          </p>
        </section>

        <section className="mb-5">
          <h3 className={SECTION_TITLE}>유효기간이 정해지는 방식</h3>

          <div className={cn(BOX, 'mb-1.5')}>
            <p className="text-strong mb-2 text-[11.5px] font-extrabold break-keep">
              신인 · 경력신입
            </p>
            <Scroller>
              <div className="flex items-center">
                <Stop>시험 합격일</Stop>
                <Seg>간격 1년 이내</Seg>
                <Stop>교육 이수일</Stop>
                <Seg>이른 날 + 1년</Seg>
                <Stop tone="ok">만료일</Stop>
              </div>
            </Scroller>

            <p className="text-body mt-2 text-[10.5px] leading-relaxed break-keep">
              두 날짜의 <b className="text-strong">간격</b>이 1년을 넘으면 그 자체로 불가입니다.
              간격이 1년 이내여도 <b className="text-strong">각 증서에 취득일부터 1년</b>이
              걸리므로, 둘 중 <b className="text-strong">먼저 끝나는 날</b>이 만료일입니다.
            </p>
          </div>

          <div className={BOX}>
            <p className="text-strong mb-2 text-[11.5px] font-extrabold break-keep">경력자</p>
            <Scroller>
              <div className="grid gap-1">
                <div className="flex items-center">
                  <Stop>보수교육 이수일</Stop>
                  <Seg>+ 1년</Seg>
                  <Stop>보수교육 만료일</Stop>
                </div>
                <div className="flex items-center">
                  <Stop>경력 구간</Stop>
                  <Seg>기준 미달 직전</Seg>
                  <Stop>경력 인정 마감일</Stop>
                </div>
              </div>
            </Scroller>
            <p className="text-body mt-2 text-[10.5px] leading-relaxed break-keep">
              둘 중 <b className="text-strong">이른 날</b>이 최종 만료일입니다.
            </p>
          </div>
        </section>

        <section className="mb-5">
          <h3 className={SECTION_TITLE}>협회 등록 교육 — 종류와 인정 범위</h3>
          <div className="border-line overflow-hidden rounded-[10px] border">
            <table className="w-full border-collapse text-[11px]">
              <thead>
                <tr className="bg-surface-alt">
                  {['교육', '대상', '생명+손해+제3', '생명+제3', '손해+제3'].map((head) => (
                    <th
                      key={head}
                      className="text-muted px-2.5 py-1.5 text-left text-[10.5px] font-bold break-keep"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EDU_HOURS.map((row) => (
                  <tr key={`${row.kind}-${row.target}`} className="border-line border-t">
                    <td className="text-strong px-2.5 py-2 font-extrabold break-keep">
                      {row.kind}
                    </td>
                    <td className="text-body px-2.5 py-2 break-keep">{row.target}</td>
                    {[row.all, row.life, row.nonLife].map((hours, i) => (
                      <td key={i} className="text-brand-700 px-2.5 py-2 font-extrabold">
                        {hours}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-1.5 grid gap-1">
            {EDU_NOTES.map((note) => (
              <p
                key={note.text}
                className="text-body flex gap-1.5 text-[10.5px] leading-relaxed break-keep"
              >
                <span aria-hidden>{note.icon}</span>
                <span>{emphasize(note.text)}</span>
              </p>
            ))}
          </div>
          <p className={CAPTION}>교육은 보험연수원(www.in.or.kr)에서 이수합니다.</p>
        </section>

        <section className="mb-5">
          <h3 className={SECTION_TITLE}>판정 4등급</h3>
          <div className="grid gap-1.5 sm:grid-cols-2">
            {GRADES.map((grade) => (
              <div key={grade.name} className={cn('rounded-[10px] px-3 py-2.5', TONE[grade.tone])}>
                <p className="text-[12px] font-extrabold break-keep">
                  {grade.icon} {grade.name}
                </p>
                <p className="mt-0.5 text-[10.5px] leading-relaxed break-keep opacity-90">
                  {grade.desc}
                </p>
              </div>
            ))}
          </div>
          <p className={CAPTION}>
            S 카드(손보 협회등록사)는 등급을 바꾸지 않고 안내 문구만 덧붙입니다.
          </p>
        </section>

        <section className="mb-5">
          <h3 className={SECTION_TITLE}>결과 화면은 위에서 아래로</h3>
          <div className={BOX}>
            <ol className="grid">
              {RESULT_STACK.map((row, i) => (
                <li key={row.name} className="relative flex gap-2.5 pb-2 last:pb-0">

                  {i < RESULT_STACK.length - 1 && (
                    <span
                      aria-hidden
                      className="bg-line absolute top-[18px] left-[9px] h-full w-px"
                    />
                  )}
                  <span
                    aria-hidden
                    className="bg-brand-50 text-brand-700 relative z-[1] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full text-[9.5px] font-extrabold"
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-strong text-[11.5px] leading-tight font-extrabold break-keep">
                      {row.name}
                    </p>
                    <p className="text-body mt-0.5 text-[10.5px] leading-relaxed break-keep">
                      {row.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <p className={CAPTION}>
            내보내기가 체크리스트 <b className="text-strong">뒤</b>에 있는 이유 — 상세
            복사·엑셀·이미지가 서류 체크 상태를 그대로 싣기 때문입니다. 체크를 먼저 하고 내보내세요.
          </p>
        </section>

        <section className="mb-5">
          <h3 className={SECTION_TITLE}>내보내기 4종</h3>
          <div className="grid gap-1.5 sm:grid-cols-2">
            {SHARE.map((item) => (
              <div key={item.name} className="border-line rounded-[10px] border px-3 py-2">
                <p className="text-strong text-[11.5px] font-extrabold break-keep">
                  {item.icon} {item.name}
                </p>
                <p className="text-muted mt-0.5 text-[10.5px] leading-relaxed break-keep">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <p className={CAPTION}>
            위촉 불가일 때는 서류 체크리스트 대신 <b className="text-strong">심사 보완 서류</b>{' '}
            안내만 나옵니다 — 사유를 해소한 뒤 심사에 필요한 목록입니다.
          </p>
        </section>

        <section>
          <h3 className={SECTION_TITLE}>알아두기</h3>
          <ul className="grid gap-1">
            {NOTES.map((note) => (
              <li
                key={note.text}
                className="text-body flex gap-1.5 text-[11px] leading-relaxed break-keep"
              >
                <span aria-hidden className="shrink-0">
                  {note.icon}
                </span>
                <span>{note.text}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="flex gap-2 px-5 pt-1 pb-5 print:hidden">
        <Button variant="outline" className="flex-1" onClick={() => window.print()}>
          🖨️ 인쇄 · PDF 저장
        </Button>
        <Button className="flex-1" onClick={onClose}>
          확인
        </Button>
      </div>
    </Modal>
  );
}
