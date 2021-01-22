import React, { useState } from "react";
const Editable = ({ text, type, placeholder, children, ...props }) => {
  const [isEditing, setEditing] = useState(false);

  const handleKeyDown = (event, type) => {
    const { key } = event;
    const keys = ["Escape", "Tab"];
    const enterKey = "Enter";
    const allKeys = [...keys, enterKey];
  };

  return (
    <section {...props}>
      {isEditing ? (
        <div
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => handleKeyDown(e, type)}
        >
          {children}
        </div>
      ) : (
        <div onClick={() => setEditing(true)}>
          <span>{text || placeholder}</span>
        </div>
      )}
    </section>
  );
};

export default Editable;
