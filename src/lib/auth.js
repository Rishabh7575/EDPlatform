// minimal human auth utilities
import jwt from "jsonwebtoken";

const JWT_KEY = process.env.JWT_SECRET || "edplatform_jwt_secure_key_2025";

// sign user token
export function signToken(payload) {
  try {
    return jwt.sign(payload, JWT_KEY, { expiresIn: "7d" });
  } catch (err) {
    return null;
  }
}

// verify token
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_KEY);
  } catch (err) {
    return null;
  }
}

// client cookie getters/setters
export function setCookie(name, val, days = 7) {
  if (typeof document === "undefined") return;
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(val)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
}

export function getCookie(name) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

export function removeCookie(name) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;
}
