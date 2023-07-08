declare module 'mammoth/mammoth.browser';
declare module 'fluent-ffmpeg';

declare module 'file-type' {
    function fromBuffer(buffer: Buffer): Promise<{ext: string, mime: string} | undefined>;
  }