// Importing Env Variables
require("dotenv").config();

// Libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

// configs
import googleAuthConfig from "./src/config/google.config";
import routeConfig from "./src/config/route.config";

// microservice routes
import Auth from "./src/API/Auth";
import Restaurant from "./src/API/Restaurant";
import Food from "./src/API/Food";
import Image from "./src/API/Image";
import Order from "./src/API/orders";
import Reviews from "./src/API/reviews";
import User from "./src/API/User";
import Menu from "./src/API/menu";
import MailService from "./src/API/Mail";
import Payments from "./src/API/Payments";

// Database connection
import ConnectDB from "./src/database/connection";

const zomato = express();

console.log(process.env);

// application middlewares
zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet());
zomato.use(cors());
zomato.use(passport.initialize());
zomato.use(passport.session());

// passport cofiguration
googleAuthConfig(passport);
routeConfig(passport);

// Application Routes
zomato.use("/auth", Auth);
zomato.use("/restaurant", Restaurant);
zomato.use("/food", Food);
zomato.use("/image", Image);
zomato.use("/order", Order);
zomato.use("/reviews", Reviews);
zomato.use("/user", User);
zomato.use("/menu", Menu);
zomato.use("/mail", MailService);
zomato.use("/payments", Payments);

zomato.get("/", (req, res) => res.json({ message: "Setup success" }));

const port = process.env.PORT || 4000;

zomato.listen(port, () =>
  ConnectDB()
    .then(() => console.log("Server is running 🚀"))
    .catch(() =>
      console.log("Server is running, but database connection failed... ")
    )
);
