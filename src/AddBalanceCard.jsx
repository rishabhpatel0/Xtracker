import { useState } from 'react';
import { useSnackbar } from 'notistack';
// import './balance.css'

const AddBalanceCard = ({ setIsOpen, setBalance }) => {
  const [income, setIncome] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate income
    if (Number(income) <= 0) {
      enqueueSnackbar("Income should be greater than 0", { variant: "warning" });
      return;
    }

    // Add income to the balance
    setBalance((prev) => prev + Number(income));
    enqueueSnackbar("Income added successfully!", { variant: "success" });

    // Reset the form and close the modal
    setIncome('');
    setIsOpen(false);
  };

  return (
    
    <div className="formWrapper">
      <h3>Add Balance</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={income}
          placeholder="Income Amount"
          onChange={(e) => setIncome(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "5px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <div style={{ display: "flex", gap: "10px",justifyContent:'center' }}>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add Balance
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};


export default AddBalanceCard;
