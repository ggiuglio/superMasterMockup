import React from 'react';
import Project from '../project/project';
import './main.css';

const Main = ({projectData}) => {
    const checkSuperMaster = ((superMasterQuestions, question) => {
        const superQuest = superMasterQuestions.find(q => q.id === question.id);
        if (!superQuest) {
            const newSuperQuest = JSON.parse(JSON.stringify(question))
            newSuperQuest.hits = 1;
            if(newSuperQuest.body && newSuperQuest.body.options) {
                newSuperQuest.body.options.forEach(opt => {
                    opt.hits = 1;
                    opt.maxHits = 1;
                });
            }

            superMasterQuestions.push(newSuperQuest);
        } else {
            superQuest.hits++;
            if(superQuest.body && superQuest.body.options) {
                superQuest.body.options.forEach(opt => {
                    opt.maxHits++;
                    if (question.body && question.body.options) {
                        if (question.body.options.find(o => o.id === opt.id)) {
                            opt.hits++;
                        }
                    }
                });
            }
        }
    });

    const getSuperMaster = () => {
        const superMasterQuestions = [];
        let maxHits = 0
        projectData.waves.forEach(wave => {
            wave.markets.forEach(market => {
                maxHits++;
            });
        });

        projectData.waves.forEach(wave => {
            wave.markets.forEach(market => {
                market.survey.screens.forEach(screen => {
                    screen.questions.forEach(question => {
                        question.maxHits = maxHits;
                        checkSuperMaster(superMasterQuestions, question);
                    })
                })
            })
        });

        const rawQuestions = [];
        projectData.waves[0].markets[0].survey.screens.forEach(screen => {
            screen.questions.forEach(question => {
                rawQuestions.push(question);
            })
        });

        return superMasterQuestions;
    }

    return <div>
        <div className="legendaTitle">How to read the schema:</div>
        <div className="legenda">
            <div className="legendaContent">
                <div className="legendaColumn">
                    <div className="legndColumnTitle"> Meaning of the colors </div>

                    <div className="legendaColumnContent">
                        <div className="legendaContent">
                            <div className="greenSquare"> </div>
                            <div className="legendaLine"> The question/option appeards in all the surveys</div>
                        </div>
                        <div className="legendaContent">
                            <div className="yellowSquare"></div>
                            <div className="legendaLine"> The question appeards in all the surveys but with a different set of options</div>
                        </div>
                        <div className="legendaContent">
                            <div className="redSquare"></div>
                            <div className="legendaLine"> The question/option appeards only in some surveys</div>
                        </div>
                    </div>
                </div>
               
                <div className="legendaColumn">
                    <div className="legndColumnTitle">Order of the qustions</div>
                    <div className="legendaColumnContent">
                        <div className="legendaContent">
                            <ul>
                                <li>
                                    SuperMaster: the Order fo the supermaster is based on the orderd of the first
                                    survey (the master survey) questions that do not appear in the master are added
                                    in the order of the first survey they appears in.
                                </li>
                                <li>
                                Surveys: the order of the shown question is based on the SuperMaster question order.
                                Actual survey question order might be different.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
         
            </div>
            
        </div>
        <Project projectData={projectData} superMasterData={getSuperMaster()}></Project>
    </div>
}

export default Main;