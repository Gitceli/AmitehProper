// frontend-ssr/pages/proizvajalci/[slug].jsx
import Head from "next/head";
import { useRouter } from "next/router";
import RcarouselObject from "@/components/RcarouselObject";
import { getServerApiBaseUrl } from "@/lib/apiConfig";

// Optional shadcn Skeleton (if installed). Safe fallback below.
let ShadcnSkeleton = null;
try {
  // Requires: npx shadcn@latest add skeleton
  // and Tailwind configured in the Next app.
  // If not installed, import will fail and we’ll use the fallback.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  ShadcnSkeleton = require("@/components/ui/skeleton").Skeleton;
} catch { /* fallback used */ }

// Tiny fallback skeleton to avoid any heavy deps
const FallbackSkeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-100 rounded ${className}`} />
);

const Skeleton = ({ className }) =>
  ShadcnSkeleton ? <ShadcnSkeleton className={className} /> : <FallbackSkeleton className={className} />;

function PageSkeleton() {
  return (
    <main className="container mx-auto px-4 py-10 space-y-10">
      <Skeleton className="h-10 w-2/3" />
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Skeleton className="h-80 w-full rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-24 w-full" />
        </div>
      </section>
      <section className="bg-white rounded-xl shadow p-6">
        <Skeleton className="h-8 w-40 mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded" />
          ))}
        </div>
      </section>
    </main>
  );
}

export default function MakeDetail({ make, products, relatedCategories, canonicalUrl, robotsNoindex }) {
  const router = useRouter();
  if (router.isFallback) return <PageSkeleton />;

  if (!make) {
    return (
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-2xl font-semibold">Proizvajalec ni najden</h1>
      </main>
    );
  }

  const title = make.meta_title || make.name;
  const description = (make.meta_description || make.description || "").slice(0, 160);
  const ogImage = make.og_image || make.image || `${process.env.NEXT_PUBLIC_SITE_URL}/og-default.jpg`;

  const brandLd = {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: make.name,
    description,
    image: ogImage,
    url: canonicalUrl,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Domov", item: `${process.env.NEXT_PUBLIC_SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Proizvajalci", item: `${process.env.NEXT_PUBLIC_SITE_URL}/proizvajalci/` },
      { "@type": "ListItem", position: 3, name: make.name, item: canonicalUrl },
    ],
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

        {robotsNoindex && <meta name="robots" content="noindex, nofollow" />}

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {ogImage && <meta property="og:image" content={ogImage} />}
        <meta property="og:url" content={canonicalUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {ogImage && <meta name="twitter:image" content={ogImage} />}
      </Head>

      <main className="container mx-auto px-4 py-10 space-y-12">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500">
          <a className="hover:underline" href="/">Domov</a> {" / "}
          <a className="hover:underline" href="/proizvajalci/">Proizvajalci</a> {" / "}
          <span className="text-gray-700">{make.name}</span>
        </nav>

        {/* HERO */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex items-center justify-center">
            {make.image ? (
              <img
                src={make.image}
                alt={make.name}
                className="w-full max-w-xl rounded-xl shadow"
                loading="eager"
              />
            ) : (
              <div className="h-80 w-full bg-gray-100 rounded-xl" />
            )}
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold">{make.name}</h1>
            {make.description && <p className="text-gray-700">{make.description}</p>}
          </div>
        </section>

        {/* PRODUCTS BY THIS MAKE */}
        {products?.length > 0 && (
          <section className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Izdelki proizvajalca</h2>
            </div>
            <RcarouselObject object={{ results: products }} />
          </section>
        )}

        {/* RELATED CATEGORIES */}
        {relatedCategories?.length > 0 && (
          <section className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Kategorije s tem proizvajalcem</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {relatedCategories.map((c) => (
                <a key={c.id} href={`/kategorije/${c.slug}/`} className="border rounded-lg p-3 bg-white hover:shadow transition">
                  {c.image && (
                    <img src={c.image} alt={c.name} className="w-full h-24 object-contain" loading="lazy" />
                  )}
                  <div className="mt-2 text-sm text-center">{c.name}</div>
                </a>
              ))}
            </div>
          </section>
        )}

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(brandLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      </main>
    </>
  );
}

export async function getStaticProps({ params }) {
  const API = getServerApiBaseUrl();
  const slug = params.slug;

  // 1) fetch make by slug
  let make = null;
  try {
    const r1 = await fetch(`${API}/product/make/by-slug/${encodeURIComponent(slug)}/`);
    if (r1.ok) make = await r1.json();
  } catch {}
  if (!make) {
    try {
      const r2 = await fetch(`${API}/product/makes/?slug=${encodeURIComponent(slug)}`);
      if (r2.ok) {
        const data = await r2.json();
        const items = Array.isArray(data) ? data : (data.results || []);
        make = items[0] || null;
      }
    } catch {}
  }
  if (!make) return { notFound: true };

  // 2) fetch products for this make
  let products = [];
  const tryUrls = [
    `${API}/product/products/?make=${make.id}`,
    `${API}/product/by-make/${make.id}/`,
  ];
  for (const url of tryUrls) {
    try {
      const r = await fetch(url);
      if (r.ok) {
        const data = await r.json();
        products = Array.isArray(data) ? data : (data.results || []);
        if (products.length) break;
      }
    } catch {}
  }

  // 3) related categories (dedupe by id)
  const catMap = new Map();
  for (const p of products) {
    const cat = typeof p.category === "object" ? p.category : null;
    if (cat?.id && !catMap.has(cat.id)) catMap.set(cat.id, cat);
  }
  const relatedCategories = Array.from(catMap.values());

  // 4) canonical + robots
  const baseSite = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
  const canonicalUrl = make.canonical_url || `${baseSite}/proizvajalci/${slug}/`;
  const robotsNoindex = !!make.noindex;

  return {
    props: { make, products, relatedCategories, canonicalUrl, robotsNoindex },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}
