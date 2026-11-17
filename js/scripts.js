function convert() {
  const typeEl = document.getElementById("convType");
  if (!typeEl) return;
  const type = typeEl.value;
  const val = parseFloat(document.getElementById("inputValue").value);
  const resBox = document.getElementById("result");

  if (isNaN(val)) {
    resBox.textContent = "Please enter a valid number.";
    return;
  }

  let output = "";
  if (type === "c2f") {
    output = `${val} °C = ${((val * 9 / 5) + 32).toFixed(2)} °F`;
  } else if (type === "f2c") {
    output = `${val} °F = ${(((val - 32) * 5) / 9).toFixed(2)} °C`;
  } else if (type === "m2f") {
    output = `${val} Meters = ${(val * 3.28084).toFixed(2)} Feet`;
  } else if (type === "f2m") {
    output = `${val} Feet = ${(val / 3.28084).toFixed(2)} Meters`;
  }
  resBox.textContent = output;
}

function computeTax() {
  const incomeEl = document.getElementById("income");
  if (!incomeEl) return;
  const income = parseFloat(incomeEl.value);
  const resBox = document.getElementById("taxResult");

  if (isNaN(income) || income < 0) {
    resBox.textContent = "Please enter a valid non-negative income.";
    return;
  }

  let tax = 0;
  if (income <= 250000) {
    tax = 0;
  } else if (income <= 400000) {
    tax = (income - 250000) * 0.20;
  } else if (income <= 800000) {
    tax = 30000 + (income - 400000) * 0.25;
  } else if (income <= 2000000) {
    tax = 130000 + (income - 800000) * 0.30;
  } else if (income <= 8000000) {
    tax = 490000 + (income - 2000000) * 0.32;
  } else {
    tax = 2410000 + (income - 8000000) * 0.35;
  }

  resBox.innerHTML = `
    <div><strong>Taxable Income:</strong> ₱${income.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
    <div class="fs-5 mt-1"><strong>Income Tax Due:</strong> ₱${tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
  `;
}

// Assignment #3: Factorial (While), Sum (Do-While), Average (For)
function calculateLoops() {
  const numEl = document.getElementById("numN");
  if (!numEl) return;
  const n = parseInt(numEl.value, 10);
  const resBox = document.getElementById("loopResult");

  if (isNaN(n) || n < 1) {
    resBox.textContent = "Please enter a positive integer (1 or greater).";
    return;
  }

  let factorial = 1;
  let i = 1;
  while (i <= n) {
    factorial *= i;
    i++;
  }

  let sum = 0;
  let j = 1;
  do {
    sum += j;
    j++;
  } while (j <= n);

  let avgSum = 0;
  for (let k = 1; k <= n; k++) {
    avgSum += k;
  }
  const average = avgSum / n;

  resBox.innerHTML = `
    <div><strong>Factorial (While Loop):</strong> ${factorial}</div>
    <div><strong>Sum (Do-While Loop):</strong> ${sum}</div>
    <div><strong>Average (For Loop):</strong> ${average.toFixed(2)}</div>
  `;
}

let payroll = [];

function addEmployee() {
  const name = document.getElementById("empName").value.trim();
  const days = parseFloat(document.getElementById("daysWorked").value);
  const rate = parseFloat(document.getElementById("dailyRate").value);
  const ded = parseFloat(document.getElementById("deduction").value) || 0;

  if (!name || isNaN(days) || isNaN(rate) || days < 0 || rate < 0 || ded < 0) {
    alert("Please fill in valid employee details.");
    return;
  }

  const gross = days * rate;
  const net = gross - ded;
  payroll.push({ name, days, rate, gross, ded, net });

  document.getElementById("empName").value = "";
  document.getElementById("daysWorked").value = "";
  document.getElementById("dailyRate").value = "";
  document.getElementById("deduction").value = "";
  renderTable();
}

function deleteEmployee() {
  const line = parseInt(document.getElementById("deleteLine").value, 10);
  if (isNaN(line) || line < 1 || line > payroll.length) {
    alert("Invalid line number.");
    return;
  }
  payroll.splice(line - 1, 1);
  document.getElementById("deleteLine").value = "";
  renderTable();
}

function clearPayroll() {
  payroll = [];
  renderTable();
}

function renderTable() {
  const tbody = document.getElementById("payrollBody");
  if (!tbody) return;
  tbody.innerHTML = "";
  let sumGross = 0, sumDed = 0, sumNet = 0;

  payroll.forEach((emp, idx) => {
    sumGross += emp.gross;
    sumDed += emp.ded;
    sumNet += emp.net;
    tbody.innerHTML += `
      <tr>
        <td>${idx + 1}</td>
        <td>${emp.name}</td>
        <td>${emp.days}</td>
        <td>${emp.rate.toFixed(2)}</td>
        <td>${emp.gross.toFixed(2)}</td>
        <td>${emp.ded.toFixed(2)}</td>
        <td>${emp.net.toFixed(2)}</td>
      </tr>
    `;
  });

  document.getElementById("totalGross").textContent = sumGross.toFixed(2);
  document.getElementById("totalDed").textContent = sumDed.toFixed(2);
  document.getElementById("totalNet").textContent = sumNet.toFixed(2);
}
