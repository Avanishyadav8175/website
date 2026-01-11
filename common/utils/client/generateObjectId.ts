/**
 * Client-safe ObjectId generation utility
 * Replaces mongoose.Types.ObjectId() for client-side components
 */
export const generateObjectId = (): string => {
  const timestamp = Math.floor(Date.now() / 1000).toString(16);
  const randomBytes = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
  ).join('').substring(0, 16);
  return timestamp + randomBytes;
};

/**
 * Creates a mock ObjectId-like object for client-side use
 */
export const createClientObjectId = () => ({
  toString: () => generateObjectId(),
  valueOf: () => generateObjectId(),
  _id: generateObjectId()
});

export default generateObjectId;