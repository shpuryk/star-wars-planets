# Star wars planets
Website displays a list of planets return from the API. Clicking an item in the list display the details of the planet in its own page. Before accessing the planets list or individual planet details the user must provide a valid email address. 

## Could be improved 
- using async validator for email in user verefication form. Currently validation performs on submiting form in order to task requirements
- information about "is user verified" could be persisted in localstorage 

## Issues
- api endpoint `/planets/:name` works incorectly, it always return the same responce on different `name` param. Even with non existed items, but should return 404 in such case 

##
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
