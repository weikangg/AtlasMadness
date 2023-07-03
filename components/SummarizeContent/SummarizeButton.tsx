import { useState } from 'react';
import { Button } from '@mantine/core';
import summarizeFiles from '/Users/kane/Documents/GitHub/AtlasMadness/pages/api/summarizeFiles'; // Import your API function

const TextSummarizer = () => {
  const [summary, setSummary] = useState<string | null>(null);

  const handleSummarizeClick = async () => {
    try {
      const result = await summarizeFiles();
      setSummary(result);
    } catch (error) {
      console.error('Error summarizing files:', error);
    }
  };

  return (
    <div>
      <Button onClick={handleSummarizeClick}>Summarize Text</Button>
      {summary && (
        <div>
          <h2>Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default TextSummarizer;
