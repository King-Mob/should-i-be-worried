const Nav = () => (
  <div>
    <h1>Should I Be Worried?</h1>
    <div id="page-link-container">
      <p>
        <a href="/">View</a>
      </p>
      <p>
        {" "}
        <a href="/?upload=true">Upload</a>
      </p>
      <p>
        {" "}
        <a href="/?admin=true">Admin</a>
      </p>
    </div>
  </div>
);

export default Nav;
