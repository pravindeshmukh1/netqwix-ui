import { Edit2, RefreshCw } from "react-feather";
import Image from "next/image";
import { SketchPicker } from "react-color";
import { useState } from "react";
import { Popover } from "react-tiny-popover";
import { SHAPES } from "../../common/constants";

export const CanvasMenuBar = ({
  canvasConfigs,
  sketchPickerColor,
  setSketchPickerColor,
  undoDrawing,
  refreshDrawing,
  setCanvasConfigs,
  drawShapes,
}) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [activeTab, setActiveTab] = useState(SHAPES.FREE_HAND);
  return (
    <div className="canvas-menus">
      <div className="creationBarItem">
        <div CreationBarCustomizable>
          <span>
            <div>
              {/* {displayColorPicker ?
               */}
              <Popover
                className="color-picker-popover"
                isOpen={displayColorPicker}
                positions={["left", "right"]} // if you'd like, you can limit the positions
                padding={10} // adjust padding here!
                reposition={true} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
                onClickOutside={() => setDisplayColorPicker(false)} // handle click events outside of the popover/target here!
                content={(
                  { position, nudgedLeft, nudgedTop } // you can also provide a render function that injects some useful stuff!
                ) => (
                  <div>
                    <SketchPicker
                      onChange={(color) => {
                        const payload = {
                          ...canvasConfigs,
                          sender: {
                            ...canvasConfigs.sender,
                            strokeStyle: color.hex,
                          },
                        };
                        setCanvasConfigs(payload);
                        canvasConfigs = payload;
                        // canvasConfigs.sender.strokeStyle = color.hex;
                        setSketchPickerColor(color.rgb);
                      }}
                      color={sketchPickerColor}
                    />
                  </div>
                )}
              >
                <div
                  className="icon-btn m-5  button-effect btn-sm"
                  onClick={() => {
                    setDisplayColorPicker(true);
                  }}
                >
                  <Image
                    src="/icons/color-wheel.png"
                    width={20}
                    height={20}
                    alt="color-picker"
                  />
                </div>
              </Popover>

              {/* : null} */}
            </div>
          </span>
          {/* free hand */}
          <span>
            <div
              className={`icon-btn m-5 my-3  button-effect btn-sm ${
                SHAPES.FREE_HAND === activeTab  ? "btn-primary" : "btn-light"
              }`}
              onClick={() => {
                drawShapes(SHAPES.FREE_HAND);
                setActiveTab(SHAPES.FREE_HAND);
              }}
            >
              <Edit2 />
            </div>
          </span>
          {/* line */}
          <span>
            <div
              className={`icon-btn m-5 my-3  button-effect btn-sm ${
                activeTab === SHAPES.LINE ? "btn-primary" : "btn-light"
              }`}
              onClick={() => {
                drawShapes(SHAPES.LINE);
                setActiveTab(SHAPES.LINE);
              }}
            >
              <Image src="/icons/line.png" width={20} height={20} alt="line" />
            </div>
          </span>
          {/* circle */}
          <span>
            <div
              className={`icon-btn m-5 my-3  button-effect btn-sm ${
                activeTab === SHAPES.CIRCLE ? "btn-primary" : "btn-light"
              }`}
              onClick={() => {
                drawShapes(SHAPES.CIRCLE);
                setActiveTab(SHAPES.CIRCLE);
              }}
            >
              <i className="fa fa-circle-thin" />
            </div>
          </span>
          {/* square */}
          <span>
            <div
              className={`icon-btn m-5 my-3  button-effect btn-sm ${
                activeTab === SHAPES.SQUARE ? "btn-primary" : "btn-light"
              }`}
              onClick={() => {
                drawShapes(SHAPES.SQUARE);
                setActiveTab(SHAPES.SQUARE);
              }}
            >
              <i className="fa fa-square-o" />
            </div>
          </span>
          {/* rectangle */}
          <span>
            <div
              className={`icon-btn m-5 my-3  button-effect btn-sm ${
                activeTab === SHAPES.RECTANGLE ? "btn-primary" : "btn-light"
              }`}
              onClick={() => {
                drawShapes(SHAPES.RECTANGLE);
                setActiveTab(SHAPES.RECTANGLE);
              }}
            >
              <Image
                src="/icons/rectangle.png"
                width={20}
                height={20}
                alt="rectangle"
              />
            </div>
          </span>
          {/* oval */}
          <span>
            <div
              className={`icon-btn m-5 my-3  button-effect btn-sm ${
                activeTab === SHAPES.OVAL ? "btn-primary" : "btn-light"
              }`}
              onClick={() => {
                drawShapes(SHAPES.OVAL);
                setActiveTab(SHAPES.OVAL);
              }}
            >
              {/* <i className="fa fa-long-arrow-right" /> */}
              <Image src="/icons/oval.png" width={20} height={20} alt="oval" />
            </div>
          </span>
          {/* triangle */}
          <span>
            <div
              className={`icon-btn m-5 my-3  button-effect btn-sm ${
                activeTab === SHAPES.TRIANGLE ? "btn-primary" : "btn-light"
              }`}
              onClick={() => {
                drawShapes(SHAPES.TRIANGLE);
                setActiveTab(SHAPES.TRIANGLE);
              }}
            >
              <Image
                src="/icons/triangle.png"
                width={20}
                height={20}
                alt="triangle"
              />
            </div>
          </span>
          {/* arrows */}
          <span>
            <div
              className={`icon-btn m-5 my-3  button-effect btn-sm ${
                activeTab === SHAPES.ARROW_RIGHT ? "btn-primary" : "btn-light"
              }`}
              onClick={() => {
                drawShapes(SHAPES.ARROW_RIGHT);
                setActiveTab(SHAPES.ARROW_RIGHT);
              }}
            >
              <i className="fa fa-long-arrow-right" />
            </div>
          </span>
          <span>
            <div
              className={`icon-btn m-5  button-effect btn-sm ${
                activeTab === SHAPES.TWO_SIDE_ARROW
                  ? "btn-primary"
                  : "btn-light"
              }`}
              onClick={() => {
                drawShapes(SHAPES.TWO_SIDE_ARROW);
                setActiveTab(SHAPES.TWO_SIDE_ARROW);
              }}
            >
              <i className="fa fa-arrows-v rotate-90" />
            </div>
          </span>
          <span>
            <div
              className={`icon-btn m-5  button-effect btn-sm my-3`}
              onClick={undoDrawing}
            >
              <Image src="/icons/undo.png" width={20} height={20} alt="Undo" />
            </div>
          </span>
          <span>
            <div
              className={`icon-btn m-5  button-effect btn-sm my-3`}
              onClick={refreshDrawing}
            >
              <RefreshCw />
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};
