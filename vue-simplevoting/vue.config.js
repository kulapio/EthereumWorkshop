// vue.config.js
module.exports = {
  // options...
  devServer: {
    disableHostCheck: true,
    port: 8080,
    public: '0.0.0.0:8080'
  },
  publicPath: "/workshop/vuejs/simplevote/"
}
