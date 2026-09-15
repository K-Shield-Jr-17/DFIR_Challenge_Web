// TRACE DFIR Lab 문제 데이터
// 정적 페이지이므로 answers는 브라우저에 노출됩니다. 공개 대회는 서버 채점을 사용하세요.
window.LAB_CONTENT = {
  "easy": {
    "name": "Easy",
    "title": "Extracted Artifact Analysis",
    "goal": "이미 수집된 로그와 분석 결과를 상관분석해 전체 침해 흐름을 재구성하세요.",
    "briefing": "피해 호스트 DESKTOP-IS00QJN의 Sysmon·Windows 이벤트 로그, Procmon·Process Explorer 결과, Regshot, PCAPNG, Autoruns 전후 비교 및 Chrome History가 제공됩니다. 원본 VM이나 메모리·디스크 이미지는 제공되지 않습니다.",
    "note": "각 답은 서로 다른 두 개 이상의 증적에서 교차 검증하세요. 시각을 적을 때는 UTC 또는 KST를 명시하세요.",
    "tips": ["파일 생성 → 프로세스 생성 → 네트워크 연결 순서로 추적", "스테이징 포트 8000과 C2 포트 8080 구분", "RunMRU는 자동실행 키가 아니라 실행 이력"],
    "tasks": [
      { "id": "easy-01", "title": "ClickFix 유입 지점", "description": "인터넷 사용 기록에서 가짜 SCH Gym Lab 서버 IP와 사용자가 지시 화면을 주시한 최장 체류 시간을 찾으세요.", "sources": "History", "answers": ["TRACE{192.168.50.30_90.01}"], "caseSensitive": false, "placeholder": "TRACE{IP_seconds}" },
      { "id": "easy-02", "title": "PowerShell 스테이저", "description": "RunMRU와 PowerShell 로그에서 다운로드 URL과 명령에 포함된 기대 SHA-256을 찾으세요.", "sources": "regshot.txt, powershell_classic.evtx, powershell_operational.evtx", "answers": ["TRACE{http://192.168.50.10:8000/a.exe_ca7376fb8a63573c3ae02147e6105bce76c091bc7d39c6f2d449bbe9b69e5fc8}"], "caseSensitive": false, "placeholder": "TRACE{URL_SHA256}" },
      { "id": "easy-03", "title": "초기 비콘 식별", "description": "a.exe가 실행한 위장 프로세스 중 192.168.50.10:8080에 연결한 파일의 전체 경로와 PID를 찾으세요.", "sources": "Sysmon.evtx, procmon.pml, process_explorer.txt", "answers": ["TRACE{C:\\Windows\\Temp\\Kisec\\payloads\\chrome.exe_432}"], "caseSensitive": false, "placeholder": "TRACE{path_PID}" },
      { "id": "easy-04", "title": "C2 통신 확인", "description": "사용자 권한 비콘의 목적지 IP:PORT와 통신 프로토콜을 확인하세요.", "sources": "incident.pcapng, Sysmon.evtx", "answers": ["TRACE{192.168.50.10:8080_TCP}"], "caseSensitive": false, "placeholder": "TRACE{IP:PORT_protocol}" },
      { "id": "easy-05", "title": "서비스 경로 권한 상승", "description": "등록된 비인용 서비스 ImagePath와 실제 SYSTEM으로 실행된 가로채기 파일 경로를 결합하세요.", "sources": "system.evtx, Sysmon.evtx, process_explorer.txt", "answers": ["TRACE{C:\\Company\\Updater Apps\\Apps\\vulnapp.exe_C:\\Company\\Updater.exe}"], "caseSensitive": false, "placeholder": "TRACE{registered_path_executed_path}" },
      { "id": "easy-06", "title": "LSASS 접근", "description": "LSASS에 최대 권한으로 접근한 프로세스 PID, GrantedAccess와 덤프 관련 DLL을 찾으세요.", "sources": "Sysmon.evtx, procmon.pml", "answers": ["TRACE{5552_0x1fffff_dbgcore.dll}"], "caseSensitive": false, "placeholder": "TRACE{PID_access_DLL}" },
      { "id": "easy-07", "title": "파일 서버 접근", "description": "SYSTEM 비콘이 연결한 파일 서버 IP:PORT와 동시에 유지한 SMB 세션 수를 찾으세요.", "sources": "Sysmon.evtx, incident.pcapng, process_explorer.txt", "answers": ["TRACE{192.168.60.20:445_8}"], "caseSensitive": false, "placeholder": "TRACE{IP:PORT_count}" },
      { "id": "easy-08", "title": "수집 및 반출", "description": "공격자가 생성한 공유명, 집결된 ZIP 파일명과 반출 C2 포트를 순서대로 결합하세요.", "sources": "regshot.txt, Sysmon.evtx, procmon.pml, incident.pcapng", "answers": ["TRACE{TempShare_FileServer_Data.zip_8080}"], "caseSensitive": false, "placeholder": "TRACE{share_archive_port}" }
    ],
    "files": [
      { "name": "Sysmon.evtx", "description": "Sysmon 이벤트 로그", "format": "EVTX", "url": "https://drive.google.com/drive/folders/12hvkp4PBS-X4Kwbl1TkaBwErN89D6bH5?usp=sharing" },
      { "name": "Windows_Event_Logs.zip", "description": "application, security, system, powershell_classic, powershell_operational", "format": "EVTX/ZIP", "url": "https://drive.google.com/drive/folders/1h9NpbZa4HU8Vu04c12nadenTr9ViBsuQ?usp=drive_link" },
      { "name": "procmon.pml", "description": "Process Monitor 수집 결과", "format": "PML", "url": "https://drive.google.com/file/d/1wzA2XC4kipCRLdM6PPBPPHU23gu_iCVX/view?usp=drive_link" },
      { "name": "process_explorer.txt", "description": "Process Explorer 프로세스·핸들 결과", "format": "TXT", "url": "https://drive.google.com/file/d/1wF8hx9HjdfL_SLanqRgWyIMF6yp0QVWO/view?usp=drive_link" },
      { "name": "regshot.txt", "description": "레지스트리 Before/After 비교 결과", "format": "TXT", "url": "https://drive.google.com/file/d/15cFnhcSjiAr7bt_jTVBdKZ5sk8hgDboz/view?usp=drive_link" },
      { "name": "incident.pcapng", "description": "피해 호스트 네트워크 캡처", "format": "PCAPNG", "url": "https://drive.google.com/drive/folders/1gNb6YbuYdU4qSN-A86o9Dh5o9T57x8Oi?usp=drive_link" },
      { "name": "Before.arn / After.arn", "description": "Autoruns 실행 전후 결과", "format": "ARN", "url": "https://drive.google.com/drive/folders/1dxO3fe7HXeqjpXhnFAanBB9XlVya29yU?usp=drive_link" },
      { "name": "History", "description": "Chrome 인터넷 사용 기록 SQLite 파일", "format": "SQLITE", "url": "https://drive.google.com/file/d/1wa0qnqBF8XckFAmbgY0hS5RfqyDTKf60/view?usp=drive_link" }
    ]
  },
  "medium": {
    "name": "Medium",
    "title": "Instrumented VM Forensics",
    "goal": "증거 수집 도구가 활성화된 상태에서 진행된 VM의 메모리·디스크 덤프를 분석하세요.",
    "briefing": "Sysmon, Process Monitor, Process Explorer, Regshot, Autoruns 등 수집 도구가 실행 중이던 피해 VM의 메모리 덤프와 디스크 덤프가 제공됩니다. 도구가 만든 흔적과 공격자가 만든 흔적을 구분해야 합니다.",
    "note": "추출된 개별 로그는 제공되지 않습니다. 이미지에서 직접 아티팩트를 추출하고, 수집 도구의 실행·파일 접근 노이즈를 오탐으로 분류하세요.",
    "tips": ["원본 해시 기록 후 복제본에서 분석", "도구 프로세스와 공격 프로세스의 경로·부모·서명 비교", "메모리와 디스크 타임라인 교차 검증"],
    "tasks": [
      { "id": "medium-01", "title": "이미지 무결성과 프로파일", "description": "메모리·디스크 이미지의 SHA-256을 기록하고 OS 호스트명과 메모리 캡처 시각(KST)을 식별하세요.", "sources": "VM memory/disk dump", "answers": ["TRACE{DESKTOP-IS00QJN_2026-09-16_03:22:58_KST}"], "caseSensitive": false, "placeholder": "TRACE{hostname_YYYY-MM-DD_HH:MM:SS_KST}" },
      { "id": "medium-02", "title": "수집 도구 노이즈 분리", "description": "실행 중인 수집 도구들을 제외한 악성 비콘 2개의 프로세스명과 PID를 사용자 권한→SYSTEM 권한 순서로 찾으세요.", "sources": "memory process tree, disk executable artifacts", "answers": ["TRACE{chrome.exe:432_Updater.exe:5552}"], "caseSensitive": false, "placeholder": "TRACE{name:PID_name:PID}" },
      { "id": "medium-03", "title": "최초 실행 복구", "description": "사용자 하이브와 PowerShell 아티팩트에서 스테이저 URL과 실제 생성된 a.exe의 SHA-256을 복구하세요.", "sources": "disk registry hive, PowerShell logs/history, Amcache/MFT", "answers": ["TRACE{http://192.168.50.10:8000/a.exe_CA7376FB8A63573C3AE02147E6105BCE76C091BC7D39C6F2D449BBE9B69E5FC8}"], "caseSensitive": false, "placeholder": "TRACE{URL_SHA256}" },
      { "id": "medium-04", "title": "활성 C2 세션", "description": "메모리에서 사용자 비콘과 SYSTEM 비콘의 PID 및 C2 원격 주소를 각각 확인하세요.", "sources": "memory netscan + process tree", "answers": ["TRACE{432_192.168.50.10:8080_5552_192.168.50.10:8080}"], "caseSensitive": false, "placeholder": "TRACE{PID_C2_PID_C2}" },
      { "id": "medium-05", "title": "권한 상승 재구성", "description": "서비스 등록 경로, 가로채기 경로와 SYSTEM 프로세스 SHA-256을 결합하세요.", "sources": "SYSTEM hive, System.evtx, memory process tree, $MFT", "answers": ["TRACE{C:\\Company\\Updater Apps\\Apps\\vulnapp.exe_C:\\Company\\Updater.exe_6022DE937F5B9816B4D1BE68DD8C3395360689328208C1BA240C89816BE6B5C3}"], "caseSensitive": false, "placeholder": "TRACE{registered_executed_SHA256}" },
      { "id": "medium-06", "title": "자격증명 접근", "description": "메모리와 디스크 아티팩트에서 LSASS 접근 주체, 최대 접근 권한과 덤프 관련 모듈을 확인하세요.", "sources": "memory handles/modules, extracted Sysmon/Procmon artifacts", "answers": ["TRACE{Updater.exe_0x1fffff_dbgcore.dll}"], "caseSensitive": false, "placeholder": "TRACE{process_access_module}" },
      { "id": "medium-07", "title": "횡적 이동과 반출", "description": "파일 서버 목적지, 동시 SMB 세션 수, 집결 ZIP과 반출 목적지를 결합하세요.", "sources": "memory netscan, registry share, MFT/USN, collector artifacts", "answers": ["TRACE{192.168.60.20:445_8_FileServer_Data.zip_192.168.50.10:8080}"], "caseSensitive": false, "placeholder": "TRACE{server_count_archive_C2}" }
    ],
    "files": [
      { "name": "VICTIM_Instrumented.vmem", "description": "수집 도구가 활성화된 VM 메모리 덤프", "format": "VMEM", "url": "https://drive.google.com/file/d/1gDIF5kEhctLa9-RlWP0gqlOfk5R2_avW/view?usp=drive_link" },
      { "name": "VICTIM_Instrumented.vmsn", "description": "메모리 스냅샷 메타데이터", "format": "VMSN", "url": "https://drive.google.com/file/d/1_fIZDmC-Eu4vRBNOoOdV7huZf9b_ElHO/view?usp=drive_link" },
      { "name": "VICTIM_Instrumented.vmdk", "description": "수집 도구와 전체 디스크 아티팩트가 포함된 디스크 덤프", "format": "VMDK", "url": "https://drive.google.com/file/d/1_VliaUK5DDlUsj-FBmir--86qDkbKzpW/view?usp=drive_link" },
      { "name": "VICTIM_Instrumented.vmx", "description": "VMware 가상머신 구성 파일", "format": "VMX", "url": "https://drive.google.com/file/d/1RTKDEM0OoS44pCZOg1mwU6zYUb99UtLV/view?usp=drive_link" }
    ]
  },
  "hard": {
    "name": "Hard",
    "title": "Uninstrumented VM Investigation",
    "goal": "증거 수집 도구가 없던 VM 이미지에서 필요한 도구와 아티팩트를 직접 선정해 침해사고를 규명하세요.",
    "briefing": "직원이 이상한 PowerShell 창을 본 뒤 파일 서버가 느려졌다는 신고만 접수되었습니다. Sysmon·Procmon·Process Explorer·Regshot·Autoruns가 활성화되지 않은 상태에서 진행된 VM의 메모리·디스크 파일만 제공됩니다.",
    "note": "Sysmon이나 Procmon 이벤트가 존재한다고 가정하지 마세요. Windows 기본 로그, 레지스트리, MFT·USN, 브라우저 기록과 메모리 구조를 이용해야 합니다.",
    "tips": ["VM을 부팅하기 전에 원본 보존과 해시 기록", "Volatility 및 오프라인 레지스트리·파일시스템 분석 도구 직접 선정", "증거 부재와 행위 부재를 구분"],
    "tasks": [
      { "id": "hard-01", "title": "초동 보존", "description": "분석 시작 전 원본 보호를 완료한 뒤 호스트명, OS와 메모리 캡처 시각을 식별하세요.", "sources": "VM files only", "answers": ["TRACE{DESKTOP-IS00QJN_WINDOWS10_2026-09-16_03:22:58_KST}"], "caseSensitive": false, "placeholder": "TRACE{host_OS_time_KST}" },
      { "id": "hard-02", "title": "최초 침투 복구", "description": "Sysmon 없이 Chrome History, NTUSER.DAT RunMRU와 PowerShell 기본 로그에서 가짜 사이트 IP와 스테이저 URL을 복구하세요.", "sources": "disk image", "answers": ["TRACE{192.168.50.30_http://192.168.50.10:8000/a.exe}"], "caseSensitive": false, "placeholder": "TRACE{lureIP_URL}" },
      { "id": "hard-03", "title": "삭제 실행 흔적", "description": "MFT·USN·Amcache·Prefetch와 메모리를 이용해 사용자 권한 비콘의 전체 경로, PID와 SHA-256을 복구하세요.", "sources": "memory + disk image", "answers": ["TRACE{C:\\Windows\\Temp\\Kisec\\payloads\\chrome.exe_432_44BEAA132F87724158AB25CB424E32B3245C53101F563093D2D02EFDA56D1FC6}"], "caseSensitive": false, "placeholder": "TRACE{path_PID_SHA256}" },
      { "id": "hard-04", "title": "C2와 권한 상승", "description": "메모리 연결과 SYSTEM 하이브에서 C2 목적지, 취약 서비스 ImagePath와 가로채기 파일을 확인하세요.", "sources": "memory netscan/process tree + SYSTEM hive", "answers": ["TRACE{192.168.50.10:8080_C:\\Company\\Updater Apps\\Apps\\vulnapp.exe_C:\\Company\\Updater.exe}"], "caseSensitive": false, "placeholder": "TRACE{C2_registered_executed}" },
      { "id": "hard-05", "title": "자격증명 탈취 정황", "description": "전용 수집 로그 없이 메모리의 프로세스·핸들·모듈과 파일시스템 흔적으로 LSASS 접근 프로세스와 덤프 모듈을 규명하세요.", "sources": "memory + filesystem metadata", "answers": ["TRACE{Updater.exe_lsass.exe_dbgcore.dll}"], "caseSensitive": false, "placeholder": "TRACE{source_target_module}" },
      { "id": "hard-06", "title": "내부 확산 및 유출", "description": "메모리 연결, 레지스트리 공유 설정과 파일시스템 저널에서 파일 서버, 공유명, ZIP 파일 및 반출 C2를 재구성하세요.", "sources": "memory + disk image", "answers": ["TRACE{192.168.60.20:445_TempShare_FileServer_Data.zip_192.168.50.10:8080}"], "caseSensitive": false, "placeholder": "TRACE{server_share_archive_C2}" },
      { "id": "hard-07", "title": "증거 한계 보고", "description": "Sysmon·Procmon·PCAP가 없을 때 확정할 수 없는 사항을 분리하고 추가 요청할 외부 증적 3종을 제출하세요.", "sources": "investigator judgment", "answers": ["TRACE{WEBSERVER_LOG_FILESERVER_LOG_NETWORK_PCAP}"], "caseSensitive": false, "placeholder": "TRACE{source_source_source}" },
      { "id": "hard-08", "title": "종합 사고보고서", "description": "침해 범위·원인·타임라인·대응안을 작성하고 모든 판단을 확인된 사실, 강한 정황, 추정으로 구분하세요.", "sources": "all recovered evidence", "answers": ["TRACE{FACT_EVIDENCE_INFERENCE}"], "caseSensitive": false, "placeholder": "TRACE{FACT_EVIDENCE_INFERENCE}" }
    ],
    "files": [
      { "name": "VICTIM_Uninstrumented.vmem", "description": "수집 도구가 활성화되지 않은 VM 메모리 덤프", "format": "VMEM", "url": "" },
      { "name": "VICTIM_Uninstrumented.vmsn", "description": "메모리 스냅샷 메타데이터", "format": "VMSN", "url": "" },
      { "name": "VICTIM_Uninstrumented.vmdk", "description": "수집 도구 없이 시나리오가 진행된 디스크 덤프", "format": "VMDK", "url": "" },
      { "name": "VICTIM_Uninstrumented.vmx", "description": "VMware 가상머신 구성 파일", "format": "VMX", "url": "" }
    ]
  }
};
