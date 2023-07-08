import { createStyles, Button, Group, rem } from '@mantine/core';
import { ObjectId } from 'mongodb';

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

export function DownloadButton({ fileId }: { fileId: ObjectId }) {
  const { classes, theme } = useStyles();
  const clickHandler = () => {
    window.open(`/api/files/${fileId}`);
  };
  return (
    <Group noWrap spacing={0}>
      <Button onClick={clickHandler} className={classes.button}>
        Download Original Document
      </Button>
    </Group>
  );
}
