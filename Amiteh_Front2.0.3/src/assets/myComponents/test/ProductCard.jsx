import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProductCard = ({ product }) => {
    return (
        <a href={`http://127.0.0.1:8000/product/${product.slug}/`} className="block">

            <Card className="overflow-hidden">
                {/* Image Section */}
                <div className="aspect-square relative">
                    <img
                        src={product.image || "/placeholder.png"}
                        alt={product.name ? `Image of ${product.name}` : 'Product Image'}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                </div>

                {/* Header Section */}
                <CardHeader className="p-4">
                    <CardTitle className="text-lg font-bold">{product.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <p className="text-sm text-muted-foreground">${product.price}</p>
                </CardHeader>

                {/* Content Section */}
                <CardContent className="p-4 pt-0">
                    <p className="text-sm">{product.description}</p>
                </CardContent>
            </Card>
        </a>

    );
};

export default ProductCard;
