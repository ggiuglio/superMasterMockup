import React from 'react';
import './market.css';
import Question from '../question/question';

const Market = ({marketData, superMasterData}) => {
    const questions = () => {
        let baseQuestions = [];
        marketData.survey.screens.forEach(screen => {
            screen.questions.forEach(question => {
                baseQuestions.push(question);
            })
        });

        let rawQuestions = [];
        superMasterData.forEach(superQuestion => {
            let question = baseQuestions.find(q => q.id === superQuestion.id);
            if (question) {
                if(superQuestion.body && superQuestion.body.options) {
                    superQuestion.body.options.forEach((option, i) => {
                        if(question.body && question.body.options) {
                            if(!question.body.options.find(o => o.id === option.id)) {
                                question.body.options.splice(i, 0, {id: option.id, missing: true});
                            }
                        }
                    });
                } 
                rawQuestions.push(question); 
            } else {
                rawQuestions.push({id: superQuestion.id, missing: true});
            }
        });

        return rawQuestions.map(question => {
           return <Question key={question.id} questionData={question}></Question>
        })

    }

    return <div>
        <div className="questionColumnn"> 
            <div className="marketRegion">{marketData.region} </div>
            {questions()} 
        </div>
        
    </div>
}

export default Market;