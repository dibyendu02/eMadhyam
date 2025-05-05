import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: "/auth/",
      },
      {
        userAgent: "*",
        disallow: "/api/",
      },
      {
        userAgent: "*",
        disallow: "/admin/",
      },
      {
        userAgent: "*",
        allow: "/product/",
      },
    ],
    sitemap: "https://www.emadhyam.com/sitemap.xml",
  };
}
