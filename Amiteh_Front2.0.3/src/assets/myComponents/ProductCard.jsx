import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ProductCard = ({ product }) => {
  return (
    <a href={`http://localhost:5173/produkt/${product.slug.toLowerCase()}/`} className="block">

      <Card className="overflow-hidden transiti
      on-all duration-300 hover:shadow-lg">
        <CardHeader className="p-4">
          <img src={product.image || "/placeholder.png"} alt={product.name} className="w-full h-48 object-cover rounded-md" />
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-semibold mb-2">{product.name}</CardTitle>
          <p className="text-sm text-gray-600 mb-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">$pare</span>
            <Badge variant="secondary">{product.category.name}</Badge>
          </div>
        </CardContent>
        <CardFooter className="p-4 bg-gray-50">
          <Button className="w-full">Add to Cart</Button>
        </CardFooter>
      </Card>
    </a>

  );
};

export default ProductCard;
