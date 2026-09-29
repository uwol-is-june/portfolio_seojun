'use client';

import { Modal } from '@/demos/fa-recruit/components/ui/modal';

import { RichText } from './rich';

const SECTIONS: readonly { no: number; title: string; body: React.ReactNode }[] = [
  {
    no: 1,
    title: '이 도구는?',
    body: (
      <>
        <p>
          보험설계사가 <b>손해보험협회·생명보험협회</b>에 등록된 본인 코드를 <b>직접 말소</b>할 때,
          케이스 진단부터 서류 작성·발송, 신청 가능일 계산까지 한 곳에서 안내합니다.
        </p>
        <p>
          말소 경로는 둘 중 하나입니다 — 회사가 <b>해촉증명서</b>를 발급해 주면 그걸로 협회에 바로
          신청하고, 거부·지연하면 본인이 <b>내용증명(해촉신청서)</b>을 보내 진행합니다.
        </p>
        <p className="bg-surface text-muted rounded-[8px] px-3 py-2">
          위촉 사전 진단과는 <b>별개 화면</b>입니다. 여기서 계산한 날짜는 진단의 경력 구간 말소일에
          자동으로 들어가지 않습니다 — 값을 보고 직접 적으세요.
        </p>
      </>
    ),
  },
  {
    no: 2,
    title: '시작 전 꼭 알아둘 3가지',
    body: (
      <div className="space-y-2.5">
        <div className="border-line rounded-[10px] border px-3.5 py-3">
          <p className="text-brand-700 mb-1 text-[12px] font-extrabold">
            ① 해촉증명서 vs 해촉신청서
          </p>
          <p>
            <b>해촉증명서</b> = 회사가 발급. 대기 없이 즉시 말소 신청.
            <br />
            <b>해촉신청서</b> = 본인이 작성해 우체국 <b>내용증명</b>으로 발송.{' '}
            <b>발송일 포함 11일째</b>부터 신청.
          </p>
        </div>
        <div className="border-line rounded-[10px] border px-3.5 py-3">
          <p className="text-brand-700 mb-1 text-[12px] font-extrabold">② 전속 · 교차 · 대리점</p>
          <p>
            <b>전속</b> = 한 회사 소속. <b>교차</b> = 한 회사 소속이지만 손보·생보{' '}
            <b>양쪽에 코드</b>가 있어 <b>두 협회 모두</b> 말소해야 함. <b>대리점(GA)</b> = 대리점
            소속.
          </p>
        </div>
        <div className="border-warn/40 bg-warn-light rounded-[10px] border px-3.5 py-3">
          <p className="text-warn mb-1 text-[12px] font-extrabold">③ 11일째 · 지역본부 발송</p>
          <p>
            내용증명은 <b>발송일 포함 11일째(= 발송일 + 10일)</b>부터 신청 가능. 협회{' '}
            <b>본점은 말소 업무를 하지 않으니</b> 반드시 <b>관할 지역본부</b>로 발송하세요.
          </p>
        </div>
      </div>
    ),
  },
  {
    no: 3,
    title: '전체 흐름',
    body: (
      <p className="bg-brand-50 text-brand-700 rounded-[10px] px-3.5 py-3 text-center font-bold">
        ① 케이스 진단 → ② 내용증명 보내기 (작성·발송) → ③ 날짜 계산기 (신청 가능일) → ④ 협회 말소
        신청
      </p>
    ),
  },
  {
    no: 4,
    title: '탭별 사용법',
    body: (
      <div className="space-y-2.5">
        {[
          {
            icon: '🔍',
            name: '케이스 진단',

            desc: '질문에 답하면(증명서 발급 여부 → 소속 → 등록형태 → 협회 → 사유) **부수·수신처·절차**를 자동으로 진단합니다. 처음이거나 본인 케이스를 모를 때 먼저 쓰세요. 결과 아래 버튼을 누르면 **고른 사유까지 채워진 채로** 작성 화면으로 넘어갑니다.',
          },
          {
            icon: '✉️',
            name: '내용증명 보내기',
            desc: '등록 형태를 고르면 **해촉신청서**가 자동 작성됩니다. 성명·주소 등을 입력하고 부수·수신처를 확인한 뒤 **인쇄 또는 빈 양식**을 출력하세요. 출력 후 **자필서명**만 직접 하면 됩니다.',
          },
          {
            icon: '📅',
            name: '내용증명 날짜 계산기',
            desc: '**발송일**만 입력하면 협회 말소 **신청 가능일(발송일 포함 11일째, 주말·공휴일 자동 보정)**과 **유효기간(90일)**을 보여줍니다.',
          },
          {
            icon: '❓',
            name: 'FAQ',
            desc: '공통·해촉증명서·내용증명 관련 **자주 묻는 질문**을 모았습니다. 검색으로 바로 찾을 수 있습니다.',
          },
        ].map((t) => (
          <div key={t.name} className="flex gap-3">
            <span aria-hidden className="shrink-0 text-[16px]">
              {t.icon}
            </span>
            <div className="min-w-0">
              <p className="text-strong text-[12.5px] font-bold">{t.name}</p>
              <p className="text-body mt-0.5 text-[12px] leading-[1.7]">
                <RichText text={t.desc} />
              </p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    no: 5,
    title: '자주 막히는 부분 (말소 거부 사유 체크)',
    body: (
      <ul className="space-y-1.5">
        {[
          '**필수 기재 누락** — 성명 · 주민번호 13자리 · 자필서명 · 우체국 소인(원본)',
          '**수신처 주소 불일치** — 협회는 반드시 본인 **관할 지역본부** 주소로',
          '**유효기간 초과** — 내용증명 발송일로부터 **3개월(90일)** 이내 신청',
          '**11일 미경과** — 내용증명 경로는 발송일 포함 11일째부터 접수 가능',
        ].map((s, i) => (
          <li key={i} className="flex gap-2">
            <span aria-hidden className="text-danger mt-[1px] shrink-0 text-[11px]">
              ✗
            </span>
            <span>
              <RichText text={s} />
            </span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    no: 6,
    title: '참고',
    body: (
      <>
        <p className="text-muted">
          본 도구는 협회 양식·공식 안내 기준의 <b>참고용</b>입니다. 협회별 발송 주소(지역본부)와
          본인 코드 현황은 각 협회 홈페이지의 <b>모집종사자 이력·말소 조회</b>에서 직접 확인하세요.
        </p>
        <p className="text-muted">
          입력한 정보는 <b>저장되지 않습니다.</b> 이 브라우저 안에서만 처리되며 화면을 닫으면
          사라집니다.
        </p>
      </>
    ),
  },
];

export function ManualModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="📖 말소 셀프 가이드 · 사용 설명서"
      description="케이스 진단 · 서류 작성 · 날짜 계산까지 쓰는 법"
      className="max-w-[720px]"
    >
      <div className="flex justify-end print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="border-line text-body hover:bg-surface focus-visible:outline-brand-700 cursor-pointer rounded-[8px] border bg-white px-3 py-1.5 text-[11.5px] font-bold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          📄 인쇄 / PDF 저장
        </button>
      </div>

      <div data-print-root className="mt-3 space-y-6">
        {SECTIONS.map((s) => (
          <section key={s.no}>
            <h3 className="text-strong mb-2.5 flex items-center gap-2 text-[14px] font-extrabold">
              <span className="bg-brand-700 flex size-[20px] shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold text-white">
                {s.no}
              </span>
              {s.title}
            </h3>
            <div className="text-body space-y-2 pl-[28px] text-[12.5px] leading-[1.75]">
              {s.body}
            </div>
          </section>
        ))}
      </div>
    </Modal>
  );
}
