export default {
  JWT: {
    secret: process.env.APP_SECRET,
    expiresIn: '3d',
  },
};
