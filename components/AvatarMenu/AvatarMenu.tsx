import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import styles from "./AvatarMenu.module.css";

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
      {data?.user?.image && data.user.name ? (
        <button className={styles.avatarButton}>
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
        </button>
      ) : null}
      {status === "authenticated" ? (
        <>
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
