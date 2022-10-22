module.exports = {
  images: {
    domains: [
      "http://77.243.85.234/images/",
      "http://77.243.85.234",
      "dealshop.com.ar",
      'www.dealshop.com.ar',
      "https://www.dealshop.com.ar/",
      "http://77.243.85.234/images/",
      "http://localhost:3000/",
      "77.243.85.234",
    ],
  },
  domains: [
    "http://77.243.85.234/images/",
    "http://77.243.85.234",
    "deal.com.ar",
    "http://77.243.85.234",
    "http://www.deal.com.ar/",
    "77.243.85.234",
    "http://77.243.85.234/images/",
  ],
  // webpack5: false,
  publicRuntimeConfig: {
    backend_url: process.env.NEXT_PUBLIC_BACKEND_URL,
    images_backend_url: process.env.NEXT_PUBLIC_BACKEND_IMAGES_URL,
    recaptcha_key: process.env.NEXT_PUBLIC_CAPTCHA_KEY,
    google_key: process.env.NEXT_PUBLIC_GOOGLE_KEY,
    backend_url_client: process.env.NEXT_PUBLIC_BACKEND_CLIENT,
    dealshop_url: process.env.DEALSHOP_URL,
  },
};
