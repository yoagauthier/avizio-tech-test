import React from 'react';
import { calculateOverlayHeight, EVENT_HEIGHT } from './App';

describe('calculateOverlayHeight', () => {
  it('gives default height for a selection shorter than one event', () => {
    const startingDivTop = 50;
    const cursorYPosition = 55;

    expect(calculateOverlayHeight(startingDivTop, cursorYPosition)).toBe(20);
  });

  // cursor in starting div
  // cursor aboce starting div
});
