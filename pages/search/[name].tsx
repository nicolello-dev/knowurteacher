import { useRouter } from "next/router"

import type { Teacher } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

export default function SearchByName({ teachers } : { teachers: Teacher[]}) {
    return (
        <>
            <h1>
                Still under development!
            </h1>
            <p>
                If the teacher you searched for is in our database, all their data will be shown down here:
            </p>
            {
                JSON.stringify(teachers)
            }
        </>
    )
}

export async function getServerSideProps(ctx: any) {
    const { name } = ctx.query
    const prisma = new PrismaClient();

    try {
        const teachers = await prisma.teacher.findMany({
            where: {
                name: name,
            },
        });
        return {
            props: {
                teachers
            }
        }
    } catch (error) {
        console.error(error);
        return {
            props: {
                teachers: []
            }
        }
    }
}