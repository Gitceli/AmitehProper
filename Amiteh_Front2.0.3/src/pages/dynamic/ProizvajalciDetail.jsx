import { useParams } from 'react-router-dom'
import useFetchData from '@/assets/myComponents/hooks/useFetchData'
import useFetchProducts from '@/assets/myComponents/hooks/useFetchProducts'
import ProductTable from '@/assets/myComponents/ProductTable'
import RcarouselObject from '@/assets/myComponents/RcarouselObject'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ProizvajalciDetail() {
  const { name } = useParams();
  const { categories, makes, areas, loading, error } = useFetchData();
  const { products } = useFetchProducts();

  
  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  // Check if makes, products, categories, and areas are properly initialized before accessing results
  if (!makes || !makes.results || makes.results.length === 0) {
    return <ErrorAlert message="No manufacturer data found." />;
  }
  if (!products || !products.results) {
    return <ErrorAlert message="No product data found." />;
  }

  // Find the current manufacturer based on the URL param 'name'
  const manufacturer = makes.results.find(
    (make) => make.name.toLowerCase() === name.toLowerCase()
  );

  if (!manufacturer) {
    return <ErrorAlert message="Manufacturer not found!" />;
  }
  
    // Get all products related to this manufacturer
  const filteredProducts = products.results.filter(
    (product) => product.make === manufacturer.id
  );
  //  Extract categories from these products
  const categoriesForManufacturer = filteredProducts.map(
    (product) => product.category
  );
  //  Deduplicate categories by their IDs
  const uniqueCategories = categoriesForManufacturer.filter(
    (category, index, self) =>
      self.findIndex((c) => c.id === category.id) === index
  );
  // Get the full category objects (instead of just IDs)
  
  // Step 1: Extract areas from these products
  const areasForManufacturer = filteredProducts.map((product) => product.area);

  // Step 2: Deduplicate areas (since areas are numbers, use direct comparison)
  const uniqueAreaIds  = areasForManufacturer.filter(
    (area, index, self) => self.indexOf(area) === index
  );

  const uniqueAreas = uniqueAreaIds
  .map((id) => areas.results.find((area) => area.id === id))
  .filter((area) => area !== undefined); // Filter out any undefined areas (if there's no match)


  console.log(uniqueAreas);


  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full mx-auto mb-8">
        <CardHeader className="bg-gradient-to-r from-[#006FB1] to-[#8A7764] p-6 rounded-t-lg">
          <CardTitle className="text-3xl font-bold text-white text-center"
            style={{
              textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
            }}>
            {manufacturer.name.charAt(0).toUpperCase() + manufacturer.name.slice(1)}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <img
                src={manufacturer.image}
                alt={manufacturer.name}
                className="w-full max-w-md rounded-lg"
              />
            </div>
            <div className="flex flex-col items-center justify-center space-y-4">
              <h1 className="text-2xl font-semibold mt-3 mb-2" >{manufacturer.naslov}</h1>
              <p className="text-lg text-center md:text-left">{manufacturer.description}</p>
              <h2 className="text-2xl font-semibold mt-3 mb-2">{manufacturer.podnaslov}</h2>
              <p className="text-center md:text-left">{manufacturer.description2}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Display the filtered categories in a carousel */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Related Categories</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Pass the data as { results: filteredCategories } */}
          <RcarouselObject className="flex mt-4" title="Kategorije" object={{ results: uniqueCategories }} loading={loading} />
        </CardContent>
      </Card>

      {/* Display the filtered areas in a carousel */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Related Areas</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Pass the data as { results: filteredAreas } */}
          <RcarouselObject className="flex mt-4" title="Podrocja" object={{ results: uniqueAreas }} loading={loading} />
        </CardContent>
      </Card>

      {/* Display related products */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Related Products</CardTitle>
        </CardHeader>
        <CardContent>
        <ProductTable products={filteredProducts || []} category={products?.results.category || {}} />

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
  )
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
  )
}