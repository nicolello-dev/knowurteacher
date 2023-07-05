import Header from "@/components/header";
import TeacherSelect from "@/components/teacherSelect";
import { ShowAvgReview, RateTeacher } from "@/components/showReview";

import { Review, Teacher } from "@prisma/client";

import { useSession } from 'next-auth/react';
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ViewTeacherReviews() {

    const { data: session } = useSession();
    const [teacher, setTeacher] = useState<Teacher | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMesssage, setErrorMessage] = useState<string>("");

    const router = useRouter();
    const { name, school } = router.query;
    
    useEffect(() => {
        fetch(`/api/getTeacher?name=${name}&school=${school}`)
            .then(r => r.json())
            .then(t => setTeacher(t));
    }, [name, school]);

    useEffect(() => {
        teacher && fetch(`/api/getTeacherReviews?teacherID=${teacher?.id}`)
            .then(r => r.json())
            .then(r => setReviews(r));
    }, [teacher]);

    useEffect(() => {
        showSuccess && setTimeout(_ => setShowSuccess(false), 3000);
    }, [showSuccess]);

    useEffect(() => {
        showError && setTimeout(_ => setShowError(false), 3000);
    }, [showError]);

    if(!teacher) {
        return (
            <>
            <Header/>
            <h1>No teacher found. Please try again or contact support if the problem persists</h1>
            </>
        )
    }

    return (
        <>
        <Header/>
        <div className="alert alert-success" role="alert" style={{ display: showSuccess ? "block" : "none" }}>
            Teacher added successfully!
        </div>
        <div className="alert alert-danger" role="alert" style={{ display: showError ? "block" : "none" }}>
            {errorMesssage}
        </div>
        <div className="d-flex flex-wrap justify-content-center m-5">
            <TeacherSelect teacher={teacher} button={false}/>
            <div className="d-flex m-3">
                <ShowAvgReview reviews={reviews}/>
            </div>
        </div>
        <div className="text-center">
            <h3>
                Do you know them? Rate them yourself!
            </h3>
            <RateTeacher teacher={teacher} session={session} setError={setErrorMessage} setShowSuccess={setShowSuccess} setShowError={setShowError}/>
        </div>
        <Footer/>
        </>
    )
}

// TODO: Change it so that instead of getting all the reviews, it only gives the average rating for each