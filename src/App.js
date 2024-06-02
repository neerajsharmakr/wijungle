// src/App.js
import React from 'react';
import './App.css';
import VisualCharts from '../src/components/Visual';
import TableDate from '../src/components/Table';
import data from '../src/components/sample/sample-data.json'

import { BrowserRouter as Router, Route, Link, Navigate, Routes } from 'react-router-dom';

const App = ()=>{
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className='H1-div'>
            <h1><Link
              to="/view"
              style={{ color: 'inherit', textDecoration: 'none' }}
              title='Click to view network data in table'
            >
              View
            </Link>
            </h1>
            <h1>Network Dashboard</h1>
            <h1><Link
              to="/visual"
              style={{ color: 'inherit', textDecoration: 'none' }}
              title='Click to network data chart'
            >
              Visual
            </Link>
            </h1>
          </div>
        </header>
        <Routes>
          <Route exact path="/" element={<Navigate replace to="/view" />} />
          <Route path="/view" element={<TableDate data={data} />} />
          <Route path="/visual" element={<VisualCharts data={data} />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
