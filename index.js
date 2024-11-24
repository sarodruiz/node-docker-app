import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import redis from "redis";
import RedisStore from "connect-redis";
import cors from "cors";

import { PORT, MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } from "./config/config.js";
import postRouter from "./routes/postRoutes.js";
import userRouter from "./routes/userRoutes.js";

let redisClient = redis.createClient({
  url: `redis://${REDIS_URL}:${REDIS_PORT}`
});
redisClient.connect().then(() => console.log("Successfully connected to Redis")).catch(console.error)

const app = express();

app.use(express.json());

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose.connect(mongoURL)
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((error) => {
    console.log(error);
    setTimeout(connectWithRetry, 5000);
  });
}
connectWithRetry();

app.enable("trust proxy");
app.use(cors({}));
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: SESSION_SECRET,
  cookie: {
    secure: false,
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    maxAge: 30000
  }
}));

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1", (req, res) => {
  res.send("<h1>Hi There</h1>");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
