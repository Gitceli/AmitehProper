
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import useFetchData from "@/assets/myComponents/hooks/useFetchData"// Import your custom hook
import Parallax from "@/assets/myComponents/Parallax"// Import your custom hook

import { Skeleton } from "@/components/ui/skeleton"

export default function Component() {
    const { makes, categories, areas, loading, error } = useFetchData();
  
    if (loading) {
      return <LoadingSkeleton />;
    }

  
    if (error) {
      return <div>Error: {error.message}</div>;
    }

    if (error) {
        return <ErrorMessage message={error} />
    }
    console.log(makes.name)
    
  return (<>
      <Parallax 
        backgroundImage="/OIGG.jpeg" 
        text="Welcome to our Website!" 
      />
    <div className="container mx-auto px-4 py-8">
      <div className="bg-primary text-primary-foreground p-4 mb-8 rounded-lg">
        <h2 className="text-2xl font-bold">{makes.name}</h2>
      </div>

      <h1 className="text-4xl font-bold mb-8">{makes.name}</h1>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <img
            src={makes.image}
            alt={makes.name}
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>

        {/* Product data table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Specification</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            
          </TableBody>
        </Table>
      </div>

      {/* Hardcoded h2 */}
      <h2 className="text-2xl font-bold mb-4">Product Description</h2>

      {/* Product description */}
      <p className="text-lg">{makes.description}</p>
    </div>
    </>
  )
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-12 w-full mb-8" />
      <Skeleton className="h-8 w-3/4 mb-8" />
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Skeleton className="h-[500px] w-full" />
        <Skeleton className="h-[300px] w-full" />
      </div>
      <Skeleton className="h-6 w-1/2 mb-4" />
      <Skeleton className="h-24 w-full" />
    </div>
  )
}

function ErrorMessage({ message }) {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
      <p>{message}</p>
    </div>
  )
}