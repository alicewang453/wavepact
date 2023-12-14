import { useState } from "react";

const Quiz = ({ questions }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    
    const { question, choices, correctAnswer } = questions[currentQuestion]; // replace correct answer w/ weights for result
    
    return <div className="quiz-container">
        <>
            <span className="active-question-num">{currentQuestion + 1}</span>
            <span className="total-question">/{questions.length}</span>
            <h2>{question}</h2>
        </>
    </div>
};

export default Quiz;