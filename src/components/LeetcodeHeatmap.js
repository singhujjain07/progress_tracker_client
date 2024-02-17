import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import '../styles/Heatmap.css'; // Import the CSS file

const LeetcodeHeatmap = ({ data }) => {
    const formattedData = Object.entries(data).map(([date, value]) => ({
        date: new Date(parseInt(date) * 1000), // Convert timestamp to milliseconds
        count: value
      }));
    //   console.log(formattedData)
    return (
        <div className='mt-5' >
            <h1 className='ms-5'>Problem Solving Heatmap</h1>
            <div className="heatmap-container ms-5">
            <CalendarHeatmap
                startDate={new Date('2023-12-31')} // Start date of the heatmap
                endDate={new Date('2024-12-31')} // End date of the heatmap
                values={formattedData} // Array of objects containing date and value
                classForValue={(value) => {
                    if (!value) {
                        return 'color-empty';
                    }
                    const val = value.count <=4 ? value.count : 5
                    return `color-scale-${val}`;
                }}
                tooltipDataAttrs={(value) => {
                    return {
                        'data-tip': `${value.date} - ${value.count} problems solved`,
                    };
                }}
                showWeekdayLabels={"true"}
                gutterSize={2}
            />
        </div>
        </div>
    )
}

export default LeetcodeHeatmap