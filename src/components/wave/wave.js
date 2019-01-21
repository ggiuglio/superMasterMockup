import React from 'react';
import './wave.css';
import Market from '../market/market';

const Wave = ({waveData, superMasterData}) => { 
    
    const markets = waveData.markets.map(market => {
        return <Market key={market.id} marketData={market} superMasterData={superMasterData}></Market>
    });
    
    return <div className="wave">
        <div className="waveTitle">{waveData.name}</div>
        <div className="marketContainer">{markets}</div>
    </div>
}

export default Wave
