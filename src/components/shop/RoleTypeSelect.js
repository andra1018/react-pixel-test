import React, { useState } from "react";
import Select, { components } from "react-select";
import IconDropDown from "../../assets/svgs/nd-icons-dropdown-active.svg";
import { ReactComponent as IconShared } from "../../assets/svgs/role-icons/a-icons-micro-16-shared-folders.svg";
import { ReactComponent as IconApplication } from "../../assets/svgs/role-icons/a-icons-micro-16-application-roles.svg";
import { ReactComponent as IconAzureLicenses } from "../../assets/svgs/role-icons/a-icons-micro-16-azure-licenses.svg";
import { ReactComponent as IconAdmin } from "../../assets/svgs/role-icons/a-icons-micro-16-azure-ad-admin.svg";
import { ReactComponent as IconRBAC } from "../../assets/svgs/role-icons/a-icons-micro-16-azure-rbac-roles.svg";
import { ReactComponent as IconManagement } from "../../assets/svgs/role-icons/a-icons-micro-16-management-roles.svg";
import { ReactComponent as IconMailBoxes } from "../../assets/svgs/role-icons/a-icons-micro-16-mailboxes.svg";
import { ReactComponent as IconComputers } from "../../assets/svgs/role-icons/a-icons-micro-16-computers.svg";
import { ReactComponent as IconBusiness } from "../../assets/svgs/role-icons/a-icons-micro-16-business-roles.svg";
import classNames from "classnames";
import _ from "lodash";

const RoleTypeSelect = () => {
  const colorPrimary = "#307fc1";
  const colorPrimary25 = "#307fc112";
  const roleTypes = [
    "Business Roles",
    "Application Roles",
    "Azure Licenses",
    "Azure Admin Roles",
    "Azure RBAC Roles",
    "Management Roles",
    "Mailboxes",
    "Computers",
    "Shared Folders",
  ];
  const roleIcons = [
    IconBusiness,
    IconApplication,
    IconAzureLicenses,
    IconAdmin,
    IconRBAC,
    IconManagement,
    IconMailBoxes,
    IconComputers,
    IconShared,
  ];
  const roleTypeList = roleTypes.map((e, i) => ({
    label: e,
    value: e,
    icon: roleIcons[i],
    index: i,
  }));
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedRoleIndexList, setSelectRoleIndexList] = useState([]);

  const handleRoleType = (selected) => {
    let tmpIndexList = [...selectedRoleIndexList];

    if (_.includes(tmpIndexList, selected.index)) {
      _.remove(tmpIndexList, (e) => e === selected.index);
    } else {
      tmpIndexList = [...tmpIndexList, selected.index];
    }

    if (tmpIndexList.length === 0) {
      setSelectedRole(null);
    } else {
      setSelectedRole(roleTypeList[tmpIndexList[tmpIndexList.length - 1]]);
    }
    setSelectRoleIndexList(tmpIndexList);
  };

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <img src={IconDropDown} alt="" />
      </components.DropdownIndicator>
    );
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
                active: _.includes(selectedRoleIndexList, e.index),
              })}
              onClick={() => handleSelectMenuItem(props.selectProps, e)}
              key={i}
            >
              <e.icon />
              <label>{e.label}</label>
            </div>
          ))}
        </div>
      </components.Menu>
    );
  };

  const ValueContainer = ({ children, ...props }) => (
    <components.ValueContainer {...props}>
      <div className="custom-value-container">
        <div
          className={classNames("lbl-value", {
            disable: !props.selectProps.menuIsOpen,
          })}
        >
          {children}
        </div>
        {selectedRoleIndexList.length !== 0 ? (
          <div className="lbl-role-count">{selectedRoleIndexList.length}</div>
        ) : null}
      </div>
    </components.ValueContainer>
  );

  const style = {
    control: (base) => ({
      ...base,
      border: 0,
      borderBottom: "4px solid var(--color-primary)",
      borderRadius: "0",
      boxShadow: "none",
      minHeight: "80px",
    }),
  };
  return (
    <Select
      name="role"
      components={{ DropdownIndicator, Menu, ValueContainer }}
      className="role-select-box-container"
      classNamePrefix="select-box"
      options={roleTypeList}
      onChange={handleRoleType}
      value={selectedRole}
      placeholder="Select the roles"
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
  );
};

export default RoleTypeSelect;
