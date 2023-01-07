import { list } from "../const";
import "./ListHeader.css";

const ListHeader = ({ handleAllSelect, allSelected }) => {
  return (
    <div className='list-header-container'>
      <input type='checkbox' onChange={handleAllSelect} checked={allSelected} />
      <div>Name</div>
      <div>EMAIL</div>
      <div>PHONE</div>
      <div>PROFESSION</div>
    </div>
  );
};

export default ListHeader;
