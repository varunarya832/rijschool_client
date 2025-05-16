# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Available Scripts

In the project directory, you can run:

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

`npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

`npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

`npm run eject`

Note: this is a one-way operation. Once you `eject`, you can't go back!

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

`npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)




















 1. Authentication

POST `/api/login`

Request Body:

Input : 

{
  "email": "user@example.com",
  "password": "password"
}

Response (Success):


{
  "data": {
    "token": "jwt-token",
    "expireAt": "2025-05-20T15:00:00Z",
    "loggedInUserId": "user@example.com"
  },
  "status": true
}

Response (Failure):
 

{
  "err": "Invalid credentials",
  "status": false
}




 2. Lessons

GET `/api/lessons`

Headers:

Authorization: Bearer jwt-token

Response:

{
  "data": [
    {
      "id": 1,
      "date": "2025-05-13",
      "start": "2025-05-13T15:41:00Z",
      "end": "2025-05-13T15:42:00Z",
      "videos": 2
    },
    {
      "id": 2,
      "date": "2025-04-30",
      "start": "2025-04-30T14:45:00Z",
      "end": "2025-04-30T14:45:00Z",
      "videos": 0
    }
  ],
  "status": true
}

Error Response:

{
  "err": "Unauthorized or invalid token",
  "status": false
}


 3. Lesson Videos

GET `/api/lessons/:id/videos?page=1&limit=10`


Query Parameters:

* `page` (optional, default = 1)
* `limit` (optional, default = 10)

Headers:

```
Authorization: Bearer jwt-token
```

Response:

{
  "data": {
    "videos": [
      {
        "id": "vid_01",
        "title": "Intro to Algebra",
        "thumbnail": "/videos/vid_01/thumb.jpg",
        "url": "/videos/vid_01/video.mp4"
      },
      {
        "id": "vid_02",
        "title": "Quadratic Equations",
        "thumbnail": "/videos/vid_02/thumb.jpg",
        "url": "/videos/vid_02/video.mp4"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalPages": 5,
      "totalItems": 42
    }
  },
  "status": true
}

Error Response:

{
  "err": "Lesson not found or invalid ID",
  "status": false
}
