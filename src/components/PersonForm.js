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
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="number">Number:</label>
          <input
            id="number"
            name="number"
            onChange={onNumberChange}
            value={newNumber}
            autoComplete="off"
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
