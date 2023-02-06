import type { NextApiRequest, NextApiResponse } from 'next';

import {
  TravelLog,
  TravelLogs,
  TravelLogWithId,
} from '@/models/TravelLog/TravelLogs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    TravelLogWithId | TravelLogWithId[] | { message: string }
  >
) {
  try {
    switch (req.method) {
      case 'POST': {
        const validatedLog = await TravelLog.parseAsync(req.body);
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
        return res.status(405).json({ message: 'Not Supported' });
      }
    }
  } catch (e) {
    const error = e as Error;
    return res.status(500).json({
      message: error.message,
    });
  }
}
