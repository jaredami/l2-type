import { InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import SettingsControls from "../components/SettingsControls/SettingsControls";
import { getUserSettingsWithDefaults } from "../lib/utils";

export default function Settings(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    props.settings && (
      <>
        <Head>
          <title>Settings - L2Type</title>
        </Head>
        <SettingsControls settings={props.settings} />
      </>
    )
  );
}

export async function getServerSideProps() {
  try {
    const session = await getSession();
    const userId = session?.user?.id;
    const settings = await getUserSettingsWithDefaults(userId);

    return {
      props: { settings },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { settings: null },
    };
  }
}
