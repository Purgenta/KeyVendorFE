import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Router from "./router/Router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Router></Router>
      </ChakraProvider>
    </Provider>
  );
}
export default App;
