// Prisma
import type { Teacher } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

// Next
import Head from "next/head";
import Image from "next/image";
// React
import { useEffect, useState } from "react";

// Styles
import ss from "@/styles/Search.module.css"; // Search Styles

// Components
import TeacherSelect from "@/components/teacherSelect";
import Link from "next/link";

export default function SearchByName({ teachers, searched, count } : { teachers: Teacher[], searched: string, count:number }) {

    const [cursor, setCursor] = useState<number>(0);
    const [shownTeachers, setShownTeachers] = useState<Teacher[]>(teachers);

    function getPrevResults() {
        if(cursor - 5 < 0) {
            setCursor(0);
            return;
        }
        setCursor(cursor - 5);
    }

    function getNextResults() {
        if(cursor + 5 > count) {
            const max = Math.floor(count / 5) * 5;
            setCursor(max);
            return;
        }
        setCursor(cursor + 5);
    }

    useEffect(() => {
        fetch(`/api/moreTeachers?name=${searched}&startIndex=${cursor}`)
            .then(r => r.json())
            .then(t => setShownTeachers(t));
    }, [cursor, searched])

    return (
        <>
        <Head>
            <title>{`Knowurteacher search | ${searched}`}</title>
        </Head>
        <header className={ss.header}>
            <Link href="/">
                <h3>
                    Knowurteacher
                </h3>
                <div>
                    <Image src='/logo.svg' alt='logo' fill={true}/>
                </div>
            </Link>
        </header>
        <section className={ss.firstSection}>
            <div className="hero-unit">
                <h1>
                    Your search results:
                </h1>
            </div>
            <p>There are <b>{count}</b> teachers starting with <b>{searched}</b></p>
        </section>
        <section className={ss.secondSection}>
            {                            // this div is necessary for the `key` prop, for optimization purposes.
                shownTeachers.map((t, key) => <div key={key}><TeacherSelect teacher={t}/></div>)
            }
            {
                shownTeachers.length < count && <div className={ss.navButtons}>
                    <button className="btn" onClick={_ => getPrevResults()}>
                        &lt;
                    </button>
                    <p>{shownTeachers.length > 1 ? `${cursor + 1}-${cursor + shownTeachers.length }` : cursor + 1}</p>
                    <button className="btn" onClick={_ => getNextResults()}>
                        &gt;
                    </button>
                </div>
            }
        </section>
            {
                JSON.stringify(teachers)
            }
        </>
    )
}

export async function getServerSideProps(ctx: any) {
    const { name } = ctx.query
    const prisma = new PrismaClient();

    try {
        const teachers = await prisma.teacher.findMany({
            where: {
                name: {
                    startsWith: name,
                    mode: 'insensitive'
                }
            },
            orderBy: {
                id: 'asc'
            },
            take: 5
        });

        const count = await prisma.teacher.count({
            where: {
                name: {
                    startsWith: name,
                    mode: 'insensitive'
                }
            }
        });

        return {
            props: {
                teachers,
                count,
                searched: name
            }
        }
    } catch (error) {
        console.error(error);
        return {
            props: {
                teachers: [],
                count: 0,
                searched: name
            }
        }
    }
}