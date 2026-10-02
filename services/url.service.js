const urlRepository = require('../repositories/url.repository');
const { generateShortCode } = require('../utils/base62');
const { BASE_URL } = require('../config/env');

class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const isValidUrl = (value) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

// Keeps generating random codes until it finds one that isn't taken yet.
// Collisions are extremely unlikely at 7 base62 characters, but we still
// guard against them instead of assuming uniqueness.
const generateUniqueCode = async () => {
  let code;
  let existing;
  do {
    code = generateShortCode(7);
    existing = await urlRepository.findByCode(code);
  } while (existing);
  return code;
};

const shortenUrl = async (originalUrl) => {
  if (!originalUrl || !isValidUrl(originalUrl)) {
    throw new AppError('A valid URL is required', 400);
  }

  // Reuse the existing short code if this URL was already shortened.
  const existing = await urlRepository.findByOriginalUrl(originalUrl);
  if (existing) {
    return {
      originalUrl: existing.originalUrl,
      shortCode: existing.shortCode,
      shortUrl: `${BASE_URL}/api/urls/${existing.shortCode}`,
      clicks: existing.clicks,
    };
  }

  const shortCode = await generateUniqueCode();
  const created = await urlRepository.create({ originalUrl, shortCode });

  return {
    originalUrl: created.originalUrl,
    shortCode: created.shortCode,
    shortUrl: `${BASE_URL}/api/urls/${created.shortCode}`,
    clicks: created.clicks,
  };
};

const resolveUrl = async (shortCode) => {
  const entry = await urlRepository.findByCode(shortCode);
  if (!entry) {
    throw new AppError('Short URL not found', 404);
  }
  await urlRepository.incrementClicks(shortCode);
  return entry.originalUrl;
};

const listUrls = async () => {
  const all = await urlRepository.findAll();
  return all.map((u) => ({
    originalUrl: u.originalUrl,
    shortCode: u.shortCode,
    shortUrl: `${BASE_URL}/api/urls/${u.shortCode}`,
    clicks: u.clicks,
    createdAt: u.createdAt,
  }));
};

module.exports = { shortenUrl, resolveUrl, listUrls, AppError };
