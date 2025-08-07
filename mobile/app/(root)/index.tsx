import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { Alert, FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { SignOutButton } from "@/components/SignOutButton";
import { useTranscation } from "../../hooks/useTransaction";
import { useEffect, useState } from "react";
import PageLoader from "@/components/PageLoader";
import { COLORS } from "../../constants/colors.js";
import { styles } from "../../assets/styles/home.styles.js";
import { Ionicons } from "@expo/vector-icons";
import BalanceCard from "@/components/BalanceCard";
import TransactionItem from "@/components/TransactionItem";
import NoTransaction from "@/components/NoTransaction";

export default function Page() {
  const { user } = useUser();
  const [refreshing, setRefreshing] = useState(false)
  const { transaction, summary, isloading, loadData, deleteTransaction } =
    useTranscation(user?.id);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDeleteTransaction = (id)=>{
    Alert.alert('Are you sure?', 'Do you want to delete this transaction?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',style: 'destructive',
        // This will call the deleteTransaction function with the id of the transaction to be deleted
        onPress: () => deleteTransaction(id),
      },
    ]);
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }

  if (isloading && !refreshing) return <PageLoader />;

  // console.log("UserId:", user?.id);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* {Header} */}
        <View style={styles.header}>
          {/* {Left} */}
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/images/logo.png")}
              resizeMode="contain"
              style={styles.headerLogo}
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
              </Text>
            </View>
          </View>
          {/* {Right} */}
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/create")}
            >
              <Ionicons name="add-circle" size={24} color="white" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <SignOutButton />
          </View>
        </View>
        <BalanceCard summary={summary} />
        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>
      </View>
      <FlatList
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        data={transaction}
        renderItem={({item})=>(
          <TransactionItem item={item} 
          onDelete={handleDeleteTransaction}
           />

        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={<NoTransaction />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
