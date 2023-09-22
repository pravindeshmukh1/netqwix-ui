import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

const MultiRangeSlider = ({
  startTime,
  endTime,
  onChange,
  isSlotAvailable,
}) => {
  // Convert time to minutes (hh:mm to minutes since midnight)
  function timeToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  // Convert time values to minutes for easier manipulation
  const minTime = timeToMinutes(startTime);
  const maxTime = timeToMinutes(endTime);

  const [minVal, setMinVal] = useState(minTime);
  const [maxVal, setMaxVal] = useState(maxTime);
  const minValRef = useRef(minTime);
  const maxValRef = useRef(maxTime);
  const range = useRef(null);

  // Convert minutes to time format (minutes since midnight to hh:mm)
  function minutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}`;
  }

  // Convert time values to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - minTime) / (maxTime - minTime)) * 100),
    [minTime, maxTime]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values in time format when their state changes
  useEffect(() => {
    onChange({
      startTime: minutesToTime(minVal),
      endTime: minutesToTime(maxVal),
    });
  }, [minVal, maxVal, onChange]);
  const range_slider = isSlotAvailable
    ? "time-range-success"
    : "time-range-danger";
  return (
    <div className="range-slider-container">
      <input
        type="range"
        min={minTime}
        max={maxTime}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className="thumb thumb--left"
        style={{ zIndex: minVal > maxTime - 60 && "5" }}
      />
      <input
        type="range"
        min={minTime}
        max={maxTime}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className="thumb thumb--right"
      />

      <div className="range-slider">
        <div className="slider__track" />
        <div ref={range} className={`${range_slider}`} />
        <div className="slider__left-value">
          <p className="text-dark">{minutesToTime(minVal)}</p>
        </div>
        <div className="slider__right-value">
          <p className="text-dark">{minutesToTime(maxVal)}</p>
        </div>
      </div>
    </div>
  );
};

MultiRangeSlider.propTypes = {
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MultiRangeSlider;
