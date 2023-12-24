import React, { useEffect, useState } from "react";
import "./ProgressLine.css";

const ProgressLine = ({
  label,
  backgroundColor ,
  visualParts 
}) => {
  const [widths, setWidths] = useState(
    visualParts.map(() => {
      return 0;
    })
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      setWidths(
        visualParts.map(item => {
          return item.percentage;
        })
      );
    });
  }, [visualParts]);

  return (
    <div className="flex justify-around items-center gap-3">
      <div className="font-thin">{label}</div>
      <div
        className="progressVisualFull rounded-xl"
        style={{
          backgroundColor,
          width:'100px'
        }}
      >
        {visualParts.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                width: widths[index],
                backgroundColor: item.color
              }}
              className="progressVisualPart rounded-xl"
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProgressLine;
