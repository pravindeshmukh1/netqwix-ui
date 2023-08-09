"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";
import NextImage from "next/image";
import { EVENTS } from "../../../helpers/events";
import { SocketContext } from "../socket";
import { Popover } from "react-tiny-popover";

import {
    Edit2,
    MicOff,
    Pause,
    PauseCircle,
    Phone,
    PlayCircle,
    RefreshCw,
} from "react-feather";
import { AccountType, SHAPES } from "../../common/constants";
import { SketchPicker, ChromePicker } from "react-color";
import { CanvasMenuBar } from "./canvas.menubar";
// import { updateDrawingAsync } from "../trainer/trainer.slice";
// import { useAppDispatch } from "../../store";

let storedLocalDrawPaths = { sender: [], receiver: [] };
let XAndYCoordinates = [];
let selectedShape = null;
let canvasConfigs = {
    sender: {
        strokeStyle: "red",
        lineWidth: 5,
        lineCap: "round",
    },
    receiver: {
        strokeStyle: "green",
        lineWidth: 5,
        lineCap: "round",
    },
};

// default setup;
let isDrawing = false;
let isVideoMuted = true;
let savedPos;
let startPos;
let currPos;
let strikes = [];




export const HandleVideoCall = ({ accountType, fromUser, toUser, isClose }) => {
    // const dispatch = useAppDispatch();
    const socket = useContext(SocketContext);
    const [sketchPickerColor, setSketchPickerColor] = useState({
        r: 241,
        g: 112,
        b: 19,
        a: 1,
    });
    const [remoteStream, setRemoteStream] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isFeedStopped, setIsFeedStopped] = useState(false);
    const [displayMsg, setDisplayMsg] = useState({ showMsg: false, msg: "" });
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const state = {
        mousedown: false,
    };

    const windowsRef = useRef(null);

    const removeVideoRef = useRef(null);
    const peerRef = useRef(null);

    // TODO: type missing
    const [storedEvents, setStoredEvents] = useState([]);
    const [storedPositions, setStoredCanvasPositions] = useState([]);

    useEffect(() => {
        windowsRef.current = window;
        handleStartCall();
        listenSocketEvents();
        initializeLocalStates();
        return () => {
            cutCall();
        };

    }, []);


    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!context) return;

        const drawFrame = () => {
            if (canvas && context && video) {
                //   context.drawImage(video, 0, 0, canvas.width, canvas.height);
                context.fillStyle = "rgba(255, 255, 255, 0.5)";
                context.fillRect(0, 0, canvas.width, canvas.height);
            }
            requestAnimationFrame(drawFrame);
        };

        const startDrawing = (event) => {
            event.preventDefault();
            isDrawing = true;
            console.log(`--- start drawing ---- `, selectedShape);
            if (!context) return;
            savedPos = context.getImageData(0, 0, document.getElementById("bookings")?.clientWidth, document.getElementById("bookings")?.clientHeight);
            if (strikes.length >= 10) strikes.shift();  // removing first position if strikes > 10;
            strikes.push(savedPos);
            storedEvents.length = 0;
            storedEvents.push([event.offsetX, event.offsetY]);
            const mousePos = getMosuePositionOnCanvas(event);
            context.strokeStyle = canvasConfigs.sender.strokeStyle;
            context.lineWidth = canvasConfigs.sender.lineWidth;
            XAndYCoordinates = [];
            // XAndYCoordinates.push({ x: mousePos.x, y: mousePos.y })
            XAndYCoordinates.push([mousePos.x, mousePos.y]);
            context.lineCap = "round";
            context.beginPath();
            context.moveTo(mousePos.x, mousePos.y);
            context.fill();
            state.mousedown = true;
            startPos = { x: mousePos.x, y: mousePos.y };
        };

        const findDistance = () => {
            let dis = Math.sqrt(Math.pow(currPos.x - startPos.x, 2) + Math.pow(currPos.y - startPos.y, 2));
            return dis;
        }

        const drawShapes = () => {
            switch (selectedShape) {
                case SHAPES.LINE: {
                    context.moveTo(startPos.x, startPos.y);
                    context.lineTo(currPos.x, currPos.y);
                    break;
                };
                case SHAPES.CIRCLE: {
                    let distance = findDistance(startPos, currPos);
                    context.arc(startPos.x, startPos.y, distance, 0, 2 * Math.PI, false);
                    break;
                };
                case SHAPES.SQUARE: {
                    let w = currPos.x - startPos.x;
                    let h = currPos.y - startPos.y;
                    context.rect(startPos.x, startPos.y, w, h);
                    break;
                };
                case SHAPES.RECTANGLE: {
                    let w = currPos.x - startPos.x;
                    let h = currPos.y - startPos.y;
                    context.rect(startPos.x, startPos.y, w, h);
                    break;
                };
                case SHAPES.OVAL: {
                    const transform = context.getTransform();
                    let w = currPos.x - startPos.x;
                    let h = currPos.y - startPos.y;
                    context.fillStyle = "#FFFFFF";
                    context.fillStyle = 'rgba(0, 0, 0, 0)';
                    const radiusX = w * transform.a;
                    const radiusY = h * transform.d;
                    if (radiusX > 0 && radiusY > 0) {
                        context.ellipse(currPos.x, currPos.y, radiusX, radiusY, 0, 0, 2 * Math.PI);
                        context.fill();
                    }
                    break;
                };
                case SHAPES.TRIANGLE: {
                    context.moveTo(startPos.x + (currPos.x - startPos.x) / 2, startPos.y);
                    context.lineTo(startPos.x, currPos.y);
                    context.lineTo(currPos.x, currPos.y);
                    context.closePath();
                    break;
                };
                case SHAPES.ARROW_RIGHT: {
                    const arrowSize = 10;
                    const direction = Math.atan2(currPos.y - startPos.y, currPos.x - startPos.x);
                    // Calculate the coordinates of the arrowhead
                    const arrowheadX = currPos.x + length * Math.cos(direction);
                    const arrowheadY = currPos.y + length * Math.sin(direction);
                    // Draw the line of the arrow
                    context.moveTo(startPos.x, startPos.y);
                    context.lineTo(currPos.x, currPos.y);
                    // Draw the arrowhead
                    context.moveTo(arrowheadX, arrowheadY);
                    context.lineTo(currPos.x - arrowSize * Math.cos(direction - (Math.PI / 6)), currPos.y - arrowSize * Math.sin(direction - (Math.PI / 6)));
                    context.moveTo(currPos.x, currPos.y);
                    context.lineTo(currPos.x - arrowSize * Math.cos(direction + (Math.PI / 6)), currPos.y - arrowSize * Math.sin(direction + (Math.PI / 6)));
                    context.stroke();
                    break;
                };
                case SHAPES.TWO_SIDE_ARROW: {
                    const x1 = startPos.x;
                    const y1 = startPos.y;
                    const x2 = currPos.x;
                    const y2 = currPos.y;
                    const size = 10;
                    const angle = Math.atan2(y2 - y1, x2 - x1);
                    const arrowPoints = [
                        { x: x2 - size * Math.cos(angle - Math.PI / 6), y: y2 - size * Math.sin(angle - Math.PI / 6) },
                        { x: x2 - size * Math.cos(angle + Math.PI / 6), y: y2 - size * Math.sin(angle + Math.PI / 6) },
                        { x: x1 + size * Math.cos(angle - Math.PI / 6), y: y1 + size * Math.sin(angle - Math.PI / 6) },
                        { x: x1 + size * Math.cos(angle + Math.PI / 6), y: y1 + size * Math.sin(angle + Math.PI / 6) }
                    ];
                    context.moveTo(x1, y1);
                    context.lineTo(x2, y2);
                    context.moveTo(arrowPoints[0].x, arrowPoints[0].y);
                    context.lineTo(x2, y2);
                    context.lineTo(arrowPoints[1].x, arrowPoints[1].y);
                    context.moveTo(arrowPoints[2].x, arrowPoints[2].y);
                    context.lineTo(x1, y1);
                    context.lineTo(arrowPoints[3].x, arrowPoints[3].y);

                    context.stroke();
                    break;
                };
            }
        }

        const draw = (event) => {
            event.preventDefault();
            if (!isDrawing || !context || !state.mousedown) return;
            const mousePos = getMosuePositionOnCanvas(event);
            currPos = { x: mousePos?.x, y: mousePos.y };

            if (selectedShape) {
                context.putImageData(savedPos, 0, 0);
                context.beginPath();
                drawShapes();
                context.stroke();
            } else {
                // XAndYCoordinates.push({ x: mousePos.x, y: mousePos.y })
                // XAndYCoordinates.push([event.offsetX, event.offsetY]);
                console.log(`--- drawing ---- `);
                context.strokeStyle = canvasConfigs.sender.strokeStyle;
                context.lineWidth = canvasConfigs.sender.lineWidth;
                context.lineCap = "round";


                context.lineTo(mousePos.x, mousePos.y);
                context.stroke();
            }

            XAndYCoordinates.push([event.offsetX, event.offsetY]);
            storedEvents.push([event.offsetX, event.offsetY]);
            if (storedEvents && storedEvents.length) {
                storedPositions.push([event.offsetX, event.offsetY]);
            }
            setStoredEvents(storedEvents);
        };

        const stopDrawing = (event) => {
            event.preventDefault();
            if (storedEvents && storedEvents.length && state.mousedown) {
                console.log(`--- stop drawing ---- `);
                if (XAndYCoordinates && XAndYCoordinates.length) {
                    storedLocalDrawPaths.sender.push(XAndYCoordinates);
                }
                sendStopDrawingEvent();

                storedPositions.length = 0;
                setStoredCanvasPositions([]);
                setStoredEvents([]);
                isDrawing = false;
                state.mousedown = false;
                sendDrawEvent(storedEvents);
            }
        };

        // const startMobileDrawing = (event) => {
        //     event.preventDefault();
        //     storedEvents.length = 0;
        //     const mousePos = getMosuePositionOnCanvas(event);
        //     if (!context) return;
        //     XAndYCoordinates = [];
        //     // XAndYCoordinates.push({ x: mousePos.x, y: mousePos.y })
        //     XAndYCoordinates.push([mousePos.x, mousePos.y]);
        //     context.beginPath();
        //     context.moveTo(mousePos.x, mousePos.y);
        //     context.lineWidth = canvasConfigs.sender.lineWidth;
        //     context.strokeStyle = canvasConfigs.sender.strokeStyle;
        //     context.fill();
        //     isDrawing = true;
        //     storedEvents.push([mousePos.x, mousePos.y]);
        //     setStoredEvents(storedEvents);
        // };

        // const drawMobile = (event) => {
        //     event.preventDefault();
        //     if (isDrawing) {
        //         const mousePos = getMosuePositionOnCanvas(event);
        //         // XAndYCoordinates.push({ x: mousePos.x, y: mousePos.y })
        //         XAndYCoordinates.push([mousePos.x, mousePos.y]);
        //         if (!context) return;
        //         context.lineTo(mousePos.x, mousePos.y);
        //         storedEvents.push([mousePos.x, mousePos.y]);
        //         setStoredEvents(storedEvents);
        //         context.stroke();
        //     }
        // };

        // const stopMobileDrawing = (event) => {
        //     event.preventDefault();
        //     if (!context) return;
        //     if (isDrawing) {
        //         storedLocalDrawPaths.sender.push(XAndYCoordinates);
        //         context.stroke();
        //         sendStopDrawingEvent();
        //         sendDrawEvent(storedEvents);
        //     }
        //     isDrawing = false;
        // };

        // allowing trainer to draw
        if (canvas && accountType === AccountType.TRAINER) {
            // for mobile
            canvas.addEventListener("touchstart", startDrawing);
            canvas.addEventListener("touchmove", draw);
            canvas.addEventListener("touchend", stopDrawing);
            // for web
            canvas.addEventListener("mousedown", startDrawing);
            canvas.addEventListener("mousemove", draw);
            canvas.addEventListener("mouseup", stopDrawing);
            // canvas.addEventListener("mouseout", stopDrawing);
        }

        return () => {
            video?.removeEventListener("play", drawFrame);
            cutCall();
        };
    }, []);

    useEffect(() => {
        if (removeVideoRef.current && remoteStream) {
            removeVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    const initializeLocalStates = () => {
        strikes = [];
    }

    const cutCall = () => {
        cleanupFunctionV2();
        isClose();
        if (removeVideoRef && removeVideoRef.current) {
            socket.emit(EVENTS.VIDEO_CALL.ON_CLOSE, {
                userInfo: { from_user: fromUser._id, to_user: toUser._id },
            });
        }
    };

    const listenSocketEvents = () => {
        // Handle signaling events from the signaling server
        socket.on(EVENTS.VIDEO_CALL.ON_OFFER, (offer) => {
            // cleanupFunctionV2()
            peerRef.current?.signal(offer);
        });

        socket.on(EVENTS.VIDEO_CALL.ON_ANSWER, (answer) => {
            peerRef.current?.signal(answer);
        });

        socket.on(EVENTS.VIDEO_CALL.ON_ICE_CANDIDATE, (candidate) => {
            peerRef.current?.signal(candidate);
        });

        socket.on(EVENTS.ON_CLEAR_CANVAS, () => {
            clearCanvas();
        });

        socket.on(EVENTS.VIDEO_CALL.MUTE_ME, ({ muteStatus }) => {
            if (removeVideoRef.current && removeVideoRef.current.srcObject) {
                removeVideoRef.current.srcObject.getAudioTracks()[0].enabled =
                    muteStatus;
            }
        });

        socket.on(EVENTS.VIDEO_CALL.STOP_FEED, ({ feedStatus }) => {
            if (removeVideoRef.current && removeVideoRef.current.srcObject) {
                removeVideoRef.current.srcObject.getVideoTracks()[0].enabled =
                    feedStatus;
            }
        });

        socket.on(EVENTS.EMIT_DRAWING_CORDS, ({ storedEvents, canvasConfigs, strikes }) => {
            // console.log(
            //     `--- got coordinates for drawings ---- `,
            //     storedLocalDrawPaths
            // );
            // if (storedEvents && Array.isArray(storedEvents)) {
            //     storedLocalDrawPaths.receiver.push(storedEvents);
            // }
            const canvas = canvasRef.current;
            const context = canvas?.getContext("2d");
            if (!context) return;
            // context.strokeStyle = canvasConfigs.sender.strokeStyle;
            // context.lineWidth = canvasConfigs.sender.lineWidth;
            // context.lineCap = "round";
            // context.beginPath();
            // let lastX =
            //     storedEvents &&
            //     Array.isArray(storedEvents) &&
            //     Array.isArray(storedEvents[0]) &&
            //     storedEvents[0][0];
            // let lastY =
            //     storedEvents &&
            //     Array.isArray(storedEvents) &&
            //     Array.isArray(storedEvents[0]) &&
            //     storedEvents[0][1];
            // if (lastX && lastY) {
            //     context?.moveTo(lastX, lastY);
            //     for (let positions in storedEvents) {
            //         const currentX = storedEvents[positions][0];
            //         const currentY = storedEvents[positions][1];
            //         context.fillStyle = "rgba(255, 255, 255, 0.5)";
            //         context.lineTo(currentX, currentY);
            //         context.stroke();
            //     }
            // }
            const blob = new Blob([strikes]);
            const image = new Image();
            image.src = URL.createObjectURL(blob);

            image.onload = () => {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(image, 0, 0);
            };
        });

        socket.on(EVENTS.ON_UNDO, ({ sender, receiver }) => {
            storedLocalDrawPaths.receiver = [];
            storedLocalDrawPaths.sender = [];
            storedLocalDrawPaths.sender = receiver;
            storedLocalDrawPaths.receiver = sender;
            undoDrawing(
                { coordinates: sender, theme: canvasConfigs.receiver },
                {
                    coordinates: receiver,
                    theme: {
                        lineWidth: canvasConfigs.sender.lineWidth,
                        strokeStyle: canvasConfigs.sender.strokeStyle,
                    },
                },
                false
            );
        });

        socket.on(EVENTS.VIDEO_CALL.ON_CLOSE, () => {
            setDisplayMsg({
                showMsg: true,
                msg: `${toUser?.fullname} left the meeting, redirecting back to home screen in 5 seconds...`,
            });
            cleanupFunctionV2();
        });
    };

    const getMosuePositionOnCanvas = (event) => {
        if (
            event.clientX ||
            event.clientY ||
            (event?.touches && event?.touches[0])
        ) {
            const clientX = event.clientX || event?.touches[0]?.clientX;
            const clientY = event.clientY || event?.touches[0]?.clientY;
            const { offsetLeft, offsetTop } = event.target;
            const canvasX = clientX - offsetLeft;
            const canvasY = clientY - offsetTop;
            return { x: canvasX, y: canvasY };
        }
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!context || !canvas) return;
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const handleStartCall = () => {
        console.log(`--- handleStartCall ---`);
        const startVideoCall = async () => {
            try {
                const stream = await navigator.mediaDevices
                    .getUserMedia({
                        video: true,
                        audio: true,
                    })
                    .catch((err) => {
                        console.log(`unable to access video call ---- `, err);
                    });
                // setLocalStream(stream);
                setDisplayMsg({
                    showMsg: true,
                    msg: `Waiting for ${toUser?.fullname}  to join...`,
                });
                videoRef.current.srcObject = stream;

                const peer = new SimplePeer({
                    initiator: true,
                    // trickle: false,
                    stream,
                });

                peerRef.current = peer;

                peer.on(EVENTS.VIDEO_CALL.ON_SIGNAL, (offer) => {
                    // Send the offer to the signaling server
                    socket.emit(EVENTS.VIDEO_CALL.ON_OFFER, {
                        offer,
                        userInfo: { from_user: fromUser._id, to_user: toUser._id },
                    });
                });

                peer.on(EVENTS.VIDEO_CALL.ON_STREAM, (stream) => {
                    setDisplayMsg({ showMsg: false, msg: "" });
                    setRemoteStream(stream);
                });

                peer.on(EVENTS.VIDEO_CALL.ON_CONNECT, () => {
                    // setIsCalling(true);
                });

                peer.on(EVENTS.VIDEO_CALL.ON_CLOSE, () => {
                    // setIsCalling(false);
                    cleanupFunctionV2();
                });
            } catch (error) {
                console.error("Error accessing media devices:", error);
            }
        };
        startVideoCall().then(() => { });
    };

    const sendDrawEvent = (storedEvents) => {
        // alert('sending');
        const canvas = canvasRef.current;
        if(!canvas) return;
        canvas.toBlob((blob) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const binaryData = event.target.result;
                // console.log(`binaryImageData --- `, binaryData);
                socket.emit(EVENTS.DRAW, {
                    userInfo: { from_user: fromUser._id, to_user: toUser._id },
                    storedEvents,
                    canvasConfigs,
                    strikes: binaryData,
                });
            };
            reader.readAsArrayBuffer(blob);
        });
        // dispatch(updateDrawingAsync({ booking_id: '1', strikes: binaryImageData }));
    };

    const sendStopDrawingEvent = () => {
        if (removeVideoRef && removeVideoRef.current) {
            socket.emit(EVENTS.STOP_DRAWING, {
                userInfo: { from_user: fromUser._id, to_user: toUser._id },
            });
        }
    };

    const sendClearCanvasEvent = () => {
        if (removeVideoRef && removeVideoRef.current) {
            socket.emit(EVENTS.EMIT_CLEAR_CANVAS, {
                userInfo: { from_user: fromUser._id, to_user: toUser._id },
            });
        }
    };

    const cleanupFunctionV2 = () => {
        let videorefSrc = videoRef.current;
        if (videoRef && videorefSrc && videorefSrc.srcObject) {
            const availableTracks = videorefSrc.srcObject.getTracks();
            const availableVideoTracks = videorefSrc.srcObject.getVideoTracks();
            for (
                let videoRefIndex = 0;
                videoRefIndex < availableTracks.length;
                videoRefIndex++
            ) {
                const track = availableTracks[videoRefIndex];
                track.stop();
            }

            for (
                let videoRefIndex = 0;
                videoRefIndex < availableVideoTracks.length;
                videoRefIndex++
            ) {
                const track = availableVideoTracks[videoRefIndex];
                track.stop();
            }
        }

        if (peerRef.current) {
            peerRef.current.destroy();
            peerRef.current = null;
        }

        clearCanvas();
    };

    // const erase = (eraserSize) => {
    //     const canvas = canvasRef.current;
    //     const context = canvas?.getContext("2d");

    //     if(!context) return;
    //     let w, h = eraserSize;
    //     context.clearRect(currPos.x, currPos.y, w, h);
    // }

    const undoDrawing = async (
        senderConfig,
        extraCoordinateConfig,
        removeLastCoordinate = true
    ) => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!context || !canvas) return;
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (removeLastCoordinate) storedLocalDrawPaths.sender.splice(-1, 1);
        // draw all the paths in the paths array
        await senderConfig.coordinates.forEach((path) => {
            context.beginPath();
            context.strokeStyle = senderConfig.theme.strokeStyle;
            context.lineWidth = senderConfig.theme.lineWidth;
            context.lineCap = "round";
            if (path && Array.isArray(path)) {
                // context.
                context.moveTo(path[0][0], path[0][1]);
                for (let i = 0; i < path.length; i++) {
                    context.lineTo(path[i][0], path[i][1]);
                }
                context.stroke();
            }
        });

        await extraCoordinateConfig.coordinates.forEach((path) => {
            context.beginPath();
            context.strokeStyle = extraCoordinateConfig.theme.strokeStyle;
            context.lineWidth = extraCoordinateConfig.theme.lineWidth;
            context.lineCap = "round";

            // context.beginPath();
            if (path && Array.isArray(path)) {
                // context.
                context.moveTo(path[0][0], path[0][1]);
                for (let i = 0; i < path.length; i++) {
                    context.lineTo(path[i][0], path[i][1]);
                }
                context.stroke();
            }
        });

        if (strikes.length <= 0) return;
        context.putImageData(strikes[strikes.length - 1], 0, 0);
        strikes.pop();

        // sending event to end user
        if (removeLastCoordinate) {
            // socket.emit(EVENTS.EMIT_UNDO, {
            //     sender: storedLocalDrawPaths.sender,
            //     receiver: extraCoordinateConfig.coordinates,
            //     userInfo: { from_user: fromUser._id, to_user: toUser._id },
            // });
            sendDrawEvent(storedEvents)
        }
    };

    const renderCallActionButtons = () => {
        return (
            <div className="call-action-buttons z-50 ml-2  absolute bottom-10  z-50">
                <div
                    className={`icon-btn ${isMuted ? "btn-danger" : "btn-light"
                        } btn-xl button-effect mic`}
                    onClick={() => {
                        setIsMuted(!isMuted);
                        if (removeVideoRef && removeVideoRef.current) {
                            socket.emit(EVENTS.VIDEO_CALL.MUTE_ME, {
                                userInfo: { from_user: fromUser._id, to_user: toUser._id },
                                muteStatus: isMuted,
                            });
                        }
                    }}
                >
                    <MicOff />
                </div>
                <div
                    className={`icon-btn btn-light  button-effect btn-xl ml-3`}
                    onClick={() => {
                        setIsFeedStopped(!isFeedStopped);
                        if (videoRef.current && videoRef.current.srcObject) {
                            const availableTracks = videoRef.current.srcObject.getTracks();
                            const availableVideoTracks =
                                videoRef.current.srcObject.getVideoTracks();
                            for (
                                let videoRefIndex = 0;
                                videoRefIndex < availableTracks.length;
                                videoRefIndex++
                            ) {
                                const track = availableTracks[videoRefIndex];
                                track.enabled = isFeedStopped;
                            }

                            for (
                                let videoRefIndex = 0;
                                videoRefIndex < availableVideoTracks.length;
                                videoRefIndex++
                            ) {
                                const track = availableVideoTracks[videoRefIndex];
                                track.enabled = isFeedStopped;
                            }
                        }
                        if (removeVideoRef && removeVideoRef.current) {
                            socket.emit(EVENTS.VIDEO_CALL.STOP_FEED, {
                                userInfo: { from_user: fromUser._id, to_user: toUser._id },
                                feedStatus: isFeedStopped,
                            });
                        }
                    }}
                >
                    {!isFeedStopped ? <PauseCircle /> : <PlayCircle />}
                </div>

                <div
                    className="icon-btn btn-danger button-effect btn-xl  ml-3"
                    onClick={() => {
                        cutCall();
                    }}
                >
                    <Phone />
                </div>
            </div>
        );
    };

    return (
        <React.Fragment>
            {displayMsg.showMsg ? (
                <div className="no-user-joined">{displayMsg.msg}</div>
            ) : (
                <></>
            )}
            <div className="flex">
                <div className="absolute z-50 bottom-0 left-21">
                    <div className="flex items-center">
                        <div>
                            {videoRef && (
                                <video
                                    muted
                                    id="end-user-video"
                                    playsInline
                                    className="rounded z-50"
                                    ref={videoRef}
                                    autoPlay
                                />
                            )}
                        </div>
                    </div>
                </div>
                {removeVideoRef && (
                    <div className="" id="remote-user">
                        <canvas
                            id="drawing-canvas"
                            width={document.getElementById("bookings")?.clientWidth}
                            height={document.getElementById("bookings")?.clientHeight}
                            className="canvas-print absolute  all-0"
                            ref={canvasRef}
                        ></canvas>
                        <video
                            width={document.getElementById("bookings")?.clientWidth}
                            height={document.getElementById("bookings")?.clientHeight}
                            ref={removeVideoRef}
                            playsInline
                            autoPlay
                            className="bg-video"
                            id="video"
                        ></video>
                    </div>
                )}
            </div>

            {/* action buttons */}
            {/* {accountType === AccountType.TRAINER && renderActionItems()} */}
            {/* call cut and mute options */}
            {renderCallActionButtons()}
            {/* render menubar */}
            {accountType === AccountType.TRAINER ? (
                <div>
                    {" "}
                    <CanvasMenuBar
                        setSketchPickerColor={(rgb) => {
                            setSketchPickerColor(rgb);
                        }}
                        undoDrawing={() => {
                            undoDrawing(
                                {
                                    coordinates: storedLocalDrawPaths.sender,
                                    theme: canvasConfigs.sender,
                                },
                                {
                                    coordinates: storedLocalDrawPaths.receiver,
                                    theme: {
                                        lineWidth: canvasConfigs.receiver.lineWidth,
                                        strokeStyle: canvasConfigs.receiver.strokeStyle,
                                    },
                                }
                            );
                        }}
                        sketchPickerColor={sketchPickerColor}
                        canvasConfigs={canvasConfigs}
                        setCanvasConfigs={(config) => {
                            canvasConfigs = config;
                        }}
                        drawShapes={(shapeType) => {
                            selectedShape = shapeType;
                        }}
                        refreshDrawing={() => {
                            // deleting the canvas drawing
                            setStoredCanvasPositions([]);
                            storedLocalDrawPaths.sender = [];
                            storedLocalDrawPaths.receiver = [];
                            clearCanvas();
                            sendClearCanvasEvent();
                        }}
                    />
                </div>
            ) : (
                <></>
            )}
        </React.Fragment>
    );
};
