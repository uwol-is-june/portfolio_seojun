import type { RichBlock } from '../malso/rich-text';
import { EXTERNAL_URLS } from './external-links';

export type FaqItem = {

  id: string;
  q: string;
  a: readonly RichBlock[];
};

export type FaqGroup = {
  id: 'common' | 'proof' | 'doc';
  title: string;
  items: readonly FaqItem[];
};

const COMMON: readonly FaqItem[] = [
  {
    id: 'proof-first',
    q: "대외비",
    a: [
      { kind: 'text', text: "대외비 대외비" },
      {
        kind: 'list',
        items: [
          "대외비 대외비 대외비 대외비 대외비",
          "대외비 대외비 대외비 대외비 대외비",
        ],
      },
    ],
  },
  {
    id: 'proof-vs-application',
    q: "대외비 대외비",
    a: [
      {
        kind: 'table',
        head: ['', '해촉신청서 (내용증명)', '해촉증명서'],
        rows: [
          ["대외비", "대외비", "대외비"],
          ["대외비", "대외비", "대외비"],
          ["대외비", "대외비", "대외비"],
          ["대외비", "대외비", "대외비"],
        ],
      },
      { kind: 'lead', label: '요약', text: "대외비" },
    ],
  },
  {
    id: 'gyo-one-side',
    q: "대외비 대외비",
    a: [
      {
        kind: 'text',
        text: "대외비 대외비 대외비 대외비 대외비",
      },
    ],
  },
  {
    id: 'confirm-done',
    q: "대외비",
    a: [
      {
        kind: 'text',
        text: "대외비 대외비 대외비 대외비 대외비",
      },
      {
        kind: 'list',
        items: [
          "대외비 대외비 대외비",
          "대외비 대외비 대외비",
        ],
      },
    ],
  },
  {
    id: 'how-long',
    q: "대외비",
    a: [
      {
        kind: 'text',
        text: "대외비 대외비 대외비 대외비 대외비",
      },
    ],
  },
  {
    id: 'rejected',
    q: "대외비",
    a: [
      {
        kind: 'text',
        text: "대외비 대외비 대외비 대외비 대외비",
      },
    ],
  },
  {
    id: 'rrn-full',
    q: "대외비 대외비",
    a: [
      {
        kind: 'text',
        text: "대외비 대외비 대외비 대외비 대외비",
      },
    ],
  },
];

const PROOF: readonly FaqItem[] = [
  {
    id: 'proof-valid',
    q: "대외비",
    a: [
      {
        kind: 'text',
        text: "대외비 대외비 대외비 대외비 대외비",
      },
    ],
  },
  {
    id: 'proof-required-fields',
    q: "대외비",
    a: [
      {
        kind: 'text',
        text: "대외비 대외비 대외비 대외비 대외비",
      },
    ],
  },
  {
    id: 'proof-copy-ok',
    q: "대외비",
    a: [
      { kind: 'text', text: "대외비 대외비 대외비" },
      {
        kind: 'text',
        text: "대외비 대외비 대외비 대외비 대외비",
      },
    ],
  },
];

const DOC: readonly FaqItem[] = [
  {
    id: 'count-11days',
    q: "대외비",
    a: [
      {
        kind: 'text',
        text: "대외비 대외비 대외비 대외비 대외비",
      },
    ],
  },
  {
    id: 'why-many-copies',
    q: "대외비",
    a: [
      {
        kind: 'text',

        text: "대외비 대외비 대외비 대외비 대외비",
      },
      {
        kind: 'note',
        text: "대외비 대외비 대외비 대외비 대외비",
      },
    ],
  },
  {
    id: 'how-to-send',
    q: "대외비 대외비",
    a: [
      {
        kind: 'text',
        text: "대외비 대외비 대외비 대외비 대외비",
      },
    ],
  },
  {
    id: 'registry-number',
    q: "대외비",
    a: [
      {
        kind: 'text',
        text: "대외비 대외비 대외비 대외비 대외비",
      },
    ],
  },
  {
    id: 'ordinary-mail',
    q: "대외비",
    a: [
      {
        kind: 'text',
        text: "대외비 대외비 대외비 대외비 대외비",
      },
    ],
  },
  {
    id: 'son-mail-ending',
    q: "대외비 대외비",
    a: [
      {
        kind: 'text',
        text: "대외비 대외비 대외비 대외비 대외비",
      },
    ],
  },
  {
    id: 'self-send-ok',
    q: "대외비 대외비",
    a: [
      {
        kind: 'text',
        text: "대외비 대외비 대외비 대외비 대외비",
      },
    ],
  },
  {
    id: 'proof-after-send',
    q: "대외비 대외비",
    a: [
      {
        kind: 'text',
        text: "대외비 대외비 대외비 대외비 대외비",
      },
    ],
  },
];

export const FAQ_GROUPS: readonly FaqGroup[] = [
  { id: 'common', title: '공통', items: COMMON },
  { id: 'proof', title: '해촉증명서로 말소', items: PROOF },
  { id: 'doc', title: '내용증명으로 말소', items: DOC },
];

export const FAQ_SEARCH_PLACEHOLDER = '검색  예) 해촉증명서, 11일, 부수, 일반등기';

export const FAQ_NO_RESULT_PREFIX = '에 대한 결과가 없습니다.';
export const FAQ_FOOTNOTE =
  '우체국 발송 방법, 협회 조회·발송 주소 등 세부 절차는 정책에 따라 달라질 수 있으니 우체국·협회에 최신 내용을 확인하세요.';
