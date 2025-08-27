// frontend-ssr/pages/produkt/[slug].jsx
import Head from "next/head";
import { useRouter } from "next/router";
import ProductTable from "@/components/ProductTable";
import RcarouselObject from "@/components/RcarouselObject";
import { getServerApiBaseUrl } from "@/lib/apiConfig";

// --- Lightweight skeletons for fallback first paint ---
function Skeleton() {
  return (
    <main className="container mx-auto px-4 py-10 space-y-10 animate-pulse">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-80 bg-gray-100 rounded-xl" />
        <div className="flex flex-col gap-4">
          <div className="h-10 bg-gray-100 rounded w-2/3" />
          <div className="h-8 bg-gray-100 rounded w-1/3" />
          <div className="h-6 bg-gray-100 rounded w-40" />
          <div className="h-24 bg-gray-100 rounded" />
          <div className="h-10 bg-gray-100 rounded w-40" />
        </div>
      </section>
      <section className="bg-white rounded-xl shadow p-6">
        <div className="h-8 bg-gray-100 rounded w-40 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 bg-gray-100 rounded" />
          ))}
        </div>
      </section>
    </main>
  );
}

export default function ProductPage({ product, relatedByCategory, relatedByMake, canonicalUrl }) {
  const router = useRouter();

  // First request for a page not yet generated: show skeleton immediately
  if (router.isFallback) return <Skeleton />;

  if (!product) {
    return (
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-2xl font-semibold">Product not found</h1>
      </main>
    );
  }

  const shortDesc = (product.meta_description || product.description || "").slice(0, 160);

  // JSON-LD blocks
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
      { "@type": "ListItem", position: 1, name: "Domov", item: `${process.env.NEXT_PUBLIC_SITE_URL}/` },
      product.category?.slug && {
        "@type": "ListItem",
        position: 2,
        name: product.category.name,
        item: `${process.env.NEXT_PUBLIC_SITE_URL}/kategorije/${product.category.slug}/`,
      },
      product.make?.slug && {
        "@type": "ListItem",
        position: product.category?.slug ? 3 : 2,
        name: product.make.name,
        item: `${process.env.NEXT_PUBLIC_SITE_URL}/proizvajalci/${product.make.slug}/`,
      },
      {
        "@type": "ListItem",
        position: product.category?.slug && product.make?.slug ? 4 : (product.category?.slug || product.make?.slug ? 3 : 2),
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

      <main className="container mx-auto px-4 py-10 space-y-12">
        {/* Breadcrumbs (strong internal linking) */}
        <nav className="text-sm text-gray-500">
          <a href="/" className="hover:underline">Domov</a>
          {product.category && (
            <>
              {" "}/{" "}
              <a href={`/kategorije/${product.category.slug}/`} className="hover:underline">
                {product.category.name}
              </a>
            </>
          )}
          {product.make && (
            <>
              {" "}/{" "}
              <a href={`/proizvajalci/${product.make.slug}/`} className="hover:underline">
                {product.make.name}
              </a>
            </>
          )}
          {" "}/ <span className="text-gray-700">{product.name}</span>
        </nav>

        {/* HERO */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex items-center justify-center">
            {product.image ? (
              <img
                src={product.image}
                alt={product.image_alt || `${product.name} product image`}
                className="w-full max-w-xl rounded-xl shadow"
                loading="eager"
              />
            ) : (
              <div className="h-80 w-full bg-gray-100 rounded-xl" />
            )}
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold">{product.name}</h1>

            {/* Price, discount, stock */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-3xl font-semibold">
                {product.price ? `${product.price} ${product.currency || "€"}` : "Kontaktirajte nas"}
              </span>
              {product.discount_percent != null && (
                <span className="inline-block bg-red-500 text-white text-sm px-3 py-1 rounded-lg">
                  -{product.discount_percent}%
                </span>
              )}
              <span className={product.in_stock ? "text-green-600" : "text-red-600"}>
                ● {product.in_stock ? "Na zalogi" : "Ni na zalogi"}
              </span>
            </div>

            <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed">
              <p>{product.description}</p>
            </div>

            {product.posebnosti && (
              <div className="bg-gray-50 border rounded-lg p-3">
                <strong>Posebnosti: </strong>
                {product.posebnosti}
              </div>
            )}

            <div className="pt-2 flex gap-3">
              <a href="/kontakt" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">
                Povpraševanje
              </a>
              {product.category && (
                <a href={`/kategorije/${product.category.slug}/`} className="inline-block border px-5 py-2 rounded-lg hover:bg-gray-50">
                  Nazaj na kategorijo
                </a>
              )}
            </div>
          </div>
        </section>

        {/* SPECIFICATIONS */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Specifikacije</h2>
          <ProductTable products={[product]} />
        </section>

        {/* RELATED BY CATEGORY */}
        {relatedByCategory?.length > 0 && (
          <section className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">
                Drugi izdelki v kategoriji: {product.category?.name}
              </h2>
              <a
                className="text-blue-600 hover:underline"
                href={`/kategorije/${product.category.slug}/`}
              >
                Poglej kategorijo →
              </a>
            </div>
            <ProductTable products={relatedByCategory} />
          </section>
        )}

        {/* RELATED BY MAKE */}
        {relatedByMake?.length > 0 && (
          <section className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">
                Več od proizvajalca {product.make?.name}
              </h2>
              <a
                className="text-blue-600 hover:underline"
                href={`/proizvajalci/${product.make.slug}/`}
              >
                Vsi izdelki proizvajalca →
              </a>
            </div>
            <RcarouselObject title="" object={{ results: relatedByMake }} />
          </section>
        )}

        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      </main>
    </>
  );
}

// --- ISR (Incremental Static Regeneration) ---
export async function getStaticProps({ params }) {
  const API = getServerApiBaseUrl();
  const slug = params.slug;

  // product by slug via router
  const pRes = await fetch(`${API}/product/products/${encodeURIComponent(slug)}/`);
  if (!pRes.ok) return { notFound: true };
  const product = await pRes.json();

  let relatedByCategory = [];
  let relatedByMake = [];

  try {
    if (product?.category?.id) {
      const r1 = await fetch(`${API}/product/products/related-by-category/${product.category.id}/`);
      relatedByCategory = r1.ok ? await r1.json() : [];
    }
    if (product?.make?.id) {
      const r2 = await fetch(`${API}/product/products/related-by-make/${product.make.id}/`);
      relatedByMake = r2.ok ? await r2.json() : [];
    }
  } catch {}

  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const canonicalUrl = `${base.replace(/\/$/, "")}/produkt/${slug}/`;

  return {
    props: { product, relatedByCategory, relatedByMake, canonicalUrl },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  // Start with no prebuilt paths; generate on-demand
  return { paths: [], fallback: true };
}
