const urlService = require('../services/url.service');

const shortenUrl = async (req, res, next) => {
  try {
    const { url } = req.body;
    const result = await urlService.shortenUrl(url);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const redirectUrl = async (req, res, next) => {
  try {
    const { code } = req.params;
    const originalUrl = await urlService.resolveUrl(code);
    res.redirect(originalUrl);
  } catch (err) {
    next(err);
  }
};

const listUrls = async (req, res, next) => {
  try {
    const urls = await urlService.listUrls();
    res.status(200).json(urls);
  } catch (err) {
    next(err);
  }
};

module.exports = { shortenUrl, redirectUrl, listUrls };
