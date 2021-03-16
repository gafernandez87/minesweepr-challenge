This is a well known Game called Mineswepper, where you have to find all the mines in a grid. Choose between 3 different difficulties or select your custom game setup.

[Click here to play the game](http://minesweepr-challenge.vercel.app/login)


This web app was build using the React Framework [Next.js](https://nextjs.org/), and [Firebase](https://firebase.google.com/) for storing the data.

## Local environment setup

```bash
npm install

npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Endpoints
### Sign up
`POST /api/signup`
``` 
body {
    email: 'youremail',
    password: 'yourpassword'
}
```

### Login
`POST /api/signin`
``` 
body {
    email: 'youremail',
    password: 'yourpassword'
}
```

### Gets a player details
`GET /api/players/:player_id`


### Gets all the games of a player
`GET /api/players/:player_id/games`

### Gets game by id
`GET /api/players/:player_id/games/:game_id`

### Creates a new game for a player

`POST /api/players/:player_id/games`
``` 
body {
    status: [string] (playing/win/game_over),
    n: [int] (width of the board),
    m: [int] (height of the board),
    bombs: [int] (amount of bombs in the game),
    code: [string] (see #code)
    difficulty: [int] (1: easy, 2: normal, 3: hard, 4: custom)
    sessionId: [string] (player id)
    startedDate: [string]
    lastUpdated: [string]
}
```

### Updates an existing game

`PATCH /api/players/:player_id/games/:game_id`

all the body attributes are optional
``` 
body {
    status: [string] (playing/win/game_over),
    n: [int] (width of the board),
    m: [int] (height of the board),
    bombs: [int] (amount of bombs in the game),
    code: [string] (see #code)
    difficulty: [int] (1: easy, 2: normal, 3: hard, 4: custom)
    sessionId: [string] (player id)
    startedDate: [string]
    lastUpdated: [string]
}
```

## Game code
In order to persist the current state of the game, I have created a custom "code" of the game which is just a string.
It looks like this: `0-0|c|f_0-1|c|t_1-0|c|f_1-1|c|t`

Each cell of the board is described here `0-0|c|f` and separated from the athor cells using the underline symbol (`_`)

`0-0` is the coordinate of the cell on the board

`c` is the current cell status. Posible values are `c: COVERED`, `u: UNCOVERED`,`f: FLAGGED`,

`t` indicates if the cell has a mine or not. Possible values: `t: Has a mine`, `f: Doesn't has a mine`

If you look at the `components/Minesweeper/utils` file, you would see the `generateCode` method which generates this code.

Also there is a `drawBoard` method which uses the code to render the board.

## That's cheating!
If you want to see the generated board naked, add a cookie called 'cheat' with any value and then go to play a new game.


## About Next.js
Nextjs provides an easy way to build react applications.
Every component that you put in `/pages` directory, is goign to be automaticly added as a route (e.g. if you creates a component in `/pages/home` then you can go to `/home` in your browser and see it).

It also provides a backend nodeJs server integrated under `pages/api` directory. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Project folder scaffolding
### components
React components
### components/commons
React components that are usefulls and reusables
### contexts
Contains different contexts files that te app would need
### contexts
Contains different reducers files that te app would need
### utils
Contains many handy functions needed along the app
### pages
Nextjs main folder where you can define the different pages of your app
### public
Has the public assets like images and fonts
### styles
Has the global css definitions and colors variable
### pages/api
Nextjs main folder where you can define the different api endpoints of your app
### firebase_client
Handles the connection to firebase and all its methods to fetch or save data.


### Learn More about Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.


## Created by [Gaston Fernandez](https://github.com/gafernandez87)