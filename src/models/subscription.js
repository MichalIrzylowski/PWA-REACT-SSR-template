import { Schema, model } from "mongoose";

const subscriptionSchema = Schema({
  endpoint: { type: String, unique: true },
  keys: {
    p256dh: String,
    auth: String
  }
});

const Subscription = model("Subscription", subscriptionSchema);

export default Subscription;
