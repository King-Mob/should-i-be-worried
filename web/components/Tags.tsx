import { useState, useEffect } from "react";
import { getTagTypesRequest } from "../requests";

const Tag = ({ tagId, activeTags, tagName, toggleTag }) => {
  const tagActive = activeTags.includes(tagId);

  return (
    <button
      className={tagActive ? "tag active" : "tag inactive"}
      onClick={() => toggleTag(tagId)}
    >
      {tagName}
    </button>
  );
};

export const Tags = ({ activeTags, setActiveTags }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getTagTypesRequest()
      .then((res) => res.json())
      .then((json) => {
        const { tagTypes } = json;
        setTags(tagTypes.map((tag) => ({ id: tag.id, name: tag.name })));
      });
  }, []);

  const toggleTag = (tagId: number) => {
    if (activeTags.includes(tagId)) {
      const newActiveTags = activeTags.filter((tag) => tag !== tagId);
      setActiveTags(newActiveTags);
    } else {
      const newActiveTags = [tagId, ...activeTags];
      setActiveTags(newActiveTags);
    }
  };

  return (
    <div id="tags-container">
      {tags.map((tag) => (
        <Tag
          tagId={tag.id}
          key={tag.id}
          tagName={tag.name}
          activeTags={activeTags}
          toggleTag={toggleTag}
        />
      ))}
    </div>
  );
};
