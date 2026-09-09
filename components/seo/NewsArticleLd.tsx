type Props = {
  title: string;
  description: string;
  url: string;
  image?: string;
  authorName?: string;
  datePublished?: string;
  dateModified?: string;
  publisherName?: string;
  publisherLogo?: string;
  keywords?: string[];
};

export default function NewsArticleLd({
  title,
  description,
  url,
  image,
  authorName,
  datePublished,
  dateModified,
  publisherName = "KaboomKlub",
  publisherLogo,
  keywords,
}: Props) {
  const data = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: image ? [image] : undefined,
    author: authorName
      ? { "@type": "Organization", name: authorName }
      : { "@type": "Organization", name: publisherName },
    datePublished: datePublished || undefined,
    dateModified: dateModified || datePublished || undefined,
    publisher: {
      "@type": "Organization",
      name: publisherName,
      logo: publisherLogo
        ? { "@type": "ImageObject", url: publisherLogo }
        : undefined,
    },
    keywords: keywords && keywords.length ? keywords.join(", ") : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
