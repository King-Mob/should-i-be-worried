import Upload from "./Upload";
import View from "./View";
import "../styles/app.css";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const upload = urlParams.get("upload");

const App = () => {
  if (upload) return <Upload />;
  else return <View />;
};

export default App;
