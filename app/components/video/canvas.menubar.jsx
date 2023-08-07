import {
    Edit2,
    RefreshCw,
  } from "react-feather";
  import Image from "next/image";
  import { SketchPicker } from "react-color";
  import { useState } from "react";
  import { Popover } from "react-tiny-popover";
  
  export const CanvasMenuBar = ({
    canvasConfigs,
    sketchPickerColor,
    setSketchPickerColor,
    undoDrawing,
    refreshDrawing,
    setCanvasConfigs,
    drawShapes
  }) => {
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
  
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
                    className="icon-btn m-5 btn-light button-effect btn-sm"
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
                className="icon-btn m-5 my-3 btn-light button-effect btn-sm"
                onClick={() => { drawShapes(null)}}
              >
                <Edit2 />
              </div>
            </span>
            {/* line */}
            <span>
              <div
                className="icon-btn m-5 my-3 btn-light button-effect btn-sm"
                onClick={() => { drawShapes('line')}}
              >
                <Image src="/icons/line.png" width={20} height={20} alt="line" />
              </div>
            </span>
            {/* circle */}
            <span>
              <div
                className="icon-btn m-5 my-3 btn-light button-effect btn-sm"
                onClick={() => {}}
              >
                <i className="fa fa-circle-thin" />
              </div>
            </span>
            {/* square */}
            <span>
              <div
                className="icon-btn m-5 my-3 btn-light button-effect btn-sm"
                onClick={() => {}}
              >
                <i className="fa fa-square-o" />
              </div>
            </span>
            {/* rectangle */}
            <span>
              <div
                className="icon-btn m-5 my-3 btn-light button-effect btn-sm"
                onClick={() => {}}
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
                className="icon-btn m-5 my-3 btn-light button-effect btn-sm"
                onClick={() => {}}
              >
                {/* <i className="fa fa-long-arrow-right" /> */}
                <Image src="/icons/oval.png" width={20} height={20} alt="oval" />
              </div>
            </span>
            {/* triangle */}
            <span>
              <div
                className="icon-btn m-5 my-3 btn-light button-effect btn-sm"
                onClick={() => {}}
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
                className="icon-btn m-5 my-3 btn-light button-effect btn-sm"
                onClick={() => {}}
              >
                <i className="fa fa-long-arrow-right" />
              </div>
            </span>
            <span>
              <div
                className="icon-btn m-5 btn-light button-effect btn-sm"
                onClick={() => {}}
              >
                <i className="fa fa-arrows-v rotate-90" />
              </div>
            </span>
            <span>
              <div
                className={`icon-btn m-5 btn-light button-effect btn-sm my-3`}
                onClick={undoDrawing}
              >
                <Image src="/icons/undo.png" width={20} height={20} alt="Undo" />
              </div>
            </span>
            <span>
              <div
                className={`icon-btn m-5 btn-light button-effect btn-sm my-3`}
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
  