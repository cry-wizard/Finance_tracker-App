import { View, Text } from "react-native";
import React from "react";
import { COLORS } from "../constants/colors.js";
import { styles } from "../assets/styles/home.styles.js";

const BalanceCard = ({ summary }: any) => {
  if (!summary) {
    return (
      <View style={styles.balanceCard}>
        <Text style={styles.balanceTitle}>Total Balance</Text>
        <Text style={styles.balanceAmount}>$0.00</Text>
        <View style={styles.balanceStats}>
          <View style={styles.balanceStatItem}>
            <Text style={styles.balanceStatLabel}>Income</Text>
            <Text style={[styles.balanceStatAmount, { color: COLORS.income }]}>
              +$0.00
            </Text>
          </View>
          <View style={[styles.balanceStatItem, styles.statDivider]}>
            <Text style={styles.balanceStatLabel}>Expense</Text>
            <Text style={[styles.balanceStatAmount, { color: COLORS.expense }]}>
              -$0.00
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>Total Balance</Text>
      <Text style={styles.balanceAmount}>
        ${parseFloat(summary.balance).toFixed(2)}
      </Text>
      <View style={styles.balanceStats}>
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Income</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.income }]}>
            +${parseFloat(summary.income).toFixed(2)}
          </Text>
        </View>
        <View style={[styles.balanceStatItem, styles.statDivider]}>
            <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Expense</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.expense }]}>
            -${Math.abs(parseFloat(summary.expense)).toFixed(2)}
          </Text>
        </View>
      </View>
      </View>
    </View>
  );
};

export default BalanceCard;
