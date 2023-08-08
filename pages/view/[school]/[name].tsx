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
	const [loading, setLoading] = useState<bool>(true);

    const router = useRouter();
    const { name, school } = router.query;
    
    useEffect(() => {
        name && school && fetch(`/api/getTeacher?name=${name}&school=${school}`)
            .then(r => r.json())
            .then(t => {
				setLoading(false);
				setTeacher(t);
			});
    }, [name, school]);

    useEffect(() => {
        teacher && fetch(`/api/getTeacherReviews?teacherID=${teacher?.id}`)
            .then(r => r.json())
            .then(r => {
				setReviews(r);
			});
    }, [teacher]);

    useEffect(() => {
        showSuccess && setTimeout(_ => setShowSuccess(false), 3000);
    }, [showSuccess]);

    useEffect(() => {
        showError && setTimeout(_ => setShowError(false), 3000);
    }, [showError]);

	if(loading) {
		return <>
			<Header/>
			<h1 className="mx-auto text-center text-xl p-5">Loading, please wait...</h1>
		</>
	}

    if(!teacher) {
        return (
            <>
            <Header/>
			<h1 className="mx-auto text-center text-3xl p-5">
				The teacher you tried to search for doesn&apos;t exist.
			</h1>
			<p className="mx-auto text-center text-xl p-5">
				If you believe this is an error, please contact support.
			</p>
            </>
        )
    }

    return (
        <>
        <Header/>
        <div className="relative px-3 py-3 mb-4 border rounded bg-green-200 border-green-300 text-green-800" role="alert" style={{ display: showSuccess ? "block" : "none" }}>
            Review added successfully!
        </div>
        <div className="relative px-3 py-3 mb-4 border rounded bg-red-200 border-red-300 text-red-800" role="alert" style={{ display: showError ? "block" : "none" }}>
            {errorMesssage}
        </div>
        <div className="flex flex-wrap justify-center items-center m-12">
            <TeacherSelect teacher={teacher} button={false}/>
            <div className="flex m-6">
                <ShowAvgReview reviews={reviews}/>
            </div>
        </div>
        <div className="text-center">
            <h3 className="m-6 mb-4">
                Do you know them? Rate them yourself!
            </h3>
            <RateTeacher teacher={teacher} session={session} setError={setErrorMessage} setShowSuccess={setShowSuccess} setShowError={setShowError} setReviews={setReviews}/>
        </div>
        <Footer/>
        </>
    )
}

// TODO: Change it so that instead of getting all the reviews, it only gives the average rating for each