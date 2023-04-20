import React from "react";
import { ReactComponent as IconClose } from "../../assets/svgs/a-icons-16-close.svg";

const DrawerContent = ({ data, onClickClose, headerData }) => {
  return (
    <div className="drawer-content">
      <div className="header">
        <lablel className="lbl-header">{data.friendly}</lablel>
        <IconClose onClick={onClickClose} />
      </div>
      <div className="details">
        {Object.keys(data).map(
          (_key, index) =>
            _key !== "endSecond" && (
              <div className="info" key={index}>
                <label className="lbl-name">{headerData[_key]}</label>
                <span className="lbl-info">{data[_key]}</span>
              </div>
            )
        )}
      </div>
      <div className="lbl-close" onClick={onClickClose}>
        {"Close"}
      </div>
    </div>
  );
};

export default DrawerContent;
