const config = {
  // Services
  USERS_SERVICE: 'http://localhost:3000',
  DISHES_SERVICE: 'http://localhost:9091', // Back-END localhost address
  UI_URL_PREFIX: process.env.REACT_APP_UI_URL_PREFIX || '',
};

export default config;
