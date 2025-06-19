import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ProductTable = ({ products }) => {
  if (products.length === 0) return <div>No products available</div>;

  // Extract category data from the first product (assuming all products belong to the same category)
  const category = products[0].category;

  return (
    <div className="mt-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{category.name || "Category Name"}</TableHead>
            <TableHead>{category.parameter1 || "Param 1"}</TableHead>
            <TableHead>{category.parameter2 || "Param 2"}</TableHead>
            <TableHead>{category.parameter3 || "Param 3"}</TableHead>
            <TableHead>{category.parameter4 || "Param 4"}</TableHead>
            <TableHead>{category.parameter5 || "Param 5"}</TableHead>
            <TableHead>{category.parameter6 || "Param 6"}</TableHead>
            <TableHead>{category.parameter7 || "Param 7"}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.parameter1_value || "N/A"}</TableCell>
              <TableCell>{product.parameter2_value || "N/A"}</TableCell>
              <TableCell>{product.parameter3_value || "N/A"}</TableCell>
              <TableCell>{product.parameter4_value || "N/A"}</TableCell>
              <TableCell>{product.parameter5_value || "N/A"}</TableCell>
              <TableCell>{product.parameter6_value || "N/A"}</TableCell>
              <TableCell>{product.parameter7_value || "N/A"}</TableCell>
              {/* Uncomment if needed */}
              {/* <TableCell>{product.stock_status?.in_stock ? "In Stock" : "Out of Stock"}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
