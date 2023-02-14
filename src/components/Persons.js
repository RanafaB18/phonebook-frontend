import React from "react";

const Persons = ({ data, handleDelete }) => {
  return (
    <>
      {data.map((person) => {
        return (
          <div key={person.name} className="list">
            <label >
              {person.name}
            </label>
            <label>{person.number}</label>
            <button onClick={() => handleDelete(person.id)}>Delete</button>
          </div>
        );
      })}
    </>
  );
};

export default Persons;
