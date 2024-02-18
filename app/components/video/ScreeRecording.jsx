import { Badge, Button, Col, Row } from "reactstrap";
import {
  ReactMediaRecorder,
  useReactMediaRecorder,
} from "react-media-recorder";
import { useState } from "react";

// const ScreenRecording = ({
//   screen,
//   audio,
//   video,
//   downloadRecordingPath,
//   downloadRecordingType,
//   emailToSupport,
// }) => {
//   const [recordingNumber, setRecordingNumber] = useState(0);
//   const RecordView = () => {
//     const {
//       status,
//       startRecording: startRecord,
//       stopRecording: stopRecord,
//       mediaBlobUrl,
//     } = ReactMediaRecorder({ screen, audio, video }); // audio, video,

//     const startRecording = () => {
//       return startRecord();
//     };

//     const stopRecording = () => {
//       const currentTimeSatmp = new Date().getTime();
//       setRecordingNumber(currentTimeSatmp);
//       return stopRecord();
//     };

//     const viewRecording = () => {
//       window.open(mediaBlobUrl, "_blank").focus();
//     };

//     const downloadRecording = () => {
//       const pathName = `${downloadRecordingPath}_${recordingNumber}.${downloadRecordingType}`;
//       try {
//         if (window.navigator && window.navigator.msSaveOrOpenBlob) {
//           // for IE
//           window.navigator.msSaveOrOpenBlob(mediaBlobUrl, pathName);
//         } else {
//           // for Chrome
//           const link = document.createElement("a");
//           link.href = mediaBlobUrl;
//           link.download = pathName;
//           document.body.appendChild(link);
//           link.click();
//           document.body.removeChild(link);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     const mailRecording = () => {
//       try {
//         window.location.href = `mailTo:${emailToSupport}?subject=Screen recording for an Issue number ${recordingNumber}&body=Hello%20Team,%0D%0A%0D%0A${mediaBlobUrl}`;
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     return (
//       <Row>
//         <Col span="12" style={{ lineHeight: "24px" }}>
//           {status && status !== "stopped" && (
//             <h2>Screen Recording Status: {status && status.toUpperCase()}</h2>
//           )}
//           {status && status === "recording" && (
//             <Badge
//               className="screen-recording-badge"
//               color="#faad14"
//               status="processing"
//               offset={[2, 0]}
//               style={{
//                 marginLeft: "5px",
//               }}
//             />
//           )}
//         </Col>
//         <Col span="12" style={{ textAlign: "right" }}>
//           {status && status !== "recording" && (
//             <Button
//               size="small"
//               onClick={startRecording}
//               type="primary"
//               icon="play-circle"
//               className="margin-left-sm"
//               ghost
//             >
//               {mediaBlobUrl ? "Record again" : "Record your Problem"}
//             </Button>
//           )}
//           {status && status === "recording" && (
//             <Button
//               size="small"
//               onClick={stopRecording}
//               type="danger"
//               icon="stop"
//               className="margin-left-sm"
//               ghost
//             >
//               Stop Recording
//             </Button>
//           )}
//           {mediaBlobUrl && status && status === "stopped" && (
//             <Button
//               size="small"
//               onClick={viewRecording}
//               type="primary"
//               icon="picture"
//               className="viewRecording margin-left-sm"
//             >
//               View
//             </Button>
//           )}
//           {downloadRecordingType &&
//             mediaBlobUrl &&
//             status &&
//             status === "stopped" && (
//               <Button
//                 size="small"
//                 onClick={downloadRecording}
//                 type="primary"
//                 icon="download"
//                 className="downloadRecording margin-left-sm"
//               >
//                 Download
//               </Button>
//             )}
//           {emailToSupport && mediaBlobUrl && status && status === "stopped" && (
//             <Button
//               size="small"
//               onClick={mailRecording}
//               type="primary"
//               icon="mail"
//               className="mailRecording margin-left-sm"
//             >
//               Email To Support
//             </Button>
//           )}
//         </Col>
//       </Row>
//     );
//   };
//   return (
//     <div className="Scren-Record-Wrapper" style={{ padding: "5px 20px" }}>
//       {RecordView()}
//     </div>
//   );
// };
// export default ScreenRecording;


 const ScreenRecording = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: true, // enable audio recording
    video: true, // enable video recording
    screen:true // disable video recording
  });

  const viewRecording = (mediaBlobUrl) => {
    if(mediaBlobUrl) window.open(mediaBlobUrl, "_blank").focus();
    console.log("mediaBlobUrl", mediaBlobUrl);
  };

  return (
    <div>
    {status}
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
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
      <audio src={mediaBlobUrl} controls />
      <video src={mediaBlobUrl} controls  style={{width:"120px",height:"120px"}}/>
      <screen src={mediaBlobUrl} controls />
    </div>
  );
}; 
export default ScreenRecording;