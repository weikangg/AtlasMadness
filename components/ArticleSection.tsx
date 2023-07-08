'use client';
import ArticleCard from '../components/ArticleCard';
import SearchBar from '../components/SearchBar';
import { useEffect, useState } from 'react';
import { rem } from '@mantine/core';
import { useRef } from 'react';

import { Card, createStyles } from '@mantine/core';

type Note = {
  _id: string;
  filename: string;
  length: number;
  fileAuthor: string;
  fileTitle: string;
};

const useStyles = createStyles((theme) => ({
  card: {
    marginTop: '50px',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing.md,
    justifyContent: 'center',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '5px',
  },
  searchInput: {
    width: '500px',
    padding: rem(8),
    marginRight: rem(5),
    borderRadius: '10px',
    // borderColor:'white',
  },
  searchButton: {
    padding: `${rem(8)} ${rem(16)}`,
    color: theme.white,
    border: 'none',
    cursor: 'pointer',
    borderRadius: '10px',
    borderColor: 'white',
    fontWeight: 'bold',
    fontSize: '20px',
    width: '48px',
  },
  bar: {
    // backgroundColor:'grey',
    borderRadius: '10px',
  },
}));

export default function ArticleSection() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { classes } = useStyles();
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

  useEffect(() => {
    const getNotes = async () => {
      const response = await fetch('/api/allFiles');
      const data = await response.json();
      console.log(data);
      setNotes(Array.isArray(data) ? data : []);
      setFilteredNotes(Array.isArray(data) ? data : []);
    };
    getNotes();
  }, []);
  useEffect(() => {
    const getNotes = async () => {
      const response = await fetch('/api/allFiles');
      const data = await response.json();
      console.log(data);
      console.log('test');
      setNotes(Array.isArray(data) ? data : []);
      setFilteredNotes(Array.isArray(data) ? data : []);
    };
    getNotes();
  }, []);

  const handleSearch = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const filtered = notes.filter((note) =>
      note.filename.toLowerCase().includes(inputRef.current?.value?.toLowerCase() || '')
    );
    setFilteredNotes(filtered);
  };

  return (
    <div className={classes.header}>
      <h2>Search through our database of over 10 thousand notes!</h2>
      {/* <SearchBar onSearch={handleSearch} /> */}
      <div className={classes.bar}>
        <div className={classes.searchBar}>
          <input
            type="text"
            placeholder="Search Here..."
            className={classes.searchInput}
            ref={inputRef}
          />
          <button className={classes.searchButton} onClick={handleSearch}>
            <svg
              className="w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <Card className={classes.card}>
        {filteredNotes.map((note, index) => (
          <ArticleCard
            key={index}
            image="https://i.imgur.com/Cij5vdL.png"
            link={`/details/${note._id}`}
            title={note.fileTitle}
            description={`${note.length} bytes`}
            rating="outstanding"
            author={{
              name: note.fileAuthor,
              image:
                'https://images.unsplash.com/photo-1593229874334-90d965f27c42?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
            }}
          />
        ))}
      </Card>
    </div>
  );
}
