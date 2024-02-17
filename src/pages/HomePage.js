import React, { useEffect, useState,useRef } from 'react'
import axios from 'axios'
import Layout from '../components/Layout/Layout'
import ProblemsGraph from '../components/ProblemsGraph'
import SolvedProblemsCard from '../components/Leetcode'
import CodeforcesHeatmap from '../components/CodeforcesHeatmap'
import CodeforcesRatingsGraph from '../components/CodeforcesRatingsGraph'
import LeetcodeHeatmap from '../components/LeetcodeHeatmap'
import { useAuth } from '../context/auth'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import CodeforcesCard from '../components/CodeforcesCard'
const HomePage = () => {
    const [auth, setAuth] = useAuth()
    // leetcode reference
    const leetcodeSectionRef = useRef(null);

    const scrollToLeetcodeSection = () => {
        if (leetcodeSectionRef.current) {
            leetcodeSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    // leetcode
    const [data, setData] = useState([]);
    const [totalEasy, setTotalEasy] = useState(0)
    const [totalMedium, setTotalMedium] = useState(0)
    const [totalHard, setTotalHard] = useState(0)
    const [easy, setEasy] = useState(0)
    const [medium, setMedium] = useState(0)
    const [hard, setHard] = useState(0)


    // update
    const [lcidN, setLcidN] = useState("")
    const [lcid, setLcid] = useState("")
    useEffect(() => {
        if (auth?.user) {
            const { lcid } = auth.user;
            setLcidN(lcid);
        }
    }, [auth?.user])
    const updateLcid = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put("/server/v1/auth/update-lc",
                { lcid }
            )
            if (data?.error) {
                toast.error(data?.error)
            }
            else {
                setAuth({ ...auth, user: data?.updatedUser })
                let ls = localStorage.getItem("auth")
                ls = JSON.parse(ls)
                ls.user = data.updatedUser
                localStorage.setItem('auth', JSON.stringify(ls))
                toast.success('Profile Updated Successfully')
            }
        } catch (error) {
            console.log(error)
            toast.error('Something Went wrong')
        }
    }

    useEffect(() => {
        const fetchSubmissionHistory = async () => {
            try {
                // const handle = 'singh_ujjain07'; // Replace with your Codeforces handle
                const response = await axios.get(`https://leetcode-stats-api.herokuapp.com/${lcidN}`);
                setData(response?.data?.submissionCalendar);
                setEasy(response?.data?.easySolved);
                setMedium(response?.data?.mediumSolved);
                setHard(response?.data?.hardSolved);
                setTotalEasy(response?.data?.totalEasy);
                setTotalMedium(response?.data?.totalMedium);
                setTotalHard(response?.data?.totalHard);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchSubmissionHistory();
    }, [lcidN]);
    // forces refernce
    const forcesSectionRef = useRef(null);

    const scrollToForcesSection = () => {
        if (forcesSectionRef.current) {
            forcesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    // codeforces
    const [cfid, setCfid] = useState("")
    const updateCfid = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put("/server/v1/auth/update-cf",
                { cfid }
            )
            if (data?.error) {
                toast.error(data?.error)
            }
            else {
                setAuth({ ...auth, user: data?.updatedUser })
                let ls = localStorage.getItem("auth")
                ls = JSON.parse(ls)
                ls.user = data.updatedUser
                localStorage.setItem('auth', JSON.stringify(ls))
                toast.success('Profile Updated Successfully')
            }
        } catch (error) {
            console.log(error)
            toast.error('Something Went wrong')
        }
    }
    const [problemsForces, setProblemsForces] = useState()
    const [heatmapForces, setHeatmapForces] = useState()
    const [cfidN, setCfidN] = useState("")
    const [totalProblemsSolved, setTotalProblemsSolved] = useState(0)
    useEffect(() => {
        const fetchProblemsByRating = async () => {
            try {
                // const handle = 'singh_ujjain07'; // Replace with your Codeforces handle
                let handle;
                if (auth?.user) {
                    const { cfid } = auth.user;
                    setCfidN(cfid);
                    handle = cfid
                }
                const response = await axios.get('/server/v1/forces/problems', { params: { handle } });
                // Filter submissions by problems solved
                const submissions = response?.data?.result
                // ---------------------------problems-------------------------------
                const solvedProblems = submissions?.filter(submission => submission.verdict === 'OK');
                setTotalProblemsSolved(solvedProblems.length)

                // Count the number of problems solved for each rating
                const problemsByRating = {};
                solvedProblems.forEach(submission => {
                    const rating = submission.problem.rating || 'Unrated';
                    problemsByRating[rating] = (problemsByRating[rating] || 0) + 1;
                });

                // Convert data to format required by Chart.js
                const chartData = {
                    labels: Object.keys(problemsByRating),
                    datasets: [
                        {
                            label: 'Problems Solved',
                            backgroundColor: 'rgba(75,192,192,0.2)',
                            borderColor: 'rgba(75,192,192,1)',
                            borderWidth: 1,
                            hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                            hoverBorderColor: 'rgba(75,192,192,1)',
                            data: Object.values(problemsByRating),
                        },
                    ],
                };

                setProblemsForces(chartData);
                // ---------------------------problems-------------------------------
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchProblemsByRating();
    }, [auth?.user]);
    return (
        <Layout scrollToForcesSection={scrollToForcesSection} scrollToLeetcodeSection={scrollToLeetcodeSection}>
            <div className='container-fluid home_c mb-5 mt-2' style={{ backgroundColor: "#F4F8FC" }}>
                <div className='row m-5'>
                    <div className='col-md-6 mb-5'>
                        <h1 className='home_h1'>
                            Tracking Your Way to Progress
                        </h1>
                        <p className='home_p'>
                            Welcome to Progress Tracker, where we make coding progress easy. Our platform tracks your problem-solving achievements on popular websites, helping you stay motivated and reach your coding goals.
                        </p>
                        <button className='btn btn-primary p-3 home_btn1'>View All Services</button>
                    </div>
                    <div className='col-md-6 d-flex align-items-center justify-content-center'>
                        <img className='home_img' src="images/1.webp" alt="Your Image Alt Text" />
                    </div>
                </div>
            </div>
            {/* forces */}
            <div ref={forcesSectionRef} id='forces_section'>
                <div className='container-fluid home_c' style={{ backgroundColor: "white" }}>
                    <div className='row' style={{ height: "400px" }}>
                        <div className='col-md-6 mb-5'>
                            <h1>Codeforces</h1>
                            <p>Enter your codeforces ID to see your stats</p>
                            <div className='row'>
                                <div className='col-md-8'>
                                    <input value={cfid} onChange={(e) => setCfid(e.target.value)} type="text" className="form-control" placeholder={cfidN ? cfidN : "Username"} aria-label="Username" />
                                </div>
                                <div className='col-md-4'>
                                    {
                                        auth?.user ? (
                                            <button type='button' onClick={updateCfid} className='btn btn-outline-secondary'>Update</button>
                                        ) : (
                                            <Link type='button' to="/login" className='btn btn-outline-secondary'>Update</Link>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="card mt-3 mb-3" style={{ width: "66%" }}>
                                <div className="row no-gutters">
                                    <div className="col-md-4 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#858E96", color: "white", fontSize: "20px" }}>
                                        Stats
                                    </div>
                                    <CodeforcesCard totalProblemsSolved={totalProblemsSolved} />
                                </div>
                            </div>

                        </div>
                        <div className='col-md-6 mb-5'>
                            <ProblemsGraph problemsForces={problemsForces} />
                        </div>
                    </div>
                </div>
                <div className='container-fluid' style={{ backgroundColor: "white" }}>
                    <CodeforcesHeatmap />
                    <div className='container-fluid mb-5' style={{ width: "60%" }}>
                        <CodeforcesRatingsGraph />
                    </div>
                </div>

            </div>
            {/* leetcode */}
            <div ref={leetcodeSectionRef} id='leetcode_section' className='container-fluid home_c' style={{ backgroundColor: "#F4F8FC" }}>
                <div className='row ' >
                    <div className='col-md-8  mb-5'>
                        <div className='ms-5'>
                            <h1>Leetcode</h1>
                            <p>Enter your Leetcode ID to see your stats</p>
                            <div className='row'>
                                <div className='col-md-6 mb-2'>
                                    <input value={lcid} onChange={(e) => setLcid(e.target.value)} type="text" className="form-control" placeholder={lcidN ? lcidN : "Username"} aria-label="Username" />
                                </div>
                                <div className='col-md-6 mb-2'>
                                    {
                                        auth?.user ? (
                                            <button type='button' onClick={updateLcid} className='btn btn-outline-secondary'>Update</button>
                                        ) : (
                                            <Link type='button' to="/login" className='btn btn-outline-secondary'>Update</Link>
                                        )
                                    }

                                </div>
                            </div>
                        </div>

                        <LeetcodeHeatmap data={data} />
                    </div>
                    <div className='col-md-4  mb-5 d-flex justify-content-center'>
                        <SolvedProblemsCard easy={easy} medium={medium} hard={hard} totalEasy={totalEasy} totalMedium={totalMedium} totalHard={totalHard} />
                    </div>

                </div>
            </div>

        </Layout>

    )
}

export default HomePage