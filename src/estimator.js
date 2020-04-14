
const requestedTime = (periodType, timeToElapse) => {
  switch (periodType) {
    case 'days':
      return 2 ** Math.floor(timeToElapse / 3);
    case 'weeks':
      return 2 ** Math.floor((timeToElapse * 7) / 3);
    case 'months':
      return (2 ** ((timeToElapse * 30) / 3));
    default:
      return timeToElapse;
  }
};


const covid19ImpactEstimator = (data) => {
  const impact = {}; // your best case estimation
  const severeImpact = {}; // your severe case estimation


  // ------------------------ Challenge 1 ------------------------
  // Currently Infected
  impact.currentlyInfected = Math.round(data.reportedCases * 10);
  severeImpact.currentlyInfected = Math.round(data.reportedCases * 50);

  // Infections By Requested Time
  impact.infectionsByRequestedTime = impact.currentlyInfected * requestedTime(
    data.periodType, data.timeToElapse
  );
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * requestedTime(
    data.periodType, data.timeToElapse
  );


  // ------------------------ Challenge 2 ------------------------
  // Severe Cases By Requested Time
  impact.severeCasesByRequestedTime = Math.round(impact.infectionsByRequestedTime * 0.15);
  severeImpact.severeCasesByRequestedTime = Math.round(
    severeImpact.infectionsByRequestedTime * 0.15
  );

  // Total Hospital Beds
  impact.hospitalBedsByRequestedTime = Math.ceil(
    (data.totalHospitalBeds * 0.35) - impact.severeCasesByRequestedTime
  );
  severeImpact.hospitalBedsByRequestedTime = Math.ceil(
    (data.totalHospitalBeds * 0.35) - severeImpact.severeCasesByRequestedTime
  );


  // ------------------------ Challenge 3 ------------------------
  // Cases For ICU By Requested Time
  impact.casesForICUByRequestedTime = Math.floor(impact.infectionsByRequestedTime * 0.05);
  severeImpact.casesForICUByRequestedTime = Math.floor(
    severeImpact.infectionsByRequestedTime * 0.05
  );

  // Cases For Ventilator By Requested Time
  impact.casesForVentilatorsByRequestedTime = Math.floor(impact.infectionsByRequestedTime * 0.02);
  severeImpact.casesForVentilatorsByRequestedTime = Math.floor(
    severeImpact.infectionsByRequestedTime * 0.02
  );

  // Dollars In Flight
  impact.dollarsInFlight = Math.floor(
    impact.infectionsByRequestedTime * data.region.avgDailyIncomePopulation
    * data.region.avgDailyIncomeInUSD * requestedTime(data.periodType, data.timeToElapse)
  );
  severeImpact.dollarsInFlight = Math.floor(
    severeImpact.infectionsByRequestedTime * data.region.avgDailyIncomePopulation
    * data.region.avgDailyIncomeInUSD * requestedTime(data.periodType, data.timeToElapse)
  );

  return { data, impact, severeImpact };
};


export default covid19ImpactEstimator;
// module.exports = covid19ImpactEstimator;
