import React from "react";

const Filter = ({ filterName, onFilterChange }) => {

    return (
      <div className="filter">
        <label>Filter shown with </label>
        <input onChange={onFilterChange} value={filterName} />
      </div>
  );
};

export default Filter;
