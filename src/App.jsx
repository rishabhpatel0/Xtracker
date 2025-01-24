import { useState, useEffect } from "react";
import Wallet from "./Wallet.jsx";
import Expense from "./Expenses.jsx";
import PieChartComponent from "./Charts.jsx";
import TransactionCard from "./TransactionCard.jsx";
import TopExpensesCard from "./TopExpensesCard.jsx";
import AddBalanceCard from "./AddBalanceCard.jsx";
import AddExpense from "./AddExpense";
import EditTransactionForm from "./EditTransactionForm";
import "./Buttons.css";
import "./App.css";
import "./mobileView.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [balance, setBalance] = useState(5000); // Default wallet balance
  const [data, setData] = useState([]);
  const [expensePopUp, setExpensePopUp] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0); // Start with default value 0
  const [editingTransaction, setEditingTransaction] = useState(null); // Track the transaction being edited

  useEffect(() => {
    const storedData = localStorage.getItem("expensesData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setData(parsedData);

      const total = parsedData.reduce((sum, expense) => sum + expense.amount, 0);
      setTotalAmount(total);

      const storedBalance = localStorage.getItem("walletBalance");
      if (storedBalance) {
        setBalance(Number(storedBalance));
      } else {
        const initialBalance = 5000 - total;
        setBalance(initialBalance);
        localStorage.setItem("walletBalance", String(initialBalance));
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expensesData", JSON.stringify(data));
    const total = data.reduce((sum, expense) => sum + expense.amount, 0);
    setTotalAmount(total);
    localStorage.setItem("walletBalance", String(balance));
  }, [data, balance]);

  const handleDeleteTransaction = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  const handleEditTransaction = (index) => {
    setEditingTransaction({ index, transaction: data[index] });
  };

  const handleUpdateTransaction = (index, updatedTransaction) => {
    const updatedData = [...data];
    updatedData[index] = updatedTransaction;
    setData(updatedData);
    setEditingTransaction(null);
  };

  return (
    <div>
      <h3 style={{ textAlign: "center", margin: "0", fontSize: "1.8em", color: "white" }}>
        Expense Tracker
      </h3>
      <div
        className="expense-wrapper"
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          backgroundColor: "#848884",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          gap: "10%",
        }}
      >
        <div className="expense-card" style={{ flex: 1 }}>
          <Expense setExpensePopUp={setIsOpen} category={"Wallet Balance"} income={"Income"} spend={balance} />
        </div>
        <div className="expense-card" style={{ flex: 1 }}>
          <Expense setExpensePopUp={setExpensePopUp} category={"Expense"} income={"Expense"} spend={totalAmount} />
        </div>

        <div className="chart-card" style={{ flex: 1 }}>
          <PieChartComponent data={data} />
        </div>
      </div>

      <div className="expense-container">
        <div className="recent-transactions top-expense">
          <h4>Recent Transactions</h4>
          <TransactionCard
            data={data}
            setData={setData}
            onDelete={handleDeleteTransaction}
            onEdit={handleEditTransaction}
          />
        </div>

        <div className="bar-chart top-expense">
          <h4>Top Expense</h4>
          <TopExpensesCard transactions={data} />
        </div>
      </div>

      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            borderRadius: "20px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              color: "black",
              textAlign: "center",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              width: "300px",
            }}
          >
            <AddBalanceCard setIsOpen={setIsOpen} setData={setData} balance={balance} setBalance={setBalance} />
          </div>
        </div>
      )}

      {expensePopUp && (
        <div>
          <AddExpense setExpensePopUp={setExpensePopUp} setData={setData} balance={balance} setBalance={setBalance} />
        </div>
      )}

      {editingTransaction && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              color: "black",
            }}
          >
            <EditTransactionForm
              transaction={editingTransaction.transaction}
              onCancel={() => setEditingTransaction(null)}
              onSave={(updatedTransaction) =>
                handleUpdateTransaction(editingTransaction.index, updatedTransaction)
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
  