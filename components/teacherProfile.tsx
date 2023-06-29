import { Teacher } from "@prisma/client";
import Image from "next/image";

import styles from "./teacherProfile.module.css"
import ss from "@/styles/Search.module.css"; // Search Styles

import Link from "next/link";

export default function TeacherProfile({ teacher }: {teacher: Teacher}) {
    return (<>
        <header className={ss.header}>
            <Link href="/">
                <h3>
                    Knowurteacher
                </h3>
                <div>
                    <Image src='https://cdn.knowurteacher.com/logo.svg' alt='logo' fill={true}/>
                </div>
            </Link>
        </header>
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