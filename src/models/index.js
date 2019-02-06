import mongoose from "mongoose";
import Subscription from "./subscription";

mongoose.set("debug", true);
mongoose.Promise = Promise;

mongoose.connect(
  "mongodb://localhost:27017/PWA_training",
  {
    keepAlive: true,
    useNewUrlParser: true
  }
);

export { Subscription };
