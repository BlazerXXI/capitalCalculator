const history = parseFloat(localStorage.getItem("history")) || 0;
let totalResult = history;

const changeHistory = (newValue) => {
	localStorage.setItem("history", newValue);
};

function calculateCapital() {
	const salaryInput = document.getElementById("salary");
	const expensesInput = document.getElementById("expenses");
	const salary = parseFloat(salaryInput.value);
	const expenses = parseFloat(expensesInput.value);

	if (!isNaN(salary) && !isNaN(expenses)) {
		totalResult += salary - expenses;
		changeHistory(totalResult);
		updateHistory();
		salaryInput.value = "";
		expensesInput.value = "";
	}
}

function editResult() {
	const newResult = parseFloat(prompt("Enter the new result:"));
	if (!isNaN(newResult)) {
		totalResult = newResult;
		changeHistory(totalResult);
		updateHistory();
	}
}

function updateHistory() {
	document.getElementById(
		"totalResult"
	).innerHTML = `Total Result: <span>${totalResult} &#8372;</span> `;
}

// Handle Enter key press for input fields
document.getElementById("salary").addEventListener("keydown", function (event) {
	if (event.key === "Enter") {
		event.preventDefault();
		calculateCapital();
	}
});

document
	.getElementById("expenses")
	.addEventListener("keydown", function (event) {
		if (event.key === "Enter") {
			event.preventDefault();
			calculateCapital();
		}
	});

// Display initial history
updateHistory();
