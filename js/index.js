/**
 * Gets the history total result from local storage, or 0 if it does not exist.
 * @returns {number} The history total result.
 */
const history = parseFloat(localStorage.getItem("history")) || 0;

/**
 * The current total result.
 * @type {number}
 */
let totalResult = history;

/**
 * Sets the history total result in local storage.
 * @param {number} newValue - The new history total result.
 */
const changeHistory = (newValue) => {
	localStorage.setItem("history", newValue);
};

/**
 * Calculates the new total result based on the entered salary and expenses, and updates the total result.
 */
function calculateCapital() {
	// Get input values
	const salaryInput = document.getElementById("salary");
	const expensesInput = document.getElementById("expenses");
	const salary = parseFloat(salaryInput.value) || 0;
	const expenses = parseFloat(expensesInput.value) || 0;

	// Calculate new total result
	const newTotalResult = totalResult + salary - expenses;

	// Check if new total result is valid and update total result
	if ((newTotalResult >= 0 && salary) || expenses) {
		totalResult = newTotalResult;
		changeHistory(totalResult);
		updateHistory();
		salaryInput.value = "";
		expensesInput.value = "";
	} else {
		alert("Total result cannot be negative. Please enter valid values.");
	}
}

/**
 * Allows the user to enter a new total result.
 */
function editResult() {
	// Get new total result from user input
	const newResult = parseFloat(prompt("Enter the new result:"));

	// Check if new total result is valid and update total result
	if (!isNaN(newResult)) {
		totalResult = newResult;
		changeHistory(totalResult);
		updateHistory();
	}
}

/**
 * Updates the history display with the current total result and date.
 */
function updateHistory() {
	// Get current date and create new history entry
	const currentDate = new Date().toLocaleString();
	const entry = { date: currentDate, value: totalResult };

	// Get history data from local storage and add new entry
	const historyData = JSON.parse(localStorage.getItem("historyData")) || [];
	historyData.push(entry);
	localStorage.setItem("historyData", JSON.stringify(historyData));

	// Update total result display
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
