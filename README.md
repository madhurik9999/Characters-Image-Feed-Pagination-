# Rick And Marty Characters

## Running the Project

To run the project, you can use the following scripts defined in the `package.json` file:

- `npm run dev`: Run the project in development mode.
- `npm run build`: Build the project for production.
- `npm run start`: Start the project in production mode.
- `npm run lint`: Run linting for the project.

## Available Configuration in `next.config.js`

The project's `next.config.js` file includes the following configuration related to images:

```javascript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "rickandmortyapi.com",
      pathname: "/api/character/avatar/**",
    },
  ],
}
```

## Available Components

- `Character`: This component is use for rendering the single character image and caption.
- `CharacterList`: This component is use for rendering list of component.
- `Loading`: Displaying spinner before loading the data.
- `PageList`: Displaying the pagination, handling all pagination related stuff in this component

## Packages Installed

- `next`: The Next.js framework for React..
- `react`: The React library.
- `tailwindcss`: A utility-first CSS framework.
