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
            type: "osc",
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
          { // rephrase q
            question:
              "Slide to choose your preferred number of partials for additive synthesis!",
            type: "slider",
            sliderRange: { min: 0, max: 10},
            defaultValue: 5, 
            answerVals: { // change values later 
              0: { IE: 1, SN: 1, TF: 1, JP: 1, AT: 3 },
              1: { IE: 1, SN: 1, TF: 1, JP: 1, AT: 3 },  // For slider value 1
              2: { IE: 1, SN: 1, TF: 1, JP: 1, AT: 3 },
              3: { IE: 1, SN: 1, TF: 1, JP: 1, AT: 3 },
              4: { IE: 1, SN: 1, TF: 1, JP: 1, AT: 3 },
              5: { IE: 0, SN: 0, TF: 0, JP: 0, AT: 2 },  // For slider value 0
              6: { IE: 1, SN: 1, TF: 1, JP: 1, AT: 3 },  // For slider value 1
              7: { IE: 1, SN: 1, TF: 1, JP: 1, AT: 3 },
              8: { IE: 1, SN: 1, TF: 1, JP: 1, AT: 3 },
              9: { IE: 1, SN: 1, TF: 1, JP: 1, AT: 3 },
              10: { IE: 1, SN: 1, TF: 1, JP: 1, AT: 3 }
            }
          }, 
          { // insert normal 
            question:
              "Choose what kind of filter effect you like best!",
            choices: [
              "Low Pass Filter",
              "High Pass Filter",
            ],
            type: "blank",
            answerVals: {
              "Low Pass Filter": {IE: 5, SN: 0, TF: 0, JP: 0, AT: 0},
              "High Pass Filter": {IE: -5, SN: 0, TF: 0, JP: 0, AT: 0},
            },
          },
          { // i think we just choose a frequency and let them change the gain 
            question:
              "How much do you like vibrato? Slide to find out!",
            sliderRange: { min: 0, max: 10},
            type: "slider",
            defaultValue: 5, 
            answerVals: { // change values later 
              0: { IE: 1, SN: 1, TF: 1, JP: 1, AT: 3 },
              1: { IE: 1, SN: 1, TF: 1, JP: 1, AT: 3 },  // For slider value 1
              2: { IE: 1, SN: 1, TF: 1, JP: 1, AT: 3 },
              3: { IE: 1, SN: 1, TF: 1, JP: 1, AT: 3 },
              4: { IE: 1, SN: 1, TF: 1, JP: 1, AT: 3 },
              5: { IE: 0, SN: 0, TF: 0, JP: 0, AT: 2 },  // For slider value 0
              6: { IE: 1, SN: 1, TF: 1, JP: 1, AT: 3 },  // For slider value 1
              7: { IE: 1, SN: 1, TF: 1, JP: 1, AT: 3 },
              8: { IE: 1, SN: 1, TF: 1, JP: 1, AT: 3 },
              9: { IE: 1, SN: 1, TF: 1, JP: 1, AT: 3 },
              10: { IE: 1, SN: 1, TF: 1, JP: 1, AT: 3 }
            }
          },
          { 
            question:
              "Hey do you still listen to the radio? Choose what kind of modulation sounds best to you!",
            choices: [
              "AM (Amplitude Modulation)",
              "FM (Frequency Modulation)",
            ],
            type: "blank",
            answerVals: {
              "AM (Amplitude Modulation)": {IE: 5, SN: 0, TF: 0, JP: 0, AT: 0},
              "FM (Frequency Modulation)": {IE: -5, SN: 0, TF: 0, JP: 0, AT: 0},
            },
          }
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