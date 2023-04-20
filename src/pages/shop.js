import React, { useEffect, useRef, useState } from "react";
import "../assets/styles/pages/shop.scss";
import ShopHeader from "../components/shop/ShopHeader";
import NavigationBar from "../components/shop/NavigationBar";
import AccessTypeSelect from "../components/shop/AccessTypeSelect";
import GridView from "../components/shop/GridView";
import CardView from "../components/shop/CardView";
import { ReactComponent as IconSearch } from "../assets/svgs/a-icons-16-quick-search.svg";
import classNames from "classnames";
import Pagination from "../components/shop/Pagination";
import dayjs from "dayjs";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import DrawerContent from "../components/shop/DrawerContent";

const ITEMS_PER_PAGE_GRID = 8;
const ITEMS_PER_PAGE_CARD = 6;
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const OVERLAY_COLOR = "#a4a4a8";

const Shop = () => {
  /***
   *
   * Making Temp Data
   *
   */

  const generateString = (length) => {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };
  const getDatesBetween = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );

    while (currentDate <= endDate) {
      dates.push(currentDate);

      currentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1
      );
    }

    return dates;
  };
  const dates = getDatesBetween(new Date("2022-01-12"), new Date("2023-04-19"));

  const tmpData = Array.from(Array(150), (_, i) => ({
    friendly: generateString(10),
    dns: generateString(8),
    env: generateString(10),
    end: dayjs(dates[i]).format("MM/DD/YYYY, hh:mm a"),
    endSecond: dates[i],
  }));

  const tbHeader = {
    friendly: "Friendly Name",
    dns: "DNS Name",
    env: "Environment",
    end: "End Date",
  };

  /***
   *
   *
   */

  const viewType = { grid: "grid", card: "card" };
  const searchIconRef = useRef(null);
  const [isOpenDetails, setIsOpenDetails] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedView, setSelectedView] = useState({
    [`${viewType.grid}`]: true,
  });
  const [searchTxt, setSearchTxt] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);

  const handleViewType = (_type) => {
    setSelectedView({ [_type]: true });
    setPageNumber(1);
  };

  const handleSearchFilter = (value) => {
    setSearchTxt(value);
  };

  const handleInputClick = () => {
    setIsSearch(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchIconRef.current &&
        !searchIconRef.current.contains(event.target)
      )
        setIsSearch(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchIconRef]);

  const handleClickDetails = (_detail) => {
    setSelectedDetails(_detail);
    setIsOpenDetails(true);
  };

  const handleCloseDrawe = () => {
    setIsOpenDetails(false);
    setSelectedDetails(null);
  };

  return (
    <div className="shop-index">
      {isOpenDetails && (
        <Drawer
          overlayColor={OVERLAY_COLOR}
          overlayOpacity={0.85}
          enableOverlay={true}
          onClose={handleCloseDrawe}
          open={isOpenDetails}
          direction="right"
          className={classNames("drawer-container", { extend: isOpenDetails })}
        >
          <DrawerContent
            data={selectedDetails}
            onClickClose={handleCloseDrawe}
            headerData={tbHeader}
          />
        </Drawer>
      )}
      <ShopHeader />
      <NavigationBar
        handleViewType={handleViewType}
        selectedView={selectedView}
        viewType={viewType}
      />

      <div className="content">
        <AccessTypeSelect />
        <div className="view-content">
          <div className="input-wrapper">
            <input
              id="search"
              placeholder="Search & Filter"
              value={searchTxt}
              type="text"
              onChange={(e) => handleSearchFilter(e.target.value)}
              maxLength={20}
              onClick={() => handleInputClick()}
            />
            <IconSearch
              ref={searchIconRef}
              className={classNames("icon-search", { active: isSearch })}
            />
          </div>
          {selectedView[viewType.grid] ? (
            <GridView
              data={tmpData}
              pageNumber={pageNumber}
              itemsPerPage={ITEMS_PER_PAGE_GRID}
              onClickDetails={handleClickDetails}
              headerData={tbHeader}
            />
          ) : (
            <CardView
              data={tmpData}
              pageNumber={pageNumber}
              itemsPerPage={ITEMS_PER_PAGE_CARD}
              onClickDetails={handleClickDetails}
              headerData={tbHeader}
            />
          )}
          <Pagination
            itemsPerPage={
              selectedView[viewType.grid]
                ? ITEMS_PER_PAGE_GRID
                : ITEMS_PER_PAGE_CARD
            }
            totalItems={tmpData.length}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        </div>
      </div>
    </div>
  );
};
export default Shop;
