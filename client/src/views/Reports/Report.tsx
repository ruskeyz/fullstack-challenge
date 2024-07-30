import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { IReport } from "./ReportsList"

interface IMetric {
    metricId: string
    value: string
}
export default function Report() {
    const { id } = useParams()
    const [report, setReport] = useState<IReport>()
    const [metric, setMetric] = useState<IMetric>({
        metricId: '',
        value: ''
    })

    const fetchProduct = async () => {
        const { data } = await axios.get(`http://localhost:3001/reports/${id}`)
        setReport(data.rows[0])
    }
    useEffect(() => {
        fetchProduct().catch(e => console.log(e))
    }, [])

    const addMetric = async () => {
        console.log(metric)
        if (metric.value.length > 1 && metric.metricId.length > 1) {
            try {
                await axios.post(`http://localhost:3001/metrics/${id}`, { metric })
                fetchProduct()
            } catch (e) {
                console.log(e)
            }
        }
    }
    return (
        <>
            <div className="space-y-4 my-4">
                <h1>Product #{id}</h1>
                <p className="">{report?.title}</p>
                <p>{report?.description}</p>
            </div>
            {report?.data ? (
                <>
                    <h2 className="text-lg font-bold">Metrics Report</h2>
                    <p className="text-sm text-gray-500">This report contains the following metrics:</p>
                    <div className="inline-block min-w-full py-2 align-middle">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th className="text-left">Metric ID</th>
                                    <th className="text-left">Metric Value</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {report.data.metrics.map((metric, id) => {
                                    return (
                                        <tr key={id} className="whitespace-nowrap py-4 ">
                                            <td className="whitespace-nowrap px-3 py-4">{metric.metricId}</td>
                                            <td className="whitespace-nowrap px-3 py-4">{metric.value}</td>
                                        </tr>
                                    )
                                }
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : null}
            <p>Add metrics</p>
            <div className="flex space-x-4">
                <input type='text' name="name" placeholder="Metric name" className="rounded-md" onChange={e => setMetric({ ...metric, metricId: e.currentTarget.value })} />
                <input type='text' name="metric_value" placeholder="Metric Value" className="rounded-md" onChange={e => setMetric({ ...metric, value: e.currentTarget.value })} />
                <button type="button" className="bg-indigo-600 text-white shadow-md rounded-md py-2 px-4 hover:bg-indigo-800" onClick={addMetric}>Add</button>
            </div>
        </>
    )
}
