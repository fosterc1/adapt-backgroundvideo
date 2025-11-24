# Changelog

All notable changes to the Background Video extension will be documented in this file.

## [2.7.12] - 2025-11-24

### Fixed
- **Critical**: Video now properly hides when rotating to screen sizes without configured video sources
  - Previously, when rotating from landscape (medium with video) to portrait (small without video), the medium video would persist
  - Now correctly removes/hides video element when no source is configured for current screen size
  - Added early return in `onDeviceChanged()` when no video source is available
  - Template now conditionally renders video only when sources exist
  - Fallback behavior: Shows poster image if available, or empty container if no video/poster

### Changed
- Enhanced `onDeviceChanged()` logic to detect and handle missing video sources
- Updated `backgroundvideo.jsx` template to conditionally render based on video source availability
- Added console logging for better debugging of screen size transitions

### Technical Details
- **Modified Files**:
  - `js/backgroundVideoView.js`: Added check for empty video sources in device change handler
  - `templates/backgroundvideo.jsx`: Conditional rendering logic for no-video scenarios
- **Behavior**: 
  - Portrait (small, no video) → Landscape (medium, with video): ✅ Video appears
  - Landscape (medium, with video) → Portrait (small, no video): ✅ Video disappears (FIXED)
  - Proper cleanup and re-render on all orientation changes

**Testing**: Verified on iPhone 14 Pro with portrait/landscape orientation changes

## [2.7.11] - 2025-11-24

### Fixed
- **CRITICAL**: Fixed browser crashes on orientation change between portrait and landscape on touch devices
- Fixed memory leaks caused by video elements not being properly cleaned up during orientation changes
- Fixed accumulating event listeners on repeated orientation changes
- Fixed unnecessary video reloads when video source hasn't changed for the new screen size

### Changed
- Replaced full re-render on `device:changed` with intelligent video source checking
- Only reload video when the source actually changes for the new screen size
- Preserve playback state (time, muted, playing) across necessary video reloads
- Added proper cleanup of video elements and event listeners before reloading
- Added visibility change handler cleanup in `remove()` method

### Technical Details
- New `onDeviceChanged()` method checks if video source needs updating before reload
- New `getVideoSourceForScreenSize()` method determines correct video for screen size
- New `cleanupVideo()` method properly removes event listeners and clears video memory
- Enhanced logging for orientation change debugging

## [2.7.10] - Previous Release

Earlier changes not documented in changelog.
