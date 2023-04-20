import React from "react";
import { ReactComponent as IconCard } from "../../assets/svgs/a-icons-24-color-cards-inactive.svg";
import { ReactComponent as IconGrid } from "../../assets/svgs/a-icons-24-color-grid-inactive.svg";
import RoleTypeSelect from "./RoleTypeSelect";
import classNames from "classnames";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const NavigationBar = ({ handleViewType, selectedView, viewType }) => {
  return (
    <section className="nav-section">
      <RoleTypeSelect />
      <div className="view-icons">
        <div id="icon-grid">
          <IconGrid
            onClick={() => handleViewType(viewType.grid)}
            className={classNames("view-icon", {
              active: selectedView[viewType.grid],
            })}
          />
        </div>
        <Tooltip
          anchorSelect="#icon-grid"
          place="bottom"
          effect="solid"
          content="Grid"
          className="icon-tooltip-wrapper"
        />
        <div id="icon-card">
          <IconCard
            onClick={() => handleViewType(viewType.card)}
            className={classNames("view-icon", {
              active: selectedView[viewType.card],
            })}
          />
        </div>
        <Tooltip
          anchorSelect="#icon-card"
          place="bottom"
          effect="solid"
          content="Card"
          className="icon-tooltip-wrapper"
        />
      </div>
    </section>
  );
};

export default NavigationBar;
