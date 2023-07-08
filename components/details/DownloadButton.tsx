import { createStyles, Button, Group, rem } from '@mantine/core';
import { ObjectId } from 'mongodb';
import axios from 'axios';
import { saveAs } from 'file-saver';

const useStyles = createStyles((theme) => ({
  button: {},

  menuControl: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    border: 0,
    borderLeft: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
    }`,
  },
}));

export function DownloadOriginalButton({ fileId }: { fileId: ObjectId }) {
  const { classes, theme } = useStyles();
  const downloadOriginalHandler = () => {
    window.open(`/api/files/${fileId}`);
  };
  return (
    <Group noWrap spacing={0}>
      <Button onClick={downloadOriginalHandler} className={classes.button} >
        Download Original Document
      </Button>
    </Group>
  );
}

export function DownloadSummaryButton({ summary } : {summary:string}) {
    const { classes, theme } = useStyles();
    
    const downloadSummaryHandler = () => {
      axios.post('/api/downloadSummary', { summary }, { responseType: 'blob' })
        .then((response) => {
          saveAs(new Blob([response.data]), 'Summary.docx');
        });
    };
  
    return (
      <Group noWrap spacing={0}>
        <Button onClick={downloadSummaryHandler} className={classes.button}  color="teal.6">
          Download Summary
        </Button>
      </Group>
    );
  }
  