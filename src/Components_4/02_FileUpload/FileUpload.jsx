import React, { useRef, useState } from "react";
import "./style.css";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const uploadRef = useRef();
  const progressRef = useRef();
  const statusRef = useRef();
  const loadRef = useRef();

  const handleUploadFile = () => {
    const selectedFile = uploadRef.current.files[0];
    if (!selectedFile) {
      statusRef.current.innerHTML = "No file selected!";
      return;
    }

    setFile(URL.createObjectURL(selectedFile));

    const formData = new FormData();
    formData.append("image", selectedFile);

    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", handleProgress);
    xhr.addEventListener("load", handleSuccess);
    xhr.addEventListener("error", handleError);
    xhr.addEventListener("abort", handleAbort);

    xhr.open("POST", "https://v2.convertapi.com/upload");
    xhr.send(formData);
  };

  const handleProgress = (event) => {
    if (event.lengthComputable) {
      const percent = Math.round((event.loaded / event.total) * 100);
      progressRef.current.value = percent;
      statusRef.current.innerHTML = `${percent}% uploaded...`;
      loadRef.current.innerHTML = `Uploaded ${event.loaded} of ${event.total} bytes`;
    }
  };

  const handleSuccess = (event) => {
    statusRef.current.innerHTML = "Upload successful!";
    progressRef.current.value = 0;
    loadRef.current.innerHTML = "";
    console.log("Response:", event.target.responseText);
  };

  const handleError = () => {
    statusRef.current.innerHTML = "Upload failed! Please try again.";
    progressRef.current.value = 0;
  };

  const handleAbort = () => {
    statusRef.current.innerHTML = "Upload aborted! Please try again.";
    progressRef.current.value = 0;
  };

  return (
    <div className="file-upload-container">
      <h1>File Upload with Progress Bar</h1>
      <input
        type="file"
        name="file"
        onChange={handleUploadFile}
        ref={uploadRef}
      />

      <label>
        File Progress:{" "}
        <progress ref={progressRef} value="0" max="100"></progress>
      </label>

      <p className="status" ref={statusRef}></p>
      <p className="load" ref={loadRef}></p>

      {file && (
        <img
          src={file}
          alt="Uploaded preview"
          style={{ width: "300px", height: "300px", marginTop: "10px" }}
        />
      )}
    </div>
  );
};

export default FileUpload;
