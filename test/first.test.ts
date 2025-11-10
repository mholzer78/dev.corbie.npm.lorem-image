import cbLoremImage from '../src/index.js';
import { test, expect } from 'vitest';

test('hsl2rgb as params', () => {
  console.log(cbLoremImage.svg(399,399,'#123456'))
});