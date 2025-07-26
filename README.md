# React Infinite Carousel

A customizable, responsive infinite carousel component for React applications. This package provides an easy way to create smooth, infinite-scrolling carousels that can display both images and text.

![image-carousel](./gifs/chrome_fl684oHIqw.gif)

![text-carousel](./gifs/chrome_tk1hC98pST.gif)

## Features

- 🔄 Smooth infinite scrolling animation
- 📱 Responsive design with customizable breakpoints
- 🖼️ Support for both images and text content
- ⚡ Auto-calculation of required clones to fill the viewport
- 🎮 Customizable animation speed and direction
- 🖱️ Interactive hover effects (speed up, slow down, or pause)
- 🌫️ Optional fade effect at the edges
- 📐 Flexible styling options
- 📦 TypeScript support with full type definitions

## Installation

```bash
npm install @azfar_razzaq/react-infinite-carousel
# or
yarn add @azfar_razzaq/react-infinite-carousel
```

## Usage

### Basic Image Carousel

```tsx
import Carousel from "@azfar_razzaq/react-infinite-carousel";

function App() {
  const images = [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg",
  ];

  return (
    <Carousel itemType="images" images_links={images} durationPerClone={10} />
  );
}
```

### Text Carousel

```tsx
import Carousel from "@azfar_razzaq/react-infinite-carousel";

function App() {
  return (
    <Carousel
      itemType="text"
      text="Your scrolling text here"
      animationDirection="rtl"
      hoverSpeedFactor={0.5}
    />
  );
}
```

### Responsive Carousel with Custom Breakpoints

```tsx
import Carousel from "@azfar_razzaq/react-infinite-carousel";

function App() {
  const responsiveConfig = [
    { breakpoint: 480, numOfCopies: 4 }, // up to 480px
    { breakpoint: 768, numOfCopies: 3 }, // 481-768px
    { breakpoint: 1024, numOfCopies: 2 }, // 769-1024px
  ];

  return (
    <Carousel
      itemType="images"
      images_links={images}
      responsiveClones={responsiveConfig}
      fade={50} // 50px fade effect at both edges
    />
  );
}
```

## API Reference

### Common Props

These props are available for both image and text carousels:

| Prop                 | Type                                                 | Default     | Description                                                                                                               |
| -------------------- | ---------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------- |
| `itemType`           | `"images" \| "text"`                                 | Required    | Specifies whether the carousel displays images or text                                                                    |
| `className`          | `string`                                             | `undefined` | Additional CSS class for styling carousel items                                                                           |
| `numOfCopies`        | `number`                                             | `2`         | Base number of copies to display. The actual number of clones will be doubled (e.g., if set to 3, total clones will be 6) |
| `durationPerClone`   | `number`                                             | `10`        | Used for controlling animation speed. Accepts duration in seconds for each clone to complete its animation cycle. Ensures consistent speed across different screen sizes  |
| `animationDuration`  | `number`                                             | `undefined`        | **Deprecated** (will be removed in v3.0.0). Use `durationPerClone` instead for consistent animation speed                 |
| `animationDirection` | `"ltr" \| "rtl"`                                     | `"ltr"`     | Direction of animation (left-to-right or right-to-left)                                                                   |
| `hoverSpeedFactor`   | `number`                                             | `1`         | Speed multiplier on hover (0 = pause, <1 = slower, >1 = faster)                                                           |
| `responsiveClones`   | `Array<{ breakpoint: number, numOfCopies: number }>` | `undefined` | Responsive configuration for different screen sizes. Note: The numOfCopies value is doubled for each breakpoint           |
| `fade`               | `number`                                             | `undefined` | Width in pixels for the fade effect at the edges. Creates a gradient fade at both ends of the carousel                    |

### Image Carousel Props

Additional props when `itemType="images"`:

| Prop           | Type       | Description                                    |
| -------------- | ---------- | ---------------------------------------------- |
| `images_links` | `string[]` | Array of image URLs to display in the carousel |

### Text Carousel Props

Additional props when `itemType="text"`:

| Prop   | Type     | Description                             |
| ------ | -------- | --------------------------------------- |
| `text` | `string` | Text content to display in the carousel |

## Responsive Configuration

By default, the carousel automatically adjusts the number of clones based on the viewport width to ensure optimal display and smooth scrolling. This automatic calculation ensures there are no empty spaces in the carousel regardless of screen size.

However, if you need more control over the responsive behavior, you can use the `responsiveClones` prop. This prop accepts an array of breakpoint configurations, where each configuration object has two properties:

- `breakpoint`: The maximum width in pixels for this configuration to apply
- `numOfCopies`: Base number of copies to display at this breakpoint. The actual number of clones will be doubled (e.g., if set to 3, total clones will be 6)

The carousel follows this logic to determine the number of clones:

1. First, it evaluates the `responsiveClones` array from smallest to largest breakpoint.
2. If the current viewport width is greater than all defined breakpoints, it falls back to the `numOfCopies` parameter.
3. If `numOfCopies` is not provided, it uses automatic calculation.

For example:

```tsx
const breakpoints = [
  { breakpoint: 1024, numOfCopies: 3 }, // Applied up to 1024px
  { breakpoint: 1200, numOfCopies: 5 }, // Applied between 1024px and 1200px
];
```

If the viewport width is 1400px (greater than all breakpoints):

- First tries to use `numOfCopies` parameter
- If `numOfCopies` is not provided, falls back to automatic calculation

If neither `responsiveClones` nor `numOfCopies` is provided, the carousel will use its automatic calculation mode to determine the optimal number of copies needed to fill the viewport.

## License

ISC

## Author

Azfar Razzaq

## Issues and Feedback

Found a bug or have a feature request? Please file an issue at [GitHub Issues](https://github.com/Azfar731/react-infinite-carousel-package/issues).
