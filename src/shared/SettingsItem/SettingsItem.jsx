const SettingsItem = ({ title, name, handleRadioChange, isChecked }) => {
  return (
    <div>
      <label>{title}</label>
      <input
        type='radio'
        name={name}
        onChange={() => handleRadioChange(title)}
        checked={isChecked}
      />
    </div>
  );
};

export default SettingsItem;
