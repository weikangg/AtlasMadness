"use client";

import { useRef } from 'react';
import { createStyles, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    searchBar: {
      display: 'flex',
      alignItems: 'center',
      borderColor:'white',
      borderWidth:'10px',
    },
    searchInput: {
      padding: rem(8),
      marginRight: rem(8),
    },
    searchButton: {
      padding: `${rem(8)} ${rem(16)}`,
      color: theme.white,
      border: 'none',
      cursor: 'pointer',
    },
}));

  const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const {classes} = useStyles();
  
    const handleSearch = () => {
      const query = inputRef.current?.value || '';
      onSearch(query);
    };
  
    return (
      <div className={classes.searchBar}>
        <input
          type="text"
          className={classes.searchInput}
          ref={inputRef}
        />
        <button
          className={classes.searchButton}
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    );
  };
  
  export default SearchBar;
