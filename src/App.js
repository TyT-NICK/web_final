import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.scss';

import Header from './components/header/header';
import RoutedMain from './components/RoutedMain';
import Footer from './components/footer/footer';

function App() {
  return (
    <>
      <Router>
        <Header />
        <RoutedMain />
        <Footer />
      </Router>
    </>
  );
}

export default App;
