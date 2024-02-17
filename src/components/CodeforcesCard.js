import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { useAuth } from '../context/auth'

const CodeforcesCard = ({totalProblemsSolved}) => {
    const [maxRating,setMaxRating] = useState(0)
    const [rating,setRating] = useState(0)
    const [rank,setRank] = useState("")
    const [auth,setAuth] = useAuth()
    let handle;
                
    useEffect(()=>{
        if (auth?.user) {
            const { cfid } = auth.user;
            handle = cfid
        }
    },[auth?.user])
    useEffect(() => {
        const fetchProblemsByRating = async () => {
            try {
                // const handle = 'singh_ujjain07'; // Replace with your Codeforces handle
                
                const response = await axios.get('/server/v1/forces/user-info', { params: { handle } });
                setMaxRating(response?.data?.result[0].maxRating)
                setRating(response?.data?.result[0].rating)
                setRank(response?.data?.result[0].rank)
                console.log(response?.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchProblemsByRating();
    }, [auth?.user]);
    return (
        <div className="col-md-8">
            <div className="card-body">
                <h5 className="card-title">{auth?.user?.cfid}</h5>
                <p className="card-text">
                    Rating : {rating} (max-{maxRating})
                </p>
                <p className="card-text">
                    Max-Rank: {rank}
                </p>
                <p className="card-text">
                    Total Problems Solved: {totalProblemsSolved}
                </p>
                {/* <p className="card-text"><small className="text-muted">Last visited 3 mins ago</small></p> */}
            </div>
        </div>
    )
}

export default CodeforcesCard