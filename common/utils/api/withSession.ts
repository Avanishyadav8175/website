// connection
import connectDB from "@/db/mongoose/connection";

// types
import { type ClientSession } from "mongoose";

const withSession = async <T>(
  initial: T,
  callback: (session: ClientSession) => Promise<T>,
  attempt?: number
): Promise<T> => {
  let result: T = initial;

  const session = await (await connectDB()).startSession();

  let isFinished = false;
  let attemptCount = 1;

  while (isFinished === false && attemptCount <= (attempt ? attempt : 1)) {
    await session.withTransaction(async () => {
      try {
        result = await callback(session);

        await session.commitTransaction();

        isFinished = true;
      } catch (error) {
        await session.abortTransaction();

        if (attemptCount === (attempt ? attempt : 1)) {
          await session.endSession();

          throw error;
        }

        attemptCount += 1;
      }
    });
  }

  await session.endSession();

  return result;
};

export default withSession;
