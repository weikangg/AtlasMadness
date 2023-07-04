import { useState } from 'react';
import { Button } from '@mantine/core';

const SummarizeButton = ({ onClick }: { onClick: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = async () => {
    setIsLoading(true);
    await onClick();
    setIsLoading(false);
  };

  return (
    <Button onClick={handleButtonClick} loading={isLoading}>
      {isLoading ? 'Summarizing...' : 'Summarize Text'}
    </Button>
  );
};

export default SummarizeButton;
