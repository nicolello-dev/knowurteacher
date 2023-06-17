import { useRouter } from "next/router"
import { useState } from "react";
import styles from "./HomeStyles.module.css"
import Image from "next/legacy/image";
import Head from "next/head";

export default function Home() {
    const loggedIn = false;
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
      <header className="bg-primary text-white text-center py-5">
        <h1 className="display-4">knowurteacher.com</h1>
        <p className="md-4">Fine tune your studying technique and study less for a better grade, based on your teacher</p>
      </header>

      <main className="container mt-5">
        <h2 className="text-center mb-4">
            Search your teacher
        </h2>
        <div className="input-group mb-3">
        <input type="text" className="form-control" aria-label="" aria-describedby="basic-addon1" placeholder="ex: John Doe"/>
        <div className="input-group-prepend">
            <button className="btn btn-outline-secondary" type="button">Search</button>
        </div>
        </div>
        <h2 className="text-center mb-4">More content!</h2>

        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img src="content1.jpg" className="card-img" alt="Content 1" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Study Guides</h5>
                <p className="card-text">Access comprehensive study guides for a wide range of subjects.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img src="content2.jpg" className="card-img" alt="Content 2" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Practice Exams</h5>
                <p className="card-text">Take practice exams to test your knowledge and improve your performance.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img src="content3.jpg" className="card-img" alt="Content 3" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Video Tutorials</h5>
                <p className="card-text">Watch video tutorials to grasp complex concepts in an engaging way.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-dark text-white text-center py-3 mt-5">
        <p>Made with &lt;3 by <a href="https://github.com/ilariiiiia" target="_blank">Ilaria</a></p>
        <p>We&apos;re open source! Check out the repo or help <a href="https://github.com/ilariiiiia/knowurteacher" target="_blank">here</a></p>
      </footer>
    </>
  )
}