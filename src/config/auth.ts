export default {
  JWT: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: '3d',
  },
};
