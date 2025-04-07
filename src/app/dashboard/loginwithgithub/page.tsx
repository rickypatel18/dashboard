"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const { data: session } = useSession();

  return (
    <header className="px-5 py-3 bg-white shadow-sm">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <h2 className="text-black">LOGO</h2>
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session?.user ? (
            <>
              <button
                onClick={() => signOut({ redirect: false })}
                className="cursor-pointer"
              >
                Logout
              </button>
              <div className="flex items-center gap-2 text-sm text-blue-500">
                {session.user.image && (
                  <Image
                    src={session.user.image}
                    alt="avatar"
                    width={100}
                    height={100}
                    priority
                    className="w-6 h-6 rounded-full object-cover"
                  />
                )}
                <span>{session.user.name || "User"}</span>
              </div>
            </>
          ) : (
            <button
              onClick={() => signIn("github", { redirect: false })}
              className="cursor-pointer"
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Page;
