# adapt-backgroundVideo

[![Version](https://img.shields.io/badge/version-2.7.7-blue.svg)](https://github.com/fosterc1/adapt-backgroundvideo)
[![License](https://img.shields.io/badge/license-GPL--3.0-green.svg)](LICENSE)
[![Adapt Framework](https://img.shields.io/badge/Adapt-5.14.0+-important.svg)](https://github.com/adaptlearning/adapt_framework)
[![WCAG](https://img.shields.io/badge/WCAG-2.1%20AA%2FAAA-brightgreen.svg)](https://www.w3.org/WAI/WCAG21/quickref/)

**Background Video** is an *extension* for the Adapt Framework that adds responsive background videos to any element (menu, page, article, block) with device-specific optimization and comprehensive accessibility support.

## ✨ Features

- 📱 **Device-Specific Videos** - Serve optimized videos per screen size (Extra Large, Large, Medium, Small)
- ♿ **WCAG 2.1 AA/AAA Compliant** - Full accessibility with screen readers, keyboard navigation, and reduced motion
- 🌍 **RTL Support** - Complete right-to-left language support using CSS logical properties
- 🎨 **Fully Customizable** - 16 CSS custom properties for complete styling control
- 📐 **Responsive Design** - Device-specific posters and videos for optimal performance
- ⚡ **Smart Error Handling** - Graceful fallback to poster images with silent autoplay handling
- 🎭 **Reduced Motion** - Respects system accessibility preferences
- 🌐 **Cross-Browser** - Works on all modern browsers with HTML5 video support
- 🎮 **User Controls** - Optional play/pause buttons with translatable labels
- 📖 **Comprehensive Docs** - Extensive documentation and customization guide

**📖 See [CUSTOMIZATION.md](CUSTOMIZATION.md) for complete styling guide with 8+ examples**

## Settings Overview

### Attributes

The following attributes, set within  *course.json*, *contentObjects.json*, *articles.json* and *blocks.json*, configure the defaults for **Background Video**.  

>**_backgroundVideo** (object): The _backgroundVideo object that contains values for all configuration options.

### Basic Configuration

>>**_isEnabled** (boolean): Enable or disable the _backgroundVideo. Default: `false`

### Device-Specific Videos (Required)

The extension requires you to specify videos for different screen sizes. At least one size must be configured:

>>**_xlarge** (object): Video files for Extra Large screens
>>>**_mp4** (string): MP4 video for Extra Large screens
>>>**_webm** (string): WEBM video for Extra Large screens (optional)
>>>**_graphic** (string): Poster image for Extra Large screens (optional)

>>**_large** (object): Video files for Large screens
>>>**_mp4** (string): MP4 video for Large screens
>>>**_webm** (string): WEBM video for Large screens (optional)
>>>**_graphic** (string): Poster image for Large screens (optional)

>>**_medium** (object): Video files for Medium screens
>>>**_mp4** (string): MP4 video for Medium screens
>>>**_webm** (string): WEBM video for Medium screens (optional)
>>>**_graphic** (string): Poster image for Medium screens (optional)

>>**_small** (object): Video files for Small screens
>>>**_mp4** (string): MP4 video for Small screens
>>>**_webm** (string): WEBM video for Small screens (optional)
>>>**_graphic** (string): Poster image for Small screens (optional)

**How it works:**
- The extension automatically selects the appropriate video and poster based on the current screen size
- **Dynamic Breakpoints**: Uses Adapt's `device.screenSize` from `config.json` Course Configuration:
  - **Small**: up to 719px (default, configurable)
  - **Medium**: 720-959px (default, configurable)
  - **Large**: 960-1279px (default, configurable)
  - **Extra Large**: 1280px+ (default, configurable)
- **Automatic Updates**: When viewport is resized and crosses a breakpoint, the video automatically switches
- **Respects Custom Breakpoints**: If course author changes breakpoints in `config.json`, extension uses those values
- **No fallback**: Videos only play on their exact screen size match
- If a screen size doesn't have a video configured, no video will play (only poster shows if available)
- Example: If only `_xlarge` is configured, the video only plays on Extra Large screens (1280px+)
- Each size can have its own optimized poster image

**Benefits:**
- Serve optimized video file sizes for each device type
- Device-specific poster images for better loading experience
- Reduce bandwidth usage on mobile devices (smaller video files)
- Improve page load performance across all devices
- Better user experience with appropriately sized media

**Dynamic Behavior:**
- ✅ **Responsive**: Automatically switches videos when viewport is resized
- ✅ **Configurable**: Reads breakpoint values from `config.json` Course Configuration
- ✅ **Custom Breakpoints**: Supports custom breakpoint values set by course authors
- ✅ **Real-time Updates**: Listens to Adapt's `device:changed` event for instant updates
- ✅ **Orientation Changes**: Responds to device orientation changes (portrait/landscape)

**Example: Custom Breakpoints**  
If course author sets custom breakpoints in `config.json`:
```json
{
  "screenSize": {
    "small": 600,
    "medium": 900,
    "large": 1200
  }
}
```
The extension will automatically use:
- Small: up to 600px
- Medium: 601-900px
- Large: 901-1200px
- Extra Large: 1201px+

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
- Silent handling of browser autoplay prevention (expected behavior)
- Console warnings only for unexpected errors
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
 
The background video extension works on all screen sizes including mobile devices. Videos only play on their exact configured screen size (no fallback cascade).

---

## 📝 Changelog

### v2.7.7 (2025-01-08) - Remove Pixel Values from Schema
- ✅ **Schema Update**: Removed pixel values from AAT display (Extra Large, Large, Medium, Small)
- ✅ **Dynamic Reference**: Help text now references Course Configuration breakpoints
- ✅ **Cleaner UI**: AAT shows simple size names without hardcoded pixel values
- ✅ **Accurate**: Reflects that breakpoints are configurable and dynamic

### v2.7.6 (2025-01-08) - Dynamic Breakpoint Documentation
- ✅ **Clarified**: Extension IS dynamic and responds to config.json breakpoints
- ✅ **Added**: Dynamic Behavior section explaining real-time updates
- ✅ **Added**: Custom breakpoint example showing flexibility
- ✅ **Confirmed**: Uses Adapt's device:changed event for automatic video switching

### v2.7.5 (2025-01-08) - Breakpoint Correction (IMPORTANT)
- 🔴 **Critical Fix** - Corrected breakpoints to match Adapt Framework standards
- ✅ **Small**: up to 719px (was incorrectly documented as 767px)
- ✅ **Medium**: 720-959px (was incorrectly documented as 768px+)
- ✅ **Large**: 960-1279px (was incorrectly documented as 1024px+)
- ✅ **Extra Large**: 1280px+ (was incorrectly documented as 1440px+)
- Updated all documentation and schema descriptions to match Adapt Course Configuration
- Note: Template code was already using correct Adapt breakpoints via device.screenSize

### v2.7.4 (2025-01-08) - Documentation Improvements
- ✅ Professional badges and improved structure

### v2.7.3 (2025-01-08) - RTL and Mobile Accessibility
- ✅ **Full RTL Support** - CSS logical properties for right-to-left languages
- ✅ **WCAG 2.1 AAA** - 44px minimum touch targets on mobile
- ✅ **Enhanced Focus** - :focus-visible for better keyboard navigation

### v2.7.2 (2025-01-08) - Console Improvements
- ✅ **Cleaner Console** - Silent handling of expected autoplay prevention

### v2.7.1 (2025-01-08) - Fallback Fix
- ✅ **Exact Matching** - Videos only play on their configured screen size

### v2.7.0 (2025-01-08) - Device-Specific Only (BREAKING)
- 🔴 **Breaking Change** - Removed root-level _mp4/_webm/_graphic
- ✅ **Device-Specific Posters** - Each size has its own poster image
- ✅ **Cleaner Structure** - _isEnabled first, then size objects

### v2.6.0 (2025-01-07) - Responsive Breakpoints
- ✅ **Device-Specific Videos** - _xlarge, _large, _medium, _small support
- ✅ **Intelligent Fallback** - Automatic size cascade (later removed in v2.7.1)

### v2.5.0 (Previous) - CSS Customization
- ✅ **CSS Variables** - 16 custom properties for styling
- ✅ **Rem Units** - Scalable sizing throughout

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the **GPL-3.0 License** - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/fosterc1/adapt-backgroundvideo/issues)
- **Adapt Community**: [Community Forums](https://community.adaptlearning.org/)

---

**Author / maintainer:** [fosterc1](https://github.com/fosterc1/)<br>
**Accessibility support:** WCAG 2.1 AA/AAA Compliant - Full screen reader support, keyboard navigation, reduced motion, 44px touch targets<br>
**RTL support:** Yes - CSS logical properties for Arabic, Hebrew, Persian, Urdu, etc.<br>
**Cross-platform coverage:** Chrome 60+, Firefox 55+, Safari 12+, Edge 79+, iOS Safari 12+, Chrome Mobile (Android)<br>
**Adapt Framework:** v5.14.0+<br>
**Version:** 2.7.5

---

**Made with ❤️ for the Adapt Learning Community** 