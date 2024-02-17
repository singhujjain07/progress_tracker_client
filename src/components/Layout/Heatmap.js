import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import '../../styles/Heatmap.css'; // Import the CSS file

const Heatmap = ({ data }) => {
    // Define your color gradient here
    const colorGradient = [
        '#E8EAF6',
        '#C5CAE9',
        '#9FA8DA',
        '#7986CB',
        '#5C6BC0',
        '#3F51B5',
        '#3949AB',
        '#303F9F',
        '#283593',
        '#1A237E',
    ];

    // Calculate the color intensity based on the number of problems solved
    const getColorIntensity = (count) => {
        const maxCount = Math.max(...data.map(item => item.count));
        const percentage = count / maxCount;
        const colorIndex = Math.floor(percentage * (colorGradient.length - 1));
        return colorGradient[colorIndex];
    };

    return (
        <div className="heatmap-container">
            <CalendarHeatmap
                startDate={new Date('2022-12-31')} // Start date of the heatmap
                endDate={new Date('2023-12-31')} // End date of the heatmap
                values={data} // Array of objects containing date and value
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
    );
};

export default Heatmap;
