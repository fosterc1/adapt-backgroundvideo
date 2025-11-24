import React from 'react';
import device from 'core/js/device';

export default function BackgroundVideo(props) {
  const { _backgroundVideo, _screenSize, _id, _globals } = props;

  // Get the appropriate video source and poster based on screen size
  function getResponsiveMedia() {
    // Prioritize _screenSize from props (passed via render), then device.screenSize
    const screenSize = _screenSize || device.screenSize || 'large';
    const config = _backgroundVideo;
    
    let mp4 = '';
    let webm = '';
    let poster = '';
    
    // Only use exact match for screen size - no fallback to other sizes
    // This ensures videos only play on their intended screen size
    switch(screenSize) {
      case 'xlarge':
        mp4 = config._xlarge?._mp4 || '';
        webm = config._xlarge?._webm || '';
        poster = config._xlarge?._graphic || '';
        break;
      case 'large':
        mp4 = config._large?._mp4 || '';
        webm = config._large?._webm || '';
        poster = config._large?._graphic || '';
        break;
      case 'medium':
        mp4 = config._medium?._mp4 || '';
        webm = config._medium?._webm || '';
        poster = config._medium?._graphic || '';
        break;
      case 'small':
        mp4 = config._small?._mp4 || '';
        webm = config._small?._webm || '';
        poster = config._small?._graphic || '';
        break;
      default:
        // Default to large if screen size not detected
        mp4 = config._large?._mp4 || '';
        webm = config._large?._webm || '';
        poster = config._large?._graphic || '';
    }
    
    // Debug logging to help troubleshoot (AFTER variables are set)
    console.log('BackgroundVideo Debug:', {
      _screenSize,
      'device.screenSize': device.screenSize,
      'used': screenSize,
      'viewport': window.innerWidth + 'px',
      'hasXlarge': !!config._xlarge?._mp4,
      'hasLarge': !!config._large?._mp4,
      'hasMedium': !!config._medium?._mp4,
      'hasSmall': !!config._small?._mp4,
      'selectedVideo': mp4 || webm || 'NONE'
    });
    
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

  // Get video sources to check if we should render
  const { mp4, webm, poster } = getResponsiveMedia();
  
  // Only render video if we have at least one source for this screen size
  if (!mp4 && !webm) {
    console.log('BackgroundVideo: No video source for current screen size, rendering fallback');
    
    // Render fallback poster/graphic if available
    if (poster) {
      return (
        <div className="backgroundvideo__container backgroundvideo__fallback">
          <img src={poster} alt="" className="backgroundvideo__poster" aria-hidden="true" />
        </div>
      );
    }
    
    // No video and no poster - render nothing (empty div to maintain structure)
    return <div className="backgroundvideo__container backgroundvideo__empty" />;
  }
  
  // Render video if source is available
  return <UseVideo />;
}
