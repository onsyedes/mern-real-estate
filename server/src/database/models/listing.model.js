const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Listing title is required"],
    },
    description: {
      type: String,
      required: [true, "Listing description is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    regularPrice: {
      type: Number,
      required: [true, "Regular price is required"],
    },
    discountPrice: {
      type: Number,
      required: [true, "Discount price is required"],
    },
    bathrooms: {
      type: Number,
      required: [true, "You need to specify the bathrooms number"],
    },
    bedrooms: {
      type: Number,
      required: [true, "You need to specify the bedrooms number"],
    },
    furnished: {
      type: Boolean,
      required: [
        true,
        "You need to specify whether the listing has furniture or not",
      ],
    },
    parking: {
      type: Boolean,
      required: [
        true,
        "You need to specify whether the listing has parking or not",
      ],
    },
    type: {
      type: String,
      required: [true, "Listing type is required"],
    },
    offer: {
      type: Boolean,
      required: [true, "You need to specify whether there is an offre or not"],
    },
    imageUrls: {
      type: Array,
      required: [true, "Your listing must have at least one picture"],
    },
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Listing", ListingSchema);
