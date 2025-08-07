// react custome hook for transaction management
import { Alert } from "react-native";
// This hook will handle fetching, deleting transactions and summary for a user
// It will also handle loading state and error handling
import { useCallback } from "react"
import { useState } from "react"
import { API_URL } from "../constants/api.js"; // Ensure this path is correct based on your project structure

// const API_URL="https://wallet-api-074i.onrender.com/api"


export const useTranscation = (userId) =>{
    const [transaction, setTransaction] = useState([])
    const [summary, setSummary] = useState({
        balance: 0,
        income: 0,
        expense: 0
    })
    const [isloading, setLoading] = useState(true)

    // useCallback is used to memoize the function so that it doesn't get recreated on every render
    const fetchTransaction= useCallback(async ()=>{
        try {
            const response = await fetch(`${API_URL}/transactions/${userId}`);
            const data = await response.json();
            setTransaction(data)
        } catch (error) {
            console.log("Error fetching transactions:", error);
        }
    }, [userId]);



    const fetchSummary= useCallback(async ()=>{
        try {
            const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
            const data = await response.json();
            setSummary(data)
        } catch (error) {
            console.log("Error fetching transactions:", error);
        }
    }, [userId]);

    const loadData= useCallback(async ()=>{
        if(!userId) return;

        setLoading(true);
        try {
            // can run both fetches in parallel
            // using Promise.all to wait for both to complete
            await Promise.all([fetchSummary(), fetchTransaction()])
        }catch(error){
            console.log("Error loading data", error);
        }finally{
            setLoading(false);
        }
    }, [fetchSummary, fetchTransaction, userId]);

    const deleteTransaction = async(id) => {
        try {
            const response = await fetch(`${API_URL}/transactions/${id}`, {method: 'DELETE'})
            if(!response.ok) throw new Error('Failed to delete transaction')

            // After deletion, refetch the transactions and summary
            loadData()
            Alert.alert("Success", "Transaction deleted successfully");
        } catch (error) {
            console.log("Error deleting transaction:", error);
            Alert.alert("Error",error.message)
            
        }
    }
    return{transaction, summary, isloading, loadData, deleteTransaction}
}