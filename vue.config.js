process.env.VUE_APP_API_BASE_URL = "https://overrun.24heures.org/api/v1";

module.exports = {
  devServer: {
    disableHostCheck: true,
    public: "https://overrun.24heures.org",
  },
  publicPath: "/admin",
  outputDir: "dist/admin",
  indexPath: "../index.html",
};
