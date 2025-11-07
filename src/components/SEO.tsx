import * as React from "react";
import { generateDefaultSeo, generateNextSeo, type NextSeoProps, type DefaultSeoProps } from "next-seo/pages";
import Head from "next/head";

export interface Props extends NextSeoProps {
  title?: string;
  description?: string;
  image?: string;
}

const title = "SB OG Image Generator";
export const url = "";
const description = "Service that generates dynamic OG images";

// Generate OG image for itself
const image =
  "https://og.railway.app/api/image?fileType=png&layoutName=Railway&Theme=Dark&Title=Open+Graph%5CnImage+Generator&Sub+Title=og.railway.app";

const config: DefaultSeoProps = {
  title,
  description,
  openGraph: {
    type: "website",
    url,
    site_name: title,
    images: [{ url: image }],
  },
  twitter: {
    handle: "@Railway_App",
    cardType: "summary_large_image",
  },
};

export const SEO: React.FC<Props> = ({ image, ...props }) => {
  const title = props.title ?? config.title;
  const description = props.description || config.description;

  const nextSeoProps = {
    ...props,
    ...(image == null
      ? {}
      : {
          openGraph: {
            images: [{ url: image }],
          },
        })
  };

  return (
    <>
      <Head>
        {generateDefaultSeo(config)}
        {generateNextSeo(nextSeoProps)}
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
    </>
  );
};
