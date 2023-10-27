import { generateComponents } from '@uploadthing/react';

import type { profilePictureFileRouter } from '@/app/api/uploadthing/core';

export const { UploadButton, UploadDropzone, Uploader } = generateComponents<profilePictureFileRouter>();
