import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import { theme } from "../theme";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  name: string;
  isCompleted?: boolean;
  onDelete: () => void;
  onToggleComplete: () => void;
};

export function ShoppingListItem({
  name,
  isCompleted,
  onDelete,
  onToggleComplete,
}: Props) {
  const handleDelete = () => {
    Alert.alert(
      `Are You Sure You Want To Delete ${name} ?`,
      "It Will Be Gone For Good",
      [
        {
          text: "Yes",
          onPress: () => onDelete(),
          style: "destructive",
        },
        {
          text: "Cancel",
          onPress: () => console.log("Canceled"),
          style: "cancel",
        },
      ],
    );
  };
  return (
    <Pressable
      style={[
        styles.itemContainer,
        isCompleted ? styles.itemIsCompleted : undefined,
      ]}
      onPress={onToggleComplete}
    >
      <View style={styles.row}>
        <Ionicons
          name={isCompleted ? "checkmark-circle":  "checkmark-circle-outline" }
          size={32}
          color={isCompleted ? theme.colorGray : theme.colorCerulean}
        />
        <Text
        numberOfLines={1}
          style={[
            styles.itemText,
            isCompleted ? styles.completedText : undefined,
          ]}
        >
          {name}
        </Text>
      </View>
      <TouchableOpacity onPress={handleDelete}>
        <Text style={styles.buttonText}>
          <Ionicons
            name="close-circle"
            size={32}
            color={isCompleted ? theme.colorGray : theme.colorRed}
          />
        </Text>
      </TouchableOpacity>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderBottomColor: "#1a759f",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: {
    fontSize: 18,
    fontWeight: "200",
    flex: 1,
  },
  itemIsCompleted: {
    backgroundColor: theme.colorLightGray,
    borderBottomColor: theme.colorLightGray,
  },
  buttonText: {
    color: theme.colorWhite,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  completedText: {
    textDecorationLine: "line-through",
    textDecorationColor: theme.colorGray,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
});
