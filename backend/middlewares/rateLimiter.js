import ratelimit from "../config/upstash.js";

export default async function rateLimiter(req, res, next) {
  try {
    const { success } = await ratelimit.limit("my-limit-key");

    if (!success) return res.status(429).json({ message: "Too many request" });

    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
}
