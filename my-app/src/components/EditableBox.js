import React, { useState } from "react";

const Editable = ({ text, type, children, ...props }) => {
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
        <div
          id="editable-box"
          className="editable-box"
          onClick={() => setEditing(true)}
        >
          <span>{text}</span>
        </div>
      )}
    </section>
  );
};

export default Editable;
