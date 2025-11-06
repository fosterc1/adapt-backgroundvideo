import React from 'react';

export default function BackgroundVideo(props) {
  const { _backgroundVideo, _screenSize, _id } = props;

  // Safety check - return null if _backgroundVideo is not defined
  if (!_backgroundVideo) {
    return null;
  }

  function UseVideo() {
    const videoProps = {
      id: `backgroundvideo-${_id}`,
      preload: "auto",
      poster: _backgroundVideo._graphic || '',
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

    // Build inline styles for size and position
    const videoStyle = {
      width: '100%',
      height: '100%'
    };
    
    // Set object-fit based on _size
    const size = _backgroundVideo._size || 'cover';
    if (size === '100% 100%') {
      videoStyle.objectFit = 'fill';
    } else {
      videoStyle.objectFit = size; // auto, cover, or contain
    }
    
    // Set object-position based on _position
    if (_backgroundVideo._position) {
      videoStyle.objectPosition = _backgroundVideo._position;
    }
    
    videoProps.style = videoStyle;

    return <video {...videoProps}>
      <source
        src={_backgroundVideo._mp4 !== '' ? _backgroundVideo._mp4 : _backgroundVideo._webm}
        type={_backgroundVideo._mp4 !== '' ? 'video/mp4' : 'video/webm'}
      ></source>
    </video>;
  }

  function UseGraphic() {
    if (_backgroundVideo._graphic) {
      // Build inline styles for graphic to match video styling
      const imgStyle = {
        width: '100%',
        height: '100%'
      };
      
      const size = _backgroundVideo._size || 'cover';
      if (size === '100% 100%') {
        imgStyle.objectFit = 'fill';
      } else {
        imgStyle.objectFit = size;
      }
      
      if (_backgroundVideo._position) {
        imgStyle.objectPosition = _backgroundVideo._position;
      }
      
      return <img src={_backgroundVideo._graphic} style={imgStyle}/>;
    }
    return null;
  }

  if (_screenSize !== 'small') {
    return <UseVideo />;
  }
  return <UseGraphic />;
}
