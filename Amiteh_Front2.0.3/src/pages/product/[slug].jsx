// pages/produkt/[slug].jsx
import Head from "next/head";

// If you want to reuse your existing table/carousel from your Vite app,
// move them into a UI library package or copy minimal versions here.
import ProductTable from "@/components/ProductTable"; 
import RcarouselObject from "@/components/RcarouselObject";

export default function ProductPage({ product, relatedByCategory, relatedByMake, canonicalUrl }) {
  if (!product) {
    return <main className="container mx-auto px-4 py-16">Product not found.</main>;
  }

  const shortDesc = (product.meta_description || product.description || "").slice(0, 160);

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [product.image, ...(product.images || []).map((img) => img.url)].filter(Boolean),
    description: shortDesc,
    sku: product.sku || undefined,
    mpn: product.mpn || undefined,
    brand: product.make?.name ? { "@type": "Brand", name: product.make.name } : undefined,
    category: product.category?.name,
    offers: product.price
      ? {
          "@type": "Offer",
          priceCurrency: product.currency || "EUR",
          price: String(product.price),
          availability: product.in_stock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          url: canonicalUrl,
          validFrom: product.created_at,
        }
      : undefined,
    aggregateRating:
      product.rating_count > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: String(product.rating_average),
            reviewCount: String(product.rating_count),
          }
        : undefined,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${process.env.NEXT_PUBLIC_SITE_URL}/` },
      product.category?.slug && {
        "@type": "ListItem",
        position: 2,
        name: product.category.name,
        item: `${process.env.NEXT_PUBLIC_SITE_URL}/kategorije/${product.category.slug}/`,
      },
      {
        "@type": "ListItem",
        position: product.category?.slug ? 3 : 2,
        name: product.name,
        item: canonicalUrl,
      },
    ].filter(Boolean),
  };

  return (
    <>
      <Head>
        <title>{product.meta_title || product.name}</title>
        <meta name="description" content={shortDesc} />

        {/* Canonical */}
        <link rel="canonical" href={canonicalUrl} />

        {/* OpenGraph */}
        <meta property="og:type" content="product" />
        <meta property="og:title" content={product.og_title || product.meta_title || product.name} />
        <meta property="og:description" content={product.og_description || shortDesc} />
        <meta property="og:image" content={product.og_image || product.image} />
        <meta property="og:url" content={canonicalUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.meta_title || product.name} />
        <meta name="twitter:description" content={shortDesc} />
        <meta name="twitter:image" content={product.og_image || product.image} />
      </Head>

      <main className="container mx-auto px-4 py-10 space-y-10">
        {/* HERO */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center">
            {product.image ? (
              <img
                src={product.image}
                alt={`${product.name} product image`}
                className="w-full max-w-lg rounded-xl shadow"
              />
            ) : (
              <div className="h-64 w-full bg-gray-100 rounded-xl" />
            )}
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold">{product.name}</h1>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-semibold">
                {product.price ? `${product.price} ${product.currency || "€"}` : "Kontaktirajte nas"}
              </span>
              {product.discount_percent != null && (
                <span className="inline-block bg-red-500 text-white text-sm px-3 py-1 rounded-lg">
                  -{product.discount_percent}%
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {product.in_stock ? (
                <span className="inline-flex items-center gap-1 text-green-600">● Na zalogi</span>
              ) : (
                <span className="inline-flex items-center gap-1 text-red-600">● Ni na zalogi</span>
              )}
            </div>

            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            {product.posebnosti && (
              <div className="bg-gray-50 border rounded-lg p-3">
                <strong>Posebnosti: </strong>
                {product.posebnosti}
              </div>
            )}

            <div className="pt-2">
              <a href="/kontakt" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">
                Povpraševanje
              </a>
            </div>
          </div>
        </section>

        {/* SPECS */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Specifikacije</h2>
          <ProductTable products={[product]} />
        </section>

        {/* RELATED BY CATEGORY */}
        {relatedByCategory?.length > 0 && (
          <section className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Drugi izdelki v kategoriji: {product.category?.name}
            </h2>
            <ProductTable products={relatedByCategory} />
          </section>
        )}

        {/* RELATED BY MAKE */}
        {relatedByMake?.length > 0 && (
          <section className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Več od proizvajalca {product.make?.name}
            </h2>
            <RcarouselObject title="" object={{ results: relatedByMake }} loading={false} />
          </section>
        )}

        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      </main>
    </>
  );
}

export async function getServerSideProps({ params, req }) {
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (req?.headers?.host ? `http${req.headers.host.includes("localhost") ? "" : "s"}://${req.headers.host}` : "");

  const API = process.env.API_URL || "http://localhost:8000/api";
  const slug = params.slug;

  // Fetch product by slug (adjust endpoint to your DRF)
  const pRes = await fetch(`${API}/product/by-slug/${encodeURIComponent(slug)}/`);
  if (!pRes.ok) return { props: { product: null } };
  const product = await pRes.json();

  // Fetch all (or filtered) products once; or expose backend endpoints:
  //   - /product/related-by-category/<category_id>/
  //   - /product/related-by-make/<make_id>/
  const [allRes] = await Promise.all([fetch(`${API}/product/products`)]);
  const all = (await allRes.json()) || { results: [] };

  const relatedByCategory = (all.results || []).filter(
    (p) => p.category?.id === product.category?.id && p.id !== product.id
  );
  const relatedByMake = (all.results || []).filter(
    (p) => p.make?.id === product.make?.id && p.id !== product.id
  );

  return {
    props: {
      product,
      relatedByCategory,
      relatedByMake,
      canonicalUrl: `${origin}/produkt/${slug}/`,
    },
  };
}
