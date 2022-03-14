import React from "react";

import Header from './components/Header'
import Body from "./components/Body";

import "./app.scss"
import "react-awesome-button/dist/themes/theme-eric.css";

const App = () => {
  return (
    <div className="container">
      <Header/>
      <Body />
    </div>
  )
}

export default App;
