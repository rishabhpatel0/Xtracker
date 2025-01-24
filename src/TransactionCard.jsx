import React, { useState } from "react";
import { TiDelete } from "react-icons/ti";
import { TbEditCircle } from "react-icons/tb";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

const TransactionCard = ({ data, setData,onDelete, onEdit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Only 4 items per page

  // Calculate the data to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle delete transaction
  const handleDelete = (index) => {
    const updatedData = [...data];
    const globalIndex = indexOfFirstItem + index; // Adjust for the current page
    updatedData.splice(globalIndex, 1); // Remove the item at the correct index
    setData(updatedData); // Update state
    localStorage.setItem("expensesData", JSON.stringify(updatedData)); // Update localStorage
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        color: "#24292E",
        padding: "4px",
        borderRadius: "4px",
      }}
    >
      {currentData && currentData.length > 0 ? (
        currentData.map((transaction, index) => (
          <div
            key={index}
            style={{
              marginBottom: "10px",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Display transaction name */}
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: "bold", fontSize: "10px" }}>
                {transaction.name}
              </p>
              <p style={{ margin: 0, fontSize: "10px", color: "#6c757d" }}>
                {transaction.date}
              </p>
            </div>

            {/* Display transaction amount */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ margin: 0, fontWeight: "bold", fontSize: "12px" }}>
                &#8377; {transaction.amount}
              </p>
              {/* Edit icon */}
                            
              <button
                onClick={() => {
                  const globalIndex = indexOfFirstItem + index; // Calculate the global index
                  onEdit(globalIndex, data[globalIndex]); // Pass the index and transaction to onEdit
                }}
                style={{
                  backgroundColor: "white",
                  color: "#6c757d",
                  padding: "6px 10px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginRight: "8px",
                }}
              >
                <TbEditCircle size={20} />
              </button>


              {/* Delete icon */}
              <button
                onClick={() => handleDelete(index)}
                style={{
                  backgroundColor: "white",
                  color: "#6c757d",
                  padding: "6px 10px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                <TiDelete size={20} />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p style={{ margin: "0" }}>No transactions!</p>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
              border: "1px solid gray",
              color: "rgb(108, 117, 125)",
              height: "30px",
              width: "40px",
              backgroundColor: "transparent",
              borderRadius: "6px",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}
          >
            <MdKeyboardArrowLeft size={18} />
          </button>

          {/* Current Page Display */}
          <button
            style={{
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
              fontSize: "12px",
              margin: "0 5px",
              height: "30px",
              width: "40px",
              backgroundColor: "#ACE1AF",
              color: "black",
              border: "1px solid rgba(27, 31, 35, 0.15)",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            disabled
          >
            {currentPage}
          </button>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
              border: "1px solid gray",
              height: "30px",
              color: "rgb(108, 117, 125)",
              width: "40px",
              backgroundColor: "transparent",
              borderRadius: "6px",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
          >
            <MdKeyboardArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionCard;
