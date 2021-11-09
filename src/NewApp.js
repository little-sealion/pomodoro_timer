import React, { useState } from 'react';
import { Box, Typography, IconButton, Rating } from '@mui/material';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import sound from './pristine-609.mp3';

export default function NewApp() {
  const sessions = [
    { status: 'FOCUS', timeSpan: 25 },
    { status: 'BREAK', timeSpan: 5 },
    { status: 'FOCUS', timeSpan: 25 },
    { status: 'BREAK', timeSpan: 5 },
    { status: 'FOCUS', timeSpan: 25 },
    { status: 'BREAK', timeSpan: 5 },
    { status: 'FOCUS', timeSpan: 25 },
    { status: 'BREAK', timeSpan: 20 },
  ];

  const [index, setIndex] = useState(0);
  const [seconds, setSeconds] = useState(sessions[index].timeSpan * 60);
  const [intervalHandler, setIntervalHandler] = useState(null);

  // start downcounting , and set the state of intervalHandler
  function downCount() {
    const startButton = document.getElementById('start');
    startButton.style.display = 'none';
    const pauseButton = document.getElementById('pause');
    pauseButton.style.display = 'inline-block';

    const SVGCircle = document.getElementById('svgCircle');

    let intervalNum = setInterval(() => {
      SVGCircle.style.strokeDasharray = seconds;
      setSeconds((prevSeconds) => {
        if (prevSeconds === 1) {
          toNextSession();
          playSound(sound);
        } else {
          return prevSeconds - 1;
        }
      });
    }, 1000);
    setIntervalHandler(intervalNum);
  }
  function stopCount() {
    const pauseButton = document.getElementById('pause');
    pauseButton.style.display = 'none';
    const startButton = document.getElementById('start');
    startButton.style.display = 'inline-block';
    clearInterval(intervalHandler);
  }
  function playSound(sound) {
    const audio = new Audio(sound);
    audio
      .play()
      .then(() => {
        // Audio is playing.
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // when clcik the 'next' session, change the state of sessions index
  function toNextSession() {
    if (index === sessions.length - 1) {
      setIndex(0);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
    setSeconds(
      sessions[index === sessions.length - 1 ? 0 : index + 1].timeSpan * 60
    );
  }

  // when click the reset button, the current session start again
  function resetSession() {
    setSeconds(sessions[index].timeSpan * 60);
  }

  return (
    <div>
      <Typography variant="h3" sx={{ color: '#2D27DC', margin: '2vh auto' }}>
        Pomodoro
      </Typography>
      {/* indicates which session we are in */}
      <Typography component="legend">
        Session {Math.trunc(index / 2) + 1} of 4
      </Typography>
      {/* visually demonstartion of which session we are in */}
      <Rating
        name="read-only"
        value={index / 2 + 0.5}
        precision={0.5}
        max={4}
        readOnly
      />

      <Box
        sx={{
          position: 'relative',
          width: 350,
          margin: '25vh auto 2vh',
        }}
      >
        <svg width="320" height="320" id="svgCircle">
          <circle
            cx="160"
            cy="160"
            r="150"
            stroke="green"
            strokeWidth="10"
            fill="transparent"
          />
          Sorry, your browser does not support inline SVG.
        </svg>
        <Box
          sx={{
            width: 240,
            height: 240,
            borderRadius: 120,
            backgroundColor: 'white',
            position: 'absolute',
            top: 30,
            left: 30,
          }}
        >
          <Typography align="center" variant="h2" mt={8}>
            {Math.trunc(seconds / 60).toString().length < 2
              ? '0' + Math.trunc(seconds / 60)
              : Math.trunc(seconds / 60)}{' '}
            :
            {(seconds % 60).toString().length < 2
              ? '0' + (seconds % 60)
              : seconds % 60}
          </Typography>
          <Typography align="center" variant="h6" mt={2}>
            {sessions[index].status}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: 220,
          height: 20,
          margin: '2vh auto',
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
        }}
      >
        <IconButton
          aria-label="reset"
          size="large"
          onClick={() => {
            resetSession();
          }}
        >
          <ReplayOutlinedIcon />
        </IconButton>
        <IconButton
          aria-label="start"
          color="success"
          size="500"
          id="start"
          onClick={() => {
            downCount();
          }}
        >
          <PlayCircleFilledWhiteOutlinedIcon />
        </IconButton>
        <IconButton
          aria-label="pause"
          size="large"
          color="success"
          id="pause"
          onClick={() => {
            stopCount();
          }}
        >
          <PauseCircleOutlineOutlinedIcon />
        </IconButton>
        <IconButton
          aria-label="next session"
          size="large"
          onClick={() => {
            toNextSession();
          }}
        >
          <NavigateNextOutlinedIcon />
        </IconButton>
      </Box>
    </div>
  );
}
