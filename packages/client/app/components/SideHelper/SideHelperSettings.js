import React from 'react';
import JSONeditor from 'components/JSONeditor';
import TextField from 'components/TextField';

function renderTextField(setting, nodeModel, nodeModelOptions) {
  
  function setLockedModel(isLocked) {
    nodeModel.setLocked(isLocked)
  }

  return(
    <TextField
      id={`${nodeModelOptions.id}-${setting.name}`}
      label={setting.name}
      defaultValue={setting.value}
      onChange={(newValue) => setting.value = newValue}
      onFocus={() => setLockedModel(true)}
      onBlur={() => setLockedModel(false)}
      { ...setting.settingOptions }
    />
  )
}

function renderJSONeditor(setting, nodeModel, nodeModelOptions) {
  
  function setLockedModel(isLocked) {
    nodeModel.setLocked(isLocked)
  }

  const onChange = (newValue) => {
    setting.value = newValue;
  }

  return(
    <JSONeditor
      onFocus={() => setLockedModel(true)}
      onBlur={() => setLockedModel(false)}
      onChange={(newValue) => onChange(newValue)}
      initialValue={setting.value}
    />
  )
}

function SideHelperSettings(props) {
  const {settings, nodeModel, nodeModelOptions} = props;

  const renderedSettings = settings.map(setting => {
    switch(setting.settingType) {
      case 'String':
        return renderTextField(setting, nodeModel, nodeModelOptions);
      case 'JSON':
        return renderJSONeditor(setting, nodeModel, nodeModelOptions);
      default:
        return null;
    }
  })

  return ( <> { renderedSettings } </> );
}

export default SideHelperSettings;
