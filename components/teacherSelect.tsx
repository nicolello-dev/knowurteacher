import type { Teacher } from "@prisma/client";

import styles from "./teacherSelect.module.css";

export default function TeacherSelect({ teacher }:{teacher: Teacher}) {
    return (
        <>
            <a href={`/search/id/${teacher.id}`} className={styles.a}>
                <div className={styles.wrapper}>
                    <h5>Name: <b>{teacher.name}</b></h5>
                    <p>School: <b>{teacher.school || "Not available"}</b></p>
                </div>
            </a>
        </>
    )
}