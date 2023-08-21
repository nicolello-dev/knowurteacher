// Next
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react"
// NextAuth
import { useSession, signIn, signOut } from 'next-auth/react';
// Styling
import homeStyles from "@/styles/HomeStyles.module.css";

export default function Header() {
    const { data: session } = useSession();
    const [showLabel, setShowLabel] = useState<boolean>(true);
    // Hide label after three seconds
    useEffect(() => {
        showLabel && setTimeout(() => {
            setShowLabel(false);
        }, 3000)
    }, [showLabel]);

    return (<>
        <header className="bg-white p-6 flex flex-row justify-between flex-wrap">
            <Link href="/" className="flex text-decoration-none text-primary items-center">
                <h1 className="text-xl hidden mr-2 sm:block">
                    Knowurteacher
                </h1>
                <div className="relative h-8 aspect-square">
                    <Image src='https://cdn.knowurteacher.com/logo.svg' alt='logo' fill={true}/>
                </div>
            </Link>
            <div className="flex flex-row text-white items-center font-sans">
            {
                session ? <>
                    <button className="inline-block align-middle text-center select-none font-normal whitespace-no-wrap py-1 px-3 leading-normal no-underline text-black" onClick={() => signOut()}>Log Out</button>
                </> : <>
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 186.69 190.5"><g transform="translate(1184.583 765.171)"><path clipPath="none" mask="none" d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z" fill="#4285f4"/><path clipPath="none" mask="none" d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z" fill="#34a853"/><path clipPath="none" mask="none" d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z" fill="#fbbc05"/><path d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z" fill="#ea4335" clipPath="none" mask="none"/></g></svg>
                    <button className="inline-block align-middle text-center select-none font-normal whitespace-no-wrap py-1 px-3 leading-normal no-underline text-black" onClick={() => signIn('google')}>Log In</button>
                </>
            }
            </div>
        </header>
		<div>
		  <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
			<path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-white"></path>
			<path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-white"></path>
			<path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-white"></path>
		  </svg>
	    </div>
        </>)
}