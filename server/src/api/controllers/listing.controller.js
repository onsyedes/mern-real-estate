const { listingModel } = require("../../database");
const { asyncErrorHandler, CustomError } = require("../../utils");

module.exports.addlisting = asyncErrorHandler(async (req, res, next) => {
  const {
    title,
    description,
    address,
    regularPrice,
    discountPrice,
    bedrooms,
    bathrooms,
    furnished,
    parking,
    type,
    offer,
    imageUrls,
  } = {
    ...req.body,
  };

  const creactedListing = await listingModel.create({
    title,
    description,
    address,
    regularPrice,
    discountPrice,
    bedrooms,
    bathrooms,
    furnished,
    parking,
    type,
    offer,
    imageUrls,
    userRef: req.user.id,
  });
  return res.status(200).json({ listing: creactedListing });
});
