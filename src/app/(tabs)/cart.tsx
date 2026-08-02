import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useCart } from "@/store/cart-context";
import { CartItem } from "@/types";

function CartRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <View style={styles.cartRow}>
      <Image
        source={{ uri: product.image }}
        style={styles.productImage}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.productCategory}>{product.category}</Text>
        <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
        <View style={styles.qtyRow}>
          <Pressable
            style={styles.qtyBtn}
            onPress={() => updateQuantity(product.id, quantity - 1)}
            hitSlop={8}
          >
            <Ionicons name="remove" size={16} color="#4CAF91" />
          </Pressable>
          <Text style={styles.qtyText}>{quantity}</Text>
          <Pressable
            style={styles.qtyBtn}
            onPress={() => updateQuantity(product.id, quantity + 1)}
            hitSlop={8}
            disabled={quantity >= product.stockCount}
          >
            <Ionicons
              name="add"
              size={16}
              color={quantity >= product.stockCount ? "#D1D5DB" : "#4CAF91"}
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.rowRight}>
        <Text style={styles.lineTotal}>
          ${(product.price * quantity).toFixed(2)}
        </Text>
        <Pressable
          style={styles.removeBtn}
          onPress={() => removeFromCart(product.id)}
          hitSlop={8}
        >
          <Ionicons name="trash-outline" size={18} color="#EF4444" />
        </Pressable>
      </View>
    </View>
  );
}

export default function CartScreen() {
  const insets = useSafeAreaInsets();
  const { cart, subtotal, itemCount } = useCart();
  const deliveryFee = subtotal >= 100 ? 0 : 9.99;
  const total = subtotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <View style={[styles.emptyContainer, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cart</Text>
        </View>
        <View style={styles.emptyBody}>
          <Ionicons name="cart-outline" size={80} color="#C8D6D2" />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>
            Browse our products and add something!
          </Text>
          <Pressable
            style={styles.browseButton}
            onPress={() => router.push("/categories")}
          >
            <Text style={styles.browseButtonText}>Browse Products</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cart</Text>
        <Text style={styles.itemCount}>
          {itemCount} item{itemCount !== 1 ? "s" : ""}
        </Text>
      </View>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.product.id}
        renderItem={({ item }) => <CartRow item={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>Order Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery</Text>
              <Text
                style={[
                  styles.summaryValue,
                  deliveryFee === 0 && styles.freeDelivery,
                ]}
              >
                {deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}
              </Text>
            </View>
            {deliveryFee === 0 && (
              <Text style={styles.freeDeliveryNote}>
                🎉 You qualify for free delivery!
              </Text>
            )}
            {deliveryFee > 0 && (
              <Text style={styles.freeDeliveryNote}>
                Add ${(100 - subtotal).toFixed(2)} more for free delivery
              </Text>
            )}
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>
        }
      />

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable
          style={styles.checkoutButton}
          onPress={() => router.push("/checkout")}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F5F3" },
  emptyContainer: { flex: 1, backgroundColor: "#F0F5F3" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 8,
  },
  headerTitle: { fontSize: 26, fontWeight: "800", color: "#1A1A2E" },
  itemCount: { fontSize: 14, color: "#6B7280", fontWeight: "500" },
  emptyBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 32,
  },
  emptyTitle: { fontSize: 20, fontWeight: "700", color: "#1A1A2E" },
  emptySubtitle: { fontSize: 14, color: "#6B7280", textAlign: "center" },
  browseButton: {
    marginTop: 8,
    backgroundColor: "#4CAF91",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 24,
  },
  browseButtonText: { color: "#FFFFFF", fontWeight: "700", fontSize: 15 },
  list: { paddingHorizontal: 16, paddingBottom: 16, gap: 12 },
  cartRow: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: { width: 90, height: 90 },
  productInfo: { flex: 1, padding: 10, gap: 3 },
  productName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1A1A2E",
    lineHeight: 18,
  },
  productCategory: { fontSize: 11, color: "#9CA3AF", fontWeight: "500" },
  productPrice: { fontSize: 15, fontWeight: "700", color: "#4CAF91" },
  qtyRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#4CAF91",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A1A2E",
    minWidth: 20,
    textAlign: "center",
  },
  rowRight: {
    padding: 10,
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  lineTotal: { fontSize: 14, fontWeight: "700", color: "#1A1A2E" },
  removeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
  },
  summary: {
    marginTop: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A2E",
    marginBottom: 4,
  },
  summaryRow: { flexDirection: "row", justifyContent: "space-between" },
  summaryLabel: { fontSize: 14, color: "#6B7280" },
  summaryValue: { fontSize: 14, fontWeight: "600", color: "#1A1A2E" },
  freeDelivery: { color: "#4CAF91" },
  freeDeliveryNote: { fontSize: 12, color: "#4CAF91", fontStyle: "italic" },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#F0F5F3",
    paddingTop: 10,
    marginTop: 4,
  },
  totalLabel: { fontSize: 16, fontWeight: "700", color: "#1A1A2E" },
  totalValue: { fontSize: 18, fontWeight: "800", color: "#4CAF91" },
  footer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  checkoutButton: {
    backgroundColor: "#4CAF91",
    borderRadius: 28,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  checkoutButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
});
