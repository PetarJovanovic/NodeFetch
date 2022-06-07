const fetch = require('node-fetch');

const getData = (async () => {
  const base = 'https://swapi.dev/api/people/?page=';
  let data = [];
  for (let i = 1; i < 10; i++) {
    const fetchData = await fetch(`${base}${i}`);
    const jsonData = await fetchData.json();
    data = data.concat(jsonData.results);
  }
  for (let i = 0; i < data.length; i++) {
    const fetchHomeWorld = await fetch(data[i].homeworld);
    const jsonHomeWorld = await fetchHomeWorld.json();
    data[i].homeworld = jsonHomeWorld.name;
  }
  return data;
});

const test = (async () => {
  const data = await getData();
  const filteredData = data.filter(element => element.height !== 'unknown');
  const filteredUnknownHeight = data.filter(element => element.height === 'unknown');
  const mapedUnknownHeight = filteredUnknownHeight
    .map(element => ({ height: element.height, name: element.name, home: element.homeworld }));
  const mapedData = filteredData
    .map(element => ({ height: element.height, name: element.name, home: element.homeworld }));
  const sortedData = mapedData.sort((a, b) => b.height - a.height);
  const finalSortedData = sortedData.concat(mapedUnknownHeight);
  console.log(finalSortedData);
});

test();
