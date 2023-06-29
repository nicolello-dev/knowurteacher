import { Teacher } from "@prisma/client";

import styles from "./teacherProfile.module.css"
import TeacherSelect from "./teacherSelect";
import Link from "next/link";

import ss from "@/styles/Search.module.css";
import Image from "next/image";

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
            <TeacherSelect teacher={teacher}/>
        </div>
    </>)
}