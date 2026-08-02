import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { StarRating } from "@/components/star-rating";
import { getProductById } from "@/data/products";
import { useCart } from "@/store/cart-context";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = getProductById(id);
  const { addToCart, cart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={56} color="#D1D5DB" />
        <Text style={styles.errorText}>Product not found</Text>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const cartItem = cart.find((i) => i.product.id === product.id);
  const inCart = !!cartItem;
  const maxQty = product.stockCount;
  const lowStock = product.inStock && product.stockCount <= 5;

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(product, quantity);
    router.push("/cart");
  };

  return (
    <>
      <Stack.Screen options={{ title: product.name }} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            contentFit="cover"
            transition={300}
          />
          {!product.inStock && (
            <View style={styles.outOfStockOverlay}>
              <Text style={styles.outOfStockText}>Out of Stock</Text>
            </View>
          )}
          {product.originalPrice && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                -
                {Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100,
                )}
                % OFF
              </Text>
            </View>
          )}
        </View>

        <View style={styles.details}>
          {/* Category chip */}
          <Pressable
            onPress={() => router.push(`/category/${product.categorySlug}`)}
          >
            <View style={styles.categoryChip}>
              <Text style={styles.categoryChipText}>{product.category}</Text>
            </View>
          </Pressable>

          {/* Name & Pricing */}
          <Text style={styles.name}>{product.name}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>
                ${product.originalPrice.toFixed(2)}
              </Text>
            )}
          </View>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <StarRating
              rating={product.rating}
              reviewCount={product.reviewCount}
              size={16}
            />
          </View>

          {/* Stock status */}
          <View style={styles.stockRow}>
            <View
              style={[
                styles.stockDot,
                { backgroundColor: product.inStock ? "#4CAF91" : "#EF4444" },
              ]}
            />
            <Text
              style={[
                styles.stockText,
                { color: product.inStock ? "#4CAF91" : "#EF4444" },
              ]}
            >
              {product.inStock
                ? `In Stock (${product.stockCount} left)`
                : "Out of Stock"}
            </Text>
            {lowStock && (
              <Text style={styles.lowStockText}>
                Only {product.stockCount} left!
              </Text>
            )}
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          {/* Tags */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tags</Text>
            <View style={styles.tagsRow}>
              {product.tags.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Quantity selector */}
          {product.inStock && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quantity</Text>
              <View style={styles.qtySelector}>
                <Pressable
                  style={[
                    styles.qtyBtn,
                    quantity <= 1 && styles.qtyBtnDisabled,
                  ]}
                  onPress={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  hitSlop={8}
                >
                  <Ionicons
                    name="remove"
                    size={20}
                    color={quantity <= 1 ? "#D1D5DB" : "#4CAF91"}
                  />
                </Pressable>
                <Text style={styles.qtyValue}>{quantity}</Text>
                <Pressable
                  style={[
                    styles.qtyBtn,
                    quantity >= maxQty && styles.qtyBtnDisabled,
                  ]}
                  onPress={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                  disabled={quantity >= maxQty}
                  hitSlop={8}
                >
                  <Ionicons
                    name="add"
                    size={20}
                    color={quantity >= maxQty ? "#D1D5DB" : "#4CAF91"}
                  />
                </Pressable>
                <Text style={styles.qtySubtotal}>
                  = ${(product.price * quantity).toFixed(2)}
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Add to Cart footer */}
      <View style={styles.footer}>
        <Pressable
          style={[
            styles.addButton,
            !product.inStock && styles.addButtonDisabled,
          ]}
          onPress={handleAddToCart}
          disabled={!product.inStock}
        >
          <Ionicons
            name={inCart ? "checkmark-circle" : "cart"}
            size={20}
            color="#FFFFFF"
          />
          <Text style={styles.addButtonText}>
            {!product.inStock
              ? "Unavailable"
              : inCart
                ? "View in Cart"
                : "Add to Cart"}
          </Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F5F3" },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F5F3",
    gap: 12,
  },
  errorText: { fontSize: 16, color: "#6B7280" },
  backBtn: {
    backgroundColor: "#4CAF91",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 8,
  },
  backBtnText: { color: "#FFFFFF", fontWeight: "700" },
  imageContainer: {
    position: "relative",
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  outOfStockOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  outOfStockText: { color: "#FFFFFF", fontSize: 22, fontWeight: "700" },
  discountBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#EF4444",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  discountText: { color: "#FFFFFF", fontWeight: "700", fontSize: 13 },
  details: {
    padding: 16,
    gap: 10,
  },
  categoryChip: {
    alignSelf: "flex-start",
    backgroundColor: "#DCFCE7",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  categoryChipText: { color: "#16A34A", fontSize: 12, fontWeight: "600" },
  name: { fontSize: 22, fontWeight: "800", color: "#1A1A2E", lineHeight: 28 },
  priceRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  price: { fontSize: 26, fontWeight: "800", color: "#4CAF91" },
  originalPrice: {
    fontSize: 16,
    color: "#9CA3AF",
    textDecorationLine: "line-through",
  },
  ratingRow: { flexDirection: "row", alignItems: "center" },
  stockRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  stockDot: { width: 8, height: 8, borderRadius: 4 },
  stockText: { fontSize: 13, fontWeight: "600" },
  lowStockText: {
    fontSize: 12,
    color: "#F59E0B",
    fontWeight: "600",
    backgroundColor: "#FEF9C3",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  section: {
    borderTopWidth: 1,
    borderTopColor: "#E5EBE9",
    paddingTop: 12,
    gap: 8,
  },
  sectionTitle: { fontSize: 15, fontWeight: "700", color: "#1A1A2E" },
  description: { fontSize: 14, color: "#4B5563", lineHeight: 22 },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tag: {
    backgroundColor: "#F0F5F3",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#C8D6D2",
  },
  tagText: { fontSize: 12, color: "#4B5563", fontWeight: "500" },
  qtySelector: { flexDirection: "row", alignItems: "center", gap: 12 },
  qtyBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#4CAF91",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBtnDisabled: { borderColor: "#D1D5DB" },
  qtyValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A2E",
    minWidth: 32,
    textAlign: "center",
  },
  qtySubtotal: {
    fontSize: 15,
    color: "#4CAF91",
    fontWeight: "600",
    marginLeft: 4,
  },
  footer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  },
  addButton: {
    backgroundColor: "#4CAF91",
    borderRadius: 28,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  addButtonDisabled: { backgroundColor: "#D1D5DB" },
  addButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
});
