import Image from "next/image";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import homeStyles from "@/styles/HomeStyles.module.css";
import Link from "next/link";

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
        <div className="position-relative ratio ratio-1x1">
          <Image src='https://cdn.knowurteacher.com/logo.svg' alt='logo' fill={true}/>
        </div>
      </section>
      <section className="container p-5 text-black">
        <h1 className="p-4">
          Empower your education
        </h1>
        <h5 className="p-3">
        Unveil the hidden gems of the teaching world and help your peers make informed choices for a better academic experience!
        With KnowUrTeacher, you can rate your teachers, share reviews, and prep-up for upcoming exams.
        </h5>
        <h3 className="p-4">
          Search your teacher:
        </h3>
        <form id="teacher-name-form" className="p-3" onSubmit={(e: any) => {e.preventDefault(); search()}}>
          <div className="input-group mb-3">
            <input autoComplete="yes" type="text" name="name" className="form-control" aria-label="" aria-describedby="basic-addon1" placeholder="ex: John Doe" onChange={(e: any) => setName(e.target.value)}/>
            <div className="input-group-prepend">
                <button className={`btn btn-outline-secondary ${homeStyles.button}`} type="button" onClick={search}>Search</button>
            </div>
          </div>
          <div className={`m-0 text-black position-absolute ${homeStyles.absoluteContainer}`}>
            <ul className="bg-white m-0 p-0 list-unstyled">
              {
                recommendedTeachers.map((t, key) => <li key={key} className="border-bottom" onClick={_ => redirectTo(t.id)}><p className="p-3">• {t.name}</p></li>)
              }
            </ul>
          </div>
          <p className="text-dark">
            Don&apos;t see your teacher above? <Link href="/add">Add them to our database!</Link>
          </p>
        </form>
      </section>
      <section className="position-relative bg-pink d-flex" style={{ height: '100vh', maxHeight: '800px' }}>
        <div className="position-relative h-100 w-100">
          <Image
            src="https://cdn.knowurteacher.com/photos/newspapers.jpg"
            fill={true}
            alt="Some newspapers"
            style={{ objectFit: 'cover', filter: 'grayscale(50%)' }}
            />
        </div>
        <div className="position-absolute h-100 w-100 bg-purple" style={{ opacity: '70%'}}>
        </div>
        <div className="position-absolute text-center h-100 w-100 d-flex">
          <h3 className="container mx-auto my-auto fs-1 text-white">
            &quot;Education is the passport for the future, for tomorrow belongs to those who prepare for it today.&quot;
          </h3>
        </div>
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