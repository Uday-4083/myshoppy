import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import {
    Dimensions,
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CategoryCard } from "@/components/category-card";
import { ProductCard } from "@/components/product-card";
import { CATEGORIES, getFeaturedProducts } from "@/data/products";
import { useCart } from "@/store/cart-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;

const FEATURED = getFeaturedProducts();

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { itemCount } = useCart();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Header ── */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <View>
          <Text style={styles.logo}>MyShoppy</Text>
          <View style={styles.logoUnderline} />
        </View>
        <View style={styles.headerRight}>
          <Pressable
            style={styles.headerIcon}
            onPress={() => router.push("/search")}
            hitSlop={8}
          >
            <Ionicons name="search" size={22} color="#1A1A2E" />
          </Pressable>
          <Pressable
            style={styles.headerIcon}
            onPress={() => router.push("/cart")}
            hitSlop={8}
          >
            <Ionicons name="cart-outline" size={22} color="#1A1A2E" />
            {itemCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{itemCount}</Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>

      {/* ── Hero Banner ── */}
      <View style={styles.heroBanner}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
          }}
          style={styles.heroImage}
          contentFit="cover"
          transition={300}
        />
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Shopping &amp; Department Store.</Text>
          <Text style={styles.heroSubtitle}>
            Discover quality household products for your everyday needs.
          </Text>
          <Pressable
            style={styles.shopButton}
            onPress={() => router.push("/categories")}
          >
            <Text style={styles.shopButtonText}>Shop Now</Text>
          </Pressable>
        </View>
      </View>

      {/* ── Categories ── */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <Pressable onPress={() => router.push("/categories")} hitSlop={8}>
            <Text style={styles.seeAll}>See all</Text>
          </Pressable>
        </View>
        <FlatList
          data={CATEGORIES}
          keyExtractor={(c) => c.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
          renderItem={({ item }) => (
            <CategoryCard category={item} width={140} height={110} />
          )}
        />
      </View>

      {/* ── Featured Products ── */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <Pressable onPress={() => router.push("/search")} hitSlop={8}>
            <Text style={styles.seeAll}>See all</Text>
          </Pressable>
        </View>
        <View style={styles.productsGrid}>
          {FEATURED.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              width={CARD_WIDTH}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F5F3",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: "#F0F5F3",
  },
  logo: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1A1A2E",
    letterSpacing: -0.5,
  },
  logoUnderline: {
    height: 3,
    width: 36,
    backgroundColor: "#4CAF91",
    borderRadius: 2,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: "row",
    gap: 8,
  },
  headerIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cartBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#E53935",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  cartBadgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "700",
  },
  heroBanner: {
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: "hidden",
    height: 240,
    marginBottom: 8,
  },
  heroImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(10,30,25,0.52)",
  },
  heroContent: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 28,
    marginBottom: 6,
  },
  heroSubtitle: {
    color: "rgba(255,255,255,0.78)",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 14,
  },
  shopButton: {
    backgroundColor: "#4CAF91",
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
  },
  shopButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A2E",
  },
  seeAll: {
    fontSize: 14,
    color: "#4CAF91",
    fontWeight: "600",
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    gap: 12,
  },
});
