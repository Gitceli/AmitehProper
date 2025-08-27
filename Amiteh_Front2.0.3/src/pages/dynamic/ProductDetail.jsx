import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useFetchProducts from "@/assets/myComponents/hooks/useFetchProducts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Tag, Package, CheckCircle, XCircle } from "lucide-react";
import ProductTable from "@/assets/myComponents/ProductTable";
import RcarouselObject from "@/assets/myComponents/RcarouselObject";
import { useState } from "react";

export default function ProductDetail() {
  const { name } = useParams();
  const { products, loading, error } = useFetchProducts();
  const [activeTab, setActiveTab] = useState("description");

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorAlert message={error} />;

  if (!products?.results?.length) {
    return <ErrorAlert message="No products found!" />;
  }

  const product = products.results.find(
    (p) => p.name.toLowerCase() === name.toLowerCase()
  );
  if (!product) return <ErrorAlert message="Product not found!" />;

  // Related Products
  const relatedByCategory = products.results.filter(
    (p) => p.category.id === product.category.id && p.id !== product.id
  );
  const relatedByMake = products.results.filter(
    (p) => p.make?.id === product.make?.id && p.id !== product.id
  );

  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{product.name}</title>
        <meta
          name="description"
          content={product.description?.slice(0, 160) || ""}
        />
        <meta property="og:title" content={product.name} />
        <meta
          property="og:description"
          content={product.description?.slice(0, 160) || ""}
        />
        <meta property="og:image" content={product.image} />
      </Helmet>

      {/* Hero Section */}
      <Card className="shadow-lg">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image */}
          <div className="flex items-center justify-center">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-lg rounded-lg shadow-md"
              />
            ) : (
              <Skeleton className="h-64 w-full" />
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col space-y-4">
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-semibold text-green-600">
                {product.price ? `${product.price} €` : "Contact for price"}
              </span>
              {product.discount && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-lg">
                  -{product.discount}%
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {product.stock_status === 2 ? (
                <CheckCircle className="text-green-500" />
              ) : (
                <XCircle className="text-red-500" />
              )}
              <span>
                {product.stock_status === 2 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            <p className="text-gray-700">{product.description}</p>
            {product.posebnosti && (
              <div className="bg-gray-100 p-3 rounded-md">
                <strong>Special Features: </strong>
                {product.posebnosti}
              </div>
            )}
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg w-fit">
              Contact / Enquire
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Section */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex border-b mb-4">
          {["description", "specs"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-medium ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "description" ? "Description" : "Specifications"}
            </button>
          ))}
        </div>
        {activeTab === "description" && (
          <p className="text-gray-700">{product.description}</p>
        )}
        {activeTab === "specs" && (
          <ProductTable products={[product]} />
        )}
      </div>

      {/* Related Products */}
      {relatedByCategory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Other Products in {product.category.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductTable products={relatedByCategory} />
          </CardContent>
        </Card>
      )}

      {relatedByMake.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>More from {product.make?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <RcarouselObject
              title={`Products by ${product.make?.name}`}
              object={{ results: relatedByMake }}
              loading={false}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-8 w-1/2 mb-4" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

function ErrorAlert({ message }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>
  );
}
