import cbLoremImage from '../src/index.js';
import { test, expect } from 'vitest';

import svgString from './compare.js';

test('400', () => {
  expect(cbLoremImage.svgAsXml(400).includes(svgString.t400)).toBe(true);
});
test('400x400', () => {
  expect(cbLoremImage.svgAsXml(400, 400).includes(svgString.t400)).toBe(true);
});
test('400x778899', () => {
  expect(cbLoremImage.svgAsXml(400, '778899').includes(svgString.t400)).toBe(
    true,
  );
});
test('400_400_778899', () => {
  expect(
    cbLoremImage.svgAsXml(400, 400, '778899').includes(svgString.t400),
  ).toBe(true);
});
test('400_400_778899', () => {
  expect(
    cbLoremImage.svgAsXml(400, 400, '#778899').includes(svgString.t400),
  ).toBe(true);
});

test('600', () => {
  expect(cbLoremImage.svgAsXml(600).includes(svgString.t600)).toBe(true);
});
test('600x600', () => {
  expect(cbLoremImage.svgAsXml(600, 600).includes(svgString.t600)).toBe(true);
});
test('600x778899', () => {
  expect(cbLoremImage.svgAsXml(600, '#778899').includes(svgString.t600)).toBe(
    true,
  );
});
test('600_600_778899', () => {
  expect(
    cbLoremImage.svgAsXml(600, 600, '#778899').includes(svgString.t600),
  ).toBe(true);
});

test('800', () => {
  expect(cbLoremImage.svgAsXml(800).includes(svgString.t800)).toBe(true);
});
test('900x40', () => {
  expect(cbLoremImage.svgAsXml(900, 40).includes(svgString.t900_40)).toBe(true);
});
test('500xffd801', () => {
  expect(
    cbLoremImage.svgAsXml(500, '#ffd801').includes(svgString.t500_ffd801),
  ).toBe(true);
});
test('40_750_123456', () => {
  expect(
    cbLoremImage
      .svgAsXml(40, 750, '#123456')
      .includes(svgString.t40_750_123456),
  ).toBe(true);
});

// TBD: more tests with 'random' color
