import { Teacher } from "@prisma/client";
import Image from "next/image";

import styles from "./teacherProfile.module.css"

export default function TeacherProfile({ teacher }: {teacher: Teacher}) {
    return (<>
        <div className={styles.teacherWrapper}>
            <div className={styles.imageWrapper}>
                <Image src={teacher.photoURL || "https://cdn.knowurteacher.com/defaultpfp.png"} alt={`${teacher.name}'s profile picture`} fill={true}/>
            </div>
            <p>
                Name: <b>{teacher.name}</b>
            </p>
            <p>
                School: <b>{teacher.school}</b>
            </p>
        </div>
    </>)
}