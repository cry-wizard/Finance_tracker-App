import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { API_URL } from "@/constants/api";
import { styles } from "../../assets/styles/create.styles.js";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors.js";

const CATEGORY = [
  { id: "food", name: "Food & Drinks", icon: "fast-food" },
  { id: "transport", name: "Transport", icon: "car" },
  { id: "shopping", name: "Shopping", icon: "cart" },
  { id: "entertainment", name: "Entertainment", icon: "game-controller" },
  { id: "bills", name: "Bills", icon: "receipt" },
  { id: "health", name: "Health", icon: "heart" },
  { id: "income", name: "Income", icon: "cash" },
  { id: "other", name: "Other", icon: "ellipsis-horizontal" },
];

const CreateScreen = () => {
  const router = useRouter();
  const { user } = useUser();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [expense, setExpense] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim() || !amount.trim() || !category || isNaN(parseFloat(amount))) {
      return Alert.alert("Error", "Please enter a valid title, amount, and category");
    }

    setIsLoading(true);
    try {
      const formattedAmount = expense
        ? -Math.abs(parseFloat(amount))
        : Math.abs(parseFloat(amount));

      const response = await fetch(`${API_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user?.id,
          title: title.trim(),
          amount: formattedAmount,
          category: category, // now using category.id
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        
        throw new Error("Failed to create transaction");
      }

      Alert.alert("Success", "Transaction created successfully");
      router.back();
    } catch (error) {
      console.error("Error creating transaction:", error);
      Alert.alert("Error", "Failed to create transaction");
    } finally {
      setIsLoading(false);
    }
  };

  const renderCategoryButton = (cat:  any) => (
    <TouchableOpacity
      key={cat.id}
      style={[
        styles.categoryButton,
        { gap: 5 },
        category === cat.id && styles.categoryButtonActive,
      ]}
      onPress={() => setCategory(cat.id)}
    >
      <Ionicons
        name={cat.icon}
        size={20}
        color={category === cat.id ? COLORS.white : COLORS.text}
      />
      <Text
        style={[
          styles.categoryButtonText,
          category === cat.id && styles.categoryButtonTextActive,
        ]}
      >
        {cat.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Create Transaction</Text>

        <TouchableOpacity
          disabled={isLoading}
          style={[
            { flexDirection: "row", gap: 3, padding: 2 },
            isLoading && styles.saveButtonDisabled,
          ]}
          onPress={handleCreate}
        >
          <Text style={styles.saveButtonText}>
            {isLoading ? "Saving..." : "Save"}
          </Text>
          {!isLoading && (
            <Ionicons name="checkmark" size={20} color={COLORS.primary} />
          )}
        </TouchableOpacity>
      </View>

      {/* Expense / Income Selector */}
      <View style={styles.card}>
        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[styles.typeButton, expense && styles.typeButtonActive]}
            onPress={() => setExpense(true)}
          >
            <Ionicons
              name="arrow-down-circle"
              size={24}
              style={styles.typeIcon}
              color={expense ? COLORS.white : COLORS.expense}
            />
            <Text
              style={[
                styles.typeButtonText,
                expense && styles.typeButtonTextActive,
              ]}
            >
              Expense
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.typeButton, !expense && styles.typeButtonActive]}
            onPress={() => setExpense(false)}
          >
            <Ionicons
              name="arrow-up-circle"
              size={24}
              style={styles.typeIcon}
              color={!expense ? COLORS.white : COLORS.income}
            />
            <Text
              style={[
                styles.typeButtonText,
                !expense && styles.typeButtonTextActive,
              ]}
            >
              Income
            </Text>
          </TouchableOpacity>
        </View>

        {/* Amount Input */}
        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>₹</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="0.00"
            value={amount}
            onChangeText={(val) =>
              setAmount(val.replace(/[^0-9.]/g, "")) // remove non-numeric input
            }
            placeholderTextColor={COLORS.textLight}
            keyboardType="numeric"
          />
        </View>

        {/* Title Input */}
        <View style={styles.inputContainer}>
          <Ionicons
            name="create-outline"
            style={styles.inputIcon}
            size={20}
            color={COLORS.textLight}
          />
          <TextInput
            style={styles.input}
            placeholder="Transaction Title"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor={COLORS.textLight}
          />
        </View>

        {/* Category Selector */}
        <Text style={styles.sectionTitle}>
          <Ionicons name="pricetag-outline" size={16} color={COLORS.text} />{" "}
          Category
        </Text>

        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
          {CATEGORY.map(renderCategoryButton)}
        </View>
      </View>

      {/* Loading Indicator */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
    </View>
  );
};

export default CreateScreen;
