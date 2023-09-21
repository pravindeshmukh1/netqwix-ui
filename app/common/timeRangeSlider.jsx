import React from "react";
import TimeRangeSlider from "react-time-range-slider";

export const MultiTimeRangeSlider = ({
  disabled,
  draggableTrack,
  maxValue,
  minValue,
  format,
  name,
  onChangeStart,
  onChangeComplete,
  onChange,
  step,
  value,
  from,
  to,
  isAvailable,
}) => {
    const sliderClassName = isAvailable ? "slider-green" : "slider-red";
  return (
    <div style={{ width: "300px", margin: "20px" }}>
      <div className="time-range">
        <b>Start Time:</b> {from} <b>End Time:</b> {to}
      </div>
      <div className={`time-range-slider${sliderClassName}`}>
        <TimeRangeSlider
          disabled={disabled}
          draggableTrack={draggableTrack}
          maxValue={maxValue}
          minValue={minValue}
          format={format}
          name={name}
          onChangeStart={onChangeStart}
          onChangeComplete={onChangeComplete}
          onChange={onChange}
          step={step}
          value={value}
        />
      </div>
    </div>
  );
};
