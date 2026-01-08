import Head from "next/head";
import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";

// ISR: Pre-render pages at build time and revalidate every hour
// This drastically reduces serverless function invocations
export const getStaticPaths: GetStaticPaths = async () => {
  // Return empty paths - pages will be generated on-demand (fallback: blocking)
  return {
    paths: [],
    fallback: 'blocking', // Generate pages on first request, then cache
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const slug = context.params?.slug as string;

    // Extract ID from slug (format: p-title-123)
    const id = slug?.slice(slug?.lastIndexOf("-") + 1);

    const response = await fetch(
      `${process.env.APP_API}/News/news-detailbasic?id=${id}`,
      {
        headers: {
          'User-Agent': 'facebookexternalhit/1.1', // Pretend to be Facebook crawler
        },
      }
    );

    if (!response.ok) {
      return { notFound: true };
    }

    const { data } = await response.json();

    return {
      props: data || { name: '', avatarLink: '' },
      revalidate: 36000, // Revalidate every 1 hour (3600 seconds)
    };
  } catch (error) {
    console.error('Error fetching news detail:', error);
    return {
      props: { name: '', avatarLink: '' },
      revalidate: 60, // Retry after 1 minute on error
    };
  }
};

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
