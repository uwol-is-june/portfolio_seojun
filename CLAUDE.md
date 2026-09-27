@AGENTS.md

# Project

- 개인 포트폴리오 웹사이트입니다. 기술 스택은 Next.js(App Router), TypeScript, Tailwind CSS, Originkit 컴포넌트입니다.
- 지원 포지션: Product Manager, Service Planner, AI Product Builder. 포지션별 포트폴리오 페이지를 목업으로 구성하고, 이후 사용자가 내용을 채웁니다.
- 프로덕션 도메인: https://portfolio-seojun.vercel.app/ (Vercel, `main` 브랜치에 푸시하면 배포됩니다)
- Originkit 컴포넌트는 `npx originkit@latest add <name>`으로 추가하고, `src/components/originkit/` 안의 파일은 직접 수정하지 않습니다. 이미지는 `public/originkit/`에 둡니다.

# Tasks

- 태스크는 [docs/TASK.md](docs/TASK.md)에 기록합니다.
- 요청 범위가 크면 작업 순서에 맞게 여러 태스크로 나누고, 단계별 소제목(`### 1. ...`) 아래에 정리합니다.
- 사용자가 "OO 태스크 추가해줘"라고 하면 알맞은 단계 아래(맞는 단계가 없으면 목록 맨 아래)에 `[TASK-NN] 내용 (모델) @agent`를 추가합니다.
  - NN은 마지막 번호에 1을 더한 값이며 두 자리로 씁니다.
  - 모델은 난이도에 맞게 직접 판단해서 `(O)`, `(S)`, `(H)` 중 하나를 고릅니다.
  - `.claude/agents/`에 맞는 에이전트가 있으면 직접 판단해서 붙이고, 없으면 생략합니다.
