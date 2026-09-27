# TASK

## 작성 규칙

```
[TASK-01] 태스크 내용 (O) @agent-name
```

- 번호: `TASK-01`부터 순서대로 증가합니다.
- 모델: 줄 끝 괄호 안에 적습니다.
  - `(O)` Opus: 설계, 복잡한 구현, 까다로운 디버깅
  - `(S)` Sonnet: 일반적인 구현, 콘텐츠 작성
  - `(H)` Haiku: 단순 수정, 빠른 확인
- 에이전트: 필요한 경우 모델 뒤에 `@agent-name`을 붙입니다. 여러 개면 `@a @b`처럼 적습니다. 에이전트 목록은 `.claude/agents/`에 있습니다.
  - `@ui-builder`: 섹션, 컴포넌트, 레이아웃, 애니메이션 구현
  - `@content-writer`: 소개글, 프로젝트 설명 등 포트폴리오 카피
  - `@seo-performance`: 메타데이터, OG 이미지, 성능, 배포 관련 설정
  - `@qa-reviewer`: 빌드와 린트, 반응형, 접근성, 배포 사이트 점검

## 태스크

### 1. 모바일 반응형

[TASK-01] 현재 홈(HoverImageReveal)을 375 / 768 / 1440px에서 점검하고, 문제점(글자 넘침, 이미지 크기, 터치 기기에서 hover 없음)을 목록으로 정리 (S) @qa-reviewer
[TASK-02] 전역 반응형 기반 세팅: viewport, 가로 스크롤 방지, safe-area, 기본 breakpoint 정리 (H) @ui-builder
[TASK-03] HoverImageReveal 모바일 대응: 화면 크기별 폰트, 간격, 이미지 크기를 props로 조절하고, 터치 기기에서는 탭으로 이미지가 나오도록 처리 (Originkit 원본 파일은 수정하지 않음) (O) @ui-builder

### 2. 디자인 시스템 (현재 페이지 기반)

[TASK-04] 현재 페이지에서 디자인 토큰 추출 후 `globals.css`의 `@theme`에 정의: 색상(배경, 텍스트, dim), 타이포 스케일, 간격, radius, 모바일 우선 breakpoint (O) @ui-builder
[TASK-05] 폰트 세팅: `next/font`로 영문 Inter와 한글 Pretendard 적용 (S) @ui-builder
[TASK-06] 모션 프리셋 정리: 공통 spring 값, hover/reveal 패턴, `prefers-reduced-motion` 대응 (S) @ui-builder
[TASK-07] 기본 UI 컴포넌트: Container, Section, Heading, Text, Button/Link, Tag, Divider (S) @ui-builder
[TASK-08] 공통 레이아웃: 헤더 네비게이션(모바일 햄버거 메뉴 포함)과 푸터(연락처, 링크) (S) @ui-builder
[TASK-09] `/design-system` 페이지: 토큰과 컴포넌트를 한눈에 확인하는 내부용 페이지 (검색엔진 노출 제외) (S) @ui-builder

### 3. 사이트 구조와 목업 데이터

[TASK-10] 정보 구조(IA)와 라우트 설계: `/`, `/product-manager`, `/service-planner`, `/ai-product-builder`, `/projects/[slug]`, `/about` (O)
[TASK-11] 포트폴리오 데이터 모델 정의: 프로젝트 타입(포지션, 역할, 기간, 문제, 과정, 성과, 이미지)과 `src/content/` 구조 (S) @ui-builder
[TASK-12] 목업 콘텐츠 작성: 포지션별 프로젝트 2~3개와 소개글. 모르는 내용은 `[TODO]`로 표시 (S) @content-writer

### 4. 페이지 목업

[TASK-13] 홈 재구성: HoverImageReveal을 세 포지션(PM / Service Planner / AI Product Builder) 메뉴로 사용하고, 짧은 소개와 CTA 배치 (S) @ui-builder @content-writer
[TASK-14] 포지션 페이지 공통 템플릿: 포지션 소개, 핵심 역량, 대표 프로젝트 목록, CTA (O) @ui-builder
[TASK-15] Product Manager 페이지 목업: 문제 정의, 지표, 로드맵, 우선순위 결정 과정 강조 (S) @ui-builder @content-writer
[TASK-16] Service Planner 페이지 목업: 유저 플로우, IA, 와이어프레임, 정책 설계 강조 (S) @ui-builder @content-writer
[TASK-17] AI Product Builder 페이지 목업: 직접 만든 프로토타입과 데모, 사용 기술, AI 활용 방식 강조 (S) @ui-builder @content-writer
[TASK-18] 프로젝트 상세(케이스 스터디) 템플릿 `/projects/[slug]`: 개요, 문제, 과정, 결과, 회고, 이전/다음 프로젝트 이동 (O) @ui-builder
[TASK-19] About 페이지: 경력 타임라인, 스킬, 이력서 PDF 다운로드, 연락처 (S) @ui-builder @content-writer

### 5. 마무리와 배포

[TASK-20] 메타데이터 세팅: 페이지별 title/description, OG 이미지, sitemap, robots (S) @seo-performance
[TASK-21] 전체 QA: 모든 페이지의 반응형, 접근성, 링크, 빌드와 린트 점검 (S) @qa-reviewer
[TASK-22] 배포 후 https://portfolio-seojun.vercel.app/ 에서 실제 화면과 공유 미리보기 확인 (H) @qa-reviewer

