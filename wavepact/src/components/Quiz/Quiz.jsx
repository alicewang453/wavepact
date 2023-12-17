import { useState, useEffect, useRef } from "react";
import { resultInitialState } from "../../constants";
import "./Quiz.scss";

const Quiz = ({ questions }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answerIdx, setAnswerIdx] = useState(null);
    const [answerChoice, setAnswerChoice] = useState(null);
    const [answerPersonality, setAnswerPersonality] = useState(null);
    const [result, setResult] = useState(resultInitialState);
    const [showResult, setShowResult] = useState(false);

    const [audioContext, setAudioContext] = useState(null);
    // const [whiteNoiseBuffer, setWhiteNoiseBuffer] = useState(null);
    const [source, setSource] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [currSound, setCurrSound] = useState(null);

    const [globalGain, setGlobalGain] = useState(null);

    const canvasRef = useRef(null);
    const [analyser, setAnalyser] = useState(null);
    const [animationId, setAnimationId] = useState(null);

    // Initialize AudioContext & GlobalGain
    useEffect(() => {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        setAudioContext(audioCtx);
        const gg = audioCtx.createGain();
        gg.gain.setValueAtTime(0.8, audioCtx.currentTime);
        gg.connect(audioCtx.destination);
        setGlobalGain(gg);
        console.log('creating audio context & global gain')
        const globalAnalyser = audioCtx.createAnalyser();
        gg.connect(globalAnalyser);
        // globalAnalyser.connect(audioCtx.destination)
        setAnalyser(globalAnalyser);
        console.log('created analyser');
        // draw();
        return () => {
            if (audioContext) {
                audioContext.close();
            }
        };
    }, []);

    // useEffect(() => {
    //     return () => {
    //         cancelAnimationFrame(animationId);
    //     };
    // }, [animationId]);

    const draw = () => {
        if (!analyser) return;

        analyser.fftSize = 2048;
        var bufferLength = analyser.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(dataArray);
        // console.log(dataArray);
    
        var canvas = canvasRef.current;
        var canvasCtx = canvas.getContext("2d");

        var WIDTH = canvas.width;
        var HEIGHT = canvas.height;
        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

        analyser.getByteTimeDomainData(dataArray);
        // console.log(dataArray);

        canvasCtx.fillStyle = "white";
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = "rgb(31,117,254)";

        canvasCtx.beginPath();

        var sliceWidth = canvas.width * 1.0 / bufferLength;
        var x = 0;
        // console.log('buffer len: ', bufferLength);
        for (var i = 0; i < bufferLength; i++) {
            var v = dataArray[i] / 128.0;
            // console.log(v);
            var y = v * canvas.height / 2;
            if (i === 0) {
                canvasCtx.moveTo(x, y);
            } else {
                canvasCtx.lineTo(x, y);
            }
            x += sliceWidth;
        }

        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();

        const newAnimationId = requestAnimationFrame(draw);
        setAnimationId(newAnimationId);
    };

    // Generic function to play a given noise type
    const playNoise = (noiseBuffer, noiseType) => {
        if (source) {
            source.stop();
            setSource(null);
        }
        const noiseGain = audioContext.createGain();
        noiseGain.gain.setValueAtTime(0.3, audioContext.currentTime);
        noiseGain.connect(globalGain);

        // console.log(noiseBuffer);
        let noiseSource = audioContext.createBufferSource();
        noiseSource.buffer = noiseBuffer;
        noiseSource.loop = false;
        noiseSource.connect(noiseGain);

        noiseGain.connect(analyser);

        noiseSource.start();
        setSource(noiseSource);
        setPlaying(true);
        setCurrSound(noiseType);

        draw();


        // // Create or reuse the analyser node
        // let analyserNode = analyser;
        // if (!analyserNode) {
        //     analyserNode = audioContext.createAnalyser();
        //     analyserNode.fftSize = 2048;
        //     setAnalyser(analyserNode);
        // }

        // // Connect the nodes in the correct order
        // noiseSource.connect(analyserNode);
        // analyserNode.connect(audioContext.destination);

        // noiseSource.start();
        // setSource(noiseSource);

        // requestAnimationFrame(draw);
    };

    // Functions for generating different types of noise
    const generateNoise = (noiseType) => {
        const bufferSize = 2 * audioContext.sampleRate;
        // console.log('buffer size: ', bufferSize);
        const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        // Fill buffer with noise data based on noiseType
        switch (noiseType) {
            case 'White Noise':
                for (let i = 0; i < bufferSize; i++) {
                    output[i] = Math.random() * 2 - 1;
                }
                break;
            case 'Pink Noise':
                // Pink noise algorithm
                let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
                for (let i = 0; i < bufferSize; i++) {
                    let white = Math.random() * 2 - 1;
                    b0 = 0.99886 * b0 + white * 0.0555179;
                    b1 = 0.99332 * b1 + white * 0.0750759;
                    b2 = 0.96900 * b2 + white * 0.1538520;
                    b3 = 0.86650 * b3 + white * 0.3104856;
                    b4 = 0.55000 * b4 + white * 0.5329522;
                    b5 = -0.7616 * b5 - white * 0.0168980;
                    output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
                    output[i] *= 0.11; // Compensate for gain
                    b6 = white * 0.115926;
                }
                break;
            case 'Brown Noise':
                // Brown noise algorithm
                let lastOut = 0.0;
                for (let i = 0; i < bufferSize; i++) {
                    let white = Math.random() * 2 - 1;
                    output[i] = (lastOut + (0.02 * white)) / 1.02;
                    lastOut = output[i];
                    output[i] *= 3.5; // Compensate for gain
                }
                break;
            case 'Blue Noise':
                // Simplified blue noise algorithm
                for (let i = 0; i < bufferSize; i++) {
                    // Generate white noise
                    let whiteNoise = Math.random() * 2 - 1;
    
                    // Apply a simple high-frequency emphasis
                    let scaleFactor = i / bufferSize;
                    output[i] = whiteNoise * scaleFactor;
                }
                break;
            default:
                break;
        }

        playNoise(noiseBuffer, noiseType);
    };

    const handlePlay = (noiseType) => {
        if (playing) {
            source.stop();
            if (currSound === noiseType) {
                setPlaying(false);
                setCurrSound(null);
            } else {
                generateNoise(noiseType);
            }
        } else {
            generateNoise(noiseType);
        }
    };

    const { question, choices, answerVals, type} = questions[currentQuestion]; 
    
    const onAnswerClick = (answer, index, answerVals) => {
        // console.log(answer);
        // console.log(index);
        setAnswerIdx(index);
        setAnswerChoice(answer);
        console.log(answerChoice);
        setAnswerPersonality(answerVals[answer]);
        console.log('answer personality: ', answerPersonality);
        // console.log('curr result: ', result);
        // if (answer === correctAnswer) {
        //     setAnswer(true);
        // } else {
        //     setAnswer(false);
        // }
    }

    const onClickNext = () => {
        if (playing) {
            handlePlay(currSound);
        } 
        setAnswerIdx(null);
        console.log('Selected: ', answerChoice)
        console.log('prev result: ', result);
        var newResult = {
            IE: result.IE + answerPersonality.IE,
            SN: result.SN + answerPersonality.SN,
            TF: result.TF + answerPersonality.TF,
            JP: result.JP + answerPersonality.JP,
            AT: result.AT + answerPersonality.AT, 
        }
        setResult(newResult);
        console.log('new result: ', newResult);
        //     prev.IE += answerPersonality.IE;
        //     prev.SN += answerPersonality.SN;
        //     prev.TF += answerPersonality.TF;
        //     prev.JP += answerPersonality.JP;
        //     prev.AT += answerPersonality.AT;
        // }
        // );

        if (currentQuestion !== questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            setCurrentQuestion(0);
            setShowResult(true);
        }
    }

    const onTryAgain = () => {
        setResult(resultInitialState);
        setShowResult(false);
    };

    // const handleInputChange = () => {
    //     setInputAnswer
    // }

    const getAnswerUI = () => {
        if (type === "noise") {
            return (
                <ul>
                    {
                        choices.map((choice, index) => (
                            <li
                                onClick={function(event){
                                    onAnswerClick(choice, index, answerVals);
                                    handlePlay(choice);
                                    }
                                }
                                key={choice}
                                className={answerIdx === index ? 'selected-answer' : null}
                            >
                                {choice}
                            </li>
                        ))
                    }
                </ul>)
        }

        return (
        <ul>
            {
                choices.map((choice, index) => (
                    <li
                        onClick={function(event){
                            onAnswerClick(choice, index, answerVals);
                            // togglePlay();
                            }
                        }
                        key={choice}
                        className={answerIdx === index ? 'selected-answer' : null}
                    >
                        {choice}
                    </li>
                ))
            }
        </ul>)
    }

    return (
        <div className="quiz-container">
            {!showResult ? (<>
            <span className="active-question-num">{currentQuestion + 1}</span>
            <span className="total-question">/{questions.length}</span>
            <h2>{question}</h2>
            {getAnswerUI()}
            <div className="footer">
                <button onClick={onClickNext} disabled={answerIdx === null}>
                    {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                </button>
            </div>
            <div class="container">
                <canvas ref={canvasRef} width="300" height="170">
                wave form visualizer
                </canvas>
            </div>
        </>) : <div className="result">
            <h3>Result</h3>
            <p>
                Introversion/Extraversion: <span>{result.IE}</span>
            </p>
            <p>
                Observant/Intuitive: <span>{result.SN}</span>
            </p>
            <p>
                Thinking/Feeling: <span>{result.TF}</span>
            </p>
            <p>
                Judging/Prospecting: <span>{result.JP}</span>
            </p>
            <p>
                Assertive/Turbulent: <span>{result.AT}</span>
            </p>
            <button onClick={onTryAgain}>Play again</button>  {/* change to share results */}
            </div>}
        
        </div>
    );
};

export default Quiz;