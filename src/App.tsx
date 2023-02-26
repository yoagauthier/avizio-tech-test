import React, { useState } from 'react';
import './App.css';

const COLUMN_WITDH = 80;
export const EVENT_HEIGHT = 20;

type CellProps = {
  displayedHour: number;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
};

function Cell(props: CellProps) {
  return (
    <div
      onMouseDown={e => props.onMouseDown(e)}
      onMouseUp={e => props.onMouseUp(e)}
      onMouseMove={e => props.onMouseMove(e)}
      style={{ height: EVENT_HEIGHT }}
    >
      {props.displayedHour}:00
    </div>
  );
}

type OverlayProps = {
  top: number | null;
  left: number | null;
  width: number;
  height: number | null;
};

function Overlay(props: OverlayProps) {
  return (
    <div
      className="Overlay"
      style={{
        top: `${props.top}px`,
        left: `${props.left}px`,
        width: `${props.width}px`,
        height: `${props.height}px`,
      }}
    />
  );
}

export function calculateOverlayHeight(startingDivTop: number, cursorYPosition: number): number {
  return (Math.floor((cursorYPosition - startingDivTop) / EVENT_HEIGHT) + 1) * EVENT_HEIGHT;
}

function DayColumn() {
  const [isDragging, setIsDragging] = useState(false);
  const [startingDivCoordinates, setStartingDivCoordinates] = useState({ top: null, left: null });
  const [overlayHeight, setOverlayHeight] = useState<number | null>(null);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    // @ts-ignore
    setStartingDivCoordinates({ top: e.target.offsetTop, left: e.target.offsetLeft });
    console.log('onMouseDown', e);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && startingDivCoordinates.top) {
      console.log('onMouseMove', e);

      const tempOverlayHeight = calculateOverlayHeight(startingDivCoordinates.top, e.pageY);
      console.log(tempOverlayHeight);
      setOverlayHeight(tempOverlayHeight);
    }
  };

  const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(false);
    setStartingDivCoordinates({ top: null, left: null });
    setOverlayHeight(null);

    console.log('onMouseUp', e);
  };
  return (
    <div
      className="DayColumn"
      style={{
        width: COLUMN_WITDH,
      }}
    >
      {isDragging ? (
        <Overlay
          top={startingDivCoordinates.top}
          left={startingDivCoordinates.left}
          height={overlayHeight}
          width={COLUMN_WITDH}
        />
      ) : null}
      {Array.from(Array(24).keys()).map(hour => (
        <Cell
          key={hour}
          displayedHour={hour}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
        />
      ))}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <div className="Grid">
        <DayColumn />
        <DayColumn />
        <DayColumn />
      </div>
    </div>
  );
}

export default App;
