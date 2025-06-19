import { useParams } from "react-router-dom";
import useFetchData from "@/assets/myComponents/hooks/useFetchData";
import useFetchProducts from "@/assets/myComponents/hooks/useFetchProducts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import ProductTable from "@/assets/myComponents/ProductTable";

export default function ProductDetail() {
  const { name } = useParams();
  const { products, loading, error } = useFetchProducts();

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorAlert message={error} />;

  if (!products || !products.results || products.results.length === 0) {
    return <ErrorAlert message="No products found!" />;
  }

  // Find the specific product based on the slug
  const product = products.results.find(
    (p) => p.name.toLowerCase() === name.toLowerCase()
  );

  if (!product) return <ErrorAlert message="Product not found!" />;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full mx-auto mb-8">
        <CardHeader className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-t-lg">
          <CardTitle className="text-3xl font-bold text-white text-center"
            style={{
              textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
            }}>
            {product.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full max-w-md rounded-lg"
                />
              ) : (
                <Skeleton className="h-64 w-full" />
              )}
            </div>
            <div>
              <p className="text-lg">{product.description}</p>
              <h2 className="text-2xl font-semibold mt-3">Details:</h2>
              <ul className="list-disc list-inside mt-2">
                <li><strong>Cena:</strong> {product.price}$</li>
                <li><strong>Discount:</strong> {product.discount || "None"}%</li>
                <li><strong>Stock Status:</strong> {product.stock_status === 2 ? "In Stock" : "Out of Stock"}</li>
                <li><strong>Special Features:</strong> {product.posebnosti || "None"}</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Display parameters in a table */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Product Parameters</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductTable products={[product]} />
        </CardContent>
      </Card>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <Skeleton className="h-8 w-1/2" />
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <Skeleton className="h-64 w-full" />
          <div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </CardContent>
      </Card>
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
