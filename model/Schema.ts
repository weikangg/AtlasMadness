import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {}
);

/* Create a Mongoose model for the "user" collection in the MongoDB database. */
const Users = models.user || model('user', UserSchema);

export default Users;
