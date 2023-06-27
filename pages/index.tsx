import Image from "next/image";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import homeStyles from "@/styles/HomeStyles.module.css";

interface TeacherSuggestion {
  name: string;
  id: number;
}

export default function Home() {
    const router = useRouter();
    const [name, setName] = useState<string>("");
    const [recommendedTeachers, setRecommendedTeachers] = useState<TeacherSuggestion[]>([]);

    function search() {
        if(name.trim() == "") {
            alert("Name must not be empty!");
            return false;
        }
        router.push(`/search/${name}`);
        return false;
    }

    function redirectTo(id: number) {
      router.push(`/search/id/${id}`);
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
      <section className={`hero-unit ${homeStyles.initialSection}`}>
        <h1>
          KNOWURTEACHER
        </h1>
        <div>
          <Image src='https://cdn.knowurteacher.com/logo.svg' alt='logo' fill={true}/>
        </div>
      </section>
      <section className={homeStyles.secondSection}>
        <h1>
          Empower your education
        </h1>
        <p>
        Unveil the hidden gems of the teaching world and help your peers make informed choices for a better academic experience!
        With KnowUrTeacher, you can rate your teachers, share reviews, and prep-up for upcoming exams.
        </p>
        <form id="teacher-name-form" onSubmit={(e: any) => {e.preventDefault(); search()}}>
          <h3>
            Search your teacher:
          </h3>
          <div className="input-group mb-3">
            <input autoComplete="yes" type="text" name="name" className="form-control" aria-label="" aria-describedby="basic-addon1" placeholder="ex: John Doe" onChange={(e: any) => setName(e.target.value)}/>
            <div className="input-group-prepend">
                <button className={`btn btn-outline-secondary ${homeStyles.button}`} type="button" onClick={search}>Search</button>
            </div>
          </div>
          <div className={homeStyles.absoluteContainer}>
            <ul className={homeStyles.list}>
              {
                recommendedTeachers.map((t, key) => <li key={key} onClick={_ => redirectTo(t.id)}><p>{t.name}</p></li>)
              }
            </ul>
        </div> 
        </form>
      </section>
      <section className={homeStyles.thirdSection}>
        <h3>
          &quot;Education is the passport for the future, for tomorrow belongs to those who prepare for it today.&quot;
        </h3>
      </section>
      <section className={homeStyles.fourthSection}>
        <h3>
          FAQ
        </h3>
        <div className={homeStyles.faqWrapper}>
          <div>
            <h5>
              How do I rate a teacher?
            </h5>
            <p>
              Simply search the name of your teacher, then leave a review based on your experiences with them.
            </p>
          </div>
          <div>
            <h5>
              Is my review anonymous?
            </h5>
            <p>
              Yes! Nobody can see who wrote a specific review, except for us.
            </p>
          </div>

          <div>
            <h5>
              How can I report reviews?
            </h5>
            <p>
              Hover over a review and click on the three buttons. There will be a &quot;Report&quot; button that will guide you through a report submission.
            </p>
          </div>
          <div>
            <h5>
              Are reviews filtered?
            </h5>
            <p>
              We want the reviews to be purely professional and not personal. We might remove or edit reviews without disclosure for such reasons.
            </p>
          </div>
        </div>
      </section>
      <footer className={homeStyles.footer}>
        <p>
          Made with &lt;3. <a href="github.com/ilariiiiia/knowurteacher">We&apos;re open source!</a>
        </p>
      </footer>
    </>
  )
}