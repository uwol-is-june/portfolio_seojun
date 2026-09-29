/**
 * 구분점(·)과 '상위 %'의 % 앞 띄어쓰기를 줄바꿈 없는 공백으로 바꿔, 줄이 '·'나 '%'로 시작하지 않게 합니다.
 * 콘텐츠 객체 전체를 돌며 문자열만 바꾸고, 함수 · 숫자 등은 그대로 둡니다.
 */
export function keepDots<T>(value: T): T {
  if (typeof value === "string") return value.replace(/ ·(?= )/g, "\u00a0·").replace(/ %/g, "\u00a0%") as T;
  if (Array.isArray(value)) return value.map(keepDots) as T;
  if (value && typeof value === "object" && Object.getPrototypeOf(value) === Object.prototype) {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, keepDots(v)])) as T;
  }
  return value;
}
