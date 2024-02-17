import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const SolvedProblemsCard =({easy,medium,hard,totalEasy,totalMedium,totalHard})=>{

    // Sample data (replace with your actual data)
    const totalSolved = easy+medium+hard;
    const totalProblems = totalEasy+totalMedium+totalHard;

    const totalPercentage = (totalSolved / totalProblems) * 100;
    const easyPercentage = (easy / totalSolved) * 100;
    const mediumPercentage = (medium / totalSolved) * 100;
    const hardPercentage = (hard / totalSolved) * 100;

    return (
      <div className="card">
        <div className="card-header" >Solved Problems</div>
        <div className="circular-progress">
          <CircularProgressbar
            value={totalPercentage}
            text={`${totalSolved}/${totalProblems}`}
            styles={buildStyles({
              pathColor: '#007bff',
              textColor: '#007bff',
              trailColor: '#f0f0f0',
              textSize: '16px'
            })}
          />
        </div>
        <div className="horizontal-progress">
          <div className="progress-bar easy" style={{ width: `${easyPercentage}%` }}></div>
          <div className="progress-bar medium" style={{ width: `${mediumPercentage}%` }}></div>
          <div className="progress-bar hard" style={{ width: `${hardPercentage}%` }}></div>
        </div>
        <div className="progress-labels">
          <div>Easy: {easy}</div>
          <div>Medium: {medium}</div>
          <div>Hard: {hard}</div>
        </div>
      </div>
    );
  }


export default SolvedProblemsCard;
