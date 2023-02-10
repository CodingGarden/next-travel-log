import { TravelLogs } from '@/models/TravelLog/TravelLogs';
import TravelLogMap from '@/components/TravelLogMap';
import TravelLogSidebar from '@/components/TravelLogSidebar';

export default async function Home() {
  const logs = await TravelLogs.find().toArray();
  return (
    <main className="w-full h-full">
      {/* TODO: serialize date objects?? Maybe use a timestamp isntead. */}
      <TravelLogMap logs={logs} />
      <TravelLogSidebar />
    </main>
  );
}
