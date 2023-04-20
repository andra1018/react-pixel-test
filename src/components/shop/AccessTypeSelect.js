import React, { useState } from "react";
import Select, { components } from "react-select";
import IconCheck from "../../assets/images/icon-check.png";
import classNames from "classnames";

const AccessTypeSelect = () => {
  const colorPrimary = "#307fc1";
  const colorPrimary25 = "#307fc112";
  const accessTypes = ["All", "One-Time Access", "Pre-Approved"];
  const accessTypeList = accessTypes.map((e) => ({ label: e, value: e }));

  const [selectedAccess, setSelectedAccess] = useState(accessTypeList[0]);

  const handleAccessType = (selected) => {
    setSelectedAccess(selected);
  };

  const handleSelectMenuItem = (_props, e) => {
    _props.onChange(e);
    _props.onMenuClose();
  };

  const Menu = (props) => {
    return (
      <components.Menu {...props}>
        <div className="custom-select-menu">
          {props.selectProps.options.map((e, i) => (
            <div
              className={classNames("menu-item", {
                active: props.selectProps.value?.value === e.value,
              })}
              onClick={() => handleSelectMenuItem(props.selectProps, e)}
              key={i}
            >
              <label>{e.label}</label>
              {props.selectProps.value?.value === e.value && (
                <img src={IconCheck} alt="" />
              )}
            </div>
          ))}
        </div>
      </components.Menu>
    );
  };

  const style = {
    control: (base) => ({
      ...base,
      minHeight: "40px",
    }),
  };

  return (
    <section className="access-type-section">
      <div className="lbl-access">{"Access Type"}</div>
      <div className="access-select">
        <div className="lbl-note">{"SELECT ACCESS TYPE"}</div>
        <Select
          name="access"
          components={{ Menu }}
          value={selectedAccess}
          options={accessTypeList}
          onChange={handleAccessType}
          className="access-select-box-container"
          classNamePrefix="select-box"
          styles={style}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: colorPrimary,
              primary25: colorPrimary25,
            },
          })}
        />
      </div>
    </section>
  );
};

export default AccessTypeSelect;
