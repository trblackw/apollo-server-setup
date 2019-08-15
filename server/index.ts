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
 `

const resolvers = {
   Query: {
     books: () => books,
   },
 };

//ApolloServer can be started by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
 const server = new ApolloServer({ typeDefs, resolvers });

(async () => {
   const { url } = await server.listen();
   console.log(`🚀  Server ready at ${url}`);
})()