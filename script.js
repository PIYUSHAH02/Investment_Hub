// script.js

function analyzeCompany() {
    const inputOption = document.querySelector('input[name="input-option"]:checked').value;

    if (inputOption === 'manual') {
        const ratio = document.getElementById('ratio-select').value;

        switch (ratio) {
            case 'netProfitMargin':
                const netIncome = parseFloat(document.getElementById('net-income').value);
                const salesRevenue = parseFloat(document.getElementById('sales-revenue').value);
                const netProfitMargin = (netIncome / salesRevenue) * 100;
                displayRatioAndVerdict(ratio, "Net Profit Margin", netProfitMargin);
                break;
            case 'earningsPerShare':
                const epsNetIncome = parseFloat(document.getElementById('eps-net-income').value);
                const sharesOutstanding = parseFloat(document.getElementById('shares-outstanding').value);
                const earningsPerShare = epsNetIncome / sharesOutstanding;
                displayRatioAndVerdict(ratio, "Earnings per Share (EPS)", earningsPerShare);
                break;
            case 'returnOnEquity':
                const roeNetIncome = parseFloat(document.getElementById('roe-net-income').value);
                const shareholdersEquity = parseFloat(document.getElementById('shareholders-equity').value);
                const returnOnEquity = (roeNetIncome / shareholdersEquity) * 100;
                displayRatioAndVerdict(ratio, "Return on Equity (ROE)", returnOnEquity);
                break;
            case 'returnOnAsset':
                const roaNetIncome = parseFloat(document.getElementById('roa-net-income').value);
                const totalAssets = parseFloat(document.getElementById('total-assets').value);
                const returnOnAsset = (roaNetIncome / totalAssets) * 100;
                displayRatioAndVerdict(ratio, "Return on Asset (ROA)", returnOnAsset);
                break;
            default:
                displayResult("Please select a valid ratio.");
                break;
        }
    } else {
        const file = document.getElementById('balance-sheet-file').files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const content = e.target.result;
                // Parse the uploaded balance sheet file (assumed to be CSV or JSON)
                const parsedData = parseFileContent(content);
                if (parsedData) {
                    calculateRatios(parsedData);
                } else {
                    displayResult("Error parsing the file. Please ensure it is in the correct format.");
                }
            };
            reader.readAsText(file);
        } else {
            displayResult("Please upload a balance sheet file.");
        }
    }
}


function displayRatioAndVerdict(ratioName, ratioResult, ratioValue) {
    const verdict = analyzeCompanyHealth(ratioName, ratioValue);
    const result = `${ratioResult}: ${ratioValue}\n\n${verdict}`;
    displayResult(result);
}


function analyzeCompanyHealth(ratioName, ratioValue) {
    let verdict = "";

    switch (ratioName) {
        case 'netProfitMargin':
            if (ratioValue >= 10) {
                verdict += "- Net Profit Margin is healthy.\n";
            } else {
                verdict += "- Net Profit Margin is low and needs improvement.\n";
            }
            break;
        case 'earningsPerShare':
            if (ratioValue >= 1) {
                verdict += "- Earnings per Share is satisfactory.\n";
            } else {
                verdict += "- Earnings per Share is low and needs improvement.\n";
            }
            break;
        case 'returnOnEquity':
            if (ratioValue >= 15) {
                verdict += "- Return on Equity is good.\n";
            } else {
                verdict += "- Return on Equity is low and needs improvement.\n";
            }
            break;
        case 'returnOnAsset':
            if (ratioValue >= 5) {
                verdict += "- Return on Asset is acceptable.\n";
            } else {
                verdict += "- Return on Asset is low and needs improvement.\n";
            }
            break;
        default:
            verdict += "- No verdict available.";
            break;
    }

    return verdict;
}


function displayResult(result) {
    document.getElementById('company-analysis-result').innerText = result;
}

function parseFileContent(content) {
    // Implement file parsing logic here (e.g., CSV or JSON parsing)
    // This is a stub and should be replaced with actual parsing logic
    try {
        // Assuming JSON format for simplicity
        return JSON.parse(content);
    } catch (error) {
        console.error("Failed to parse file content:", error);
        return null;
    }
}

function calculateRatios(data) {
    try {
        const netIncome = parseFloat(data.netIncome);
        const salesRevenue = parseFloat(data.salesRevenue);
        const netProfitMargin = (netIncome / salesRevenue) * 100;
        displayRatioAndVerdict("netProfitMargin", "Net Profit Margin", netProfitMargin);

        const epsNetIncome = parseFloat(data.epsNetIncome);
        const sharesOutstanding = parseFloat(data.sharesOutstanding);
        const earningsPerShare = epsNetIncome / sharesOutstanding;
        displayRatioAndVerdict("earningsPerShare", "Earnings per Share (EPS)", earningsPerShare);

        const roeNetIncome = parseFloat(data.roeNetIncome);
        const shareholdersEquity = parseFloat(data.shareholdersEquity);
        const returnOnEquity = (roeNetIncome / shareholdersEquity) * 100;
        displayRatioAndVerdict("returnOnEquity", "Return on Equity (ROE)", returnOnEquity);

        const roaNetIncome = parseFloat(data.roaNetIncome);
        const totalAssets = parseFloat(data.totalAssets);
        const returnOnAsset = (roaNetIncome / totalAssets) * 100;
        displayRatioAndVerdict("returnOnAsset", "Return on Asset (ROA)", returnOnAsset);
    } catch (error) {
        console.error("Failed to calculate ratios:", error);
        displayResult("Error calculating ratios. Please check the data format.");
    }
}


function calculateNPV() {
    const initialInvestment = parseFloat(document.getElementById('initial-investment').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100;
    const timePeriod = parseFloat(document.getElementById('time-period').value);

    const npv = initialInvestment * Math.pow((1 + interestRate), timePeriod);
    document.getElementById('npv-result').textContent = `Net Present Value: $${npv.toFixed(2)}`;
}

function calculateFV() {
    const initialInvestment = parseFloat(document.getElementById('initial-investment').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100;
    const timePeriod = parseFloat(document.getElementById('time-period').value);

    const fv = initialInvestment * Math.pow((1 + interestRate), timePeriod);
    document.getElementById('npv-result').textContent = `Future Value: $${fv.toFixed(2)}`;
}

// Function to analyze the uploaded data and create visualizations
function analyzeData() {
    const fileInput = document.getElementById('data-file');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function () {
            const csvData = reader.result;
            const data = processCSVData(csvData);
            createFlowChart(data);
            createPieChart(data);
        };
        reader.readAsText(file);
    } else {
        alert('Please select a CSV file.');
    }
}

// Function to process the CSV data
function processCSVData(csvData) {
    const rows = csvData.trim().split('\n');
    const labelColumnIndex = parseInt(document.getElementById('label-column-index').value);
    const valueColumnIndex = parseInt(document.getElementById('value-column-index').value);
    const data = [];

    for (let i = 1; i < rows.length; i++) {
        const rowValues = rows[i].split(',');
        if (rowValues.length > Math.max(labelColumnIndex, valueColumnIndex)) {
            const dataObj = {
                label: rowValues[labelColumnIndex],
                value: parseFloat(rowValues[valueColumnIndex])
            };
            data.push(dataObj);
        }
    }

    return data;
}

// Function to create a flow chart
function createFlowChart(data) {
    const labels = data.map(item => item.label);
    const values = data.map(item => item.value);

    let flowChart = document.getElementById('flowChart');
    if (!flowChart) {
        const ctx = document.createElement('canvas');
        ctx.id = 'flowChart';
        document.getElementById('data-visualization').appendChild(ctx);
        flowChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Data Values',
                    data: values,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        flowChart.data.labels = labels;
        flowChart.data.datasets[0].data = values;
        flowChart.update();
    }
}

// Function to create a pie chart
function createPieChart(data) {
    const labels = data.map(item => item.label);
    const values = data.map(item => item.value);

    let pieChart = document.getElementById('pieChart');
    if (!pieChart) {
        const ctx = document.createElement('canvas');
        ctx.id = 'pieChart';
        document.getElementById('data-visualization').appendChild(ctx);
        pieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Data Distribution'
                    }
                }
            }
        });
    } else {
        pieChart.data.labels = labels;
        pieChart.data.datasets[0].data = values;
        pieChart.update();
    }
}