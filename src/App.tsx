import {useEffect, useState} from "react";
import {
    Bar,
    BarChart,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {motion} from "framer-motion";
import {ArrowPathIcon} from "@heroicons/react/24/outline";

const fetchData = async () => {
    try {
        const response = await fetch(
            `https://www.staging.ultrahuman.com/api/v1/metrics?email=shresth@ultrahuman.com&date=23/12/2022`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJzZWNyZXQiOiJjZGM5MjdkYjQ3ZjA5ZDhhNzQxYiIsImV4cCI6MjQzMDEzNTM5Nn0.x3SqFIubvafBxZ1GxvPRqHCd0CLa4_jip8LHbopzLsQ',
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

function App() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchData();
                setData(result);
            } catch (error) {
                setError("Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <ArrowPathIcon className="w-16 h-16 animate-spin text-blue-500"/>
        </div>
    );

    if (error) return <h1 className="text-3xl font-bold text-center mt-10 text-red-500">{error}</h1>;
    if (!data) return <h1 className="text-3xl font-bold text-center mt-10">No data available</h1>;

    // Extracting Sleep Stages
    const sleepStages = data.data.metric_data.find((item: any) => item.type === "Sleep")?.object.sleep_stages || [];

    // Extracting HRV Data
    const hrvGraph = data.data.metric_data.find((item: any) => item.type === "hrv_graph")?.object.gist_object || {
        avg: 0,
        min: 0,
        max: 0
    };

    // Extracting Recovery & Movement Index
    const recoveryIndex = data.data.metric_data.find((item: any) => item.type === "recovery_index")?.object?.value || 0;
    const movementIndex = data.data.metric_data.find((item: any) => item.type === "movement_index")?.object?.value || 0;

    // Preparing Sleep Stages Data for Pie Chart
    const sleepPieData = sleepStages.map((stage: any) => ({
        name: stage.title,
        value: stage.percentage,
    }));

    // Preparing HRV Data for Line Chart
    const hrvLineData = [
        {name: "Min HRV", value: hrvGraph.min || 10},
        {name: "Avg HRV", value: hrvGraph.avg || 20},
        {name: "Max HRV", value: hrvGraph.max || 30},
    ];

    // Preparing Recovery & Movement Data for Bar Chart
    const recoveryMovementData = [
        {name: "Recovery Index", value: recoveryIndex},
        {name: "Movement Index", value: movementIndex},
    ];

    return (
        <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
            <motion.h1
                className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 text-transparent bg-clip-text"
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}
            >
                Health Metrics Dashboard
            </motion.h1>

            {/* Sleep Stages Pie Chart */}
            <motion.div
                className="bg-gray-800 p-6 rounded-xl shadow-lg w-11/12 md:w-3/4 mb-10 hover:scale-105 transition-transform"
                initial={{opacity: 0, scale: 0.9}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.8}}
            >
                <h2 className="text-2xl font-semibold text-center mb-4">Sleep Stages</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={sleepPieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >
                            {sleepPieData.map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`}
                                      fill={["#22D3EE", "#6366F1", "#F59E0B", "#EF4444"][index % 4]}/>
                            ))}
                        </Pie>
                        <Tooltip/>
                    </PieChart>
                </ResponsiveContainer>
            </motion.div>

            {/* HRV Line Chart */}
            <motion.div
                className="bg-gray-800 p-6 rounded-xl shadow-lg w-11/12 md:w-3/4 mb-10 hover:scale-105 transition-transform"
                initial={{opacity: 0, scale: 0.9}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.8}}
            >
                <h2 className="text-2xl font-semibold text-center mb-4">Heart Rate Variability</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={hrvLineData}>
                        <XAxis dataKey="name" stroke="white"/>
                        <YAxis stroke="white"/>
                        <Tooltip/>
                        <Legend/>
                        <Line type="monotone" dataKey="value" stroke="#F87171" strokeWidth={3} dot={{r: 6}}/>
                    </LineChart>
                </ResponsiveContainer>
            </motion.div>

            {/* Recovery & Movement Index Bar Chart */}
            <motion.div
                className="bg-gray-800 p-6 rounded-xl shadow-lg w-11/12 md:w-3/4 hover:scale-105 transition-transform"
                initial={{opacity: 0, scale: 0.9}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.8}}
            >
                <h2 className="text-2xl font-semibold text-center mb-4">Recovery & Movement Index</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={recoveryMovementData}>
                        <XAxis dataKey="name" stroke="white"/>
                        <YAxis stroke="white"/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="value" fill="#3B82F6" barSize={40} radius={[10, 10, 0, 0]}/>
                    </BarChart>
                </ResponsiveContainer>
            </motion.div>
        </div>
    );
}

export default App;
