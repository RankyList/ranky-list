import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

export type PocketBaseImageUrlOptions = {
  /**
   * The image's file name (e.g. `image.jpg`).
   */
  fileName: string;
  /**
   * The collection's ID or name (e.g. `123` or `my-collection`).
   */
  collectionIdOrName: string;
  /**
   * The record's ID (e.g. `123`).
   */
  recordId: string;
  /**
   * Whether to download the image or not.
   */
  download?: boolean;
};

/**
 * Returns the full URL of a PocketBase image.
 */
export const getPocketBaseImageUrl = (options: PocketBaseImageUrlOptions) => {
  let url = `${PUBLIC_POCKETBASE_URL}/api/files/${options.collectionIdOrName}/${options.recordId}/${options.fileName}`;

  if (options.download) {
    url += '?download=1';
  }

  return url;
};
