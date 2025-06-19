'use client'

import { useParams } from 'react-router-dom'
import useFetchData from '@/assets/myComponents/hooks/useFetchData'
import Products from '@/assets/myComponents/Products'
import RcarouselObject from '@/assets/myComponents/RcarouselObjectt'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ManufacturerDetails() {
  const { name } = useParams()
  const { categories, makes, loading, error } = useFetchData()

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return <ErrorAlert message={error} />
  }

  if (!makes || !makes.results || makes.results.length === 0) {
    return <ErrorAlert message="No manufacturer data found." />
  }

  const manufacturer = makes.results.find(
    (make) => make.name.toLowerCase() === name.toLowerCase()
  )

  if (!manufacturer) {
    return <ErrorAlert message="Manufacturer not found!" />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader className="bg-gradient-to-r from-[#006FB1] to-[#8A7764] p-6 rounded-t-lg">
          <CardTitle className="text-3xl font-bold text-white"
           style={{
            textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
          }}>
            {manufacturer.name.charAt(0).toUpperCase() + manufacturer.name.slice(1)}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6 pt-6">
          <div>
            <img
              src={manufacturer.image}
              alt={manufacturer.name}
              className="w-full max-w-md rounded-lg shadow-lg"
            />
          </div>
          <div>
            <p className="text-lg mb-4">{manufacturer.description}</p>
            <h2 className="text-2xl font-semibold mb-2">{manufacturer.podnaslov}</h2>
            <p className="text-lg">{manufacturer.description2}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Manufacturer Details</CardTitle>
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
                <TableCell>{manufacturer.founded || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Headquarters</TableCell>
                <TableCell>{manufacturer.headquarters || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Website</TableCell>
                <TableCell>
                  {manufacturer.website ? (
                    <a href={manufacturer.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {manufacturer.website}
                    </a>
                  ) : 'N/A'}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <RcarouselObject className="flex mt-4" title="Kategorije" object={categories} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Products />
        </CardContent>
      </Card>
      
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
      <Card className="mb-8">
        <CardHeader>
          <Skeleton className="h-6 w-1/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
      <Card className="mb-8">
        <CardHeader>
          <Skeleton className="h-6 w-1/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
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