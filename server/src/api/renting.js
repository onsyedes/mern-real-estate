const RentingService = require("../services/RentingService");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
module.exports = (app) => {
  const rentingService = new RentingService();

  app.get(
    "/",
    asyncErrorHandler(async (req, res, next) => {
      //   return res.status(200).json({ data: "hello" });
      const data = await rentingService.rentHouse();
      return res.status(200).json({ data: data });
    })
  );
};
