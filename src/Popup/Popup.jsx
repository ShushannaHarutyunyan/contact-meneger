import "./Popup.css";

const Popup = ({ handleOk, handleCancel }) => {
  return (
    <div className='pop-up-container'>
      <div>Are you sure to delete contact?</div>
      <div className='pop-up-btns'>
        <button onClick={handleOk}>Ok</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default Popup;
