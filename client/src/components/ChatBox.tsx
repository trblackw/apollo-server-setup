import React, { FormEvent, useEffect, FC, useRef, useState, Fragment, ChangeEvent } from 'react';
import styled from 'styled-components';
import useInputValue from '../hooks/useInputValue';
import { RouteComponentProps } from '@reach/router';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { QUERIES, MUTATIONS, SUBSCRIPTIONS } from '../graphql';

interface Message {
   id: number;
   from: string;
   message: string;
}
interface NewMessage {
   from: string;
   message: string;
}
interface Props extends RouteComponentProps {}
const ChatBox: FC<Props> = (): JSX.Element => {
   const { loading, error, data } = useQuery(QUERIES.getMessages),
      [sendMessage] = useMutation(MUTATIONS.sendMessage),
      [clearMessages] = useMutation(MUTATIONS.clearMessages),
      //@ts-ignore
      {data: subdata, loading: subLoading } = useSubscription(SUBSCRIPTIONS.messageSubscription),
      [newMessage, setNewMessage] = useState<NewMessage>({
         from: 'Tucker',
         message: ''
      }),
      inputRef = useRef<HTMLInputElement>(null);


   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      sendMessage({ variables: { from: newMessage.from, message: newMessage.message } });
      //@ts-ignore
      clearInput();
      setNewMessage((prev: any) => ({ ...prev, message: '' }));
   };
   const clearInput = () => inputRef && inputRef.current && (inputRef.current.value = '');

   const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
      e.persist();
      setNewMessage(prevMessage => ({ ...prevMessage, [e.target.name]: e.target.value }));
   };

   return (
      <Container>
         <MessageListContainer>
            {!subLoading && subdata.messageSent.message}
            {data.messages && (
               <MessageList>
                  {data.messages.map(({ from, message, id }: Message): JSX.Element => (
                     <Fragment key={id}>
                        <li>{message}</li>
                        <br />
                        <TimeStamp>{from}</TimeStamp>
                        <Hr />
                     </Fragment>
                  ))}
               </MessageList>
            )}
         </MessageListContainer>
         <Form onSubmit={handleSubmit}>
            {/* <Input placeholder='Author' value={newMessage.author} onChange={handleInput} name='author' /> */}
            <Input placeholder='Message' ref={inputRef} value={newMessage.message} onChange={handleInput} name='message' />
            <Button type='submit'>Send</Button>
         </Form>
         <Button type='button' color='hsl(0, 61%, 50%)' onClick={() => clearMessages()}>
            Clear all
         </Button>
      </Container>
   );
};

export default ChatBox;

const Container = styled.div`
   margin: 5em auto;
   padding: 1.5em;
   min-height: 500px;
   background-color: #dcdcdc;
   border-radius: 5px;
   box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.09);
   position: relative;
   width: 90%;
   max-width: 1000px;
`;

const TimeStamp = styled.span`
   color: hsl(0, 0%, 41%);
   font-size: smaller;
   display: inline-block;
   margin-bottom: 1em;
`;

const Hr = styled.hr`
   height: 1px;
   border: none;
   color: #b5b5b5;
   background-color: #b5b5b5;
   margin-bottom: .5em;
`;

const Form = styled.form.attrs(({ ref }) => ref)`
   padding: 1em;
   margin: 1.5em;
   background: transparent;
   display: flex;
   align-content: center;
   align-items: center;
   flex-direction: row;
   justify-content: center;
`;

const Input = styled.input.attrs(({ ref, placeholder, name }) => ({ type: 'text', ref, placeholder, name }))`
  padding: 1em;
  color: #2d2d2d;
  background: whitesmoke;
  width: 100%;
  border: none;
  border-radius: 3px;
`;

const Button = styled.button.attrs(({ type }) => ({ type }))`
   margin-left: .5em;
   padding: 4px 5px;
   border-radius: 4px;
   width: 70px;
   border: none;
   height: 35px;
   box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.09);
   background-color: ${({ color = 'hsl(0, 0%, 45%)' }) => color};
   color: whitesmoke;
   &:hover {
      cursor: pointer;
   }
`;

const MessageListContainer = styled.div`
   margin: 1em 1.3em 0 1.3em;
   padding: 1em;
   border-radius: 5px;
   text-align: left;
   background: white;
   min-height: 300px;
   max-height: 300px;
   overflow-y: scroll;
`;

const MessageList = styled.ul`list-style: none;`;
