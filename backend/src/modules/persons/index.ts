import fs from 'fs';
import path from 'path';
import { createModule, gql } from 'graphql-modules';
import { IResolvers } from '../../interfaces/schema-typings';

import PersonProvider from './providers';
const data = fs.readFileSync(path.join(__dirname, 'schema.graphql'));
const typeDefs = gql(data.toString());

// We will supply Person specific resolvers here later
const resolvers: IResolvers = {};

export const Person = createModule({
  id: 'persons',
  dirname: __dirname,
  typeDefs: typeDefs,
  resolvers,
  providers: [PersonProvider],
});

export default Person;
