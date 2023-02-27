import React, { useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import './App.css';

const COLUMN_WITDH = 120;
export const EVENT_HEIGHT = 20;

type TimeSlotCellProps = {
  id: string;
  displayedHour: number;
};
/**
 * Draws a time slot on the calendar grid
 */
function TimeSlotCell(props: TimeSlotCellProps) {
  return (
    <div id={props.id} className="TimeSlotCell" style={{ height: EVENT_HEIGHT }}>
      {props.displayedHour}:00
    </div>
  );
}

type SelectOverlayProps = {
  top: number | null;
  left: number | null;
  width: number;
  height: number | null;
};

/**
 * This is the Drag & Select component that is used to show the user the time slot
 * he is currently booking
 */
function SelectOverlay(props: SelectOverlayProps) {
  return (
    <div
      className="Overlay"
      style={{
        top: `${props.top}px`,
        left: `${props.left}px`,
        width: `${props.width}px`,
        height: `${props.height}px`,
        pointerEvents: 'none', // This is needed because otherwise the onMouseMove and onMouseUp events have not the time slot div as target
      }}
    />
  );
}

export function calculateOverlayHeight(startingDivTop: number, cursorYPosition: number): number {
  return (Math.floor((cursorYPosition - startingDivTop) / EVENT_HEIGHT) + 1) * EVENT_HEIGHT;
}

type DayColumnProps = {
  day: string; // format YYYY-MM-DD
};

/**
 * This component represents a day where the time slots can bee booked
 */
function DayColumn(props: DayColumnProps) {
  return (
    <div
      className="DayColumn"
      style={{
        width: COLUMN_WITDH,
      }}
    >
      <h2>{props.day}</h2>
      {Array.from(Array(24).keys()).map(hour => (
        <TimeSlotCell
          key={`${props.day}T${hour}:00:00Z`}
          id={`${props.day}T${hour}:00:00Z`}
          displayedHour={hour}
        />
      ))}
    </div>
  );
}

function App() {
  const [isDragging, setIsDragging] = useState(false);
  const [startingDivCoordinates, setStartingDivCoordinates] = useState({ top: null, left: null });
  const [overlayHeight, setOverlayHeight] = useState<number | null>(null);
  const [meetingStartTime, setMeetingStartTime] = useState<string | null>(null);
  const [meetingEndTime, setMeetingEndTime] = useState<string | null>(null);
  const [meetingTopic, setMeetingTopic] = useState<string>('Discussion');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    // ts-ignore below are to deal with issues of target attribues
    // @ts-ignore
    setStartingDivCoordinates({ top: e.target.offsetTop, left: e.target.offsetLeft });
    // @ts-ignore
    setMeetingStartTime(e.target.id);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && startingDivCoordinates.top) {
      const tempOverlayHeight = calculateOverlayHeight(startingDivCoordinates.top, e.pageY);
      setOverlayHeight(tempOverlayHeight);
    }
  };

  const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(false);
    setStartingDivCoordinates({ top: null, left: null });
    setOverlayHeight(null);
    // @ts-ignore
    setMeetingEndTime(e.target.id);
    setIsModalOpen(true);
  };

  const onMeetingConfirmation = async () => {
    if (meetingStartTime && meetingEndTime) {
      const endTimeAsDate = new Date(meetingEndTime);
      const startTimeAsDate = new Date(meetingStartTime);
      // in minutes
      const duration = (endTimeAsDate.getTime() - startTimeAsDate.getTime()) / (60 * 1000);
      try {
        await axios.post('http://localhost:5000/create-zoom-meeting', {
          start_time: meetingStartTime,
          duration,
          topic: meetingTopic,
        });
      } catch (e) {
        console.error('Issue calling backend', e);
      }
    }
  };
  return (
    <>
      <div
        className="App"
        onMouseDown={e => onMouseDown(e)}
        onMouseUp={e => onMouseUp(e)}
        onMouseMove={e => onMouseMove(e)}
      >
        <h1>Book a zoom call</h1>
        <div className="Grid">
          {isDragging ? (
            <SelectOverlay
              top={startingDivCoordinates.top}
              left={startingDivCoordinates.left}
              height={overlayHeight}
              width={COLUMN_WITDH}
            />
          ) : null}
          <DayColumn day="2022-02-27" />
          <DayColumn day="2022-02-28" />
          <DayColumn day="2022-03-01" />
          <DayColumn day="2022-03-02" />
          <DayColumn day="2022-03-03" />
        </div>
      </div>
      {isModalOpen && meetingStartTime && (
        <Modal setIsModalOpen={setIsModalOpen} onClose={onMeetingConfirmation}>
          <p>Heure de début : {meetingStartTime} </p>
          <p>Heure de début : {meetingEndTime} </p>
          <p>
            <label>
              Quel est le sujet du meeting ?
              <input value={meetingTopic} onChange={e => setMeetingTopic(e.target.value)} />
            </label>
          </p>
        </Modal>
      )}
    </>
  );
}

export default App;
