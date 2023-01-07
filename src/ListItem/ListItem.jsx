import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from './ItemType'
import "./ListItem.css";
import Popup from "../Popup/Popup";
import { Link } from "react-router-dom";
const style = {
  border: '1px groove gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}
const ListItem = ({
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
  moveItem,
  isSelected,
  index
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
const handleContactEye=()=>{};
const ref = useRef(null)
const [{ handlerId }, drop] = useDrop({
  accept: ItemTypes.CARD,
  collect(monitor) {
    return {
      handlerId: monitor.getHandlerId(),
    }
  },
  hover(item, monitor) {
    if (!ref.current) {
      return
    }
    const dragIndex = item.index
    const hoverIndex = index
    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return
    }
    // Determine rectangle on screen
    const hoverBoundingRect = ref.current?.getBoundingClientRect()
    // Get vertical middle
    const hoverMiddleY =
      (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    // Determine mouse position
    const clientOffset = monitor.getClientOffset()
    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top
    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }
    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }
    // Time to actually perform the action
    moveItem(dragIndex, hoverIndex)
    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    item.index = hoverIndex
  },
})
const [{ isDragging }, drag] = useDrag({
  type: ItemTypes.CARD,
  item: () => {
    return { id, index }
  },
  collect: (monitor) => ({
    isDragging: monitor.isDragging(),
  }),
})
const opacity = isDragging ? 0 : 1
drag(drop(ref))
  return (
    <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId} className={`list-item-container ${isSelected ? "selected" : ""}`}>
      <input
        type='checkbox'
        onChange={() => handleCheckboxSelect(id)}
        checked={isSelected}
      />
      <div>{avatar}</div>
      <div>
        {firstName} {lastName}
      </div>
      <div>{email}</div>
      <div>
        {phones.map((phone) => (
          <div key={phone}>{phone}</div>
        ))}
      </div>
      <div>{profession}</div>
      <Link to ={`/contact/${id}`}>
      <FontAwesomeIcon
        icon={faEye}
        onClick={() =>
          handleContactEye({
            id: id,
            avatar: avatar,
            firstName: firstName,
            lastName,
            email,
            phones,
            profession
          })
        }
      /></Link>
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
  );
};

export default ListItem;
