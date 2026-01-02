"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check, ShoppingCart } from "lucide-react";
import { useProductStore } from "@/store/productStore";
import { useCartStore } from "@/store/cartStore";
import { useUserStore } from "@/store/userStore";
import { products } from "@/lib/data/products";
import { formatPrice, cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import QuantitySelector from "@/components/ui/QuantitySelector";
import ProductCard from "@/components/product/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const { setProducts } = useProductStore();
  const { addItem, getItemQuantity, updateQuantity } = useCartStore();
  const { addToRecentlyViewed } = useUserStore();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedPackSize, setSelectedPackSize] = useState("single");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setProducts(products);
  }, [setProducts]);

  const product = products.find((p) => p.id === productId);

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product, addToRecentlyViewed]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">Product not found.</p>
        <Link href="/products" className="mt-4 text-green-600 hover:text-green-700">
          Browse all products
        </Link>
      </div>
    );
  }

  const productImages = product.images || [product.image];
  const cartQuantity = getItemQuantity(product.id);

  const packSizes = [
    { id: "single", label: "Single", discount: 0 },
    { id: "pack-4", label: "Pack of 4", discount: 5 },
    { id: "box-10", label: "Box of 10", discount: 10 },
  ];

  const calculatePrice = () => {
    const basePrice = product.price;
    const selectedPack = packSizes.find((p) => p.id === selectedPackSize);
    const discount = selectedPack?.discount || 0;
    const discountedPrice = basePrice * (1 - discount / 100);
    return discountedPrice * quantity;
  };

  const handleAddToCart = () => {
    if (cartQuantity > 0) {
      updateQuantity(product.id, cartQuantity + quantity);
    } else {
      addItem(product, quantity);
    }
  };

  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-green-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-green-600">
          Produce
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-gray-50 shadow-sm border border-gray-100">
            <Image
              src={productImages[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isOrganic && (
                <Badge variant="fresh" className="rounded-full shadow-lg border-none bg-green-500 text-white px-3 py-1 text-sm font-bold">
                  Organic
                </Badge>
              )}
              {product.isBestSeller && (
                <Badge className="rounded-full bg-yellow-400 text-yellow-900 border-none px-3 py-1 font-bold">Best Seller</Badge>
              )}
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {productImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={cn(
                  "relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border-2 transition-all",
                  selectedImage === idx
                    ? "border-green-500 ring-2 ring-green-200 ring-offset-2"
                    : "border-transparent bg-gray-50 hover:bg-gray-100"
                )}
              >
                <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <h1 className="mb-3 text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">{product.name}</h1>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-700">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                In Stock
              </div>
              <span className="text-sm font-medium text-gray-500">Available for tomorrow delivery</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-gray-900">
                {formatPrice(product.price)}
              </span>
              <span className="text-xl font-medium text-gray-400">
                / {product.unit || "each"}
              </span>
            </div>
            {product.originalPrice && (
              <span className="text-sm font-bold text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <p className="mb-8 text-lg text-gray-600 leading-relaxed">{product.description}</p>

          {/* Highlights */}
          {product.highlights && product.highlights.length > 0 && (
            <div className="mb-8">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-900">
                Highlights
              </h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {product.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">
                    <Check className="h-5 w-5 text-green-500" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Pack Size */}
          <div className="mb-8">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-900">Select Size</h3>
            <div className="flex flex-wrap gap-3">
              {packSizes.map((pack) => (
                <button
                  key={pack.id}
                  onClick={() => setSelectedPackSize(pack.id)}
                  className={cn(
                    "flex flex-col items-start rounded-xl border-2 px-5 py-3 transition-all",
                    selectedPackSize === pack.id
                      ? "border-green-500 bg-green-50 text-green-700 font-bold"
                      : "border-gray-100 bg-white text-gray-600 hover:border-gray-200"
                  )}
                >
                  <span className="text-sm font-bold">{pack.label}</span>
                  {pack.discount > 0 && <span className="text-xs font-medium text-green-600">Save {pack.discount}%</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Total */}
          <div className="mt-auto hidden rounded-3xl border border-gray-100 bg-gray-50 p-6 lg:block">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-900">
                  Quantity
                </label>
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => setQuantity((q) => q + 1)}
                  onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="bg-white shadow-sm"
                />
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-500 mb-1">Total Amount</p>
                <p className="text-3xl font-extrabold text-gray-900">
                  {formatPrice(calculatePrice())}
                </p>
              </div>
            </div>

            <Button size="lg" onClick={handleAddToCart} className="w-full h-14 rounded-full text-lg font-bold shadow-lg shadow-green-200">
              <ShoppingCart className="mr-2 h-6 w-6" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 border-t border-gray-100 pt-16 mb-20">
          <h2 className="mb-8 text-2xl font-[800] text-[#0D1B11]">You May Also Like</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} showQuantity={true} />
            ))}
          </div>
        </section>
      )}

      {/* Sticky Bottom Bar - Mobile */}
      <div className="fixed bottom-20 left-0 right-0 z-20 border-t bg-white p-4 shadow-lg lg:hidden">
        <div className="container mx-auto flex items-center justify-between">
          <QuantitySelector
            quantity={quantity}
            onIncrease={() => setQuantity((q) => q + 1)}
            onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
            size="sm"
          />
          <Button onClick={handleAddToCart} className="flex-1">
            Add to Cart • {formatPrice(calculatePrice())}
          </Button>
        </div>
      </div>
    </div>
  );
}

