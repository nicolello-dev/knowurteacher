import type { Teacher } from "@prisma/client";

export default function TeacherSelect({ teacher }:{teacher: Teacher}) {
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{teacher.name}</h5>
                    <p className="card-text">{teacher.school || "Unknown school"}</p>
                    <a href={`/search/id/${teacher.id}`} className="btn btn-primary">View profile</a>
                </div>
            </div>
        </>
    )
}