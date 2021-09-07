module.exports = {
  module: {
    rules: [
      {
        test: /\(.svg|.png)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              encoding: "base64",
            },
          },
        ],
      },
    ],
  },
};
