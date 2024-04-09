import { postImageRequest } from "../requests";
import { useState } from "react";
import Nav from "./Nav";
import { Tags } from "./Tags";

const Upload = () => {
  const [uploadedImages, setUploadedImages] = useState<FileList>();
  const [activeTags, setActiveTags] = useState([]);

  const sendImages = (images: FileList) => {
    const formData = new FormData();
    formData.append("image", images[0]);
    activeTags.forEach((tagId) => {
      formData.append("tags", tagId);
    });
    postImageRequest(formData);
  };

  const objectUrl = uploadedImages
    ? URL.createObjectURL(uploadedImages[0])
    : "";

  return (
    <div>
      <Nav />
      <h2>Upload</h2>
      <p>Uploaded Image: {uploadedImages ? uploadedImages[0].name : ""}</p>
      <input
        type="file"
        name="file"
        onChange={(event) => {
          setUploadedImages(event.target.files);
        }}
      ></input>
      {uploadedImages && <img src={objectUrl} />}
      <Tags activeTags={activeTags} setActiveTags={setActiveTags} />
      <button
        id="upload-button"
        disabled={!uploadedImages}
        onClick={() => sendImages(uploadedImages)}
      >
        upload
      </button>
    </div>
  );
};

export default Upload;
