export default function Footer() {
    return (
        <>
            <footer className="p-4 text-white text-center bg-dark-purple d-flex">
                <div>
                    <h5>
                        Legal
                    </h5>
                    <ul>
                        <li>
                            <a href="/legal/privacy-policy">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="/legal/terms-of-service">Terms Of Service</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h5>
                        Info
                    </h5>
                    <ul>
                        <li>
                            <a href="/legal/privacy-policy">About</a>
                        </li>
                        <li>
                            <a href="/legal/terms-of-service">Extended FAQ</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h5>
                        Complaints
                    </h5>
                    <ul>
                        <li>
                            <a href="/complaints">Send a message</a>
                        </li>
                        <li>
                            <a href="/report">Report</a>
                        </li>
                    </ul>
                </div>
            </footer>
        </>
    )
}