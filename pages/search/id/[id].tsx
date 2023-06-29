import TeacherSelect from "@/components/teacherSelect";
import type { Teacher } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import ss from "@/styles/Search.module.css";

export default function SearchByName({ teacher } : { teacher: Teacher}) {
    return (
        <>
            <Head>
                <title>Knowurteacher | teacher</title>
            </Head>
            <header className={ss.header}>
                <Link href="/">
                    <h3>
                        Knowurteacher
                    </h3>
                    <div>
                        <Image src='https://cdn.knowurteacher.com/logo.svg' alt='logo' fill={true}/>
                    </div>
                </Link>
            </header>
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