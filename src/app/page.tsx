import dynamic from 'next/dynamic';
import { TravelLogs } from '@/models/TravelLog/TravelLogs';
import LoadingSpinner from '@/components/LoadingSpinner';
import TravelLogProvider from '@/TravelLogProvider';
import TravelLogSidebar from '@/components/TravelLogSidebar';
import { TravelLogEntryWithId } from '@/models/TravelLog/TravelLog';

const TravelLogMap = dynamic(() => import('@/components/TravelLogMap'), {
  ssr: false,
  loading: LoadingSpinner,
});

export default async function Home() {
  const logs = await TravelLogs.aggregate<TravelLogEntryWithId>([
    { $addFields: { _id: { $toString: '$_id' } } },
  ]).toArray();

  return (
    <main className="w-full h-full">
      <TravelLogProvider>
        <TravelLogMap logs={logs} />
        <TravelLogSidebar />
      </TravelLogProvider>
    </main>
  );
}
