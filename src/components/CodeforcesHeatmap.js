import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Heatmap from '../components/Layout/Heatmap'
import { useAuth } from '../context/auth'


const CodeforcesHeatmap = () => {
    const [data, setData] = useState([]);
    const [auth,setAuth] = useAuth()
    useEffect(() => {
        const fetchSubmissionHistory = async () => {
            try {
                // const handle = 'singh_ujjain07'; // Replace with your Codeforces handle
                let handle;
                if (auth?.user) {
                    const { cfid } = auth.user;
                    handle = cfid
                }
                const response = await axios.get('/server/v1/forces/problems', { params: { handle } });
                const submissions = response.data.result;

                // Filter submissions to get only solved problems
                const solvedSubmissions = submissions.filter(submission => submission.verdict === 'OK');

                // Extract the submission date and format it as yyyy-mm-dd
                const submissionDates = solvedSubmissions.map(submission => {
                    const date = new Date(submission.creationTimeSeconds * 1000);
                    return date.toISOString().substring(0, 10); // Extract yyyy-mm-dd
                });

                // Count the number of submissions for each date
                const submissionsByDate = submissionDates.reduce((acc, date) => {
                    acc[date] = (acc[date] || 0) + 1;
                    return acc;
                }, {});

                // Convert the data to the format required by the heatmap
                const heatmapData = Object.keys(submissionsByDate).map(date => ({
                    date: new Date(date),
                    count: submissionsByDate[date],
                }));
                setData(heatmapData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchSubmissionHistory();
    }, [auth?.user]);
    return (
        <div style={{ width: "70%", alignItems: "center", justifyContent: "center", textAlign: "center", margin: "0 auto" }}>
            <h1>Problem Solving Heatmap</h1>
            <Heatmap data={data} />
        </div>
    )
}

export default CodeforcesHeatmap