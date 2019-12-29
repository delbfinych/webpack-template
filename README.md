# webpack-template
Starter Kit for PSD-to-HTML projects with Webpack, Pug and SCSS

### File structure
```
config
```
Contains all webpack configs.

#### `src`
```
src
|  index.js
└─── pages
└─── components
└─── theme
```
`index.js` is a main file that import every `.js` file in the `src` directory. So when you create new `.js` file it will be automatically added to the bundle.

`pages` is a folder with all possible pages of the project.

`components` is a folder with all possible components shared between all pages.

#### `pages`
`pages` has the following structure:

```
pages
└─── first
| |  first.js
| |  first.scss
└─── index
| |  index.pug 
└─── second
| |  second.pug
```

#### `components`
`components` has the following structure:
```
components
└─── footer
| |  footer.pug
| |  footer.js
| |  footer.scss
└─── header
| |  header.pug
| |  header.js
| |  header.scss
```

* `components` contains only directories per component. 
* Each component contains main `.pug` file with the template, `.js` that is dynamically loaded in the `index.js` and contains all scripts for the component (and only the component) and `.scss` file.
* `.scss` should be imported in the `.js` and contains **one BEM block** in the root of the files and all possible elements and modificators inside this block's definition.

## How to work
#### Install dependencies
```commandline
npm install
```

#### Start dev server
```commandline
npm run dev
```

Visit http://localhost:8081/ to see all possible pages of the project.

#### On the production server create the bundle files
```commandline
npm run build
```