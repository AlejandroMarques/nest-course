export const EnvConfiguration = () => ({
  enviroment: process.env.NODE_ENV || 'dev',
  mongodbUrl: process.env.MONGODB_URL,
  port: Number(process.env.PORT) || 3000,
  defaultLimit: Number(process.env.DEFAULT_LIMIT) || 10,
});
