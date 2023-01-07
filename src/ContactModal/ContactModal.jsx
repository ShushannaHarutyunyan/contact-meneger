import Modal from "react-modal";

import { modalCustomStyles } from "../config";

const ContactModal = ({
  modal,
  currentContact,
  handleContactChange,
  handleModalContactSave,
  handleModalClose
}) => {
  return (
    <Modal
      isOpen={modal.isOpen}
      style={modalCustomStyles}
      contentLabel='Contact Modal'
    >
      <div>
        <div className='modal-title'>
          {modal.mode === "edit" ? "Edit Contact" : "Add new Contact"}
        </div>
        <div className='contact-item'>
          <div>First name</div>
          <input
            name='firstName'
            value={currentContact.firstName?? ''}
            onChange={handleContactChange}
          />
        </div>
        <div className='contact-item'>
          <div>Last name</div>
          <input
            name='lastName'
            value={currentContact.lastName??''}
            onChange={handleContactChange}
          />
        </div>
        <div className='contact-item'>
          <div>Email</div>
          <input
            name='email'
            value={currentContact.email??''}
            onChange={handleContactChange}
          />
        </div>
        <div className='contact-item'>
          <div>Phone</div>
          <div className='phones'>
            {currentContact.phones?.map((phone, index) => (
              <input
                key={index}
                name='phones'
                value={phone??''}
                onChange={(event) => handleContactChange(event, index)}
              />
            ))}
          </div>
        </div>
        <div className='contact-item'>
          <div>Profession</div>
          <input
            name='profession'
            value={currentContact.profession ??''}
            onChange={handleContactChange}
          />
        </div>
        <div className='modal-btns-container'>
          <button onClick={handleModalContactSave}>Save</button>
          <button onClick={handleModalClose}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default ContactModal;
