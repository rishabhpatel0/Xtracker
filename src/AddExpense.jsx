import React, { useState } from 'react';

export default function AddExpense({ setExpensePopUp, setData, balance, setBalance }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleAddExpense = () => {
    if (parseFloat(amount) > parseFloat(balance)) {
      alert('Please add more Income to continue');
      setExpensePopUp(false);
    } else if (name && amount && category && date) {
      const newExpense = { name, amount: parseFloat(amount), category, date };
      setData((prev) => {
        const updatedData = [...prev, newExpense];
        localStorage.setItem('expenses', JSON.stringify(updatedData));
        return updatedData;
      });
      setExpensePopUp(false);
      setBalance((prev) => prev - parseFloat(amount));
    } else {
      alert('Please fill all fields.');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
        textAlign: 'center',
        color: '#212529',
        width: '80%', // Adjust for mobile screens
        maxWidth: '400px', // Restrict maximum width for larger screens
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h3 style={{ marginBottom: '20px', color: '#495057' }}>Add Expenses</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddExpense();
        }}
      >
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            marginBottom: '15px',
            padding: '10px',
            width: '90%',
            borderRadius: '6px',
            border: '1px solid #ced4da',
            fontSize: '14px',
          }}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            marginBottom: '15px',
            padding: '10px',
            width: '90%',
            borderRadius: '6px',
            border: '1px solid #ced4da',
            fontSize: '14px',
          }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          style={{
            marginBottom: '15px',
            padding: '10px',
            width: '95%',
            borderRadius: '6px',
            border: '1px solid #ced4da',
            fontSize: '14px',
          }}
        >
          <option value="" disabled>
            Set Category
          </option>
          <option value="Food">Food</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Travel">Travel</option>
        </select>
        <input
          type="date"
          value={date}
          name="date"
          onChange={(e) => setDate(e.target.value)}
          style={{
            marginBottom: '15px',
            padding: '10px',
            width: '90%',
            borderRadius: '6px',
            border: '1px solid #ced4da',
            fontSize: '14px',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button
            type="submit"
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '10px 20px',
              fontSize: '14px',
              cursor: 'pointer',
              width: '48%', // Adjust for smaller screens
            }}
          >
            Add Expense
          </button>
          <button
            type="button"
            onClick={() => setExpensePopUp(false)}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '10px 20px',
              fontSize: '14px',
              cursor: 'pointer',
              width: '48%', // Adjust for smaller screens
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
