# Web Project Template

This is a blank slate project for starting any kind of web application or website.

The development environment is using gulp as a task runner, along with JQuery, TypeScript, and Sass. I prefer this setup to using 
any framework, so I thought I would make a boilerplate all set up for anyone else who wants to start a project similar to mine.

Just use `npm install` to initialize the project. Make sure to do the following, as well:

1. Change the name, description, and author in `package.json` and `package-lock.json`
2. Add any changes you want to `tsconfig.json`
3. Change `README.md`
4. Initialize your own git repo!

## Gulp Tasks

`gulp cleanDist` : Cleans the `dist` folder

`gulp clearCache` : Clears the cache of all optimizes images

`gulp compile` : Compiles the source SCSS and TS code into CSS and JS, respectively.

`gulp build` : Builds the project into the dist folder with concatenated (by directory) and minified CSS and JS files. Optimizes images.

`gulp [default]` : Starts the dev server on port 3000 and begins watching all HTML, SCSS, and TS files

Feel free to fork! I would love any feedback, as well. 

**Happy coding!**
