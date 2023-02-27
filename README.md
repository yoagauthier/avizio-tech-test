# Avizio Tech Test

⚠️ WARNING : This project is to be used on local environnement only, as it allow to use the Zoom API with the provided account and book a meeting without be connected on Zoom

## Setup

1. Login to the Zoom account with the Credentials provided
2. Go to the [Zoom API Dashboard](https://marketplace.zoom.us/user/build) and select the "Avizio Tech Test" app. In the "App Crendentials" tab, select "View JWT token" and copy the token that will be used to book the meetings against the API.
3. Create an `.env`file like this

```
ZOOM_JWT="<your_copied_token_here>"
```

4. Start the localhost server, by default running on port 5000

```
node server.js
```

5. Start the React frontend, by default runnning on port 3000

```
npm start
```

## Architecture

My approache here is :

1. Draw many div, representing time slots that the user can book. These div have uniques ids that reprent the time slot and these are used to identify the slots from the mouse events
2. Reacting on 3 mouse events :
   1. onMouseDown to detect which was the first time slot cliked. This will be the beginning of the Zoom meeting
   2. onMouseMove to draw in real time an overlay, giving the user a visual indication of the time slots he's currently booking
   3. onMouseUp to detect the last time slot clicked, hence the end of the Zoom meeting. After that event, the modal showing details & asking for confirmation is displayed
3. When the user validate, create the Zoom Meeting on the API. To get faster to the point & considering this was just a demo that will not go on production, I decided to use the Zoom JWT authentication mechanism (usually resserved for server to server application - since here it's possible to impersonate a user without credentials). Seeing that the Zoom API does not allow to be called from a browser, I made a very simple express server (`server.js`) that just relays the request.

## Possible improvements

I decided to make some tradeoffs considering the time advised for the test. Theses points could be improved for a real-life app

1. I've hardcoded the days for the calendar. We could allow to change weeks by adding "previous" & "next" buttons above the calendar view and generate the DayColumn component accordingly
2. Implement a standard OAuth2.0 mechanism to force the user to loggin on Zoom, enter his credentials, get a valid temporary token, and call the API with that token.
3. In a more complex app, a more enforced separation between the React "presentation" components and and "logic" components could help the codebase scale

## Notes

- If there is any issue, I'm available by mail for clarifications !
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
