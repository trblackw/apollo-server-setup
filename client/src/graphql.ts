import gql from 'graphql-tag';

/**
 * QUERIES
 */
const GET_MESSAGES = gql`
   {
      messages {
         id
         from
         message
         created_at
      }
   }
`;

export const QUERIES = { getMessages: GET_MESSAGES };

/**
 * MUTATIONS
 */
const SEND_MESSAGE = gql`
   mutation SendMessage($from: String!, $message: String!) {
      sendMessage(from: $from, message: $message) {
         id
         from
         message
      }
   }
`;

const CLEAR_MESSAGES = gql`
   mutation {
      clearMessages
   }
`;

export const MUTATIONS = { sendMessage: SEND_MESSAGE, clearMessages: CLEAR_MESSAGES };

/**
 * SUBSCRIPTIONS
 */
const MESSAGE_SENT_SUBSCRIPTION = gql`
   subscription {
      messageSent {
         id
         from
         message
      }
   }
`;

export const SUBSCRIPTIONS = { messageSubscription: MESSAGE_SENT_SUBSCRIPTION };
