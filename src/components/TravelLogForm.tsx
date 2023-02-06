'use client';

import { useState } from 'react';

export default function TravelLogForm() {
  const [title, setTitle] = useState('');

  return (
    <form>
      <label>Title</label>
      <input value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
      <button>Create</button>
    </form>
  );
}
