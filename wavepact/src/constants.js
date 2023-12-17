export const jsQuizz = {
    questions: [
        {
            question:
              "Which noise do you prefer? (Click each to hear)",
            choices: [
              "White Noise",
              "Pink Noise",
              "Brown Noise",
              "Blue Noise",
            ],
            type: "noise",
            answerVals: {
              "White Noise": {IE: 0, SN: 0, TF: 0, JP: 0, AT: 2},
              "Pink Noise": {IE: 0, SN: 0, TF: 0, JP: 0, AT: -2},
              "Brown Noise": {IE: 0, SN: 0, TF: 0, JP: 0, AT: -5},
              "Blue Noise": {IE: 0, SN: 0, TF: 0, JP: 0, AT: 5},
            },
          },
        {
            question:
              "What sound effect do you like best?",
            choices: [
              "Babbling Brook",
              "Muttering Motor",
            ],
            type: "sound",
            answerVals: {
              "Babbling Brook": {IE: 0, SN: 0, TF: 5, JP: 5, AT: 0},
              "Muttering Motor": {IE: 0, SN: 0, TF: -5, JP: -5, AT: 0},
            },
          },
        {
            question:
              "Choose your favorite waveform!",
            choices: [
              "Sine",
              "Sawtooth",
              "Square",
              "Triangle",
            ],
            type: "sound",
            answerVals: {
              "Sine": {IE: 0, SN: 5, TF: 0, JP: 0, AT: 0},
              "Sawtooth": {IE: 0, SN: -2, TF: 0, JP: 0, AT: 0},
              "Square": {IE: 0, SN: -5, TF: 0, JP: 0, AT: 0},
              "Triangle": {IE: 0, SN: 2, TF: 0, JP: 0, AT: 0},
            },
          },
          {
            question:
              "Watch the live coding clips and pick the one you like better!",
            choices: [
              "Silly Sonic Pi",
              "Tomfoolerous Tidal Cycles",
            ],
            type: "video",
            answerVals: {
              "Silly Sonic Pi": {IE: 5, SN: 0, TF: 0, JP: 0, AT: 0},
              "Tomfoolerous Tidal Cycles": {IE: -5, SN: 0, TF: 0, JP: 0, AT: 0},
            },
          },
    //     {
    //     question:
    //       "Which of the following is used in React.js to increase performance?",
    //     choices: [
    //       "Virtual DOM",
    //       "Original DOM",
    //       "Both A and B",
    //       "None of the above",
    //     ],
    //     type: "MCQs",
    //     correctAnswer: "Virtual DOM",
    //   },
    //   {
    //     question: "What is ReactJS?",
    //     choices: [
    //       "Server-side framework",
    //       "User Interface framework",
    //       "both a and b",
    //       "None of the above",
    //     ],
    //     type: "MCQs",
    //     correctAnswer: "User Interface framework",
    //   },
    //   {
    //     question:
    //       "Identify the one which is used to pass data to components from outside",
    //     choices: ["Render with arguments", "setState", "PropTypes", "props"],
    //     type: "MCQs",
    //     correctAnswer: "props",
    //   },
    //   {
    //     question: "In which language is React.js written?",
    //     choices: ["Python", "Java", "C#", "JavaScript"],
    //     type: "MCQs",
    //     correctAnswer: "JavaScript",
    //   },
    //   {
    //     question: "What is Babel?",
    //     choices: [
    //       "JavaScript interpreter",
    //       "JavaScript transpiler",
    //       "JavaScript compiler",
    //       "None of the above",
    //     ],
    //     type: "MCQs",
    //     correctAnswer: "JavaScript compiler",
    //   },
    ],
  };

  export const resultInitialState = {
    //MBTI: negative = trait on left, positive = trait on right
    IE: 0, //introversion - extraversion
    SN: 0, //observant - intuitive
    TF: 0, //thinking - feeling
    JP: 0, //judging - prospecting
    AT: 0, //assertive - turbulent
  }