import { generateComponents } from '@uploadthing/react';

import type { UploadFileRouter } from '@/app/api/uploadthing/core';

export const { UploadButton, UploadDropzone, Uploader } = generateComponents<UploadFileRouter>();
