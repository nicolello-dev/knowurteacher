import Header from "@/components/header";
import TeacherSelect from "@/components/teacherSelect";
import { PrismaClient, Teacher } from "@prisma/client";

export default function ViewTeacherReviews({ teacher } : { teacher: Teacher }) {
    return (
        <>
        <Header/>
        { teacher ? <TeacherSelect teacher={teacher}/> : <h1>No teacher found. Please try again or contact support if the problem persists</h1>}
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

        console.log(teacher);

        return {
            props: {
                error: false,
                teacher
            }
        }
    } catch (error) {
        console.error(error);
        return {
            props: {
                error: true,
                teacher: null
            }
        }
    }
}