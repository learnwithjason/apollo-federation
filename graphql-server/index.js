const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

const typeDefs = gql`
  type Query {
    getAllFreeAssociations: [FreeAssociation!]!
  }

  type FreeAssociation {
    id: ID!
    word: String!
    association: String!
  }

  type Mutation {
    addFreeAssociation(word: String!, association: String!): Boolean!
  }
`;

let data = [
  {
    id: 1,
    word: 'Alex',
    association: 'is cool',
  },
];

function addFreeAssociation({ word, association }) {
  data = data.concat({
    id: data.length + 1,
    word,
    association,
  });

  return true;
}

const resolvers = {
  Query: {
    getAllFreeAssociations: () => {
      return data;
    },
  },
  Mutation: {
    addFreeAssociation: (_, { word, association }) => {
      return addFreeAssociation({ word, association });
    },
  },
};

async function start() {
  const server = new ApolloServer({
    schema: buildFederatedSchema([
      {
        typeDefs,
        resolvers,
      },
    ]),
  });

  server.listen(4003).then(({ url }) => {
    console.log(`server is running at ${url}`);
  });
}

start();
