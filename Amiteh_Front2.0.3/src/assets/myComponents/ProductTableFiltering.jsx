import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

const ProductTable = ({ products }) => {
  const [sortParam, setSortParam] = useState("price")
  const [filterCategory, setFilterCategory] = useState("")
  const [filterStock, setFilterStock] = useState("")

  // Sorting products based on selected parameter
  const sortedProducts = [...products].sort((a, b) => {
    if (sortParam === "price") {
      return a.price - b.price
    } else if (sortParam === "name") {
      return a.name.localeCompare(b.name)
    } else if (sortParam === "stock") {
      return a.stock_status.in_stock === b.stock_status.in_stock ? 0 : a.stock_status.in_stock ? -1 : 1
    }
  })

  // Filtering logic
  const filteredProducts = sortedProducts.filter((product) => {
    if (filterCategory && product.category.name !== filterCategory) {
      return false
    }
    if (filterStock && (filterStock === "in_stock" && !product.stock_status.in_stock)) {
      return false
    }
    return true
  })

  return (
    <div className="mt-6">
      {/* Filter and Sorting Controls */}
      <div className="flex items-center mb-4">
        {/* Sorting Select */}
        <Select onValueChange={setSortParam} value={sortParam}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price">Sort by Price</SelectItem>
            <SelectItem value="name">Sort by Name</SelectItem>
            <SelectItem value="stock">Sort by Stock Status</SelectItem>
          </SelectContent>
        </Select>

        {/* Filter by Category */}
        <Input
          placeholder="Filter by Category"
          onChange={(e) => setFilterCategory(e.target.value)}
          className="ml-4"
        />

        {/* Filter by Stock Status */}
        <Select onValueChange={setFilterStock} value={filterStock} className="ml-4">
          <SelectTrigger>
            <SelectValue placeholder="Filter Stock" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Stock</SelectItem>
            <SelectItem value="in_stock">In Stock</SelectItem>
            <SelectItem value="out_of_stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock Status</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Discount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price ? product.price.toFixed(2) : "N/A"}</TableCell>
              <TableCell>{product.stock_status?.in_stock ? "In Stock" : "Out of Stock"}</TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell>{product.discount ? `${product.discount.discount}%` : "No Discount"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ProductTable
