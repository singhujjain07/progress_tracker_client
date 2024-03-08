import React, { useState } from 'react'
import 'react-calendar-heatmap/dist/styles.css';
import '../styles/Heatmap.css'; // Import the CSS file
import Heatmap from './Layout/Heatmap';

const LeetcodeHeatmap = ({ data }) => {
    const [selectedItem, setSelectedItem] = useState("current");
    const [color, setColor] = useState('success');
    const handleItemClick = (value, color) => {
        setSelectedItem(value);
        setColor(color);
    };
    const formattedData = Object.entries(data).map(([date, value]) => ({
        date: new Date(parseInt(date) * 1000), // Convert timestamp to milliseconds
        count: value
    }));
    return (
        <div className='mt-5' >
            <h1 className='ms-5'>Problem Solving Heatmap</h1>
            <div className="dropdown-center text-end">
                <button className="btn btn-outline-dark btn-sm dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className={`d-inline-block bg-${color} rounded-circle p-1 me-1 gap-2`} />
                    {selectedItem}
                </button>
                <ul className="dropdown-menu">
                    <li><div className="dropdown-item d-flex align-items-center gap-2 py-2" onClick={() => handleItemClick('2022', 'danger')}>
                        <span className="d-inline-block bg-danger rounded-circle p-1" />
                        2022
                    </div></li>
                    <li><div className="dropdown-item d-flex align-items-center gap-2 py-2" onClick={() => handleItemClick('2023', 'warning')}>
                        <span className="d-inline-block bg-warning rounded-circle p-1" />
                        2023
                    </div></li>
                    <li><div className="dropdown-item d-flex align-items-center gap-2 py-2" onClick={() => handleItemClick('2024', 'primary')}>
                        <span className="d-inline-block bg-primary rounded-circle p-1" />
                        2024
                    </div></li>
                    <li><div className="dropdown-item d-flex align-items-center gap-2 py-2" onClick={() => handleItemClick('current', 'success')}>
                        <span className="d-inline-block bg-success rounded-circle p-1" />
                        current
                    </div></li>
                </ul>
            </div>
            <div className="heatmap-container ms-5">
                <Heatmap data={formattedData} year={selectedItem} />
            </div>
        </div>
    )
}

export default LeetcodeHeatmap