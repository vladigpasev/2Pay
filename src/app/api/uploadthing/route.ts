import { createNextRouteHandler } from 'uploadthing/next';

import { UploadFileRouter } from './core';

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: UploadFileRouter
});
