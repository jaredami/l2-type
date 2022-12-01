import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import styles from "./AvatarMenu.module.css";

export default function AvatarMenu() {
  const { data, status } = useSession();
  const [displayMenu, setDisplayMenu] = useState(false);

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
        <button
          className={styles.avatarButton}
          onClick={() => setDisplayMenu(!displayMenu)}
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
        </button>
      ) : null}
      {displayMenu && (
        <div className={styles.avatarMenu}>
          {data?.user?.image && data.user.name ? (
            <Image
              src={data.user.image}
              alt={data.user.name}
              width={50}
              height={50}
              style={{
                borderRadius: "50%",
              }}
            />
          ) : null}
          <p>{data?.user?.name}</p>
          <p>{data?.user?.email}</p>
          {status === "authenticated" ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={handleSignIn}>Sign In</button>
          )}
        </div>
      )}
    </>
  );
}
