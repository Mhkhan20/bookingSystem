"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
export default function Header() {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const pathname = usePathname(); 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => router.push("/login"))
            .catch((error) => alert("Sign out error:", error));
    };

    const hideOnPages = ["/welcome", "/entry", "/login", "/register", "/cancel"];


    const shouldHideSignOut = hideOnPages.includes(pathname);

    return (
        <header className="appHeader">
            <div className="leftContent">
             <img style={{cursor:'pointer'}} onClick={() => router.push('/welcome')} src="/logo.png" alt="Logo" />           
             
            </div>

            <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', gap:'1rem'}}> 
            {user && !shouldHideSignOut && (
                <button
                    onClick={handleSignOut}
                    className="signoutButton"
                >
                    Sign Out
                </button>
            )}

            
            </div>
           
        </header>
    );
}
