import type { Teacher } from "@prisma/client";
import Image from "next/image";

export default function TeacherSelect({ teacher }:{teacher: Teacher}) {
    return (
        <>
            <div className="card" style={{alignItems: 'center', maxWidth: '300px'}}>
                <div className="card-body">
                    <Image src={teacher.photoURL || "https://cdn.knowurteacher.com/defaultpfp.png"} height={200} width={200} alt={`${teacher.name}'s picture`}/>
                </div>
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <h5 className="card-title">{teacher.name}</h5>
                    <p className="card-text">{teacher.school || "Unknown school"}</p>
                    <a href={`/view/${teacher.school}/${teacher.name}`} className="btn btn-primary">View profile</a>
                </div>
            </div>
        </>
    )
}