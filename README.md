## Sample React Quiz App

***Created with [create-react-app](https://github.com/facebook/create-react-app) and [Material UI](https://material-ui.com/)***

This quiz app works with JSON input questions and answers, below are the demos with sample JSONs.
1. [demo1](https://sridharbandi.github.io/react-quiz/#/quiz1), [json1](https://github.com/sridharbandi/react-quiz/blob/master/src/api/quiz1.json)
2. [demo2](https://sridharbandi.github.io/react-quiz/#/quiz2), [json2](https://github.com/sridharbandi/react-quiz/blob/master/src/api/quiz2.json)

##### Features:
1. Supports code snippets - Referer [json2](https://github.com/sridharbandi/react-quiz/blob/master/src/api/quiz2.json)
2. Supports images - Refer [json2](https://github.com/sridharbandi/react-quiz/blob/master/src/api/quiz2.json)
3. Inline styles (Questions & answers) - Refer [json2](https://github.com/sridharbandi/react-quiz/blob/master/src/api/quiz2.json)
4. Responsive
5. Supports multiple quizzes

##### Screenshots of the quiz app
Code snippet question:
![image1](/readme/image1.png)
Image questions with inline style answers
![image2](/readme/image2.png)

### To run in Local
Clone or download and issue the below commands in project root directory and open [http://localhost:3000/#/quiz1](http://localhost:3000/#/quiz1)/[http://localhost:3000/#/quiz2](http://localhost:3000/#/quiz2) in browser
```javascript
npm install
npm start
```

### How to create new set of questions?
1. Create a JSON (for example name of the json is `temp`.json) with question and answers of the format - [json2](https://github.com/sridharbandi/react-quiz/blob/master/src/api/quiz2.json)
2. Place the JSON under `src/api/`
3. Re-run the application and access your quiz at http://localhost:3000/#/temp (temp is your name of JSON)

> Feel free to customize to your own needs