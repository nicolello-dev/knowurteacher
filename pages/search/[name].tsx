// Prisma
import type { Teacher } from "@prisma/client";

// Next
import Head from "next/head";
import { useRouter } from "next/router";

// React
import { useEffect, useState } from "react";

// Styles
import ss from "@/styles/Search.module.css"; // Search Styles

// Components
import TeacherSelect from "@/components/teacherSelect";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function SearchByName() {

    const [count, setCount] = useState<number>(0);
    const [cursor, setCursor] = useState<number>(0);
    const [schoolInput, setSchoolInput] = useState<string>("");
    const [school, setSchool] = useState<string>("");
    const [shownTeachers, setShownTeachers] = useState<Teacher[]>([]);

    const router = useRouter();
    const searched = router.query.name

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
        searched && fetch(`/api/moreTeachers?name=${searched}&startIndex=${cursor}&school=${school}`)
            .then(r => r.json())
            .then(t => {
                setShownTeachers(t.teachers);
                setCount(t.count);
            });
    }, [cursor, searched, school]);

    return (
        <>
        <Head>
            <title>{`Knowurteacher search | ${searched}`}</title>
        </Head>
        <Header/>
        <section className={ss.firstSection}>
            <div className="hero-unit">
                <h1>
                    Your search results:
                </h1>
            </div>
            <p>There are <b>{count || "no"}</b> teachers whose name contains <b>{searched}</b></p>
        </section>
        <section className={ss.secondSection}>
        <div className={`list-group ${ss.teachersWrapper}`}>
            {                            // this div is necessary for the `key` prop, for optimization purposes.
                shownTeachers.map((t, key) => <div style={{ width: '300px', padding: '1rem'}} key={key}><TeacherSelect teacher={t} button={true}/></div>)
            }
        </div>
            {
                shownTeachers.length < count && <ul className={`pagination ${ss.pagination}`}>
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
        <Footer/>
        </>
    )
}