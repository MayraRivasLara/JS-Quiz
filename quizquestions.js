// Structure:
// qs
// title
// choices -- array
// correct choice

const questions = [
  {
    title: "Inside of which HTML element do we put the JavaScript?",

    choices: [
      {
        title: "<Javascript>",
        isAnswer: false,
      },
      {
        title: "<js>",
        isAnswer: false,
      },
      {
        title: "<script>",
        isAnswer: true,
      },
    ],
  },

  {
    title: "Where is the correct place to insert a JavaScript?",

    choices: [
      {
        title: "The <head> section",
        isAnswer: false,
      },
      {
        title: "Both <head> and <body> are correct",
        isAnswer: true,
      },
      {
        title: "The <body> section",
        isAnswer: false,
      },
    ],
  },
  {
    title: "The external JavaScript file must contain the <script> tag.",

    choices: [
      {
        title: "True",
        isAnswer: false,
      },
      {
        title: "False",
        isAnswer: true,
      },
    ],
  },
  {
    title: "How do you add a comment in JavaScript?",

    choices: [
      {
        title: "// Comment",
        isAnswer: true,
      },
      {
        title: "'Comment'",
        isAnswer: false,
      },
      {
        title: "<!-- Comment --!>",
        isAnswer: false,
      },
    ],
  },
  {
    title: "How can you detect the client's browse name?",

    choices: [
      {
        title: "client.navName",
        isAnswer: false,
      },
      {
        title: "browser.name",
        isAnswer: false,
      },
      {
        title: "navigator.appName",
        isAnswer: true,
      },
    ],
  },
  {
    title: "Which operator is used to assign a value to a variable?",

    choices: [
      {
        title: ":",
        isAnswer: false,
      },
      {
        title: "=",
        isAnswer: true,
      },
      {
        title: "x",
        isAnswer: false,
      },
    ],
  },
];
