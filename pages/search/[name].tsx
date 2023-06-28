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

export default function SearchByName({ teachers, searched, countProp } : { teachers: Teacher[], searched: string, countProp:number }) {

    const [count, setCount] = useState<number>(countProp);
    const [cursor, setCursor] = useState<number>(0);
    const [schoolInput, setSchoolInput] = useState<string>("");
    const [school, setSchool] = useState<string>("");
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
        fetch(`/api/moreTeachers?name=${searched}&startIndex=${cursor}&school=${school}`)
            .then(r => r.json())
            .then(t => {
                setShownTeachers(t.teachers);
                setCount(t.count);
            });
    }, [cursor, searched, school]);

    // Pink body background
    useEffect(() => {
        document.body.className = ss.pinkBG;
    }, []);

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
                    <Image src='https://cdn.knowurteacher.com/logo.svg' alt='logo' fill={true}/>
                </div>
            </Link>
        </header>
        <section className={ss.firstSection}>
            <div className="hero-unit">
                <h1>
                    Your search results:
                </h1>
            </div>
            <p>There are <b>{count || "no"}</b> teachers whose name starts with <b>{searched}</b></p>
        </section>
        <section className={ss.secondSection}>
        <div className={`list-group ${ss.teachersWrapper}`}>
            {                            // this div is necessary for the `key` prop, for optimization purposes.
                shownTeachers.map((t, key) => <div className="list-group-item" key={key}><TeacherSelect teacher={t}/></div>)
            }
        </div>
            {
                shownTeachers.length < count && <ul className="pagination">
                    <li className="page-item"><button className="page-link btn" onClick={_ => getPrevResults()}>Previous</button></li>
                    <li className="page-item"><p className="page-link">{shownTeachers.length > 1 ? `${cursor + 1}-${cursor + shownTeachers.length }` : cursor + 1}</p></li>
                    <li className="page-item"><button className="page-link btn" onClick={_ => getNextResults()}>Next</button></li>
                </ul>
            }
        </section>
        <section className={ss.firstSection}>
            <div className="hero-unit">
                <h1>
                    Need more filters?
                </h1>
            </div>
            <p>Use the following:</p>
            <form className={ss.form} action="/" onSubmit={(e) => e.preventDefault()}>
                <div className="input-group mb3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">School:</span>
                    </div>
                    <input type="text" name="school" className="form-control" placeholder="Politecnico di Milano" aria-label="school" value={schoolInput} onChange={(e: any) => setSchoolInput(e.target.value)} />
                </div>
            </form>
                <button className={`btn btn-primary ${ss.button}`} onClick={_ => setSchool(schoolInput)}>
                    Search
                </button>
        </section>
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

        const countProp = await prisma.teacher.count({
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
                countProp,
                searched: name
            }
        }
    } catch (error) {
        console.error(error);
        return {
            props: {
                teachers: [],
                countProp: 0,
                searched: name
            }
        }
    }
}