import gql from 'graphql-tag';
import { buildASTSchema } from 'graphql';


export const schema = buildASTSchema(gql`
  type Query {
    user(id: ID): User
    items: [Item]
    item(id: ID!): Item
  }

  type Mutation {
    createOrder(input: OrderInput!): Bill!
    login(input: LoginInput): String!
    logout(input: LoginInput): String!
  }

  input LoginInput {
    name
  } 

  type Bill {
    items: [Item]
    totalPrice: Float
  } 

  input OrderInput {
    items: [ItemInput]!
  }


  input ItemInput {
    id: ID
    name: String!
    price: Float!
    type: String!
    quantity: Float!
    time: Float!
    prepared: Boolean!
  }

  type Item {
    id: ID
    name: String
    price: Float
    type: String
    time: String
  }

  type User {
    id: ID
    name: String
    type: String
    login: Boolean
  }
`);
