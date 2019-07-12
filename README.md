# Wind Chime Server

This is the backend server used to make calls to the OpenWeatherMap API as well as the /users and /playlist endpoints for the client.

Wind Chime combines your current weather conditions with a selected genre (or your top artists) to make a custom Spotify playlist that fits the mood of the weather.

[Link to live app](https://erins-windchime-app.erincdustin.now.sh)


Third party APIs used:

[Spotify](https://developer.spotify.com/documentation/web-api/reference/)

[OpenWeatherMap](https://openweathermap.org/current)

## Set up

Complete the following steps to set up the server:

1. Clone this repository to your local machine `git clone https://github.com/erincdustin/spotify-auth-server.git`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`
6. Input your environmental variables for your DB and API Key from OpenWeatherMap.

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

1. When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" 
2. Set producton DB variables in `.env`
3. `npm run deploy` will push to this remote's master branch

## Technology Used

Node, Express, SQL