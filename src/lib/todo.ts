/** "[TODO]"가 들어간 값(아직 채우지 않은 콘텐츠)인지 확인합니다. */
export function isTodo(value: string | undefined) {
  return !value || value.includes("[TODO]");
}
