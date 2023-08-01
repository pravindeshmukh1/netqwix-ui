"use client"
import React, { useContext, useEffect, useRef, useState } from "react"
import SimplePeer from 'simple-peer';
import Image from 'next/image'
import { EVENTS } from '../../../helpers/events';
import { SocketContext } from "../socket";
import { MicOff, Pause, PauseCircle, Phone, PlayCircle, RefreshCw } from "react-feather";
import { AccountType } from "../../common/constants";

let storedLocalDrawPaths = { sender: [], receiver: [] };
let XAndYCoordinates = [];
// default setup;
let isDrawing = false;
let isVideoMuted = true;

export const HandleVideoCall = ({ accountType, fromUser, toUser, isClose }) => {
    const socket = useContext(SocketContext);
    const [remoteStream, setRemoteStream] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isFeedStopped, setIsFeedStopped] = useState(false);
    const [displayMsg, setDisplayMsg] = useState({ showMsg: false, msg: '' });
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const state = {
        mousedown: false
    };

    const windowsRef = useRef(null);

    const removeVideoRef = useRef(null);
    const peerRef = useRef(null);
    const canvasConfigs = {
        sender: {
            strokeStyle: 'red',
            lineWidth: 5,
            lineCap: 'round',
        },
        receiver: {
            strokeStyle: 'green',
            lineWidth: 5,
            lineCap: 'round',

        }
    }

    // TODO: type missing
    const [storedEvents, setStoredEvents] = useState([]);
    const [storedPositions, setStoredCanvasPositions] = useState([]);

    useEffect(() => {
        windowsRef.current = window;
        handleStartCall();
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (!context) return;

        const drawFrame = () => {
            if (canvas && context && video) {
                //   context.drawImage(video, 0, 0, canvas.width, canvas.height);
                context.fillStyle = 'rgba(255, 255, 255, 0.5)';
                context.fillRect(0, 0, canvas.width, canvas.height);
            }
            requestAnimationFrame(drawFrame);
        }

        const startDrawing = (event) => {
            event.preventDefault();
            isDrawing = true;
            console.log(`--- start drawing ---- `);
            if (!context) return;
            storedEvents.length = 0;
            storedEvents.push([event.offsetX, event.offsetY])
            const mousePos = getMosuePositionOnCanvas(event);
            context.strokeStyle = canvasConfigs.sender.strokeStyle;
            context.lineWidth = canvasConfigs.sender.lineWidth;
            XAndYCoordinates = [];
            // XAndYCoordinates.push({ x: mousePos.x, y: mousePos.y })
            XAndYCoordinates.push([mousePos.x, mousePos.y])
            context.lineCap = 'round';
            context.beginPath();
            context.moveTo(mousePos.x, mousePos.y);
            context.fill();
            state.mousedown = true;
        }

        const draw = (event) => {
            event.preventDefault();
            const mousePos = getMosuePositionOnCanvas(event);
            if (!isDrawing || !context || !state.mousedown) return;
            // XAndYCoordinates.push({ x: mousePos.x, y: mousePos.y })
            XAndYCoordinates.push([event.offsetX, event.offsetY])
            console.log(`--- drawing ---- `);
            context.strokeStyle = canvasConfigs.sender.strokeStyle;
            context.lineWidth = canvasConfigs.sender.lineWidth;
            context.lineCap = 'round';
            storedEvents.push([event.offsetX, event.offsetY])
            if (storedEvents && storedEvents.length) {
                storedPositions.push([event.offsetX, event.offsetY]);
            }

            setStoredEvents(storedEvents);
            context.lineTo(mousePos.x, mousePos.y);
            context.stroke();
        }

        const stopDrawing = (event) => {
            event.preventDefault();
            if (storedEvents && storedEvents.length && state.mousedown) {
                console.log(`--- stop drawing ---- `, XAndYCoordinates);
                if (XAndYCoordinates && XAndYCoordinates.length) {
                    storedLocalDrawPaths.sender.push(XAndYCoordinates);
                }
                sendStopDrawingEvent();
                sendDrawEvent(storedEvents);
                storedPositions.length = 0;
                setStoredCanvasPositions([]);
                setStoredEvents([]);
                setTimeout(() => {
                    console.log(`storedLocalDrawPaths -- `, storedLocalDrawPaths);
                }, 2000);
                isDrawing = false;
                state.mousedown = false;
            }
        }

        const startMobileDrawing = (event) => {
            event.preventDefault();
            storedEvents.length = 0;
            const mousePos = getMosuePositionOnCanvas(event);
            if (!context) return;
            XAndYCoordinates = [];
            // XAndYCoordinates.push({ x: mousePos.x, y: mousePos.y })
            XAndYCoordinates.push([mousePos.x, mousePos.y])
            context.beginPath();
            context.moveTo(mousePos.x, mousePos.y);
            context.lineWidth = canvasConfigs.sender.lineWidth;
            context.strokeStyle = canvasConfigs.sender.strokeStyle;
            context.fill();
            isDrawing = true;
            storedEvents.push([mousePos.x, mousePos.y])
            setStoredEvents(storedEvents);
        }

        const drawMobile = (event) => {
            event.preventDefault();
            if (isDrawing) {
                const mousePos = getMosuePositionOnCanvas(event);
                // XAndYCoordinates.push({ x: mousePos.x, y: mousePos.y })
                XAndYCoordinates.push([mousePos.x, mousePos.y])
                if (!context) return;
                context.lineTo(mousePos.x, mousePos.y);
                storedEvents.push([mousePos.x, mousePos.y])
                setStoredEvents(storedEvents);
                context.stroke();
            }
        }

        const stopMobileDrawing = (event) => {
            event.preventDefault();
            if (!context) return;
            if (isDrawing) {
                storedLocalDrawPaths.sender.push(XAndYCoordinates);
                context.stroke();
                sendStopDrawingEvent();
                sendDrawEvent(storedEvents);
            }
            isDrawing = false;
        }



        // allowing trainer to draw
        if (canvas && accountType === AccountType.TRAINER) {
            // for mobile
            canvas.addEventListener('touchstart', startMobileDrawing);
            canvas.addEventListener('touchmove', drawMobile);
            canvas.addEventListener('touchend', stopMobileDrawing);
            // for web
            canvas.addEventListener('mousedown', startDrawing);
            canvas.addEventListener('mousemove', draw);
            canvas.addEventListener('mouseup', stopDrawing);
            canvas.addEventListener('mouseout', stopDrawing);
        }

        return () => {
            video?.removeEventListener('play', drawFrame);
        };

    }, []);

    useEffect(() => {
        if (removeVideoRef.current && remoteStream) {
            removeVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);


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
        })

        socket.on(EVENTS.VIDEO_CALL.MUTE_ME, ({ muteStatus }) => {
            if (removeVideoRef.current && removeVideoRef.current.srcObject) {
                removeVideoRef.current.srcObject.getAudioTracks()[0].enabled = muteStatus;
            }
        })

        socket.on(EVENTS.VIDEO_CALL.STOP_FEED, ({ feedStatus }) => {
            if (removeVideoRef.current && removeVideoRef.current.srcObject) {
                removeVideoRef.current.srcObject.getVideoTracks()[0].enabled = feedStatus;
            }
        })

        socket.on(EVENTS.EMIT_DRAWING_CORDS, ({ storedEvents }) => {
            console.log(`--- got coordinates for drawings ---- `, storedLocalDrawPaths);
            if (storedEvents && Array.isArray(storedEvents)) {
                storedLocalDrawPaths.receiver.push(storedEvents);
            }
            const canvas = canvasRef.current;
            const context = canvas?.getContext('2d');
            if (!context) return;
            context.strokeStyle = canvasConfigs.receiver.strokeStyle;
            context.lineWidth = canvasConfigs.receiver.lineWidth;
            context.lineCap = 'round';
            context.beginPath();
            let lastX = storedEvents && Array.isArray(storedEvents) && Array.isArray(storedEvents[0]) && storedEvents[0][0];
            let lastY = storedEvents && Array.isArray(storedEvents) && Array.isArray(storedEvents[0]) && storedEvents[0][1];
            if (lastX && lastY) {
                context?.moveTo(lastX, lastY);
                for (let positions in storedEvents) {
                    const currentX = storedEvents[positions][0];
                    const currentY = storedEvents[positions][1];
                    context.fillStyle = 'rgba(255, 255, 255, 0.5)';
                    context.lineTo(currentX, currentY);
                    context.stroke();
                }
            }
        });

        socket.on(EVENTS.ON_UNDO, ({ sender, receiver }) => {
            storedLocalDrawPaths.receiver = [];
            storedLocalDrawPaths.sender = [];
            storedLocalDrawPaths.sender = receiver;
            storedLocalDrawPaths.receiver = sender;
            undoDrawing({ coordinates: sender, theme: canvasConfigs.receiver, }, { coordinates: receiver, theme: { lineWidth: canvasConfigs.sender.lineWidth, strokeStyle: canvasConfigs.sender.strokeStyle } }, false);
        });

        socket.on(EVENTS.VIDEO_CALL.ON_CLOSE, () => {
            setDisplayMsg({ showMsg: true, msg: `${toUser?.fullname} left the meeting, redirecting back to home screen in 5 seconds...` });
            cleanupFunctionV2();
        })
    }



    const getMosuePositionOnCanvas = (event) => {
        if ((event.clientX || event.clientY) || event?.touches && event?.touches[0]) {
            const clientX = event.clientX || event?.touches[0]?.clientX;
            const clientY = event.clientY || event?.touches[0]?.clientY;
            const { offsetLeft, offsetTop } = event.target;
            const canvasX = clientX - offsetLeft;
            const canvasY = clientY - offsetTop;
            return { x: canvasX, y: canvasY };
        }

    }

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (!context || !canvas) return;
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    const handleStartCall = () => {
        console.log(`--- handleStartCall ---`)
        const startVideoCall = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,

                }).catch((err) => {
                    console.log(`unable to access video call ---- `, err);
                });
                // setLocalStream(stream);
                setDisplayMsg({ showMsg: true, msg: `Waiting for ${toUser?.fullname}  to join...` });
                videoRef.current.srcObject = stream;

                const peer = new SimplePeer({
                    initiator: true,
                    // trickle: false,
                    stream
                });

                peerRef.current = peer;

                peer.on(EVENTS.VIDEO_CALL.ON_SIGNAL, (offer) => {
                    // Send the offer to the signaling server
                    socket.emit(EVENTS.VIDEO_CALL.ON_OFFER, { offer, userInfo: { from_user: fromUser._id, to_user: toUser._id } });
                });

                peer.on(EVENTS.VIDEO_CALL.ON_STREAM, (stream) => {
                    setDisplayMsg({ showMsg: false, msg: '' });
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
                console.error('Error accessing media devices:', error);
            }
        };
        startVideoCall().then(() => { });
        listenSocketEvents();
    }





    const sendDrawEvent = (storedEvents) => {
        if (removeVideoRef && removeVideoRef.current) {
            socket.emit(EVENTS.DRAW, { userInfo: { from_user: fromUser._id, to_user: toUser._id }, storedEvents });
        }
    }

    const sendStopDrawingEvent = () => {
        if (removeVideoRef && removeVideoRef.current) {
            socket.emit(EVENTS.STOP_DRAWING, { userInfo: { from_user: fromUser._id, to_user: toUser._id } });
        }
    }

    const sendClearCanvasEvent = () => {
        if (removeVideoRef && removeVideoRef.current) {
            socket.emit(EVENTS.EMIT_CLEAR_CANVAS, { userInfo: { from_user: fromUser._id, to_user: toUser._id } });
        }
    }

    const cleanupFunctionV2 = () => {
        let videorefSrc = videoRef.current;
        if (videoRef && videorefSrc && videorefSrc.srcObject) {
            const availableTracks = videorefSrc.srcObject.getTracks();
            const availableVideoTracks = videorefSrc.srcObject.getVideoTracks();
            for (let videoRefIndex = 0; videoRefIndex < availableTracks.length; videoRefIndex++) {
                const track = availableTracks[videoRefIndex];
                track.stop();
            }

            for (let videoRefIndex = 0; videoRefIndex < availableVideoTracks.length; videoRefIndex++) {
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

    const undoDrawing = async (senderConfig, extraCoordinateConfig, removeLastCoordinate = true) => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (!context || !canvas) return;
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (removeLastCoordinate) storedLocalDrawPaths.sender.splice(-1, 1);
        // draw all the paths in the paths array
        await senderConfig.coordinates.forEach((path) => {
            context.beginPath();
            context.strokeStyle = senderConfig.theme.strokeStyle;
            context.lineWidth = senderConfig.theme.lineWidth;
            context.lineCap = 'round';
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
            context.lineCap = 'round';

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

        // sending event to end user
        if (removeLastCoordinate) {
            socket.emit(EVENTS.EMIT_UNDO, { sender: storedLocalDrawPaths.sender, receiver: extraCoordinateConfig.coordinates, userInfo: { from_user: fromUser._id, to_user: toUser._id } })
        }
    }


    const renderActionItems = () => {
        return (
            videoRef && removeVideoRef ?
                <div className=" z-50 ml-2 absolute bottom-0 right-2 mb-4">
                    <div className="flex">
                        <div
                            className={`icon-btn btn-light  button-effect btn-xl mr-3`}
                            onClick={() => {
                                undoDrawing({ coordinates: storedLocalDrawPaths.sender, theme: canvasConfigs.sender, }, { coordinates: storedLocalDrawPaths.receiver, theme: { lineWidth: canvasConfigs.receiver.lineWidth, strokeStyle: canvasConfigs.receiver.strokeStyle } });
                            }}
                        >

                            <Image
                                src="/icons/undo.png"
                                width={25}
                                height={25}
                                alt="Undo"
                            />
                        </div>
                        <div
                            className={`icon-btn btn-light  button-effect btn-xl mr-3`}
                            onClick={() => {
                                // deleting the canvas drawing
                                setStoredCanvasPositions([]);
                                storedLocalDrawPaths.sender = [];
                                storedLocalDrawPaths.receiver = [];
                                clearCanvas();
                                sendClearCanvasEvent()
                            }}
                        >
                            <RefreshCw />
                        </div>
                    </div>
                </div> : <></>
        )
    }


    const renderCallActionButtons = () => {
        return (
            <div className="call-action-buttons z-50 ml-2  absolute bottom-0  z-50">
                <div
                    className={`icon-btn btn-light  button-effect btn-xl mr-3`}
                    onClick={() => {
                        setIsFeedStopped(!isFeedStopped)
                        if (removeVideoRef && removeVideoRef.current) {
                            socket.emit(EVENTS.VIDEO_CALL.STOP_FEED, { userInfo: { from_user: fromUser._id, to_user: toUser._id }, feedStatus: isFeedStopped });
                        }
                    }}
                >
                    {!isFeedStopped ? <PauseCircle /> : <PlayCircle />}
                </div>
                <div
                    className="icon-btn btn-danger button-effect btn-xl  mr-3"
                    onClick={() => {
                        cleanupFunctionV2();
                        isClose();
                        if (removeVideoRef && removeVideoRef.current) {
                            socket.emit(EVENTS.VIDEO_CALL.ON_CLOSE, { userInfo: { from_user: fromUser._id, to_user: toUser._id } });
                        }
                    }}
                >
                    <Phone />
                </div>
                <div
                    className={`icon-btn ${isMuted ? 'btn-danger' : 'btn-light'} btn-xl button-effect mic`}
                    onClick={() => {
                        setIsMuted(!isMuted)
                        if (removeVideoRef && removeVideoRef.current) {
                            socket.emit(EVENTS.VIDEO_CALL.MUTE_ME, { userInfo: { from_user: fromUser._id, to_user: toUser._id }, muteStatus: isMuted });
                        }
                    }}
                >
                    <MicOff />
                </div>
            </div>

        )
    }

    return (
        <React.Fragment>
            {(displayMsg.showMsg) ? <div className="no-user-joined">
                {displayMsg.msg}
            </div> : <></>}
            <div className="flex">
                <div className="absolute z-50 bottom-0 left-21">
                    <div className="flex items-center">
                        <div>
                            {videoRef &&
                                <video muted={isVideoMuted} id='end-user-video' playsInline className="rounded z-50" ref={videoRef} autoPlay />}
                        </div>
                    </div>
                </div>
                <div className="ml-2">
                    {removeVideoRef &&
                        <div className="bg-white" id="remote-user">
                            <canvas width={windowsRef.current ? windowsRef.current.innerWidth : 500}
                                height={windowsRef.current ? windowsRef.current.innerHeight : 500}
                                className="canvas-print absolute all-0" ref={canvasRef}></canvas>
                            {/* <video muted={isVideoMuted} ref={removeVideoRef} playsInline autoPlay 
                            // width={windowsRef.current ? windowsRef.current.innerWidth : 500}
                            //     height={windowsRef.current ? windowsRef.current.innerHeight : 500} 
                                className="videoBg" id="video" ></video> */}
                            <video ref={removeVideoRef} playsInline autoPlay
                                //  width={windowsRef.current ? windowsRef.current.innerWidth : 500}
                                // height={windowsRef.current ? windowsRef.current.innerHeight : 500} 
                                className="bg-video" id="video" ></video>
                        </div>
                    }
                </div>
            </div>
            {/* action buttons */}
            {accountType === AccountType.TRAINER && renderActionItems()}
            {/* call cut and mute options */}
            {renderCallActionButtons()}

        </React.Fragment>
    )
}