// frontend-ssr/components/SeoHead.tsx
import Head from "next/head";

type Props = {
    title: string;
    description?: string;
    canonical?: string;
    ogImage?: string;
    noindex?: boolean;
};

export default function SeoHead({ title, description = "", canonical, ogImage, noindex }: Props) {
    return (
            <>
        <Head>
            <title>{title}</title>
            {description && <meta name="description" content={description.slice(0, 160)} />}
            {canonical && <link rel="canonical" href={canonical} />}
            {noindex && <meta name="robots" content="noindex, nofollow" />}

            {/* OpenGraph */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            {description && <meta property="og:description" content={description.slice(0, 200)} />}
            {canonical && <meta property="og:url" content={canonical} />}
            {ogImage && <meta property="og:image" content={ogImage} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            {description && <meta name="twitter:description" content={description.slice(0, 200)} />}
            {ogImage && <meta name="twitter:image" content={ogImage} />}
        </Head>
        </>
    );
}
