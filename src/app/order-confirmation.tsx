import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useCart } from "@/store/cart-context";

export default function OrderConfirmationScreen() {
  const insets = useSafeAreaInsets();
  const { lastOrder } = useCart();

  if (!lastOrder) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No order found.</Text>
        <Pressable
          onPress={() => router.replace("/home")}
          style={styles.homeBtn}
        >
          <Text style={styles.homeBtnText}>Go Home</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 32 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Success indicator */}
      <View style={styles.successIcon}>
        <Ionicons name="checkmark-circle" size={80} color="#4CAF91" />
      </View>
      <Text style={styles.successTitle}>
        Your order has been{"\n"}accepted!
      </Text>
      <View style={styles.orderIdBadge}>
        <Text style={styles.orderIdLabel}>Order ID</Text>
        <Text style={styles.orderId}>{lastOrder.id}</Text>
      </View>

      {/* Items */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Items Ordered</Text>
        {lastOrder.items.map((item) => (
          <View key={item.product.id} style={styles.itemRow}>
            <Image
              source={{ uri: item.product.image }}
              style={styles.itemImage}
              contentFit="cover"
              transition={200}
            />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName} numberOfLines={2}>
                {item.product.name}
              </Text>
              <Text style={styles.itemCategory}>{item.product.category}</Text>
              <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
            </View>
            <Text style={styles.itemTotal}>
              ${(item.product.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      {/* Price summary */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Payment Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>
            ${lastOrder.subtotal.toFixed(2)}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery Fee</Text>
          <Text
            style={[
              styles.summaryValue,
              lastOrder.deliveryFee === 0 && styles.freeText,
            ]}
          >
            {lastOrder.deliveryFee === 0
              ? "FREE"
              : `$${lastOrder.deliveryFee.toFixed(2)}`}
          </Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total Paid</Text>
          <Text style={styles.totalValue}>${lastOrder.total.toFixed(2)}</Text>
        </View>
      </View>

      {/* Delivery details */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Delivering To</Text>
        <View style={styles.deliveryRow}>
          <Ionicons name="person" size={16} color="#4CAF91" />
          <Text style={styles.deliveryText}>
            {lastOrder.deliveryDetails.fullName}
          </Text>
        </View>
        <View style={styles.deliveryRow}>
          <Ionicons name="call" size={16} color="#4CAF91" />
          <Text style={styles.deliveryText}>
            {lastOrder.deliveryDetails.phone}
          </Text>
        </View>
        <View style={styles.deliveryRow}>
          <Ionicons name="mail" size={16} color="#4CAF91" />
          <Text style={styles.deliveryText}>
            {lastOrder.deliveryDetails.email}
          </Text>
        </View>
        <View style={styles.deliveryRow}>
          <Ionicons name="location" size={16} color="#4CAF91" />
          <Text style={styles.deliveryText}>
            {lastOrder.deliveryDetails.address},{" "}
            {lastOrder.deliveryDetails.city},{" "}
            {lastOrder.deliveryDetails.zipCode}
          </Text>
        </View>
      </View>

      {/* Actions */}
      <Pressable
        style={styles.continueBtn}
        onPress={() => router.replace("/home")}
      >
        <Ionicons name="home" size={18} color="#FFFFFF" />
        <Text style={styles.continueBtnText}>Continue Shopping</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F5F3" },
  content: { padding: 20, gap: 20, alignItems: "center" },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  errorText: { fontSize: 16, color: "#6B7280" },
  homeBtn: {
    backgroundColor: "#4CAF91",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  homeBtnText: { color: "#FFFFFF", fontWeight: "700" },
  successIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#4CAF91",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1A1A2E",
    textAlign: "center",
    lineHeight: 32,
  },
  orderIdBadge: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#4CAF91",
    gap: 2,
  },
  orderIdLabel: {
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "500",
    letterSpacing: 1,
  },
  orderId: {
    fontSize: 18,
    fontWeight: "800",
    color: "#4CAF91",
    letterSpacing: 1,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    gap: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: { fontSize: 15, fontWeight: "700", color: "#1A1A2E" },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0F5F3",
    paddingTop: 8,
  },
  itemImage: { width: 60, height: 60, borderRadius: 8 },
  itemInfo: { flex: 1, gap: 2 },
  itemName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1A1A2E",
    lineHeight: 18,
  },
  itemCategory: { fontSize: 11, color: "#9CA3AF" },
  itemQty: { fontSize: 12, color: "#6B7280" },
  itemTotal: { fontSize: 14, fontWeight: "700", color: "#1A1A2E" },
  summaryRow: { flexDirection: "row", justifyContent: "space-between" },
  summaryLabel: { fontSize: 14, color: "#6B7280" },
  summaryValue: { fontSize: 14, fontWeight: "600", color: "#1A1A2E" },
  freeText: { color: "#4CAF91" },
  totalRow: {
    borderTopWidth: 1.5,
    borderTopColor: "#E5EBE9",
    paddingTop: 10,
    marginTop: 4,
  },
  totalLabel: { fontSize: 16, fontWeight: "700", color: "#1A1A2E" },
  totalValue: { fontSize: 20, fontWeight: "800", color: "#4CAF91" },
  deliveryRow: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  deliveryText: { fontSize: 13, color: "#4B5563", flex: 1, lineHeight: 20 },
  continueBtn: {
    backgroundColor: "#4CAF91",
    borderRadius: 28,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    shadowColor: "#4CAF91",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  continueBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
});
