import { Metadata } from "next";

type MetadataProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  canonical?: string;
  type?: string;
};

export const defaultMetadata: Metadata = {
  title: "Next.js MVP",
  description:
    "A Next.js MVP application with Zustand, Zod, TanStack Query, and more",
  keywords: ["Next.js", "React", "JavaScript", "TypeScript", "Web Development"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  publisher: "Your Company",
  robots: "index, follow",
  metadataBase: new URL("https://your-domain.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "Next.js MVP",
    description:
      "A Next.js MVP application with Zustand, Zod, TanStack Query, and more",
    siteName: "Next.js MVP",
    images: [
      {
        url: "https://your-domain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Next.js MVP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js MVP",
    description:
      "A Next.js MVP application with Zustand, Zod, TanStack Query, and more",
    creator: "@yourtwitterhandle",
    images: ["https://your-domain.com/twitter-image.jpg"],
  },
};

export function generateMetadata({
  title,
  description,
  keywords,
  image,
  canonical,
  type = "website",
}: MetadataProps): Metadata {
  const baseUrl = "https://your-domain.com";
  const imageUrl = image ? `${baseUrl}${image}` : `${baseUrl}/og-image.jpg`;
  const url = canonical ? `${baseUrl}${canonical}` : baseUrl;

  const metadata: Metadata = {
    ...defaultMetadata,
    title: title ? `${title} | Next.js MVP` : defaultMetadata.title,
    description: description || defaultMetadata.description,
    keywords: keywords || defaultMetadata.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: title || defaultMetadata.openGraph?.title,
      description: description || defaultMetadata.openGraph?.description,
      url,
      type: type as "website" | "article" | "video.other",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || "Next.js MVP",
        },
      ],
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: title || defaultMetadata.twitter?.title,
      description: description || defaultMetadata.twitter?.description,
      images: [imageUrl],
    },
  };

  return metadata;
}
