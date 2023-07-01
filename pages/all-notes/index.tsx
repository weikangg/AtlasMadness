import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AllNotesPage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      const response = await fetch('/api/allFiles');
      const data = await response.json();
      setNotes(data);
    };

    getNotes();
  }, []);

  return (
    <div>
      <h1>All Notes</h1>
      {notes.map((note, index) => (
        <div key={index}>
          <h2>{note.filename}</h2>
          <p>{note.length} bytes</p>
          <Link href={`/api/files/${note._id}`}>Download</Link>
        </div>
      ))}
    </div>
  );
}
