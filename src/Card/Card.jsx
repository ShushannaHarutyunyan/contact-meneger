import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import Popup from "../Popup/Popup";

import "./Card.css";

const Card = ({
  id,
  avatar,
  firstName,
  lastName,
  email,
  phones,
  profession,
  deleteContact,
  handleContactEdit,
  handleCheckboxSelect,
  isSelected
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const handleItemDelete = () => {
    setShowPopup(true);
  };

  const cancelDelete = () => {
    setShowPopup(false);
  };

  const confirmDelete = (id) => {
    setShowPopup(false);
    deleteContact(id);
  };
  return (
    <div className='card-container'>
      <input
        type='checkbox'
        onChange={() => handleCheckboxSelect(id)}
        checked={isSelected}
      />
      <div className='card-first-column'>
        <div>{firstName}</div>
        <div>{lastName}</div>
        <div>{email}</div>
      </div>
      <div className='card-second-column'>
        <div>
          {phones.map((phone) => (
            <div key={phone}>{phone}</div>
          ))}
        </div>
        <div>{profession}</div>
        <div className='card-actions'>
          <FontAwesomeIcon
            icon={faEdit}
            onClick={() =>
              handleContactEdit({
                id: id,
                avatar: avatar,
                firstName: firstName,
                lastName,
                email,
                phones,
                profession
              })
            }
          />
          <div style={{ position: "relative" }}>
            <FontAwesomeIcon icon={faTrash} onClick={handleItemDelete} />
            {showPopup ? (
              <Popup
                handleOk={() => confirmDelete(id)}
                handleCancel={cancelDelete}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
