import { useRef } from "react";
import { FileFormates } from "./constants";
const UploadFile = ({ onChange, name, key, values, clearFile,isDisable }) => {
  const fileInputRef = useRef();
  const handleFileSelect = () => {
    fileInputRef?.current?.click();
  };
  return (
    <>
      {values ? (
        <div className="border border-dark rounded mt-2">
          <i
            className="fa fa-times pointer"
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "14%",
              top: "42%",
            }}
            onClick={clearFile}
          />
          <img
            className="bg-img rounded mt-1"
            src={values}
            alt="Avatar"
            width={44}
            height={38}
          />
        </div>
      ) : (
        <div
          className="d-flex border border-dark rounded p-10 mt-2"
          onClick={handleFileSelect}
        >
          <input
            key={key}
            type="file"
            disabled={isDisable}
            ref={fileInputRef}
            name={name}
            style={{ display: "none" }}
            onChange={onChange}
            accept={FileFormates.image}
          />
          <h2 className="fa fa-cloud-upload" aria-hidden="true" />
        </div>
      )}
    </>
  );
};

export default UploadFile;
