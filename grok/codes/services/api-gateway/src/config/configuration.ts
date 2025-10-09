export default () => ({
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  jwtSecret: process.env.JWT_SECRET,
});
