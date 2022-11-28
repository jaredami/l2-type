import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function AvatarMenu() {
  const { data, status } = useSession();

  const handleSignIn = async () => {
    await signIn("github", {
      callbackUrl: "http://localhost:3000/practice",
    });
  };

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "http://localhost:3000/",
    });
  };

  return (
    <>
      {status === "authenticated" ? (
        <>
          {data.user?.image && data.user.name ? (
            <div
              style={{
                right: "4rem",
                position: "absolute",
              }}
            >
              <Image
                src={data.user.image}
                alt={data.user.name}
                width={50}
                height={50}
                style={{
                  borderRadius: "50%",
                  right: 0,
                  position: "absolute",
                }}
              />
            </div>
          ) : null}
          <button
            style={{
              right: 0,
              position: "absolute",
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      ) : (
        <button
          style={{
            right: 0,
            position: "absolute",
          }}
          onClick={handleSignIn}
        >
          Sign In
        </button>
      )}
    </>
  );
}
