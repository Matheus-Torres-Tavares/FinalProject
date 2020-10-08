// const { Schema, model } = require("mongoose");
const PLM = require("passport-local-mongoose");

// const userSchema = new Schema(
//   {
//     email: String,
//     name: String,
//     googleId: String,
//     imageUrl: String,
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//   }
// );

// userSchema.plugin(PLM, { usernameField: "email" });

// module.exports = model("User", userSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      googleId: String,
      required: true,
      trim: true,
      minlength: 3,
    },

    bio: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
    },
    email: String
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.plugin(PLM, { usernameField: "email" });

const User = mongoose.model("User", userSchema);

module.exports = User;
