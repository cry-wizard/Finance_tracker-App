import { sql } from "../config/db.js";

export async function getTransactionsByUserId(req,res) {
  try {
    const { userId } = req.params;
    const transactions =
      await sql`SELECT * FROM transactions WHERE user_id = ${userId}`;
    res.status(200).json(transactions);
  } catch (error) {
    console.log("Error in /api/transactions:userId", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createTransaction(req,res) {
  // title, amount, category, user_id
  try {
    const { title, amount, category, user_id } = req.body;
    if (!title || amount === null || !category || !user_id) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const transactions =
      await sql`INSERT INTO transactions (title,amount,category,user_id)
           VALUES (${title},${amount},${category},${user_id})
           RETURNING *
           `;
    console.log("Transaction created:", transactions);
    res.status(201).json(transactions[0]);
  } catch (error) {
    console.log("Error in /api/transactions:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function deleteTransaction(req, res) {
      try {
        const { id } = req.params;
        if (isNaN(parseInt(id))) {
          return res.status(400).json({ message: "Invalid transaction ID" });
        }
    
        const deletedTransaction =
          await sql`DELETE FROM transactions WHERE id = ${id} RETURNING *`;
    
        if (deletedTransaction.length == 0) {
          return res.status(404).json({ message: "Transaction not found" });
        }
    
        res.status(200).json({ message: "Transaction deleted successfully" });
      } catch (error) {
        console.log("Error in /api/transactions:userId", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
}
export async function getTransactionSummary(req, res) {
  const { userId } = req.params;
  try {
    const balanceResult =
      await sql`SELECT COALESCE(SUM(amount),0) AS balance FROM transactions WHERE user_id = ${userId}`;

    const incomeResult=
      await sql`SELECT COALESCE(SUM(amount),0) AS income FROM transactions WHERE user_id = ${userId} AND amount > 0`;

    const expenseResult =
      await sql`SELECT COALESCE(SUM(amount),0) AS expense FROM transactions WHERE user_id = ${userId} AND amount < 0`;

      res.status(200).json({
        balance: balanceResult[0].balance,
        income: incomeResult[0].income,
        expense: expenseResult[0].expense,
      });
  } catch (error) {
    console.log("Error in /api/transactions/summary/:userId", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}