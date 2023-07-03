"use client";

import { useRef } from 'react';
import { createStyles, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    searchBar: {
      width:'100%',
      display: 'flex',
      alignItems: 'center',
      borderRadius:'5px'
    },
    searchInput: {
      width:'500px',
      padding: rem(8),
      marginRight: rem(8),
      borderRadius:'10px',
      borderColor:'white',
    },
    searchButton: {
      padding: `${rem(8)} ${rem(16)}`,
      // color: theme.white,
      border: 'none',
      cursor: 'pointer',
      borderRadius:'10px',
      fontWeight:'bold',
      fontSize:'20px',
    },
    bar: {
      // width:'100%',
      borderColor:'white',
      borderWidth:'10px',
    }
}));

  const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const {classes} = useStyles();
  
    const handleSearch = () => {
      const query = inputRef.current?.value || '';
      onSearch(query);
    };
  
    return (
      <div className={classes.bar}>

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
      </div>
    );
  };
  
  export default SearchBar;
