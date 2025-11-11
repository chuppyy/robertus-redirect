// @ts-ignore
import fetchMeta from "fetch-meta-tags";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { domain } from "../domain";

export async function getServerSideProps(context: any) {
  const userAgent = context.req.headers["user-agent"];
  if (!userAgent?.includes("facebook")) {
    return {
      redirect: {
        permanent: false,
        destination: domain + "/" + context.params.slug.slice(1),
      },
    };
  }
      const slug = context.params?.slug;
    const {data} = await fetch(`${process.env.APP_API}/News/news-detailbasic?id=${slug?.slice(slug?.lastIndexOf("-") + 1)}`).then((res) => res.json());

  return {
    props: data,
  };
}

export default function App({ name, avatarLink }: any) {

  return (
    <>
      <Head>       
      <title>{name}</title>
        <meta name="og:title" content={name} />
        <meta name="og:description" content={name} />
        <meta name="og:image" content={avatarLink} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
    </>
  );
}
