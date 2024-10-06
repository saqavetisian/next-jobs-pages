# Job search aggregator (pages routing)



## Getting Started
To get started with this project, follow these steps:

1. Install the dependencies:
   `npm install`

2. Run the development server:
   `npm run dev`

3. Open your browser and navigate to `http://localhost:3000`.

4. To run tests, please use the script:
   `npm run test`

Tests are written using **Jest** for the main page and the list component.

## Description
This project is a web application built using Next.js, Tailwind CSS, and Framer Motion for animations. It utilizes `useSWR` for data fetching.

## Features
- Responsive design with Tailwind CSS
- Smooth animations with Framer Motion
- Efficient data fetching using `useSWR`
- Test with jest
- Context API for state management

## Design Solutions

The application integrates an **animated, responsive design** using **Framer Motion**, focusing on delivering a seamless and visually appealing user experience. Here are a few key design considerations:

- **Responsiveness:** Ensured the layout and animations adapt smoothly to various screen sizes and devices, providing a consistent experience across mobile, tablet, and desktop views.
- **Framer Motion Integration:** Used for intuitive, fluid animations that enhance user interactions. Subtle transitions and motion effects make the UI feel dynamic yet unobtrusive.
- **UX Optimization:** Focused on the best UX of elements, such as buttons, tabs, and modals, ensuring that user actions are clear and feedback is immediate. The design emphasizes clarity, accessibility, and efficiency in navigation.


## Project Structure
```
public
  - favicon.svg
  - ogImage.jpeg
src
  - __tests__
    - home.test.tsx
    - list.test.tsx
  - components
    - job
      - filter
        - ListTabs.tsx
        - MainInputs.tsx
        - SelectedFilters.tsx
      - Card.tsx
      - Empty.tsx
      - Filter.tsx
      - List.tsx
      - Loading.tsx
    - ui
      - Button.tsx
      - ClientPortal.tsx
      - Divider.tsx
      - Drawer.tsx
      - Form.tsx
      - Input.tsx
      - Skeleton.tsx
      - Tabs.tsx
      - Tag.tsx
      - TagList.tsx
      - TracingBeam.tsx
  - contexts
    - MainContext.ts
    - TabsContext.ts
  - pages
    - api
      - jobs
        - api1.ts
        - api2.ts
        - api3.ts
    - _app.tsx
    - _document.tsx
    - index.tsx
  - styles
    - globals.css
  - utility
    - convertQueryParams.ts
    - fetcher.ts
    - types.ts
    - utils.ts
- jest.config.ts
- next.config.mjs
- package.json
- tailwind.config.ts
- tsconfig.json

```