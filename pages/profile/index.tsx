import Footer from "@/components/footer";
import Header from "@/components/header";
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from "next/image";
import { useState, useEffect } from "react";

export default function ViewProfile() {
    const { data: session } = useSession();

    const [userId, setUserId] = useState({
        data: undefined,
        loading: true,
        copied: false
    });

    useEffect(() => {
        fetch(`/api/user/getId?email=${session?.user?.email}`)
            .then(r => r.json())
            .then(r => {
                setUserId((p) => {
                    return {
                        loading: false,
                        data: r?.id,
                        copied: p.copied
                    }
                })
            })
            .catch(err => {
                console.error(err);
            })
    }, [session]);

    useEffect(() => {
        userId.copied && setTimeout(() => {
            setUserId((p) => { return {
                ...p,
                copied: false
            }});
        }, 2000)
    }, [userId.copied]);

    if(!session) {
        return <>
            <Header/>
            <h1 className="container max-w-lg text-3xl text-center mx-auto my-32">
                It seems like you haven't logged in. Please try reloading the page or logging back in.
            </h1>
            <Footer/>
        </>
    }

    return (
        <>
            <Header/>
            <h1 className="text-2xl text-center m-6 mt-0">
                Your profile:
            </h1>
            <section className="flex flex-col bg-white dark:bg-black mx-auto p-6 rounded-xl container my-6 max-w-lg">
                <Image height={128} width={128} src={session?.user?.image || ""} alt="Your profile picture" className="mx-auto my-12"/>
                <p>Email: {' '} <span className="font-bold">{session?.user?.email}</span></p>
                <p>Name: {' '} <span className="font-bold">{session?.user?.name}</span></p>
                <p>Your user id: {' '}
                <span className="font-bold">{userId.loading ? "Loading..." : userId.data || "An error occurred and we cannot determine your user id"}</span>
                <span onClick={_ => {
                    navigator.clipboard.writeText(userId.data || "");
                    setUserId({...userId, copied: true});
                }}>
                    {
                        userId.copied ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className="inline ml-2"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="inline ml-2">
                            <path d="M3.5 2a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5H12a.5.5 0 0 1 0-1h.5A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1H4a.5.5 0 0 1 0 1h-.5Z"/>
                            <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5Z"/>    
                        </svg>
                    }
                </span>
                </p>
                <button className="p-6 text-xl background-primary dark:background-primarydark" onClick={() => signOut()}>
                    Sign out
                </button>
            </section>
            <Footer/>
        </>
    )
}