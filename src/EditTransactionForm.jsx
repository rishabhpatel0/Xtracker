import React, { useState } from 'react';

const EditTransactionForm = ({ transaction, onSave, onCancel }) => {
  const [name, setName] = useState(transaction.name);
  const [amount, setAmount] = useState(transaction.amount);
  const [date, setDate] = useState(transaction.date || '');
  const [category, setCategory] = useState(transaction.category || 'Food'); // Default to 'Food' if no category

  const handleSave = () => {
    if (name.trim() === '' || amount <= 0 || date.trim() === '' || category.trim() === '') {
      alert('Please enter valid transaction details.');
      return;
    }
    // Include the category in the saved transaction
    onSave({ ...transaction, name, amount, date, category });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: 'white',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h3 style={{ textAlign: 'center', margin: 0, color: '#24292E' }}>Edit Transaction</h3>

      <input
        type="text"
        placeholder="Transaction Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          padding: '10px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />

      <input
        type="number"
        placeholder="Transaction Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        style={{
          padding: '10px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{
          padding: '10px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{
          padding: '10px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: 'black',
          color: 'white',
        }}
      >
        <option value="Food">Food</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Traveling">Traveling</option>
      </select>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={handleSave}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Save
        </button>

        <button
          onClick={onCancel}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditTransactionForm;
