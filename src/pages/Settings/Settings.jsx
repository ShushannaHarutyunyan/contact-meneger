import { useState } from "react";
import { useSettings, useSettingsDispatch } from "../../context/context";
import { setSettings } from "../../context/actions/actions";
import SettingsItem from "../../shared/SettingsItem/SettingsItem";

import "./Settings.css";

const Settings = () => {
  const settings = useSettings();
  const dispatch = useSettingsDispatch();
  const [config, setConfig] = useState(settings);

  const heandleSetSettings = () => {
    //payload can be empty
  
    dispatch(setSettings(config));
  };

  const heandleResetSettings = () => {
  setConfig(settings)
  };

  const handleEditeRadioChange = (title) => {
   if (title==='Inline') { setConfig({...config, inlineEdit:true})} 
   else {
    { setConfig({...config, inlineEdit:false})}
   }
  };
  const handleAddRadioChange = (title) => {
    if (title==='Inline') { setConfig({...config, inlineAdd:true})} 
    else {
     { setConfig({...config, inlineAdd:false})}
    }
  };
  const handleViewRadioChange = (title) => {
    if (title==='List') { setConfig({...config, listView:true})} 
    else {
     { setConfig({...config, listView:false, inlineAdd:false, inlineEdit:false})}
    }
  };

  return (
    <div className='settings-container'>
      <h2>Edit</h2>
      <SettingsItem
        title='Inline'
        name='inlineEdit'
        handleRadioChange={handleEditeRadioChange}
        isChecked={config.inlineEdit}
      />
      <SettingsItem
        title='Modal'
        name='inlineEdit'
        handleRadioChange={handleEditeRadioChange}
        isChecked={!config.inlineEdit}
      />
      <h2>Add</h2>
      <SettingsItem
        title='Inline'
        name='inlineAdd'
        handleRadioChange={handleAddRadioChange}
        isChecked={config.inlineAdd}
      />
      <SettingsItem
        title='Modal'
        name='inlineAdd'
        handleRadioChange={handleAddRadioChange}
        isChecked={!config.inlineAdd}
      />
      <h2>View</h2>
      <SettingsItem
        title='List'
        name='view'
        handleRadioChange={handleViewRadioChange}
        isChecked={config.listView}
      />
      <SettingsItem
        title='Card'
        name='view'
        handleRadioChange={handleViewRadioChange}
        isChecked={!config.listView}
      />
      <div className='settings-btn-container'>
        <button onClick={heandleSetSettings}>Save</button>
        <button onClick={heandleResetSettings}>Reset</button>
      </div>
    </div>
  );
};

export default Settings;
