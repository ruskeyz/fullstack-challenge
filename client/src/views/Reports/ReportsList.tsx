import { TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface IReport {
  uuid: string
  title: string
  description: string
  created: string
  updated: string
  data: { metrics: { metricId: string, value: any }[] } | null
}
export default function ReportsList() {
  const [reports, setReports] = useState<IReport[]>([])
  const navigate = useNavigate()
  const fetchReport = async () => {
    const { data } = await axios.get('http://localhost:3001/reports')
    setReports(data.rows)
  }
  useEffect(() => {
    fetchReport().catch((e) => console.log(e))
  }, [])
  const onDelete = async (event: React.MouseEvent<SVGSVGElement, MouseEvent>, id: string) => {
    event.stopPropagation()
    try {
      await axios.post(`http://localhost:3001/reports/delete/${id}`)
      fetchReport()
    }
    catch (e) {
      console.log(e)
    }
  }
  return (
    <>
      {!reports && <button>Create</button>}
      {reports ? (reports.map((report) => {
        return (
          <div key={report.uuid} className="border border-indigo-100 py-4 px-4 flex mx-auto justify-between rounded-md my-2 shadow-sm hover:cursor-pointer hover:shadow-md hover:border-indigo-200" onClick={() => navigate(`${report.uuid}`)}>
            <p>{report.title}</p>
            <p>{report.description}</p>
            <TrashIcon className="w-5 h-5" onClick={(e) => onDelete(e, report.uuid)} />
          </div>
        )
      })) : null}
    </>
  );
}
