# adapt-backgroundVideo  

**BackgroundVideo** is an *extension* to add videos to the background of an element (menu, page, article, block).  

## Settings Overview

### Attributes

The following attributes, set within  *course.json*, *contentObjects.json*, *articles.json* and *blocks.json*, configure the defaults for **Background Video**.  

>**_backgroundVideo** (object): The _backgroundVideo object that contains values for all configuration options.

### Basic Configuration

>>**_isEnabled** (boolean): Enable or disable the _backgroundVideo. Default: `false`

>>**_mp4** (string): File name (including path) of the video file. Path should be relative to the *src* folder (e.g., *course/en/video/video.mp4*).

>>**_webm** (string): File name (including path) of the video file. Path should be relative to the *src* folder (e.g., *course/en/video/video.webm*).

>>**_graphic** (string): File name (including path) of the optional image to be shown while the video is downloading. Path should be relative to the *src* folder (e.g., *course/en/images/video.jpg*).

>>**_selector** (string): Allows to specify a CSS selector (e.g., *.page__header*). Leave empty to apply to the entire element.

>>**_minHeight** (number): The minimum height in pixels of the video container.

### Playback Controls

>>**_loops** (number): Number of times the video should loop. Use `-1` for infinite loop, `0` for no loop, or a positive number for specific count. Default: `-1`

>>**_isMuted** (boolean): Start the video muted. Default: `true`

>>**_autoPlay** (boolean): Automatically play the video when it comes into view. Default: `true`

>>**_playsinline** (boolean): Play video inline on mobile devices (prevents fullscreen). Default: `true`

### Visibility Controls

>>**_onScreenPercentInviewVertical** (number): Percentage of video that must be visible on screen to trigger playback. Value between 0 and 1 (where 1 = 100%). Default: `1`

>>**_playFirstViewOnly** (boolean): Only play the video the first time it comes into view. Subsequent views will not trigger playback. Default: `false`

>>**_offScreenPause** (boolean): Pause the video when it goes off screen or out of the viewport. Default: `true`

>>**_offScreenRewind** (boolean): Rewind the video to the beginning when it goes off screen. Default: `false`

### User Interaction

>>**_showControls** (boolean): Show play/pause and sound control buttons overlay on the video. Default: `true`

>>**_onPauseRewind** (boolean): Rewind the video to the beginning when user manually pauses it. Default: `true`

## Default Styling

The background video uses the following CSS defaults:
- **Size**: `100% 100%` (object-fit: fill) - Video fills the entire container
- **Position**: `center top` - Video is aligned to the top center of the container

## Play/Pause Button Customization

When `_showControls` is enabled, a play/pause button is displayed. The default styling can be customized by overriding the `.backgroundvideo__playpause` class in your theme CSS:

### Default Button Styles
```css
.backgroundvideo__playpause {
    position: fixed;        /* Fixed to viewport */
    bottom: 20px;           /* 20px from bottom */
    right: 20px;            /* 20px from right */
    z-index: 9999;          /* Always on top */
    width: 50px;            /* Button width */
    height: 50px;           /* Button height */
    border-radius: 50%;     /* Circular button */
    background-color: rgba(0, 0, 0, 0.7);  /* Semi-transparent black */
    border: 2px solid rgba(255, 255, 255, 0.8);  /* White border */
    color: white;
    pointer-events: auto;   /* Required for button to receive clicks */
}
```

### Customization Examples

**Move button to bottom left:**
```css
.backgroundvideo__playpause {
    left: 20px;
    right: auto;
}
```

**Change button color to blue:**
```css
.backgroundvideo__playpause {
    background-color: rgba(0, 100, 255, 0.8);
    border-color: white;
}
```

**Make button larger:**
```css
.backgroundvideo__playpause {
    width: 70px;
    height: 70px;
    font-size: 28px;
}
```

**Position relative to parent instead of viewport:**
```css
.backgroundvideo__playpause {
    position: absolute;
    /* Now positioned relative to video container */
}
```

## Limitations
 
The background video extension works on all screen sizes including mobile devices.

----------------------------
**Version number:**  2.3.0  
**Framework versions:**  5.14.0+     
**Author / maintainer:**  [fosterc1](https://github.com/fosterc1/)    
**Accessibility support:**    
**RTL support:**  
**Cross-platform coverage:** 