import Footer from "@/components/footer";
import Header from "@/components/header";

export default function viewNoName() {
    return (
        <>
            <Header/>
            <div className="text-center container m-5 p-5 mx-auto">
                <h1>
                    You shouldn&apos;t have landed on this URL. Please use <code>/view/[school]/[name]</code> and provide a name to view a specific teacher
                </h1>
                <p>If you believe this is an error, please send me an email at <a href="mailto:nicolamigone179%40gmail.com">nicolamigone179@gmail.com</a></p>
                <p>
                    P.S. In the future, you may be able to see all the teachers from the same school here
                </p>
            </div>
            <Footer/>
        </>
    )
}