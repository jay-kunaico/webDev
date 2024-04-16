import http from "node:http";
import process from "node:process";

const PORT = 3000;
const WEATHERAPI = "http://api.weatherapi.com/v1/";
const KEY = process.env.API_KEY;

const server = http.createServer(async function (req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const queryParams = url.searchParams;
  const location = queryParams.get("location");
  const endPoint = queryParams.get("endPoint");
  const days = queryParams.get("days") || null;
  const dt = queryParams.get("dt") || null;
  console.log("queryParams location", location);
  console.log("queryParams endPoint", endPoint);
  console.log("queryParams days", days);
  console.log(" from client url ", url.href);
  // check if api is included in the requested URL
  // Only execute if api is there
  if (req.url.includes("api")) {
    //check if there is an endpoint.  An endpoint is required
    if (!endPoint) {
      // Bad request, end point is required
      res.writeHead(400, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "Missing endpoint" }));
    } else {
      // there is an endpoint send the response with content type json
      res.writeHead(200, { "content-type": "application/json" });

      //call the fetchData function passing the parameters needed
      const data = await fetchData(location, endPoint, days, dt);

      res.end(JSON.stringify(data));
    }
    return res;
  }
  async function fetchData(location, endPoint, days, dt) {
    // construct the url with the parameters
    let url = `${WEATHERAPI}${endPoint}?key=${KEY}&q=${location}`;
    // const url = 'http://api.weatherapi.com/v1/current.json?key=64e56a234a35416b98b115919240904&q=London&aqi=no'

    // only include this parameter if it has a value
    if (days) {
      url += `&days=${days}`;
    }
    // only include this parameter if it has a value
    if (dt) {
      url += `&dt=${dt}`;
    }
    console.log("server url ", url);
    const result = await fetch(url);

    // save the response converted to json and return it
    const data = await result.json();
    return data;
  }
  res.end();
});
server.listen(PORT);
console.log(`Server started on port ${PORT}`);
