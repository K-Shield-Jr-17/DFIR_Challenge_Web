# 🛡️ TRACE — DFIR Training Lab

침해사고 대응 및 디지털 포렌식(DFIR) 교육을 위한 시나리오 기반 실습 훈련 웹앱입니다. 교육생은 난이도별 사건 시나리오를 수행하고, 제공된 증적과 네트워크 정보를 분석해 문제를 해결합니다.

## ✨ 주요 기능

- **Easy / Medium / Hard** 난이도별 훈련 시나리오
- 사건 개요, 분석 목표, 문제, 참고 자료를 한 화면에서 확인
- 난이도에 따른 힌트 및 네트워크 구성 표시
- 증적 파일 링크를 통한 외부 자료 열람
- 브라우저에서 즉시 정답 제출 및 결과 확인
- 별도 서버 없이 정적 웹페이지로 실행 가능

## 🚀 실행 방법

정적 파일 서버로 `dist` 디렉터리를 제공한 뒤 시작 페이지를 엽니다.

```bash
cd dist
python -m http.server 8000
```

브라우저에서 [http://localhost:8000](http://localhost:8000)을 방문하세요.

난이도 화면은 다음 주소로 직접 접근할 수 있습니다.

- `http://localhost:8000/lab.html?level=easy`
- `http://localhost:8000/lab.html?level=medium`
- `http://localhost:8000/lab.html?level=hard`

## 🧩 콘텐츠 수정

훈련 문제와 제공 자료는 [`dist/lab-content.js`](./dist/lab-content.js)에서 관리합니다.

- `easy`, `medium`, `hard`의 `tasks`를 수정하면 문제가 변경됩니다.
- `files`를 수정하면 교육생에게 제공되는 증적 자료가 변경됩니다.
- `answers`에 정답을 입력하면 브라우저에서 제출 결과를 채점합니다.
- 난이도별 제목, 목표, 브리핑, 안내 문구도 같은 파일에서 수정할 수 있습니다.

자세한 편집 방법은 [`TEMPLATE-GUIDE.md`](./TEMPLATE-GUIDE.md)를 참고하세요.

> 현재 채점은 브라우저에서 수행됩니다. 정답이 소스에 포함되므로 실제 시험이나 평가 환경에서는 서버 측 채점 방식이 필요합니다.

## 🗂️ 디렉터리 구조

```text
dfir-training-design/
├─ dist/
│  ├─ index.html          # 난이도 선택 및 시작 화면
│  ├─ lab.html            # 훈련 화면
│  ├─ lab-content.js      # 문제·자료·정답 콘텐츠
│  ├─ app.js              # 화면 동작
│  └─ *.css, *.js         # 스타일 및 공통 기능
└─ TEMPLATE-GUIDE.md      # 콘텐츠 수정 안내
```

## ⚠️ 운영 시 주의사항

- 실제 개인정보와 운영 환경의 민감한 증적은 사용하지 마세요.
- 실습 자료는 격리된 LAB 환경에서만 사용하세요.
- 외부 증적 링크를 사용하는 경우 교육생이 접근 권한을 가지고 있는지 확인하세요.
- 콘텐츠 수정 후 브라우저 캐시가 남아 있으면 `Ctrl+F5`로 새로고침하세요.

## 👥 프로젝트

K-Shield Jr. 17기 침해사고대응 및 분석반 팀 프로젝트의 DFIR 교육훈련 설계 및 구현 결과물입니다.
