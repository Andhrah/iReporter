# iReporter

[![Build Status](https://travis-ci.com/Andraquin/iReporter.svg?branch=develop)](https://travis-ci.com/Andraquin/iReporter)
[![Coverage Status](https://coveralls.io/repos/github/Andraquin/iReporter/badge.svg?branch=develop)](https://coveralls.io/github/Andraquin/iReporter?branch=develop)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b464a98e4981f9b0a2dc/test_coverage)](https://codeclimate.com/github/Andraquin/iReporter/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/b464a98e4981f9b0a2dc/maintainability)](https://codeclimate.com/github/Andraquin/iReporter/maintainability)

## Application Overview
Corruption is a huge bane to Africa’s development. African countries must develop novel and
localised solutions that will curb this menace, hence the birth of iReporter. iReporter enables
any/every citizen to bring any form of corruption to the notice of appropriate authorities and the
general public. Users can also report on things that needs government intervention

## Application Features
- Users can create an account and log in.
- Users can create a red-flag record (An incident linked to corruption).
- Users can create intervention record (a call for a government agency to intervene e.g
  repair bad road sections, collapsed bridges, flooding e.t.c).
- Users can edit their red-flag or intervention records.
- Users can delete their red-flag or intervention records.
- Users can add images to their red-flag or intervention records, to support their claims.
- Users can add videos to their red-flag or intervention records, to support their claims.
- The application should display a Google Map with Marker showing the red-flag or
  intervention location.
- The user gets real-time email notification when Admin changes the status of their record.
- Users can add geolocation (Lat Long Coordinates) to their red-flag or intervention
   records .
- Users can change the geolocation (Lat Long Coordinates) attached to their red-flag or
  intervention records .
- Admin can change the status of a record to either under investigation, rejected (in the
  event of a false claim) or resolved (in the event that the claim has been investigated and
  resolved) .


## Project links

- [Heroku](https://ireporter-1.herokuapp.com/api/v1/red-flags)
- [UI-Template]( https://andraquin.github.io/iReporter/UI/index.html)
- [Pivotal-Tracker-Board](https://www.pivotaltracker.com/n/projects/2226718)

## Setup

Step by step instructions on how to get the code setup locally. 

- Create a folder for the project
- Open the `termina`l or `cmd`
- Cd into directory of the project folder.

```
cd projectName
```

- Clone the repository into that directory.

```
git clone https://github.com/Andraquin/iReporter.git
```

- Then run

```
npm install
```

- Start the server/app with

```
npm start
```

## Endpoints

**Routes**

- POST `/api/v1/red-flags` Create a red-flag record. The following credentials are required:
- `type` The type of record, Which should a `red-flag` for this route
- `location` Lat Long coordinates
- `images` 
- `videos`
- `comment` The user's comment

* GET `api/v1/red-flags` Get all red-flags records

* GET `api/v1/red-flags/<red-flag-id>` Get a specific red-flag record

* PATCH `api/v1/red-flags/<red-flag-id>/location` Edit a specific red-flag record's location

* PATCH `api/v1/red-flags/<red-flag-id>/comment` Edit a specific red-flag record's comment

* DELETE `api/v1/red-flags/<red-flag-id>` Delete a specific red-flag record


### Testing the application
Use the following

[Postman](www.getpostman.com)

Running unit tests.
* In a terminal/cmd, `cd` to the cloned project folder.
* Run `npm test`, for the tests.

### Testing tools

- [Mocha](https://mochajs.org/) - A test framework.
- [Chai](http://chaijs.com) -  Assertion library.
- [Coveralls](https://coveralls.iog) - code coverage tool.

### Technologies and Tools/Dependencies

- [Nodejs](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Babel](https://babeljs.io) - Javascript Transpiler/Compiler.
- [Eslint](https://eslint.org/) 
- [Airbnb](https://www.npmjs.com/package/eslint-config-airbnb) style [guide](https://github.com/airbnb/javascript)
- Find other Dependencies in the `package.json file`.

## License and Copyright
&copy; Andela 2018 All Rights Reserved.
Designed By Alexandra Collins