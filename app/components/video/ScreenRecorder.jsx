import React, { useRef, useState } from "react";
import RecordRTC from "recordrtc";

const ScreenRecorder = () => {
  const videoRef = useRef(null);
  const [recorder, setRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        audio: true,
        // video: true,
        screen: true,
      });
      const newRecorder = RecordRTC(stream, {
        type: "video",
        // recorderType:
        //   MediaStreamRecorder || CanvasRecorder || StereoAudioRecorder || Etc,
      });

      setRecorder(newRecorder);
      setIsRecording(true);

      newRecorder.startRecording();
    } catch (error) {
      console.error("Error accessing screen recording:", error);
    }
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stopRecording(() => {
        const blob = recorder.getBlob();
        const videoURL = URL.createObjectURL(blob);
        videoRef.current.src = videoURL;

        setIsRecording(false);
      });
    }
  };

  return (
    <div>
      <video ref={videoRef} controls  /> 
      {/* muted={!isRecording} */}
      {!isRecording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}
    </div>
  );
};

export default ScreenRecorder;
