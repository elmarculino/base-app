import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';
import { withFilter } from 'graphql-subscriptions';

import { schema as sqlSchema, resolvers as sqlResolvers } from './sql/schema';
import { pubsub } from './subscriptions';

const rootSchema = [
  `
type Query {
  # Authenticated users can information retrieve about themselves
  me: User

  # Only admins can retrieve info about given users
  user(id: ID!): User
}

type Mutation {
  # Everyone can signup
  signup(email: String!, password: String!, admin: Boolean): AuthPayload!

  # Everyone can login
  login(email: String!, password: String!): AuthPayload!

  # Users can only update their own passwords
  # if 'userId' is set, the user trying to update the password needs to be an admin
  updatePassword(oldPassword: String, newPassword: String!, userId: ID): User!

}

type AuthPayload {
  token: String!
  user: User!
}

# The 'User' type is a reduced version ("mask") of the 'User'
# type from the data model (and database schema).
# It does not expose the 'password' and 'role' fields.
type User {
  id: ID!
  createdAt: String!
  email: String!
  password: String!
}

schema {
  query: Query
  mutation: Mutation
}
`
];

const rootResolvers = {
  Query: {
    me(root, args, context, { cacheControl }) {
      cacheControl.setCacheHint({ maxAge: 60 });
      return context.user || null;
    },
    user(root, args, context, info) {
      return true;
    }
  },
  Mutation: {}
};

// Put schema together into one array of schema strings
// and one map of resolvers, like makeExecutableSchema expects
const schema = [...rootSchema];
const resolvers = merge(rootResolvers);

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers
});

export default executableSchema;
