import { Fragment } from "react";

/**
 * 쉼표로 나뉜 구절을 한 덩어리(inline-block)로 묶어, 줄이 넘칠 때만 쉼표 뒤에서 바뀌게 합니다.
 * 한 줄에 다 들어가면 그대로 한 줄이고, 구절 하나가 줄보다 길면 그 안에서만 줄을 바꿉니다.
 * 숫자 속 쉼표(1,595,000)는 뒤에 띄어쓰기가 없어 나누지 않습니다.
 */
export default function Clauses({ text }: { text: string }) {
  const parts = text.split(/(?<=,)\s+/);
  if (parts.length === 1) return text;
  return parts.map((part, i) => (
    <Fragment key={i}>
      {i > 0 && " "}
      <span className="inline-block">{part}</span>
    </Fragment>
  ));
}
