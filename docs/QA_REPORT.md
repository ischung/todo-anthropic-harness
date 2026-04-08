# QA_REPORT.md — Sprint 1 평가 보고서

> **작성자:** Evaluator 에이전트  
> **평가일:** 2026-04-06  
> **평가 대상:** Sprint 1 MVP (F-01 ~ F-05)  
> **참조 계약:** `docs/SPRINT_CONTRACT.md`

---

## 1. 테스트 환경

| 항목 | 값 |
|------|----|
| 백엔드 | FastAPI @ `http://localhost:8001` |
| 프론트엔드 | React + Vite @ `http://localhost:5174` |
| DB | SQLite (`backend/todos.db`) — 클린 상태에서 테스트 |
| 테스트 방법 | curl API 직접 호출 + 소스코드 정적 분석 |

---

## 2. 테스트 케이스별 결과

### TC-01 | 서버 기동 확인

| 검증 항목 | 결과 | 비고 |
|-----------|------|------|
| `GET /health` → 200 OK | ✅ PASS | `{"status":"ok"}` |
| `GET http://localhost:5174` → 200 OK | ✅ PASS | React 앱 정상 렌더링 |
| `GET /docs` (Swagger UI) → 200 OK | ✅ PASS | FastAPI 자동 문서 접근 가능 |

**판정: PASS**

---

### TC-02 | 달력 렌더링 및 날짜 선택 (F-01)

| 검증 항목 | 결과 | 비고 |
|-----------|------|------|
| 달력 컴포넌트 존재 | ✅ PASS | `Calendar.jsx` — 월별 grid 구조 구현 |
| 날짜 클릭 시 상태 전파 | ✅ PASS | `onSelectDate` 콜백으로 `App.jsx` 상태 업데이트 |
| 선택 날짜 패널 헤더 반영 | ✅ PASS | `formatDateKR()` 로 "2026년 4월 6일 (일)" 형식 표시 |
| 오늘 날짜 시각적 강조 | ✅ PASS | `border-2 border-indigo-400` 스타일 적용 |
| 이전/다음 월 이동 | ✅ PASS | prevMonth / nextMonth 핸들러 구현 |

**판정: PASS**

---

### TC-03 | 할일 생성 (F-02)

| 검증 항목 | 결과 | 비고 |
|-----------|------|------|
| POST `/api/todos` → 201 Created | ✅ PASS | id, title, date, priority, completed 모두 응답에 포함 |
| 응답 스키마 일치 (`TodoResponse`) | ✅ PASS | 7개 필드 모두 확인 |
| 빈 제목 → 422 Validation Error | ✅ PASS | Pydantic `min_length=1` 검증 작동 |
| UI에서 빈 제목 시 경고 | ✅ PASS | `setError('할일 제목을 입력해주세요.')` 처리 |
| 우선순위 3종 선택 가능 | ✅ PASS | HIGH / MEDIUM / LOW 버튼 UI 구현 |

**판정: PASS**

---

### TC-04 | 날짜별 할일 조회 (F-03)

| 검증 항목 | 결과 | 비고 |
|-----------|------|------|
| `GET /api/todos?date=2026-04-15` → 1건 | ✅ PASS | "A 날짜 할일"만 반환 |
| `GET /api/todos?date=2026-04-20` → 1건 | ✅ PASS | "B 날짜 할일"만 반환 |
| 날짜 간 데이터 누수 없음 | ✅ PASS | 날짜 필터 정확히 작동 |
| date 쿼리 없을 때 전체 반환 | ✅ PASS | `GET /api/todos` → 전체 목록 |

**판정: PASS**

---

### TC-05 | 할일 완료 토글 (F-04)

| 검증 항목 | 결과 | 비고 |
|-----------|------|------|
| PATCH → `completed: true` | ✅ PASS | API 응답 확인 |
| 재토글 → `completed: false` | ✅ PASS | 양방향 토글 작동 |
| UI 취소선 처리 | ✅ PASS | `line-through text-slate-400` 클래스 적용 |
| UI 체크 아이콘 | ✅ PASS | SVG 체크마크 + `bg-indigo-500` 배경 |

**판정: PASS**

---

### TC-06 | 할일 삭제 (F-05)

| 검증 항목 | 결과 | 비고 |
|-----------|------|------|
| DELETE → 204 No Content | ✅ PASS | |
| 삭제 후 목록 조회 → 0건 | ✅ PASS | DB에서 실제 제거 확인 |
| 존재하지 않는 ID → 404 | ✅ PASS | `"Todo not found"` 응답 |
| UI 즉시 제거 | ✅ PASS | `setTodos(prev => prev.filter(...))` |

**판정: PASS**

---

### TC-07 | API 스키마 검증

| 엔드포인트 | 상태코드 | 판정 |
|-----------|---------|------|
| `GET /api/todos` | 200 | ✅ |
| `POST /api/todos` | 201 | ✅ |
| `PATCH /api/todos/{id}` | 200 | ✅ |
| `DELETE /api/todos/{id}` | 204 | ✅ |

**판정: PASS** — 4개 엔드포인트 모두 SPEC과 일치

---

### TC-08 | 기본 UX 요건

| 검증 항목 | 결과 | 비고 |
|-----------|------|------|
| 할일 추가 UI 명확히 식별 가능 | ✅ PASS | 입력창 + "추가" 버튼 하단 고정 |
| 우선순위 색상 구분 (HIGH/MEDIUM/LOW) | ✅ PASS | 빨강/노랑/초록 dot + badge |
| 빈 날짜 선택 시 안내 문구 | ✅ PASS | "이 날의 할일이 없습니다" + 이모지 |
| 날짜 미선택 상태 안내 | ✅ PASS | "왼쪽 달력에서 날짜를 선택해보세요" |
| 로딩 상태 표시 | ✅ PASS | "불러오는 중..." 텍스트 |
| API 오류 시 토스트 알림 | ✅ PASS | 3초 자동 소멸 토스트 구현 |

**판정: PASS**

---

## 3. 종합 점수

| 평가 항목 | 배점 | 획득 점수 | 근거 |
|-----------|------|-----------|------|
| **기술적 완성도** | 35 | **33** | TC-01~TC-07 전부 통과. PATCH 시 `updated_at` 수동 갱신 코드가 SQLAlchemy `onupdate` 훅과 중복되는 소소한 이슈 있음 (-2) |
| **디자인 품질** | 25 | **22** | Tailwind 유틸리티 기반 일관된 색상 시스템, 카드 레이아웃, 인디고 포인트 컬러 통일. 달력 날짜별 할일 뱃지가 없어 시각 밀도 아쉬움 (-3) |
| **사용성** | 25 | **23** | 날짜 미선택/빈 상태/로딩/에러 4가지 상태 모두 처리. 할일 수정(인라인 편집)이 Sprint 1 범위 밖이라 없는 점이 체감상 아쉬움 (-2) |
| **독창성** | 15 | **13** | "N개 중 M개 완료" 진행률, 호버 시 삭제 버튼, 오늘 날짜 강조, 우선순위 dot + badge 이중 표현 등 세심한 배려 확인. 애니메이션 전환 없음 (-2) |
| **합계** | **100** | **91** | |

---

## 4. 발견된 이슈

| 심각도 | 위치 | 내용 |
|--------|------|------|
| 🟡 Minor | `backend/crud.py:26` | `todo.updated_at = datetime.now(timezone.utc)` 수동 설정이 SQLAlchemy `onupdate` 훅과 중복. 둘 중 하나만 사용 권장 |
| 🟡 Minor | `backend/main.py` | CORS에 `localhost:5174`만 허용. 배포 환경 고려 시 환경 변수로 분리 필요 |
| 🟢 Info | 프론트엔드 전반 | `App.css` 파일이 삭제되지 않고 남아 있음 (빌드에 영향 없으나 불필요한 파일) |
| 🟢 Info | 달력 컴포넌트 | 할일 개수 뱃지 없음 — Sprint 2(F-07) 범위이므로 현재 스프린트에서는 감점 없음 |

---

## 5. 최종 판정

```
총점: 91 / 100
기준: 80점 이상 → PASS
판정: ✅ PASS — Sprint 2로 진행
```

> **Evaluator 총평:**  
> Sprint 1 범위 내 5개 기능(F-01~F-05) 모두 작동하며, 단순 CRUD를 넘어 4가지 UI 상태 처리와 세심한 디자인 배려가 확인됨. 발견된 이슈는 모두 Minor/Info 수준으로 즉시 수정하지 않아도 서비스 운영에 지장 없음.  
> Sprint 2(인라인 편집 + 달력 뱃지 + 우선순위 색상 강화) 진행을 승인한다.
