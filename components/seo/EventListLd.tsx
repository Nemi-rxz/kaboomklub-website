type EventItemLd = {
  name: string;
  url?: string;
  startDate?: string;
  endDate?: string;
  locationName?: string;
  image?: string;
  description?: string;
  organizerName?: string;
};

export default function EventListLd({ items = [] }: { items: EventItemLd[] }) {
  if (!items.length) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Event",
        name: e.name,
        url: e.url || undefined,
        startDate: e.startDate || undefined,
        endDate: e.endDate || undefined,
        location: e.locationName
          ? {
              "@type": "Place",
              name: e.locationName,
            }
          : undefined,
        image: e.image ? [e.image] : undefined,
        description: e.description || undefined,
        organizer: e.organizerName
          ? { "@type": "Organization", name: e.organizerName }
          : undefined,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
