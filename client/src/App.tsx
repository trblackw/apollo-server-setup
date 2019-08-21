import React, { useState, ChangeEvent, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_MESSAGES = gql`
   {
      messages {
         author
      }
   }
`;

const ADD_BOOK = gql`
   mutation AddBook($title: String!, $author: String!) {
      addBook(title: $title, author: $author) {
         title
         author
      }
   }
`;

const App: React.FC = () => {
   const { loading, error, data } = useQuery(GET_MESSAGES);
   // const [addBook, { data: book }] = useMutation(ADD_BOOK);
   // const [newBook, setNewBook] = useState<{ title: string; author: string }>({ title: '', author: '' });

   // useEffect(() => {
   //    console.log('ADDED BOOK', book)
   // }, [book])

   // const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
   //    e.persist()
   //    setNewBook(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
   // };

   // const handleAddBook = () => {
   //    debugger;
   //    addBook({ variables: { title: newBook.title, author: newBook.author }})
   // }
   if (!error) {
      console.log(data);
   }
   // return loading ? (
   //    <div>Loading...</div>
   // ) : 
   return loading ? <div>Loading...</div> : (
      <div className='App'>
         <header className='App-header'>
           <div>hey</div>
         </header>
      </div>
   );
};

export default App;
