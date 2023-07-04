import Link from "next/link";

export default function Footer() {
    return (
        <>
            <footer className="p-4 text-white text-center bg-dark-purple d-flex justify-content-evenly">
                <div className="d-flex flex-column align-items-center m-3">
                    <h5>
                        Legal
                    </h5>
                    <ul className="p-0 m-0">
                        <li>
                            <Link href="/legal/privacy-policy">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link href="/legal/terms-of-service">Terms Of Service</Link>
                        </li>
                    </ul>
                </div>
                <div className="d-flex flex-column align-items-center m-3">
                    <h5>
                        Info
                    </h5>
                    <ul className="p-0 m-0">
                        <li>
                            <Link href="/legal/privacy-policy">About</Link>
                        </li>
                        <li>
                            <Link href="/legal/terms-of-service">Extended FAQ</Link>
                        </li>
                    </ul>
                </div>
                <div className="d-flex flex-column align-items-center m-3">
                    <h5>
                        Complaints
                    </h5>
                    <ul className="p-0 m-0">
                        <li>
                            <Link href="/complaints">Send a message</Link>
                        </li>
                        <li>
                            <Link href="/report">Report</Link>
                        </li>
                    </ul>
                </div>
            </footer>
        </>
    )
}