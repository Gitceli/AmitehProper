'use client'

import { useParams } from 'react-router-dom'
import useFetchData from '@/assets/myComponents/hooks/useFetchData'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Products from "@/assets/myComponents/Products";


export default function KategorijeDetail() {
  const { name } = useParams()
  const { categories, loading, error } = useFetchData()

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return <ErrorAlert message={error} />
  }

  if (!categories || !categories.results || categories.results.length === 0) {
    return <ErrorAlert message="No category data found." />
  }

  const category = categories.results.find(
    (cat) => cat.name.toLowerCase() === name.toLowerCase()
  )

  if (!category) {
    return <ErrorAlert message="Category not found!" />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader className="bg-gradient-to-r from-[#006FB1] to-[#8A7764] p-6 rounded-t-lg">
          <CardTitle className="text-3xl font-bold text-white"
            style={{
              textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
            }}>
            {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6 pt-6">
          <div>
            <img
              src={category.image}
              alt={category.name}
              className="w-full max-w-md rounded-lg shadow-lg"
            />
          </div>
          <div>
            <p className="text-lg mb-4">{category.description}</p>
            <h2 className="text-2xl font-semibold mb-2">{category.podnaslov}</h2>
            <p className="text-lg">{category.description2}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Category Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Attribute</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Founded</TableCell>
                <TableCell>{category.founded || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Headquarters</TableCell>
                <TableCell>{category.headquarters || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Website</TableCell>
                <TableCell>
                  {category.website ? (
                    <a href={category.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {category.website}
                    </a>
                  ) : 'N/A'}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
                <Products />
      
    </div>
  )
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
