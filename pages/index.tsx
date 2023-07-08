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
      <Header router={router}/>
      <section className="bg-pink position-relative m-0">
        <div>
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className={homeStyles.shapeFillBlack}></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className={homeStyles.shapeFillBlack}></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className={homeStyles.shapeFillBlack}></path>
          </svg>
        </div>
        <div className="container text-black p-3">
          <h1 className="p-4">
            Empower your education
          </h1>
          <h5 className="p-3">
          Get to know your teachers before class by rating 0-10 on various aspects of their teaching seeing other&apos;s ratings!
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
                  recommendedTeachers.map((t, key) => <li key={key} onClick={_ => redirectTo(t)}>
                    <div className="p-3">
                      <p className="m-0">{t.name} </p>
                      <p className="m-0 text-muted">{t.school}</p>
                    </div>
                  </li>)
                }
              </ul>
            </div>
            <p className="text-dark">
              Don&apos;t see your teacher above? <Link href="/add">Add them to our database!</Link>
            </p>
          </form>
        </div>
      </section>
      <section className="position-relative bg-pink d-flex" style={{ height: '100vh', maxHeight: '800px' }}>
        <div className={homeStyles.curveTop} style={{ zIndex: '1' }}>
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z" className={homeStyles.shapeFillPink}></path>
          </svg>
        </div>
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
        <div className="d-flex flex-wrap justify-content-around" style={{ marginTop: '50px' }}>
          <div className={homeStyles.faqdiv}>
            <h5 className="text-white">
              How do I rate a teacher?
            </h5>
            <p>
              Simply search the name of your teacher, then leave a review based on your experiences with them.
            </p>
          </div>
          <div className={homeStyles.faqdiv}>
            <h5 className="text-white">
              Are my reviews anonymous?
            </h5>
            <p>
              Yes! Nobody can see who wrote a specific review, except for us.
            </p>
          </div>

          <div className={homeStyles.faqdiv}>
            <h5 className="text-white">
              How can I report reviews?
            </h5>
            <p>
              Hover over a review and click on the three buttons. There will be a &quot;Report&quot; button that will guide you through a report submission.
            </p>
          </div>
          <div className={homeStyles.faqdiv}>
            <h5 className="text-white">
              Are reviews filtered?
            </h5>
            <p>
              We want the reviews to be purely professional and not personal. We might remove or edit reviews without disclosure for such reasons.
            </p>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  )
}
