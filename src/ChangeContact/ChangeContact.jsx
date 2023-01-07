import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";

import "./ChangeContact.css";

const ChangeContact = ({
  contact,
  handleContactChange,
  handleContactSave,
  handleContactCancel
}) => {
  return (
    <div className='change-contact-container'>
      <input type='checkbox' disabled={true} />
      <input
        name='firstName'
        value={contact.firstName}
        onChange={handleContactChange}
      />
      <input
        name='lastName'
        value={contact.lastName}
        onChange={handleContactChange}
      />
      <input
        name='email'
        value={contact.email}
        onChange={handleContactChange}
      />
      <div className='change-contact-phones'>
        {contact.phones.map((phone, index) => (
          <div key={index}>
            <input
              name='phones'
              value={phone}
              onChange={(event) => handleContactChange(event, index)}
            />
          </div>
        ))}
      </div>
      <input
        name='profession'
        value={contact.profession}
        onChange={handleContactChange}
      />
      <FontAwesomeIcon icon={faCheck} onClick={handleContactSave} />
      <FontAwesomeIcon icon={faX} onClick={handleContactCancel} />
    </div>
  );
};

export default ChangeContact;
