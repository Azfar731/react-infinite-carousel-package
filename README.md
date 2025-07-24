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
    <Carousel itemType="images" images_links={images} animationDuration={20} />
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
    { breakpoint: 480, num_of_copies: 4 }, // up to 480px
    { breakpoint: 768, num_of_copies: 3 }, // 481-768px
    { breakpoint: 1024, num_of_copies: 2 }, // 769-1024px
  ];

  return (
    <Carousel
      itemType="images"
      images_links={images}
      responsiveClones={responsiveConfig}
    />
  );
}
```

## API Reference

### Common Props

These props are available for both image and text carousels:

| Prop                 | Type                                                   | Default     | Description                                                     |
| -------------------- | ------------------------------------------------------ | ----------- | --------------------------------------------------------------- |
| `itemType`           | `"images" \| "text"`                                   | Required    | Specifies whether the carousel displays images or text          |
| `className`          | `string`                                               | `undefined` | Additional CSS class for styling carousel items                 |
| `num_of_copies`      | `number`                                               | `2`         | Static number of copies to display (overrides auto-calculation) |
| `animationDuration`  | `number`                                               | `20`        | Duration of one complete animation cycle in seconds             |
| `animationDirection` | `"ltr" \| "rtl"`                                       | `"ltr"`     | Direction of animation (left-to-right or right-to-left)         |
| `hoverSpeedFactor`   | `number`                                               | `1`         | Speed multiplier on hover (0 = pause, <1 = slower, >1 = faster) |
| `responsiveClones`   | `Array<{ breakpoint: number, num_of_copies: number }>` | `undefined` | Responsive configuration for different screen sizes             |

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
- `num_of_copies`: Number of copies to display at this breakpoint

Configurations are evaluated from smallest to largest breakpoint. The first rule whose breakpoint is greater than or equal to the current viewport width is applied.

If neither `responsiveClones` nor `num_of_copies` is provided, the carousel will use its automatic calculation mode to determine the optimal number of copies needed to fill the viewport.

## License

ISC

## Author

Azfar Razzaq

## Issues and Feedback

Found a bug or have a feature request? Please file an issue at [GitHub Issues](https://github.com/Azfar731/react-infinite-carousel-package/issues).
