import Image from "next/image";

import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function AddTeacher() {

    const [name, setName] = useState("");
    const [school, setSchool] = useState("");

    function addTeacher() {
        if (!name || !school) {
            return;
        }
        const body = {
            name: name,
            school: school
        }
        fetch(`/api/teacher/add`, {
            method: "POST",
            body: JSON.stringify(body)
        })
    }

    return (<>
        <Header />
        <h1 className="text-center m-6 mt-8 text-4xl dark:text-darktext">
            Add a teacher:
        </h1>
        <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 dark:bg-[#26092a] dark:border-primary" style={{ alignItems: 'center', width: 'min-content', minWidth: '270px', margin: '100px auto' }}>
            <div className="flex-auto p-6">
                <Image src={"https://cdn.knowurteacher.com/defaultpfp.png"} height={200} width={200} alt={`${name}'s picture`} />
            </div>
            <div className="flex-auto p-6 flex flex-col items-center dark:text-darktext">
                <label className="form-label">Name:</label>
                <input type="text" className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded" value={name} onChange={(e) => setName(e.target.value)} required={true} />
                <label className="form-label m-2">School:</label>
                <input type="text" className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded" value={school} onChange={(e) => setSchool(e.target.value)} required={true} />
                <button className="inline-block align-middle text-center select-none font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline text-white m-2 mt-6 bg-primary dark:bg-darkprimary" onClick={_ => addTeacher()}>Add</button>
            </div>
        </div>
        <Footer />
    </>)
}