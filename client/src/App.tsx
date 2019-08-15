import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_BOOK_TITLES = gql`
   query getBookTiles {
      books {
         title
      }
   }
`

const App: React.FC = () => {
   const { loading, error, data } = useQuery(GET_BOOK_TITLES);
   if (!error) {
      console.log(data)
   }
  return loading ? <div>Loading...</div> : (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
