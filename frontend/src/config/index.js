const config = {
  apiUrl: import.meta.env.PROD
    ? "https://your-vercel-domain.vercel.app/api"
    : "http://localhost:5000/api",
  environment: import.meta.env.MODE,
};

export default config;
