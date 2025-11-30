import cbLoremImage from '../src/index.js';
import { test, expect } from 'vitest';

test('single param over limit', () => {
  expect(() => cbLoremImage.svgAsXml(4000)).toThrowError(
    expect.objectContaining({
      message: 'Width and Height should be positive integers and maximum 3840.',
    }),
  );
});
test('single param over limit', () => {
  expect(() => cbLoremImage.svgAsXml(400, 4000)).toThrowError(
    expect.objectContaining({
      message: 'Width and Height should be positive integers and maximum 3840.',
    }),
  );
});
test('single param over limit', () => {
  expect(() => cbLoremImage.svgAsXml(4000, 400)).toThrowError(
    expect.objectContaining({
      message: 'Width and Height should be positive integers and maximum 3840.',
    }),
  );
});
test('single param over limit', () => {
  expect(() => cbLoremImage.svgAsXml(400, 4000)).toThrowError(
    expect.objectContaining({
      message: 'Width and Height should be positive integers and maximum 3840.',
    }),
  );
});
test('single param over limit', () => {
  expect(() => cbLoremImage.svgAsXml(400, 400, '#0000xx')).toThrowError(
    expect.objectContaining({
      message: 'Wrong input format. Each item should be between 0 and f',
    }),
  );
});
test('single param over limit', () => {
  expect(() => cbLoremImage.svgAsXml(400, 400, 'abcdef0')).toThrowError(
    expect.objectContaining({
      message: 'Wrong input format. Should be: (#)abcdef',
    }),
  );
});
