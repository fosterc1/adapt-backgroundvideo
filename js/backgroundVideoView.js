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
      'click .backgroundvideo__sound': 'onSoundClick'

    };
  }

  initialize() {
    _.bindAll(this, 'render', 'onScreenChange');
    this.hasUserPaused = false;
    this.config = this.model.get('_backgroundVideo');
    this.isLoopsComplete = false;
    this.render(device.screenSize);
    this.setUpListeners();
  }

  setUpListeners() {
    if (this.video) {
      this.video.addEventListener('ended', this.onVideoEnded.bind(this));
    }

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState !== 'visible') {
        this.onOffScreen();
      }
    });

    this.listenTo(Adapt, 'device:changed', this.render);
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
      this.update();
    }
  }

  play(noControls = false) {
    if (!this.video) return;
    this.video.play();
    this.update();
    if (noControls) this.$el.removeClass('is-video-nocontrols');

  }

  pause(noControls = false) {
    if (!this.video) return;
    if (noControls) this.$el.addClass('is-video-nocontrols');

    this.video.pause();
    this.update();
  }

  rewind() {
    if (!this.video) return;

    this.update();
    this.video.currentTime = 0;
  }

  update() {
    if (!this.video) return;
    if (this.isLoopsComplete) this.$el.addClass('is-backgroundvideo-nocontrols');
    this.$el.toggleClass('is-backgroundvideo-playing', !this.video.paused);
    this.$el.toggleClass('is-backgroundvideo-paused', this.video.paused);
  }

  onPlayPauseClick(event) {
    event.preventDefault();
    if (!this.video || !this.config._showControls || this.isLoopsComplete) return;

    if (this.video.paused) this.play();
    else this.pause();

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
      // Set up video ended listener if not already set
      if (!this.videoEndedListenerAdded) {
        this.video.addEventListener('ended', this.onVideoEnded.bind(this));
        this.videoEndedListenerAdded = true;
      }
    }
  }

}
BackgroundVideoView.template = 'backgroundvideo';

export default BackgroundVideoView;
