import dynamic from 'next/dynamic';
import { TravelLogs } from '@/models/TravelLog/TravelLogs';
import LoadingSpinner from '@/components/LoadingSpinner';
import TravelLogProvider from '@/TravelLogProvider';
import TravelLogSidebar from '@/components/TravelLogSidebar';

const TravelLogMap = dynamic(import('@/components/TravelLogMap'), {
  ssr: false,
  loading: LoadingSpinner,
});

export default async function Home() {
  const logs = await TravelLogs.find().toArray();
  return (
    <main className="w-full h-full">
      <TravelLogProvider>
        {/* TODO: serialize date objects?? Maybe use a timestamp isntead. */}
        <TravelLogMap logs={logs} />
        <TravelLogSidebar />
      </TravelLogProvider>
    </main>
  );
}
