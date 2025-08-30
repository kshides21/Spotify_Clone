import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [repeatOne, setRepeatOne] = useState(false);
  const [shuffleActive, setShuffleActive] = useState(false);
  const [time, setTime] = useState({
    currentTime: { second: "-", minute: "-" },
    totalTime: { second: "-", minute: "-" },
  });

  function n(n) {
    return n > 9 ? "" + n : "0" + n;
  }

  // Keep track in sync with currentIndex
  useEffect(() => {
    setTrack(songsData[currentIndex]);
  }, [currentIndex]);

  // Update seek bar + auto-next or repeat
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.ontimeupdate = () => {
      if (!audioRef.current.duration) return;

      seekBar.current.style.width =
        Math.floor(
          (audioRef.current.currentTime / audioRef.current.duration) * 100
        ) + "%";

      setTime({
        currentTime: {
          second: n(Math.floor(audioRef.current.currentTime % 60)),
          minute: n(Math.floor(audioRef.current.currentTime / 60)),
        },
        totalTime: {
          second: n(Math.floor(audioRef.current.duration % 60)),
          minute: n(Math.floor(audioRef.current.duration / 60)),
        },
      });
    };

    audioRef.current.onended = () => {
      if (repeatOne) {
        // loop current song
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else if (shuffleActive) {
        shuffleNext();
      } else {
        next();
      }
    };
  }, [audioRef, repeatOne, shuffleActive]);

  // Auto-play whenever track changes
  useEffect(() => {
    if (!audioRef.current || !track) return;

    audioRef.current.load();

    const handleCanPlay = () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setPlayStatus(true);
        }).catch((err) => {
          console.warn("Autoplay blocked or failed:", err);
        });
      }
    };

    audioRef.current.addEventListener("loadeddata", handleCanPlay);
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("loadeddata", handleCanPlay);
      }
    };
  }, [track]);

  // Controls
  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const playWithId = (id) => {
    setCurrentIndex(id);
  };

  const previous = () => {
    if (shuffleActive) {
      shuffleNext();
    } else {
      setCurrentIndex((prev) =>
        prev > 0 ? prev - 1 : songsData.length - 1
      );
    }
  };

  const next = () => {
    if (shuffleActive) {
      shuffleNext();
    } else {
      setCurrentIndex((prev) =>
        prev < songsData.length - 1 ? prev + 1 : 0
      );
    }
  };

  const shuffleNext = () => {
    let randomIndex = Math.floor(Math.random() * songsData.length);
    while (randomIndex === currentIndex && songsData.length > 1) {
      randomIndex = Math.floor(Math.random() * songsData.length);
    }
    setCurrentIndex(randomIndex);
  };

  const toggleRepeatOne = () => {
    setRepeatOne((prev) => !prev);
  };

  const toggleShuffleActive = () => {
    setShuffleActive((prev) => !prev);
  };

  const seekSong = (event) => {
    audioRef.current.currentTime =
      (event.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    currentIndex,
    setCurrentIndex,
    playStatus,
    setPlayStatus,
    repeatOne,
    toggleRepeatOne,
    shuffleActive,
    toggleShuffleActive,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    shuffleNext,
    seekSong,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
