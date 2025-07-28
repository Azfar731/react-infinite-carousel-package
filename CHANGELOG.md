# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/).

## [2.0.0] - 2025-07-25

### Added

- Introduced `fade` prop to enable a gradient mask effect at the horizontal edges of the carousel.
  - Accepts a value like `{ fade: number }`, where the number defines the **number of pixels** over which the fade effect is applied on both edges.
  - Useful for creating a soft entrance/exit look for scrolling elements.

### Changed

- Renamed `num_of_copies` to `numOfCopies` in the `responsiveClones` array to match camelCase naming conventions used throughout the package.

### Breaking

- If you previously used:
  ```ts
  responsiveClones: [{ breakpoint: 1024, num_of_copies: 3 }];
  ```
  You must update it to
  ```ts
  responsiveClones: [{ breakpoint: 1024, numOfCopies: 3 }];
  ```

## [2.0.1] - 2025-07-25

### Fixed

- Improved fallback behavior when viewport width exceeds the highest defined breakpoint:
  - If `numOfCopies` is provided, it will now be used as the fallback.
  - If `numOfCopies` is **not** provided, the system will now apply **auto-calculation**.
- Previously, the system defaulted to `2`, which often led to insufficient clones on large screens.

## [2.1.0] - 2025-07-26

### Added

- Introduced `durationPerClone` prop for consistent animation across different screen sizes.

### Deprecated

- Marked `animationDuration` as deprecated. It will be removed in the next major release.

## [2.1.1] - 2025-07-28

### Fixed

- Breakpoint fallback now responds to viewport changes:
  - Resolved an issue where the carousel did not recalculate number of clones using auto-calculation or numOfCopies, when the viewport width changed after the initial load.
