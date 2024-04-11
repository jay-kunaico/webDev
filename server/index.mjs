import http from 'node:http';
import process from 'node:process';

const PORT = 3000;
const WEATHERAPI = 'http://api.weatherapi.com/v1/';
const KEY = process.env.REACT_APP_API_KEY;

const server = http.createServer(async function (req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const queryParams = url.searchParams;
  const location = queryParams.get('location');
  const endPoint = queryParams.get('endPoint');
  const days = queryParams.get('days') || null;
  const dt = queryParams.get('dt') || null;
  // console.log('queryParams location', location);
  // console.log('queryParams endPoint', endPoint);
  console.log('url ', url.href);

  if (req.url.includes('api')) {
    if (!endPoint) {
      // Bad request, end point is required
      res.writeHead(400, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing endpoint' }));
    } else {
      res.writeHead(200, { 'content-type': 'application/json' });

      const data = await fetchData(location, endPoint, days, dt);
      // console.log('data ', data);

      res.end(JSON.stringify(data));
    }
    return res;
  }
  async function fetchData(location) {
    let url = `${WEATHERAPI}${endPoint}?key=${KEY}&q=${location}`;
    if (days) {
      url += `&days=${days}`;
    }
    if (dt) {
      url += `&dt=${dt}`;
    }
    // console.log('server dt ', dt);

    // console.log('server url ', url);
    const result = await fetch(url);
    const data = await result.json();
    return data;
  }
  res.end();
});
server.listen(PORT);
console.log(`Server started on port ${PORT}`);
