// frontend-ssr/pages/kategorije/[slug].jsx
import Head from "next/head";
import { useRouter } from "next/router";
import RcarouselObject from "@/components/RcarouselObject";
import ProductTable from "@/components/ProductTable"; // reuse for spec blocks if desired
import { getServerApiBaseUrl } from "@/lib/apiConfig";

// --- Lightweight skeleton for ISR fallback ---
function Skeleton() {
  return (
    <main className="container mx-auto px-4 py-10 space-y-10 animate-pulse">
      <div className="h-10 bg-gray-100 rounded w-2/3" />
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-80 bg-gray-100 rounded-xl" />
        <div className="flex flex-col gap-4">
          <div className="h-8 bg-gray-100 rounded w-1/2" />
          <div className="h-6 bg-gray-100 rounded w-1/3" />
          <div className="h-24 bg-gray-100 rounded" />
        </div>
      </section>
      <section className="bg-white rounded-xl shadow p-6">
        <div className="h-8 bg-gray-100 rounded w-40 mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-28 bg-gray-100 rounded" />
          ))}
        </div>
      </section>
    </main>
  );
}

export default function CategoryPage({ category, products, relatedMakes, canonicalUrl, robotsNoindex }) {
  const router = useRouter();
  if (router.isFallback) return <Skeleton />;

  if (!category) {
    return (
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-2xl font-semibold">Kategorija ni najdena</h1>
      </main>
    );
  }

  const title = category.meta_title || category.name;
  const description = (category.meta_description || category.description || "").slice(0, 160);
  const ogImage = category.og_image || category.image || `${process.env.NEXT_PUBLIC_SITE_URL}/og-default.jpg`;

  // JSON-LD: CollectionPage + Breadcrumbs
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description,
    image: ogImage,
    url: canonicalUrl,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Domov", item: `${process.env.NEXT_PUBLIC_SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Kategorije", item: `${process.env.NEXT_PUBLIC_SITE_URL}/kategorije/` },
      { "@type": "ListItem", position: 3, name: category.name, item: canonicalUrl },
    ],
  };

  // Collect non-empty parameter labels
  const paramLabels = [
    category.parameter1, category.parameter2, category.parameter3,
    category.parameter4, category.parameter5, category.parameter6, category.parameter7,
  ].filter(Boolean);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

        {/* Robots */}
        {robotsNoindex && <meta name="robots" content="noindex, nofollow" />}

        {/* OpenGraph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {ogImage && <meta property="og:image" content={ogImage} />}
        <meta property="og:url" content={canonicalUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {ogImage && <meta name="twitter:image" content={ogImage} />}
      </Head>

      <main className="container mx-auto px-4 py-10 space-y-12">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500">
          <a className="hover:underline" href="/">Domov</a> {" / "}
          <a className="hover:underline" href="/kategorije/">Kategorije</a> {" / "}
          <span className="text-gray-700">{category.name}</span>
        </nav>

        {/* HERO */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex items-center justify-center">
            {category.image ? (
              <img
                src={category.image}
                alt={category.name}
                className="w-full max-w-xl rounded-xl shadow"
                loading="eager"
              />
            ) : (
              <div className="h-80 w-full bg-gray-100 rounded-xl" />
            )}
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold">{category.name}</h1>
            {description && <p className="text-gray-700">{category.description}</p>}

            {!!paramLabels.length && (
              <div className="bg-gray-50 border rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-2">Ključni parametri</h2>
                <ul className="list-disc list-inside grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {paramLabels.map((lbl) => <li key={lbl}>{lbl}</li>)}
                </ul>
                <p className="text-xs text-gray-500 mt-2">
                  Parametri se uporabljajo za strukturiranje specifikacij izdelkov v tej kategoriji.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* PRODUCTS IN THIS CATEGORY */}
        {products?.length > 0 && (
          <section className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Izdelki v kategoriji</h2>
              {/* Could add sort/filter later */}
            </div>
            <RcarouselObject object={{ results: products }} />
          </section>
        )}

        {/* RELATED MAKES (manufacturers that have products in this category) */}
        {relatedMakes?.length > 0 && (
          <section className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Proizvajalci v tej kategoriji</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {relatedMakes.map((m) => (
                <a key={m.id} href={`/proizvajalci/${m.slug}/`} className="border rounded-lg p-3 bg-white hover:shadow transition">
                  {m.image && (
                    <img src={m.image} alt={m.name} className="w-full h-24 object-contain" loading="lazy" />
                  )}
                  <div className="mt-2 text-sm text-center">{m.name}</div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      </main>
    </>
  );
}

// --- Data fetching (ISR) ---
export async function getStaticProps({ params }) {
  const API = getServerApiBaseUrl();
  const slug = params.slug;

  // 1) Fetch category by slug (support two possible backends)
  let category = null;

  // Try a dedicated endpoint first (if you add it on DRF): /product/category/by-slug/{slug}/
  const resDirect = await fetch(`${API}/product/category/by-slug/${encodeURIComponent(slug)}/`).catch(() => null);

  if (resDirect && resDirect.ok) {
    category = await resDirect.json();
  } else {
    // Fallback: filter list: /product/categories/?slug=slug
    const resList = await fetch(`${API}/product/categories/?slug=${encodeURIComponent(slug)}`).catch(() => null);
    if (resList && resList.ok) {
      const list = await resList.json();
      // Handle both paginated {results:[]} or plain arrays
      const items = Array.isArray(list) ? list : (list.results || []);
      category = items[0] || null;
    }
  }

  if (!category) return { notFound: true };

  // 2) Fetch products in this category
  // Prefer a filter endpoint; otherwise create /product/by-category/{id}/ on backend
  let products = [];
  const tryUrls = [
    `${API}/product/products/?category=${category.id}`,
    `${API}/product/by-category/${category.id}/`,
  ];
  for (const url of tryUrls) {
    try {
      const r = await fetch(url);
      if (r.ok) {
        const data = await r.json();
        products = Array.isArray(data) ? data : (data.results || []);
        if (products.length) break;
      }
    } catch (_) {}
  }

  // 3) Derive related makes from products (dedupe)
  const seen = new Set();
  const relatedMakes = [];
  for (const p of products) {
    // p.make may be an object (if using MakeLiteSerializer) or ID
    const make = typeof p.make === 'object' ? p.make : null;
    if (make?.id && !seen.has(make.id)) {
      seen.add(make.id);
      relatedMakes.push(make);
    }
  }

  // 4) Canonical & robots
  const baseSite = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
  const canonicalUrl = category.canonical_url || `${baseSite}/kategorije/${slug}/`;
  const robotsNoindex = !!category.noindex;

  return {
    props: { category, products, relatedMakes, canonicalUrl, robotsNoindex },
    revalidate: 3600, // rebuild at most once per hour
  };
}

export async function getStaticPaths() {
  // Build on-demand
  return { paths: [], fallback: true };
}
