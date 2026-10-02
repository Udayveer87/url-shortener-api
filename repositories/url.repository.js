const Url = require('../models/url.model');

// Pure data-access layer: no business logic here, just Mongoose calls.

const create = (data) => Url.create(data);

const findByCode = (shortCode) => Url.findOne({ shortCode });

const findByOriginalUrl = (originalUrl) => Url.findOne({ originalUrl });

const incrementClicks = (shortCode) =>
  Url.findOneAndUpdate({ shortCode }, { $inc: { clicks: 1 } }, { new: true });

const findAll = () => Url.find().sort({ createdAt: -1 });

module.exports = {
  create,
  findByCode,
  findByOriginalUrl,
  incrementClicks,
  findAll,
};
