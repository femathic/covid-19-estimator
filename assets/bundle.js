const form = document.getElementById("covid-form");
const page1 = document.getElementById("firstPage");
const page2 = document.getElementById("secondPage");
form.addEventListener("submit", (e) => { runEstimate(e) });

const runEstimate = (e) => {
  e.preventDefault();
  page1.classList.add("hidden");
  page2.classList.remove("hidden");

  const data = {
    region: {
      name: 'Africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 5,
      avgDailyIncomePopulation: 0.71
    },
    periodType: document.getElementById("period-type").value,
    timeToElapse: document.getElementById("time-to-elapse").value,
    reportedCases: document.getElementById("reported-cases").value,
    population: document.getElementById("data-population").value,
    totalHospitalBeds: document.getElementById("total-hospital-beds").value
  }

  const { impact, severeImpact } = covid19ImpactEstimator(data);

  document.getElementById("i-current").innerText = impact.currentlyInfected;
  document.getElementById("i-infected").innerText = impact.infectionsByRequestedTime;
  document.getElementById("i-severe").innerText = impact.severeCasesByRequestedTime;
  document.getElementById("i-bed").innerText = impact.hospitalBedsByRequestedTime;
  document.getElementById("i-icu").innerText = impact.casesForICUByRequestedTime;
  document.getElementById("i-vent").innerText = impact.casesForVentilatorsByRequestedTime;
  document.getElementById("i-dollar").innerText = impact.dollarsInFlight;

  document.getElementById("s-current").innerText = severeImpact.currentlyInfected;
  document.getElementById("s-infected").innerText = severeImpact.infectionsByRequestedTime;
  document.getElementById("s-severe").innerText = severeImpact.severeCasesByRequestedTime;
  document.getElementById("s-bed").innerText = severeImpact.hospitalBedsByRequestedTime;
  document.getElementById("s-icu").innerText = severeImpact.casesForICUByRequestedTime;
  document.getElementById("s-vent").innerText = severeImpact.casesForVentilatorsByRequestedTime;
  document.getElementById("s-dollar").innerText = severeImpact.dollarsInFlight;
  
};

