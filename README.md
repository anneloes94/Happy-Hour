# Happy Brauer
A web application that finds a user's nearest happy hours in Toronto. This web app uses Google Maps API and Google Directions API. It was built using ReactJS on the front-end, Node.JS on the backend and PostGreSQL for the database. This was part of a final project of the Web Development bootcamp in Lighthouse Labs.

In Happy Brauer, once logged in a user will be redirected to the map with happy hours. The map will be centered on a user's current location, or go to a default location. A user can:

* Search for a custom location
* Find their nearest happy hour locations (indicated with customized markers)
* Get directions to a restaurant or bar
* Toggle on and off restaurants or bars for drinks or food only.
* Generate a barcrawl based on the user's current location and time. 

# Final Product

Login as a user.
!["Screenshot of Login Page"](docs/Login1.png)

Find your current location.
!["Screenshot of Current Location"](docs/CurrentLocation2.png)

Display the opening hours and directions buttons for a bar/restaurant.
!["Screenshot of custom marker"](docs/Marker3.png)

Toggle on/off food or drinks only.
!["Screenshot of food toggle"](docs/FoodToggle4.png)

Make a route for a bar crawl, based on current time and location.
!["Screenshot of bar crawl"](docs/BarCrawlFeature5.png)

## Setup

1. Run `npm install` in `./client` and `./server` directories to install dependencies
2. Create db tables by copying schemas in `./server/db/schema` files into postgresql server
3. Create db seeds by copying seeds in `./server/db/seeds` files into postgresql server
4. Run `bin/rake db:reset` to create, load and seed db
5. Create an API key for Maps JavaScript, Places, Directions and Geocoding (see [Google's documentation](https://developers.google.com/maps/documentation/javascript/get-api-key))
6. Create .env file for `./server` and `./client` (requires the API key) based on .env.example
7. Run `npm run local` to start the Node server
8. Run `npm start` to start the client server

## Dependencies

* Node.js 10.16.1
* PostgreSQL 10.x
* react 16.13.0

---
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />

### `npm run local`

Runs the Node.js backend server in the development mode.<br />
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.<br />

# Future goals

* Giving a “business owner” role to users --> only business owners can add their happy hours to the map. This will make the app more scalable and the database more reliable.
* Making the map elements more responsive.
* Using Google Places API to add information about a restaurant or bar's atmosphere to enhance the user experience (type of music played, busy times, etc.).


# Contributors

Feel free to get in touch with @cassandralin and @anneloes94 about this project!