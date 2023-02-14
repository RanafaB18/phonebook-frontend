import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axiosUtil from "./services";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [message, setMessage] = useState(null);
  const [copy, setCopy] = useState(persons);

  React.useEffect(() => {
    axiosUtil.fetchData().then((response) => {
      setPersons(response);
    });
  }, []);

  React.useEffect(() => {
    setCopy(persons);
  }, [persons]);

  const handleTextChange = (event) => {
    setNewName(event.target.value);
  };
  const handleFilterProcess = (name) => {
    // Filters based on what the name starts with
    // setCopy(persons.filter((n) => n.name.toLowerCase().slice(0, name.length) === name.toLowerCase()));
    // setCopy(persons.filter((n) => n.name.toLowerCase().startsWith(name.toLowerCase())));

    // Filters if the string contains the typed characters
    setCopy(
      persons.filter((n) => n.name.toLowerCase().includes(name.toLowerCase()))
    );
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
    handleFilterProcess(event.target.value);
  };
  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    if (uniqueName(newName)) {
      axiosUtil.create(newPerson).then((addedPerson) => {
        setPersons([...persons, addedPerson]);
      });
      setMessage(`Added ${newPerson.name}`);
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    } else {
      const message = `${newName} is already added to phonebook, replace the old number with a new one`;
      if (window.confirm(message)) {
        const existentUser = persons.find(
          (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
        );
        const updatedPerson = { ...existentUser, number: newPerson.number };
        setMessage(`Updated ${existentUser.name}'s number`);
        setTimeout(() => {
          setMessage(null);
        }, 2000);

        axiosUtil
          .update(existentUser.id, updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) => {
                if (person.id === updatedPerson.id) {
                  return updatedPerson;
                }
                return person;
              })
            );
          })
          .catch((error) => {
            console.log("Already deleted");
            setMessage(
              `Information of ${existentUser.name} has already been removed from server`
            );
            setTimeout(() => {
              setMessage(null);
            }, 3000);
            setPersons(
              persons.filter((person) => person.id !== existentUser.id)
            );
          });
      }
    }
    setNewName("");
    setNewNumber("");
  };
  const uniqueName = (name) => {
    const found = persons.find(
      (n) => n.name.toLowerCase() === name.toLowerCase()
    );
    return found === undefined;
  };

  const handleDelete = (id) => {
    const deletedPersonName = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${deletedPersonName.name} ?`)) {
      setPersons(persons.filter((person) => person.id !== id));
      axiosUtil.deletePerson(id).catch(
        (error) => {
          console.log("Delete failed")
          setMessage(
            `Information of ${deletedPersonName.name} has already been removed from server`
          );
          setTimeout(() => {
            setMessage(null);
          }, 3000);
          setPersons(
            persons.filter((person) => person.id !== deletedPersonName.id)
          );
        });
    }
  };
  return (
    <div className="app">
      <Notification message={message} />
      <h2>Phonebook</h2>
      <Filter filterName={filterName} onFilterChange={handleFilterChange} />
      <hr />
      <h2>Add a new</h2>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onAddPerson={addPerson}
        onTextChange={handleTextChange}
        onNumberChange={handleNumberChange}
      />
      <hr />
      <h2>Numbers</h2>

      <Persons data={copy} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
