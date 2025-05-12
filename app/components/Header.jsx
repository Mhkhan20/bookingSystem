"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Header() {
    const [user, setUser] = useState(null);
    const adminEmail = 'q23da@unb.ca'
    const router = useRouter();
    const pathname = usePathname();   // To check current page

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

    // Define which pages should HIDE the sign out button
    const hideOnPages = ["/welcome", "/entry", "/login", "/register"];
    const shouldHideSignOut = hideOnPages.includes(pathname);
    const isAdmin = user?.email === adminEmail;
    return (
        <header className="appHeader">
            <div className="leftContent">
                <img style={{cursor:'pointer'}} onClick={() => router.push('/welcome')} src="/logo.png" alt="Logo" />
            </div>

            <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', gap:'1rem'}}> 
                 {/* Show Sign Out only when user logged in AND not on welcome/entry pages */}
            {user && !shouldHideSignOut && (
                <button
                    onClick={handleSignOut}
                    className="signoutButton"
                >
                    Sign Out
                </button>
            )}
            {isAdmin && ( 
                <button className="signoutButton" onClick={() => router.push('/admin')}> 
                    Admin 
                </button>
            )}
            </div>
           
        </header>
    );
}
