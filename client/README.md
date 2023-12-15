# Genezio Weather template featuring React and Tailwind.

This template uses [genez.io](https://genez.io/) to build and host a Weather application. The project requires a pair backend template which can be found [here](https://github.com/Genez-io/weather-backend-typescript-template).

This template should not be deployed manually, instead use our New Project feature: https://app.genez.io/new-project

To learn more about how to manually deploy a project check our [documentation](https://docs.genez.io/genezio-documentation/getting-started).

This project was bootstrapped with [Vite](https://vitejs.dev/), and it is using the [Tailwind CSS](https://tailwindcss.com) framework.

## Available Scripts

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

Your app is ready to be deployed!

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
