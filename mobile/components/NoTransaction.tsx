import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from "../constants/colors.js";
import { styles } from "../assets/styles/home.styles.js";
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const NoTransaction = () => {
    const router = useRouter();
  return (
    <View style={styles.emptyState}>
        <Ionicons name='sad-outline' size={60} color={COLORS.textLight} />
        <Text style={styles.emptyStateTitle}>No Transactions yet</Text>
        <Text style={styles.emptyStateText}>
            Start tracking your expenses and income by adding your first transaction.
        </Text>
        <TouchableOpacity style={styles.emptyStateButton} onPress={() => router.push("/create")}>
            <Ionicons name='add-circle' size={18} color={COLORS.white}  />
            <Text style={styles.emptyStateButtonText}>Add Transaction</Text>
        </TouchableOpacity>
    </View>
  )
}

export default NoTransaction