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
      marginRight: rem(5),
      borderRadius:'10px',
      // borderColor:'white',
    },
    searchButton: {
      padding: `${rem(8)} ${rem(16)}`,
      color: theme.white,
      border: 'none',
      cursor: 'pointer',
      borderRadius:'10px',
      borderColor:'white',
      fontWeight:'bold',
      fontSize:'20px',
      width:"48px",
    },
    bar: {
      // backgroundColor:'grey',
      borderRadius:'10px',
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
            placeholder="Search Here..."
            className={classes.searchInput}
            ref={inputRef}
          />
          <button
            className={classes.searchButton}
            onClick={handleSearch}
          >
            <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
          </button>
        </div>
      </div>
    );
  };
  
  export default SearchBar;
