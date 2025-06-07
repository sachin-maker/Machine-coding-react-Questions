import React, { useState } from "react";
import Cell from "./Cell";
import "./style.css";

const GridLight = () => {
  const [order, setOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const config = [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
  ];

  const activateCells = (index) => {
    const newOrder = [...order, index];
    setOrder(newOrder);
    // deactivate
    if (newOrder.length === config.flat(1).filter(Boolean).length) {
      deactivateCells();
    }
  };

  const deactivateCells = () => {
    setIsDeactivating(true);
    const timer = setInterval(() => {
      setOrder((origOrder) => {
        const newOrder = origOrder.slice();
        newOrder.pop();

        if (newOrder.length === 0) {
          clearInterval(timer);
          setIsDeactivating(false);
        }

        return newOrder;
      });
    }, 300);
  };

  return (
    <div className="wrapper">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${config[0].length}, 86px)`,
        }}
      >
        {config
          .flat(1)
          .map((value, index) =>
            value ? (
              <Cell
                key={index}
                filled={order.includes(index)}
                onClick={() => activateCells(index)}
                label={`Cell ${index}`}
                isDisabled={order.includes(index) || isDeactivating}
              />
            ) : (
              <span />
            )
          )}
      </div>
    </div>
  );
};

export default GridLight;