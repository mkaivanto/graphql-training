import { ApolloServer } from 'apollo-server';
import { createApplication } from 'graphql-modules';
import AssignmentModule from './modules/assignments';
import OperationsModule from './modules/operations';
import CommonModule from './modules/common';
import Database from './models/Database';

async function start(): Promise<void> {
  // Initialize GraphQL modules
  const application = createApplication({
    modules: [CommonModule, AssignmentModule, OperationsModule],
  });

  // This is the aggregated schema
  const schema = application.createSchemaForApollo();

  // Initialize database. Sequelize creates tables on bootstrapping
  const db = Database.instance;
  await db.init();

  // Start the server
  const server = new ApolloServer({
    schema,
  });
  const { url } = await server.listen();
  console.log(`🚀 Server ready at ${url}`);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
start();
