import axios from "axios";
import { useState } from "react";

export default function CreateReport() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (title.length && description.length) {
            await axios.post('http://localhost:3001/report', { title, description })
            setTitle('')
            setDescription('')
        }
    }
    return (
        <>
            <div className='flex space-between mx-auto space-x-4'>
                <div className="w-1/2">
                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                        Title
                    </label>
                    <div className="mt-2">
                        <input
                            id="title"
                            name="title"
                            type="text"
                            onChange={(e) => setTitle(e.currentTarget.value)}
                            placeholder="Write a title report"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            </div>
            <div className="w-1/2">
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                    Description
                </label>
                <div className="mt-2">
                    <textarea
                        id="description"
                        name="description"
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Write a report description"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <button type="button" onClick={submit} className="rounded-md bg-indigo-600 text-white py-2 px-4 mt-4">Create report</button>
        </>
    );
}
