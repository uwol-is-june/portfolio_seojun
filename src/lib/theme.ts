/** 테마 저장 키 */
export const THEME_STORAGE_KEY = "theme";

/**
 * 첫 화면이 그려지기 전에 저장된 테마를 <html data-theme>에 적습니다 (깜빡임 방지, layout.tsx <head>).
 * 저장된 값이 없으면 속성을 두지 않아 기기 설정(prefers-color-scheme)을 따릅니다.
 */
export const THEME_SCRIPT = `try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
