import React from 'react';
import './superMaster.css';
import Question from '../question/question';

const SuperMaster = ({superMasterData}) => { 

    const questions = superMasterData.map(question => {
        return <Question key={question.id} questionData={question}></Question>
     })

    return <div className="wave">
        <div className="superMasterTitle">SUPER MASTER!!</div>
        <div className="questionColumn">
            {questions}
        </div>
    </div>
}

export default SuperMaster;

