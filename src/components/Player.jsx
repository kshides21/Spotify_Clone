import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const Player = () => {
  const {
    track,
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    time,
    previous,
    next,
    seekSong,
    toggleRepeatOne,
    repeatOne,
    shuffleActive,
    toggleShuffleActive,
    shuffleNext,
  } = useContext(PlayerContext);

  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      {/* Track Info */}
      <div className="hidden lg:flex items-center gap-4">
        <img className="w-12" src={track.image} alt={track.name} />
        <div>
          <p>{track.name}</p>
          <p>{track.desc.slice(0, 12)}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          {/* Shuffle */}
          <img
            onClick={toggleShuffleActive}
            className={`w-4 cursor-pointer ${shuffleActive ? "bg-green-500 rounded p-0.5" : "text-white"}`}
            src={assets.shuffle_icon}
            alt="shuffle"
          />

          {/* Previous */}
          <img
            onClick={() => (shuffleActive ? shuffleNext() : previous())}
            className="w-4 cursor-pointer"
            src={assets.prev_icon}
            alt="previous"
          />

          {/* Play / Pause */}
          {playStatus ? (
            <img onClick={pause} className="w-4 cursor-pointer" src={assets.pause_icon} alt="pause" />
          ) : (
            <img onClick={play} className="w-4 cursor-pointer" src={assets.play_icon} alt="play" />
          )}

          {/* Next */}
          <img
            onClick={() => (shuffleActive ? shuffleNext() : next())}
            className="w-4 cursor-pointer"
            src={assets.next_icon}
            alt="next"
          />

          {/* Repeat-One */}
          <div onClick={toggleRepeatOne}>
            <img
              className={`w-4 cursor-pointer ${repeatOne ? "bg-green-500 rounded p-0.5" : "text-white"}`}
              src={assets.loop_icon}
              alt="repeat one"
            />
          </div>
        </div>

        {/* Seek Bar */}
        <div className="flex items-center gap-5">
          <p>{time.currentTime.minute}:{time.currentTime.second}</p>
          <div
            ref={seekBg}
            onClick={seekSong}
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-green-800 rounded-full"
            />
          </div>
          <p>{time.totalTime.minute}:{time.totalTime.second}</p>
        </div>
      </div>

      {/* Right Side Icons */}
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img className="cursor-not-allowed w-4" src={assets.plays_icon} alt="" />
        <img className="cursor-not-allowed w-4" src={assets.mic_icon} alt="" />
        <img className="cursor-not-allowed w-4" src={assets.queue_icon} alt="" />
        <img className="cursor-not-allowed w-4" src={assets.speaker_icon} alt="" />
        <img className="cursor-not-allowed w-4" src={assets.volume_icon} alt="" />
        <div className="w-20 bg-slate-50 h-1 rounded"></div>
        <img className="cursor-not-allowed w-4" src={assets.mini_player_icon} alt="" />
        <img className="cursor-not-allowed w-4" src={assets.zoom_icon} alt="" />
      </div>
    </div>
  );
};

export default Player;
