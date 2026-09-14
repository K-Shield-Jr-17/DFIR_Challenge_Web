const levels = window.LAB_CONTENT;
const initialLevel = new URLSearchParams(location.search).get('level');
let currentLevel = initialLevel;
const levelConfirm = document.querySelector('#level-confirm');
let pendingLevel = null;
const dialog = document.querySelector('#mission-dialog');
const grid = document.querySelector('.mission-grid');
let activeTask = null;
function setFeedback(status) { const messages = { idle: '앞뒤 공백은 채점에서 제외합니다.', empty: '답변을 입력해주세요.', unconfigured: '정답 등록 전입니다. 운영자가 정답을 등록하면 제출할 수 있습니다.', correct: '정답입니다.', incorrect: '오답입니다. 증적을 다시 확인해보세요.' }; const feedback = document.querySelector('#answer-feedback'); feedback.dataset.status = status; feedback.textContent = messages[status]; document.querySelector('#submit-answer').disabled = status === 'unconfigured'; }
document.querySelector('#answer-form').addEventListener('submit', event => { event.preventDefault(); if (activeTask) setFeedback(LabUtils.grade(activeTask, document.querySelector('#analyst-answer').value)); });
document.querySelector('#analyst-answer').addEventListener('input', () => { if (activeTask) setFeedback(LabUtils.grade(activeTask, '') === 'unconfigured' ? 'unconfigured' : 'idle'); });
function el(tag, cls, text) { const n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; }
function renderLevel(key) {
    currentLevel = key; const level = levels[key]; document.body.dataset.level = key;
    document.querySelectorAll('[data-level]').forEach(b => { const selected = b.dataset.level === key; b.classList.toggle('selected', selected); b.setAttribute('aria-pressed', String(selected)); });
    document.querySelector('.difficulty').textContent = level.name + ' · ' + level.title;
    document.querySelector('#level-objective').textContent = level.goal;
    document.querySelector('.primary').firstChild.textContent = level.name + ' 조사 시작하기 ';
    document.querySelector('.briefing h2').textContent = key === 'hard' ? '사건 신고 / 직원 PC 이상 징후' : '평범한 웹 접속에서 시작된 이상 징후';
    const ps = document.querySelectorAll('.briefing>p');
    ps[0].textContent = key === 'hard' ? '사내 PC에서 의심스러운 외부 통신이 발견되었습니다. 이후 내부 파일 서버에서도 비정상적인 접근이 관측되었습니다.”' : '사내 PC에서 의심스러운 외부 통신이 발견되었습니다.이후 내부 파일 서버에서도 비정상적인 접근이 관측되었습니다.';
    ps[1].textContent = level.briefing;
    document.querySelector('.briefing-footer').textContent = level.name.toUpperCase() + ' / ' + level.title + ' · 과제 ' + level.tasks.length + '개';
    document.querySelector('.scope-hint').open = false;
    document.querySelector('#topology').hidden = key === 'hard';
    document.querySelector('a[href="#topology"]').hidden = key === 'hard';
    document.querySelectorAll('[data-level]').forEach(button => {button.querySelector('strong').textContent = levels[button.dataset.level].title;});
    document.querySelector('#missions .section-heading h2').textContent = level.name + ' 분석 과제 · ' + level.tasks.length + '개';
    document.querySelector('#missions .section-note').textContent = key === 'easy' ? '제공된 자료에서 증거를 찾아보세요.' : '증적의 선택과 판단 근거를 함께 기록하세요.';
    document.querySelector('a[href="#missions"] i').textContent = String(level.tasks.length).padStart(2, '0');
    document.querySelector('a[href="#evidence"] i').textContent = String(level.files.length).padStart(2, '0');
    grid.replaceChildren();
    level.tasks.forEach(({ title, description }, i) => { const number = String(i + 1).padStart(2, '0'); const b = el('button', 'mission'); b.type = 'button'; b.dataset.mission = i; const top = el('div', 'mission-top'); top.append(el('span', 'step', number), el('span', 'pill', level.title.toUpperCase()), el('span', 'arrow', '↗')); const bottom = el('div', 'mission-footer'); bottom.append(el('span', '', level.name.toUpperCase() + ' / TASK ' + number), el('span', '', '과제 보기 ↗')); b.append(top, el('h3', '', title), el('p', '', description), bottom); grid.append(b); });
    const list = document.querySelector('.file-list'); list.replaceChildren();
    level.files.forEach(({ name, description, format, url }) => { const row = el('div', 'file-row'); const copy = el('div', 'file-copy'); copy.append(el('h3', '', name), el('p', '', description)); const href = LabUtils.resourceUrl(url, document.baseURI); const download = el(href ? 'a' : 'button', 'download'); if (href) { download.href = href; download.target = '_blank'; download.rel = 'noopener noreferrer'; download.setAttribute('aria-label', name + ' 열기 (새 탭)'); } else { download.type = 'button'; download.disabled = true; download.setAttribute('aria-label', name + ' 링크 준비 중'); } download.append(href ? '↗ ' : '↓ ', el('span', '', href ? '자료 열기' : '준비 중')); row.append(el('span', 'file-icon', format === 'VMWARE' ? 'VM' : format.split(' ')[0].slice(0, 3)), copy, el('span', 'file-type', format), download); list.append(row); });
    document.querySelector('#evidence .section-heading h2').textContent = level.name + ' 제공 자료';
    const note = document.querySelector('.analyst-note'); note.replaceChildren(el('span', 'eyebrow lime', key === 'hard' ? 'OPTIONAL FIELD TOOLKIT' : "ANALYST'S NOTE"), el('h3', '', key === 'easy' ? '수집된 증적에서 시작하세요.' : key === 'medium' ? '도구는 준비되어 있습니다.' : '도구 선택부터 당신의 판단.'), el('p', '', level.note));
    level.tips.forEach((tip, i) => { const line = el('div', '', String(i + 1).padStart(2, '0')); line.append(el('span', '', tip)); note.append(line); });
}
document.querySelectorAll('[data-level]').forEach(button => button.addEventListener('click', () => {
    if (button.dataset.level === currentLevel) return;
    pendingLevel = button.dataset.level;
    document.querySelector('#level-confirm-description').textContent = levels[currentLevel].name + '에서 ' + levels[pendingLevel].name + '로 변경합니다. 다른 난이도의 문제와 제공 자료가 현재 조사에 대한 힌트가 될 수 있습니다. 정말 변경하시겠습니까?';
    levelConfirm.showModal();
}));
document.querySelector('#level-cancel').addEventListener('click', () => levelConfirm.close());
levelConfirm.addEventListener('close', () => { pendingLevel = null; });
document.querySelector('#level-accept').addEventListener('click', () => {
    if (!pendingLevel) return;
    const next = pendingLevel;
    renderLevel(next);
    activeTask = null;
    document.querySelector('#analyst-answer').value = '';
    const url = new URL(location.href); url.searchParams.set('level', next); url.hash = 'overview';
    history.replaceState(null, '', url);
    levelConfirm.close();
    document.querySelector('#overview').scrollIntoView({block:'start'});
});
grid.addEventListener('click', event => { const b = event.target.closest('[data-mission]'); if (!b) return; const level = levels[currentLevel]; const i = Number(b.dataset.mission); const task = level.tasks[i]; const { title, description, sources } = task; activeTask = task; document.querySelector('#dialog-phase').textContent = level.name.toUpperCase() + ' / TASK ' + String(i + 1).padStart(2, '0'); document.querySelector('#dialog-title').textContent = title; document.querySelector('#dialog-description').textContent = description; document.querySelector('#dialog-sources').textContent = sources; document.querySelector('#analyst-answer').value = ''; document.querySelector('#analyst-answer').placeholder = task.placeholder || '정답을 입력하세요.'; setFeedback(LabUtils.grade(task, '') === 'unconfigured' ? 'unconfigured' : 'idle'); dialog.showModal(); });
document.querySelectorAll('.close,.close-action').forEach(b => b.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => { document.querySelectorAll('.nav-link').forEach(item => item.classList.remove('active')); link.classList.add('active'); }));
if (Object.hasOwn(levels, initialLevel)) {
    renderLevel(initialLevel);
    document.body.classList.remove('lab-loading');
} else {
    location.replace('index.html');
}
