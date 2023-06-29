import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (<>
    <header className="p-3" style={{ backgroundColor: 'black' }}>
        <Link href="/" className="d-flex text-decoration-none" style={{ color: '#DEC9E9' }}>
            <h3 className="p4">
                Knowurteacher
            </h3>
            <div className="position-relative" style={{ height: '32px', aspectRatio: '1/1' }}>
                <Image src='https://cdn.knowurteacher.com/logo.svg' alt='logo' fill={true}/>
            </div>
        </Link>
    </header>
    </>)
}