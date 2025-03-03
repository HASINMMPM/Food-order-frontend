const Sitemap = require("react-router-sitemap").default;

new Sitemap([
  { path: "/" },
  { path: "/menu" },
  { path: "/contact" },
])
  .build("https://food-order-frontend-ai6i.onrender.com")
  .save("./public/sitemap.xml");
