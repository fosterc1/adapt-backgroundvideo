# Changelog

All notable changes to the Background Video extension will be documented in this file.

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
