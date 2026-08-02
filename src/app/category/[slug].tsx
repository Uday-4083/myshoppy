import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    Dimensions,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { ProductCard } from "@/components/product-card";
import { getCategoryBySlug, getProductsByCategory } from "@/data/products";
import { Product } from "@/types";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;

type SortOption = "default" | "price-asc" | "price-desc" | "rating";

export default function CategoryDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const category = getCategoryBySlug(slug);
  const allProducts = getProductsByCategory(slug);

  const [sort, setSort] = useState<SortOption>("default");
  const [showInStock, setShowInStock] = useState(false);

  const sorted = [...allProducts]
    .filter((p) => !showInStock || p.inStock)
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <>
      <Stack.Screen
        options={{ title: category ? `${category.name}` : "Products" }}
      />
      <View style={styles.container}>
        {/* Subtitle */}
        <View style={styles.subHeader}>
          <Text style={styles.subTitle}>
            {category?.description ?? "Browse products"}
          </Text>
          <Text style={styles.count}>{sorted.length} products</Text>
        </View>

        {/* Filter & Sort bar */}
        <View style={styles.filterBar}>
          <Pressable
            style={[styles.chip, showInStock && styles.chipActive]}
            onPress={() => setShowInStock((v) => !v)}
          >
            <Ionicons
              name={
                showInStock ? "checkmark-circle" : "checkmark-circle-outline"
              }
              size={14}
              color={showInStock ? "#FFFFFF" : "#4CAF91"}
            />
            <Text
              style={[styles.chipText, showInStock && styles.chipTextActive]}
            >
              In Stock
            </Text>
          </Pressable>

          {(
            ["default", "price-asc", "price-desc", "rating"] as SortOption[]
          ).map((s) => {
            const labels: Record<SortOption, string> = {
              default: "Default",
              "price-asc": "Price ↑",
              "price-desc": "Price ↓",
              rating: "Top Rated",
            };
            return (
              <Pressable
                key={s}
                style={[styles.chip, sort === s && styles.chipActive]}
                onPress={() => setSort(s)}
              >
                <Text
                  style={[styles.chipText, sort === s && styles.chipTextActive]}
                >
                  {labels[s]}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {sorted.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={52} color="#C8D6D2" />
            <Text style={styles.emptyText}>No products found</Text>
            <Text style={styles.emptyHint}>Try removing filters</Text>
          </View>
        ) : (
          <FlatList
            data={sorted as Product[]}
            keyExtractor={(p) => p.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ProductCard product={item} width={CARD_WIDTH} />
            )}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F5F3" },
  subHeader: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subTitle: { fontSize: 13, color: "#6B7280", flex: 1 },
  count: { fontSize: 13, color: "#4CAF91", fontWeight: "600" },
  filterBar: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexWrap: "wrap",
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1.5,
    borderColor: "#4CAF91",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  chipActive: { backgroundColor: "#4CAF91" },
  chipText: { fontSize: 12, color: "#4CAF91", fontWeight: "600" },
  chipTextActive: { color: "#FFFFFF" },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  emptyText: { fontSize: 16, fontWeight: "600", color: "#6B7280" },
  emptyHint: { fontSize: 13, color: "#9CA3AF" },
  list: { paddingHorizontal: 16, paddingBottom: 24, gap: 12 },
  row: { gap: 12, justifyContent: "space-between" },
});
