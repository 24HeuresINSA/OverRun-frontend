process.env.VUE_APP_API_BASE_URL = "https://overrun.traefik.me/api/v1";

module.exports = {
  devServer: {
    disableHostCheck: true,
    public: "https://overrun.traefik.me",
  },
  publicPath: "/admin",
  outputDir: "dist/admin",
  indexPath: "../index.html",
};
