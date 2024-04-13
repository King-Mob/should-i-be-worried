import Nav from "./Nav";
import { useEffect, useState } from "react";
import { Tags } from "./Tags";
import {
  getImageIdsRequest,
  getImageRequest,
  deleteImageRequest,
} from "../requests";

const View = () => {
  const [activeTags, setActiveTags] = useState([]);
  const [imageData, setImageData] = useState([]);

  const getImages = async (ids: number[]) => {
    const images = [];

    for (const id of ids) {
      const imageResponse = await getImageRequest(id);
      const imageBlob = await imageResponse.blob();

      console.log(imageBlob);

      const imageUrl = URL.createObjectURL(imageBlob);
      images.push({ url: imageUrl, id });
    }

    setImageData(images);
  };

  const deleteImage = (id: number) => {
    deleteImageRequest(id);
    setActiveTags([...activeTags]);
  };

  useEffect(() => {
    getImageIdsRequest(activeTags)
      .then((res) => res.json())
      .then((json) => {
        getImages(json.imageIds);
      });
  }, [activeTags]);

  return (
    <div>
      <Nav />
      <h2>View</h2>
      <Tags activeTags={activeTags} setActiveTags={setActiveTags} />
      {imageData.map((image) => (
        <div className="image-container">
          <img src={image.url} key={image.id} />
          <button
            onClick={() => deleteImage(image.id)}
            className="delete-button"
          >
            Delete image
          </button>
        </div>
      ))}
    </div>
  );
};

export default View;
