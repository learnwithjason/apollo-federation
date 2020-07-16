const { ApolloServer } = require('apollo-server');
const { ApolloGateway, RemoteGraphQLDataSource } = require('@apollo/gateway');

const gateway = new ApolloGateway({
  serviceList: [
    {
      name: 'FreeAssociationService',
      url: 'http://localhost:4003',
    },
    {
      name: 'users',
      url: 'http://localhost:5000/',
    },
  ],
});

async function start() {
  const server = new ApolloServer({
    gateway,
    subscriptions: false,
  });

  server.listen(4004).then(() => console.log('running'));
}

start();
