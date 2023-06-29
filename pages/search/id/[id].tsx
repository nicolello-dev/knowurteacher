import TeacherSelect from "@/components/teacherSelect";
import type { Teacher } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import Head from "next/head";

export default function SearchByName({ teacher } : { teacher: Teacher}) {
    return (
        <>
            <Head>
                <title>Knowurteacher | teacher</title>
            </Head>
            <TeacherSelect teacher={teacher}/>
        </>
    )
}

export async function getServerSideProps(ctx: any) {
    const { id } = ctx.query
    const prisma = new PrismaClient();
    try {
        const teacher = await prisma.teacher.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        return {
            props: {
                teacher
            }
        }
    } catch (error) {
        console.error(error);
        return {
            props: {
                teacher: undefined
            }
        }
    }
}