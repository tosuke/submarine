module.exports = function(api) {
  api.cache(true)
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          lazyImports: true,
        },
      ],
    ],
    plugins: [
      [
        'babel-plugin-transform-inline-environment-variables',
        {
          include: ['SEA_URL', 'CLIENT_ID', 'CLIENT_SECRET'],
        },
      ],
    ],
  }
}
