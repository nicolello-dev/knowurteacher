import Header from "@/components/header";
import TeacherSelect from "@/components/teacherSelect";
import { ShowAvgReview, RateTeacher } from "@/components/showReview";

import { PrismaClient, Review, Teacher } from "@prisma/client";

import { useSession } from 'next-auth/react';
import Footer from "@/components/footer";
import { useEffect, useState } from "react";

export default function ViewTeacherReviews({ name, school } : { name: string, school: string }) {

    const { data: session } = useSession();
    const [teacher, setTeacher] = useState<Teacher | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        fetch(`/api/getTeacher?name=${name}&school=${school}`)
            .then(r => r.json())
            .then(t => setTeacher(t));
    }, []);

    useEffect(() => {
        teacher && fetch(`/api/getTeacherReviews?teacherID=${teacher?.id}`)
            .then(r => r.json())
            .then(r => setReviews(r));
    }, [teacher]);

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
            <RateTeacher teacher={teacher} session={session}/>
        </div>
        <Footer/>
        </>
    )
}

export async function getServerSideProps(ctx: any) {
    let { name, school } = ctx.query;

    return {
        props: {
            name, school
        }
    }
}

// TODO: Change it so that instead of getting all the reviews, it only gives the average rating for each