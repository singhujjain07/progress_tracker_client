import React, { useEffect, useState, useRef } from 'react'
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
import { Tooltip as ReactTooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

import { FaRegDotCircle } from 'react-icons/fa';
import { FaCircleInfo } from "react-icons/fa6";
import { AiFillInfoCircle } from "react-icons/ai";


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
    // const [heatmapForces, setHeatmapForces] = useState()
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
            <div className='container-fluid home_c mb-5 mt-5' style={{ backgroundColor: "#F4F8FC" }}>
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
                        <img className='home_img' src="images/1.webp" alt="side_image" />
                    </div>
                </div>
            </div>
            <div className='container-fluid  mb-5 mt-2' style={{ backgroundColor: "#F4F8FC", paddingLeft: "5%", paddingRight: "5%" }}>
                {/* <div className='row mx-5'>
                    <div className="card">
                        <img src="/images/2.png" className="card-img-top" alt="Card background" />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <button type="button" class="btn btn-success">Read More</button>
                        </div>
                    </div>
                </div> */}

                <div className='row mx-5'>
                    <div className='col-md-8 my-5 pt-5'>
                        <div className='row'>
                            <h1 className=''>Features</h1>
                            <div className='col-md-6  d-flex align-items-center '>
                                <ul style={{ listStyleType: 'none', padding: 0 }}>
                                    <li className='m-2 features_list'>
                                        <FaRegDotCircle className='icon1' /> Coding Progress Tracking
                                    </li>
                                    <li className='m-2 features_list'>
                                        <FaRegDotCircle className='icon1' /> Problem Tracker
                                    </li>
                                    <li className='m-2 features_list'>
                                        <FaRegDotCircle className='icon1' /> Achievement Display
                                    </li>
                                    <li className='m-2 features_list'>
                                        <FaRegDotCircle className='icon1' /> Increased Accountability
                                    </li>
                                </ul>
                            </div>
                            <div className='col-md-6 d-flex align-items-center '>
                                <ul style={{ listStyleType: 'none', padding: 0 }}>
                                    <li className='m-2 features_list'>
                                        <FaRegDotCircle className='icon1' /> Improved Focus
                                    </li>
                                    <li className='m-2 features_list'>
                                        <FaRegDotCircle className='icon1' /> Motivation Boost
                                    </li>
                                    <li className='m-2 features_list'>
                                        <FaRegDotCircle className='icon1' /> Organized Workflow
                                    </li>
                                    <li className='m-2 features_list'>
                                        <FaRegDotCircle className='icon1' /> Progress Visualization
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4  '>
                        <img className='home_img' src="images/2.png" alt="codeforces_image" />
                    </div>

                </div>
            </div>
            {/* forces */}
            <div ref={forcesSectionRef} id='forces_section'>
                <div className='container-fluid home_c' style={{ backgroundColor: "white" }}>
                    <div className='row' style={{ height: "400px" }}>
                        <div className='col-md-6 mb-5'>
                            <div style={{ display: "flex" }}>
                                <h1 className=''>Codeforces</h1>
                                <div className='d-flex align-items-start mt-2'>
                                    <AiFillInfoCircle data-tooltip-id="info_icon_tooltip" size={"15px"} color='#2191EC' />
                                    <ReactTooltip place="right" id="info_icon_tooltip" >
                                        The application is in beta stage.
                                        {<br />}
                                        It might take some time to fetch data.
                                    </ReactTooltip>
                                </div>
                            </div>
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
                            <div style={{ display: "flex" }}>
                                <h1 className=''>Leetcode</h1>
                                <div className='d-flex align-items-start mt-2'>
                                    <AiFillInfoCircle data-tooltip-id="info_icon_tooltip" size={"15px"} color='#2191EC' />
                                    <ReactTooltip place="right" id="info_icon_tooltip" style={{backgroundColor:"#89CFF0",color:"#000",fontStyle:"bold"}} >
                                        The application is in beta stage.
                                        {<br />}
                                        It might take some time to fetch data.
                                    </ReactTooltip>
                                </div>
                            </div>
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