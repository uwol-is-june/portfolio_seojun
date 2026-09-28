# 서학개미클럽 대시보드 · 공개 데모 데이터

포트폴리오의 `/demo/seohak`에서 여는 서학개미클럽 대시보드 데모입니다.
원본은 로컬 전용이라, 코드와 보고서를 스냅샷으로 복사해 이 포트폴리오 앱 안에 붙였습니다.
포트폴리오용이라 보고서는 복사 시점 기준입니다.

- 원본: https://github.com/uwol-is-june/seohak-gaemi-club (`dashboard/` · `reports/` · `data/`)
- 복사한 커밋: `5464c25` (2026-09-23) · 복사한 날: 2026-09-28

## 파일 위치

| 무엇 | 위치 |
| --- | --- |
| 보고서 · 콜 원장 · 설정 데이터 | `demos/seohak/reports/`, `demos/seohak/data/` |
| 화면 (자체 루트 레이아웃 · 스타일) | `src/app/(seohak)/demo/seohak/` |
| API | `src/app/api/seohak/*` |
| 컴포넌트 · 로직 | `src/demos/seohak/` |

## 원본과 다른 점 (`src/demos/seohak/lib/demo.ts`의 `DEMO_MODE`)

- 로그인 없이 열람. 로그인 화면 · 로그인 API는 가져오지 않음
- 토스증권 잔고는 항상 목 데이터 (`api/seohak/holdings`)
- 보고서 삭제 · 섹터 그룹 저장 같은 쓰기 API는 403
- 보고서 작성 시각은 원본 `git log`에서 뽑아 둔 `data/report-dates.json`을 읽음
- API 주소를 `/api/*` → `/api/seohak/*`로, 데이터 루트를 `demos/seohak/`로 옮김
- '로그아웃' 버튼 자리는 '포트폴리오로' 버튼, 오른쪽 아래 '공개 데모' 표시

토스 키 · `.env.local` 같은 비밀값은 복사하지 않았고, 이 데모에는 필요 없습니다.
보고서를 새로 받으려면 원본 `reports/` · `data/`를 이 폴더에 다시 복사하고 `report-dates.json`을 다시 뽑습니다.
