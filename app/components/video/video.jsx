"use client";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { EVENTS } from "../../../helpers/events";
import { SocketContext } from "../socket";
import { Popover } from "react-tiny-popover";
import _debounce from "lodash/debounce";

import { MicOff, PauseCircle, Phone, PlayCircle, ExternalLink, Play, Pause } from "react-feather";
import { AccountType, SHAPES } from "../../common/constants";
import { CanvasMenuBar } from "./canvas.menubar";
import { toast } from "react-toastify";
import { max } from "lodash";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

let storedLocalDrawPaths = { sender: [], receiver: [] };
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
let savedPos;
let startPos;
let currPos;
let strikes = [];
let extraStream;
let localVideoRef;
let Peer;
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
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const state = {
    mousedown: false,
  };
  const [selectedClips, setSelectedClips] = useState([]);

  const selectedVideoRef1 = useRef(null);
  const selectedVideoRef2 = useRef(null);
  const progressBarRef = useRef(null);
  const progressBarRef2 = useRef(null);
  const [isPlaying, setIsPlaying] = useState({ isPlayingAll: false, number: "", isPlaying1: false, isPlaying2: false });
  const [maxMin, setMaxMin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);


  useEffect(() => {
    console.log(`fromUser && toUser --- `, fromUser, toUser);
    if (fromUser && toUser) {
      if (typeof navigator !== "undefined") {
        Peer = require("peerjs").default;
      }
      handleStartCall();
      listenSocketEvents();
      initializeLocalStates();
      return () => {
        cutCall();
      };
    }
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
      if (!context) return;
      savedPos = context.getImageData(
        0,
        0,
        document.getElementById("bookings")?.clientWidth,
        document.getElementById("bookings")?.clientHeight
      );
      if (strikes.length >= 10) strikes.shift(); // removing first position if strikes > 10;
      strikes.push(savedPos);
      const mousePos = getMosuePositionOnCanvas(event);
      context.strokeStyle = canvasConfigs.sender.strokeStyle;
      context.lineWidth = canvasConfigs.sender.lineWidth;
      context.lineCap = "round";
      context.beginPath();
      context.moveTo(mousePos.x, mousePos.y);
      context.fill();
      state.mousedown = true;
      startPos = { x: mousePos.x, y: mousePos.y };
    };

    const findDistance = () => {
      let dis = Math.sqrt(
        Math.pow(currPos.x - startPos.x, 2) +
        Math.pow(currPos.y - startPos.y, 2)
      );
      return dis;
    };

    const drawShapes = () => {
      switch (selectedShape) {
        case SHAPES.LINE: {
          context.moveTo(startPos.x, startPos.y);
          context.lineTo(currPos.x, currPos.y);
          break;
        }
        case SHAPES.CIRCLE: {
          let distance = findDistance(startPos, currPos);
          context.arc(startPos.x, startPos.y, distance, 0, 2 * Math.PI, false);
          break;
        }
        case SHAPES.SQUARE: {
          let w = currPos.x - startPos.x;
          let h = currPos.y - startPos.y;
          context.rect(startPos.x, startPos.y, w, h);
          break;
        }
        case SHAPES.RECTANGLE: {
          let w = currPos.x - startPos.x;
          let h = currPos.y - startPos.y;
          context.rect(startPos.x, startPos.y, w, h);
          break;
        }
        case SHAPES.OVAL: {
          const transform = context.getTransform();
          let w = currPos.x - startPos.x;
          let h = currPos.y - startPos.y;
          context.fillStyle = "#FFFFFF";
          context.fillStyle = "rgba(0, 0, 0, 0)";
          const radiusX = w * transform.a;
          const radiusY = h * transform.d;
          if (radiusX > 0 && radiusY > 0) {
            context.ellipse(
              currPos.x,
              currPos.y,
              radiusX,
              radiusY,
              0,
              0,
              2 * Math.PI
            );
            context.fill();
          }
          break;
        }
        case SHAPES.TRIANGLE: {
          context.moveTo(startPos.x + (currPos.x - startPos.x) / 2, startPos.y);
          context.lineTo(startPos.x, currPos.y);
          context.lineTo(currPos.x, currPos.y);
          context.closePath();
          break;
        }
        case SHAPES.ARROW_RIGHT: {
          const arrowSize = 10;
          const direction = Math.atan2(
            currPos.y - startPos.y,
            currPos.x - startPos.x
          );
          // Calculate the coordinates of the arrowhead
          const arrowheadX = currPos.x + length * Math.cos(direction);
          const arrowheadY = currPos.y + length * Math.sin(direction);
          // Draw the line of the arrow
          context.moveTo(startPos.x, startPos.y);
          context.lineTo(currPos.x, currPos.y);
          // Draw the arrowhead
          context.moveTo(arrowheadX, arrowheadY);
          context.lineTo(
            currPos.x - arrowSize * Math.cos(direction - Math.PI / 6),
            currPos.y - arrowSize * Math.sin(direction - Math.PI / 6)
          );
          context.moveTo(currPos.x, currPos.y);
          context.lineTo(
            currPos.x - arrowSize * Math.cos(direction + Math.PI / 6),
            currPos.y - arrowSize * Math.sin(direction + Math.PI / 6)
          );
          context.stroke();
          break;
        }
        case SHAPES.TWO_SIDE_ARROW: {
          const x1 = startPos.x;
          const y1 = startPos.y;
          const x2 = currPos.x;
          const y2 = currPos.y;
          const size = 10;
          const angle = Math.atan2(y2 - y1, x2 - x1);
          const arrowPoints = [
            {
              x: x2 - size * Math.cos(angle - Math.PI / 6),
              y: y2 - size * Math.sin(angle - Math.PI / 6),
            },
            {
              x: x2 - size * Math.cos(angle + Math.PI / 6),
              y: y2 - size * Math.sin(angle + Math.PI / 6),
            },
            {
              x: x1 + size * Math.cos(angle - Math.PI / 6),
              y: y1 + size * Math.sin(angle - Math.PI / 6),
            },
            {
              x: x1 + size * Math.cos(angle + Math.PI / 6),
              y: y1 + size * Math.sin(angle + Math.PI / 6),
            },
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
        }
      }
    };

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
        console.log(`--- drawing ---- `);
        context.strokeStyle = canvasConfigs.sender.strokeStyle;
        context.lineWidth = canvasConfigs.sender.lineWidth;
        context.lineCap = "round";
        context.lineTo(mousePos.x, mousePos.y);
        context.stroke();
      }
    };

    const stopDrawing = (event) => {
      event.preventDefault();
      if (state.mousedown) {
        console.log(`--- stop drawing ---- `);
        sendStopDrawingEvent();
        isDrawing = false;
        state.mousedown = false;
        sendDrawEvent();
      }
    };

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

  useMemo(() => {
    if (
      remoteVideoRef.current &&
      remoteStream &&
      !remoteVideoRef.current.srcObject
    ) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  const initializeLocalStates = () => {
    strikes = [];
    localVideoRef = null;
    selectedShape = null;
  };

  const cutCall = () => {
    console.log(`--- cut call --- `);
    cleanupFunction();
    isClose();
    if (remoteVideoRef && remoteVideoRef.current) {
      socket.emit(EVENTS.VIDEO_CALL.ON_CLOSE, {
        userInfo: { from_user: fromUser._id, to_user: toUser._id },
      });
    }
  };

  const listenSocketEvents = () => {
    // once user joins the call
    socket.on("ON_CALL_JOIN", ({ userInfo }) => {
      console.log(
        ` end user join --- `,
        userInfo,
        peerRef.current,
        fromUser,
        toUser
      );
      const { to_user, from_user } = userInfo;
      if (!(peerRef && peerRef.current)) return;
      connectToPeer(peerRef.current, from_user);
    });

    // Handle signaling events from the signaling server
    socket.on(EVENTS.VIDEO_CALL.ON_OFFER, (offer) => {
      console.log(` -- on OFFER --`);
      peerRef.current?.signal(offer);
    });

    socket.on(EVENTS.VIDEO_CALL.ON_ANSWER, (answer) => {
      console.log(` -- on answer --`);
      peerRef.current?.signal(answer);
    });

    socket.on(EVENTS.VIDEO_CALL.ON_ICE_CANDIDATE, (candidate) => {
      console.log(` -- on ICE candidate --`);
      peerRef.current?.signal(candidate);
    });

    socket.on(EVENTS.ON_CLEAR_CANVAS, () => {
      clearCanvas();
    });

    socket.on(EVENTS.VIDEO_CALL.MUTE_ME, ({ muteStatus }) => {
      if (remoteVideoRef.current && remoteVideoRef.current.srcObject) {
        remoteVideoRef.current.srcObject.getAudioTracks()[0].enabled =
          muteStatus;
      }
    });

    socket.on(EVENTS.VIDEO_CALL.STOP_FEED, ({ feedStatus }) => {
      if (remoteVideoRef.current && remoteVideoRef.current.srcObject) {
        remoteVideoRef.current.srcObject.getVideoTracks()[0].enabled =
          feedStatus;
      }
    });

    socket.on(EVENTS.EMIT_DRAWING_CORDS, ({ strikes }) => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      if (!context || !canvas) return;
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
      cleanupFunction();
    });
  };

  const getMosuePositionOnCanvas = (event) => {
    if (
      event.clientX ||
      event.clientY ||
      (event?.touches && event?.touches[0])
    ) {
      const clientX = event?.clientX || event?.touches[0]?.clientX;
      const clientY = event?.clientY || event?.touches[0]?.clientY;
      const { offsetLeft, offsetTop } = event.target;
      const canvasX = clientX - (offsetLeft || (mediaQuery.matches ? 100 : 50));
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
    // console.clear();
    console.log(`--- handleStartCall ---`);
    const startVideoCall = async () => {
      try {
        const stream = await navigator.mediaDevices
          .getUserMedia({
            video: true,
            audio: true,
          })
          .catch((err) => {
            toast.error(
              "Please allow media permission to microphone and camera for video call..."
            );
            console.log(`unable to access video call ---- `, err);
          });
        // setLocalStream(stream);
        setDisplayMsg({
          showMsg: true,
          msg: `Waiting for ${toUser?.fullname}  to join...`,
        });

        videoRef.current.srcObject = stream;
        // setLocalVideoRef(stream);
        // localVideoRef = { srcObject: stream };
        const peer = new Peer(fromUser._id);
        peerRef.current = peer;
        peer.on("open", (id) => {
          socket.emit("ON_CALL_JOIN", {
            userInfo: { from_user: fromUser._id, to_user: toUser._id },
          });
          console.log("My peer ID is: " + id);
        });
        peer.on("error", (error) => {
          console.error(`error ---`, error);
        });

        // Handle incoming voice/video connection
        peer.on("call", (call) => {
          console.log(`incoming call ----`);
          call.answer(stream); // Answer the call with an A/V stream.
          call.on("stream", (remoteStream) => {
            setDisplayMsg({ showMsg: false, msg: "" });
            console.log(
              `onCall: setting remoteStream here for initially connected user ---- `
            );
            setRemoteStream(remoteStream);
          });
        });
      } catch (error) {
        toast.error(
          "Please allow media permission to microphone and camera for video call..."
        );
        console.error("Error accessing media devices:", error);
      }
    };
    startVideoCall().then(() => { });
  };

  // Initiate outgoing connection
  let connectToPeer = (peer, peerId) => {
    console.log(`Connecting to ${peerId}...`);

    // let conn = peer.connect(peerId);
    // conn.on('data', (data) => {
    //     console.log(`received: ${data}`);
    // });
    // conn.on('open', () => {
    //     conn.send('hi!');
    // });

    // navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    // .then((stream) => {
    if (!(videoRef && videoRef?.current)) return;
    let call = peer.call(peerId, videoRef?.current?.srcObject);
    call.on("stream", (remoteStream) => {
      console.log(`setting remoteStream for 2nd user here ---- `);
      setDisplayMsg({ showMsg: false, msg: "" });
      setRemoteStream(remoteStream);
    });
    // })
    // .catch((err) => {
    //     console.log('Failed to get local stream', err);
    // });
  };

  const sendDrawEvent = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (!(event && event.target)) return;
        const binaryData = event.target.result;
        console.log(`emit draw event---`);
        socket.emit(EVENTS.DRAW, {
          userInfo: { from_user: fromUser._id, to_user: toUser._id },
          // storedEvents,
          // canvasConfigs,
          strikes: binaryData,
        });
      };
      reader.readAsArrayBuffer(blob);
    });
  };

  const sendStopDrawingEvent = () => {
    if (remoteVideoRef && remoteVideoRef.current) {
      socket.emit(EVENTS.STOP_DRAWING, {
        userInfo: { from_user: fromUser._id, to_user: toUser._id },
      });
    }
  };

  const sendClearCanvasEvent = () => {
    if (remoteVideoRef && remoteVideoRef.current) {
      socket.emit(EVENTS.EMIT_CLEAR_CANVAS, {
        userInfo: { from_user: fromUser._id, to_user: toUser._id },
      });
    }
  };

  function handlePeerDisconnect() {
    if (!(peerRef && peerRef.current)) return;
    console.log(
      `peerRef.current.connections --- `,
      peerRef.current.connections
    );
    // manually close the peer connections
    for (let conns in peerRef.current.connections) {
      peerRef.current.connections[conns].forEach((conn, index, array) => {
        console.log(
          `closing ${conn.connectionId} peerConnection (${index + 1}/${array.length
          })`,
          conn.peerConnection
        );
        conn.peerConnection.close();

        // close it using peerjs methods
        if (conn.close) conn.close();
      });
    }
  }

  const cleanupFunction = () => {
    handlePeerDisconnect();
    let videorefSrc = videoRef.current || localVideoRef;
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

    let videorefSrcRemote = remoteVideoRef.current;
    if (remoteVideoRef && videorefSrcRemote && videorefSrcRemote.srcObject) {
      const availableTracks = videorefSrcRemote.srcObject.getTracks();
      const availableVideoTracks = videorefSrcRemote.srcObject.getVideoTracks();
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

  const sendEmitUndoEvent = useCallback(_debounce(sendDrawEvent, 500), []);

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
      sendEmitUndoEvent();
    }
  };
  const mediaQuery = window.matchMedia('(min-width: 768px)')

  const renderCallActionButtons = () => {
    return (
      <div className="call-action-buttons z-50 my-3 " >
        <div
          className={`icon-btn ${isMuted ? "btn-danger" : "btn-light"
            } ${mediaQuery.matches ? "btn-xl" : "btn-sm"} button-effect mic`}
          onClick={() => {
            if (remoteVideoRef && remoteVideoRef.current) {
              socket.emit(EVENTS.VIDEO_CALL.MUTE_ME, {
                userInfo: { from_user: fromUser._id, to_user: toUser._id },
                isClicked: !isMuted,
              });
              setIsMuted(!isMuted);
            }
          }}
        >
          <MicOff />
        </div>
        <div
          className={`icon-btn btn-light  button-effect ${mediaQuery.matches ? "btn-xl" : "btn-sm"} ml-3`}
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
            if (remoteVideoRef && remoteVideoRef.current) {
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
          className={`icon-btn btn-danger button-effect ${mediaQuery.matches ? "btn-xl" : "btn-sm"}  ml-3`}
          onClick={() => {
            cutCall();
          }}
        >
          <Phone />
        </div>
        {(!displayMsg?.showMsg && accountType === AccountType.TRAINER) && <div
          className={!maxMin ? `icon-btn btn-light  button-effect  ${mediaQuery.matches ? "btn-xl" : "btn-sm"}  ml-3` : `icon-btn btn-danger  button-effect  ${mediaQuery.matches ? "btn-xl" : "btn-sm"}  ml-3`}
          onClick={() => {
            // socket.emit(EVENTS.ON_VIDEO_SHOW, {
            //   userInfo: { from_user: fromUser._id, to_user: toUser._id },
            //   isClicked: !maxMin,
            // });
            // setMaxMin(!maxMin)
            if (selectedClips?.length) {
              setIsOpenConfirm(true)
            } else {
              setIsOpen(true)
            }
          }}
        >
          <ExternalLink />
        </div>}


        {(selectedClips?.length && accountType === AccountType.TRAINER) ? <div
          className={`icon-btn btn-light  button-effect ${mediaQuery.matches ? "btn-xl" : "btn-sm"} ml-3`}
          onClick={() => { togglePlay("all") }}
        >
          {(isPlaying?.isPlayingAll) ? <PauseCircle /> : <PlayCircle />}
        </div> : <></>}

        <Modal isOpen={isOpenConfirm} toggle={() => { setIsOpenConfirm(false) }}>
          <ModalHeader toggle={() => { setIsOpenConfirm(false) }} close={() => <></>}>Confirm</ModalHeader>
          <ModalBody>
            Are you sure you want to exit clip analysis mode?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => {
              setSelectedClips([])
              setIsOpenConfirm(false)
            }}>
              Confirm
            </Button>{' '}
            <Button color="secondary" onClick={() => { setIsOpenConfirm(false) }}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  useEffect(() => {
    socket.emit(EVENTS.ON_VIDEO_SELECT, {
      userInfo: { from_user: fromUser._id, to_user: toUser._id },
      videos: selectedClips,
    });
  }, [selectedClips?.length])

  socket.on(EVENTS.ON_VIDEO_PLAY_PAUSE, ({ isPlayingAll, number, isPlaying1, isPlaying2 }) => {
    if (number === "all") {
      if (!isPlayingAll) {
        selectedVideoRef1?.current?.pause();
        selectedVideoRef2?.current?.pause();
      } else {
        selectedVideoRef1?.current?.play();
        selectedVideoRef2?.current?.play();
      }
    }
    if (number === "one") {
      if (!isPlaying1) selectedVideoRef1?.current?.pause();
      else selectedVideoRef1?.current?.play();
    }
    if (number === "two") {
      if (!isPlaying2) selectedVideoRef2?.current?.pause();
      else selectedVideoRef2?.current?.play();
    }
    setIsPlaying({ isPlayingAll, number, isPlaying1, isPlaying2 })
  });

  socket.on(EVENTS.ON_VIDEO_TIME, ({ clickedTime, number }) => {
    if (selectedVideoRef1.current) {
      if (number === "one") selectedVideoRef1.current.currentTime = clickedTime;
      else selectedVideoRef2.current.currentTime = clickedTime;
    }
  });

  socket.on(EVENTS.ON_VIDEO_SELECT, ({ videos }) => {
    setSelectedClips(videos)
  });


  socket.on(EVENTS.ON_VIDEO_SHOW, ({ isClicked }) => {
    setMaxMin(isClicked)
  });

  console.log("isPlayingisPlaying", isPlaying);

  const togglePlay = (num) => {
    var temp = isPlaying
    temp.number = num;
    if (num === "all") {
      if (isPlaying.isPlayingAll) {
        selectedVideoRef1?.current?.pause();
        selectedVideoRef2?.current?.pause();
      } else {
        selectedVideoRef1?.current?.play();
        selectedVideoRef2?.current?.play();
      }
      temp = { ...isPlaying, isPlayingAll: !isPlaying.isPlayingAll, isPlaying1: !isPlaying.isPlayingAll, isPlaying2: !isPlaying.isPlayingAll }
    } else if (num === "one") {
      if (isPlaying.isPlaying1) selectedVideoRef1?.current?.pause();
      else selectedVideoRef1?.current?.play();
      temp = { ...isPlaying, isPlaying1: !isPlaying.isPlaying1 }
    } else if (num === "two") {
      if (isPlaying?.isPlaying2) selectedVideoRef2?.current?.pause();
      else selectedVideoRef2.current.play();
      temp = { ...isPlaying, isPlaying2: !isPlaying.isPlaying2 }
    }

    socket?.emit(EVENTS?.ON_VIDEO_PLAY_PAUSE, {
      userInfo: { from_user: fromUser?._id, to_user: toUser?._id },
      ...temp,
    });
    setIsPlaying({ ...temp })
  };

  const handleTimeUpdate = () => {
    progressBarRef.current.value = selectedVideoRef1?.current?.currentTime;
    progressBarRef2.current.value = selectedVideoRef2?.current?.currentTime;
    // Convert currentTime to minutes and seconds
    // const minutes = Math?.floor(progress / 60);
    // const seconds = Math?.floor(progress % 60);
    // console?.log(`Current Time: ${minutes}:${seconds}`);
  };

  const handleProgressBarClick = (e, number) => {
    var clickedTime;
    if (number === "one") {
      clickedTime = (e?.nativeEvent?.offsetX / progressBarRef?.current?.offsetWidth) * progressBarRef?.current.getAttribute('max');
      selectedVideoRef1.current.currentTime = clickedTime;
    } else {
      clickedTime = (e?.nativeEvent?.offsetX / progressBarRef2?.current?.offsetWidth) * progressBarRef2?.current.getAttribute('max');
      selectedVideoRef2.current.currentTime = clickedTime;
    }

    socket?.emit(EVENTS?.ON_VIDEO_TIME, {
      userInfo: { from_user: fromUser?._id, to_user: toUser?._id },
      clickedTime: clickedTime,
      number: number
    });
  };

  return (
    <React.Fragment>
      <canvas
        id="drawing-canvas"
        width={document.getElementById("bookings")?.clientWidth}
        height={document.getElementById("bookings")?.clientHeight}
        className="canvas-print absolute all-0"
        ref={canvasRef} style={{ left: 0, top: 0, width: "100%", height: "100%" }}
      />
      <div className="row" style={{ height: "100%", display: "flex", alignItems: "center" }}>

        {/* 1 */}
        {accountType === AccountType.TRAINER ?
          <div className="col-lg-1 col-md-1 col-sm-12 z-50">
            <div>
              <CanvasMenuBar
                isOpen={isOpen}
                setIsOpen={setIsOpen}
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
                  storedLocalDrawPaths.sender = [];
                  storedLocalDrawPaths.receiver = [];
                  clearCanvas();
                  sendClearCanvasEvent();
                }}
                selectedClips={selectedClips}
                setSelectedClips={setSelectedClips}
              />
            </div>
          </div> :
          <div className="col-lg-1 col-md-6 col-sm-12 "></div>
        }

        {/* 2 */}
        {
          <div className="col-lg-8 col-md-8 col-sm-12 " id="third" style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-around", flexDirection: "column" }}>
            <div className="no-user-joined font-weight-bold text-center" style={{ margin: displayMsg?.msg ? 'auto' : '' }}>{displayMsg?.msg}</div>
            {selectedClips?.length != 0 &&
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <video style={{ width: "inherit", borderRadius: 10 }} ref={selectedVideoRef1} onTimeUpdate={handleTimeUpdate} >
                    <source src={`https://netquix.s3.ap-south-1.amazonaws.com/${selectedClips[0]?._id}`} type="video/mp4" />
                  </video>
                  <div style={{ position: "relative", zIndex: 9999, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div className="external-control-bar">
                      <button className="btn btn-primary px-1 py-1 my-3 mr-2" onClick={() => togglePlay("one")}>{(isPlaying?.isPlaying1 || isPlaying?.isPlayingAll) ? <Pause style={{ verticalAlign: "middle" }} /> : <Play style={{ verticalAlign: "middle" }} />}</button>
                    </div>
                    <progress className="progress"
                      ref={progressBarRef}
                      value="0"
                      max={selectedVideoRef1.current ? selectedVideoRef1.current.duration : 100}
                      onClick={(e) => handleProgressBarClick(e, "one")}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <video style={{ width: "inherit", borderRadius: 10 }} ref={selectedVideoRef2} onTimeUpdate={handleTimeUpdate}>
                    <source src={`https://netquix.s3.ap-south-1.amazonaws.com/${selectedClips[1]?._id}`} type="video/mp4" />
                  </video>
                  <div style={{ position: "relative", zIndex: 9999, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div className="external-control-bar">
                      <button className="btn btn-primary px-1 py-1 my-3 mr-2 " onClick={() => togglePlay("two")}>{(isPlaying?.isPlaying2 || isPlaying?.isPlayingAll) ? <Pause style={{ verticalAlign: "middle" }} /> : <Play style={{ verticalAlign: "middle" }} />}</button>
                    </div>
                    <progress className="progress"
                      ref={progressBarRef2}
                      value="0"
                      max={selectedVideoRef2.current ? selectedVideoRef2.current.duration : 100}
                      onClick={(e) => handleProgressBarClick(e, "two")}
                    />
                  </div>
                </div>
              </div>
            }
            <div className={selectedClips?.length != 0 && "scs"}>
              <video ref={remoteVideoRef} playsInline autoPlay className="rounded " style={{ width: '100%', height: selectedClips?.length === 0 && 450 }} id="end-user-video" />
            </div>
            <div className={"scs2"}>
              {videoRef && (<video id="end-user-video" playsInline muted className="rounded " style={{ width: '100%' }} ref={videoRef} autoPlay />)}
            </div>
            {renderCallActionButtons()}
          </div>
        }

        {console.log(selectedClips?.length)}
        {/* 3 */}
        < div className={"col-lg-3 col-md-3 col-sm-12 "} style={mediaQuery.matches ? { textAlign: "end" } : { textAlign: "end", display: "flex", justifyContent: "space-between" }} >
          <div style={!maxMin ? { height: 350 } : { width: "100%", textAlign: "center", display: "block" }}>
          </div>
          <div style={{ width: "100%", textAlign: "center" }}>

          </div>
        </div>
      </div>
    </React.Fragment >
  );
};
