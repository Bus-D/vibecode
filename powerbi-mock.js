const powerBiRows = [
	{
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
		responseRate: 50.0,
		band: "Developing"
	},
	{
		term: "FA2025",
		department: "English",
		course: "ENG 318R",
		section: "01",
		disciples: 4.4,
		teaching: 4.8,
		design: 3.9,
		title: "Advanced Creative Writing",
		meta: "ENG 318R-01 | Fall 2025",
		enrolled: 28,
		responses: 14,
		responseRate: 50.0,
		band: "Proficient"
	}
];

const pbRows = document.getElementById("pbRows");
const pbDetail = document.getElementById("pbDetail");
const pbCourseTitle = document.getElementById("pbCourseTitle");
const pbCourseMeta = document.getElementById("pbCourseMeta");
const pbScore = document.getElementById("pbScore");
const pbBand = document.getElementById("pbBand");
const pbEnroll = document.getElementById("pbEnroll");
const pbResponses = document.getElementById("pbResponses");
const pbRate = document.getElementById("pbRate");
const pbDetailPageBtn = document.getElementById("pbDetailPageBtn");

let selectedRowIndex = null;

function renderPbRows(selectedIndex = null) {
	pbRows.innerHTML = powerBiRows
		.map((row, index) => {
			const selectedClass = selectedIndex === index ? "selected" : "";
			return `
				<div class="pb-row ${selectedClass}">
					<span>${row.term}</span>
					<span>${row.department}</span>
					<span>${row.course}</span>
					<span>${row.section}</span>
					<span>${row.disciples.toFixed(1)}</span>
					<span>${row.teaching.toFixed(1)}</span>
					<span>${row.design.toFixed(1)}</span>
					<button data-index="${index}">Overview</button>
				</div>
			`;
		})
		.join("");

	pbRows.querySelectorAll("button").forEach((button) => {
		button.addEventListener("click", () => {
			const index = Number(button.dataset.index);
			selectRow(index);
		});
	});
}

function selectRow(index) {
	const row = powerBiRows[index];
	selectedRowIndex = index;
	pbDetail.classList.add("has-selection");
	pbCourseTitle.textContent = row.title;
	pbCourseMeta.textContent = row.meta;
	pbScore.textContent = row.disciples.toFixed(1);
	pbBand.textContent = row.band;
	pbBand.style.background = row.band === "Proficient" ? "#76b96b" : "#e0c341";
	pbBand.style.color = row.band === "Proficient" ? "#ffffff" : "#272727";
	pbEnroll.textContent = String(row.enrolled);
	pbResponses.textContent = String(row.responses);
	pbRate.textContent = row.responseRate.toFixed(2);
	localStorage.setItem("selectedCourseData", JSON.stringify(row));
	renderPbRows(index);
}

if (pbDetailPageBtn) {
	pbDetailPageBtn.addEventListener("click", () => {
		if (selectedRowIndex === null) {
			return;
		}
		const selected = powerBiRows[selectedRowIndex];
		localStorage.setItem("selectedCourseData", JSON.stringify(selected));
	});
}

renderPbRows();
