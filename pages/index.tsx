import Image from "next/image";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import homeStyles from "@/styles/HomeStyles.module.css";
import Link from "next/link";
import Footer from "@/components/footer";
import Header from "@/components/header";

interface TeacherSuggestion {
  name: string;
  school: string;
}

export default function Home() {
    const router = useRouter();

    const [name, setName] = useState<string>("");
    const [recommendedTeachers, setRecommendedTeachers] = useState<TeacherSuggestion[]>([]);

	const faqs = [
		{
			question: "Are reviews anonymous?",
			answer: "Yes, all reviews are anonymous. We will not disclose the author of reviews to anyone, including third parties. More information about your data can be found in the terms of service"
		},
		{
			question: "How do I rate a teacher?",
			answer: "Search your teacher in the bar above; below them, you can add labels and submit your opinion."
		}
	]

    function search() {
        if(name.trim() == "") {
            alert("Name must not be empty!");
            return false;
        }
        router.push(`/search/${name}`);
        return false;
    }

    function redirectTo(t: TeacherSuggestion) {
      router.push(`/view/${t.school}/${t.name}`);
    }

    useEffect(() => {
      if(name.length < 3) {
        setRecommendedTeachers([]);
        return;
      }
      fetch(`/api/suggest?name=${encodeURIComponent(name)}`)
        .then((response) => response.json())
        .then(r => setRecommendedTeachers(r));
    }, [name]);

    return (
    <>
      <Header/>
      <section className="relative m-0">
        <div className="container mx-auto sm:px-4 text-text p-6">
          <h1 className="p-6 text-4xl dark:text-darktext">
            Rate your <span className="text-primary dark:text-darkaccent">teachers</span> and see others&apos; ratings about them.
          </h1>
          <h3 className="px-6 pt-6 pb-0 text-xl text-text dark:text-darktext">
            Search your teacher:
          </h3>
          <form className="p-6" onSubmit={(e: any) => {e.preventDefault(); search()}}>
            <div className="relative flex items-stretch w-full mb-3">
              <input autoComplete="yes" type="text" name="name" className="w-full py-1 px-2 mb-1 bg-white text-gray-800 border border-primary rounded rounded-r-none" placeholder="ex: John Doe" onChange={(e: any) => setName(e.target.value)}/>
              <button className="text-white dark:text-darktext bg-primary rounded rounded-l-none py-1 px-2 mb-1" type="button" onClick={search}>Search</button>
            </div>
            <div className={`m-0 text-black absolute ${homeStyles.absoluteContainer}`}>
              <ul className="bg-white dark:bg-darktext m-0 p-0 list-none">
                {
                  recommendedTeachers.map((t, key) => <li key={key} onClick={_ => redirectTo(t)}>
                    <div className="p-6">
                      <p className="m-0">{t.name} </p>
                      <p className="m-0 text-gray-700">{t.school}</p>
                    </div>
                  </li>)
                }
              </ul>
            </div>
            <p className="dark:text-darktext">
              Don&apos;t see your teacher above? <Link href="/add" className="text-primary dark:text-darkaccent opacity-40 dark:opacity-100">Add them to our database!</Link>
            </p>
          </form>
        </div>
      </section>
      <section className="text-inherit py-24 px-5">
        <h1 className="text-5xl ml-8 text-primary font-serif dark:text-darkaccent">
          FAQ
        </h1>
        <div className="flex flex-wrap justify-around mt-12">
			{
				faqs.map((f, i) => {
					return <div key={i} className="w-5/12 min-w-[250px] mx-8 my-3 dark:text-darktext">
						<h1 className="text-2xl mb-4">
							{f.question}
						</h1>
						<p className="text-base dark:text-gray-300">
							{f.answer}
						</p>
					</div>
				})
			}
        </div>
      </section>
      <Footer/>
    </>
  )
}
