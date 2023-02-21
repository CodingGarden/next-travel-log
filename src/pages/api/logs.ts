import type { NextApiRequest, NextApiResponse } from 'next';

import {
  TravelLog,
  TravelLogs,
  TravelLogWithId,
} from '@/models/TravelLog/TravelLogs';

if (!process.env.API_KEY) {
  throw new Error('API_KEY missing in env');
}

class ErrorWithStatusCode extends Error {
  status = 500;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    TravelLogWithId | TravelLogWithId[] | { message: string }
  >
) {
  try {
    switch (req.method) {
      case 'POST': {
        if (req.body.apiKey !== process.env.API_KEY) {
          throw new ErrorWithStatusCode('Unauthorized.', 401);
        }
        const validatedLog = await TravelLog.parseAsync(req.body);
        // @ts-ignore
        delete validatedLog.apiKey;
        const insertResult = await TravelLogs.insertOne(validatedLog);
        return res.status(200).json({
          ...validatedLog,
          _id: insertResult.insertedId,
        });
      }
      case 'GET': {
        const logs = await TravelLogs.find().toArray();
        return res.status(200).json(logs);
      }
      default: {
        throw new ErrorWithStatusCode('Not Supported.', 405);
      }
    }
  } catch (e) {
    const error = e as Error;
    if (error instanceof ErrorWithStatusCode) {
      res.status(error.status);
    }
    // TODO: handle zod errors
    // TODO: handle all errors in catch all middleware
    return res.json({
      message: error.message,
    });
  }
}
