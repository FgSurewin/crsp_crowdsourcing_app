import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { GlobalStyle } from "./style/globalStyle";
import { ThemeProvider } from "styled-components";
import { basicTheme } from "./style/theme";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={basicTheme}>
      <Router>
        <GlobalStyle />
        <App />
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
