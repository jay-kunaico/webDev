import http from 'node:http';
import process from 'node:process';
import url from 'node:url';
// import fs from 'node:fs/promises';
const PORT = 3000;
const WEATHERAPI = 'http://api.weatherapi.com/v1/forecast.json';
const KEY = process.env.REACT_APP_API_KEY;

const server = http.createServer(async function (req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const queryParams = url.searchParams;
  //   console.log('queryParams', queryParams.get('location'));
  if (req.url.includes('api')) {
    res.writeHead(200, { 'content-type': 'application/json' });
    const data = await fetchData(queryParams.get('location'));

    res.end(JSON.stringify(data));
    return res;
  }
  async function fetchData(location) {
    const result = await fetch(`${WEATHERAPI}?q=${location}&key=${KEY}&days=3`);
    const data = await result.json();
    return data;
  }
  res.end();
});
server.listen(PORT);
console.log(`Server started on port ${PORT}`);
