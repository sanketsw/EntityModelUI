# cheetah
Pricing App POC using AngularJS 2.0 and [Primeng](http://www.primefaces.org/primeng/#/)- Rich angular2 UI component library

## Installation
Firstly, you need to have [Node.js](https://nodejs.org/en/)
- For v4, please use v4.3.x (LTS) or higher (**highly** recommended)
- For v5, please use v5.6.x or higher, here is [why](https://nodejs.org/en/blog/vulnerability/february-2016-security-releases/)
- Ready for v6

Then, install these packages globally:
```bash
npm install -g gulp
```

After that, go to the starter directory and just run:
```bash
npm install
```


## Start
Let's start up the server, run:   
```
gulp
```
or `gulp serve-dev`

and done! The browser will popup and you can start trying Angular 2!
Every changes to the file will refresh the browser automatically
and it'll also compile your changed TypeScripts files to Javascript files.


Run following in case you run into issues during gulp build
```
npm install typings -g
typing install
```



## Running-on-IBM-Bluemix
On gulp build, artifact produced is the dist folder. It contains configuration files and `build` folder. Build folder are compiled, compressed html, js and css contents that are used to deploy a production level app. 

To push to bluemix execute:   
```
npm install
gulp build
cd dist
cf push cheetahipoc 
```

Bluemix will use nodejs_buildpack and execute `npm install` followed `npm start`
`npm start` executes server.js and launches the html and css contetns from `build` folder

Hosted: http://cheetahipoc.mybluemix.net/


## Special thanks
* Please visit the [primeng angular starter used for this project](https://github.com/sanketsw/primeng-aungular-starter) for more details on DevOps, Unit Testing and Integratino Testing.


