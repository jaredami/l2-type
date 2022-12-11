import { PrismaClient } from "@prisma/client";
import { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useEffect } from "react";
import StatsPanel from "../components/StatsPanel/StatsPanel";
import { useStatsContext } from "../contexts/StatsContext";

export default function Stats(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const stats = useStatsContext();

  useEffect(() => {
    if (!stats) return;
    stats.setLessons(props.lessons);
  }, [stats, props.lessons]);

  return (
    <>
      <Head>
        <title>Stats - L2Type</title>
      </Head>
      <h1>Stats</h1>
      <StatsPanel />
    </>
  );
}

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const lessons = await prisma.lesson.findMany();
  return {
    props: { lessons: JSON.parse(JSON.stringify(lessons)) },
  };
}
