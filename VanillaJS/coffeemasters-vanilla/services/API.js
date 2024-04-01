const API = {
  // url: "https://firtman.github.io/coffeemasters/api/menu.json",
  url: '/data/menu.json',
  // use fetch api
  fetchMenu: async () => {
    const result = await fetch(API.url);
    // result is an HTTP response so parse it to json
    return await result.json();
  },
};

export default API;
