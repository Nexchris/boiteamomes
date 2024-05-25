import React, { createContext, useState, useContext } from 'react';

const VideoURLContext = createContext();

export const VideoURLProvider = ({ children }) => {
  const [leftVideoURL, setLeftVideoURL] = useState("");
  const [rightVideoURL, setRightVideoURL] = useState("");

  const updateLeftVideoURL = (url) => {
    setLeftVideoURL(url);
  };

  return (
    <VideoURLContext.Provider value={{ leftVideoURL, setLeftVideoURL, rightVideoURL, setRightVideoURL, updateLeftVideoURL }}>
      {children}
    </VideoURLContext.Provider>
  );
};

export const useVideoURL = () => useContext(VideoURLContext);
