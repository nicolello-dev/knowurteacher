// Next
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react"
// NextAuth
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Header() {

    const { data: session } = useSession();

    const [showLabel, setShowLabel] = useState<boolean>(!!session);

    // Hide label after three seconds
    useEffect(() => {
        showLabel && setTimeout(() => {
            setShowLabel(false);
        }, 3000)
    }), [showLabel];

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
    </>)
}