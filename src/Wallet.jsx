import './Buttons.css';

const Wallet = ({ balance, setIsOpen }) => {
  return (
    <div
      style={{
        backgroundColor: "#36454F",
        padding: "10px",
        borderRadius: "8px",
        width: "200px",
        textAlign: "center",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div>Wallet Balance: &#8377; {balance}</div>
      <button onClick={() => setIsOpen(true)} className="button-4">
        Add Income
      </button>
    </div>  
  );
};

export default Wallet;
