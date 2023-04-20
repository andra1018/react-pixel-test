import React from "react";
import IconLogo from "../../assets/svgs/logo-empowerid.svg";
import IconShop from "../../assets/svgs/icons-apps-it-shop.svg";
import IconUser from "../../assets/images/profile-pic@3x.png";
const ShopHeader = () => {
  return (
    <section className="header-section">
      <div className="header-icon">
        <img src={IconLogo} className="logo-icon" alt="" />
        <div className="division-line"></div>
        <div className="shop-icon">
          <img src={IconShop} alt="" />
          <span className="lbl-shop">{"IAM SHOP"}</span>
        </div>
      </div>
      <div className="user-icon">
        <img src={IconUser} alt="" />
        <span className="lbl-user">{"Patrick Parker"}</span>
      </div>
    </section>
  );
};
export default ShopHeader;
