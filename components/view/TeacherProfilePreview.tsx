import type { Teacher } from "@prisma/client";

import Image from "next/image";

export default function TeacherProfilePreview({ teacher, button=false }: { teacher: Teacher, button: boolean }) {
    return <div className="relative mx-auto my-6 flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 dark:bg-darksecondary dark:border-primary" style={{alignItems: 'center', maxWidth: '300px', height: 'max-content'}}>
        <div className="flex flex-col items-center flex-auto p-6">
            <Image className="mb-4" src={teacher.photoURL || "https://cdn.knowurteacher.com/defaultpfp.png"} height={200} width={200} alt={`${teacher.name}'s picture`}/>
            <h1 className="mb-3 text-lg dark:text-darktext">
                {teacher.name}
            </h1>
            <p className="mb-0 text-center dark:text-darktext">
                {teacher.school}
            </p>
            {button && <a href={`/view/${teacher.school}/${teacher.name}`} className="inline-block align-middle text-center select-none font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline text-white m-2 mt-6 bg-primary dark:bg-darkprimary">View profile</a>}
        </div>
    </div>
}