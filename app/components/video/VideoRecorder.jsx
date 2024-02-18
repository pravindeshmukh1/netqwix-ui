import {useState } from "react";
import {
  ReactMediaRecorder,
  useReactMediaRecorder,
} from "react-media-recorder";
import { Button } from "reactstrap";
import { Video, VideoOff } from "react-feather";

export const ScreenRecordingInterface = () => {

  const viewRecording = (mediaBlobUrl) => {
    window.open(mediaBlobUrl, "_blank").focus();
    console.log("mediaBlobUrl", mediaBlobUrl);
  };
  return (
    <ReactMediaRecorder
      screen
      video={{
        frameRate: 24, // Lower frame rate to reduce file size and processing
      }}
      render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
        <div>
          <p>Screen Recording Status: {status}</p>
          {status === "idle" && (
            <button
              onClick={startRecording}
              className={`icon-btn btn-light btn-xl button-effect`}
            >
              <Video />
            </button>
          )}
          {status === "recording" && (
            <button
              onClick={(stopRecording)}
              className={`icon-btn btn-light btn-xl button-effect`}
            >
              <VideoOff />
            </button>
          )}
          {/* {status === "stopped" && <video style={{width:"50%", height:"50%"}} src={mediaBlobUrl} controls autoPlay loop />} */}
          {mediaBlobUrl && status && status === "stopped" && (
            <Button
              size="small"
              onClick={viewRecording(mediaBlobUrl)}
              type="primary"
              icon="picture"
              className="viewRecording margin-left-sm"
            >
              View
            </Button>
          )}
        </div>
      )}
    />
  );
};
