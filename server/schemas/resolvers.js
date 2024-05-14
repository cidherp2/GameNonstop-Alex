const { User, Product, Cart, Games, Favorites } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const stripe = require('stripe')('sk_test_51OCqBSIHMJDsY8j8dZq0fUPBDORHladp9fsLACYR66K02tXbkGHDKNTyEwuLRb5TvEXCNXtqNAwNkgDIDEn3m6Ho00oqXTbVRt');
const YOUR_DOMAIN = 'http://localhost:3000';

const resolvers = {
  Query: {
    profile: async (_, args, context) => {
      if (context.user) {
        return await User.findById(context.user._id);
      }
      throw AuthenticationError;
    },
    order: async (_, { _id }, context) => {
      if (context.user) {
        try {
          const order = await Cart.findById(_id).populate({
            path: "items.product",
            model: "Product",
          });

          if (!order) {
            throw new Error("Orden no encontrada");
          }
          return order;
        } catch (error) {
          console.error(error);
          throw new Error("Error al recuperar la orden");
        }
      }
      throw new Error("Autenticación requerida");
    },
    userOrders: async (_, __, context) => {
      if (!context.user) {
        throw new Error("Autenticación requerida");
      }

      try {
        const user = await User.findById(context.user._id).populate({
          path: "orders",
          populate: {
            path: "items.product",
            model: "Product",
          },
        });
        console.log(user);
        return user.orders;
      } catch (error) {
        throw new Error("Error al obtener las órdenes del usuario");
      }
    },
    products: async () => {
      return await Product.find();
    },
    product: async (_, { _id }) => {
      return await Product.findById(_id);
    },
    favorites: async (_, args, context) => {
      if (context.user._id) {
        return await Favorites.findOne({ user: context.user._id }).populate({
          path: "products.product",
          model: "Product",
        });
      }
    },
    ownedGames: async (_, args, context) => {
      if (context.user._id)
        return await Games.findOne({ user: context.user._id });
    },
  },
  Mutation: {
    register: async (_, args) => {
      // Registration logic...
      try {
        // Check if a user already exists with the given email
        const userToRegister = await User.findOne({
          email: args.email,
        });

        if (userToRegister) {
          throw new Error("Email already in use");
        }

        // Create a new user with the hashed password
        const user = await User.create(args);

        // Create a JWT token for the new user
        const token = signToken(user);

        // Return the auth payload (including the JWT token and user information)
        return { token, user };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (_, { items, total }, context) => {
      if (context.user) {
        // Crear la orden
        const order = await Cart.create({
          user: context.user._id,
          items: items.map((item) => ({
            product: item.productId,
            quantity: item.quantity,
          })),
          total: total,
          isPaid: false,
        });

        console.log(order);

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order._id },
        });

        const populatedOrder = await Cart.findById(order._id).populate({
          path: "items.product",
          model: "Product",
        });
        console.log(populatedOrder);

        return populatedOrder;
      }
      throw new AuthenticationError("Not Authenticated");
    },
    addtoFavorites: async (_, { _id }, context) => {
      if (context.user) {
        // Encontrar el producto a añadir
        const productToAdd = await Product.findById(_id);
        if (!productToAdd) {
          throw new Error("Product not found");
        }

        // Obtener o crear el objeto de favoritos del usuario
        //We find the user, if theres no user we create one document with its id.
        let favorite = await Favorites.findOne({ user: context.user._id });
        if (!favorite) {
          favorite = await Favorites.create({
            user: context.user._id,
            products: [],
          });
          await User.findByIdAndUpdate(context.user._id, {
            wishlist: favorite._id,
          });
        }

        // Añadir el producto a los favoritos si aún no está presente
        if (!favorite.products.includes(_id)) {
          favorite.products.push(_id);
          await favorite.save();
        }

        return productToAdd;
      }
      throw new AuthenticationError("Not Authenticated");
    },

    addGame: async (_, { _id }, context) => {
      if (context.user._id) {
        const gametoAdd = await Product.findById(_id);
        if (!gametoAdd) {
          throw new Error("Game not found");
        }
        let game = await Games.findOne({ user: context.user._id });
        if (!game) {
          game = await Games.create({
            user: context.user._id,
            ownedGames: [],
          });
          await User.findByIdAndUpdate(context.user._id, {
            games: game._id,
          });
        }

        // Añadir el producto a los favoritos si aún no está presente
        if (!game.ownedGames.includes(_id)) {
          game.ownedGames.push(_id);
          await game.save();
        }
        return gametoAdd;
      }
      throw new AuthenticationError("Not Authenticated");
    },
    
    checkout: async (_, { lineItems }) => {
      try {
        console.log('Creating Checkout Session');
        // Use the `lineItems` array to dynamically create products
        const session = await stripe.checkout.sessions.create({
         //payment_method_types: ['oxxo','card'],
          payment_method_types: ['card'],
          line_items: lineItems.map((item) => ({
            price_data: {
              //currency: 'mxn',
              currency: 'usd',
              product_data: {
                name: item.name,
              },
              unit_amount: item.price,
            },
            quantity: item.quantity,
          })),
          mode: 'payment',
          success_url: `${YOUR_DOMAIN}/`,
          cancel_url: `${YOUR_DOMAIN}/`,
        });

        console.log('Checkout Session created successfully');
        return { sessionId: session.id };
      } catch (error) {
        console.error('Error during checkout:', error);
        throw new Error('Error creating Checkout Session: ' + error.message);
      }
    },
  },
};

module.exports = resolvers;
