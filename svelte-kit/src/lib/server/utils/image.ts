import followRedirects from 'follow-redirects';

const { https } = followRedirects;

function downloadImage(imageUrl: string, as: 'base64'): Promise<string>;
function downloadImage(imageUrl: string, as: 'buffer'): Promise<Buffer>;
function downloadImage(imageUrl: string, as: 'blob'): Promise<Blob>;
function downloadImage(imageUrl: string, as: 'base64' | 'blob' | 'buffer' = 'buffer') {
  return new Promise((resolve, reject) => {
    https
      .get(imageUrl, (response) => {
        const chunks: Uint8Array[] = [];

        response.on('data', (chunk) => {
          chunks.push(chunk);
        });

        response.on('end', () => {
          const buffer = Buffer.concat(chunks);

          if (as === 'base64') {
            // Returns a base64 encoded string
            resolve(`data:image/jpeg;base64,${buffer.toString('base64')}`);
          } else if (as === 'blob') {
            // Returns a blob
            resolve(new Blob([buffer]));
          }

          // Returns the buffer
          resolve(buffer);
        });
      })
      .on('error', (err) => {
        reject(new Error(`Error downloading image: ${err.message}`));
      });
  });
}

export { downloadImage };
