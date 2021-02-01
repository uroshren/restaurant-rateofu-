import React from "react";
import { GraphQLClient, ClientContext } from 'graphql-hooks'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import styled from 'styled-components';

import { Home } from "./components/Home.jsx";
import { AdminPanel } from "./components/AdminPanel.jsx";


const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
`;
const NavTab = styled.div`
  margin-right: 16px;
`;


const client = new GraphQLClient({
  url: 'http://localhost:3000/graphql'
})

function App() {
  return (
    <ClientContext.Provider value={client}>
      <AppWrapper>
      <Router>
        <div>
          <Header>
            <NavTab>
              <Link to="/">Home</Link>
            </NavTab>
            <NavTab>
              <Link to="/adminpanel">AdminPanel</Link>
            </NavTab>
          </Header>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/adminpanel" component={AdminPanel} />
          </Switch>
          </div>
        </Router>
      </AppWrapper>
    </ClientContext.Provider>
  );
}

export default App;
