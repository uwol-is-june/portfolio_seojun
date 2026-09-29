import { getDictionary } from "./ui";
import { getLocale } from "./request";

/** 서버 컴포넌트에서 현재 언어의 UI 문구 */
export function getT() {
  return getDictionary(getLocale());
}
