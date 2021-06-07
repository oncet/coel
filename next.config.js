const withTM = require("next-transpile-modules")(["ky"]);

module.exports = withTM({
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    localeDetection: false,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
});
