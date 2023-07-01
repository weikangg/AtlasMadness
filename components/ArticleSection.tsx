import ArticleCard from '../components/ArticleCard';
import SearchBar from '../components/SearchBar';

import {
    Card,
    createStyles,
  } from '@mantine/core';

const articleData = {
    image: "https://i.imgur.com/Cij5vdL.png",
    link: "https://mantine.dev/",
    title: "Resident Evil Village review",
    rating: "outstanding",
    description: "Resident Evil Village is a direct sequel to 2017’s Resident Evil 7, but takes a very different direction to its predecessor, namely the fact that this time round instead of fighting against various mutated zombies, you’re now dealing with more occult enemies like werewolves and vampires.",
    author: {
      name: "Bill Wormeater",
      image: "https://images.unsplash.com/photo-1593229874334-90d965f27c42?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    }
  };

const useStyles = createStyles((theme) => ({
    card: {
        marginTop:"50px",
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: theme.spacing.md,
        justifyContent: 'center',
    },
    header: {
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
}));

export default function ArticleSection() {
    const { classes } = useStyles();
    const handleSearch = (query: string) => {
        // Perform search logic here with the query
        console.log('Search query:', query);
    };

    return (
        <div className={classes.header}>
            <h2 >Search through our database of over 10 thousand notes!</h2>
            <SearchBar onSearch={handleSearch} />
            <Card className= {classes.card} >
                
                <ArticleCard
                    image={articleData.image}
                    link={articleData.link}
                    title={articleData.title}
                    description={articleData.description}
                    rating={articleData.rating}
                    author={articleData.author}
                />
                <ArticleCard
                    image={articleData.image}
                    link={articleData.link}
                    title={articleData.title}
                    description={articleData.description}
                    rating={articleData.rating}
                    author={articleData.author}
                />
                <ArticleCard
                    image={articleData.image}
                    link={articleData.link}
                    title={articleData.title}
                    description={articleData.description}
                    rating={articleData.rating}
                    author={articleData.author}
                />
            </Card>
        </div>
    )
}