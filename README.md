# Project Setup

## Install Node.js

In this project, we are using Node.js version 10.

[Node.js v10.0.0](https://nodejs.org/download/release/v10.0.0/win-x64/)

After Node.js get installed, __npm__ will also be installed automatically.

## Clone the repo

After clone the repo, execute

1. `cd ui`
2. `npm install`

This will install all the dependencies for the project. If no error, still in the *ui* directory, execute

`npm start`

This will start the server on __localhost:8000__, paste it in the browser and you should see our website.

## Project Structure

Currently in this framework, we have `ui` and `api` directory. `api` is another server running mongoDB. Right now we do not need database, so we can ignore that directory. `ui` is the directory we will be working with. 

### Structure of the *ui* directory
```
|- public
    |- app.bundle.js
    |- vendor.bundle.js
    |- index.html
    |- ...
|- src
    |- Issue-----.jsx
    |- App.jsx
    |- Content.jsx
    |- ...
|- uploads
    |- ...
|- uiserver.js
|- package.json
|- webpack.config.js
|- ...
```

In this project, currently we are creating a Single Page Application (SPA) and using **webpack** to bundle all source codes together into `public/app.bundle.js` and `public/vendor.bundle.js`. This two file was included in the `public/index.html` which forms our web app.

The `src` directory contains all the source codes of `React` and others. Since this project structure was taken from another web app called *Issue Tracker*, all the jsx files started with Issue is for that app. I do not remove them in order to keep their structure because they can be our template. You can have a look at their structure by start looking at the `App.jsx` which is the entry point of our code, then `Page.jsx` -> `NavBar.jsx` -> `Contents.jsx` -> `...`. After familiar with the structure, you can remove those Issue---.jsx files.

The `uiserver.js` is the server of our project. We are using `Express` as server. 

The `webpack.config.js` is the webpack configuration file. I configured babel-loader, style-loader, css-loader. If you want to configure sass, you can follow this video: [Webpack Loaders, CSS, & SASS](https://www.youtube.com/watch?v=rrMGUnBmjwQ&list=LLwh8fnp5guOEcjA6UXzbwAg&index=2&t=334s).

The `uploads` directory is used for receiving uploaded files.

## Development

While developing, please open two command windows,

The first one:

1. `cd ui`
2. `npm run watch`

This will automatically run webpack to transpile jsx, css into js and bundle them together when any file changes in `src`.

The second one:

1. `cd ui`
2. `npm start`

This will start the server.

We have added Hot Module Replacement so that for the most time you do not need to restart the server when the source code changed.

