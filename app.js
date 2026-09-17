/**
 * Junior Dev Scaffolding & Client Requirement Exam Simulator
 * Pure Vanilla ES6 JavaScript
 */

(function () {
  'use strict';

  // --- Scenario Database & Question Repository ---
  const DRILL_SCENARIOS = {
    'drill-1': {
      id: 'drill-1',
      title: 'Artisan Coffee & Pastry Shop ("Kape Kultura")',
      chip: 'CLIENT BRIEF // DRILL 01',
      clientName: 'Kape Kultura Specialty Cafe',
      rawText: 'We are "Kape Kultura", a local specialty cafe. We need a landing page to showcase our brand story, display our menu of 12 signature brewed drinks and 6 daily pastries, and let customers locate our physical branch with our opening hours. We want it to look warm, modern, and clean. All menu items must be seen on one page, and people on their phones should easily find our address and operating schedule.',
      highlightedHtml: 'We are "Kape Kultura", a local specialty cafe. We need a landing page to <mark class="clue-highlight">showcase our brand story</mark>, <mark class="clue-highlight">display our menu of 12 signature brewed drinks and 6 daily pastries</mark>, and <mark class="clue-highlight">let customers locate our physical branch with our opening hours</mark>. We want it to look <mark class="clue-highlight">warm, modern, and clean</mark>. All menu items must be <mark class="clue-highlight">seen on one page</mark>, and <mark class="clue-highlight">people on their phones should easily find our address and operating schedule</mark>.',
      constraints: [
        'Content: Story + 12 Drinks + 6 Pastries + Location/Hours',
        'Scope: Informational Showcase Only (No cart / checkout)',
        'Viewport: Mobile accessibility prioritized for address & hours',
        'Aesthetics: Vague descriptors ("warm, modern, clean")'
      ],
      questions: [
        {
          id: 'd1_q1',
          number: 'Q1',
          topic: 'Requirement Completeness & Sufficiency',
          prompt: "Are the client's requirements sufficient to begin visual CSS styling and color selection? Explain why or why not using clues from the scenario.",
          verdictType: 'insufficient',
          verdictText: 'NOT ENOUGH (INSUFFICIENT SPECIFICATION)',
          verdictSummary: "The client uses subjective emotional descriptors without technical branding assets or contrast constraints.",
          evidence: "The brief states only that the cafe wants a 'warm, modern, and clean' aesthetic without providing an approved brand guide, exact hex/HSL palette, typography scale, or contrast targets.",
          rationale: "Engineering standards require objective color definitions tested for WCAG 2.1 AA/AAA accessibility (minimum 4.5:1 text-to-background contrast). Starting CSS styling based on emotional adjectives leads to visual inconsistency, rework, and accessibility failures.",
          trap: 'DO NOT hallucinate or assume colors like: "Yes, it is enough because coffee is brown and warm, so we can use #8B4513 brown and cream colors." Engineers never guess brand palettes.',
          rubric: [
            'Clearly stated verdict: NOT ENOUGH / INSUFFICIENT.',
            'Identified subjective phrase ("warm, modern, and clean") as non-technical.',
            'Cited missing requirements: exact color codes, font assets, WCAG contrast standards.',
            'Avoided inventing colors or assuming cafe themes.'
          ]
        },
        {
          id: 'd1_q2',
          number: 'Q2',
          topic: 'Semantic HTML5 Scaffolding',
          prompt: "Based solely on the scenario, scaffold the semantic HTML document outline. Identify what goes into <header>, <main>, and its distinct child sections.",
          verdictType: 'standards',
          verdictText: 'SEMANTIC LANDMARK SCAFFOLDING',
          verdictSummary: "Single <main> container with three thematic <section> elements, each with an explicit heading.",
          evidence: "The brief explicitly requests 3 content groups: 1) Brand story, 2) Menu of 12 drinks & 6 pastries, 3) Physical branch location & opening hours.",
          rationale: "W3C HTML5 best practices mandate a single <main> landmark. The header contains branding/logo and <nav> with anchor links. Inside <main>, we scaffold three <section> tags each headed by an <h2>: <section id=\"story\">, <section id=\"menu\">, and <section id=\"location\">. Footer holds legal and copyright details.",
          trap: 'DO NOT add <section id="online-ordering">, <form id="checkout">, or user login blocks. The client never requested transactions.',
          rubric: [
            'Included <header> with <nav> links to the 3 sections.',
            'Scaffolded exactly one <main> landmark.',
            'Created 3 distinct <section> elements with corresponding <h2> headings.',
            'Refused to add shopping cart, user auth, or checkout containers.'
          ]
        },
        {
          id: 'd1_q3',
          number: 'Q3',
          topic: 'CSS Layout Architecture',
          prompt: "For the menu of 12 drinks and 6 pastries, would you propose CSS Grid or Flexbox? Defend your answer based on standards and responsiveness.",
          verdictType: 'grid',
          verdictText: 'PROPOSE CSS GRID (WITH INTERNAL FLEXBOX)',
          verdictSummary: "CSS Grid for the 2D product catalog matrix; Flexbox for 1D card internals.",
          evidence: "The scenario requires 18 discrete items (12 drinks + 6 pastries) to be displayed on one page with structured alignment across rows and columns.",
          rationale: "CSS Grid is inherently two-dimensional (handling both rows and columns simultaneously), allowing auto-fit responsive tracks (`grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))`) that keep all cards aligned uniformly. Flexbox is 1D and better suited inside individual menu item cards to align item title, description, and price.",
          trap: 'DO NOT choose Flexbox for the entire catalog just because "it is easier". Flexbox requires manual wrapping and width math on child items to emulate a grid, which is brittle.',
          rubric: [
            'Recommended CSS Grid for the 18-item catalog.',
            'Justified with 2D layout geometry (uniform rows and columns across viewports).',
            'Mentioned Flexbox for 1D internal item alignment (title/price).',
            'Referenced responsive techniques like repeat(auto-fit, minmax(...)).'
          ]
        },
        {
          id: 'd1_q4',
          number: 'Q4',
          topic: 'Mobile-First & Box Model Physics',
          prompt: "The client emphasized that mobile users must easily find the address and operating hours. How should the layout flow and box model behave across viewports?",
          verdictType: 'standards',
          verdictText: 'MOBILE-FIRST LINEAR FLOW & BORDER-BOX',
          verdictSummary: "Linear single-column stack with accessible touch padding and quick jump navigation.",
          evidence: "The brief highlights that 'people on their phones should easily find our address and operating schedule.'",
          rationale: "Apply a mobile-first CSS architecture (default single-column flow, progressive enhancement at min-width breakpoints). Ensure `box-sizing: border-box` to prevent horizontal viewport overflow. Provide a sticky navigation link to `#location` or prioritize location/hours above heavy asset catalogs on small screens. Ensure interactive elements have at least 44x44px touch targets.",
          trap: 'DO NOT use fixed pixel container widths (e.g. `width: 960px`) or hide menu items on mobile without client consent.',
          rubric: [
            'Specified Mobile-First default linear layout.',
            'Mentioned `box-sizing: border-box` to prevent horizontal overflow.',
            'Proposed sticky jump links or mobile hierarchy prioritization for address/hours.',
            'Enforced minimum touch target sizing (44x44px).'
          ]
        },
        {
          id: 'd1_q5',
          number: 'Q5',
          topic: 'Scope Boundary & Zero-Hallucination Audit',
          prompt: "A team member suggests adding an online table reservation form and an 'Add to Cart' button for delivery. How will you evaluate this suggestion based on the client's brief?",
          verdictType: 'reject',
          verdictText: 'REJECT SUGGESTION (SCOPE VIOLATION)',
          verdictSummary: "Unrequested transactional features violate the informational scope and multiply architectural complexity.",
          evidence: "The brief explicitly requests an informational showcase ('showcase brand story, display menu, locate physical branch').",
          rationale: "Under the Zero-Hallucination rule, engineers build only explicitly requested requirements. Adding reservation forms or e-commerce carts requires state management, database storage, validation endpoints, and payment compliance—none of which the cafe requested or budgeted for.",
          trap: 'DO NOT say: "Yes, this is a great upsell idea that makes the website better." In exam conditions and sprint planning, inventing unstated features is an automatic failure.',
          rubric: [
            'Categorically rejected the suggestion.',
            'Identified the brief as strictly informational.',
            'Cited backend/database/state complexity introduced without client approval.',
            'Emphasized requirement boundary discipline.'
          ]
        }
      ]
    },

    'drill-2': {
      id: 'drill-2',
      title: 'Barangay Health Clinic Information Portal ("Barangay 4")',
      chip: 'CLIENT BRIEF // DRILL 02',
      clientName: 'Barangay 4 Health Center Portal',
      rawText: 'The Barangay 4 Health Center wants a basic single-page web portal where residents can read urgent public health announcements, see the weekly schedule of attending doctors (General Physician, Pediatrician, Dental), and download immunization consent forms. The page must be fully readable for senior citizens and people using low-cost smartphones on mobile data. No online registration is needed at this time.',
      highlightedHtml: 'The Barangay 4 Health Center wants a basic single-page web portal where residents can <mark class="clue-highlight">read urgent public health announcements</mark>, <mark class="clue-highlight">see the weekly schedule of attending doctors (General Physician, Pediatrician, Dental)</mark>, and <mark class="clue-highlight">download immunization consent forms</mark>. The page must be <mark class="clue-highlight">fully readable for senior citizens</mark> and <mark class="clue-highlight">people using low-cost smartphones on mobile data</mark>. <mark class="clue-highlight">No online registration is needed at this time</mark>.',
      constraints: [
        'Content: Urgent Announcements + 3 Doctor Schedules + Form Downloads',
        'Audience: Senior citizens + low-cost smartphones on cellular data',
        'Scope: Strictly informational (Explicitly NO online registration)',
        'Performance: Low data footprint, high legibility, strict accessibility'
      ],
      questions: [
        {
          id: 'd2_q1',
          number: 'Q1',
          topic: 'Accessibility & Typography Standards',
          prompt: "Considering the target audience stated in the scenario, what core CSS design fundamentals must be prioritized, and did the client provide sufficient specs for them?",
          verdictType: 'insufficient',
          verdictText: 'NOT ENOUGH SPECS (PRIORITIZE WCAG AAA / RELATIVE UNITS)',
          verdictSummary: "Target user constraints are described, but technical typography and color contrast parameters are missing.",
          evidence: "The brief states the portal must be 'fully readable for senior citizens and people using low-cost smartphones on mobile data.'",
          rationale: "The requirements are insufficient for exact CSS values (no font size scale or hex values provided). However, accessibility fundamentals dictate: 1) High contrast ratios complying with WCAG 2.1 AA/AAA (7:1 for seniors with visual impairments), 2) Scalable relative units (`rem`, `ch`) allowing OS font zooming, 3) Minimum base body font size of 1.125rem (18px) with generous line-height (`1.6+`).",
          trap: 'DO NOT say: "The requirements are sufficient because we can just make the font size 12px so everything fits on small screens." This ruins readability for seniors.',
          rubric: [
            'Identified specs as INSUFFICIENT for exact values.',
            'Specified WCAG AA/AAA high contrast requirements for seniors.',
            'Recommended relative typography units (`rem`) over fixed `px`.',
            'Highlighted minimum line-height and legible body font sizing.'
          ]
        },
        {
          id: 'd2_q2',
          number: 'Q2',
          topic: 'Information Architecture & Accessibility Landmarks',
          prompt: "How should the primary <main> element be scaffolded to ensure logical document hierarchy and screen-reader friendliness?",
          verdictType: 'standards',
          verdictText: 'LOGICAL SCREEN-READER LANDMARKS',
          verdictSummary: "Hierarchical sections ordered by urgency, featuring proper heading levels and ARIA live regions.",
          evidence: "The scenario lists 3 explicit content domains: Urgent announcements, weekly doctor schedule, and immunization form downloads.",
          rationale: "Inside `<main>`, scaffold three sequential `<section>` landmarks: 1) `<section id=\"announcements\" aria-label=\"Urgent Announcements\">` with `<h2>` (or `role=\"alert\"` / `aria-live=\"polite\"`), 2) `<section id=\"schedule\">` with `<h2>`, and 3) `<section id=\"downloads\">` with `<h2>`. Clear headings allow screen reader users using rotor navigation to jump immediately to vital health advisories.",
          trap: 'DO NOT place all content in unlabelled <div> containers or put announcements inside a secondary <aside> tag (urgent public health announcements are primary content).',
          rubric: [
            'Scaffolded 3 logical <section> blocks inside <main>.',
            'Assigned sequential <h2> headings to each section.',
            'Prioritized urgent announcements at the top of the reading order.',
            'Mentioned accessibility attributes (aria-label, role, or aria-live).'
          ]
        },
        {
          id: 'd2_q3',
          number: 'Q3',
          topic: 'Tabular Data vs CSS Layout Strategy',
          prompt: "For the weekly schedule of 3 medical specialties across weekdays, what CSS layout technique adheres best to the structural content?",
          verdictType: 'standards',
          verdictText: 'SEMANTIC TABLE / RESPONSIVE CSS GRID',
          verdictSummary: "Use semantic <table> for true two-axis relational data, styled with responsive overflow scrolling.",
          evidence: "The schedule maps 3 doctor specialties (General Physician, Pediatrician, Dental) against days of the week.",
          rationale: "Doctor schedules represent true two-dimensional tabular data. W3C semantics require a `<table>` with `<thead>`, `<tbody>`, `<th scope=\"col\">`, and `<th scope=\"row\">`. For mobile viewports, wrap the table in an overflow container (`overflow-x: auto`) or transform into a CSS Grid card layout at small breakpoints so data does not clip on low-cost devices.",
          trap: 'DO NOT use arbitrary un-nested `<div>` tags with `float: left` or fixed widths that cause text truncation.',
          rubric: [
            'Advocated semantic `<table>` for two-axis relational schedule data.',
            'Included accessible table anatomy (`th scope="col/row"`, `caption`).',
            'Addressed mobile viewport adaptation (overflow-x or grid transformation).',
            'Avoided non-semantic div soups.'
          ]
        },
        {
          id: 'd2_q4',
          number: 'Q4',
          topic: 'Performance & Network Constraint Engineering',
          prompt: "Given that users rely on low-cost smartphones and mobile data, what web design practices must be applied regarding assets and layout?",
          verdictType: 'standards',
          verdictText: 'MINIMAL PAYLOAD & SYSTEM FONTS',
          verdictSummary: "Zero heavy external font CDNs, pure CSS vector styling, and zero unneeded scripts.",
          evidence: "The brief explicitly notes users are on 'low-cost smartphones on mobile data.'",
          rationale: "High mobile data latency and low CPU processing power require strict performance budgeting: 1) Use system UI font stacks (e.g. `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`) to eliminate multi-kilobyte Google Font render-blocking downloads, 2) Avoid heavy raster background images or animations, 3) Use lightweight inline SVGs for iconography, 4) Deliver pure semantic HTML5 and vanilla CSS without heavy JavaScript frameworks.",
          trap: 'DO NOT recommend loading multiple web font weights, heavy video backgrounds, or large unoptimized PNG illustrations.',
          rubric: [
            'Recommended system font stacks over external web fonts.',
            'Emphasized minimal HTTP payloads and no heavy frameworks.',
            'Avoided large raster images and background videos.',
            'Prioritized fast First Contentful Paint (FCP) on 3G/4G networks.'
          ]
        },
        {
          id: 'd2_q5',
          number: 'Q5',
          topic: 'Client Requirement Audit: Form Downloads',
          prompt: "The client states residents should 'download immunization consent forms.' Is this requirement complete enough to construct the download interface? Why or why not?",
          verdictType: 'insufficient',
          verdictText: 'INSUFFICIENT (MISSING FILE SPECS & FALLBACKS)',
          verdictSummary: "Format, file size, language versions, and low-end device viewing fallbacks are undefined.",
          evidence: "The brief simply says 'download immunization consent forms' without specifying file types, sizes, or instructions.",
          rationale: "The requirement is incomplete. For a low-income community using entry-level mobile devices: 1) What file format is provided (PDF, DOCX, JPG)? (Many budget phones lack Microsoft Word apps), 2) Are file sizes optimized (<500KB) to prevent data depletion?, 3) Is an in-browser printable HTML alternative required if the resident cannot open PDFs?, 4) Are multi-language forms (Tagalog/English) needed?",
          trap: 'DO NOT say: "Yes, it is complete because we just put `<a href=\"form.pdf\" download>Download</a>` and our job is done." An engineer audits failure modes for the end user.',
          rubric: [
            'Declared requirement INSUFFICIENT.',
            'Identified missing file formats (PDF vs DOCX) and file size budgets.',
            'Noted low-end device compatibility issues (lack of PDF/Word readers).',
            'Proposed accessible fallbacks (printable HTML page / clear file size labels).'
          ]
        }
      ]
    }
  };

  // --- State Management ---
  const STORAGE_KEY_PREFIX = 'devscaffold_v1_';
  let currentScenarioId = 'drill-1';
  let isExamMode = false;
  let isBriefHighlightsOn = false;

  // --- DOM Elements ---
  const headerElem = document.getElementById('app-header');
  const examToggleInput = document.getElementById('exam-mode-toggle');
  const examStatusText = document.getElementById('exam-status-text');
  const examModeBanner = document.getElementById('exam-mode-banner');
  const toastContainer = document.getElementById('toast-container');

  // Stats Elements
  const statCompletedCount = document.getElementById('stat-completed-count');
  const statScorePercent = document.getElementById('stat-score-percent');

  // Scenario UI Elements
  const scenarioTabsGroup = document.querySelector('.scenario-tabs-group');
  const briefScenarioChip = document.getElementById('brief-scenario-chip');
  const briefClientName = document.getElementById('brief-client-name');
  const briefQuoteContent = document.getElementById('brief-quote-content');
  const briefConstraintsList = document.getElementById('brief-constraints-list');
  const btnToggleHighlights = document.getElementById('btn-toggle-brief-highlighter');
  const questionsListContainer = document.getElementById('questions-list-container');
  const btnClearDrill = document.getElementById('btn-clear-current-drill');
  const btnMarkDrillComplete = document.getElementById('btn-mark-drill-complete');
  const btnSwitchScenario = document.getElementById('btn-switch-scenario');
  const btnCopyTemplate = document.getElementById('btn-copy-template');
  const btnExportAll = document.getElementById('btn-export-all');

  // Matrix Accordions & Standards Tabs
  const matrixAccordions = document.querySelectorAll('.accordion-card');
  const standardsTabBtns = document.querySelectorAll('.tab-btn');
  const standardsTabPanels = document.querySelectorAll('.tab-panel');

  // --- Initialization ---
  function init() {
    loadSavedSettings();
    bindGlobalEvents();
    renderActiveScenario();
    updateGlobalStats();
  }

  // --- Load Persistent Settings from LocalStorage ---
  function loadSavedSettings() {
    const savedExamMode = localStorage.getItem(`${STORAGE_KEY_PREFIX}exam_mode`);
    if (savedExamMode === 'true') {
      isExamMode = true;
      examToggleInput.checked = true;
      examStatusText.textContent = 'ON';
      examModeBanner.classList.remove('hidden');
    }
  }

  // --- Global Event Bindings ---
  function bindGlobalEvents() {
    // Exam Mode Toggle
    examToggleInput.addEventListener('change', function () {
      isExamMode = this.checked;
      examStatusText.textContent = isExamMode ? 'ON' : 'OFF';
      localStorage.setItem(`${STORAGE_KEY_PREFIX}exam_mode`, isExamMode);

      if (isExamMode) {
        examModeBanner.classList.remove('hidden');
        showToast('Exam Mode Enabled: Model answers are now locked for self-testing.', 'warning');
      } else {
        examModeBanner.classList.add('hidden');
        showToast('Exam Mode Disabled: Benchmark answers can be viewed anytime.', 'info');
      }

      // Re-render questions to reflect exam mode locks
      renderQuestions();
    });

    // Brief Highlight Toggle
    btnToggleHighlights.addEventListener('click', function () {
      isBriefHighlightsOn = !isBriefHighlightsOn;
      this.classList.toggle('btn-primary', isBriefHighlightsOn);
      this.classList.toggle('btn-outline-xs', !isBriefHighlightsOn);
      renderBriefQuote();
      showToast(isBriefHighlightsOn ? 'Key clue markers highlighted.' : 'Highlights hidden.', 'info');
    });

    // Scenario Switching Tabs
    scenarioTabsGroup.addEventListener('click', function (e) {
      const tabBtn = e.target.closest('.scenario-tab-btn');
      if (!tabBtn) return;
      const scenarioId = tabBtn.getAttribute('data-scenario');
      if (scenarioId && DRILL_SCENARIOS[scenarioId]) {
        switchScenario(scenarioId);
      }
    });

    // Switch Scenario Button in Footer
    btnSwitchScenario.addEventListener('click', function () {
      const nextId = currentScenarioId === 'drill-1' ? 'drill-2' : 'drill-1';
      switchScenario(nextId);
      document.getElementById('drills-module').scrollIntoView({ behavior: 'smooth' });
    });

    // Clear Drafts for Current Drill
    btnClearDrill.addEventListener('click', function () {
      if (confirm('Are you sure you want to clear your drafted answers and checklist scores for this scenario?')) {
        clearScenarioData(currentScenarioId);
        renderQuestions();
        updateGlobalStats();
        showToast('Drafts and rubric scores cleared for this scenario.', 'info');
      }
    });

    // Mark Drill Complete Button
    btnMarkDrillComplete.addEventListener('click', function () {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${currentScenarioId}_completed`, 'true');
      updateGlobalStats();
      showToast('Scenario marked complete! Excellent work on mastering the brief.', 'success');
    });

    // Copy Essay Markdown Template
    btnCopyTemplate.addEventListener('click', function () {
      const template = `### [Question ID] Technical Response

**1. Direct Verdict:**
[State clear stance: SUFFICIENT / INSUFFICIENT / CSS GRID / REJECT / ETC.]

**2. Scenario Clues & Evidence:**
- According to the client brief: "[Cite exact quote / requirement]"

**3. Standards & Technical Rationale:**
- [Explain W3C HTML5 semantics, 2D Grid vs 1D Flexbox, WCAG 2.1 AA/AAA contrast, or box model border-box physics]

**4. Risk / Failure Analysis:**
- [What breaks if implemented poorly: layout collapse, accessibility failure, or scope explosion]
`;
      copyToClipboard(template, 'Markdown Essay Blueprint copied to clipboard!');
    });

    // Copy Pushback Script Button in Module 2
    document.querySelectorAll('.btn-copy-inline').forEach(btn => {
      btn.addEventListener('click', function () {
        const targetSelector = this.getAttribute('data-copy-target');
        const targetElem = document.querySelector(targetSelector);
        if (targetElem) {
          copyToClipboard(targetElem.innerText.trim(), 'Junior Dev Pushback Script copied!');
        }
      });
    });

    // Export All to Markdown
    btnExportAll.addEventListener('click', exportAllResponsesToMarkdown);

    // Module 2 Matrix Accordions
    matrixAccordions.forEach(card => {
      const trigger = card.querySelector('.accordion-trigger');
      trigger.addEventListener('click', () => {
        const isActive = card.classList.contains('active');
        // Toggle only this card
        card.classList.toggle('active', !isActive);
        trigger.setAttribute('aria-expanded', !isActive);
      });
    });

    // Module 3 Standards Tabs
    standardsTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        standardsTabBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        standardsTabPanels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        const panelId = btn.getAttribute('aria-controls');
        const activePanel = document.getElementById(panelId);
        if (activePanel) {
          activePanel.classList.add('active');
        }
      });
    });

    // Sticky Header Scroll Spy Navigation Active State
    window.addEventListener('scroll', handleScrollSpy, { passive: true });
  }

  // --- ScrollSpy Active Link Updater ---
  function handleScrollSpy() {
    const sections = ['mindset-module', 'matrix-module', 'standards-module', 'essay-module', 'drills-module'];
    const scrollPos = window.scrollY + 120;

    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el && el.offsetTop <= scrollPos) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sections[i]}`) {
            link.classList.add('active');
          }
        });
        break;
      }
    }
  }

  // --- Scenario Switcher ---
  function switchScenario(scenarioId) {
    currentScenarioId = scenarioId;

    // Update active tab buttons
    document.querySelectorAll('.scenario-tab-btn').forEach(btn => {
      const isMatch = btn.getAttribute('data-scenario') === scenarioId;
      btn.classList.toggle('active', isMatch);
      btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    renderActiveScenario();
  }

  // --- Render Active Scenario Header & Constraints ---
  function renderActiveScenario() {
    const scenario = DRILL_SCENARIOS[currentScenarioId];
    if (!scenario) return;

    briefScenarioChip.textContent = scenario.chip;
    briefClientName.textContent = scenario.clientName;
    renderBriefQuote();

    // Render Constraints Tags
    briefConstraintsList.innerHTML = '';
    scenario.constraints.forEach(c => {
      const tag = document.createElement('span');
      tag.className = 'constraint-tag';
      tag.textContent = c;
      briefConstraintsList.appendChild(tag);
    });

    renderQuestions();
  }

  function renderBriefQuote() {
    const scenario = DRILL_SCENARIOS[currentScenarioId];
    if (isBriefHighlightsOn) {
      briefQuoteContent.innerHTML = `"${scenario.highlightedHtml}"`;
    } else {
      briefQuoteContent.textContent = `"${scenario.rawText}"`;
    }
  }

  // --- Render Questions for Active Scenario ---
  function renderQuestions() {
    const scenario = DRILL_SCENARIOS[currentScenarioId];
    if (!scenario) return;

    questionsListContainer.innerHTML = '';

    scenario.questions.forEach((q, idx) => {
      const savedDraft = localStorage.getItem(`${STORAGE_KEY_PREFIX}${q.id}_draft`) || '';
      const isAnswerRevealed = localStorage.getItem(`${STORAGE_KEY_PREFIX}${q.id}_revealed`) === 'true';
      const wordCount = countWords(savedDraft);
      const isAnswered = savedDraft.trim().length > 0;

      const qCard = document.createElement('article');
      qCard.className = `question-card ${isAnswered ? 'answered' : ''}`;
      qCard.id = `card-${q.id}`;

      // Verdict class mappings
      let verdictClass = 'verdict-sufficient';
      if (q.verdictType === 'insufficient') verdictClass = 'verdict-insufficient';
      if (q.verdictType === 'reject') verdictClass = 'verdict-reject';
      if (q.verdictType === 'grid') verdictClass = 'verdict-grid';

      qCard.innerHTML = `
        <div class="question-header">
          <div class="q-tag-group">
            <span class="q-badge">${q.number}</span>
            <span class="q-topic">${q.topic}</span>
          </div>
          <span class="q-status-badge" id="status-${q.id}">
            ${isAnswered ? '✓ Drafted' : 'Pending Draft'}
          </span>
        </div>

        <h3 class="q-prompt-text">${q.prompt}</h3>

        <!-- Student Draft Workspace -->
        <div class="draft-workspace">
          <div class="draft-header">
            <span><strong>Your Formulated Response:</strong> (Apply 4-Step Blueprint)</span>
            <div class="blueprint-cues">
              <span class="cue-tag">1. Verdict</span>
              <span class="cue-tag">2. Evidence</span>
              <span class="cue-tag">3. Standards</span>
              <span class="cue-tag">4. Risk</span>
            </div>
          </div>
          <textarea
            class="draft-textarea"
            id="textarea-${q.id}"
            placeholder="Draft your engineering response here before checking the model answer... (Verdict, Evidence, Standards, Risk)"
            rows="4"
          >${escapeHtml(savedDraft)}</textarea>
          <div class="draft-footer">
            <span class="auto-save-label">💾 Auto-saved locally</span>
            <span class="word-count" id="wc-${q.id}">Words: ${wordCount}</span>
          </div>
        </div>

        <!-- Model Answer Section -->
        <div class="model-answer-section">
          <button class="toggle-answer-btn ${isAnswerRevealed ? 'revealed' : ''}" id="toggle-btn-${q.id}" data-qid="${q.id}">
            <span>${isAnswerRevealed ? '▲ Hide Benchmark Answer & Rubric' : '▼ Reveal Benchmark Model Answer & Rubric'}</span>
            <span class="key-hint">${isExamMode && !isAnswered ? '🔒 (Draft required in Exam Mode)' : ''}</span>
          </button>

          <div class="model-answer-drawer ${isAnswerRevealed ? 'open' : ''}" id="drawer-${q.id}">
            <div class="benchmark-card">
              <!-- Verdict Badge Box -->
              <div class="benchmark-verdict-box ${verdictClass}">
                <span class="verdict-badge ${verdictClass}">${q.verdictText}</span>
                <span class="verdict-summary-text">${q.verdictSummary}</span>
              </div>

              <!-- Breakdown Grid -->
              <div class="benchmark-breakdown">
                <div class="breakdown-block">
                  <div class="breakdown-label text-sky">Step 2: Scenario Evidence</div>
                  <div class="breakdown-text">${q.evidence}</div>
                </div>
                <div class="breakdown-block">
                  <div class="breakdown-label text-emerald">Step 3: Technical & W3C Rationale</div>
                  <div class="breakdown-text">${q.rationale}</div>
                </div>
              </div>

              <!-- Hallucination Trap Warning -->
              <div class="trap-warning-box">
                <div class="trap-header">
                  <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  THE "DO NOT SAY THIS" TRAP (AMATEUR HALLUCINATION)
                </div>
                <div class="trap-text">${q.trap}</div>
              </div>

              <!-- Rubric Checklist -->
              <div class="rubric-box">
                <div class="rubric-title">Self-Grading Rubric Checklist</div>
                <ul class="rubric-checklist">
                  ${q.rubric.map((item, rIdx) => {
                    const rubricKey = `${STORAGE_KEY_PREFIX}${q.id}_rubric_${rIdx}`;
                    const isChecked = localStorage.getItem(rubricKey) === 'true';
                    return `
                      <li class="rubric-item">
                        <input
                          type="checkbox"
                          class="rubric-checkbox"
                          id="${rubricKey}"
                          data-qid="${q.id}"
                          data-ridx="${rIdx}"
                          ${isChecked ? 'checked' : ''}
                        >
                        <label for="${rubricKey}">${item}</label>
                      </li>
                    `;
                  }).join('')}
                </ul>
              </div>
            </div>
          </div>
        </div>
      `;

      questionsListContainer.appendChild(qCard);

      // Bind Textarea Input for Autosave & Word Count
      const textarea = qCard.querySelector(`#textarea-${q.id}`);
      const wcSpan = qCard.querySelector(`#wc-${q.id}`);
      const statusBadge = qCard.querySelector(`#status-${q.id}`);

      textarea.addEventListener('input', function () {
        const val = this.value;
        localStorage.setItem(`${STORAGE_KEY_PREFIX}${q.id}_draft`, val);
        const count = countWords(val);
        wcSpan.textContent = `Words: ${count}`;

        const hasText = val.trim().length > 0;
        qCard.classList.toggle('answered', hasText);
        statusBadge.textContent = hasText ? '✓ Drafted' : 'Pending Draft';

        updateGlobalStats();
      });

      // Bind Toggle Model Answer
      const toggleBtn = qCard.querySelector(`#toggle-btn-${q.id}`);
      const drawer = qCard.querySelector(`#drawer-${q.id}`);

      toggleBtn.addEventListener('click', function () {
        const currentDraft = (localStorage.getItem(`${STORAGE_KEY_PREFIX}${q.id}_draft`) || '').trim();

        if (isExamMode && currentDraft.length === 0 && !drawer.classList.contains('open')) {
          showToast('Exam Mode: Formulate your own draft first before revealing the benchmark!', 'warning');
          textarea.focus();
          return;
        }

        const willOpen = !drawer.classList.contains('open');
        drawer.classList.toggle('open', willOpen);
        toggleBtn.classList.toggle('revealed', willOpen);
        toggleBtn.querySelector('span:first-child').textContent = willOpen
          ? '▲ Hide Benchmark Answer & Rubric'
          : '▼ Reveal Benchmark Model Answer & Rubric';

        localStorage.setItem(`${STORAGE_KEY_PREFIX}${q.id}_revealed`, willOpen);
      });

      // Bind Rubric Checkboxes
      const rubricCheckboxes = qCard.querySelectorAll('.rubric-checkbox');
      rubricCheckboxes.forEach(cb => {
        cb.addEventListener('change', function () {
          localStorage.setItem(this.id, this.checked);
          updateGlobalStats();
        });
      });
    });
  }

  // --- Stats & Score Calculations ---
  function updateGlobalStats() {
    let totalQuestions = 0;
    let draftedCount = 0;
    let totalRubricItems = 0;
    let checkedRubricItems = 0;

    Object.keys(DRILL_SCENARIOS).forEach(sId => {
      const sc = DRILL_SCENARIOS[sId];
      sc.questions.forEach(q => {
        totalQuestions++;
        const draft = localStorage.getItem(`${STORAGE_KEY_PREFIX}${q.id}_draft`) || '';
        if (draft.trim().length > 0) {
          draftedCount++;
        }

        q.rubric.forEach((_, rIdx) => {
          totalRubricItems++;
          const isChecked = localStorage.getItem(`${STORAGE_KEY_PREFIX}${q.id}_rubric_${rIdx}`) === 'true';
          if (isChecked) {
            checkedRubricItems++;
          }
        });
      });
    });

    statCompletedCount.textContent = `${draftedCount}/${totalQuestions}`;

    const scorePercent = totalRubricItems > 0 ? Math.round((checkedRubricItems / totalRubricItems) * 100) : 0;
    statScorePercent.textContent = `${scorePercent}%`;
  }

  // --- Reset Scenario Data ---
  function clearScenarioData(scenarioId) {
    const scenario = DRILL_SCENARIOS[scenarioId];
    if (!scenario) return;

    scenario.questions.forEach(q => {
      localStorage.removeItem(`${STORAGE_KEY_PREFIX}${q.id}_draft`);
      localStorage.removeItem(`${STORAGE_KEY_PREFIX}${q.id}_revealed`);
      q.rubric.forEach((_, rIdx) => {
        localStorage.removeItem(`${STORAGE_KEY_PREFIX}${q.id}_rubric_${rIdx}`);
      });
    });
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}${scenarioId}_completed`);
  }

  // --- Export All Responses to Markdown File ---
  function exportAllResponsesToMarkdown() {
    let md = `# Junior Dev Scaffolding & Client Requirement Exam Simulator
Exported on: ${new Date().toLocaleString()}

---

`;

    Object.keys(DRILL_SCENARIOS).forEach(sId => {
      const sc = DRILL_SCENARIOS[sId];
      md += `## ${sc.title}\n`;
      md += `**Client Brief:**\n> ${sc.rawText}\n\n`;

      sc.questions.forEach(q => {
        const draft = localStorage.getItem(`${STORAGE_KEY_PREFIX}${q.id}_draft`) || '(No draft written)';
        md += `### ${q.number}: ${q.topic}\n`;
        md += `**Question:** ${q.prompt}\n\n`;
        md += `#### Your Response:\n${draft}\n\n`;
        md += `#### Benchmark Verdict:\n- **Verdict:** ${q.verdictText}\n- **Evidence:** ${q.evidence}\n- **Rationale:** ${q.rationale}\n- **Trap Warning:** ${q.trap}\n\n`;
        md += `---\n\n`;
      });
    });

    // Create a downloadable blob
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = url;
    downloadAnchor.download = `DevScaffold_Exam_Responses_${Date.now()}.md`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
    URL.revokeObjectURL(url);

    showToast('All responses exported successfully as Markdown!', 'success');
  }

  // --- Utility Functions ---
  function countWords(str) {
    if (!str || typeof str !== 'string') return 0;
    const trimmed = str.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  }

  function copyToClipboard(text, successMessage) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMessage, 'success');
      }).catch(() => {
        fallbackCopy(text, successMessage);
      });
    } else {
      fallbackCopy(text, successMessage);
    }
  }

  function fallbackCopy(text, successMessage) {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = text;
    tempTextArea.style.position = 'fixed';
    tempTextArea.style.top = '-9999px';
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    try {
      document.execCommand('copy');
      showToast(successMessage, 'success');
    } catch (e) {
      showToast('Could not copy to clipboard. Please copy manually.', 'warning');
    }
    document.body.removeChild(tempTextArea);
  }

  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'warning') icon = '⚠️';

    toast.innerHTML = `<span>${icon}</span> <span>${escapeHtml(message)}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3500);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --- Boot App ---
  document.addEventListener('DOMContentLoaded', init);

})();
