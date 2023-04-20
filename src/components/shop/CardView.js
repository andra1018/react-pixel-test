import React from "react";

const CardView = ({
  data,
  pageNumber,
  itemsPerPage,
  onClickDetails,
  headerData,
}) => {
  return (
    <div className="card-container">
      {data
        .slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage)
        .map((row, i) => (
          <div className="card-cell" key={i}>
            <div className="lbl-header">{row.friendly}</div>
            <div className="cell-content">
              {Object.keys(row).map(
                (_key, subIndex) =>
                  _key !== "endSecond" && (
                    <div className="cell-info" key={subIndex}>
                      <label className="lbl-name">{headerData[_key]}</label>
                      <label className="lbl-info">{row[_key]}</label>
                    </div>
                  )
              )}
            </div>
            <div className="cell-details" onClick={() => onClickDetails(row)}>
              {"Details"}
            </div>
          </div>
        ))}
    </div>
  );
};

export default CardView;
