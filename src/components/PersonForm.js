import React from "react";

const PersonForm = ({
  newName,
  newNumber,
  onAddPerson,
  onTextChange,
  onNumberChange,
}) => {
  return (
    <form onSubmit={onAddPerson}>
      <div className="form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            onChange={onTextChange}
            value={newName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Number:</label>
          <input
            id="name"
            name="name"
            onChange={onNumberChange}
            value={newNumber}
          />
        </div>
        <button type="submit" className="button">
          ADD
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
