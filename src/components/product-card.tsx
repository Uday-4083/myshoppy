import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useCart } from "@/store/cart-context";
import { Product } from "@/types";

import { StarRating } from "./star-rating";

interface ProductCardProps {
  product: Product;
  width?: number;
}

export function ProductCard({ product, width = 170 }: ProductCardProps) {
  const { addToCart, cart } = useCart();
  const [wishlist, setWishlist] = useState(false);
  const inCart = cart.some((i) => i.product.id === product.id);

  return (
    <Pressable
      style={[styles.card, { width }]}
      onPress={() => router.push(`/product/${product.id}`)}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        {!product.inStock && (
          <View style={styles.outOfStockBadge}>
            <Text style={styles.outOfStockText}>Out of Stock</Text>
          </View>
        )}
        {product.originalPrice && (
          <View style={styles.saleBadge}>
            <Text style={styles.saleText}>
              -
              {Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100,
              )}
              %
            </Text>
          </View>
        )}
        <Pressable
          style={styles.wishlistButton}
          onPress={() => setWishlist((v) => !v)}
          hitSlop={8}
        >
          <Ionicons
            name={wishlist ? "heart" : "heart-outline"}
            size={18}
            color={wishlist ? "#EF4444" : "#6B7280"}
          />
        </Pressable>
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          {product.originalPrice && (
            <Text style={styles.originalPrice}>
              ${product.originalPrice.toFixed(2)}
            </Text>
          )}
        </View>
        <StarRating
          rating={product.rating}
          reviewCount={product.reviewCount}
          size={12}
        />
        <Pressable
          style={[
            styles.addButton,
            (!product.inStock || inCart) && styles.addButtonDisabled,
          ]}
          onPress={() => product.inStock && addToCart(product)}
          disabled={!product.inStock}
        >
          <Text style={styles.addButtonText}>
            {inCart ? "In Cart ✓" : "Add to Cart"}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#F0F5F3",
  },
  outOfStockBadge: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingVertical: 4,
    alignItems: "center",
  },
  outOfStockText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
  },
  saleBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#EF4444",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  saleText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
  wishlistButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  info: {
    padding: 10,
    gap: 4,
  },
  name: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1A1A2E",
    lineHeight: 18,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
    color: "#4CAF91",
  },
  originalPrice: {
    fontSize: 12,
    color: "#9CA3AF",
    textDecorationLine: "line-through",
  },
  addButton: {
    marginTop: 4,
    backgroundColor: "#4CAF91",
    borderRadius: 8,
    paddingVertical: 7,
    alignItems: "center",
  },
  addButtonDisabled: {
    backgroundColor: "#D1D5DB",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
});
