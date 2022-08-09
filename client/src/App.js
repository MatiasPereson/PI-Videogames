import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllVideogames } from "./actions/index";


import LandingPage from './components/Landing/LandingPage';
import Home from './components/Home/Home';
import CardDetail from './components/CardDetail/CardDetail';
import CreateCard from './components/Create/CreateCard'
import ErrorURL from './components/ErrorURL/ErrorURL';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVideogames());
  }, [dispatch])

  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path={'/home'} component={Home} />
        <Route exact path={'/home/:id'} component={CardDetail} />
        <Route exact path={'/create'} component={CreateCard} />
        <Route path={"*"} component={ErrorURL} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
