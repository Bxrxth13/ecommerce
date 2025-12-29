import { NextResponse } from "next/server";
import { products } from "@/lib/data/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  let filteredProducts = [...products];

  if (category) {
    filteredProducts = filteredProducts.filter((p) => p.categoryId === category);
  }

  if (search) {
    const query = search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }

  return NextResponse.json(filteredProducts);
}

