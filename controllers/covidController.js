const request = require('request');

const fetchCovidData = () => {

  const options = {
    'method': 'GET',
    'url': 'https://api.covid19india.org/data.json'
  };

  return new Promise((resolve, reject) => {
    request(options, function (error, response) {
      if (error) {
        console.error(error);
        reject(new Error(error));
      }
      const covidData = JSON.parse(response.body);
      let result = {
        totalCases: 0,
        newCases: 0,
        stateWiseData: [],
      }

      console.log(covidData.statewise)
      const stateWiseData = covidData.statewise;
      stateWiseData.forEach(data => {
        if (data.state === "Total") {
          result.totalCases = data.active;
          result.newCases = data.deltaconfirmed;
        } else if (data.state !== "State Unassigned"){
          result.stateWiseData.push({
            name: data.state,
            totalCases: data.active,
            newCases: data.deltaconfirmed,
          })
        }
      })
      // console.log("returning", result);
      resolve(result);
    });
  })


}

module.exports = {
  fetchCovidData,
}