import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

// Duplicate interface removed
export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/products?category=${category.id}`}
      className="group relative flex flex-col overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white p-[16px] lg:p-[24px] transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[16px] bg-gray-100">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <h3 className="text-[18px] lg:text-[20px] font-[700] text-[#0D1B11]">{category.name}</h3>
          <p className="text-sm font-medium text-[#6B7280] line-clamp-1">{category.description}</p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-900 transition-colors group-hover:bg-[#13EC49] group-hover:text-[#0D1B11]">
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}

