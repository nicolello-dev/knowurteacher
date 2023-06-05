import { useRouter } from "next/router"
import { useState } from "react";
import styles from "./HomeStyles.module.css"
import Image from "next/legacy/image";
import Head from "next/head";

export default function Home() {
    const router = useRouter();
    const [name, setName] = useState<string>("");

    function search(e: any) {
        e.preventDefault();
        if(name.trim() == "") {
            alert("Name must not be empty!");
            return;
        }
        router.push(`/search/${name}`);
    }

    return (
    <>
    <Head>
        <title>Know ur teacher - home</title>
    </Head>
        <header className={styles.header}>
            <h1>People Search</h1>
            <form className={styles.search_form} action="#">
            <input type="text" className={styles.search_input} value={name} onChange={(e:any) => setName(e.target.value)} placeholder="Search your teacher..." />
            <button type="submit" onClick={(e: any) => search(e)}>Search</button>
            </form>
        </header>
        <main className={styles.main}>
            <section className={styles.service_description}>
                <img className={styles.service_image} src='/photos/teacherWithStudent.jpg' alt="A teacher with her student"/>
                <div>
                    <h2>
                        What is this for?
                    </h2>
                    <p>
                        <a href="https://knowurteacher.com">knowurteacher.com</a> is a service to get to know how to better prepare your essays and speeches for your teachers.
                        <br/>
                        For example, you might want to know if your teacher prefers you to use very precise terminology,
                        if they would like you to space as much as possible starting from their question,
                        or if they would prefer an interview-like exam, with short and concise answers.
                    </p>
                </div>
            </section>
        </main>
        <footer className={styles.footer}>
            <p>Made with &lt;3 by Ilaria. This website is <a href="https://github.com/ilariiiiia/knowurteacher">open source</a></p>
        </footer>
    </>
  )
}