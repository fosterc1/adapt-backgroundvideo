# adapt-backgroundVideo  

**BackgroundVideo** is an *extension* to add videos to the background of an element (menu, page, article, block).  

## Settings Overview

### Attributes

The following attributes, set within  *course.json*, *contentObjects.json*, *articles.json* and *blocks.json*, configure the defaults for **Background Video**.  

>**_backgroundVideo** (object): The _backgroundVideo object that contains values for all configuration options.

### Basic Configuration

>>**_isEnabled** (boolean): Enable or disable the _backgroundVideo. Default: `false`

### Device-Specific Videos (Required)

The extension requires you to specify videos for different screen sizes. At least one size must be configured:

>>**_xlarge** (object): Video files for extra large devices (1440px+)
>>>**_mp4** (string): MP4 video for extra large screens
>>>**_webm** (string): WEBM video for extra large screens (optional)
>>>**_graphic** (string): Poster image for extra large screens (optional)

>>**_large** (object): Video files for large devices (1024px+)
>>>**_mp4** (string): MP4 video for large screens
>>>**_webm** (string): WEBM video for large screens (optional)
>>>**_graphic** (string): Poster image for large screens (optional)

>>**_medium** (object): Video files for medium devices (768px+)
>>>**_mp4** (string): MP4 video for medium screens (tablets)
>>>**_webm** (string): WEBM video for medium screens (optional)
>>>**_graphic** (string): Poster image for medium screens (optional)

>>**_small** (object): Video files for small devices (up to 767px)
>>>**_mp4** (string): MP4 video for small screens (mobile)
>>>**_webm** (string): WEBM video for small screens (optional)
>>>**_graphic** (string): Poster image for small screens (optional)

**How it works:**
- The extension automatically selects the appropriate video and poster based on the current screen size
- **No fallback**: Videos only play on their exact screen size match
- If a screen size doesn't have a video configured, no video will play (only poster shows if available)
- Example: If only `_xlarge` is configured, the video only plays on xlarge screens
- Each size can have its own optimized poster image

**Benefits:**
- Serve optimized video file sizes for each device type
- Device-specific poster images for better loading experience
- Reduce bandwidth usage on mobile devices (smaller video files)
- Improve page load performance across all devices
- Better user experience with appropriately sized media

### Additional Configuration

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

## Accessibility Features

This extension includes comprehensive accessibility support:

### Screen Reader Support
- Videos are marked with `aria-label="Background video"` and `role="img"`
- Videos are hidden from screen readers with `aria-hidden="true"` (decorative content)
- Play/pause button has dynamic `aria-label` that reflects current state:
  - "Play video" when paused
  - "Pause video" when playing
- Button uses `aria-pressed` to indicate toggle state
- Fallback images include `alt` text and `role="presentation"`

### Keyboard Accessibility
- Play/pause button is fully keyboard accessible
- Supports both **Space** and **Enter** keys to toggle playback
- Focus indicators are provided for keyboard navigation

### Reduced Motion Support
- Automatically respects user's `prefers-reduced-motion` setting
- If user has reduced motion enabled:
  - Autoplay is disabled by default
  - All animations and transitions are removed
  - Button hover effects are disabled

### Error Handling
- Graceful fallback to poster image if video fails to load
- Console warnings for debugging (not visible to end users)
- Visual states for loading, ready, and error conditions

## Default Styling

The background video uses the following CSS defaults:
- **Size**: `100% 100%` (object-fit: fill) - Video fills the entire container
- **Position**: `center top` - Video is aligned to the top center of the container

## Styling & Customization

The extension uses **CSS Custom Properties** for easy styling customization. All button and video styling can be changed via CSS without modifying the extension code.

**📖 See [CUSTOMIZATION.md](CUSTOMIZATION.md) for complete styling guide with 8+ examples**

### Quick CSS Variables

```css
.backgroundvideo {
  --button-size: 3.125rem;
  --button-position-bottom: 1.25rem;
  --button-position-right: 1.25rem;
  --button-bg-color: rgba(0, 0, 0, 0.7);
  --button-text-color: white;
  /* ...and more */
}
```

### What You Can Customize

✅ Button size, position, and colors  
✅ Button hover effects and transitions  
✅ Video container and positioning  
✅ Responsive breakpoints  
✅ Dark mode support  

## Play/Pause Button Customization

When `_showControls` is enabled, a play/pause button is displayed in the bottom right corner. All styling can be customized via CSS variables:

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

**📖 For more customization examples, see [CUSTOMIZATION.md](CUSTOMIZATION.md)**

## Translations

The extension supports multilingual courses through translatable globals:

- **ariaRegion**: ARIA label for the video region (screen readers)
- **playButton**: Label for the play button
- **pauseButton**: Label for the pause button

These can be translated through the Adapt Authoring Tool or by updating the globals in your course JSON files.

## Tips

- **Required Sizes**: You must configure at least one device size (_xlarge, _large, _medium, or _small)
- **Video Format**: Provide both MP4 and WebM formats for maximum browser compatibility
- **Responsive Strategy**: Configure all four sizes for best experience across all devices. Videos only play on their exact screen size match (no fallback)
- **Video Optimization**: Create smaller file sizes for mobile devices - users on cellular connections will appreciate the reduced data usage
- **Poster Images**: Include device-specific poster images for better loading experience on each device type
- **File Size**: Optimize video files - large files impact page load performance. Consider using compression tools or lower bitrates for smaller screens
- **Mobile First**: Start with `_small` configuration for mobile devices, then add larger sizes as needed
- **Autoplay**: Consider user experience - muted autoplay is recommended
- **Controls**: Enable `_showControls` for user control over playback
- **Accessibility**: The extension automatically respects `prefers-reduced-motion`
- **Mobile**: Videos play inline on mobile (no fullscreen) when `_playsinline` is enabled
- **Testing**: Test on actual devices, especially mobile, to ensure smooth playback and verify responsive video switching
- **Customization**: Use CSS variables for easy styling - see CUSTOMIZATION.md
- **Loop Count**: Use `-1` for infinite loop, `0` for no loop, or positive number for specific count
- **Positioning**: Default is `center top` - adjust via CSS if needed

## Browser Support

- **Chrome** 60+
- **Firefox** 55+
- **Safari** 12+
- **Edge** 79+
- **iOS Safari** 12+
- **Chrome Mobile** (Android)

All modern browsers with HTML5 video support.

## Limitations
 
The background video extension works on all screen sizes including mobile devices.

----------------------------
**Version number:**  2.7.1  
**Framework versions:**  5.14.0+     
**Author / maintainer:**  [fosterc1](https://github.com/fosterc1/)    
**Accessibility support:** Yes - WCAG 2.1 AA compliant with full screen reader support, keyboard navigation (Space/Enter keys), dynamic ARIA labels, and reduced motion support  
**RTL support:** Yes  
**Cross-platform coverage:** Desktop (Windows, macOS, Linux), Mobile (iOS, Android), Tablets - All modern browsers (Chrome, Firefox, Safari, Edge) 