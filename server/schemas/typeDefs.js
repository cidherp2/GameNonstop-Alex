const typeDefs = `
  type Product {
    _id: ID
    name: String
    image: String
    quantity: Int
    price: Float
    category: String
  }

  type Cart {
    _id: ID
    purchaseDate: String
    items: [CartItem]
    total: Float
    isPaid: Boolean
    stripePaymentIntentId: String
    paymentDate: String
  }

  type CartItem {
    product: Product
    quantity: Int
  }

  type Games {
    user: ID!
    ownedGames: [ID!]
  }

  type User {
    _id: ID
    username: String!
    email: String!
    wishlist: Favorites
    orders: [Cart]
    games: Games 
  }

  type Favorites {
    _id: ID!
    products: [Product]
  }

  type CheckoutSession {
    sessionId: ID
  }

  type Auth {
    token: String
    user: User
  }

  input ProductInput {
    _id: ID
    purchaseQuantity: Int
    name: String
    image: String
    price: Float
    quantity: Int
  }

  input CatrInput {
    productId: ID!
    quantity: Int!
  }

  input LineItemInput {
    name: String!
    price: Int!
    quantity: Int!
  }

  type Query {
    profile: User
    order(_id: [ID!]!): Cart 
    products: [Product]
    product(_id: ID!): Product
    userOrders(_id: ID!): [Cart] 
    favorites: Favorites
    ownedGames: Games
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addtoFavorites(_id: ID!): Product
    addOrder(_id: ID!, items: [CatrInput!]!, total: Float!): Cart
    addGame(_id: ID!): Product
    checkout(lineItems: [LineItemInput!]!): CheckoutSession
  }
`;

module.exports = typeDefs;
