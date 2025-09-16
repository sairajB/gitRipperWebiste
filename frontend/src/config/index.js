const config = {
  apiUrl: import.meta.env.PROD
    ? "/api" // Use relative URLs in production
    : "http://localhost:5000/api",
  environment: import.meta.env.MODE,
};

export default config;
