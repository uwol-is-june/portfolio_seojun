# 정보 구조(IA)와 라우트 설계 (TASK-10)

## 목표

- 방문자(채용 담당자, 현업 리더)가 **지원 포지션 → 그 포지션에 맞는 프로젝트 → 케이스 스터디** 순서로 3클릭 안에 핵심 근거에 도달하게 합니다.
- 한 프로젝트가 여러 포지션의 근거가 될 수 있으므로, 프로젝트는 포지션 아래가 아니라 `/projects/[slug]`에 한 번만 두고 포지션 페이지에서 골라서 보여줍니다.

## 사이트맵

```
/                          홈: 포지션 3개 메뉴(HoverImageReveal) + 짧은 소개 + CTA
├─ /product-manager        포지션 페이지 (공통 템플릿)
├─ /service-planner        포지션 페이지 (공통 템플릿)
├─ /ai-product-builder     포지션 페이지 (공통 템플릿)
├─ /projects/[slug]        프로젝트 상세(케이스 스터디)
├─ /about                  경력, 스킬, 이력서 PDF, 연락처
└─ /design-system          내부용 (noindex, 메뉴에 노출 안 함)
```

## 라우트

| 경로 | 파일 | 렌더링 | 데이터 | 태스크 |
| --- | --- | --- | --- | --- |
| `/` | `src/app/page.tsx` | 정적 | `positions`, `profile` | TASK-13 |
| `/product-manager` 등 3개 | `src/app/[position]/page.tsx` | 정적 (`generateStaticParams`, `dynamicParams = false`) | `getPosition()`, `getProjectsByPosition()` | TASK-14~17 |
| `/projects/[slug]` | `src/app/projects/[slug]/page.tsx` | 정적 (`generateStaticParams`, `dynamicParams = false`) | `getProject()`, `getAdjacentProjects()` | TASK-18 |
| `/about` | `src/app/about/page.tsx` | 정적 | `profile` | TASK-19 |
| `/design-system` | `src/app/design-system/page.tsx` | 정적, noindex | 토큰 | TASK-09 |
| 그 외 | `src/app/not-found.tsx` | 404 | - | TASK-10 |

- 포지션 3개는 같은 템플릿을 쓰므로 `[position]` 동적 세그먼트 하나로 처리합니다. `dynamicParams = false`라서 정의되지 않은 주소는 404가 됩니다. `/about`, `/design-system` 같은 정적 라우트가 동적 세그먼트보다 우선합니다.
- 포지션별로 강조점(TASK-15~17)이 다른 부분은 `positions` 데이터의 `emphasis`와 포지션 페이지 안의 전용 섹션으로 나눕니다.

## 내비게이션

- **헤더**: 로고(`/`) · Product Manager · Service Planner · AI Product Builder · About. 1024px 미만은 햄버거 메뉴.
- **푸터**: 이메일, 외부 링크(GitHub, LinkedIn, 이력서), 헤더와 같은 메뉴.
- **홈 → 포지션**: HoverImageReveal 항목 3개가 각 포지션 페이지로 연결.
- **포지션 → 프로젝트**: 대표 프로젝트 카드 목록.
- **프로젝트 상세**: 상단에 관련 포지션 태그(해당 포지션 페이지로 이동), 하단에 이전/다음 프로젝트.
- 헤더 메뉴 목록은 `positions` 데이터에서 만들어서 포지션이 바뀌면 자동으로 따라갑니다.

## 콘텐츠 흐름 (방문자 시나리오)

1. 채용 공고에서 링크로 들어온 PM 채용 담당자: `/` → Product Manager → 대표 프로젝트 1개 → 케이스 스터디의 성과 지표 → About에서 이력서 다운로드
2. 특정 포지션 링크를 직접 받은 경우: `/service-planner`로 바로 진입 → 프로젝트 → 이전/다음으로 다른 프로젝트 탐색

## 데이터 위치 (TASK-11)

```
src/content/
├─ types.ts           타입 정의
├─ site.ts            사이트 이름, 연락처, 내비게이션
├─ positions.ts       포지션 3개
├─ profile.ts         소개, 경력, 스킬, 이력서
└─ projects/
   ├─ index.ts        프로젝트 목록 (여기 배열 순서 = 노출 순서)
   └─ <slug>.ts       프로젝트 1개당 파일 1개
src/lib/content.ts    조회 함수 (getPosition, getProject, getProjectsByPosition ...)
```

## 메타데이터 (TASK-20에서 마무리)

| 경로 | title | description |
| --- | --- | --- |
| `/` | `SEOJUN — PM · Service Planner · AI Product Builder` | `profile.headline` |
| 포지션 | `{포지션명} | SEOJUN` | `position.tagline` |
| 프로젝트 | `{프로젝트명} | SEOJUN` | `project.summary` |
| `/about` | `About | SEOJUN` | `profile.headline` |
