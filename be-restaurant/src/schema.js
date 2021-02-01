import gql from 'graphql-tag';
import { buildASTSchema } from 'graphql';


export const schema = buildASTSchema(gql`
  type Query {
    user(id: ID): User
    items: [Item]
    item(id: ID!): Item
    orders: [Order]
  }

  type Mutation {
    createOrder(input: OrderInput!): Bill!
    login(input: LoginInput): Authorized!
    logout(input: LoginInput): String!
  }

  type Authorized {
    authorized: Boolean
  }

  type Bill {
    items: [Item]
    totalPrice: Float
  } 

  input LoginInput {
    name: String!
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
    prepared: Boolean
  }

  type Order { 
    id: ID
    items: [Item]
  }

  type Item {
    id: ID
    name: String
    price: Float
    type: String
    time: Float
  }

  type User {
    id: ID
    name: String
    type: String
    login: Boolean
  }
`);
