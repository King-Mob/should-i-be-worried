import Upload from "./Upload";
import View from "./View";
import Admin from "./Admin";
import "../styles/app.css";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const upload = urlParams.get("upload");
const admin = urlParams.get("admin");

const App = () => {
  if (upload) return <Upload />;
  if (admin) return <Admin />;
  else return <View />;
};

export default App;
