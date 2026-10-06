# Employee Leave Request Application

Phase 2 – Technical Assessment  
Role: Software & DMS Support Intern

## Technology Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js + Express
- Storage: No database

## Features

- Employee name and ID input
- Annual, Sick, and Emergency leave selection
- Leave balance and requested days input
- Required input validation
- Annual leave balance validation
- Sick leave acceptance independent of annual balance
- Emergency leave identification
- Clear accepted/rejected messages

## Business Rules Implemented

1. Annual Leave: requested days must not exceed available leave balance.
2. Sick Leave: can be submitted even when annual leave balance is insufficient.
3. Emergency Leave: can be submitted and is clearly identified as emergency leave.
4. Requested days must be greater than 0.
5. Available leave balance cannot be negative.

## How to Run

### 1. Install Node.js

Make sure Node.js and npm are installed.

### 2. Open the project folder

```bash
cd employee-leave-request-app
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the application

```bash
npm start
```

### 5. Open in browser

Visit:

http://localhost:3000

## Example Test Cases

### Test 1 – Annual Leave Accepted
- Balance: 5
- Requested: 3
- Expected: Accepted

### Test 2 – Annual Leave Rejected
- Balance: 2
- Requested: 4
- Expected: Rejected – insufficient balance

### Test 3 – Sick Leave
- Balance: 0
- Requested: 3
- Expected: Accepted

### Test 4 – Emergency Leave
- Balance: 0
- Requested: 2
- Expected: Accepted and identified as Emergency Leave

### Test 5 – Invalid Requested Days
- Requested: 0
- Expected: Rejected/Invalid input

### Test 6 – Invalid Leave Balance
- Balance: -1
- Expected: Rejected/Invalid input
