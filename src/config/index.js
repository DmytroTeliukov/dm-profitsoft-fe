
const config = {
  // Services
  USERS_SERVICE: 'http://localhost:3000',
  BACK_END_SERVICE: process.env.REACT_APP_BACKEND_URL, // Back-END localhost address
  UI_URL_PREFIX: process.env.REACT_APP_UI_URL_PREFIX || '',
};

export default config;
