import React from "react";

function SubmitButton({ children }) {
  return (
    <>
      <input
        type="submit"
        id="submit"
        value={children}
        className="btn btn-primary border-0"
        style={{
          backgroundColor: "#EF5373",
          padding: "8px 28px",
        }}
      />
    </>
  );
}

export default SubmitButton;
