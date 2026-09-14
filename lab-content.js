// 이 파일에서 난이도별 문제와 제공 자료를 수정하세요. 자세한 예시는 TEMPLATE-GUIDE.md 참고.
// answers: 허용 정답 목록. 빈 배열 []이면 채점 준비 중. url: 자료 링크. 빈 문자열이면 준비 중.
// 정적 페이지이므로 정답이 브라우저에 전달됩니다. 실전 대회용 비밀 채점이 아닙니다.
window.LAB_CONTENT = {
  "easy": {
    "name": "Easy",
    "title": "Artifact Analysis",
    "goal": "제공된 증적을 분석하고 사건의 흐름을 재구성하세요.",
    "briefing": "이벤트 로그, 네트워크 캡처 등 이미 획득된 주요 파일이 제공됩니다. 서로 다른 증적을 연결해 최초 진입점과 사건의 흐름을 재구성하세요.",
    "note": "이미 획득된 증적을 분석하는 것이므로, 증적을 획득하는 과정은 생략됩니다.",
    "tips": [
      "아티팩트 분석 도구 활용",
      "증거 기반 타임라인 작성"
    ],
    "tasks": [
      {
        "id": "easy-01",
        "title": "문제 제목",
        "description": "문제 내용",
        "sources": "문제 자료",
        "answers": ["test"],
        "caseSensitive": false,
        "placeholder": "정답 또는 플래그를 입력하세요."
      }
    ],
    "files": [
      {
        "name": "제공 파일",
        "description": "사전 분석 아티팩트 파일 제공",
        "format": "FILE",
        "url": "https://www.google.com"
      },
      {
        "name": "제공 파일",
        "description": "사전 분석 아티팩트 파일 제공",
        "format": "FILE",
        "url": "https://www.google.com"
      },
      {
        "name": "제공 파일",
        "description": "사전 분석 아티팩트 파일 제공",
        "format": "FILE",
        "url": "https://www.google.com"
      },
      {
        "name": "제공 파일",
        "description": "사전 분석 아티팩트 파일 제공",
        "format": "FILE",
        "url": "https://www.google.com"
      }
    ]
  },
  "medium": {
    "name": "Medium",
    "title": "Guided Acquisition",
    "goal": "준비된 도구로 필요한 증적을 선택하고 직접 추출한 뒤 분석합니다.",
    "briefing": "감염된 Victim 스냅샷에 Sysmon과 수집 도구가 준비되어 있습니다. 수집 위치와 체크리스트를 참고하되, 어떤 증적을 확보할지는 직접 판단하세요.",
    "note": "수집 항목과 순서를 스스로 결정하고 선택 이유와 수집 시각을 남기세요.",
    "tips": [
      "필요 증적과 수집 순서 선정",
      "수집 증적을 연결해 분석"
    ],
    "tasks": [
      {
        "id": "medium-01",
        "title": "문제 제목",
        "description": "문제 내용",
        "sources": "문제 자료",
        "answers": ["test"],
        "caseSensitive": false,
        "placeholder": "정답 또는 플래그를 입력하세요."
      }
    ],
    "files": [
      {
        "name": "제공 파일",
        "description": "사전 분석 아티팩트 파일 제공",
        "format": "FILE",
        "url": "https://www.google.com"
      },
      {
        "name": "제공 파일",
        "description": "사전 분석 아티팩트 파일 제공",
        "format": "FILE",
        "url": "https://www.google.com"
      },
      {
        "name": "제공 파일",
        "description": "사전 분석 아티팩트 파일 제공",
        "format": "FILE",
        "url": "https://www.google.com"
      },
      {
        "name": "제공 파일",
        "description": "사전 분석 아티팩트 파일 제공",
        "format": "FILE",
        "url": "https://www.google.com"
      }
    ]
  },
  "hard": {
    "name": "Hard",
    "title": "Real Field",
    "goal": "도구 선정, 증적 수집·추출, 분석까지 전부 수행합니다.",
    "briefing": "감염된 Victim 스냅샷과 Windows 기본 로그만 제공됩니다. 분석 도구는 설치되어 있지 않습니다. 사건 신고를 바탕으로 필요한 증적과 대응 순서를 결정하세요.",
    "note": "VM에 도구가 사전 설치된 것은 아니며, 사용할 도구와 수집 범위는 직접 결정합니다.",
    "tips": [
      "현장 상태와 보존 판단 기록",
      "휘발성 증적 우선순위 설정",
      "분석 도구 선정 및 사용법 학습"
    ],
    "tasks": [
      {
        "id": "hard-01",
        "title": "문제 제목",
        "description": "문제 내용",
        "sources": "문제 자료",
        "answers": ["test"],
        "caseSensitive": false,
        "placeholder": "정답 또는 플래그를 입력하세요."
      }
    ],
    "files": [
      {
        "name": "제공 파일",
        "description": "사전 분석 아티팩트 파일 제공",
        "format": "VMWARE",
        "url": "https://www.google.com"
      },
      {
        "name": "제공 파일",
        "description": "사전 분석 아티팩트 파일 제공",
        "format": "FILE",
        "url": "https://www.google.com"
      },
      {
        "name": "제공 파일",
        "description": "사전 분석 아티팩트 파일 제공",
        "format": "FILE",
        "url": "https://www.google.com"
      },
      {
        "name": "제공 파일",
        "description": "사전 분석 아티팩트 파일 제공",
        "format": "FILE",
        "url": "https://www.google.com"
      }
    ]
  }
};
