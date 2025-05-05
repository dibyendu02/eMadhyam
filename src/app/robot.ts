import { MetadataRoute } from "next";

export default function robot(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: "/auth",
      },
      {
        userAgent: "*",
        allow: "/product",
        crawlDelay: 5,
      },
    ],
  };
}
