import { MongoServerError, ObjectId } from "mongodb";
import ApiError from "./ApiError";

// Escapes user input so it can be used as a literal inside a $regex
export const escapeRegex = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Display form of a user-entered name: trimmed, with runs of whitespace collapsed, e.g. " Brown  Sugar" -> "Brown Sugar"
export const cleanName = (name: string): string => name.trim().replace(/\s+/g, " ");

// Canonical form used for case/whitespace-insensitive matching, e.g. " Brown  Sugar" -> "brown sugar"
export const normalizeName = (name: string): string => cleanName(name).toLowerCase();

export const toObjectId = (id: string): ObjectId => {
  if (!ObjectId.isValid(id)) {
    throw new ApiError("ValidationError", 400, `${id} is not a valid id`);
  }
  return new ObjectId(id);
};

export const isDuplicateKeyError = (error: unknown): boolean =>
  error instanceof MongoServerError && error.code === 11000;
