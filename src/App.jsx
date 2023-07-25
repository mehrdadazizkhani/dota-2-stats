import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Layout from "./components/layout/Layout";
import PlayerPage from "./pages/PlayerPage";

const client = new ApolloClient({
  uri: "https://api.stratz.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJodHRwczovL3N0ZWFtY29tbXVuaXR5LmNvbS9vcGVuaWQvaWQvNzY1NjExOTg4NjMzMTg1MTMiLCJ1bmlxdWVfbmFtZSI6Ik5hdHVyYWxpc3QtLi0iLCJTdWJqZWN0IjoiZDE5MjFlNzQtYzBmZC00YzRlLTljOTctZWQ2YjU2YTdkZTcwIiwiU3RlYW1JZCI6IjkwMzA1Mjc4NSIsIm5iZiI6MTY4MDAyOTUxNSwiZXhwIjoxNzExNTY1NTE1LCJpYXQiOjE2ODAwMjk1MTUsImlzcyI6Imh0dHBzOi8vYXBpLnN0cmF0ei5jb20ifQ.omyLNzWHJzODKHLy2_XBuLZLqOfb3AHWjAe86Xn4nM4"}`,
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/player/:id" element={<PlayerPage />} />
          </Route>
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
