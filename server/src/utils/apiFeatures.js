const CustomError = require("./CustomError");

class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // ?duration[gte]=100&age[lte]=10
    const excludeFields = ["sort", "page", "limit", "fields"];
    let queryStr = JSON.stringify(this.queryString);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const queryObj = JSON.parse(queryStr);
    excludeFields.forEach((field) => {
      delete queryObj[field];
    });
    this.query = this.query.find(queryObj);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate(dataCount) {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    const totalPages = Math.ceil(dataCount / limit);
    if (this.queryString.page) {
      if (page > totalPages) {
        throw new CustomError("This page is not found!", 404);
      }
    }

    return this;
  }
}

module.exports = ApiFeatures;
