import React from "react";
import {Cell, Pie, PieChart, Tooltip} from "recharts";
import {useFetchData} from "./useFetchData";

interface RenderedData {
    name: string;
    value: number;
}

const COLORS = ['red', 'green', 'blue', 'yellow', 'purple', 'pink', 'green', 'purple', 'brown', 'grey'];

export const Charts = () => {
    const {randomNumbers: fetchResults, isLoading} = useFetchData()
    const [activeIndex, setActiveIndex] = React.useState(-1);

    if (isLoading === 'loading') return <p>Fetching Results</p>
    if (isLoading === 'error') return <p>Error</p>

    const data: RenderedData[] | undefined = fetchResults?.randomNumbers.map((d: number, index: number) => ({
        name: `Item ${index + 1}`,
        value: d
    }))

    const onPieEnter = (_: number, index: number) => setActiveIndex(index);
    const onPieLeave = () => {
        setActiveIndex(-1);
    };

    return (
        <>
            <h1>Charts App</h1>
            <PieChart width={730} height={250}>
                <Pie onMouseEnter={onPieEnter} onMouseLeave={onPieLeave} data={data} dataKey="value" nameKey="name"
                     cx="50%" cy="50%" outerRadius={50} fill="#8884d8">
                    {data?.map((_: RenderedData, index: number) => (
                        <Cell key={`cell-${index}`}
                              fill={index === activeIndex ? '#FF0000' : COLORS[index]}/>
                    ))}
                </Pie>
                <Tooltip/>
            </PieChart>
        </>
    )
}