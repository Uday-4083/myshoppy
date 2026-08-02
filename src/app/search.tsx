import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
    Dimensions,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { ProductCard } from "@/components/product-card";
import { CATEGORIES, searchProducts } from "@/data/products";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  );
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  const PRICE_FILTERS = [
    { label: "All Prices", value: undefined },
    { label: "Under $30", value: 30 },
    { label: "Under $100", value: 100 },
    { label: "Under $300", value: 300 },
  ];

  const results = useMemo(() => {
    const found = searchProducts(query, selectedCategory);
    if (maxPrice !== undefined) return found.filter((p) => p.price <= maxPrice);
    return found;
  }, [query, selectedCategory, maxPrice]);

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="#9CA3AF" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor="#9CA3AF"
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
          returnKeyType="search"
        />
        {query.length > 0 && (
          <Pressable onPress={() => setQuery("")} hitSlop={8}>
            <Ionicons name="close-circle" size={18} color="#9CA3AF" />
          </Pressable>
        )}
      </View>

      {/* Category filter */}
      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Category</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[{ id: "all", name: "All", slug: "" }, ...CATEGORIES]}
          keyExtractor={(c) => c.id}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
          renderItem={({ item }) => {
            const isActive =
              item.slug === ""
                ? !selectedCategory
                : selectedCategory === item.slug;
            return (
              <Pressable
                style={[styles.chip, isActive && styles.chipActive]}
                onPress={() =>
                  setSelectedCategory(item.slug === "" ? undefined : item.slug)
                }
              >
                <Text
                  style={[styles.chipText, isActive && styles.chipTextActive]}
                >
                  {item.name}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>

      {/* Price filter */}
      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Price Range</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={PRICE_FILTERS}
          keyExtractor={(f) => String(f.value)}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
          renderItem={({ item }) => {
            const isActive = maxPrice === item.value;
            return (
              <Pressable
                style={[styles.chip, isActive && styles.chipActive]}
                onPress={() => setMaxPrice(item.value)}
              >
                <Text
                  style={[styles.chipText, isActive && styles.chipTextActive]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>

      {/* Results */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {results.length} product{results.length !== 1 ? "s" : ""} found
        </Text>
      </View>

      {results.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="search-outline" size={64} color="#C8D6D2" />
          <Text style={styles.emptyTitle}>No products found</Text>
          <Text style={styles.emptySubtitle}>
            Try a different search term or remove filters
          </Text>
        </View>
      ) : (
        <FlatList
          data={results}
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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F5F3" },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: { flex: 1, fontSize: 15, color: "#1A1A2E" },
  filterSection: { marginBottom: 8 },
  filterLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  chip: {
    borderWidth: 1.5,
    borderColor: "#4CAF91",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  chipActive: { backgroundColor: "#4CAF91" },
  chipText: { fontSize: 13, color: "#4CAF91", fontWeight: "600" },
  chipTextActive: { color: "#FFFFFF" },
  resultsHeader: { paddingHorizontal: 16, paddingVertical: 6 },
  resultsCount: { fontSize: 13, color: "#6B7280", fontWeight: "500" },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  emptyTitle: { fontSize: 18, fontWeight: "700", color: "#6B7280" },
  emptySubtitle: {
    fontSize: 13,
    color: "#9CA3AF",
    textAlign: "center",
    paddingHorizontal: 32,
  },
  list: { paddingHorizontal: 16, paddingBottom: 24, gap: 12 },
  row: { gap: 12, justifyContent: "space-between" },
});
