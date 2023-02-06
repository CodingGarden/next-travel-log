import { TravelLogs } from '@/models/TravelLog/TravelLogs';
import TravelLogForm from '@/components/TravelLogForm';

export default async function Home() {
  const logs = await TravelLogs.find().toArray();
  return (
    <main>
      <h2>There are {logs.length} in the Database.</h2>
      {logs.map((log) => (
        <div key={log._id.toString()}>{log.title}</div>
      ))}
      <TravelLogForm />
    </main>
  );
}
