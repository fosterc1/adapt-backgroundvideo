import Adapt from 'core/js/adapt';
import device from 'core/js/device';
import { templates } from 'core/js/reactHelpers';
import React from 'react';
import ReactDOM from 'react-dom';
class BackgroundVideoView extends Backbone.View {

  className() {
    return 'backgroundvideo';
  }

  events() {
    return {
      'click .backgroundvideo__playpause': 'onPlayPauseClick',
      'keydown .backgroundvideo__playpause': 'onPlayPauseKeydown',
      'click .backgroundvideo__sound': 'onSoundClick'
    };
  }

  initialize() {
    _.bindAll(this, 'render', 'onScreenChange', 'onVideoError', 'onVideoLoadedData', 'onDeviceChanged', 'cleanupVideo');
    this.hasUserPaused = false;
    this.config = this.model.get('_backgroundVideo');
    this.isLoopsComplete = false;
    this.videoListenersAdded = false;
    this.checkReducedMotion();
    console.log('BackgroundVideoView.initialize - device.screenSize:', device.screenSize, 'viewport:', window.innerWidth + 'px');
    this.render(device.screenSize);
    this.setUpListeners();
  }

  checkReducedMotion() {
    // Respect user's reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion && this.config._autoPlay) {
      this.config._autoPlay = false;
      this.hasUserPaused = true;
    }
  }

  setUpListeners() {
    // Store visibility handler so we can clean it up later
    this.visibilityHandler = () => {
      if (document.visibilityState !== 'visible') {
        this.onOffScreen();
      }
    };
    document.addEventListener('visibilitychange', this.visibilityHandler);

    // Instead of re-rendering on device:changed, just update video sources
    this.listenTo(Adapt, 'device:changed', this.onDeviceChanged);
  }

  onDeviceChanged(screenSize) {
    console.log('BackgroundVideoView.onDeviceChanged - screenSize:', screenSize, 'viewport:', window.innerWidth + 'px');
    
    // Update model with new screen size
    this.model.set('_screenSize', screenSize);
    
    // Get new video source for current screen size
    const newSource = this.getVideoSourceForScreenSize(screenSize);
    
    // Handle case where no video exists yet (initial render or coming from no-video state)
    if (!this.video) {
      console.log('BackgroundVideoView.onDeviceChanged - no existing video element');
      
      // Check if we should render a video now
      if (newSource && newSource !== '') {
        console.log('BackgroundVideoView.onDeviceChanged - rendering video for first time');
        this.render(screenSize);
      } else {
        console.log('BackgroundVideoView.onDeviceChanged - no video source, staying in no-video state');
      }
      return;
    }
    
    // Store current playback state before updating
    const wasPlaying = !this.video.paused;
    const currentTime = this.video.currentTime;
    const wasMuted = this.video.muted;
    const currentSource = this.video.currentSrc;
    
    // Check if we need to hide the video (no source for this screen size)
    if (!newSource || newSource === '') {
      console.log('BackgroundVideoView.onDeviceChanged - no video for screen size, hiding video');
      
      // Clean up and hide video
      this.cleanupVideo();
      
      // Re-render without video (will show fallback/poster or nothing)
      this.render(screenSize);
      return;
    }
    
    // Only reload video if source has actually changed
    if (newSource !== currentSource && !currentSource.includes(newSource)) {
      console.log('BackgroundVideoView.onDeviceChanged - source changed, updating video');
      
      // Clean up existing video properly before reload
      this.cleanupVideo();
      
      // Re-render with new source
      this.render(screenSize);
      
      // Restore playback state after a brief delay
      setTimeout(() => {
        if (this.video) {
          this.video.muted = wasMuted;
          this.video.currentTime = Math.min(currentTime, this.video.duration || 0);
          if (wasPlaying && !this.hasUserPaused) {
            this.play();
          }
        }
      }, 100);
    } else {
      console.log('BackgroundVideoView.onDeviceChanged - source unchanged, no reload needed');
    }
  }

  getVideoSourceForScreenSize(screenSize) {
    const config = this.config;
    let source = '';
    
    switch(screenSize) {
      case 'xlarge':
        source = config._xlarge?._mp4 || config._xlarge?._webm || '';
        break;
      case 'large':
        source = config._large?._mp4 || config._large?._webm || '';
        break;
      case 'medium':
        source = config._medium?._mp4 || config._medium?._webm || '';
        break;
      case 'small':
        source = config._small?._mp4 || config._small?._webm || '';
        break;
      default:
        source = config._large?._mp4 || config._large?._webm || '';
    }
    
    return source;
  }

  cleanupVideo() {
    if (!this.video) return;
    
    console.log('BackgroundVideoView.cleanupVideo - cleaning up video element');
    
    // Pause and remove all event listeners
    this.video.pause();
    
    if (this.videoListenersAdded) {
      this.video.removeEventListener('ended', this.onVideoEnded);
      this.video.removeEventListener('play', this.updateButtonState);
      this.video.removeEventListener('pause', this.updateButtonState);
      this.video.removeEventListener('playing', this.updateButtonState);
      this.video.removeEventListener('error', this.onVideoError);
      this.video.removeEventListener('loadeddata', this.onVideoLoadedData);
      this.videoListenersAdded = false;
    }
    
    // Clear video sources to free memory
    this.video.src = '';
    this.video.load();
    
    // Clear reference
    this.video = null;
  }

  setupVideoListeners() {
    if (!this.video || this.videoListenersAdded) return;
    
    // Video playback events
    this.video.addEventListener('ended', this.onVideoEnded.bind(this));
    this.video.addEventListener('play', this.updateButtonState.bind(this));
    this.video.addEventListener('pause', this.updateButtonState.bind(this));
    this.video.addEventListener('playing', this.updateButtonState.bind(this));
    
    // Error handling
    this.video.addEventListener('error', this.onVideoError.bind(this));
    this.video.addEventListener('loadeddata', this.onVideoLoadedData.bind(this));
    
    this.videoListenersAdded = true;
  }

  onVideoError(event) {
    const error = this.video?.error;
    if (error) {
      console.warn('BackgroundVideo: Error loading video', {
        code: error.code,
        message: error.message
      });
      this.$el.addClass('is-backgroundvideo-error');
      
      // Show poster/fallback image on error
      if (this.config._graphic) {
        this.$el.addClass('is-backgroundvideo-fallback');
      }
    }
  }

  onVideoLoadedData() {
    this.$el.removeClass('is-backgroundvideo-error is-backgroundvideo-loading');
    this.$el.addClass('is-backgroundvideo-ready');
  }

  onScreenChange(event, { onscreen, percentInview } = {}) {
    const isOffScreen = (!onscreen || percentInview < (this.config._onScreenPercentInviewVertical ?? 1));
    if (isOffScreen) return this.onOffScreen();
    this.onOnScreen();
  }

  onOffScreen() {
    if (!this.video) return;
    
    if (this.video.currentTime > 0 && this.config._playFirstViewOnly) {
      this.pause(true);
      return;
    }
    if (!this.config._playFirstViewOnly && this.isLoopsComplete) {
      this.rewind();
      return;
    }

    if (this.video.paused || this.hasUserPaused || !this.config._offScreenPause) return;
    this.pause(true);

    if (this.config._offScreenRewind) this.rewind();
  }

  onOnScreen() {
    if (!this.video) return;
    
    if (!this.video.paused || this.isLoopsComplete) return;
    this.$el.removeClass('is-video-nocontrols');
    if (this.hasUserPaused) return;
    if (!this.config._autoPlay) {
      if (!this.hasStarted) {
        this.hasStarted = true;
        this.video.currentTime = 0;
      }
      this.pause(true);
      return;
    }
    this.play(true);
  }

  onVideoEnded() {
    if (this.config._loops === -1) {
      this.rewind();
      this.play();
    } else if (this.config._loops > 0) {
      this.config._loops--;
      this.rewind();
      this.play();
    } else {
      this.isLoopsComplete = true;
      this.updateButtonState();
    }
  }

  play(noControls = false) {
    if (!this.video) return;
    
    const playPromise = this.video.play();
    
    // Handle play promise for better error handling
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // Silently handle autoplay prevention - this is expected browser behavior
        // The video will play when user interacts with the page or uses controls
        // Only log unexpected errors
        if (error.name !== 'AbortError' && error.name !== 'NotAllowedError') {
          console.warn('BackgroundVideo: Unexpected video error', error.name);
        }
      });
    }
    
    this.updateButtonState();
    if (noControls) this.$el.removeClass('is-video-nocontrols');
  }

  pause(noControls = false) {
    if (!this.video) return;
    if (noControls) this.$el.addClass('is-video-nocontrols');

    this.video.pause();
    this.updateButtonState();
  }

  rewind() {
    if (!this.video) return;
    this.video.currentTime = 0;
    this.updateButtonState();
  }

  updateButtonState() {
    if (!this.video) return;
    
    // Update class states
    if (this.isLoopsComplete) this.$el.addClass('is-backgroundvideo-nocontrols');
    this.$el.toggleClass('is-backgroundvideo-playing', !this.video.paused);
    this.$el.toggleClass('is-backgroundvideo-paused', this.video.paused);
    
    // Update ARIA attributes for accessibility
    const $button = this.$el.find('.backgroundvideo__playpause');
    if ($button.length > 0) {
      const isPaused = this.video.paused;
      // Use translatable globals for button labels
      const globals = this.model.get('_globals');
      const playLabel = globals?.playButton || 'Play video';
      const pauseLabel = globals?.pauseButton || 'Pause video';
      
      $button.attr('aria-label', isPaused ? playLabel : pauseLabel);
      $button.attr('aria-pressed', isPaused ? 'false' : 'true');
    }
  }

  onPlayPauseClick(event) {
    event.preventDefault();
    this.togglePlayPause();
  }

  onPlayPauseKeydown(event) {
    // Support Space and Enter keys for accessibility
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.togglePlayPause();
    }
  }

  togglePlayPause() {
    if (!this.video || !this.config._showControls || this.isLoopsComplete) return;

    if (this.video.paused) {
      this.play();
    } else {
      this.pause();
    }

    this.hasUserPaused = this.video.paused;
    if (this.hasUserPaused && this.config._onPauseRewind) this.rewind();
  }

  onSoundClick(event) {
    event.preventDefault();
    if (!this.video || !this.config._showControls) return;
    this.video.muted = !this.video.muted;
    this.$el.find('.backgroundvideo__sound').toggleClass('backgroundvideo__mute', this.video.muted);
  }

  render(screenSize) {
    console.log('BackgroundVideoView.render called with screenSize:', screenSize, 'viewport:', window.innerWidth + 'px');
    this.model.set('_screenSize', screenSize);
    const props = { ...this.model.toJSON() };
    const Template = templates[this.constructor.template.replace('.jsx', '')];
    ReactDOM.render(<Template {...props} />, this.el);
    
    // Re-delegate events after React render to ensure buttons work
    this.delegateEvents();
    
    this.backgroundvideo = this.$el.find('video');
    if (this.backgroundvideo.length > 0) {
      this.backgroundvideo.on('onscreen', this.onScreenChange);
      this.video = this.backgroundvideo[0];
      
      // Set up video listeners (only once)
      this.setupVideoListeners();
      
      // Update button state after a short delay to account for autoplay
      setTimeout(() => {
        this.updateButtonState();
      }, 100);
    }
  }

  remove() {
    console.log('BackgroundVideoView.remove - cleaning up');
    
    // Clean up video properly
    this.cleanupVideo();
    
    // Clean up visibility listener
    if (this.visibilityHandler) {
      document.removeEventListener('visibilitychange', this.visibilityHandler);
    }
    
    Backbone.View.prototype.remove.call(this);
  }

}
BackgroundVideoView.template = 'backgroundvideo';

export default BackgroundVideoView;
