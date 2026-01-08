import { useEffect } from "react";
import { useRouter } from "next/router";

// @ts-ignore
import fetchMeta from "fetch-meta-tags";
import Head from "next/head";
import React from "react";
import { domain } from "../domain";

export async function getServerSideProps(context: any) {
  const userAgent = context.req.headers["user-agent"];
  if (userAgent?.includes("facebook")) {
    return {
      redirect: {
        permanent: false,
        destination: domain,
      },
    };
  }
  const data = await fetchMeta(domain);
  return {
    props: data,
  };
}

export default function Error({ url, title, description, icon, image }: any) {
  const router = useRouter();

  useEffect(() => {
    router.replace(url);
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        <meta name="og:image" content={image} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={icon} />
      </Head>
    </>
  );
}
