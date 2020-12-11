import fs from 'fs';
import path from 'path';
import { createModule, gql } from 'graphql-modules';
import { IResolvers, ICustomer } from '../../interfaces/schema-typings';

import CustomerProvider from './providers';
const data = fs.readFileSync(path.join(__dirname, 'schema.graphql'));
const typeDefs = gql(data.toString());

// We will supply Customer specific resolvers here later
const resolvers: IResolvers = {
  Assignment: {
    recipient: async (assignment, params, context): Promise<ICustomer> => {
      const provider = context.injector.get(CustomerProvider);

      return provider.findById(assignment.recipientId);
    },
  },
};

export const Customer = createModule({
  id: 'customers',
  dirname: __dirname,
  typeDefs: typeDefs,
  resolvers,
  providers: [CustomerProvider],
});

export default Customer;
