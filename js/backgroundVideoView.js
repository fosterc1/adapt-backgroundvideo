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
    _.bindAll(this, 'render', 'onScreenChange', 'onVideoError', 'onVideoLoadedData');
    this.hasUserPaused = false;
    this.config = this.model.get('_backgroundVideo');
    this.isLoopsComplete = false;
    this.videoListenersAdded = false;
    this.checkReducedMotion();
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
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState !== 'visible') {
        this.onOffScreen();
      }
    });

    this.listenTo(Adapt, 'device:changed', this.render);
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
        console.warn('BackgroundVideo: Play was prevented', error.name);
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
      $button.attr('aria-label', isPaused ? 'Play video' : 'Pause video');
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
    // Clean up event listeners when view is removed
    if (this.video && this.videoListenersAdded) {
      this.video.removeEventListener('ended', this.onVideoEnded);
      this.video.removeEventListener('play', this.updateButtonState);
      this.video.removeEventListener('pause', this.updateButtonState);
      this.video.removeEventListener('playing', this.updateButtonState);
      this.video.removeEventListener('error', this.onVideoError);
      this.video.removeEventListener('loadeddata', this.onVideoLoadedData);
    }
    
    Backbone.View.prototype.remove.call(this);
  }

}
BackgroundVideoView.template = 'backgroundvideo';

export default BackgroundVideoView;
