import React from "react";
import { ToastContainer } from "react-toastify";
import Routes from "./routes";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
function App() {
  return (
    <div className="App">
      <ToastContainer
        position="bottom-center"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />

      <Routes />
    </div>
  );
}

export default App;
