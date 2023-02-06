import db from '@/db';
import { WithId } from 'mongodb';

import { TravelLog } from './TravelLog';

export { TravelLog };

export type TravelLogWithId = WithId<TravelLog>;

export const TravelLogs = db.collection<TravelLog>('logs');
