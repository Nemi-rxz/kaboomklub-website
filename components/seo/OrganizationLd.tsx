type Props = {
  siteName?: string;
  siteUrl?: string;
  logo?: string;
  description?: string;
  socialLinks?: string[];
};

export default function OrganizationLd({
  siteName = "KaboomKlub",
  siteUrl = "https://kaboomklub.com",
  logo,
  description,
  socialLinks = [],
}: Props) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: logo || undefined,
    description: description || undefined,
    sameAs: socialLinks.length ? socialLinks : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
