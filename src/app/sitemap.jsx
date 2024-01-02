const fs = require("fs");

const productIds = []; // Array to store product IDs

// Function to generate sitemap XML
const generateSitemap = (ids) => {
  const currentDate = new Date().toISOString();

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  ids.forEach((id) => {
    sitemap += `
    <url>
      <loc>https://front-end-next-js-task-taupe.vercel.app/${id}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`;
  });

  sitemap += `
  </urlset>`;

  fs.writeFileSync("./sitemap.xml", sitemap, "utf8");
};

// Function to generate product URLs based on fetched data
const generateProductIds = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const products = await response.json();

  products.forEach((product) => {
    productIds.push(encodeURIComponent(product.id));
  });

  generateSitemap(productIds);
};

generateProductIds();
