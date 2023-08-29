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
import TeacherProfilePreview from "@/components/view/TeacherProfilePreview";
import Header from "@/components/header";
import Footer from "@/components/footer";


export default function SearchByName() {

    const [count, setCount] = useState<number>(0);
    const [cursor, setCursor] = useState<number>(0);
    const [schoolInput, setSchoolInput] = useState<string>("");
    const [school, setSchool] = useState<string>("");
    const [shownTeachers, setShownTeachers] = useState<Teacher[]>([]);
	const [loading, setLoading]= useState<boolean>(true);

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
				setLoading(false);
                setShownTeachers(t.teachers || []);
                setCount(t.count || 0);
            })
			.catch(e => console.error(e));
    }, [cursor, searched, school]);

    return (
        <>
        <Head>
            <title>{loading ? "Teacher search | Knowurteacher" : `Search - ${searched} | knowurteacher`}</title>
        </Head>
        <Header/>
        <section className="p-8 pb-4 flex flex-col items-center dark:text-white">
            <h1 className='text-3xl'>
				Your search results:
			</h1>
			{
				loading ? <p className="mx-auto text-center">Loading data, please wait...</p> : <p className='mt-4'>There are <b>{count || "no"}</b> teachers whose name contains <b>{searched}</b></p>
			}
        </section>
        <section className="py-4">
	        <div className='flex flex-row flex-wrap justify-evenly'>
	            {                            // this div is necessary for the `key` prop, for optimization purposes.
	                shownTeachers.map((t, key) => <div className="w-72 p-4" key={key}><TeacherProfilePreview teacher={t} button={true}/></div>)
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
        <section className="p-8 pb-4 flex flex-col items-center dark:text-white">
            <h1 className="text-2xl">
				Need more filters?
			</h1>
            <form className="m-8 w-4/6 max-w-96 min-w-72" action="/" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-row flex-nowrap mb-3 rounded">
                    <p className="m-0 p-2">
                        School:
					</p>
                    <input type="text" name="school" className="w-full p-2 dark:text-black" placeholder="CalTech" aria-label="school" value={schoolInput} onChange={(e: any) => setSchoolInput(e.target.value)} />
                </div>
            </form>
                <button className="bg-primary p-2 text-lg rounded-lg text-white" onClick={_ => setSchool(schoolInput)}>
                    Search
                </button>
        </section>
        <Footer/>
        </>
    )
}