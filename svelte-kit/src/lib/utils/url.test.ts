import { expect, describe, it } from 'vitest';

import { getPocketBaseImageUrl } from './url';

import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

describe('URL getPocketBaseImageUrl test', () => {
  it('Returns the correct URL', () => {
    expect(
      getPocketBaseImageUrl({
        fileName: 'image.jpg',
        collectionIdOrName: '123',
        recordId: '789',
      }),
    ).toBe(`${PUBLIC_POCKETBASE_URL}/api/files/123/789/image.jpg`);
  });

  it('Appends the download query parameter', () => {
    expect(
      getPocketBaseImageUrl({
        fileName: 'image.jpg',
        collectionIdOrName: '123',
        recordId: '789',
        download: true,
      }),
    ).toBe(`${PUBLIC_POCKETBASE_URL}/api/files/123/789/image.jpg?download=1`);
  });
});
