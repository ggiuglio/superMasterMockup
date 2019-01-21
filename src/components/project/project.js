import React from 'react';
import './project.css';
import Wave from '../wave/wave';
import SuperMaster from '../superMaster/superMaster';

const Project = ({projectData, superMasterData}) => {

    const waves = projectData.waves.map(wave => {
        return <Wave key={wave.id} waveData={wave} superMasterData={superMasterData}></Wave>;
    });

    return <div>
        <div className="projectTitle">{projectData.name}</div>
        <div className="wavesContainer">
            <SuperMaster superMasterData={superMasterData}></SuperMaster>
            {waves}
        </div>    
    </div>
} 

export default Project;