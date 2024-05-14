const db = require("./connection");
const {Product} = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("Product", "products");

  await Product.insertMany([
    {
      name: "Half-Life 2",
      image:
        "https://media.rawg.io/media/games/b8c/b8c243eaa0fbac8115e0cdccac3f91dc.jpg",
      price: 60.99,
      category: "Action",
    },
    {
      name: "PAYDAY 2",
      image:
        "https://media.rawg.io/media/games/73e/73eecb8909e0c39fb246f457b5d6cbbe.jpg",
      price: 60.99,
      category: "Action",
    },
    {
      name: "Red Dead Redemption 2",
      image:
        "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg",
      price: 60.99,
      category: "Action",
    },
    {
      name: "Portal",
      image:
        "https://media.rawg.io/media/games/7fa/7fa0b586293c5861ee32490e953a4996.jpg",
      price: 60.99,
      category: "Adventure",
    },
    {
      name: "Destiny 2",
      image:
        "https://media.rawg.io/media/games/34b/34b1f1850a1c06fd971bc6ab3ac0ce0e.jpg",
      price: 60.99,
      category: "Destiny 2",
    },
    {
      name: "Grand Theft Auto V",
      image:
        "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
      price: 60.99,
      category: "Action",
    },
    {
      name: "Counter-Strike: Global Offensive",
      image:
        "https://media.rawg.io/media/games/736/73619bd336c894d6941d926bfd563946.jpg",
      price: 60.99,
      category: "Action",
    },
    {
      name: "God of War (2018)",
      image:
        "https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg",
      price: 60.99,
      category: "RPG",
    },
    {
      name: "Tomb Raider (2013)",
      image:
        "https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg",
      price: 60.99,
      category: "Adventure",
    },
    {
      name: "Limbo",
      image:
        "https://media.rawg.io/media/games/942/9424d6bb763dc38d9378b488603c87fa.jpg",
      price: 60.99,
      category: "Adventure",
    },
    {
      name: "Metro 2033",
      image:
        "https://media.rawg.io/media/games/120/1201a40e4364557b124392ee50317b99.jpg",
      price: 60.99,
      category: "Action",
    },
    {
      name: "The Walking Dead: Season 1",
      image:
        "https://media.rawg.io/media/games/8d6/8d69eb6c32ed6acfd75f82d532144993.jpg",
      price: 60.99,
      category: "Adventure",
    },
    {
      name: "Apex Legends",
      image:
        "https://media.rawg.io/media/games/b72/b7233d5d5b1e75e86bb860ccc7aeca85.jpg",
      price: 60.99,
      category: "Shooter",
    },
    {
      name: "Grand Theft Auto IV",
      image:
        "https://media.rawg.io/media/games/4a0/4a0a1316102366260e6f38fd2a9cfdce.jpg",
      price: 60.99,
      category: "Action",
    },
    {
      name: "Borderlands 2",
      image:
        "https://media.rawg.io/media/games/49c/49c3dfa4ce2f6f140cc4825868e858cb.jpg",
      price: 60.99,
      category: "RPG",
    },
    {
      name: "Cyberpunk 2077",
      image:
        "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg",
      price: 60.99,
      category: "Action",
    },
    {
      name: "Left 4 Dead 2",
      image:
        "https://media.rawg.io/media/games/d58/d588947d4286e7b5e0e12e1bea7d9844.jpg",
      price: 60.99,
      category: "Action",
    },
    {
      name: "DOOM (2016)",
      image:
        "https://media.rawg.io/media/games/c4b/c4b0cab189e73432de3a250d8cf1c84e.jpg",
      price: 60.99,
      category: "Action",
    },
    {
      name: "Team Fortress 2",
      image:
        "https://media.rawg.io/media/games/46d/46d98e6910fbc0706e2948a7cc9b10c5.jpg",
      price: 60.99,
      category: "Action",
    },
    {
      name: "Middle-earth: Shadow of Mordor",
      image:
        "https://media.rawg.io/media/games/d1a/d1a2e99ade53494c6330a0ed945fe823.jpg",
      price: 60.99,
      category: "RPG",
    },
  ]);

  console.log("products seeded");

  process.exit();
});
