import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: number;
  showCount?: boolean;
}

export function StarRating({
  rating,
  reviewCount,
  size = 14,
  showCount = true,
}: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <View style={styles.container}>
      {stars.map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        const iconName = filled ? "star" : half ? "star-half" : "star-outline";
        return (
          <Ionicons key={star} name={iconName} size={size} color="#F59E0B" />
        );
      })}
      {showCount && reviewCount !== undefined && (
        <Text style={[styles.count, { fontSize: size - 1 }]}>
          ({reviewCount})
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
  },
  count: {
    color: "#6B7280",
    marginLeft: 4,
  },
});
