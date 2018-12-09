module.exports = {
  staticFileGlobs: [
    '/index.html'
  ],
  navigateFallback: '',
  runtimeCaching: [{
    urlPattern: /(.html|.js|.json)/,
    handler: 'networkFirst'
  }]
};
