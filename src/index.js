import React from "react";
import { render } from "react-dom";
import Router from "./components/Router";
import "./css/style.css";
// diferencia entre los curly brackets y no, nada mas es agarrar un pedacito como el render

// best practice tener components en diferentes files
// importarlo a la file porque no lo encuentra
render(<Router />, document.querySelector("#main"));
