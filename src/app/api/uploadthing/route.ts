import { createNextRouteHandler } from 'uploadthing/next';

import { profilePictureFileRouter } from './core';

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: profilePictureFileRouter
});
