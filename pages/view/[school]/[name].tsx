// COMPONENTS
// Shared
import Header from "@/components/header";
import Footer from "@/components/footer";
// Teacher-specific
import TeacherProfilePreview from "@/components/view/TeacherProfilePreview";
import ShowReviews from "@/components/view/ShowReviews";
import NewReview from "@/components/view/NewReview";

// TYPES
import type { APIResponse } from "@/types/api"
import type { Review, Teacher } from "@prisma/client";

// REACT
import { useEffect, useState } from "react";

// NEXTJS
import { useRouter } from "next/router";
import Head from "next/head";

export default function ViewTeacherReviews() {

    const [teacher, setTeacher] = useState<Teacher | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

    const router = useRouter();
    const { name, school } = router.query;
    
    useEffect(() => {
        name && school && fetch(`/api/teacher/find?name=${name}&school=${school}`)
            .then(r => r.json())
            .then((t: APIResponse<Teacher>) => {
				setLoading(false);
                if(!t.success) {
                    console.error("An error occurred trying to get teacher information!", t.message);
                    return;
                }
				setTeacher(t.data);
			});
    }, [name, school])

	if(loading) {
		return <>
			<Header/>
			<Head>
				<title>View teacher | Knowurteacher</title>
			</Head>
			<h1 className="mx-auto text-center text-xl p-5">Loading data, please wait...</h1>
		</>
	}

    if(!teacher) {
        return <>
            <Head>
                <title>View teacher | Knowurteacher</title>
            </Head>
            <Header/>
            <h1 className="mx-auto text-center text-3xl p-5">
                The teacher you tried to search for doesn&apos;t exist.
            </h1>
            <p className="mx-auto text-center text-xl p-5">
                If you believe this is an error, please contact support.
            </p>
        </>
    }

    return (
        <>
			<Head>
				<title>View teacher | Knowurteacher</title>
			</Head>
	        <Header/>
            <TeacherProfilePreview teacher={teacher} button={false}/>
            <NewReview teacherId={teacher.id}/>
            <ShowReviews teacherId={teacher.id}/>
	        <Footer/>
        </>
    );
}