import db from '@/db';
import { WithId } from 'mongodb';

import { TravelLogEntry } from './TravelLog';

export { TravelLogEntry };

export type TravelLogWithObjectId = WithId<TravelLogEntry>;

export const TravelLogs = db.collection<TravelLogEntry>('logs');
