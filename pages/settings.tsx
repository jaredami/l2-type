import { PrismaClient } from "@prisma/client";
import { InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import SettingsControls from "../components/SettingsControls/SettingsControls";

export default function Settings(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    props.settings && (
      <>
        <Head>
          <title>Settings - L2Type</title>
        </Head>
        <h1>Settings</h1>
        <SettingsControls settings={props.settings} />
      </>
    )
  );
}

const prisma = new PrismaClient();

export async function getServerSideProps() {
  let settings;
  try {
    const session = await getSession();

    settings = await prisma.settings.findFirst({
      where: {
        user: {
          id: session?.user.id,
        },
      },
    });
  } catch (error) {
    console.error(error);
  }

  return {
    props: { settings: settings },
  };
}
