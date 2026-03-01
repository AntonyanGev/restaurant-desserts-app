import type { Dessert, CartItem } from "@/types";

export const buildCartItems = (
  desserts: Dessert[],
  counts: Record<string, number>
): CartItem[] => {
  return desserts
    .filter((d) => (counts[d.id] || 0) > 0)
    .map((d) => ({
      id: d.id,
      name: d.name,
      price: d.price,
      count: counts[d.id],
      totalPrice: counts[d.id] * parseFloat(d.price),
      image: d.images.thumbnail,
    }));
};
