const savedCourseRaw = localStorage.getItem("selectedCourseData");

if (savedCourseRaw) {
	const selected = JSON.parse(savedCourseRaw);

	const detailCourseTitle = document.getElementById("detailCourseTitle");
	const detailCourseMeta = document.getElementById("detailCourseMeta");
	const detailEnrolled = document.getElementById("detailEnrolled");
	const detailResponses = document.getElementById("detailResponses");
	const detailResponseRate = document.getElementById("detailResponseRate");
	const detailDisciple = document.getElementById("detailDisciple");
	const detailTeach = document.getElementById("detailTeach");
	const detailDesign = document.getElementById("detailDesign");

	if (detailCourseTitle) {
		detailCourseTitle.textContent = selected.title;
	}
	if (detailCourseMeta) {
		detailCourseMeta.textContent = selected.meta;
	}
	if (detailEnrolled) {
		detailEnrolled.textContent = String(selected.enrolled);
	}
	if (detailResponses) {
		detailResponses.textContent = String(selected.responses);
	}
	if (detailResponseRate) {
		detailResponseRate.textContent = `${Number(selected.responseRate).toFixed(2)}%`;
	}
	if (detailDisciple) {
		detailDisciple.textContent = Number(selected.disciples).toFixed(1);
	}
	if (detailTeach) {
		detailTeach.textContent = Number(selected.teaching).toFixed(1);
	}
	if (detailDesign) {
		detailDesign.textContent = Number(selected.design).toFixed(1);
	}
}
