
const config = {
  // Services
  USERS_SERVICE: 'http://localhost:3000',
  BACK_END_SERVICE: "https://dmprofitsoftapigateway.azurewebsites.net", // Back-END localhost address
  UI_URL_PREFIX: process.env.REACT_APP_UI_URL_PREFIX || '',
};

export default config;
