import React from 'react';
import MultiRangeSlider from './timeRangeSliderV2';

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
  const sliderClassName = isAvailable ? 'slider-green' : 'slider-red';
  return (
    <div style={{width: '300px', margin: '20px'}}>
      <div className="time-range">
        {/* <b>Start Time:</b> {from} <b>End Time:</b> {to} */}
      </div>
      <div className={`time-range-slider${sliderClassName}`}>
        <MultiRangeSlider
          startTime="08:00"
          endTime="19:00"
          onChange={(result) => console.log (`min = ${result}`, result)}
        />
      </div>
    </div>
  );
};
