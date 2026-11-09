const app = document.querySelector("#app");
const modalRoot = document.querySelector("#modalRoot");
const toastRegion = document.querySelector("#toastRegion");
const pageLabel = document.querySelector("#pageLabel");
const sidebar = document.querySelector("#sidebar");
const themeToggle = document.querySelector("#themeToggle");

function setTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeToggle.textContent = isDark ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", `${isDark ? "Lichte" : "Donkere"} modus inschakelen`);
  themeToggle.title = `${isDark ? "Lichte" : "Donkere"} modus inschakelen`;
  document.querySelector('meta[name="theme-color"]').content = isDark ? "#171d19" : "#f5f4ec";
}

setTheme(localStorage.getItem("agora-theme") || "light");

const worlds = [
  "Artistieke wereld",
  "Maatschappelijke wereld",
  "Sociaal-ethische wereld",
  "Spirituele wereld",
  "Wetenschappelijke wereld",
];

const rubricDescriptions = {
  Waarom: [
    "Ik leg duidelijk uit waarom ik een challenge leuk of interessant vind.",
    "Ik leg ook duidelijk uit waarom de challenge voor mij belangrijk is.",
    "Ik leg de relatie uit tussen deze challenge, andere challenges en persoonlijke doelen.",
    "Iemand die mij niet kent, begrijpt waarom deze challenge belangrijk voor mij is.",
  ],
  Hoe: [
    "Ik omschrijf wat ik ongeveer wil onderzoeken of maken en wanneer ik dit af wil hebben.",
    "Ik omschrijf duidelijk wat mijn eindproduct is en werk dit uit in stappen.",
    "Mijn 'This is done when' maakt duidelijk aan welke eisen mijn eindproduct moet voldoen.",
    "Mijn 'This is done when' is zo duidelijk dat iemand anders tot een vergelijkbaar resultaat komt.",
  ],
  Logboek: [
    "Elke keer dat ik aan mijn challenge werk, schrijf ik op wat ik precies heb gedaan.",
    "Ik noteer ook wat ik ervan vond en welke bronnen ik gebruikte.",
    "Ik noteer wat ik deed, welke bronnen ik gebruikte, wat ik ervan vond en wat ik leerde.",
    "Ik noteer ook welke vragen ik nog heb en wat mijn volgende stappen zijn.",
  ],
  Eindproduct: [
    "Mijn eindproduct laat het resultaat zien.",
    "Mijn eindproduct laat ook zien wat ik heb geleerd.",
    "Mijn eindproduct laat zien hoe ik het resultaat heb gemaakt.",
    "Mijn eindproduct laat ook zien hoe ik aan mijn focusvaardigheden heb gewerkt.",
  ],
  Bronnen: [
    "Ik schrijf mijn bronnen op.",
    "Ik houd ook aantekeningen bij met informatie uit mijn bronnen.",
    "Ik gebruik meerdere bronnen en kan de betrouwbaarheid toelichten.",
    "Ik verwijs in mijn eindproduct en aantekeningen naar mijn bronnen.",
  ],
  Timemanagement: [
    "Ik heb zelf een geplande start- en einddatum vastgezet.",
    "Ik kan laten zien dat ik tijd heb ingepland om aan mijn challenge te werken.",
    "Ik kan laten zien dat ik mijn deadlines heb gehaald.",
    "Ik kan met mijn agenda en logboek laten zien dat ik me aan mijn planning heb gehouden.",
  ],
};

const starterChallenges = [
  {
    id: "moestuin",
    title: "Een mini-moestuin op het plein",
    description: "Ik onderzoek hoe we samen groenten kunnen kweken op school.",
    progress: 58,
    icon: "🌱",
    color: "",
    status: "In uitvoering",
    why: "Ik wil ontdekken hoe je met weinig ruimte toch je eigen eten kunt laten groeien.",
    learning: "Ik wil leren hoe planten groeien en hoe je goed samenwerkt.",
    importance: "Ik vind het belangrijk om bewuster met eten en de natuur om te gaan.",
    how: "Een kleine, werkende moestuin met eetbare plantenbakken op het schoolplein.",
    steps: ["Een plek en geschikte planten kiezen", "Materialen verzamelen en de bakken maken", "Planten verzorgen en groei bijhouden"],
    imageData: "",
    selectedWorlds: ["Maatschappelijke wereld", "Wetenschappelijke wereld"],
    worldWhy: "Ik onderzoek hoe we samen duurzaam voedsel kunnen verbouwen.",
    participants: [],
    startFeedback: "",
    milestones: [
      { title: "Een plek en geschikte planten kiezen", done: true },
      { title: "Materialen verzamelen en de bakken maken", done: false },
      { title: "Planten verzorgen en groei bijhouden", done: false },
    ],
    coachFeedback: [{ date: "6 november", text: "Mooie start! Vergeet ook te noteren waarom je juist deze planten kiest." }],
    reflection: {},
    start: "2026-10-12",
    end: "2026-12-11",
    logs: [{ date: "6 november", text: "Ik heb met de conciërge een zonnige plek op het plein bekeken." }],
  },
  {
    id: "podcast",
    title: "Een podcast over lokale helden",
    description: "Een serie korte gesprekken met mensen die iets betekenen voor de buurt.",
    progress: 27,
    icon: "🎙️",
    color: "orange",
    status: "In uitvoering",
    why: "Ik ben benieuwd naar de verhalen van mensen uit mijn buurt.",
    learning: "Ik wil leren interviewen, audio opnemen en monteren.",
    importance: "Door verhalen te delen leren we onze buurt beter kennen.",
    how: "Een podcast met drie korte afleveringen en een eigen intro.",
    steps: ["Mensen uit de buurt kiezen", "Vragen voorbereiden en gesprekken opnemen", "De afleveringen monteren en delen"],
    imageData: "",
    selectedWorlds: ["Artistieke wereld", "Maatschappelijke wereld"],
    worldWhy: "De podcast combineert verhalen maken met ontmoetingen in de buurt.",
    participants: [],
    startFeedback: "",
    milestones: [
      { title: "Mensen uit de buurt kiezen", done: true },
      { title: "Vragen voorbereiden en gesprekken opnemen", done: false },
      { title: "De afleveringen monteren en delen", done: false },
    ],
    coachFeedback: [],
    reflection: {},
    start: "2026-10-20",
    end: "2027-01-15",
    logs: [],
  },
];

let challenges = loadSaved("agora-challenges", starterChallenges);
challenges = challenges.map((challenge) => ({
  ...challenge,
  milestones: challenge.milestones?.length
    ? challenge.milestones
    : (challenge.steps || []).map((title) => ({ title, done: false })),
  worldWhy: challenge.worldWhy || ({
    moestuin: "Ik onderzoek hoe we samen duurzaam voedsel kunnen verbouwen.",
    podcast: "De podcast combineert verhalen maken met ontmoetingen in de buurt.",
  })[challenge.id] || "",
}));
let todos = loadSaved("agora-todos", [
  { text: "Materialenlijst maken voor de moestuin", done: false, private: false },
  { text: "Vragen bedenken voor het eerste interview", done: true, private: true },
]).map((todo, index) => ({ ...todo, id: todo.id || `todo-${Date.now()}-${index}` }));
let agendaItems = loadSaved("agora-agenda", [
  { date: "2026-11-09", time: "09:30", title: "Startgesprek moestuin", type: "Coachgesprek", private: false },
  { date: "2026-11-11", time: "13:15", title: "Workshop: koken met de seizoenen", type: "Workshop", private: false },
  { date: "2026-11-13", time: "14:00", title: "Werktijd podcast", type: "Challenge", private: true },
]);
let agendaSlots = loadSaved("agora-agenda-slots", []);
let workshopSignups = loadSaved("agora-workshops", []);
let notifications = loadSaved("agora-notifications", [
  { id: "coach-welcome", title: "Een tip van Marit", text: "Mooie start! Vergeet ook te noteren waarom je juist deze planten kiest.", route: "challenge:moestuin", read: false },
]);
let todoDragActive = false;
let activeRoute = "home";
let activeFilter = "Alles";
let notificationsOpen = false;
let selectedChallengeImage = "";
let agendaView = "workweek";
let agendaDate = new Date();
let agendaShowEarlier = false;
let agendaShowLater = false;
let modalReturnFocus = null;
let chatMessages = [
  { text: "Hoi Sam! Hoe gaat het met je moestuinplan?", own: false },
  { text: "Goed! Ik heb al een fijn plekje op het plein gevonden.", own: true },
  { text: "Wat mooi. Neem je je schets mee naar ons gesprek maandag?", own: false },
];

function loadSaved(key, fallback) {
  const saved = localStorage.getItem(key);
  if (!saved) return structuredClone(fallback);
  try {
    return JSON.parse(saved);
  } catch (error) {
    console.error(`De opgeslagen demo-gegevens (${key}) konden niet worden gelezen.`, error);
    return structuredClone(fallback);
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`De demo-gegevens (${key}) konden niet worden opgeslagen.`, error);
    toast("Opslaan is niet gelukt. Controleer of er genoeg ruimte in deze browser is.");
    throw error;
  }
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

function safeDate(value, options = { day: "numeric", month: "short" }) {
  if (!value) return "Nog niet gepland";
  const date = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat("nl-NL", options).format(date);
}

function minutesForTime(time) {
  const [hours, minutes] = String(time).split(":").map(Number);
  return Number.isFinite(hours) && Number.isFinite(minutes) ? hours * 60 + minutes : NaN;
}

function timeForMinutes(minutes) {
  const normalized = ((minutes % 1440) + 1440) % 1440;
  return `${String(Math.floor(normalized / 60)).padStart(2, "0")}:${String(normalized % 60).padStart(2, "0")}`;
}

function agendaItemEndTime(item) {
  const start = minutesForTime(item.time);
  const end = minutesForTime(item.endTime);
  return Number.isFinite(end) && end > start ? item.endTime : timeForMinutes(start + 30);
}

function agendaItemIsPast(item, now = new Date()) {
  const date = new Date(`${item.date}T${agendaItemEndTime(item)}:00`);
  return date.getTime() <= now.getTime();
}

function toast(message) {
  const element = document.createElement("div");
  element.className = "toast";
  element.textContent = message;
  toastRegion.append(element);
  window.setTimeout(() => element.remove(), 3200);
}

function setRoute(route) {
  activeRoute = route;
  notificationsOpen = false;
  sidebar.classList.remove("open");
  render();
  document.querySelector("#app").focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function cardHeading(title, subtitle = "") {
  return `<div class="section-heading"><div><h2>${title}</h2>${subtitle ? `<p>${subtitle}</p>` : ""}</div></div>`;
}

function challengeImage(challenge, className = "") {
  return challenge.imageData
    ? `<img class="${className}" src="${challenge.imageData}" alt="">`
    : `<span class="${className} challenge-image-fallback">${escapeHtml(challenge.icon || "🌿")}</span>`;
}

function isPreparationComplete(challenge) {
  return Boolean(
    challenge.title?.trim()
    && challenge.why?.trim()
    && challenge.learning?.trim()
    && challenge.importance?.trim()
    && challenge.how?.trim()
    && (challenge.milestones?.length || challenge.steps?.length)
    && challenge.selectedWorlds?.length
    && challenge.worldWhy?.trim()
    && challenge.start
    && challenge.end,
  );
}

function challengeRow(challenge) {
  return `<a class="challenge-row" href="#" data-route="challenge:${escapeHtml(challenge.id)}">
    ${challengeImage(challenge, `mini-art ${challenge.color}`)}
    <span><strong class="challenge-title">${escapeHtml(challenge.title)}</strong><span class="challenge-meta">${escapeHtml(challenge.status)} · Eind ${safeDate(challenge.end)}</span></span>
    <span class="progress-wrap"><span class="progress-track"><span class="progress-fill" style="width:${Number(challenge.progress) || 0}%"></span></span><span class="progress-number">${Number(challenge.progress) || 0}%</span></span>
  </a>`;
}

function homePage() {
  const soon = [...agendaItems].sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)).slice(0, 2);
  const recommended = workshops[0];
  return `<div class="welcome-row">
    <div><p class="eyebrow">${safeDate(new Date().toISOString().slice(0, 10), { weekday: "long", day: "numeric", month: "long" })}</p><h1>Hoi Sam, fijn dat je er bent <span aria-hidden="true">🌿</span></h1><p class="welcome-copy">Elke kleine stap brengt je dichter bij iets groots.</p></div>
    <button class="primary-button" type="button" data-action="new-challenge"><span class="icon-plus">＋</span> Nieuwe challenge</button>
  </div>
  <section class="hero-banner">
    <div class="discover-copy"><p class="hero-label">Jouw pad, jouw groei</p><h2>Wat wil jij vandaag ontdekken?</h2><p>Een idee hoeft nog niet perfect te zijn. Begin met een vraag, een workshop of een verhaal dat je nieuwsgierig maakt.</p><button class="primary-button" type="button" data-route="inspiration">Ontdek inspiratie <span>→</span></button></div>
    <div class="discover-pick"><span class="discover-pick-icon">${recommended.icon}</span><div><span class="discover-pick-label">Misschien iets voor jou</span><strong>${escapeHtml(recommended.title)}</strong><small>${safeDate(recommended.date, { weekday: "long", day: "numeric", month: "long" })} · ${escapeHtml(recommended.spots)}</small><button class="discover-pick-link" type="button" data-route="workshops">Bekijk workshop →</button></div></div>
  </section>
  <div class="dashboard-grid">
    <section class="panel"><div class="panel-head"><h2>Waar je aan werkt</h2><button class="text-button" type="button" data-route="challenges">Alle challenges →</button></div><div class="challenge-list">${challenges.slice(0, 3).map(challengeRow).join("")}</div></section>
    <section class="panel"><div class="panel-head"><h2>Dit komt eraan</h2><button class="text-button" type="button" data-route="agenda">Agenda →</button></div><div class="agenda-preview">${soon.map((item) => `<div class="agenda-event"><span class="date-block"><strong>${safeDate(item.date, { day: "numeric" })}</strong><small>${safeDate(item.date, { month: "short" })}</small></span><span><strong class="event-title">${escapeHtml(item.title)}</strong><p class="event-meta">${escapeHtml(item.time)} · ${escapeHtml(item.type)}</p></span></div>`).join("") || `<p class="empty-note">Nog niets gepland.</p>`}</div></section>
  </div>
  <div class="home-bottom"><section class="panel"><div class="panel-head"><h2>Kleine stapjes</h2><button class="text-button" type="button" data-route="agenda">To-do lijst →</button></div><div class="todo-preview">${todos.slice(0, 2).map((todo, index) => `<label class="todo-item ${todo.done ? "done" : ""}"><input type="checkbox" data-todo="${index}" ${todo.done ? "checked" : ""}><span>${escapeHtml(todo.text)}</span></label>`).join("")}</div></section></div>`;
}

function challengesPage() {
  const visible = challenges.filter((challenge) => activeFilter === "Alles" || (activeFilter === "Afgerond" ? challenge.status === "Afgerond" : challenge.status !== "Afgerond"));
  return `<div class="page-heading"><div><p class="eyebrow">Verkennen en groeien</p><h1>Mijn challenges</h1><p>Jouw nieuwsgierigheid is het begin van elke challenge.</p></div><button class="primary-button" type="button" data-action="new-challenge"><span class="icon-plus">＋</span> Nieuwe challenge</button></div>
  <div class="filter-row">${["Alles", "In uitvoering", "Afgerond"].map((filter) => `<button class="filter-chip ${activeFilter === filter ? "active" : ""}" type="button" data-filter="${filter}">${filter}</button>`).join("")}<span class="search-box">⌕ <input id="challengeSearch" placeholder="Zoek een challenge" aria-label="Zoek een challenge"></span></div>
  <div class="cards-grid" id="challengeCards">${visible.map((challenge) => `<article class="feature-card challenge-card" data-search="${escapeHtml(challenge.title.toLowerCase())}">
    <div class="feature-body"><div class="challenge-card-heading"><span class="challenge-card-thumb">${challenge.imageData ? `<img class="challenge-card-image" src="${challenge.imageData}" alt="">` : `<span class="challenge-card-fallback">${escapeHtml(challenge.icon || "🌿")}</span>`}</span><div class="challenge-card-name"><h3>${escapeHtml(challenge.title)}</h3><span class="feature-tag">${escapeHtml(challenge.status)}</span></div></div><p>${escapeHtml(challenge.description)}</p><div class="progress-wrap"><span class="progress-track" style="flex:1"><span class="progress-fill" style="width:${Number(challenge.progress) || 0}%"></span></span><span class="progress-number">${Number(challenge.progress) || 0}%</span></div><div class="card-actions"><span class="card-meta">Eind ${safeDate(challenge.end)}</span><button class="small-button" type="button" data-route="challenge:${escapeHtml(challenge.id)}">Open challenge →</button></div></div>
  </article>`).join("") || `<p class="empty-note">Je hebt nog geen challenges in deze categorie.</p>`}</div>`;
}

function challengeDetailPage(id) {
  const challenge = challenges.find((item) => item.id === id);
  if (!challenge) return `<div class="page-heading"><div><p class="eyebrow">Challenge</p><h1>Challenge niet gevonden</h1><p>Deze challenge bestaat niet (meer).</p></div><button class="secondary-button" data-route="challenges">← Terug naar challenges</button></div>`;
  const logs = challenge.logs || [];
  const milestones = challenge.milestones || [];
  const coachFeedback = challenge.coachFeedback || [];
  const preparationComplete = isPreparationComplete(challenge);
  const challengeComplete = challenge.status === "Afgerond";
  return `<div class="page-heading"><div><button class="text-button" type="button" data-route="challenges">← Mijn challenges</button><div class="challenge-page-title">${challengeImage(challenge, "challenge-title-image")}<div><p class="eyebrow" data-challenge-progress>${escapeHtml(challenge.status)} · ${Number(challenge.progress) || 0}%</p><h1>${escapeHtml(challenge.title)}</h1></div></div><p>${escapeHtml(challenge.description)}</p></div><button class="secondary-button" type="button" data-action="edit-challenge" data-id="${escapeHtml(challenge.id)}">Challenge bewerken</button></div>
  <div class="detail-layout"><div>
    <section class="panel detail-panel"><h2>Voorbereiding</h2><span class="detail-label">Waarom wil ik deze challenge doen?</span><p>${escapeHtml(challenge.why)}</p><span class="detail-label">Wat wil ik leren?</span><p>${escapeHtml(challenge.learning)}</p><span class="detail-label">Waarom is dit belangrijk voor mijn ontwikkeling?</span><p>${escapeHtml(challenge.importance)}</p><h3>Hoe ziet mijn eindproduct eruit?</h3><p>${escapeHtml(challenge.how)}</p><h3>Agora-werelden</h3><p>${(challenge.selectedWorlds || []).map(escapeHtml).join(" · ") || "Nog niet gekozen"}</p>${challenge.worldWhy ? `<span class="detail-label">Waarom passen deze werelden?</span><p>${escapeHtml(challenge.worldWhy)}</p>` : ""}${challenge.participants?.length ? `<span class="detail-label">Samen met</span><p>${challenge.participants.map(escapeHtml).join(", ")}</p>` : ""}<h3>Start- en einddatum</h3><p>${safeDate(challenge.start, { day: "numeric", month: "long", year: "numeric" })} – ${safeDate(challenge.end, { day: "numeric", month: "long", year: "numeric" })}</p><div class="section-heading milestone-heading"><div><h3>Stappenplan & voortgang</h3><p>Vink een stap af wanneer je die hebt bereikt.</p></div><span class="milestone-count" data-milestone-count>${milestones.filter((item) => item.done).length}/${milestones.length}</span></div>${milestones.map((item, index) => `<label class="milestone-item ${item.done ? "done" : ""}"><input type="checkbox" data-milestone="${index}" data-id="${escapeHtml(challenge.id)}" ${item.done ? "checked" : ""}><span>${escapeHtml(item.title)}</span></label>`).join("") || `<p class="empty-note">Voeg stappen toe door je challenge te bewerken.</p>`}<button class="text-button" type="button" data-action="edit-challenge" data-id="${escapeHtml(challenge.id)}">Stappenplan bewerken →</button></section>
    <section class="panel detail-panel"><h2>Logboek</h2><form class="log-form" data-form="log" data-id="${escapeHtml(challenge.id)}"><textarea name="entry" required placeholder="Wat heb je vandaag gedaan? Wat vond je ervan of wat heb je geleerd?"></textarea><button class="small-button" type="submit">＋ Logboek-item toevoegen</button></form><div class="log-entries">${logs.slice().reverse().map((entry) => `<div class="log-entry"><strong>${escapeHtml(entry.date)}</strong><p>${escapeHtml(entry.text)}</p></div>`).join("") || `<p class="empty-note">Je logboek is nog leeg. Elke kleine stap telt.</p>`}</div></section>
    ${preparationComplete ? `<section class="panel detail-panel"><h2>Feedback startgesprek</h2><p>Bespreek je voorbereiding met je coach en noteer hier de feedback.</p><form class="log-form" data-form="start-feedback" data-id="${escapeHtml(challenge.id)}"><textarea name="feedback" placeholder="Wat heb je met je coach besproken?">${escapeHtml(challenge.startFeedback || "")}</textarea><button class="small-button" type="submit">Feedback opslaan</button></form></section>
    <section class="panel detail-panel"><h2>Feedback van je coach</h2>${coachFeedback.map((item) => `<div class="coach-feedback"><span class="coach-feedback-icon">♡</span><div><strong>Marit de Vries <small>${escapeHtml(item.date)}</small></strong><p>${escapeHtml(item.text)}</p></div></div>`).join("") || `<p class="empty-note">Coachfeedback verschijnt hier wanneer je coach een tip deelt.</p>`}<button class="text-button" type="button" data-route="coaching">Naar Coach & feedback →</button></section>` : `<section class="panel detail-panel preparation-hint"><h2>Feedback komt beschikbaar na je voorbereiding</h2><p>Vul alle onderdelen van je voorbereiding in om feedback van je startgesprek en coach te bekijken.</p><button class="secondary-button" type="button" data-action="edit-challenge" data-id="${escapeHtml(challenge.id)}">Voorbereiding aanvullen</button></section>`}
    ${challengeComplete ? `<section class="panel detail-panel"><h2>Reflectie</h2><p>Vul dit in wanneer je challenge is afgerond en bespreek het daarna met je coach.</p><form class="form-grid" data-form="reflection" data-id="${escapeHtml(challenge.id)}">${[
      ["good", "Wat vond je goed gaan?"],
      ["whyGood", "Waar kwam dat door?"],
      ["lessGood", "Wat vond je minder goed gaan?"],
      ["addressed", "Wat heb je daaraan gedaan?"],
      ["learned", "Wat heb je geleerd tijdens deze challenge?"],
      ["selfLearned", "Wat heb je geleerd over jezelf?"],
      ["tips", "Welke tips kreeg je of geef je jezelf voor het reviewgesprek?"],
    ].map(([name, label]) => `<div class="field full"><label for="reflection-${name}">${label}</label><textarea id="reflection-${name}" name="${name}">${escapeHtml(challenge.reflection?.[name] || "")}</textarea></div>`).join("")}<div class="field full"><button class="small-button" type="submit">Reflectie opslaan</button></div></form></section>
    <section class="panel detail-panel"><h2>Reflectiegesprek</h2><p>Bespreek deze onderdelen met je coach. Geef elk onderdeel een score van 1 (basis) tot 4 (helemaal volledig).</p>${Object.entries(rubricDescriptions).map(([item, descriptions]) => `<div class="rubric-row"><label for="rubric-${item}">${item}<span id="rubric-value-${item}">2 / 4</span></label><input id="rubric-${item}" type="range" min="1" max="4" value="2" data-rubric="${item}"><details class="rubric-explanation"><summary>Bekijk scorebeschrijvingen</summary><div class="rubric-levels">${descriptions.map((description, index) => `<span><b>${index + 1}. ${["Basis", "Beter", "Redelijk volledig", "Helemaal volledig"][index]}</b><br>${escapeHtml(description)}</span>`).join("")}</div></details></div>`).join("")}</section>` : ""}
  </div><aside class="detail-aside"><section class="panel detail-panel"><h2>In het kort</h2><span class="detail-label">Voortgang</span><div class="progress-wrap" style="margin:8px 0 18px"><span class="progress-track" style="flex:1"><span class="progress-fill" data-progress-fill style="width:${Number(challenge.progress) || 0}%"></span></span><span class="progress-number" data-progress-number>${Number(challenge.progress) || 0}%</span></div>${challengeComplete ? `<button class="secondary-button" type="button" data-action="reopen-challenge" data-id="${escapeHtml(challenge.id)}">Markeer als in uitvoering</button>` : `<button class="primary-button" type="button" data-action="complete-challenge" data-id="${escapeHtml(challenge.id)}" ${challenge.progress < 100 || !preparationComplete ? "disabled title=\"Vul de voorbereiding in en vink alle stappen af\"" : ""}>Markeer als afgerond</button>`}<span class="detail-label" style="display:block;margin-top:18px">Privé / openbaar</span><p>Je kunt een afgeronde challenge delen met anderen. Je persoonlijke reflecties blijven privé.</p><button class="secondary-button" type="button" data-action="share-challenge">Inspireer anderen!</button></section></aside></div>`;
}

const workshops = [
  { id: "koken", title: "Koken met de seizoenen", date: "2026-11-11", time: "13:15", spots: "4 plekken vrij", icon: "🍲", color: "gold", text: "Ontdek wat er groeit, en maak samen een lekkere maaltijd met lokale ingrediënten." },
  { id: "engels", title: "Engels in gesprek", date: "2026-11-16", time: "10:00", spots: "6 plekken vrij", icon: "💬", color: "blue", text: "Oefen Engels op een ontspannen manier met spelletjes en leuke gespreksonderwerpen." },
  { id: "fruit", title: "Fruit plukken bij de boer", date: "2026-11-20", time: "09:30", spots: "2 plekken vrij", icon: "🍎", color: "rose", text: "Ga mee naar de boomgaard en leer hoe fruit van boom tot bord komt." },
];

function workshopAvailability(workshop) {
  const workshopTime = new Date(`${workshop.date}T${workshop.time}:00`).getTime();
  const nearest = agendaItems
    .filter((item) => item.date === workshop.date)
    .filter((item) => !(item.type === "Workshop" && item.title.toLocaleLowerCase().includes(workshop.title.toLocaleLowerCase())))
    .map((item) => ({ item, gap: Math.abs(new Date(`${item.date}T${item.time}:00`).getTime() - workshopTime) / 60000 }))
    .filter(({ gap }) => Number.isFinite(gap) && gap < 30)
    .sort((a, b) => a.gap - b.gap)[0];
  if (!nearest) return { available: true, message: "Geen afspraken binnen 30 minuten" };
  if (nearest.gap < 1) return { available: false, message: `Valt samen met: ${nearest.item.title}` };
  return {
    available: false,
    message: `${Math.floor(nearest.gap)} min. tussenruimte met: ${nearest.item.title}`,
  };
}

function workshopsPage() {
  return `<div class="page-heading"><div><p class="eyebrow">Samen leren</p><h1>Workshops</h1><p>Probeer iets nieuws. We controleren je agenda en waarschuwen als een afspraak binnen 30 minuten van een workshop ligt.</p></div><span class="privacy-label">Workshops aanmaken: voor coaches</span></div><div class="cards-grid">${workshops.map((workshop) => {
    const signed = workshopSignups.includes(workshop.id);
    const availability = workshopAvailability(workshop);
    return `<article class="feature-card workshop-card"><div class="feature-visual ${workshop.color}"><span class="feature-emoji">${workshop.icon}</span><span class="feature-tag">${escapeHtml(workshop.spots)}</span></div><div class="feature-body"><h3>${escapeHtml(workshop.title)}</h3><p>${escapeHtml(workshop.text)}</p><div class="card-meta"><span>${safeDate(workshop.date, { weekday: "long", day: "numeric", month: "long" })}</span><span>${escapeHtml(workshop.time)}</span></div><div class="availability ${availability.available ? "available" : "conflict"}"><span>${availability.available ? "✓" : "!"}</span><span><strong>${availability.available ? "Volgens je agenda beschikbaar" : "Let op: korte tussenruimte"}</strong><small>${escapeHtml(availability.message)}</small></span></div><div class="card-actions"><span class="card-meta">Begeleider: ${workshop.id === "fruit" ? "Juf Noor" : "Coach Marit"}</span><button class="${signed ? "secondary-button" : "small-button"}" type="button" data-action="signup" data-id="${workshop.id}">${signed ? "Aangemeld ✓" : "Ik doe mee"}</button></div></div></article>`;
  }).join("")}</div>`;
}

const inspirations = [
  { title: "Een kast vol verhalen", author: "Noor · Agora 3", text: "Ik maakte een minibieb voor boeken die anders ongebruikt blijven. Met verhalen uit de buurt erbij.", icon: "📚", color: "", tags: "kunst, buurt, verhalen" },
  { title: "Vogelvriendelijke tuin", author: "Yassin · Agora 2", text: "Welke planten maken onze tuin aantrekkelijk voor vogels en insecten? Ik bouwde ook zelf een voederplek.", icon: "🐦", color: "blue", tags: "natuur, onderzoek, maken" },
  { title: "Een maaltijd voor iedereen", author: "Lotte · Agora 4", text: "Samen met een buurtcentrum bedacht en kookte ik een betaalbare, vegetarische maaltijd.", icon: "🥕", color: "gold", tags: "koken, samen, buurt" },
];

function inspirationPage() {
  return `<div class="page-heading"><div><p class="eyebrow">Ideeën groeien als je ze deelt</p><h1>Inspiratie</h1><p>Bekijk afgeronde challenges van andere leerlingen. Misschien begint hier jouw volgende idee.</p></div></div><div class="cards-grid">${inspirations.map((item, index) => `<article class="feature-card"><div class="feature-visual ${item.color}"><span class="feature-emoji">${item.icon}</span><span class="feature-tag">Afgerond · openbaar</span></div><div class="feature-body"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p><div class="card-meta"><span>${escapeHtml(item.author)}</span><span>${escapeHtml(item.tags)}</span></div><div class="card-actions"><span class="privacy-label">Gedeeld met toestemming</span><button class="small-button" type="button" data-action="copy-inspiration" data-index="${index}">Gebruik als inspiratie ↗</button></div></div></article>`).join("")}</div><div class="coach-note"><span>🌿</span><div><strong>Jouw verhaal kan een ander op weg helpen</strong><p>Een challenge wordt pas hier zichtbaar als jij die na afronding zelf openbaar maakt. Persoonlijke notities en reflecties blijven privé.</p></div></div>`;
}

function agendaPage() {
  const views = [["day", "Dag"], ["workweek", "Werkweek"], ["week", "Week"], ["month", "Maand"], ["year", "Jaar"]];
  const title = agendaRangeTitle();
  const calendar = agendaView === "year"
    ? renderAgendaYear()
    : agendaView === "month"
      ? renderAgendaMonth()
      : agendaView === "workweek"
        ? renderAgendaWorkweek()
      : renderAgendaDays();
  return `<div class="page-heading"><div><p class="eyebrow">Ruimte voor jouw plannen</p><h1>Agenda</h1><p>Plan taken in de vrije momenten en vink ze af zodra je klaar bent.</p></div><div class="heading-actions"><button class="secondary-button" type="button" data-action="new-coaching">♡ Coachgesprek</button><button class="primary-button" type="button" data-action="new-event"><span class="icon-plus">＋</span> Agenda-item</button></div></div>
  <div class="agenda-layout"><section class="panel calendar-panel"><div class="calendar-toolbar"><div class="calendar-navigation"><button class="calendar-nav-button" type="button" data-action="agenda-previous" aria-label="Vorige periode">‹</button><button class="calendar-today-button" type="button" data-action="agenda-today">Vandaag</button><button class="calendar-nav-button" type="button" data-action="agenda-next" aria-label="Volgende periode">›</button><h2>${title}</h2></div><div class="calendar-views" aria-label="Agendaweergave">${views.map(([value, label]) => `<button class="calendar-view-button ${agendaView === value ? "active" : ""}" type="button" data-action="agenda-view" data-view="${value}" aria-pressed="${agendaView === value}">${label}</button>`).join("")}</div></div>${calendar}<div class="calendar-legend"><span><i class="legend-dot routine"></i> Vast dagmoment</span><span><i class="legend-dot planned"></i> Eigen afspraak</span><span><i class="legend-dot planning"></i> Vrij moment · plan taken hier</span></div></section>
  <section class="panel todo-panel ${todoDragActive ? "todo-drag-active" : ""}" data-todo-drop><div class="panel-head"><div><h2>Mijn to-do's</h2><p>Sleep een taak naar een vrij moment of kies Plannen</p></div></div>${todos.map((item, index) => `<div class="todo-item ${item.done ? "done" : ""}" ${item.done ? "" : `draggable="true" data-todo-drag="${escapeHtml(item.id)}" title="Sleep naar een vrij moment in je agenda"`}><input type="checkbox" data-todo="${index}" aria-label="Markeer ${escapeHtml(item.text)} als ${item.done ? "niet afgerond" : "afgerond"}" ${item.done ? "checked" : ""}><span class="todo-text">${escapeHtml(item.text)}</span><button class="privacy-toggle" type="button" data-privacy-toggle="${index}" aria-label="${item.private ? "Maak openbaar" : "Maak privé"}: ${escapeHtml(item.text)}" title="${item.private ? "Privé" : "Openbaar"}">${eyeIcon(item.private)}</button>${item.done ? "" : `<button class="todo-schedule-button" type="button" data-action="schedule-todo" data-id="${escapeHtml(item.id)}">Plannen</button>`}<button class="todo-delete-button" type="button" data-action="delete-todo" data-id="${escapeHtml(item.id)}" aria-label="Verwijder taak: ${escapeHtml(item.text)}" title="Verwijderen">×</button></div>`).join("") || `<p class="empty-note">Nog geen taken. Voeg er een toe!</p>`}<form class="add-todo" data-form="todo"><div class="todo-input-wrap"><input name="text" required placeholder="Nieuwe taak..." aria-label="Nieuwe taak"><button class="new-todo-privacy" type="button" data-new-todo-privacy aria-pressed="false" aria-label="Nieuwe taak is openbaar; maak privé" title="Openbaar">${eyeIcon(false)}</button></div></form><button class="todo-trash" type="button" data-todo-trash hidden aria-label="Verwijder gesleepte taak"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m3 3v7m6-7v7"></path></svg></button></section></div>`;
}

function eyeIcon(isPrivate) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.2-6 9.5-6 9.5 6 9.5 6-3.2 6-9.5 6-9.5-6-9.5-6Z"></path><circle cx="12" cy="12" r="2.8"></circle>${isPrivate ? `<path d="M3 3l18 18"></path>` : ""}</svg>`;
}

const dailyAgendaSchedule = [
  { time: "09:00", title: "Dagstart" },
  { time: "10:40", title: "Pauze + lezen" },
  { time: "12:45", title: "Pauze" },
  { time: "14:30", title: "Dagafsluiting" },
  { time: "14:45", title: "Thuis" },
];

const agendaPlanningTimes = ["09:30", "11:35", "13:15", "14:45"];

function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function startOfWeek(date) {
  const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  return monday;
}

function agendaRangeTitle() {
  if (agendaView === "day") return safeDate(dateKey(agendaDate), { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  if (agendaView === "month") return safeDate(dateKey(agendaDate), { month: "long", year: "numeric" });
  if (agendaView === "year") return String(agendaDate.getFullYear());
  const first = startOfWeek(agendaDate);
  const last = new Date(first);
  last.setDate(first.getDate() + (agendaView === "workweek" ? 4 : 6));
  const firstLabel = safeDate(dateKey(first), { day: "numeric", month: "short" });
  const lastLabel = safeDate(dateKey(last), { day: "numeric", month: "short", year: "numeric" });
  return `${firstLabel} – ${lastLabel}`;
}

function agendaItemsForDate(date) {
  const key = dateKey(date);
  const items = agendaItems
    .map((item, index) => ({ ...item, index, routine: false }))
    .filter((item) => item.date === key);
  if (date.getDay() >= 1 && date.getDay() <= 5) {
    items.push(...dailyAgendaSchedule.map((item) => ({ ...item, date: key, routine: true, private: false })));
    const savedSlots = agendaSlots.filter((slot) => slot.date === key);
    const slotTimes = new Set([
      ...agendaPlanningTimes.filter((time) => !(time === "13:15" && date.getDay() === 3)),
      ...savedSlots.map((slot) => slot.time),
    ]);
    items.push(...[...slotTimes]
      .map((time) => ({
        date: key,
        time,
        title: "",
        type: "Planning",
        slot: true,
        tasks: savedSlots.find((slot) => slot.time === time)?.tasks || [],
        routine: false,
        private: true,
      })));
  }
  return items.sort((a, b) => a.time.localeCompare(b.time) || Number(b.slot) - Number(a.slot));
}

function agendaEventMarkup(item, compact = false, showTime = true, workweekStyle = "") {
  const routine = item.routine;
  const completed = !routine && Boolean(item.done);
  if (item.slot) {
    const tasks = item.tasks.map((task, index) => `<div class="agenda-slot-task ${task.done ? "done" : ""}" draggable="true" data-agenda-drag-task="${index}" data-date="${item.date}" data-time="${item.time}" data-agenda-drop-target="${item.date}" data-drop-time="${item.time}"><label><input type="checkbox" data-agenda-slot-date="${item.date}" data-agenda-slot-time="${item.time}" data-agenda-slot-task="${index}" ${task.done ? "checked" : ""}><span>${escapeHtml(task.text)}</span></label><button class="privacy-toggle agenda-task-privacy" type="button" data-agenda-task-privacy="${index}" data-date="${item.date}" data-time="${item.time}" aria-label="${task.private ? "Maak openbaar" : "Maak privé"}: ${escapeHtml(task.text)}" title="${task.private ? "Privé" : "Openbaar"}">${eyeIcon(Boolean(task.private))}</button><button class="task-move-button" type="button" data-action="move-agenda-task" data-date="${item.date}" data-time="${item.time}" data-index="${index}" aria-label="Verplaats taak: ${escapeHtml(task.text)}">↗</button><button class="task-delete-button" type="button" data-action="delete-agenda-task" data-date="${item.date}" data-time="${item.time}" data-index="${index}" aria-label="Verwijder taak: ${escapeHtml(task.text)}">×</button></div>`).join("");
    const slotKey = `${item.date}-${item.time}`;
    const addTask = `<button class="agenda-add-row" type="button" data-action="add-agenda-entry" data-date="${item.date}" data-time="${item.time}" aria-label="Taak of gebeurtenis toevoegen om ${item.time}"><span class="visually-hidden">Taak of gebeurtenis toevoegen</span></button>`;
    return `<div class="calendar-event planning-slot ${item.tasks.length ? "has-tasks" : "empty-slot"} ${compact ? "compact" : ""}" data-agenda-drop-target="${item.date}" data-drop-time="${item.time}">${showTime ? `<span class="calendar-event-time">${escapeHtml(item.time)}</span>` : ""}<div class="planning-slot-content">${tasks}${addTask}</div></div>`;
  }
  if (routine) {
    return `<button class="calendar-event routine-event routine-event-button ${compact ? "compact" : ""}" type="button" ${workweekStyle ? `style="${workweekStyle}"` : ""} data-action="add-routine-event" data-date="${item.date}" data-time="${item.time}" data-agenda-drop-target="${item.date}" data-drop-time="${item.time}" aria-label="Agenda-item toevoegen bij ${escapeHtml(item.title)} op ${safeDate(item.date, { weekday: "long", day: "numeric", month: "long" })}">${showTime ? `<span class="calendar-event-time">${escapeHtml(item.time)}</span><span class="calendar-event-copy"><strong>${escapeHtml(item.title)}</strong></span>` : ""}</button>`;
  }
  return `<div class="calendar-event planned-event ${item.type === "Workshop" ? "amber" : ""} ${completed ? "completed" : ""} ${!completed && agendaItemIsPast(item) ? "past-agenda-event" : ""} ${workweekStyle ? "workweek-agenda-event" : ""} ${compact ? "compact" : ""}" ${workweekStyle ? `style="${workweekStyle}"` : ""} draggable="true" data-agenda-drag-event="${item.index}" data-agenda-drop-target="${item.date}" data-drop-time="${item.time}">
    ${showTime ? `<span class="calendar-event-time">${escapeHtml(item.time)}–${escapeHtml(agendaItemEndTime(item))}</span>` : ""}<span class="calendar-event-copy"><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.type)} · ${item.private ? "Privé" : "Gedeeld met je coach"}</small></span><button class="event-move-button" type="button" data-action="move-agenda-event" data-index="${item.index}" aria-label="Verplaats ${escapeHtml(item.title)}">Verplaatsen</button>
  </div>`;
}

function renderAgendaWorkweek() {
  const first = startOfWeek(agendaDate);
  const dates = Array.from({ length: 5 }, (_, index) => {
    const date = new Date(first);
    date.setDate(first.getDate() + index);
    return date;
  });
  const itemsByDate = dates.map(agendaItemsForDate);
  const now = new Date();
  const agendaEventsByDate = dates.map((date) => agendaItems
    .map((item, index) => ({ ...item, index }))
    .filter((item) => item.date === dateKey(date)));
  const floorHalfHour = (minute) => Math.floor(minute / 30) * 30;
  const ceilHalfHour = (minute) => Math.ceil(minute / 30) * 30;
  const contentBoundaries = [];
  for (const events of agendaEventsByDate) {
    for (const item of events) contentBoundaries.push(minutesForTime(item.time), minutesForTime(agendaItemEndTime(item)));
  }
  for (const items of itemsByDate) {
    for (const item of items) {
      if (item.slot && item.tasks.length) {
        const slotStart = floorHalfHour(minutesForTime(item.time));
        contentBoundaries.push(slotStart, slotStart + 30);
      }
    }
  }
  const earliest = contentBoundaries.length ? Math.min(...contentBoundaries) : 9 * 60;
  const latest = contentBoundaries.length ? Math.max(...contentBoundaries) : 15 * 60;
  const earlierAvailable = earliest < 9 * 60;
  const laterAvailable = latest > 15 * 60;
  const startMinute = agendaShowEarlier && earlierAvailable ? Math.max(0, floorHalfHour(earliest)) : 9 * 60;
  const endMinute = agendaShowLater && laterAvailable ? Math.min(24 * 60, ceilHalfHour(latest)) : 15 * 60;
  const times = Array.from({ length: Math.max(1, (endMinute - startMinute) / 30) }, (_, index) => timeForMinutes(startMinute + index * 30));
  const rowHeights = times.map((time) => {
    const minute = minutesForTime(time);
    const maxSlotContent = Math.max(0, ...itemsByDate.map((items) => {
      const slots = items.filter((item) => item.slot && floorHalfHour(minutesForTime(item.time)) === minute && item.tasks.length);
      const taskCount = slots.reduce((sum, slot) => sum + slot.tasks.length, 0);
      return taskCount * 50 + slots.length * 24 + 8;
    }));
    return Math.max(48, 34 + maxSlotContent);
  });
  const visibleEventsByDate = agendaEventsByDate.map((events) => events.filter((item) => {
    const start = minutesForTime(item.time);
    const end = minutesForTime(agendaItemEndTime(item));
    return start < endMinute && end > startMinute;
  }));
  const taskTimesByDate = itemsByDate.map((items) => items
    .filter((item) => item.slot && item.tasks.length && minutesForTime(item.time) < endMinute && minutesForTime(item.time) + 30 > startMinute)
    .map((item) => minutesForTime(item.time)));
  const currentMinute = now.getHours() * 60 + now.getMinutes();
  const eventLayoutsByDate = agendaEventsByDate.map((events, dayIndex) => {
    const sorted = visibleEventsByDate[dayIndex].map((item) => ({
      item,
      start: minutesForTime(item.time),
      end: minutesForTime(agendaItemEndTime(item)),
    })).sort((a, b) => a.start - b.start || a.end - b.end);
    let group = [];
    let laneEnds = [];
    let groupEnd = -Infinity;
    const layoutEvent = (entry) => {
      const lane = laneEnds.findIndex((end) => end <= entry.start);
      entry.lane = lane < 0 ? laneEnds.length : lane;
      laneEnds[entry.lane] = entry.end;
      group.push(entry);
      groupEnd = Math.max(groupEnd, entry.end);
    };
    const finishGroup = () => {
      const overlapsTask = group.some((entry) => taskTimesByDate[dayIndex]
        .some((taskMinute) => taskMinute >= entry.start && taskMinute < entry.end));
      const laneCount = laneEnds.length;
      const totalLanes = laneCount + (overlapsTask ? 1 : 0);
      group.forEach((entry) => {
        entry.laneCount = totalLanes;
      });
      group = [];
      laneEnds = [];
      groupEnd = -Infinity;
    };
    for (const entry of sorted) {
      if (group.length && entry.start >= groupEnd) finishGroup();
      layoutEvent(entry);
    }
    if (group.length) finishGroup();
    return sorted.map((entry) => entry);
  });
  const eventsByDateAndTime = eventLayoutsByDate.map((events, dayIndex) => {
    const grouped = new Map();
    for (const { item, start, end, lane, laneCount } of events) {
      const startCell = floorHalfHour(start);
      if (startCell < startMinute || startCell >= endMinute) continue;
      const firstRow = (startCell - startMinute) / 30;
      const lastRow = Math.min(rowHeights.length, Math.max(firstRow + 1, (ceilHalfHour(end) - startMinute) / 30));
      const height = rowHeights.slice(firstRow, lastRow).reduce((sum, value) => sum + value, 0) - 6;
      const width = 100 / laneCount;
      const style = `left:calc(${lane * width}% + 2px);width:calc(${width}% - 4px);height:${Math.max(34, height)}px;`;
      const key = timeForMinutes(startCell);
      const markup = agendaEventMarkup(item, false, true, style);
      grouped.set(key, `${grouped.get(key) || ""}${markup}`);
    }
    return grouped;
  });
  const rows = times.map((time, rowIndex) => {
    const minute = minutesForTime(time);
    const rowEnd = minute + 30;
    const routines = dailyAgendaSchedule.filter((item) => floorHalfHour(minutesForTime(item.time)) === minute);
    const routineNames = [...new Set(routines.map((item) => item.title))];
    const activityMarkup = routineNames.map((title) => title === "Dagafsluiting"
      ? `<span class="activity-label-full">Dagafsluiting</span><span class="activity-label-compact">Dag-afsluiting</span>`
      : title === "Dagstart"
        ? `<span class="activity-label-full">Dagstart</span><span class="activity-label-compact">Dag-start</span>`
        : escapeHtml(title)).join("<br>");
    const activity = `<div class="workweek-activity" role="cell">${activityMarkup}</div>`;
    const dayCells = itemsByDate.map((items, dayIndex) => {
      const date = dateKey(dates[dayIndex]);
      const routineItems = routines.map((routine) => ({ ...routine, date, routine: true }));
      const slots = items.filter((item) => item.slot && floorHalfHour(minutesForTime(item.time)) === minute);
      const tasks = slots.flatMap((slot) => slot.tasks.map((task, index) => ({
        slot,
        task,
        index,
        markup: `<div class="agenda-slot-task ${task.done ? "done" : ""}" draggable="true" data-agenda-drag-task="${index}" data-date="${date}" data-time="${slot.time}" data-agenda-drop-target="${date}" data-drop-time="${time}"><label><input type="checkbox" data-agenda-slot-date="${date}" data-agenda-slot-time="${slot.time}" data-agenda-slot-task="${index}" aria-label="Markeer ${escapeHtml(task.text)} als ${task.done ? "niet afgerond" : "afgerond"}" ${task.done ? "checked" : ""}><span>${escapeHtml(task.text)}</span></label><button class="privacy-toggle agenda-task-privacy" type="button" data-agenda-task-privacy="${index}" data-date="${date}" data-time="${slot.time}" aria-label="${task.private ? "Maak openbaar" : "Maak privé"}: ${escapeHtml(task.text)}" title="${task.private ? "Privé" : "Openbaar"}">${eyeIcon(Boolean(task.private))}</button><button class="task-move-button" type="button" data-action="move-agenda-task" data-date="${date}" data-time="${slot.time}" data-index="${index}" aria-label="Verplaats taak: ${escapeHtml(task.text)}">↗</button><button class="task-delete-button" type="button" data-action="delete-agenda-task" data-date="${date}" data-time="${slot.time}" data-index="${index}" aria-label="Verwijder taak: ${escapeHtml(task.text)}">×</button></div>`,
      })));
      const taskContent = tasks.length
        ? `<div class="workweek-task-layer">${tasks.map((entry) => entry.markup).join("")}${slots.map((slot) => `<button class="agenda-add-row" type="button" data-action="add-agenda-entry" data-date="${date}" data-time="${slot.time}" aria-label="Taak of gebeurtenis toevoegen om ${slot.time}"><span class="visually-hidden">Taak of gebeurtenis toevoegen</span></button>`).join("")}</div>`
        : "";
      const cellAdd = `<button class="agenda-cell-add" type="button" data-action="add-agenda-entry" data-date="${date}" data-time="${time}" aria-label="Taak of gebeurtenis toevoegen op ${safeDate(date, { weekday: "long", day: "numeric", month: "long" })} om ${time}"><span class="visually-hidden">Taak of gebeurtenis toevoegen</span></button>`;
      const routineMarkup = routineItems.map((item) => {
        const offset = (minutesForTime(item.time) - minute) / 30 * rowHeights[rowIndex];
        return agendaEventMarkup(item, true, false, `top:${offset}px;left:2px;right:2px;height:22px;`);
      }).join("");
      const eventMarkup = eventsByDateAndTime[dayIndex].get(time) || "";
      const marker = date === dateKey(now) && currentMinute >= minute && currentMinute < rowEnd
        ? `<div class="agenda-now-marker" aria-hidden="true" style="top:${(currentMinute - minute) / 30 * rowHeights[rowIndex]}px"></div>`
        : "";
      return `<div class="workweek-cell" role="cell" data-agenda-drop-target="${date}" data-drop-time="${time}">${cellAdd}${routineMarkup}${eventMarkup}${taskContent}${marker}</div>`;
    }).join("");
    const rowHeight = rowHeights[rowIndex];
    return `<div class="workweek-row" role="row" style="--row-height:${rowHeight}px"><time class="workweek-grid-time" role="rowheader">${escapeHtml(time)}</time>${activity}${dayCells}</div>`;
  }).join("");
  const headers = `<div class="workweek-header-row" role="row"><span class="workweek-header-cell" role="columnheader">Tijd</span><span class="workweek-header-cell" role="columnheader">Activiteit</span>${dates.map((date) => `<span class="workweek-header-cell" role="columnheader"><strong>${safeDate(dateKey(date), { weekday: "long" })}</strong><small>${safeDate(dateKey(date), { day: "numeric", month: "short" })}</small></span>`).join("")}</div>`;
  const earlierToggle = earlierAvailable ? `<button class="agenda-range-toggle" type="button" data-action="toggle-agenda-earlier" aria-expanded="${agendaShowEarlier}">${agendaShowEarlier ? "Verberg tijden vóór 09:00" : `Toon tijden vóór 09:00 (vanaf ${timeForMinutes(floorHalfHour(earliest))})`}</button>` : "";
  const laterToggle = laterAvailable ? `<button class="agenda-range-toggle" type="button" data-action="toggle-agenda-later" aria-expanded="${agendaShowLater}">${agendaShowLater ? "Verberg tijden na 15:00" : `Toon tijden na 15:00 (tot ${timeForMinutes(ceilHalfHour(latest))})`}</button>` : "";
  return `${earlierToggle}<div class="workweek-scroll" role="region" aria-label="Werkweekagenda, horizontaal scrollbaar" tabindex="0"><div class="workweek-calendar" role="table" aria-label="Werkweekagenda van ${timeForMinutes(startMinute)} tot ${timeForMinutes(endMinute)}">${headers}${rows}</div></div>${laterToggle}`;
}

function renderAgendaDays() {
  const first = agendaView === "day" ? new Date(agendaDate) : startOfWeek(agendaDate);
  const count = agendaView === "day" ? 1 : agendaView === "workweek" ? 5 : 7;
  return `<div class="calendar-days ${count === 1 ? "single-day" : ""} ${count === 5 ? "workweek-days" : ""}">${Array.from({ length: count }, (_, index) => {
    const date = new Date(first);
    date.setDate(first.getDate() + index);
    const items = agendaItemsForDate(date);
    return `<section class="calendar-day-column"><h3><span>${safeDate(dateKey(date), { weekday: "short" })}</span><strong>${safeDate(dateKey(date), { day: "numeric", month: "short" })}</strong></h3><div class="calendar-day-events">${items.map((item) => agendaEventMarkup(item, count > 1)).join("") || `<p class="calendar-empty">Geen momenten</p>`}</div></section>`;
  }).join("")}</div>`;
}

function renderAgendaMonth() {
  const firstDay = new Date(agendaDate.getFullYear(), agendaDate.getMonth(), 1);
  const gridStart = startOfWeek(firstDay);
  const dates = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);
    const events = agendaItemsForDate(date).filter((item) => !item.slot || item.tasks.length);
    return `<div class="month-day ${date.getMonth() === agendaDate.getMonth() ? "" : "outside-month"} ${dateKey(date) === dateKey(new Date()) ? "today" : ""}"><button class="month-day-select" type="button" data-action="agenda-select-day" data-date="${dateKey(date)}" aria-label="Toon agenda voor ${safeDate(dateKey(date), { weekday: "long", day: "numeric", month: "long" })}">${date.getDate()}</button>${events.slice(0, 3).map((item) => item.slot
      ? item.tasks.map((task, index) => `<div class="month-event planned" draggable="true" data-agenda-drag-task="${index}" data-date="${item.date}" data-time="${item.time}" data-agenda-drop-target="${item.date}" data-drop-time="${item.time}"><input type="checkbox" data-agenda-slot-date="${item.date}" data-agenda-slot-time="${item.time}" data-agenda-slot-task="${index}" aria-label="Markeer ${escapeHtml(task.text)} als ${task.done ? "niet afgerond" : "afgerond"}" ${task.done ? "checked" : ""}><span>${escapeHtml(item.time)} ${escapeHtml(task.text)}</span><button class="task-move-button" type="button" data-action="move-agenda-task" data-date="${item.date}" data-time="${item.time}" data-index="${index}" aria-label="Verplaats taak: ${escapeHtml(task.text)}">↗</button><button class="task-delete-button" type="button" data-action="delete-agenda-task" data-date="${item.date}" data-time="${item.time}" data-index="${index}" aria-label="Verwijder taak: ${escapeHtml(task.text)}">×</button></div>`).join("")
      : item.routine
        ? `<button class="month-event routine" type="button" data-action="add-routine-event" data-date="${item.date}" data-time="${item.time}" data-agenda-drop-target="${item.date}" data-drop-time="${item.time}" aria-label="Agenda-item toevoegen bij ${escapeHtml(item.title)}">${escapeHtml(item.time)} ${escapeHtml(item.title)}</button>`
        : `<div class="month-event ${item.type === "Workshop" ? "amber" : "planned"} ${!item.done && agendaItemIsPast(item) ? "past-agenda-event" : ""}" draggable="true" data-agenda-drag-event="${item.index}" data-agenda-drop-target="${item.date}" data-drop-time="${item.time}"><span>${escapeHtml(item.time)}–${escapeHtml(agendaItemEndTime(item))} ${escapeHtml(item.title)}</span><button class="event-move-button" type="button" data-action="move-agenda-event" data-index="${item.index}" aria-label="Verplaats ${escapeHtml(item.title)}">↗</button></div>`).join("")}${events.length > 3 ? `<button class="month-more" type="button" data-action="agenda-select-day" data-date="${dateKey(date)}">+${events.length - 3} meer</button>` : ""}</div>`;
  });
  return `<div class="month-calendar"><div class="month-weekdays">${["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"].map((day) => `<span>${day}</span>`).join("")}</div><div class="month-grid">${dates.join("")}</div></div>`;
}

function renderAgendaYear() {
  return `<div class="year-calendar">${Array.from({ length: 12 }, (_, month) => {
    const first = new Date(agendaDate.getFullYear(), month, 1);
    const offset = (first.getDay() + 6) % 7;
    const days = new Date(agendaDate.getFullYear(), month + 1, 0).getDate();
    return `<button class="year-month" type="button" data-action="agenda-open-month" data-month="${month}" aria-label="Open ${safeDate(dateKey(first), { month: "long" })}"><strong>${safeDate(dateKey(first), { month: "long" })}</strong><span class="year-month-days">${Array.from({ length: offset }, () => `<i></i>`).join("")}${Array.from({ length: days }, (_, day) => {
      const date = new Date(agendaDate.getFullYear(), month, day + 1);
      const hasItems = agendaItemsForDate(date).length > 0;
      return `<i class="${hasItems ? "has-events" : ""}">${day + 1}</i>`;
    }).join("")}</span></button>`;
  }).join("")}</div>`;
}

function coachingPage() {
  const sessions = agendaItems
    .filter((item) => item.type === "Coachgesprek")
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));
  const recentFeedback = challenges.filter(isPreparationComplete).flatMap((challenge) => (challenge.coachFeedback || []).map((item) => ({
    ...item, challengeId: challenge.id, challengeTitle: challenge.title,
  })));
  return `<div class="page-heading"><div><p class="eyebrow">Samen verder groeien</p><h1>Coach & feedback</h1><p>Plan een gesprek en houd coachfeedback bij je challenges bij.</p></div><button class="primary-button" type="button" data-action="new-coaching"><span class="icon-plus">＋</span> Gesprek aanvragen</button></div>
  <div class="coaching-layout">
    <section class="panel"><div class="panel-head"><div><h2>Coachgesprekken</h2><p>Je afspraken met Marit de Vries</p></div></div>${sessions.map((item) => `<article class="session-card"><span class="session-date"><strong>${safeDate(item.date, { day: "numeric" })}</strong><small>${safeDate(item.date, { month: "short" })}</small></span><div class="session-info"><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.time)} · ${item.reminder ? "Herinnering ingesteld" : "Geen herinnering"}</small></div><span class="session-status">${item.date >= new Date().toISOString().slice(0, 10) ? "Gepland" : "Afgerond"}</span></article>`).join("") || `<p class="empty-note">Nog geen coachgesprekken gepland. Vraag hierboven een gesprek aan.</p>`}
      <div class="coach-note"><span>🌿</span><div><strong>Neem je vragen mee</strong><p>Noteer vooraf wat je wilt bespreken. Je kunt je voorbereiding en feedback bewaren bij de bijbehorende challenge.</p></div></div>
    </section>
    <section class="panel feedback-panel"><div class="panel-head"><div><h2>Coachfeedback delen</h2><p>Een tip die bij je challenge bewaard blijft</p></div></div><form class="feedback-form" data-form="coach-feedback"><label class="field"><span>Bij welke challenge hoort dit?</span><select name="challengeId" required>${challenges.map((challenge) => `<option value="${escapeHtml(challenge.id)}">${escapeHtml(challenge.title)}</option>`).join("")}</select></label><label class="field"><span>Feedback of volgende stap</span><textarea name="text" required placeholder="Wat viel op? Wat is een fijne volgende stap?"></textarea></label><button class="small-button" type="submit">Feedback opslaan</button></form>
      <div class="feedback-history"><h3>Recente feedback</h3>${recentFeedback.slice().reverse().map((item) => `<article class="coach-feedback"><span class="coach-feedback-icon">♡</span><div><strong>${escapeHtml(item.challengeTitle)} <small>${escapeHtml(item.date)}</small></strong><p>${escapeHtml(item.text)}</p></div></article>`).join("") || `<p class="empty-note">Opgeslagen feedback verschijnt hier.</p>`}</div>
    </section>
  </div>`;
}

function renderNotifications() {
  const panel = document.querySelector("#notificationPanel");
  const button = document.querySelector(".notification-button");
  const count = document.querySelector("#notificationCount");
  if (!panel || !button || !count) return;
  const reminders = agendaItems
    .filter((item) => item.reminder && !item.reminderRead && item.date >= new Date().toISOString().slice(0, 10))
    .map((item) => ({
      id: `reminder-${item.date}-${item.time}-${item.title}`,
      title: "Herinnering",
      text: `${item.title} · ${safeDate(item.date, { day: "numeric", month: "short" })} om ${item.time}`,
      route: item.type === "Coachgesprek" ? "coaching" : "agenda",
      read: false,
    }));
  const items = [...notifications, ...reminders];
  const unread = items.filter((item) => !item.read).length;
  count.hidden = unread === 0;
  count.textContent = unread > 9 ? "9+" : String(unread);
  button.setAttribute("aria-expanded", String(notificationsOpen));
  panel.hidden = !notificationsOpen;
  panel.innerHTML = `<div class="notification-head"><strong>Meldingen</strong><button class="text-button" type="button" data-action="read-notifications">Alles gelezen</button></div>${items.length ? items.slice().reverse().map((item) => `<button class="notification-item ${item.read ? "read" : ""}" type="button" data-action="open-notification" data-id="${escapeHtml(item.id)}" data-route="${escapeHtml(item.route)}"><span class="notification-icon">${item.id.startsWith("reminder-") ? "◷" : "♡"}</span><span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.text)}</small></span>${item.read ? "" : `<i></i>`}</button>`).join("") : `<p class="empty-note">Je bent helemaal bij 🌱</p>`}<p class="notification-foot">Herinneringen zijn alleen zichtbaar in dit prototype.</p>`;
}

function messagesPage() {
  return `<div class="page-heading"><div><p class="eyebrow">Samen kom je verder</p><h1>Berichten</h1><p>Praat met je coach of stuur elkaar een bericht. Chat is in dit prototype alleen lokaal.</p></div><button class="secondary-button" type="button" data-action="new-group">＋ Nieuwe groep</button></div>
  <div class="messages-layout"><aside class="conversation-list"><h2>Gesprekken</h2><div class="conversation active"><span class="conversation-avatar">M</span><span><strong>Marit de Vries</strong><small>Fijn weekend, Sam!</small></span></div><div class="conversation"><span class="conversation-avatar">🌿</span><span><strong>Moestuin-team</strong><small>Jij: Ik neem zaadjes mee</small></span></div><div class="conversation"><span class="conversation-avatar">J</span><span><strong>Jesse van Dijk</strong><small>Heb je de podcast al gehoord?</small></span></div></aside><section class="chat-window"><div class="chat-header">Marit de Vries <span class="online-dot" style="display:inline-block;margin-left:6px"></span></div><div class="chat-log" id="chatLog">${chatMessages.map((message) => `<div class="chat-bubble ${message.own ? "own" : ""}">${escapeHtml(message.text)}<small>${message.own ? "Jij" : "Marit"} · vandaag</small></div>`).join("")}</div><form class="chat-composer" data-form="message"><input name="text" required placeholder="Typ een bericht..." aria-label="Typ een bericht"><button class="small-button" type="submit">Verstuur</button></form></section></div>`;
}

function portfolioPage() {
  return `<div class="page-heading"><div><p class="eyebrow">Jouw ontwikkeling in beeld</p><h1>Groeiportfolio</h1><p>Bewaar je mooiste werk, inzichten en momenten op één plek.</p></div><button class="secondary-button" type="button" data-action="portfolio-item">＋ Bewijs toevoegen</button></div>
  <section class="portfolio-banner"><h2>Jij bent meer dan één cijfer.</h2><p>Verzamel hier je eindproducten, feedback en reflecties. Zo zie je hoe je groeit — in je challenges, je vaardigheden en je zelfvertrouwen.</p></section>
  <div class="portfolio-grid"><article class="panel portfolio-tile"><span class="tile-icon">🎨</span><h3>Wat ik heb gemaakt</h3><p>Bewaar foto's, documenten, links of presentaties van je eindproducten.</p></article><article class="panel portfolio-tile"><span class="tile-icon">💬</span><h3>Feedback die me helpt</h3><p>Verzamel tips van je coach, klasgenoten en experts.</p></article><article class="panel portfolio-tile"><span class="tile-icon">🌱</span><h3>Mijn groei</h3><p>Kijk terug op wat je hebt geleerd en waar je trots op bent.</p></article></div>
  <div class="coach-note"><span>✨</span><div><strong>Tip: neem ook je kleine successen mee</strong><p>Een eerste poging, een goede vraag of doorzetten toen iets lastig was: dat zijn allemaal stappen in jouw leerproces.</p></div></div>`;
}

function render() {
  const route = activeRoute.split(":")[0];
  const pages = {
    home: ["Overzicht", homePage],
    challenges: ["Challenges", challengesPage],
    workshops: ["Workshops", workshopsPage],
    inspiration: ["Inspiratie", inspirationPage],
    agenda: ["Agenda", agendaPage],
    coaching: ["Coach & feedback", coachingPage],
    messages: ["Berichten", messagesPage],
    portfolio: ["Groeiportfolio", portfolioPage],
  };
  const [label, page] = route === "challenge" ? ["Challenges", null] : (pages[route] || pages.home);
  pageLabel.textContent = label;
  document.querySelectorAll(".nav-link").forEach((link) => link.classList.toggle("active", link.dataset.route === route));
  app.innerHTML = route === "challenge" ? challengeDetailPage(activeRoute.split(":")[1]) : page();
  renderNotifications();
}

function openChallengeModal(existingId = "") {
  const existing = challenges.find((item) => item.id === existingId);
  selectedChallengeImage = existing?.imageData || "";
  modalRoot.innerHTML = `<div class="modal-backdrop" data-action="backdrop-close"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
    <div class="modal-head"><div><h2 id="modalTitle">${existing ? "Challenge bewerken" : "Een nieuwe challenge"}</h2><p>Begin bij je nieuwsgierigheid. Je kunt je plan later altijd aanpassen.</p></div><button class="close-button" type="button" data-action="close-modal" aria-label="Venster sluiten">×</button></div>
    <form data-form="challenge" data-id="${escapeHtml(existingId)}"><div class="form-grid">
      <div class="field full"><label for="challenge-title">Titel van je challenge *</label><input id="challenge-title" name="title" required maxlength="90" value="${escapeHtml(existing?.title || "")}" placeholder="Bijvoorbeeld: een mini-moestuin op het plein"></div>
      <div class="field full"><label for="challenge-image">Afbeelding bij je challenge (optioneel)</label><input id="challenge-image" type="file" accept="image/*"><small class="field-hint">Kies een eigen afbeelding. De afbeelding wordt verkleind en alleen in deze browser opgeslagen.</small><div class="image-preview ${selectedChallengeImage ? "" : "empty"}" id="challengeImagePreview">${selectedChallengeImage ? `<img src="${selectedChallengeImage}" alt="Voorbeeld van de challenge-afbeelding"><button class="small-button" type="button" data-action="remove-challenge-image">Afbeelding verwijderen</button>` : "Nog geen afbeelding gekozen"}</div></div>
      <div class="field full"><label for="challenge-why">Waarom wil je deze challenge doen? *</label><textarea id="challenge-why" name="why" required>${escapeHtml(existing?.why || "")}</textarea></div>
      <div class="field full"><label for="challenge-learning">Wat wil je leren? *</label><textarea id="challenge-learning" name="learning" required>${escapeHtml(existing?.learning || "")}</textarea></div>
      <div class="field full"><label for="challenge-importance">Waarom is dit belangrijk voor jouw ontwikkeling? *</label><textarea id="challenge-importance" name="importance" required>${escapeHtml(existing?.importance || "")}</textarea></div>
      <div class="field full"><label for="challenge-how">Hoe ziet jouw eindproduct er ongeveer uit? *</label><textarea id="challenge-how" name="how" required>${escapeHtml(existing?.how || "")}</textarea></div>
      <div class="field full"><span class="field-label">Bij welke Agora-wereld(en) past jouw challenge? *</span><div class="world-options">${worlds.map((world) => `<label><input type="checkbox" name="worlds" value="${world}" ${(existing?.selectedWorlds || []).includes(world) ? "checked" : ""}>${world}</label>`).join("")}</div></div>
      <div class="field full"><label for="challenge-world-why">Waarom passen deze werelden bij jouw challenge? *</label><textarea id="challenge-world-why" name="worldWhy" required placeholder="Vertel wat jouw challenge met deze werelden te maken heeft.">${escapeHtml(existing?.worldWhy || "")}</textarea></div>
      <div class="field full"><label for="challenge-participants">Klasgenoten die meedoen (optioneel)</label><input id="challenge-participants" name="participants" value="${escapeHtml((existing?.participants || []).join(", "))}" placeholder="Namen, gescheiden door komma's"></div>
      <div class="field"><label for="challenge-start">Geplande startdatum *</label><input id="challenge-start" type="date" name="start" required value="${escapeHtml(existing?.start || "")}"></div>
      <div class="field"><label for="challenge-end">Geplande einddatum *</label><input id="challenge-end" type="date" name="end" required value="${escapeHtml(existing?.end || "")}"></div>
      <div class="field full"><label for="challenge-milestones">Stappenplan & voortgangsmijlpalen * (één stap per regel)</label><textarea class="tall" id="challenge-milestones" name="milestones" required placeholder="Beschrijf de stappen die je gaat zetten, één per regel.">${escapeHtml((existing?.milestones || []).map((item) => item.title).join("\n") || (existing?.steps || []).join("\n"))}</textarea></div>
    </div><div class="modal-actions"><button class="secondary-button" type="button" data-action="close-modal">Annuleren</button><button class="primary-button" type="submit">${existing ? "Wijzigingen opslaan" : "Challenge opslaan"}</button></div></form>
  </section></div>`;
  document.querySelector("#challenge-title").focus();
}

function openEventModal(type = "", date = dateKey(agendaDate), time = "13:00") {
  openAgendaEntryModal(date, time, "event", type, false);
}

function openAgendaEntryModal(date, time, selectedKind = "task", eventType = "", allowTask = true) {
  modalReturnFocus = document.activeElement;
  const endTime = timeForMinutes(minutesForTime(time) + 30);
  const selectedEventType = ["Challenge", "Coachgesprek", "Workshop", "Anders"].includes(eventType) ? eventType : "Anders";
  const kindSelector = allowTask ? `<fieldset class="field full agenda-entry-kind"><legend>Wat wil je toevoegen?</legend><label><input type="radio" name="kind" value="task" ${selectedKind === "task" ? "checked" : ""}> Taak</label><label><input type="radio" name="kind" value="event" ${selectedKind === "event" ? "checked" : ""}> Gebeurtenis</label></fieldset>` : `<input type="hidden" name="kind" value="event">`;
  modalRoot.innerHTML = `<div class="modal-backdrop" data-action="backdrop-close"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="agendaEntryTitle" aria-describedby="agendaEntryDescription" tabindex="-1"><div class="modal-head"><div><h2 id="agendaEntryTitle">Toevoegen aan je agenda</h2><p id="agendaEntryDescription">${allowTask ? "Kies een taak of gebeurtenis. " : "Voeg een agenda-item toe. "}De starttijd staat vast op het gekozen halfuur.</p></div><button class="close-button" type="button" data-action="close-modal" aria-label="Venster sluiten">×</button></div>
  <form data-form="agenda-entry" data-date="${escapeHtml(date)}" data-time="${escapeHtml(time)}"><div class="form-grid">${kindSelector}<div class="field full"><label for="agenda-entry-title">Naam *</label><input id="agenda-entry-title" name="title" required maxlength="100" value="${eventType === "Coachgesprek" ? "Coachgesprek met Marit" : ""}" autocomplete="off"></div><div class="field"><label for="agenda-entry-date">Datum</label><input id="agenda-entry-date" type="date" value="${escapeHtml(date)}" readonly></div><div class="field"><label for="agenda-entry-time">Begintijd</label><input id="agenda-entry-time" type="time" value="${escapeHtml(time)}" readonly></div><div class="field full" data-agenda-event-fields ${selectedKind === "event" ? "" : "hidden"}><label for="agenda-entry-end-time">Eindtijd *</label><input id="agenda-entry-end-time" name="endTime" type="time" value="${escapeHtml(endTime)}" ${selectedKind === "event" ? "required" : ""}></div><div class="field full" data-agenda-event-fields ${selectedKind === "event" ? "" : "hidden"}><label for="agenda-entry-type">Soort gebeurtenis</label><select id="agenda-entry-type" name="eventType"><option ${selectedEventType === "Challenge" ? "selected" : ""}>Challenge</option><option ${selectedEventType === "Coachgesprek" ? "selected" : ""}>Coachgesprek</option><option ${selectedEventType === "Workshop" ? "selected" : ""}>Workshop</option><option ${selectedEventType === "Anders" ? "selected" : ""}>Anders</option></select></div><div class="field full"><span class="field-label">Zichtbaarheid</span><button class="agenda-entry-privacy" type="button" data-new-agenda-entry-privacy aria-pressed="false" aria-label="Openbaar; wijzig naar privé" title="Openbaar">${eyeIcon(false)}<span>Openbaar, gedeeld met je coach</span></button></div><div class="field full" data-agenda-event-fields ${selectedKind === "event" ? "" : "hidden"}><label class="visibility-choice reminder-choice"><input type="checkbox" name="reminder" checked><span><strong>Herinnering sturen</strong><small>De herinnering verschijnt in het meldingenmenu van dit prototype.</small></span></label></div></div><div class="modal-actions"><button class="secondary-button" type="button" data-action="close-modal">Annuleren</button><button class="primary-button" type="submit">Toevoegen</button></div></form></section></div>`;
  document.querySelector("#agenda-entry-title").focus();
}

function openAgendaMoveModal(kind, date, time, index) {
  const task = kind === "task"
    ? agendaSlots.find((slot) => slot.date === date && slot.time === time)?.tasks[index]
    : null;
  const item = kind === "event" ? agendaItems[index] : task;
  if (!item) return;
  modalReturnFocus = document.activeElement;
  modalRoot.innerHTML = `<div class="modal-backdrop" data-action="backdrop-close"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="agendaMoveTitle" tabindex="-1"><div class="modal-head"><div><h2 id="agendaMoveTitle">Agenda-item verplaatsen</h2><p>${escapeHtml(item.title || item.text)} · kies de nieuwe datum en begintijd.</p></div><button class="close-button" type="button" data-action="close-modal" aria-label="Venster sluiten">×</button></div><form data-form="agenda-move" data-kind="${kind}" data-date="${escapeHtml(date)}" data-time="${escapeHtml(time)}" data-index="${index}"><div class="form-grid"><div class="field"><label for="agenda-move-date">Nieuwe datum *</label><input id="agenda-move-date" name="date" type="date" required value="${escapeHtml(date)}"></div><div class="field"><label for="agenda-move-time">Nieuwe begintijd *</label><input id="agenda-move-time" name="time" type="time" required value="${escapeHtml(time)}" step="1800"></div></div><div class="modal-actions"><button class="secondary-button" type="button" data-action="close-modal">Annuleren</button><button class="primary-button" type="submit">Verplaatsen</button></div></form></section></div>`;
  document.querySelector("#agenda-move-date").focus();
}

function openTodoScheduleModal(todoId) {
  const todo = todos.find((item) => item.id === todoId);
  if (!todo || todo.done) return;
  modalReturnFocus = document.activeElement;
  const date = dateKey(agendaDate);
  modalRoot.innerHTML = `<div class="modal-backdrop" data-action="backdrop-close"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="todoScheduleTitle" tabindex="-1"><div class="modal-head"><div><h2 id="todoScheduleTitle">Taak inplannen</h2><p>${escapeHtml(todo.text)} · kies een werkdag en begintijd.</p></div><button class="close-button" type="button" data-action="close-modal" aria-label="Venster sluiten">×</button></div><form data-form="agenda-schedule-todo" data-id="${escapeHtml(todo.id)}"><div class="form-grid"><div class="field"><label for="todo-schedule-date">Datum *</label><input id="todo-schedule-date" name="date" type="date" required value="${date}"></div><div class="field"><label for="todo-schedule-time">Begintijd *</label><input id="todo-schedule-time" name="time" type="time" required value="09:00" step="1800"></div></div><div class="modal-actions"><button class="secondary-button" type="button" data-action="close-modal">Annuleren</button><button class="primary-button" type="submit">Inplannen</button></div></form></section></div>`;
  document.querySelector("#todo-schedule-date").focus();
}

function addAgendaSlotTask(date, time, text, todoId = "", isPrivate = false) {
  let slot = agendaSlots.find((item) => item.date === date && item.time === time);
  if (!slot) {
    slot = { date, time, tasks: [] };
    agendaSlots.push(slot);
  }
  slot.tasks.push({ text, done: false, private: isPrivate, ...(todoId ? { todoId } : {}) });
  save("agora-agenda-slots", agendaSlots);
}

function getAgendaSlot(date, time) {
  let slot = agendaSlots.find((item) => item.date === date && item.time === time);
  if (!slot) {
    slot = { date, time, tasks: [] };
    agendaSlots.push(slot);
  }
  return slot;
}

function isWeekday(date) {
  const day = new Date(`${date}T12:00:00`).getDay();
  return day >= 1 && day <= 5;
}

function closeModal() {
  const returnFocus = modalReturnFocus;
  modalRoot.innerHTML = "";
  selectedChallengeImage = "";
  modalReturnFocus = null;
  if (returnFocus?.isConnected) returnFocus.focus();
}

async function compressChallengeImage(file) {
  if (!file.type.startsWith("image/")) throw new Error("Kies een afbeeldingsbestand.");
  if (file.size > 10 * 1024 * 1024) throw new Error("De afbeelding mag maximaal 10 MB groot zijn.");
  const imageUrl = URL.createObjectURL(file);
  const image = new Image();
  try {
    image.src = imageUrl;
    await image.decode();
    const scale = Math.min(1, 900 / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("De afbeelding kon niet worden verwerkt.");
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    for (const quality of [0.78, 0.66, 0.54, 0.42, 0.3]) {
      const dataUrl = canvas.toDataURL("image/jpeg", quality);
      if (dataUrl.length <= 240000) return dataUrl;
    }
    throw new Error("De afbeelding blijft na verkleinen te groot. Kies een kleinere afbeelding.");
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}

document.addEventListener("click", (event) => {
  const agendaPrivacyToggle = event.target.closest("[data-agenda-task-privacy]");
  if (agendaPrivacyToggle) {
    const slot = agendaSlots.find((item) => item.date === agendaPrivacyToggle.dataset.date && item.time === agendaPrivacyToggle.dataset.time);
    const task = slot?.tasks[Number(agendaPrivacyToggle.dataset.agendaTaskPrivacy)];
    if (!task) return;
    task.private = !task.private;
    save("agora-agenda-slots", agendaSlots);
    render();
    return;
  }
  const agendaTaskPrivacy = event.target.closest("[data-new-agenda-task-privacy]");
  if (agendaTaskPrivacy) {
    const isPrivate = agendaTaskPrivacy.getAttribute("aria-pressed") !== "true";
    agendaTaskPrivacy.setAttribute("aria-pressed", String(isPrivate));
    agendaTaskPrivacy.setAttribute("aria-label", `Taak is ${isPrivate ? "privé" : "openbaar"}; wijzig zichtbaarheid`);
    agendaTaskPrivacy.title = isPrivate ? "Privé" : "Openbaar";
    agendaTaskPrivacy.innerHTML = eyeIcon(isPrivate);
    return;
  }
  const agendaEntryPrivacy = event.target.closest("[data-new-agenda-entry-privacy]");
  if (agendaEntryPrivacy) {
    const isPrivate = agendaEntryPrivacy.getAttribute("aria-pressed") !== "true";
    agendaEntryPrivacy.setAttribute("aria-pressed", String(isPrivate));
    agendaEntryPrivacy.setAttribute("aria-label", `${isPrivate ? "Privé" : "Openbaar"}; wijzig zichtbaarheid`);
    agendaEntryPrivacy.title = isPrivate ? "Privé" : "Openbaar";
    agendaEntryPrivacy.querySelector("span").textContent = isPrivate ? "Privé, alleen zichtbaar voor jou" : "Openbaar, gedeeld met je coach";
    agendaEntryPrivacy.querySelector("svg").outerHTML = eyeIcon(isPrivate);
    return;
  }
  const privacyToggle = event.target.closest("[data-privacy-toggle]");
  if (privacyToggle) {
    const todo = todos[Number(privacyToggle.dataset.privacyToggle)];
    if (!todo) return;
    todo.private = !todo.private;
    save("agora-todos", todos);
    render();
    return;
  }
  const newTodoPrivacy = event.target.closest("[data-new-todo-privacy]");
  if (newTodoPrivacy) {
    const isPrivate = newTodoPrivacy.getAttribute("aria-pressed") !== "true";
    newTodoPrivacy.setAttribute("aria-pressed", String(isPrivate));
    newTodoPrivacy.setAttribute("aria-label", `Nieuwe taak is ${isPrivate ? "privé" : "openbaar"}; wijzig zichtbaarheid`);
    newTodoPrivacy.title = isPrivate ? "Privé" : "Openbaar";
    newTodoPrivacy.innerHTML = eyeIcon(isPrivate);
    return;
  }
  const trashButton = event.target.closest("[data-todo-trash]");
  if (trashButton) return;
  const action = event.target.closest("[data-action]");
  if (action?.dataset.action === "toggle-agenda-earlier") {
    agendaShowEarlier = !agendaShowEarlier;
    render();
    return;
  }
  if (action?.dataset.action === "toggle-agenda-later") {
    agendaShowLater = !agendaShowLater;
    render();
    return;
  }
  if (action?.dataset.action === "agenda-view") {
    agendaView = action.dataset.view;
    render();
    return;
  }
  if (action?.dataset.action === "agenda-previous" || action?.dataset.action === "agenda-next") {
    const direction = action.dataset.action === "agenda-next" ? 1 : -1;
    const date = new Date(agendaDate);
    if (agendaView === "day") date.setDate(date.getDate() + direction);
    else if (agendaView === "workweek") date.setDate(date.getDate() + direction * 7);
    else if (agendaView === "week") date.setDate(date.getDate() + direction * 7);
    else if (agendaView === "month") date.setMonth(date.getMonth() + direction);
    else date.setFullYear(date.getFullYear() + direction);
    agendaDate = date;
    render();
    return;
  }
  if (action?.dataset.action === "agenda-today") {
    agendaDate = new Date();
    render();
    return;
  }
  if (action?.dataset.action === "agenda-select-day") {
    agendaDate = new Date(`${action.dataset.date}T12:00:00`);
    agendaView = "day";
    render();
    return;
  }
  if (action?.dataset.action === "agenda-open-month") {
    agendaDate = new Date(agendaDate.getFullYear(), Number(action.dataset.month), 1);
    agendaView = "month";
    render();
    return;
  }
  if (action?.dataset.action === "toggle-notifications") {
    notificationsOpen = !notificationsOpen;
    renderNotifications();
    return;
  }
  if (action?.dataset.action === "read-notifications") {
    notifications = notifications.map((item) => ({ ...item, read: true }));
    agendaItems = agendaItems.map((item) => item.reminder ? { ...item, reminderRead: true } : item);
    save("agora-notifications", notifications);
    save("agora-agenda", agendaItems);
    renderNotifications();
    return;
  }
  if (action?.dataset.action === "open-notification") {
    const item = [...notifications].find((notification) => notification.id === action.dataset.id);
    if (item) {
      notifications = notifications.map((notification) => notification.id === item.id ? { ...notification, read: true } : notification);
      save("agora-notifications", notifications);
    } else {
      agendaItems = agendaItems.map((agendaItem) => `reminder-${agendaItem.date}-${agendaItem.time}-${agendaItem.title}` === action.dataset.id ? { ...agendaItem, reminderRead: true } : agendaItem);
      save("agora-agenda", agendaItems);
    }
    notificationsOpen = false;
    setRoute(action.dataset.route);
    return;
  }
  const routeLink = event.target.closest("[data-route]");
  if (routeLink) {
    event.preventDefault();
    setRoute(routeLink.dataset.route);
    return;
  }
  if (!action) return;
  if (action.dataset.action === "new-challenge") openChallengeModal();
  if (action.dataset.action === "edit-challenge") openChallengeModal(action.dataset.id);
  if (action.dataset.action === "remove-challenge-image") {
    selectedChallengeImage = "";
    const fileInput = document.querySelector("#challenge-image");
    if (fileInput) fileInput.value = "";
    const preview = document.querySelector("#challengeImagePreview");
    if (preview) {
      preview.classList.add("empty");
      preview.textContent = "Nog geen afbeelding gekozen";
    }
  }
  if (action.dataset.action === "new-event") openEventModal();
  if (action.dataset.action === "new-coaching") openEventModal("Coachgesprek");
  if (action.dataset.action === "add-routine-event") {
    openEventModal("", action.dataset.date, action.dataset.time);
    return;
  }
  if (action.dataset.action === "add-agenda-entry") {
    openAgendaEntryModal(action.dataset.date, action.dataset.time);
    return;
  }
  if (action.dataset.action === "schedule-todo") {
    openTodoScheduleModal(action.dataset.id);
    return;
  }
  if (action.dataset.action === "delete-todo") {
    const todo = todos.find((item) => item.id === action.dataset.id);
    if (!todo) return;
    todos = todos.filter((item) => item.id !== todo.id);
    save("agora-todos", todos);
    render();
    toast("To-do verwijderd.");
    return;
  }
  if (action.dataset.action === "delete-agenda-task") {
    const slot = agendaSlots.find((item) => item.date === action.dataset.date && item.time === action.dataset.time);
    const [task] = slot?.tasks.splice(Number(action.dataset.index), 1) || [];
    if (!task) return;
    if (task.todoId) todos = todos.filter((todo) => todo.id !== task.todoId);
    save("agora-agenda-slots", agendaSlots);
    save("agora-todos", todos);
    render();
    document.querySelector(`[data-action="add-agenda-entry"][data-date="${action.dataset.date}"][data-time="${action.dataset.time}"]`)?.focus();
    toast("Taak uit de agenda verwijderd.");
    return;
  }
  if (action.dataset.action === "move-agenda-task") {
    openAgendaMoveModal("task", action.dataset.date, action.dataset.time, Number(action.dataset.index));
    return;
  }
  if (action.dataset.action === "move-agenda-event") {
    openAgendaMoveModal("event", agendaItems[Number(action.dataset.index)]?.date, agendaItems[Number(action.dataset.index)]?.time, Number(action.dataset.index));
    return;
  }
  if (action.dataset.action === "close-modal") closeModal();
  if (action.dataset.action === "backdrop-close" && event.target === action) closeModal();
  if (action.dataset.action === "signup") {
    const { id } = action.dataset;
    workshopSignups = workshopSignups.includes(id) ? workshopSignups.filter((item) => item !== id) : [...workshopSignups, id];
    save("agora-workshops", workshopSignups);
    render();
    toast(workshopSignups.includes(id) ? "Je staat op de deelnemerslijst (demo)." : "Je aanmelding is verwijderd.");
  }
  if (action.dataset.action === "copy-inspiration") {
    const inspiration = inspirations[Number(action.dataset.index)];
    challenges.push({
      id: `challenge-${Date.now()}`, title: inspiration.title, description: `Mijn eigen versie, geïnspireerd door ${inspiration.author}.`,
      progress: 0, icon: inspiration.icon, color: inspiration.color, status: "Idee", why: "", learning: "", importance: "", how: "", steps: [], selectedWorlds: [], start: "", end: "", logs: [],
    });
    save("agora-challenges", challenges);
    toast("Idee gekopieerd. Geef er nu je eigen draai aan!");
    setRoute("challenges");
  }
  if (action.dataset.action === "share-challenge") toast("Als coach en leerling akkoord zijn, kun je een afgeronde challenge openbaar maken.");
  if (action.dataset.action === "complete-challenge" || action.dataset.action === "reopen-challenge") {
    const challenge = challenges.find((item) => item.id === action.dataset.id);
    if (!challenge) return;
    if (action.dataset.action === "complete-challenge") {
      if (!isPreparationComplete(challenge)) {
        toast("Vul eerst je hele voorbereiding in voordat je de challenge afrondt.");
        return;
      }
      if (!challenge.milestones?.length || challenge.milestones.some((item) => !item.done)) {
        toast("Vink eerst alle stappen in je stappenplan af.");
        return;
      }
      challenge.progress = 100;
      challenge.status = "Afgerond";
      notifications.unshift({
        id: `completed-${Date.now()}`,
        title: "Challenge afgerond",
        text: `Gefeliciteerd met: ${challenge.title}`,
        route: `challenge:${challenge.id}`,
        read: false,
      });
      save("agora-notifications", notifications);
    } else {
      challenge.status = "In uitvoering";
    }
    save("agora-challenges", challenges);
    render();
    toast(action.dataset.action === "complete-challenge" ? "Je challenge is afgerond. Je reflectie is nu beschikbaar." : "Je challenge staat weer op 'In uitvoering'.");
  }
  if (action.dataset.action === "new-group") toast("Groepschats en beheer daarvan werken pas na aansluiting op een beveiligde backend.");
  if (action.dataset.action === "portfolio-item") toast("Bestanden en bewijsstukken toevoegen vraagt om veilige opslag en toegangsrechten.");
});

document.addEventListener("submit", (event) => {
  const form = event.target.closest("form[data-form]");
  if (!form) return;
  event.preventDefault();
  const data = new FormData(form);

  if (form.dataset.form === "challenge") {
    const id = form.dataset.id;
    const old = challenges.find((challenge) => challenge.id === id);
    const steps = String(data.get("milestones")).split(/\r?\n/).map((step) => step.trim()).filter(Boolean);
    if (!data.getAll("worlds").length) {
      toast("Kies minimaal één Agora-wereld voor je voorbereiding.");
      return;
    }
    if (!steps.length) {
      toast("Voeg minimaal één stap toe aan je stappenplan.");
      return;
    }
    const challenge = {
      ...(old || {}),
      id: id || `challenge-${Date.now()}`,
      title: String(data.get("title")).trim(),
      description: String(data.get("why")).trim(),
      progress: old?.progress || 0,
      icon: old?.icon || "🌿",
      color: old?.color || "",
      imageData: selectedChallengeImage,
      status: old?.status || "In uitvoering",
      why: String(data.get("why")).trim(),
      learning: String(data.get("learning")).trim(),
      importance: String(data.get("importance") || "").trim(),
      how: String(data.get("how")).trim(),
      steps,
      selectedWorlds: data.getAll("worlds"),
      worldWhy: String(data.get("worldWhy") || "").trim(),
      milestones: steps.map((title) => {
        const previous = old?.milestones?.find((item) => item.title === title);
        return { title, done: previous?.done || false };
      }),
      participants: String(data.get("participants") || "").split(",").map((name) => name.trim()).filter(Boolean),
      coachFeedback: old?.coachFeedback || [],
      startFeedback: old?.startFeedback || "",
      reflection: old?.reflection || {},
      start: String(data.get("start")),
      end: String(data.get("end")),
      logs: old?.logs || [],
    };
    if (new Date(`${challenge.end}T00:00:00`) < new Date(`${challenge.start}T00:00:00`)) {
      toast("De einddatum kan niet vóór de startdatum liggen.");
      return;
    }
    if (id) challenges = challenges.map((item) => item.id === id ? challenge : item);
    else challenges.unshift(challenge);
    save("agora-challenges", challenges);
    closeModal();
    setRoute(id ? `challenge:${id}` : "challenges");
    toast(id ? "Je challenge is bijgewerkt." : "Je challenge is opgeslagen.");
  }

  if (form.dataset.form === "event") {
    const time = String(data.get("time"));
    const endTime = String(data.get("endTime"));
    if (minutesForTime(endTime) <= minutesForTime(time)) {
      toast("De eindtijd moet na de begintijd liggen.");
      return;
    }
    const item = { date: String(data.get("date")), time, endTime, title: String(data.get("title")).trim(), type: String(data.get("type")), private: data.has("private"), done: false, reminder: data.has("reminder"), reminderRead: false };
    agendaItems.push(item);
    save("agora-agenda", agendaItems);
    if (item.type === "Coachgesprek") {
      notifications.unshift({ id: `session-${Date.now()}`, title: "Coachgesprek gepland", text: `${item.title} · ${safeDate(item.date, { day: "numeric", month: "short" })} om ${item.time}`, route: "coaching", read: false });
      save("agora-notifications", notifications);
    }
    closeModal();
    setRoute(item.type === "Coachgesprek" ? "coaching" : "agenda");
    toast(item.type === "Coachgesprek" ? "Je coachgesprek is ingepland." : "Je agenda-item is toegevoegd.");
  }

  if (form.dataset.form === "agenda-entry") {
    const date = form.dataset.date;
    const time = form.dataset.time;
    const title = String(data.get("title")).trim();
    const isPrivate = form.querySelector("[data-new-agenda-entry-privacy]").getAttribute("aria-pressed") === "true";
    if (data.get("kind") === "task") {
      addAgendaSlotTask(date, time, title, "", isPrivate);
      closeModal();
      render();
      document.querySelector(`[data-action="add-agenda-entry"][data-date="${date}"][data-time="${time}"]`)?.focus();
      toast("Taak aan je agenda toegevoegd.");
      return;
    }
    const endTime = String(data.get("endTime"));
    if (minutesForTime(endTime) <= minutesForTime(time)) {
      toast("De eindtijd moet na de begintijd liggen.");
      form.querySelector("#agenda-entry-end-time").focus();
      return;
    }
    const item = { date, time, endTime, title, type: String(data.get("eventType")), private: isPrivate, done: false, reminder: data.has("reminder"), reminderRead: false };
    agendaItems.push(item);
    save("agora-agenda", agendaItems);
    if (item.type === "Coachgesprek") {
      notifications.unshift({ id: `session-${Date.now()}`, title: "Coachgesprek gepland", text: `${item.title} · ${safeDate(item.date, { day: "numeric", month: "short" })} om ${item.time}`, route: "coaching", read: false });
      save("agora-notifications", notifications);
    }
    closeModal();
    setRoute(activeRoute === "coaching" && item.type === "Coachgesprek" ? "coaching" : "agenda");
    document.querySelector("#app")?.focus();
    toast(item.type === "Coachgesprek" ? "Je coachgesprek is ingepland." : "Je agenda-item is toegevoegd.");
    return;
  }

  if (form.dataset.form === "agenda-schedule-todo") {
    const todo = todos.find((item) => item.id === form.dataset.id);
    if (!todo || todo.done) {
      toast("Deze to-do is niet meer beschikbaar om in te plannen.");
      closeModal();
      render();
      return;
    }
    const date = String(data.get("date"));
    const time = String(data.get("time"));
    if (!isWeekday(date)) {
      toast("Taken kunnen alleen op een werkdag worden ingepland.");
      form.querySelector("#todo-schedule-date").focus();
      return;
    }
    addAgendaSlotTask(date, time, todo.text, todo.id, todo.private);
    todo.done = true;
    save("agora-todos", todos);
    closeModal();
    render();
    document.querySelector(`[data-action="add-agenda-entry"][data-date="${date}"][data-time="${time}"]`)?.focus();
    toast("Taak ingepland en afgevinkt bij Mijn to-do's.");
    return;
  }

  if (form.dataset.form === "agenda-move") {
    const kind = form.dataset.kind;
    const sourceDate = form.dataset.date;
    const sourceTime = form.dataset.time;
    const index = Number(form.dataset.index);
    const destinationDate = String(data.get("date"));
    const destinationTime = String(data.get("time"));
    if (kind === "task") {
      if (!isWeekday(destinationDate)) {
        toast("Taken kunnen alleen op een werkdag worden ingepland.");
        form.querySelector("#agenda-move-date").focus();
        return;
      }
      const sourceSlot = agendaSlots.find((slot) => slot.date === sourceDate && slot.time === sourceTime);
      const [task] = sourceSlot?.tasks.splice(index, 1) || [];
      if (!task) {
        toast("Deze taak kon niet worden gevonden.");
        closeModal();
        render();
        return;
      }
      let destinationSlot = agendaSlots.find((slot) => slot.date === destinationDate && slot.time === destinationTime);
      if (!destinationSlot) {
        destinationSlot = { date: destinationDate, time: destinationTime, tasks: [] };
        agendaSlots.push(destinationSlot);
      }
      destinationSlot.tasks.push(task);
      save("agora-agenda-slots", agendaSlots);
      closeModal();
      render();
      document.querySelector(`[data-action="add-agenda-entry"][data-date="${destinationDate}"][data-time="${destinationTime}"]`)?.focus();
      toast("Taak naar het gekozen moment verplaatst.");
      return;
    }
    const item = agendaItems[index];
    if (!item) {
      toast("Dit agenda-item kon niet worden gevonden.");
      closeModal();
      render();
      return;
    }
    if (item.type === "Workshop" && !window.confirm(`Wil je de workshop "${item.title}" verplaatsen?`)) return;
    const duration = minutesForTime(agendaItemEndTime(item)) - minutesForTime(item.time);
    agendaItems[index] = { ...item, date: destinationDate, time: destinationTime, endTime: timeForMinutes(minutesForTime(destinationTime) + duration) };
    save("agora-agenda", agendaItems);
    closeModal();
    render();
    document.querySelector(`[data-action="move-agenda-event"][data-index="${index}"]`)?.focus();
    toast("Agenda-item naar het gekozen moment verplaatst.");
    return;
  }

  if (form.dataset.form === "todo") {
    const isPrivate = form.querySelector("[data-new-todo-privacy]").getAttribute("aria-pressed") === "true";
    todos.push({ id: `todo-${Date.now()}`, text: String(data.get("text")).trim(), done: false, private: isPrivate });
    save("agora-todos", todos);
    render();
    toast("Taak toegevoegd aan je persoonlijke lijst.");
  }

  if (form.dataset.form === "log") {
    const challenge = challenges.find((item) => item.id === form.dataset.id);
    if (!challenge) return;
    challenge.logs ||= [];
    challenge.logs.push({ date: safeDate(new Date().toISOString().slice(0, 10), { day: "numeric", month: "long" }), text: String(data.get("entry")).trim() });
    save("agora-challenges", challenges);
    render();
    toast("Je logboek-item is toegevoegd.");
  }

  if (form.dataset.form === "start-feedback") {
    const challenge = challenges.find((item) => item.id === form.dataset.id);
    if (!challenge) return;
    challenge.startFeedback = String(data.get("feedback") || "").trim();
    save("agora-challenges", challenges);
    render();
    toast("Feedback van het startgesprek is opgeslagen.");
  }

  if (form.dataset.form === "reflection") {
    const challenge = challenges.find((item) => item.id === form.dataset.id);
    if (!challenge) return;
    challenge.reflection = Object.fromEntries([...data.entries()].map(([key, value]) => [key, String(value).trim()]));
    save("agora-challenges", challenges);
    render();
    toast("Je reflectie is opgeslagen.");
  }

  if (form.dataset.form === "coach-feedback") {
    const challenge = challenges.find((item) => item.id === data.get("challengeId"));
    if (!challenge) return;
    const text = String(data.get("text")).trim();
    const date = safeDate(new Date().toISOString().slice(0, 10), { day: "numeric", month: "long" });
    challenge.coachFeedback ||= [];
    challenge.coachFeedback.push({ date, text });
    notifications.unshift({
      id: `feedback-${Date.now()}`,
      title: "Nieuwe feedback van Marit",
      text: `Een tip voor ${challenge.title}`,
      route: `challenge:${challenge.id}`,
      read: false,
    });
    save("agora-challenges", challenges);
    save("agora-notifications", notifications);
    render();
    toast("Coachfeedback is opgeslagen bij de challenge.");
  }

  if (form.dataset.form === "message") {
    chatMessages.push({ text: String(data.get("text")).trim(), own: true });
    render();
    document.querySelector("#chatLog")?.scrollTo({ top: document.querySelector("#chatLog").scrollHeight, behavior: "smooth" });
  }
});

document.addEventListener("change", (event) => {
  if (event.target.matches('input[name="kind"]') && event.target.closest('form[data-form="agenda-entry"]')) {
    const form = event.target.closest('form[data-form="agenda-entry"]');
    const isEvent = event.target.value === "event";
    form.querySelectorAll("[data-agenda-event-fields]").forEach((field) => {
      field.hidden = !isEvent;
    });
    const endTime = form.querySelector("#agenda-entry-end-time");
    endTime.required = isEvent;
    return;
  }
  if (event.target.matches("[data-agenda-slot-task]")) {
    const slot = agendaSlots.find((item) => item.date === event.target.dataset.agendaSlotDate && item.time === event.target.dataset.agendaSlotTime);
    const task = slot?.tasks[Number(event.target.dataset.agendaSlotTask)];
    if (!task) return;
    task.done = event.target.checked;
    save("agora-agenda-slots", agendaSlots);
    render();
    return;
  }
  if (event.target.matches("[data-agenda-done]")) {
    const index = Number(event.target.dataset.agendaDone);
    if (!agendaItems[index]) return;
    agendaItems[index].done = event.target.checked;
    save("agora-agenda", agendaItems);
    render();
    toast(event.target.checked ? "Agenda-item afgevinkt als afgerond." : "Agenda-item staat weer open.");
  }
  if (event.target.matches("[data-todo]")) {
    const index = Number(event.target.dataset.todo);
    if (!todos[index]) return;
    todos[index].done = event.target.checked;
    save("agora-todos", todos);
    render();
  }
  if (event.target.id === "challenge-image" && event.target.files?.[0]) {
    const file = event.target.files[0];
    compressChallengeImage(file).then((imageData) => {
      selectedChallengeImage = imageData;
      const preview = document.querySelector("#challengeImagePreview");
      preview.classList.remove("empty");
      preview.innerHTML = `<img src="${imageData}" alt="Voorbeeld van de challenge-afbeelding"><button class="small-button" type="button" data-action="remove-challenge-image">Afbeelding verwijderen</button>`;
    }).catch((error) => {
      console.error("Challenge-afbeelding uploaden is niet gelukt.", error);
      toast(error.message || "De afbeelding kon niet worden geladen.");
      event.target.value = "";
    });
  }
  if (event.target.matches("[data-rubric]")) {
    const label = event.target.dataset.rubric;
    document.querySelector(`#rubric-value-${CSS.escape(label)}`).textContent = `${event.target.value} / 4`;
  }
  if (event.target.matches("[data-milestone]")) {
    const challenge = challenges.find((item) => item.id === event.target.dataset.id);
    if (!challenge?.milestones?.[Number(event.target.dataset.milestone)]) return;
    challenge.milestones[Number(event.target.dataset.milestone)].done = event.target.checked;
    const completed = challenge.milestones.filter((item) => item.done).length;
    challenge.progress = challenge.milestones.length ? Math.round((completed / challenge.milestones.length) * 100) : 0;
    event.target.closest(".milestone-item").classList.toggle("done", event.target.checked);
    document.querySelector("[data-milestone-count]").textContent = `${completed}/${challenge.milestones.length}`;
    document.querySelector("[data-challenge-progress]").textContent = `${challenge.status} · ${challenge.progress}%`;
    document.querySelector("[data-progress-fill]").style.width = `${challenge.progress}%`;
    document.querySelector("[data-progress-number]").textContent = `${challenge.progress}%`;
    const completeButton = document.querySelector("[data-action='complete-challenge']");
    if (completeButton) completeButton.disabled = challenge.progress < 100 || !isPreparationComplete(challenge);
    save("agora-challenges", challenges);
    toast(challenge.progress === 100 ? "Alle stappen zijn afgevinkt. Je kunt de challenge afronden." : "Je voortgang is bijgewerkt.");
  }
});

document.addEventListener("dragstart", (event) => {
  const todo = event.target.closest("[data-todo-drag]");
  const agendaTask = event.target.closest("[data-agenda-drag-task]");
  const agendaEvent = event.target.closest("[data-agenda-drag-event]");
  if (todo && !todo.classList.contains("done")) {
    event.dataTransfer.setData("application/x-agora-todo", todo.dataset.todoDrag);
    event.dataTransfer.effectAllowed = "move";
    todo.classList.add("dragging");
    todoDragActive = true;
    document.querySelector(".todo-panel")?.classList.add("todo-drag-active");
    const trash = document.querySelector("[data-todo-trash]");
    if (trash) trash.hidden = false;
  } else if (agendaTask) {
    event.dataTransfer.setData("application/x-agora-agenda-task", JSON.stringify({
      date: agendaTask.dataset.date,
      time: agendaTask.dataset.time,
      index: Number(agendaTask.dataset.agendaDragTask),
    }));
    event.dataTransfer.effectAllowed = "move";
    agendaTask.classList.add("dragging");
    todoDragActive = true;
    document.querySelector(".todo-panel")?.classList.add("todo-drag-active");
    const trash = document.querySelector("[data-todo-trash]");
    if (trash) trash.hidden = false;
  } else if (agendaEvent) {
    event.dataTransfer.setData("application/x-agora-agenda-event", agendaEvent.dataset.agendaDragEvent);
    event.dataTransfer.effectAllowed = "move";
    agendaEvent.classList.add("dragging");
  }
});

document.addEventListener("dragend", (event) => {
  event.target.closest("[draggable='true']")?.classList.remove("dragging");
  document.querySelectorAll(".drop-target").forEach((target) => target.classList.remove("drop-target"));
  todoDragActive = false;
  document.querySelector(".todo-panel")?.classList.remove("todo-drag-active", "trash-drop-target");
  const trash = document.querySelector("[data-todo-trash]");
  if (trash) trash.hidden = true;
});

function agendaDropTargetAtPoint(event) {
  const workweek = event.target.closest(".workweek-calendar");
  if (workweek) {
    const cell = [...workweek.querySelectorAll(".workweek-cell[data-agenda-drop-target]")]
      .find((target) => {
        const bounds = target.getBoundingClientRect();
        return event.clientX >= bounds.left && event.clientX < bounds.right
          && event.clientY >= bounds.top && event.clientY < bounds.bottom;
      });
    if (cell) return cell;
  }
  return event.target.closest(".workweek-cell[data-agenda-drop-target]") || event.target.closest("[data-agenda-drop-target]");
}

document.addEventListener("dragover", (event) => {
  const agendaTarget = agendaDropTargetAtPoint(event);
  const todoTarget = event.target.closest("[data-todo-drop]");
  const trashTarget = event.target.closest("[data-todo-trash]");
  const agendaDrag = event.dataTransfer.types.includes("application/x-agora-agenda-task");
  const todoDrag = event.dataTransfer.types.includes("application/x-agora-todo");
  const eventDrag = event.dataTransfer.types.includes("application/x-agora-agenda-event");
  if (trashTarget && (agendaDrag || todoDrag)) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    trashTarget.classList.add("drop-target");
  } else if (agendaTarget && (agendaDrag || todoDrag || eventDrag)) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    agendaTarget.classList.add("drop-target");
  } else if (todoTarget && agendaDrag) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    todoTarget.classList.add("drop-target");
  }
});

document.addEventListener("dragleave", (event) => {
  const target = event.target.closest(".drop-target");
  if (target && !target.contains(event.relatedTarget)) target.classList.remove("drop-target");
});

document.addEventListener("drop", (event) => {
  const agendaTarget = agendaDropTargetAtPoint(event);
  const todoTarget = event.target.closest("[data-todo-drop]");
  const trashTarget = event.target.closest("[data-todo-trash]");
  if (trashTarget && event.dataTransfer.types.includes("application/x-agora-todo")) {
    event.preventDefault();
    const todoId = event.dataTransfer.getData("application/x-agora-todo");
    const count = todos.length;
    todos = todos.filter((item) => item.id !== todoId);
    if (todos.length === count) return;
    save("agora-todos", todos);
    render();
    toast("To-do verwijderd.");
    return;
  }
  if (trashTarget && event.dataTransfer.types.includes("application/x-agora-agenda-task")) {
    event.preventDefault();
    const source = JSON.parse(event.dataTransfer.getData("application/x-agora-agenda-task"));
    const sourceSlot = agendaSlots.find((slot) => slot.date === source.date && slot.time === source.time);
    const [task] = sourceSlot?.tasks.splice(source.index, 1) || [];
    if (!task) return;
    if (task.todoId) todos = todos.filter((todo) => todo.id !== task.todoId);
    save("agora-agenda-slots", agendaSlots);
    save("agora-todos", todos);
    render();
    toast("Taak uit de agenda verwijderd.");
    return;
  }
  if (agendaTarget && event.dataTransfer.types.includes("application/x-agora-todo")) {
    event.preventDefault();
    const todo = todos.find((item) => item.id === event.dataTransfer.getData("application/x-agora-todo"));
    if (!todo || todo.done) return;
    addAgendaSlotTask(agendaTarget.dataset.agendaDropTarget, agendaTarget.dataset.dropTime, todo.text, todo.id, todo.private);
    todo.done = true;
    save("agora-todos", todos);
    render();
    toast("Taak ingepland en afgevinkt bij Mijn to-do's.");
    return;
  }
  if (agendaTarget && event.dataTransfer.types.includes("application/x-agora-agenda-task")) {
    event.preventDefault();
    const source = JSON.parse(event.dataTransfer.getData("application/x-agora-agenda-task"));
    const sourceSlot = agendaSlots.find((slot) => slot.date === source.date && slot.time === source.time);
    const task = sourceSlot?.tasks[source.index];
    if (!task || (source.date === agendaTarget.dataset.agendaDropTarget && source.time === agendaTarget.dataset.dropTime)) return;
    sourceSlot.tasks.splice(source.index, 1);
    getAgendaSlot(agendaTarget.dataset.agendaDropTarget, agendaTarget.dataset.dropTime).tasks.push(task);
    save("agora-agenda-slots", agendaSlots);
    render();
    toast("Taak naar een ander agendamoment verplaatst.");
    return;
  }
  if (agendaTarget && event.dataTransfer.types.includes("application/x-agora-agenda-event")) {
    event.preventDefault();
    const index = Number(event.dataTransfer.getData("application/x-agora-agenda-event"));
    const item = agendaItems[index];
    const date = agendaTarget.dataset.agendaDropTarget;
    const time = agendaTarget.dataset.dropTime;
    if (!item || (item.date === date && item.time === time)) return;
    if (item.type === "Workshop" && !window.confirm(`Weet je zeker dat je de workshop "${item.title}" wilt verplaatsen?`)) {
      toast("De workshop is niet verplaatst.");
      return;
    }
    const [movedItem] = agendaItems.splice(index, 1);
    const duration = minutesForTime(agendaItemEndTime(movedItem)) - minutesForTime(movedItem.time);
    movedItem.date = date;
    movedItem.time = time;
    movedItem.endTime = timeForMinutes(minutesForTime(time) + duration);
    agendaItems.push(movedItem);
    if (isWeekday(item.date) && !agendaItems.some((agendaItem) => agendaItem.date === item.date && agendaItem.time === item.time)) {
      getAgendaSlot(item.date, item.time);
      save("agora-agenda-slots", agendaSlots);
    }
    save("agora-agenda", agendaItems);
    render();
    toast("Agenda-item naar een ander moment verplaatst.");
    return;
  }
  if (todoTarget && event.dataTransfer.types.includes("application/x-agora-agenda-task")) {
    event.preventDefault();
    const source = JSON.parse(event.dataTransfer.getData("application/x-agora-agenda-task"));
    const sourceSlot = agendaSlots.find((slot) => slot.date === source.date && slot.time === source.time);
    const [task] = sourceSlot?.tasks.splice(source.index, 1) || [];
    if (!task) return;
    const matchingTodos = todos.filter((item) => item.id === task.todoId || item.text === task.text);
    const todo = matchingTodos[0];
    if (todo) {
      todo.done = false;
      todo.private = Boolean(task.private);
      todos = todos.filter((item) => item.id === todo.id || item.text !== task.text);
    } else {
      todos.push({ id: `todo-${Date.now()}`, text: task.text, done: false, private: Boolean(task.private) });
    }
    save("agora-agenda-slots", agendaSlots);
    save("agora-todos", todos);
    render();
    toast("Taak teruggezet in Mijn to-do's.");
  }
});

document.addEventListener("input", (event) => {
  if (event.target.id === "challengeSearch") {
    const query = event.target.value.trim().toLowerCase();
    document.querySelectorAll(".challenge-card").forEach((card) => {
      card.hidden = !card.dataset.search.includes(query);
    });
  }
});

document.addEventListener("click", (event) => {
  const filter = event.target.closest("[data-filter]");
  if (filter) {
    activeFilter = filter.dataset.filter;
    render();
  }
});

document.querySelector("#menuToggle").addEventListener("click", () => sidebar.classList.toggle("open"));
themeToggle.addEventListener("click", () => {
  const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("agora-theme", theme);
  setTheme(theme);
});
document.addEventListener("keydown", (event) => {
  const dialog = modalRoot.querySelector('[role="dialog"]');
  if (!dialog) return;
  if (event.key === "Escape") {
    event.preventDefault();
    closeModal();
    return;
  }
  if (event.key !== "Tab") return;
  const focusable = [...dialog.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')]
    .filter((element) => !element.closest("[hidden]") && element.getClientRects().length);
  if (!focusable.length) {
    event.preventDefault();
    dialog.focus();
    return;
  }
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
    event.preventDefault();
    first.focus();
  }
});

render();
