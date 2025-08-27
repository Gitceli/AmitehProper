// frontend-ssr/components/ProductTable.jsx
export default function ProductTable({ products }) {
  const product = products?.[0];
  const specs = product?.specs || {};
  const entries = Object.entries(specs);
  if (!entries.length) return <p className="text-gray-500">Ni specifikacij.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {entries.map(([k, v]) => (
        <div key={k} className="flex justify-between bg-gray-50 rounded px-3 py-2">
          <span className="font-medium">{k}</span>
          <span>{v}</span>
        </div>
      ))}
    </div>
  );
}
