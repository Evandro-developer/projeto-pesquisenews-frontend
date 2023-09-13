import React from "react";

function ButtonSubmit({ className, isValid, onClick, children }) {
  return (
    <button
      type="submit"
      className={className}
      disabled={!isValid}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ButtonSubmit;
