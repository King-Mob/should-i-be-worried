import Nav from "./Nav";
import { useEffect, useState } from "react";
import { Tags } from "./Tags";
import { postTagTypeRequest, deleteTagTypeRequest } from "../requests";

const Admin = () => {
  const [activeTags, setActiveTags] = useState([]);
  const [newTagName, setNewTagName] = useState("");

  const createTag = () => {
    if (newTagName) {
      postTagTypeRequest(newTagName);
      setNewTagName("");
      location.reload();
    }
  };

  const deleteTag = () => {
    deleteTagTypeRequest(activeTags);
    location.reload();
  };

  return (
    <div>
      <Nav />
      <h2>Admin</h2>
      <h3>Current tags:</h3>
      <Tags activeTags={activeTags} setActiveTags={setActiveTags} />
      <button onClick={deleteTag}>Delete active tags</button>
      <h3>Create new tag:</h3>
      <input
        type="text"
        placeholder="New tag name"
        value={newTagName}
        onChange={(e) => setNewTagName(e.target.value)}
      ></input>
      <button onClick={createTag}>Create new tag</button>
    </div>
  );
};

export default Admin;
