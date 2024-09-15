import React from 'react';

function Loading() {
  return (
    <div className="flex justify-center min-h-screen">
      <svg width="400" height="100" xmlns="http://www.w3.org/2000/svg">
        <style>
          {`
            .text {
              font-family: 'Arial', sans-serif;
              font-size: 50px;
              fill: none;
              stroke-width: 2;
              stroke-dasharray: 600;
              stroke-dashoffset: 600;
              animation: draw 4.5s ease forwards infinite, strokeColorChange 4s ease forwards infinite, flicker 0.1s infinite alternate;
            }

            @keyframes draw {
              to {
                stroke-dashoffset: 0;
              }
            }

            @keyframes strokeColorChange {
              0% {
                stroke: black;
              }
              25% {
                stroke: #365486;
              }
              50% {
                stroke: #365486;
              }
              75% {
                stroke: #365486;
              }
              100% {
                stroke: #365486;
              }
            }

            @keyframes flicker {
              0% {
                stroke-width: 2;
              }
              50% {
                stroke-width: 3;
              }
              100% {
                stroke-width: 2;
              }
            }
          `}
        </style>
        <text x="10" y="70" className="text text-center">Loading...</text>
      </svg>
    </div>
  );
}

export default Loading;
