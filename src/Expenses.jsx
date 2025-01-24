import { useState } from "react";

const Expenses = ({ setExpensePopUp, category,income ,spend}) => {
  // const [spend, setSpend] = useState(500); // Default spend value

  return (
    <div
      style={{
        backgroundColor: "#36454F",
        color: "white",
        padding: "10px",
        borderRadius: "8px",
        width: "200px",
        height: "80px",
        textAlign: "center",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        margin: "10px auto",
      }}
    >
      <div>
        {category}: &#8377; {spend}
      </div>
      <button
        onClick={() => setExpensePopUp(true)}
        style={{
          marginTop: "10px",
          backgroundColor: "#ADD8E6",
          border: "none",
          borderRadius: "4px",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        + Add {income}
      </button>
    </div>
  );
};

export default Expenses;
