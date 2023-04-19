import { describe, it, expect, vi } from 'vitest';

import { truncateString } from './truncate';

describe('Truncate test', () => {
  const prompt = 'The lazy fox jumps over the brown dog.';

  it('Called and returned', () => {
    const truncateSpy = vi.fn(truncateString);

    truncateSpy('');

    expect(truncateSpy).toHaveBeenCalledOnce();
    expect(truncateSpy).toHaveBeenCalledWith('');
    expect(truncateSpy).toHaveReturned();
  });

  it('Truncate with max length with default suffix', () => {
    expect(truncateString(prompt, 12)).toBe('The lazy fox...');
  });

  it('Truncate with max length and from offset with default suffix/prefix', () => {
    expect(truncateString(prompt, 14, 12)).toBe('...jumps over the...');
  });

  it('Truncate from offset with default prefix', () => {
    expect(truncateString(prompt, null, 27)).toBe('...brown dog.');
  });

  it('Without trim', () => {
    expect(truncateString('  ', 1, null, '', '', false)).toBe(' ');
  });

  it('Negative maxLength throws an exception', () => {
    expect(() => truncateString('', -1)).toThrowError('positive');
  });
});
