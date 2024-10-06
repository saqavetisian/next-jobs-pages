import {Html, Head, Main, NextScript} from "next/document";
import {AnimatePresence} from "framer-motion";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>
          Job search aggregator
        </title>
        <meta name="title" content="Find Your Dream Job - Job Search Aggregator"/>
        <meta name="description"
              content="Explore thousands of job listings from top companies. Our job search aggregator helps you find the perfect opportunity with ease."/>
        <meta name="keywords"
              content="job search, job aggregator, job listings, employment, career opportunities, job board, find a job, job vacancies, job hunt"/>
        <meta name="robots" content="index, follow"/>
        <meta name="author" content="Your Company Name"/>
        <meta property="og:title" content="Find Your Dream Job - Job Search Aggregator"/>
        <meta property="og:description"
              content="Explore thousands of job listings from top companies. Your dream job is just a click away!"/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={process.env.NEXT_APP_APP_URL}/>
        <meta property="og:image" content={`${process.env.NEXT_APP_APP_URL}/ogImage.jpeg`}/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="Find Your Dream Job - Job Search Aggregator"/>
        <meta name="twitter:description"
              content="Explore thousands of job listings from top companies. Your dream job is just a click away!"/>
        <meta name="twitter:image" content={`${process.env.NEXT_APP_APP_URL}/ogImage.jpeg`} />
        <link rel="icon" href={`${process.env.NEXT_APP_APP_URL}/favicon.svg`} type="image/x-icon" />
        <link rel="shortcut icon" href={`${process.env.NEXT_APP_APP_URL}/favicon.svg`} type="image/x-icon" />

      </Head>
      <body>
        <Main/>
        <AnimatePresence>
          <div id="portal-element"/>
        </AnimatePresence>
        <NextScript/>
      </body>
    </Html>
  );
}
