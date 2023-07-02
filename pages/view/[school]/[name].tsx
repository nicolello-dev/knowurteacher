import Header from "@/components/header";
import TeacherSelect from "@/components/teacherSelect";
import { ShowAvgReview, RateTeacher } from "@/components/showReview";

import { PrismaClient, Review, Teacher } from "@prisma/client";

import { useSession } from 'next-auth/react';

export default function ViewTeacherReviews({ teacher, reviews } : { teacher: Teacher, reviews: Review[] }) {

    const { data: session } = useSession();

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
        </>
    )
}

export async function getServerSideProps(ctx: any) {
    let { name, school } = ctx.query;

    const prisma = new PrismaClient();

    if(school == undefined) {
        school = null
    }

    let whereClause;

    if(!school) {
        whereClause = {
            name: {
                equals: name
            },
            school: {
                equals: school
            }
        }
    } else {
        whereClause = {
            name: {
                equals: name
            }
        }
    }

    try {
        const teacher = await prisma.teacher.findFirstOrThrow({
            where: whereClause
        });

        const reviews = await prisma.review.findMany({
            where: {
                teacherID: teacher.id
            }
        })

        return {
            props: {
                error: false,
                teacher,
                reviews
            }
        }
    } catch (error) {
        console.error(error);
        return {
            props: {
                error: true,
                teacher: null,
                reviews: []
            }
        }
    }
}

// TODO: Change it so that instead of getting all the reviews, it only gives the average rating for each