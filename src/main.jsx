import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.stratz.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJodHRwczovL3N0ZWFtY29tbXVuaXR5LmNvbS9vcGVuaWQvaWQvNzY1NjExOTg4NjMzMTg1MTMiLCJ1bmlxdWVfbmFtZSI6Ik5hdHVyYWxpc3QtLi0iLCJTdWJqZWN0IjoiZDE5MjFlNzQtYzBmZC00YzRlLTljOTctZWQ2YjU2YTdkZTcwIiwiU3RlYW1JZCI6IjkwMzA1Mjc4NSIsIm5iZiI6MTY4MDAyOTUxNSwiZXhwIjoxNzExNTY1NTE1LCJpYXQiOjE2ODAwMjk1MTUsImlzcyI6Imh0dHBzOi8vYXBpLnN0cmF0ei5jb20ifQ.omyLNzWHJzODKHLy2_XBuLZLqOfb3AHWjAe86Xn4nM4"}`,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
