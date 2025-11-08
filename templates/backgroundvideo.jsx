import React from 'react';
import device from 'core/js/device';

export default function BackgroundVideo(props) {
  const { _backgroundVideo, _screenSize, _id, _globals } = props;

  // Get the appropriate video source and poster based on screen size
  function getResponsiveMedia() {
    const screenSize = device.screenSize || _screenSize || 'large';
    const config = _backgroundVideo;
    
    let mp4 = '';
    let webm = '';
    let poster = '';
    
    // Priority order based on screen size with intelligent fallback
    switch(screenSize) {
      case 'xlarge':
        mp4 = config._xlarge?._mp4 || config._large?._mp4 || config._medium?._mp4 || config._small?._mp4 || '';
        webm = config._xlarge?._webm || config._large?._webm || config._medium?._webm || config._small?._webm || '';
        poster = config._xlarge?._graphic || config._large?._graphic || config._medium?._graphic || config._small?._graphic || '';
        break;
      case 'large':
        mp4 = config._large?._mp4 || config._medium?._mp4 || config._small?._mp4 || config._xlarge?._mp4 || '';
        webm = config._large?._webm || config._medium?._webm || config._small?._webm || config._xlarge?._webm || '';
        poster = config._large?._graphic || config._medium?._graphic || config._small?._graphic || config._xlarge?._graphic || '';
        break;
      case 'medium':
        mp4 = config._medium?._mp4 || config._small?._mp4 || config._large?._mp4 || config._xlarge?._mp4 || '';
        webm = config._medium?._webm || config._small?._webm || config._large?._webm || config._xlarge?._webm || '';
        poster = config._medium?._graphic || config._small?._graphic || config._large?._graphic || config._xlarge?._graphic || '';
        break;
      case 'small':
        mp4 = config._small?._mp4 || config._medium?._mp4 || config._large?._mp4 || config._xlarge?._mp4 || '';
        webm = config._small?._webm || config._medium?._webm || config._large?._webm || config._xlarge?._webm || '';
        poster = config._small?._graphic || config._medium?._graphic || config._large?._graphic || config._xlarge?._graphic || '';
        break;
      default:
        // Fallback to any available size
        mp4 = config._large?._mp4 || config._medium?._mp4 || config._small?._mp4 || config._xlarge?._mp4 || '';
        webm = config._large?._webm || config._medium?._webm || config._small?._webm || config._xlarge?._webm || '';
        poster = config._large?._graphic || config._medium?._graphic || config._small?._graphic || config._xlarge?._graphic || '';
    }
    
    return { mp4, webm, poster };
  }

  function UseVideo() {
    // Use translatable aria label from globals
    const ariaLabel = _globals?.ariaRegion || 'Background video with playback controls.';
    const playLabel = _globals?.playButton || 'Play video';
    
    // Get responsive video sources and poster
    const { mp4, webm, poster } = getResponsiveMedia();
    
    // Determine which source to use (prefer mp4 if available)
    const videoSource = mp4 || webm;
    const videoType = mp4 ? 'video/mp4' : 'video/webm';
    
    const videoProps = {
      id: `backgroundvideo-${_id}`,
      preload: "auto",
      poster: poster,
      muted: _backgroundVideo._isMuted !== false,
      playsInline: _backgroundVideo._playsinline !== false,
      'aria-label': ariaLabel,
      role: 'img',
      'aria-hidden': 'true'
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
        <video {...videoProps} key={videoSource}>
          {mp4 && (
            <source src={mp4} type="video/mp4" />
          )}
          {webm && (
            <source src={webm} type="video/webm" />
          )}
        </video>
        {_backgroundVideo._showControls && (
          <button 
            className="backgroundvideo__playpause" 
            aria-label={playLabel}
            aria-pressed="false"
            type="button"
          >
            <span className="backgroundvideo__play-icon" aria-hidden="true">▶</span>
            <span className="backgroundvideo__pause-icon" aria-hidden="true">❚❚</span>
          </button>
        )}
      </div>
    );
  }

  // Always show video on all screen sizes
  return <UseVideo />;
}
