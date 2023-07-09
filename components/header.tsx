// Next
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react"
// NextAuth
import { useSession, signIn, signOut } from 'next-auth/react';
import { NextRouter } from "next/router";

export default function Header(props: {router?: NextRouter}) {
    const success = props.router?.query.success || false;
    console.log(props.router?.pathname);
    const asPath = props.router?.pathname;
    const { data: session } = useSession();
    const [showLabel, setShowLabel] = useState<boolean>(true);
    // Hide label after three seconds
    useEffect(() => {
        showLabel && setTimeout(() => {
            setShowLabel(false);
        }, 3000)
    }, [showLabel]);

    return (<>
        <header className="p-3 d-flex flex-row justify-content-between flex-wrap" style={{ backgroundColor: 'black' }}>
            <Link href="/" className="d-flex text-decoration-none" style={{ color: '#DEC9E9' }}>
                <h3 className="p4">
                    Knowurteacher
                </h3>
                <div className="position-relative" style={{ height: '32px', aspectRatio: '1/1' }}>
                    <Image src='https://cdn.knowurteacher.com/logo.svg' alt='logo' fill={true}/>
                </div>
            </Link>
            <div className="d-flex flex-row text-white align-items-center me-0">
            {
                session ? <>
                    <button className="btn btn-primary" onClick={() => signOut()}>Log Out</button>
                </> : <>
                    <button className="btn btn-primary" onClick={() => {signIn(); setShowLabel(true)}}>Log In</button>
                </>
            }
            </div>
        </header>
        {
            success && session && showLabel && <div className="alert alert-success m-0" role="alert">
                <p className="m-0">Successfully logged in as {session?.user?.name}</p>
            </div>
        }
        </>)
}