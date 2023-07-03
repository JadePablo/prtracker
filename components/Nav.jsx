"use client";

import Link from 'next/link';
import Image from 'next/image';
import {useState,useEffect} from 'react';
import {signIn,signOut,useSession,getProviders} from 'next-auth/react';



const Nav = () => {
    const {data: session} = useSession();
    const [providers,setProviders] = useState(null);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }
        setUpProviders();
    })

  return (
    <nav>
        <Link href="/">
            <p>navbar</p>
            <Image 
            //put image src here
            alt="app logo"
            />
        </Link>

        {session?.user ?  (
            <div>
                <button type="button" onClick={signOut}>
                    sign out
                </button>
                <Link href="/profile">
                    <Image
                    src={session?.user.image}
                    width={37}
                    height={37}
                    >
                        
                    </Image>
                    <p>go to profile</p>
                </Link>
            </div>
        ) : (
            <div>
                {providers &&
                Object.values(providers).map((provider) => (
                    <button
                    type="button"
                    key={provider.name}
                    onClick={()=> signIn(provider.Id)}
                    >
                    sign in
                    </button>
                ))
                }
            </div>
        )}
    </nav>
  )
}

export default Nav