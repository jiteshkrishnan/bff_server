const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');

const app = express();

// Mock user data for demonstration purposes
const users = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
  { id: '3', name: 'Charlie', email: 'charlie@example.com' }
];

// Define your GraphQL schema
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    # Add any other fields you want for a user
  }

  type Query {
    users: [User!]!
  }
`;

// Define resolver functions
const resolvers = {
  Query: {
    users: () => users
  }
};

app.get('/users', function (req, res) {  
       res.json(users);  
    })  
    
// Create an instance of ApolloServer with path
const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(()=>{

    server.applyMiddleware({ app, path: '/gw/graphql' });

    // Start the server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server ready at http://localhost:${PORT}`);
    });
    
})

