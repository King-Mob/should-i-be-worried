import Nav from "./Nav";
import { useEffect, useState } from "react";
import { Tags } from "./Tags";
import { getImageIdsRequest, getImageRequest } from "../requests";

const View = () => {
  const [activeTags, setActiveTags] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const getImages = async (ids: number[]) => {
    const images = [];

    for (const id of ids) {
      const imageResponse = await getImageRequest(id);
      const imageBlob = await imageResponse.blob();

      console.log(imageBlob);

      const imageUrl = URL.createObjectURL(imageBlob);
      images.push(imageUrl);
    }

    setImageUrls(images);
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
      {imageUrls.map((image) => (
        <img src={image} key={image} />
      ))}
    </div>
  );
};

export default View;
