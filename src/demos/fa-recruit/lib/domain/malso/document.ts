import { MALSO_CASES, type MalsoCase, type MalsoCaseId } from './case';

export type MalsoFormValues = {
  name: string;

  rrn: string;
  tel: string;
  addr: string;
  reason: string;

  date: string;

  company: string;

  recvAddr: string;

  sonAssocAddr: string;

  lifeAssocAddr: string;
};

export function createEmptyFormValues(): MalsoFormValues {
  return {
    name: '',
    rrn: '',
    tel: '',
    addr: '',
    reason: '',
    date: '',
    company: '',
    recvAddr: '',
    sonAssocAddr: '',
    lifeAssocAddr: '',
  };
}

export type DocField = {

  text: string;
  filled: boolean;
};

function field(value: string, placeholder: string): DocField {
  const v = value.trim();
  return v ? { text: v, filled: true } : { text: placeholder, filled: false };
}

function fixed(text: string): DocField {
  return { text, filled: true };
}

export type DocRecipient = {
  no: number;

  name: DocField;

  connector: string;
  address: DocField;

  suffix: string;
};

export type MalsoDocument = {
  title: string;

  senderRows: readonly { label: string; value: DocField }[];
  reasonLabel: string;
  reason: DocField;
  body: string;
  date: DocField;
  signLabel: string;
  signName: DocField;
  recipientLabel: string;
  recipients: readonly DocRecipient[];
  referenceLabel: string;
  reference: string;
};

export const DOC_TITLE = '해 촉 신 청 서';
export const DOC_BODY = '상기 사유로 귀사에 해촉을 요청하오니 협조해주시기를 바랍니다.';
export const DOC_REFERENCE = '보험설계사 위·해촉 업무 담당자';
export const DOC_BLANK_DATE = '20    년    월    일';

export function companyPlaceholder(c: MalsoCase): string {
  if (c.org === 'agency') return '(대리점명)';
  if (c.both) return '○○생명보험 (전속 소속사)';
  return c.assoc === 'son' ? '○○손해보험' : '○○생명보험';
}

const ADDRESS_PLACEHOLDER = '(본사 주소)';
const ASSOC_ADDRESS_PLACEHOLDER = '(위 입력란에서 입력)';

function buildRecipients(c: MalsoCase, v: MalsoFormValues): DocRecipient[] {
  const companyPh = companyPlaceholder(c);
  const out: DocRecipient[] = [
    {
      no: 1,
      name: field(v.company, companyPh),
      connector: ' 본사 : ',
      address: field(v.recvAddr, ADDRESS_PLACEHOLDER),
      suffix: ' 대표이사 앞',
    },
  ];
  const hasSon = c.assoc === 'son' || c.both;
  const hasLife = c.assoc === 'life' || c.both;
  if (hasSon) {
    out.push({
      no: out.length + 1,
      name: fixed('손해보험협회'),
      connector: ' : ',
      address: field(v.sonAssocAddr, ASSOC_ADDRESS_PLACEHOLDER),
      suffix: ' / 말소담당자 앞',
    });
  }
  if (hasLife) {
    out.push({
      no: out.length + 1,
      name: fixed('생명보험협회'),
      connector: ' : ',
      address: field(v.lifeAssocAddr, ASSOC_ADDRESS_PLACEHOLDER),
      suffix: ' / 말소담당자 앞',
    });
  }
  return out;
}

export function buildDocument(caseId: MalsoCaseId, v: MalsoFormValues): MalsoDocument {
  const c = MALSO_CASES[caseId];
  return {
    title: DOC_TITLE,
    senderRows: [
      { label: '소속회사', value: field(v.company, companyPlaceholder(c)) },
      { label: '신청인 성명', value: field(v.name, '김인카') },
      { label: '주민등록번호', value: field(v.rrn, '000000-0000000') },
      { label: '전화번호', value: field(v.tel, '010-0000-0000') },
      { label: '주 소', value: field(v.addr, '(신청인 주소)') },
    ],
    reasonLabel: '신청 사유',
    reason: field(v.reason, '개인 사정'),
    body: DOC_BODY,
    date: field(v.date, DOC_BLANK_DATE),
    signLabel: '신청인 : ',
    signName: field(v.name, '김인카'),
    recipientLabel: '수 신 처 : ',
    recipients: buildRecipients(c, v),
    referenceLabel: '참    조 : ',
    reference: DOC_REFERENCE,
  };
}

export const BLANK_UNDERLINE = '________________________________';

export function buildBlankDocument(caseId: MalsoCaseId): MalsoDocument {
  const doc = buildDocument(caseId, createEmptyFormValues());
  const blank: DocField = { text: '', filled: false };
  return {
    ...doc,
    senderRows: doc.senderRows.map((r) => ({ ...r, value: blank })),
    reason: blank,
    date: { text: DOC_BLANK_DATE, filled: false },
    signName: blank,
    recipients: doc.recipients.map((r) => ({
      ...r,

      name: r.name.text.endsWith('협회') ? r.name : blank,
      address: { text: BLANK_UNDERLINE, filled: false },
    })),
  };
}

function recipientLine(r: DocRecipient): string {
  return `${r.no}. ${r.name.text}${r.connector}${r.address.text}${r.suffix}`;
}

export function documentToText(doc: MalsoDocument): string {
  const lines: string[] = [doc.title, ''];
  for (const row of doc.senderRows) lines.push(`${row.label} : ${row.value.text}`);
  lines.push(`${doc.reasonLabel} : ${doc.reason.text}`, '', doc.body, '', doc.date.text, '');
  lines.push(`${doc.signLabel}${doc.signName.text} (서명)`, '');
  lines.push(doc.recipientLabel.trim());
  for (const r of doc.recipients) lines.push(`  ${recipientLine(r)}`);
  lines.push(`${doc.referenceLabel.trim()} ${doc.reference}`);
  return lines.join('\n');
}

export const PRIVACY_NOTE =
  '🔒 입력값은 서버로 전송되지 않고 이 브라우저 안에서만 처리됩니다. 저장되지 않으므로 화면을 닫으면 사라집니다. 출력한 뒤 **자필서명만** 직접 하면 됩니다.';

export const SIGN_NOTE =
  '**출력 후 직접 할 것** — **자필서명**만 본인이 직접 하면 됩니다. (성명·작성일은 위에서 입력하면 자동 표시) 발송 시 우체국 내용증명 소인(원본)을 보관하세요.';

export const ASSOC_ADDRESS_HINT = '아래 링크에서 관할 지역본부 주소를 확인하고 입력하세요';

export function formatRrn(raw: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 13);
  return d.length > 6 ? `${d.slice(0, 6)}-${d.slice(6)}` : d;
}

export function isRrnComplete(raw: string): boolean {
  return raw.replace(/\D/g, '').length === 13;
}

export function formatTel(raw: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 11);
  if (d.startsWith('02')) {
    if (d.length < 3) return d;
    if (d.length < 6) return `${d.slice(0, 2)}-${d.slice(2)}`;
    if (d.length < 10) return `${d.slice(0, 2)}-${d.slice(2, 5)}-${d.slice(5)}`;
    return `${d.slice(0, 2)}-${d.slice(2, 6)}-${d.slice(6, 10)}`;
  }
  if (d.length < 4) return d;
  if (d.length < 8) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7, 11)}`;
}
