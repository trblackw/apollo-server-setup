 const { ApolloServer , gql } = require ('apollo-server');

type Book = { title: string, author: string }
const books: Book[] = [
   {
     title: 'Harry Potter and the Chamber of Secrets',
     author: 'J.K. Rowling',
   },
   {
     title: 'Jurassic Park',
     author: 'Michael Crichton',
   },
 ];

 const typeDefs = gql`
   type Book {
      title: String
      author: String
   }

   type Query {
      books: [Book]
   }

   type Mutation {
      addBook(title: String!, author: String!): Book!
   }

   input BookInfo {
      title: String
      author: String
   }
 `

const resolvers = {
   Query: {
     books: () => books,
   },
   Mutation: {
      addBook: (_: any, { title, author }: { title: string, author: string }) => {
         const newBook = { title, author };
         return newBook;
      }
   }
 };

//ApolloServer can be started by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
 const server = new ApolloServer({ typeDefs, resolvers });

(async () => {
   const { url } = await server.listen();
   console.log(`🚀  Server ready at ${url}`);
})()