import React from "react";
import { ReactComponent as IconCard } from "../../assets/svgs/a-icons-24-color-cards-inactive.svg";
import { ReactComponent as IconGrid } from "../../assets/svgs/a-icons-24-color-grid-inactive.svg";
import RoleTypeSelect from "./RoleTypeSelect";
import classNames from "classnames";
import { Tooltip } from "react-tooltip";

const NavigationBar = ({ handleViewType, selectedView, viewType }) => {
  return (
    <section className="nav-section">
      <RoleTypeSelect />
      <div className="view-icons">
        <IconGrid
          onClick={() => handleViewType(viewType.grid)}
          className={classNames("view-icon", {
            active: selectedView[viewType.grid],
          })}
          data-tooltip-id="icon-grid"
          data-tooltip-content="Grid"
        />
        <Tooltip
          id="icon-grid"
          aria-haspopup="true"
          place="bottom"
          effect="solid"
          className="icon-tooltip-wrapper"
        />
        <IconCard
          onClick={() => handleViewType(viewType.card)}
          className={classNames("view-icon", {
            active: selectedView[viewType.card],
          })}
          data-tooltip-id="icon-card"
          data-tooltip-content="Card"
        />
        <Tooltip
          id="icon-card"
          aria-haspopup="true"
          place="bottom"
          effect="solid"
          className="icon-tooltip-wrapper"
        />
      </div>
    </section>
  );
};

export default NavigationBar;
