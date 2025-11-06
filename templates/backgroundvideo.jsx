import React from 'react';

export default function BackgroundVideo(props) {
  const { _backgroundVideo, _screenSize, _id } = props;

  function UseVideo() {
    const videoProps = {
      id: `backgroundvideo-${_id}`,
      preload: "auto",
      poster: _backgroundVideo._graphic,
      muted: _backgroundVideo._isMuted !== false,
      playsInline: _backgroundVideo._playsinline !== false
    };
    
    // Only add loop if _loops is -1 (infinite)
    if (_backgroundVideo._loops === -1) {
      videoProps.loop = true;
    }
    
    // Only add autoPlay if _autoPlay is true (default)
    if (_backgroundVideo._autoPlay !== false) {
      videoProps.autoPlay = true;
    }

    return (
      <div className="backgroundvideo__container">
        <video {...videoProps}>
          <source
            src={_backgroundVideo._mp4 !== '' ? _backgroundVideo._mp4 : _backgroundVideo._webm}
            type={_backgroundVideo._mp4 !== '' ? 'video/mp4' : 'video/webm'}
          ></source>
        </video>
        {_backgroundVideo._showControls && (
          <button className="backgroundvideo__playpause" aria-label="Play/Pause">
            <span className="backgroundvideo__play-icon">▶</span>
            <span className="backgroundvideo__pause-icon">❚❚</span>
          </button>
        )}
      </div>
    );
  }

  function UseGraphic() {
    if (_backgroundVideo._graphic) {
      return <img src={_backgroundVideo._graphic}/>;
    }
    return null;
  }

  // Always show video on all screen sizes
  return <UseVideo />;
}
