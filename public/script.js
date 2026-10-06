const form = document.getElementById("leaveForm");
const submitButton = document.getElementById("submitButton");
const result = document.getElementById("result");
const resultIcon = document.getElementById("resultIcon");
const resultLabel = document.getElementById("resultLabel");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");

function showResult(type, label, title, message, icon) {
  result.className = `result ${type}`;
  resultIcon.textContent = icon;
  resultLabel.textContent = label;
  resultTitle.textContent = title;
  resultMessage.textContent = message;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const payload = {
    employeeName: document.getElementById("employeeName").value.trim(),
    employeeId: document.getElementById("employeeId").value.trim(),
    leaveType: document.getElementById("leaveType").value,
    availableLeaveBalance: document.getElementById("availableLeaveBalance").value,
    requestedDays: document.getElementById("requestedDays").value
  };

  submitButton.disabled = true;
  submitButton.querySelector("span").textContent = "Processing...";

  try {
    const response = await fetch("/api/leave-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      showResult("error", "Invalid Input", "Request could not be submitted", data.message, "!");
      return;
    }

    if (!data.accepted) {
      showResult("error", "Rejected", "Leave Request Rejected", data.message, "!");
      return;
    }

    if (data.emergency) {
      showResult("emergency", "Emergency Leave", "Leave Request Accepted", data.message, "!");
      return;
    }

    showResult("success", "Accepted", "Leave Request Accepted", data.message, "✓");
  } catch (error) {
    showResult(
      "error",
      "System Error",
      "Unable to process request",
      "Please check that the application server is running and try again.",
      "!"
    );
  } finally {
    submitButton.disabled = false;
    submitButton.querySelector("span").textContent = "Submit Leave Request";
    result.classList.remove("hidden");
  }
});
