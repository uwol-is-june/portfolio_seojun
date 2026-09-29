export function formatWon(amount: number): string {
  if (amount >= 100000000) {
    return `${(amount / 100000000).toFixed(0)}억원`;
  }
  if (amount >= 10000) {
    return `${(amount / 10000).toFixed(0)}만원`;
  }
  return `${amount.toLocaleString("ko-KR")}원`;
}

export function formatPremium(amount: number): string {
  return `${amount.toLocaleString("ko-KR")}원`;
}

function todayDateString(): string {
  // UTC+9 보정: 서버가 UTC로 설정된 경우에도 한국 날짜 기준으로 비교
  const d = new Date(Date.now() + 9 * 60 * 60 * 1000);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${y}${m}${dd}`;
}

export function isActiveContractStatus(status: string | undefined): boolean {
  if (!status) return true;
  const inactive = ["만기", "해지", "실효", "소멸", "무효"];
  return !inactive.some((kw) => status.includes(kw));
}

export function isActiveExpiryDate(expiryDate: string): boolean {
  if (!expiryDate) return true;
  // 숫자만 추출 (CODEF가 "2023-01-01" 포맷으로 반환하는 경우 대응)
  const digits = expiryDate.replace(/[^0-9]/g, "");
  if (digits.length < 8) return true;
  // "00000000" = 만기 없음(영구 계약)으로 간주
  if (/^0+$/.test(digits)) return true;
  return digits.slice(0, 8) >= todayDateString();
}
