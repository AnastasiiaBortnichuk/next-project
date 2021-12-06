module.exports = {
  images: {
    domains: ['makeup-api.herokuapp.com', 's3.amazonaws.com', 'images'],
  },
  future: {
    webpack5: true,
  },
  env: {
    APP_ID: process.env.APP_ID,
    API_KEY: process.env.API_KEY,
  }
}