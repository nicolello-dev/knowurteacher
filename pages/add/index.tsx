import Image from "next/image";

import { useState, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useRouter } from "next/router";

export default function AddTeacher() {
    
    const [name, setName] = useState("");
    const [school, setSchool] = useState("");
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMesssage, setErrorMessage] = useState<string>("");

    const router = useRouter();

    function addTeacher() {
        if(!name || !school) {
            setErrorMessage("Please enter required fields (name and school)");
            setShowError(true);
            return;
        }
        const body = {
            name: name,
            school: school
        }
        fetch(`/api/addTeacher`, {
            method: "POST",
            body: JSON.stringify(body)
        })
            .then(r => r.json())
            .then(r => {
                if(r.success) {
                    setShowSuccess(true);
                } else {
                    setErrorMessage(r.message);
                    setShowError(true);
                }
            });
    }

    useEffect(() => {
        showSuccess && setTimeout(_ => setShowSuccess(false), 3000);
    }, [showSuccess]);

    useEffect(() => {
        showError && setTimeout(_ => setShowError(false), 3000);
    }, [showError]);
    
    return (<>
        <Header router={router}/>
        <div className="alert alert-success" role="alert" style={{ display: showSuccess ? "block" : "none" }}>
            Teacher added successfully!
        </div>
        <div className="alert alert-danger" role="alert" style={{ display: showError ? "block" : "none" }}>
            {errorMesssage}
        </div>
        <div className="hero-unit">
                <h1 className="text-center m-3">
                    Add a teacher:
                </h1>
            </div>
        <div className="card" style={{alignItems: 'center', width: 'min-content', minWidth: '270px', margin: '100px auto'}}>
            <div className="card-body">
                <Image src={"https://cdn.knowurteacher.com/defaultpfp.png"} height={200} width={200} alt={`${name}'s picture`}/>
            </div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <label className="form-label">Name:</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required={true}/>
                <label className="form-label m-2">School:</label>
                <input type="text" className="form-control" value={school} onChange={(e) => setSchool(e.target.value)} required={true}/>
                <button className="btn btn-primary m-2" onClick={_ => addTeacher()}>Add</button>
            </div>
        </div>
        <Footer/>
    </>)
}