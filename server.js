const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/leave-requests", (req, res) => {
  const {
    employeeName,
    employeeId,
    leaveType,
    availableLeaveBalance,
    requestedDays
  } = req.body;

  // Basic input validation
  if (!employeeName || !employeeName.trim()) {
    return res.status(400).json({
      accepted: false,
      message: "Employee name is required."
    });
  }

  if (!employeeId || !employeeId.trim()) {
    return res.status(400).json({
      accepted: false,
      message: "Employee ID is required."
    });
  }

  const validLeaveTypes = ["Annual Leave", "Sick Leave", "Emergency Leave"];

  if (!validLeaveTypes.includes(leaveType)) {
    return res.status(400).json({
      accepted: false,
      message: "Please select a valid leave type."
    });
  }

  const balance = Number(availableLeaveBalance);
  const days = Number(requestedDays);

  if (!Number.isFinite(balance)) {
    return res.status(400).json({
      accepted: false,
      message: "Available leave balance must be a valid number."
    });
  }

  if (balance < 0) {
    return res.status(400).json({
      accepted: false,
      message: "Available leave balance cannot be negative."
    });
  }

  if (!Number.isFinite(days) || days <= 0) {
    return res.status(400).json({
      accepted: false,
      message: "Number of requested days must be greater than 0."
    });
  }

  // Business rules
  if (leaveType === "Annual Leave" && days > balance) {
    return res.status(200).json({
      accepted: false,
      status: "Rejected",
      message: `Insufficient annual leave balance. You requested ${days} day(s), but only ${balance} day(s) are available.`
    });
  }

  if (leaveType === "Emergency Leave") {
    return res.status(200).json({
      accepted: true,
      status: "Accepted",
      emergency: true,
      message: `Emergency Leave request for ${days} day(s) has been accepted.`
    });
  }

  if (leaveType === "Sick Leave") {
    return res.status(200).json({
      accepted: true,
      status: "Accepted",
      message: `Sick Leave request for ${days} day(s) has been accepted.`
    });
  }

  return res.status(200).json({
    accepted: true,
    status: "Accepted",
    message: `Annual Leave request for ${days} day(s) has been accepted.`
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Employee Leave Request App running at http://localhost:${PORT}`);
});
