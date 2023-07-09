import type { Teacher } from "@prisma/client";
import Image from "next/image";

export default function TeacherSelect({ teacher, button=true }:{ teacher: Teacher, button: boolean }) {
    return (
        <>
            <div className="card" style={{alignItems: 'center', maxWidth: '300px', height: 'max-content'}}>
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Image className="mb-4" src={teacher.photoURL || "https://cdn.knowurteacher.com/defaultpfp.png"} height={200} width={200} alt={`${teacher.name}'s picture`}/>
                    <h5 className="card-title">{teacher.name}</h5>
                    <p className="card-text text-center">{teacher.school || "Unknown school"}</p>
                    {button && <a href={`/view/${teacher.school}/${teacher.name}`} className="btn btn-primary">View profile</a>}
                </div>
            </div>
        </>
    )
}