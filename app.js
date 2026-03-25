const widgetCatalog = {
	goals: {
		id: "goals",
		type: "goals",
		title: "Goals",
		category: "Teaching",
		description: "Track integration goals and update progress quickly.",
		locked: true
	},
	courseOverview: {
		id: "course-overview",
		type: "courseOverview",
		title: "Course Overview",
		category: "Teaching",
		description: "Course summaries and performance placeholders.",
		locked: true
	},
	resources: {
		type: "resources",
		title: "Resources",
		category: "Resources",
		description: "Expandable links for forms and consultation tools."
	},
	mentorship: {
		type: "mentorship",
		title: "Mentorship",
		category: "Teaching",
		description: "Mentoring notes and follow-up reminders."
	},
	scot: {
		type: "scot",
		title: "SCOT",
		category: "Reporting",
		description: "Informational reporting widget placeholder."
	},
	calendar: {
		type: "calendar",
		title: "Calendar",
		category: "Teaching",
		description: "Month grid and upcoming classroom schedule."
	}
};

const state = {
	user: {
		name: "Daniel",
		role: "faculty"
	},
	selectedCourseOverviewId: "ENG150-01",
	widgets: [
		{
			id: "goals",
			type: "goals",
			locked: true,
			position: 0
		},
		{
			id: "course-overview",
			type: "courseOverview",
			locked: true,
			position: 1
		},
		{
			id: "resources-1",
			type: "resources",
			locked: false,
			position: 2
		},
		{
			id: "mentorship-1",
			type: "mentorship",
			locked: false,
			position: 3
		},
		{
			id: "calendar-1",
			type: "calendar",
			locked: false,
			position: 4
		}
	]
};

const courseOverviewRows = [
	{
		id: "ENG150-01",
		term: "FA2025",
		department: "English",
		course: "ENG 150",
		section: "01",
		disciples: 3.7,
		teaching: 4.1,
		design: 4.0,
		title: "Writing and Reasoning Foundations",
		meta: "ENG 150-01 | Fall 2025",
		enrolled: 35,
		responses: 18,
		responseRate: 51.42,
		band: "Proficient"
	},
	{
		id: "ENG150-02",
		term: "FA2025",
		department: "English",
		course: "ENG 150",
		section: "02",
		disciples: 3.5,
		teaching: 4.0,
		design: 3.8,
		title: "Writing and Reasoning Foundations",
		meta: "ENG 150-02 | Fall 2025",
		enrolled: 32,
		responses: 16,
		responseRate: 50,
		band: "Developing"
	},
	{
		id: "ENG318R-01",
		term: "FA2025",
		department: "English",
		course: "ENG 318R",
		section: "01",
		disciples: 4.4,
		teaching: 4.8,
		design: 3.9,
		title: "Advanced Composition",
		meta: "ENG 318R-01 | Fall 2025",
		enrolled: 28,
		responses: 14,
		responseRate: 50,
		band: "Proficient"
	}
];

const modalState = {
	open: false,
	category: "All",
	search: "",
	selectedType: null
};

const fixedRow = document.getElementById("fixedRow");
const customGrid = document.getElementById("customGrid");
const welcomeText = document.getElementById("welcomeText");
const helloText = document.getElementById("helloText");

const widgetModal = document.getElementById("widgetModal");
const widgetSearch = document.getElementById("widgetSearch");
const categoryList = document.getElementById("categoryList");
const widgetOptionGrid = document.getElementById("widgetOptionGrid");
const addSelectedWidgetBtn = document.getElementById("addSelectedWidgetBtn");

const openAddModalBtn = document.getElementById("openAddModalBtn");
const cancelModalBtn = document.getElementById("cancelModalBtn");

openAddModalBtn.addEventListener("click", openModal);
cancelModalBtn.addEventListener("click", closeModal);
addSelectedWidgetBtn.addEventListener("click", addSelectedWidget);
widgetSearch.addEventListener("input", (event) => {
	modalState.search = event.target.value.trim().toLowerCase();
	renderModalOptions();
});

widgetModal.addEventListener("click", (event) => {
	if (event.target === widgetModal) {
		closeModal();
	}
});

document.addEventListener("click", (event) => {
	if (!event.target.closest(".widget-menu")) {
		document.querySelectorAll(".menu-panel.show").forEach((menu) => {
			menu.classList.remove("show");
		});
	}
});

function normalizePositions() {
	state.widgets.forEach((widget, index) => {
		widget.position = index;
	});
}

function getFixedWidgets() {
	return state.widgets.filter((widget) => widget.locked).sort((a, b) => a.position - b.position);
}

function getCustomWidgets() {
	return state.widgets.filter((widget) => !widget.locked).sort((a, b) => a.position - b.position);
}

function renderCourseOverviewMini() {
	const selected =
		courseOverviewRows.find((row) => row.id === state.selectedCourseOverviewId) || courseOverviewRows[0];

	return `
		<div class="mini-overview">
			<div class="mini-overview-table">
				<div class="mini-overview-head">
					<span>Term</span>
					<span>Course</span>
					<span>Section</span>
					<span>Disciples</span>
					<span>Teaching</span>
					<span>Design</span>
					<span></span>
				</div>
				<div class="mini-overview-rows">
					${courseOverviewRows
						.map(
							(row) => `
							<div class="mini-overview-row ${
								row.id === selected.id ? "selected" : ""
							}">
								<span>${row.term}</span>
								<span>${row.course}</span>
								<span>${row.section}</span>
								<span>${row.disciples.toFixed(1)}</span>
								<span>${row.teaching.toFixed(1)}</span>
								<span>${row.design.toFixed(1)}</span>
								<button class="mini-overview-btn" data-course-id="${row.id}">Overview</button>
							</div>
						`
						)
						.join("")}
				</div>
			</div>
			<aside class="mini-overview-detail">
				<h4>${selected.title}</h4>
				<p>${selected.meta}</p>
				<div class="mini-score">${selected.disciples.toFixed(1)}</div>
				<div class="mini-band ${selected.band === "Proficient" ? "proficient" : "developing"}">${selected.band}</div>
				<div class="mini-stats">
					<div><strong>${selected.enrolled}</strong><span>Total</span></div>
					<div><strong>${selected.responses}</strong><span>Responses</span></div>
					<div><strong>${selected.responseRate.toFixed(2)}</strong><span>Response %</span></div>
				</div>
			</aside>
		</div>
	`;
}

function renderWidgetBody(type, isFixed) {
	if (type === "resources") {
		return `
			<div class="resources-list">
				${[
					"Peer Observation Form",
					"SCOT",
					"Consultation With a Curriculum Designer",
					"Consultation With Assessment Consultant",
					"Learning and Teaching Website"
				]
					.map(
						(item, index) => `
						<div class="resource-item ${index === 0 ? "open" : ""}">
							<button class="resource-toggle" type="button">
								<span>${item}</span>
								<span>${index === 0 ? "-" : "+"}</span>
							</button>
							<div class="resource-content">Access this resource from the faculty support library.</div>
						</div>`
					)
					.join("")}
			</div>
		`;
	}

	if (type === "calendar") {
		return `
			<div class="calendar-grid">
				<div class="calendar-header">
					<div>Su</div><div>M</div><div>T</div><div>W</div><div>Th</div><div>F</div><div>Sa</div>
				</div>
				<div class="calendar-row"><div></div><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div></div>
				<div class="calendar-row"><div>7</div><div>8</div><div>9</div><div>10</div><div>11</div><div>12</div><div>13</div></div>
				<div class="calendar-row"><div>14</div><div>15</div><div>16</div><div>17</div><div>18</div><div>19</div><div>20</div></div>
				<div class="calendar-row"><div>21</div><div>22</div><div>23</div><div>24</div><div>25</div><div>26</div><div>27</div></div>
				<div class="calendar-row"><div>28</div><div>29</div><div>30</div><div></div><div></div><div></div><div></div></div>
			</div>
		`;
	}

	if (type === "scot") {
		return "<p class='widget-copy'>SCOT reporting data appears here for annual review preparation. This widget is informational only.</p>";
	}

	if (type === "mentorship") {
		return "<p class='widget-copy'>Track mentoring check-ins and support plans for your assigned students this term.</p>";
	}

	if (type === "goals") {
		return `
			<p class="widget-copy-tight">Integrate scripture into the Economics 110 course.</p>
			<p class="widget-subcopy">15 / 50 completed (30%)</p>
			${isFixed ? "" : "<div class='card-footer'><button class='mini-pill'>Update</button></div>"}
		`;
	}

	if (type === "courseOverview") {
		if (isFixed) {
			return renderCourseOverviewMini();
		}

		return `
			<p class="widget-copy-tight">ENGL 150, ENGL 160, ENGL 301 active this term.</p>
			<p class="widget-subcopy">Average engagement: 84% | Developing discipleship score: 4.1</p>
			${isFixed ? "" : "<div class='card-footer'><button class='mini-pill'>Details</button></div>"}
		`;
	}

	return "";
}

function renderFixedWidgets() {
	const fixedWidgets = getFixedWidgets();
	fixedRow.innerHTML = fixedWidgets
		.map((widget) => {
			const spec = widgetCatalog[widget.type];
			const fixedClass = widget.type === "courseOverview" ? "course-overview-fixed" : "";
			const footer =
				widget.type === "courseOverview"
					? ""
					: "<div class=\"card-footer\"><button class=\"mini-pill\">button</button></div>";
			return `
				<article class="card fixed ${fixedClass}">
					<h2 class="widget-title">${spec.title}</h2>
					${renderWidgetBody(widget.type, true)}
					${footer}
				</article>
			`;
		})
		.join("");

	fixedRow.querySelectorAll(".mini-overview-btn").forEach((button) => {
		button.addEventListener("click", () => {
			state.selectedCourseOverviewId = button.dataset.courseId;
			render();
		});
	});
}

function renderCustomWidgets() {
	const customWidgets = getCustomWidgets();
	customGrid.innerHTML = customWidgets
		.map((widget) => {
			const spec = widgetCatalog[widget.type];
			return `
				<article class="card" data-widget-id="${widget.id}">
					<h3 class="widget-title">${spec.title}</h3>
					<div class="widget-menu">
						<button class="menu-btn" aria-label="Open widget menu">...</button>
						<div class="menu-panel">
							<button data-action="move-up">Move Up</button>
							<button data-action="move-down">Move Down</button>
							<button data-action="remove" class="remove">Remove Widget</button>
						</div>
					</div>
					${renderWidgetBody(widget.type, false)}
				</article>
			`;
		})
		.join("");

	const placeholderCard = document.createElement("article");
	placeholderCard.className = "card placeholder";
	placeholderCard.innerHTML = `
		<div class="placeholder-inner">
			<div class="plus">+</div>
			<div>Add Widget</div>
		</div>
	`;
	placeholderCard.addEventListener("click", openModal);
	customGrid.appendChild(placeholderCard);

	customGrid.querySelectorAll(".menu-btn").forEach((button) => {
		button.addEventListener("click", (event) => {
			const panel = event.target.nextElementSibling;
			document.querySelectorAll(".menu-panel.show").forEach((menu) => {
				if (menu !== panel) {
					menu.classList.remove("show");
				}
			});
			panel.classList.toggle("show");
		});
	});

	customGrid.querySelectorAll(".menu-panel button").forEach((button) => {
		button.addEventListener("click", (event) => {
			const card = event.target.closest(".card");
			const widgetId = card.dataset.widgetId;
			const action = event.target.dataset.action;
			performWidgetAction(widgetId, action);
		});
	});

	customGrid.querySelectorAll(".resource-toggle").forEach((toggle) => {
		toggle.addEventListener("click", (event) => {
			const item = event.currentTarget.closest(".resource-item");
			const isOpen = item.classList.toggle("open");
			event.currentTarget.lastElementChild.textContent = isOpen ? "-" : "+";
		});
	});
}

function performWidgetAction(widgetId, action) {
	const target = state.widgets.find((widget) => widget.id === widgetId);
	if (!target || target.locked) {
		return;
	}

	const customWidgets = getCustomWidgets();
	const index = customWidgets.findIndex((widget) => widget.id === widgetId);

	if (action === "remove") {
		state.widgets = state.widgets.filter((widget) => widget.id !== widgetId);
	}

	if (action === "move-up" && index > 0) {
		const previous = customWidgets[index - 1];
		const prevPos = target.position;
		target.position = previous.position;
		previous.position = prevPos;
	}

	if (action === "move-down" && index < customWidgets.length - 1) {
		const next = customWidgets[index + 1];
		const nextPos = target.position;
		target.position = next.position;
		next.position = nextPos;
	}

	normalizePositions();
	render();
}

function availableWidgetTypes() {
	return ["resources", "mentorship", "scot", "calendar"];
}

function categories() {
	return ["All", "Teaching", "Resources", "Reporting"];
}

function renderCategories() {
	categoryList.innerHTML = categories()
		.map(
			(cat) =>
				`<button class="category-btn ${modalState.category === cat ? "active" : ""}" data-category="${cat}">${cat}</button>`
		)
		.join("");

	categoryList.querySelectorAll(".category-btn").forEach((button) => {
		button.addEventListener("click", () => {
			modalState.category = button.dataset.category;
			renderCategories();
			renderModalOptions();
		});
	});
}

function renderModalOptions() {
	const filtered = availableWidgetTypes().filter((type) => {
		const spec = widgetCatalog[type];
		const matchesCategory = modalState.category === "All" || spec.category === modalState.category;
		const text = `${spec.title} ${spec.description}`.toLowerCase();
		const matchesSearch = !modalState.search || text.includes(modalState.search);
		return matchesCategory && matchesSearch;
	});

	widgetOptionGrid.innerHTML = filtered
		.map((type) => {
			const spec = widgetCatalog[type];
			const selectedClass = modalState.selectedType === type ? "selected" : "";
			return `
				<article class="widget-option ${selectedClass}" data-widget-type="${type}">
					<h4>${spec.title}</h4>
					<p>${spec.description}</p>
				</article>
			`;
		})
		.join("");

	widgetOptionGrid.querySelectorAll(".widget-option").forEach((card) => {
		card.addEventListener("click", () => {
			modalState.selectedType = card.dataset.widgetType;
			addSelectedWidgetBtn.disabled = false;
			renderModalOptions();
		});
	});

	if (!filtered.includes(modalState.selectedType)) {
		modalState.selectedType = null;
		addSelectedWidgetBtn.disabled = true;
	}
}

function openModal() {
	modalState.open = true;
	modalState.search = "";
	modalState.category = "All";
	modalState.selectedType = null;
	widgetSearch.value = "";
	addSelectedWidgetBtn.disabled = true;
	widgetModal.classList.add("show");
	widgetModal.setAttribute("aria-hidden", "false");
	renderCategories();
	renderModalOptions();
}

function closeModal() {
	modalState.open = false;
	widgetModal.classList.remove("show");
	widgetModal.setAttribute("aria-hidden", "true");
}

function createWidgetId(type) {
	const count = state.widgets.filter((widget) => widget.type === type).length;
	return `${type}-${count + 1}`;
}

function addSelectedWidget() {
	if (!modalState.selectedType) {
		return;
	}

	const newWidget = {
		id: createWidgetId(modalState.selectedType),
		type: modalState.selectedType,
		locked: false,
		position: state.widgets.length
	};

	state.widgets.push(newWidget);
	normalizePositions();
	closeModal();
	render();
}

function renderHeader() {
	welcomeText.textContent = `Welcome, ${state.user.name}`;
	helloText.textContent = `Hello ${state.user.name}`;
}

function render() {
	renderHeader();
	renderFixedWidgets();
	renderCustomWidgets();
}

render();
