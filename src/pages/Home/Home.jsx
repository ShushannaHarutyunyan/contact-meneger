import { useState, useEffect, useCallback} from "react";
import { v4 as uuidv4 } from "uuid";
import Modal from "react-modal";
import axios from "axios";
import update from 'immutability-helper'

import { BASE_URL } from "../../const";
import ListItem from "../../ListItem/ListItem";
import ListHeader from "../../ListHeader/ListHeader";

import { inlineAdd, listView } from "../../config";
import ChangeContact from "../../ChangeContact/ChangeContact";
import Loader from "../../Loader/Loader";
import ContactModal from "../../ContactModal/ContactModal";
import Card from "../../Card/Card";
import { options } from "../../config";
import { useSettings } from "../../context/context";

Modal.setAppElement("#root");

const Home = () => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState({ isOpen: false, mode: "" });
  const [currentContact, setCurrentContact] = useState({});
  const [selectedContacts, setSelectedContacts] = useState({});
  const [allSelected, setAllSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const settings = useSettings();
  const { inlineEdit } = settings; //const { inlineEdit } = useSettings()

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}contacts`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  const deleteContact = async (contactId) => {
    try {
      await axios.delete(`${BASE_URL}contacts/${contactId}`);
      const updatedData = data.filter((contact) => contact.id !== contactId);
      setData(updatedData);
    } catch (err) {}
  };

  const editContact = (editingContact) => {
    setCurrentContact(editingContact);
    if (!inlineEdit) {
      setModal({ isOpen: true, mode: "edit" });
    }
  };

  const handleContactChange = (event, index) => {
    // Object.assign({}, currentContact)
    const updatedContact = JSON.parse(JSON.stringify(currentContact));
    if (event.target.name === "phones") {
      updatedContact.phones[index] = event.target.value;
    } else {
      updatedContact[event.target.name] = event.target.value;
    }
    setCurrentContact(updatedContact);
  };

  const handleModalClose = () => {
    setModal({ isOpen: false, mode: "" });
    setCurrentContact({});
  };

  const handleModalContactSave = async () => {
    const updatedData = JSON.parse(JSON.stringify(data));
    if (modal.mode === "edit") {
      const contactIndex = updatedData.findIndex(
        (contact) => contact.id === currentContact.id
      );
      const res = await axios.put(
        `${BASE_URL}contacts/${currentContact.id}`,
        currentContact
      );
      updatedData[contactIndex] = res.data;
    } else {
      const updateContact = { ...currentContact };
      delete updateContact.id;
      try {
        const res = await axios.post(`${BASE_URL}contacts`, updateContact);
        updatedData.push(res.data);
      } catch (err) {
        //error handling
      }
    }
    setData(updatedData);
    handleModalClose();
  };

  const handleInlineContactSave = () => {
    const updatedData = JSON.parse(JSON.stringify(data));
    const contactIndex = updatedData.findIndex(
      (contact) => contact.id === currentContact.id
    );
    const updateContact = { ...currentContact };
    delete updateContact.id;

    axios
      .post(`${BASE_URL}contacts`, updateContact)
      .then((res) => {
        updatedData[contactIndex] = res.data;
        setData(updatedData);
        handleModalClose();
      })
      .catch((err) => console.log("error"));
  };

  const handleContactAdd = () => {
    const newContact = {
      id: uuidv4(),
      firstName: "",
      lastName: "",
      email: "",
      phones: ["", ""],
      profession: ""
    };
    if (inlineAdd) {
      const updatedData = JSON.parse(JSON.stringify(data));
      updatedData.unshift(newContact);
      setData(updatedData);
      setModal({ isOpen: false, mode: "add" });
    }
    //modal mode
    else {
      setModal({ isOpen: true, mode: "add" });
    }
    setCurrentContact(newContact);
  };

  const handleContactCancel = () => {
    handleModalClose();
    if (inlineAdd && modal.mode === "add") {
      const updatedData = JSON.parse(JSON.stringify(data));
      updatedData.splice(0, 1);
      setData(updatedData);
    }
  };

  const handleCheckboxSelect = (itemId) => {
    const updatedSelectedContacts = { ...selectedContacts };
    if (itemId in updatedSelectedContacts) {
      delete updatedSelectedContacts[itemId];
    } else {
      updatedSelectedContacts[itemId] = itemId;
    }
    if (Object.keys(updatedSelectedContacts).length === data.length) {
      setAllSelected(true);
    } else {
      setAllSelected(false);
    }
    setSelectedContacts(updatedSelectedContacts);
  };

  const handleAllSelect = (event) => {
    let updatedSelectedContacts = { ...selectedContacts };
    if (event.target.checked) {
      for (let contact of data) {
        updatedSelectedContacts[contact.id] = contact.id;
      }
    } else {
      updatedSelectedContacts = {};
    }
    setSelectedContacts(updatedSelectedContacts);
    setAllSelected(event.target.checked);
  };

  const handleSelectedDelete = () => {
    const updatedData = data.filter((contact) => {
      return !selectedContacts[contact.id];
    });
    setData(updatedData);
    setSelectedContacts({});
    if (updatedData.length === 0) {
      setAllSelected(false);
    }
  };

  const handleOptionChange = (event) => {
    console.log(event.target.value);
  };
  const moveItem = useCallback((dragIndex, hoverIndex) => {
    setData((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      }),
    )
  }, [])

  return (
    <>
      <div>
        <div className='app-btns-container'>
          <button onClick={handleSelectedDelete}>Delete Selected</button>
          <button onClick={handleContactAdd}>Add</button>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className='list-container'>
            <select onChange={handleOptionChange}>
              {options.map((item) => (
                <option key={item.label}>{item.label}</option>
              ))}
            </select>
            <ListHeader
              handleAllSelect={handleAllSelect}
              allSelected={allSelected}
            />
            {data.map((item, index) => {
              return (inlineEdit || inlineAdd) &&
                !modal.isOpen &&
                currentContact.id === item.id ? (
                <ChangeContact
                  key={item.id}
                  contact={currentContact}
                  handleContactChange={handleContactChange}
                  handleContactCancel={handleContactCancel}
                  handleContactSave={handleInlineContactSave}
                />
              ) : listView ? (
                <ListItem
      key={item.id}
      id={item.id}
      index={index}
      avatar={item.avatar}
      firstName={item.firstName}
      lastName={item.lastName}
      email={item.email}
      phones={item.phones}
      profession={item.profession}
      deleteContact={deleteContact}
      handleContactEdit={editContact}
      handleCheckboxSelect={handleCheckboxSelect}
      isSelected={selectedContacts[item.id] ? true : false}
      moveItem={moveItem}
      />
              ) : (
                <Card
                  key={item.id}
                  id={item.id}
                  avatar={item.avatar}
                  firstName={item.firstName}
                  lastName={item.lastName}
                  email={item.email}
                  phones={item.phones}
                  profession={item.profession}
                  deleteContact={deleteContact}
                  handleContactEdit={editContact}
                  handleCheckboxSelect={handleCheckboxSelect}
                  isSelected={selectedContacts[item.id] ? true : false}
                />
              );
            })}
          </div>
        )}
      </div>
      <ContactModal
        modal={modal}
        currentContact={currentContact}
        handleContactChange={handleContactChange}
        handleModalContactSave={handleModalContactSave}
        handleModalClose={handleModalClose}
      />
    </>
  );
};

export default Home;
