import React, { useState } from "react";
import { ReactComponent as IconAscendingSort } from "../../assets/svgs/sort-ascending.svg";
import classNames from "classnames";
import _ from "lodash";

const GridView = ({
  data,
  pageNumber,
  itemsPerPage,
  onClickDetails,
  headerData,
}) => {
  const [sortDesc, setSortDesc] = useState(null);
  const [selectedSortItem, setSelectedSortItem] = useState({});
  const [filteredData, setFilteredData] = useState(data);

  const handleSort = (sortBy, _sort) => {
    const data = [...filteredData];
    const sortedData = _.sortBy(data, sortBy === "end" ? "endSecond" : sortBy);

    if (_sort) {
      sortedData.reverse();
    }

    setSelectedSortItem({ [sortBy]: true });
    setSortDesc(_sort);
    setFilteredData(sortedData);
  };

  return (
    <>
      <div className="tbl-container">
        <div className="table">
          <div className="thead">
            {Object.keys(headerData).map((_key, i) => (
              <div
                key={i}
                className="cell"
                onClick={() => handleSort(_key, sortDesc === false)}
              >
                <div className="cell-content">
                  <span>{headerData[_key]}</span>
                  <div
                    className={classNames(
                      {
                        active: selectedSortItem[_key],
                      },
                      {
                        "sort-ascend":
                          selectedSortItem[_key] && sortDesc === false,
                      }
                    )}
                  >
                    <IconAscendingSort />
                  </div>
                </div>
              </div>
            ))}

            <div className="cell"></div>
          </div>
          {filteredData
            .slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage)
            .map((row, i) => (
              <div className="row" key={i}>
                {Object.keys(row).map(
                  (_key, subIndex) =>
                    _key !== "endSecond" && (
                      <div className="cell" key={subIndex}>
                        <div className="cell-content"> {row[_key]}</div>
                      </div>
                    )
                )}
                <div className="cell">
                  <div
                    className="cell-details"
                    onClick={() => onClickDetails(row)}
                  >
                    {"Details"}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default GridView;
