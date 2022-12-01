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
          <div className={styles.userInfo}>
            {data?.user?.image && data.user.name ? (
              <Image
                src={data.user.image}
                alt={data.user.name}
                width={70}
                height={70}
                style={{
                  borderRadius: "50%",
                }}
              />
            ) : null}
            <span className={styles.name}>{data?.user?.name}</span>
            <span className={styles.email}>{data?.user?.email}</span>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
      {status === "unauthenticated" && (
        <button className={styles.signInBtn} onClick={handleSignIn}>
          Sign In
        </button>
      )}
    </>
  );
}
