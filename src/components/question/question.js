import React from 'react';
import './question.css';

const Question = ({questionData}) => {
    const body = () => {
        if (questionData.body) {
            if (questionData.body.options) {
                return <ul className="questionOptions">
                        {questionData.body.options.map(option => {
                            return <li key={option.id} className={getOptionClass(option)}>{option.id}</li>
                        })}
                    </ul>
            } else {
                return <div className="questionText" >{questionData.body.page}</div>
            }
        } else {
            return <div className="questionText">{questionData.title}</div>
        }
    }

    const getClass = () => {
        if (!questionData.hits) return "questionBlock"
        if (questionData.hits === questionData.maxHits) {
            let allOptions = true;
            if (questionData.body && questionData.body.options) {
                questionData.body.options.forEach(option => {
                    if (option.hits !== option.maxHits) {
                        allOptions = false;
                    }
                });
            }
            return allOptions ? "questionBlockGreen" : "questionBlockYellow";
        }
            
        return "questionBlockRed"
    }
    
    const getOptionClass = (option) => {
        if(option.missing) return "optionGrey";
        if(!option.hits) return ""; 
        if(option.hits === option.maxHits) return "optionGreen"; else return "optionRed"
    }

    const questionMain = () => {
        if (questionData.missing) return <div className="missingQuestion"></div>
        return <div>
            <div className="questionTitle">
                {questionData.id}
            </div>
            <div className={getClass()}>
                {body()}
            </div>
        </div>
    }

    return <div>
        { questionMain() }
    </div>

}

export default Question