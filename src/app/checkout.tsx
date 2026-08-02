import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { useCart } from "@/store/cart-context";
import { DeliveryDetails } from "@/types";

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  zipCode?: string;
}

function LabeledInput({
  label,
  value,
  onChangeText,
  error,
  placeholder,
  keyboardType = "default",
  autoCapitalize = "words",
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  error?: string;
  placeholder?: string;
  keyboardType?: "default" | "phone-pad" | "email-address" | "numeric";
  autoCapitalize?: "none" | "words" | "sentences";
}) {
  return (
    <View style={inputStyles.wrapper}>
      <Text style={inputStyles.label}>{label}</Text>
      <TextInput
        style={[inputStyles.input, error && inputStyles.inputError]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
      {error ? <Text style={inputStyles.error}>{error}</Text> : null}
    </View>
  );
}

const inputStyles = StyleSheet.create({
  wrapper: { gap: 4 },
  label: { fontSize: 13, fontWeight: "600", color: "#1A1A2E" },
  input: {
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
    color: "#1A1A2E",
    backgroundColor: "#FFFFFF",
  },
  inputError: { borderColor: "#EF4444" },
  error: { fontSize: 12, color: "#EF4444", fontWeight: "500" },
});

export default function CheckoutScreen() {
  const { cart, subtotal, placeOrder } = useCart();
  const deliveryFee = subtotal >= 100 ? 0 : 9.99;
  const total = subtotal + deliveryFee;

  const [form, setForm] = useState<DeliveryDetails>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const set = (key: keyof DeliveryDetails) => (val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 2)
      e.fullName = "Full name is required (min 2 characters)";
    if (!/^\+?[\d\s\-()]{7,15}$/.test(form.phone.trim()))
      e.phone = "Enter a valid phone number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = "Enter a valid email address";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!/^\d{4,10}$/.test(form.zipCode.trim()))
      e.zipCode = "Enter a valid ZIP/postal code";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validate()) return;
    if (cart.length === 0) {
      Alert.alert(
        "Empty Cart",
        "Add products to your cart before placing an order.",
      );
      return;
    }
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      const order = placeOrder(form);
      setLoading(false);
      router.replace("/order-confirmation");
    }, 800);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Review Items */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Review Item &amp; Shipping</Text>
          {cart.map((item) => (
            <View key={item.product.id} style={styles.cartRow}>
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
                <Text style={styles.itemPrice}>
                  ${item.product.price.toFixed(2)}
                </Text>
                <Text style={styles.itemQty}>Quantity: {item.quantity}</Text>
                {item.product.stockCount <= 5 && item.product.inStock && (
                  <Text style={styles.lowStock}>
                    Only {item.product.stockCount} Items Left!
                  </Text>
                )}
              </View>
              <Text style={styles.lineTotal}>
                ${(item.product.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Delivery Details */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Delivery Details</Text>
          <LabeledInput
            label="Full Name *"
            value={form.fullName}
            onChangeText={set("fullName")}
            error={errors.fullName}
            placeholder="John Smith"
          />
          <LabeledInput
            label="Phone Number *"
            value={form.phone}
            onChangeText={set("phone")}
            error={errors.phone}
            placeholder="+1 555 000 0000"
            keyboardType="phone-pad"
            autoCapitalize="none"
          />
          <LabeledInput
            label="Email Address *"
            value={form.email}
            onChangeText={set("email")}
            error={errors.email}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <LabeledInput
            label="Street Address *"
            value={form.address}
            onChangeText={set("address")}
            error={errors.address}
            placeholder="123 Main Street, Apt 4B"
            autoCapitalize="sentences"
          />
          <LabeledInput
            label="City *"
            value={form.city}
            onChangeText={set("city")}
            error={errors.city}
            placeholder="New York"
          />
          <LabeledInput
            label="ZIP / Postal Code *"
            value={form.zipCode}
            onChangeText={set("zipCode")}
            error={errors.zipCode}
            placeholder="10001"
            keyboardType="numeric"
            autoCapitalize="none"
          />
        </View>

        {/* Order Summary */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Total Price</Text>
          {cart.map((item) => (
            <View key={item.product.id} style={styles.summaryRow}>
              <Text style={styles.summaryLabel} numberOfLines={1}>
                {item.product.name}
              </Text>
              <Text style={styles.summaryQty}>{item.quantity}</Text>
              <Text style={styles.summaryValue}>
                ${(item.product.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
          <View style={[styles.summaryRow, styles.deliveryRow]}>
            <Text style={styles.summaryLabel}>Delivery</Text>
            <Text style={styles.summaryQty} />
            <Text
              style={[
                styles.summaryValue,
                deliveryFee === 0 && styles.freeText,
              ]}
            >
              {deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}
            </Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total :</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Place Order */}
        <Pressable
          style={[styles.placeOrderBtn, loading && styles.placeOrderBtnLoading]}
          onPress={handlePlaceOrder}
          disabled={loading}
        >
          {loading ? (
            <Text style={styles.placeOrderText}>Processing...</Text>
          ) : (
            <>
              <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
              <Text style={styles.placeOrderText}>Place Order</Text>
            </>
          )}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F5F3" },
  content: { padding: 16, gap: 16, paddingBottom: 32 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#1A1A2E" },
  cartRow: {
    flexDirection: "row",
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0F5F3",
    paddingTop: 10,
    alignItems: "flex-start",
  },
  itemImage: { width: 72, height: 72, borderRadius: 8 },
  itemInfo: { flex: 1, gap: 2 },
  itemName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1A1A2E",
    lineHeight: 18,
  },
  itemCategory: { fontSize: 11, color: "#9CA3AF" },
  itemPrice: { fontSize: 14, fontWeight: "700", color: "#4CAF91" },
  itemQty: { fontSize: 12, color: "#6B7280" },
  lowStock: {
    fontSize: 11,
    color: "#F59E0B",
    fontWeight: "600",
    backgroundColor: "#FEF9C3",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  lineTotal: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A1A2E",
    minWidth: 60,
    textAlign: "right",
  },
  summaryRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  summaryLabel: { flex: 1, fontSize: 14, color: "#6B7280" },
  summaryQty: {
    width: 24,
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A2E",
    minWidth: 64,
    textAlign: "right",
  },
  freeText: { color: "#4CAF91" },
  deliveryRow: {
    borderTopWidth: 1,
    borderTopColor: "#F0F5F3",
    paddingTop: 8,
    marginTop: 4,
  },
  totalRow: {
    borderTopWidth: 1.5,
    borderTopColor: "#E5EBE9",
    paddingTop: 10,
    marginTop: 4,
  },
  totalLabel: { flex: 1, fontSize: 16, fontWeight: "700", color: "#4CAF91" },
  totalValue: { fontSize: 20, fontWeight: "800", color: "#4CAF91" },
  placeOrderBtn: {
    backgroundColor: "#4CAF91",
    borderRadius: 28,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#4CAF91",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  placeOrderBtnLoading: { opacity: 0.7 },
  placeOrderText: { color: "#FFFFFF", fontSize: 17, fontWeight: "700" },
});
