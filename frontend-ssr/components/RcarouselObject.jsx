// frontend-ssr/components/RcarouselObject.jsx
export default function RcarouselObject({ object }) {
  const items = object?.results || [];
  if (!items.length) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {items.map((p) => (
        <a key={p.id} href={`/produkt/${p.slug}/`} className="block">
          <div className="bg-white border rounded-lg p-3 hover:shadow">
            {p.image && (
              <img src={p.image} alt={p.name} className="w-full h-36 object-cover rounded" loading="lazy" />
            )}
            <div className="mt-2 text-sm line-clamp-2">{p.name}</div>
          </div>
        </a>
      ))}
    </div>
  );
}
