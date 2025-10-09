export default () => ({
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_here',
  authServiceUrl: process.env.AUTH_SERVICE_URL || 'http://auth-service:3001',
  userServiceUrl: process.env.USER_SERVICE_URL || 'http://user-service:3002',
  chatOrchUrl: process.env.CHAT_ORCH_URL || 'http://chat-orch:3003',
});
