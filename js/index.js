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
		const newTotalResult = totalResult + salary - expenses;

		if (newTotalResult >= 0) {
			totalResult = newTotalResult;
			changeHistory(totalResult);
			updateHistory();
			salaryInput.value = "";
			expensesInput.value = "";
		} else {
			alert("Total result cannot be negative. Please enter valid values.");
		}
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
	const currentDate = new Date().toLocaleString();
	const entry = { date: currentDate, value: totalResult };

	const historyData = JSON.parse(localStorage.getItem("historyData")) || [];
	historyData.push(entry);
	localStorage.setItem("historyData", JSON.stringify(historyData));

	const totalResultElement = document.getElementById("totalResult");
	const changeIndicator =
		totalResult - history !== 0
			? totalResult > history
				? `+${totalResult - history} 📈`
				: `-${history - totalResult} 📉`
			: "";

	totalResultElement.innerHTML = `Total Result: <span>${totalResult}</span> ${changeIndicator}`;
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
