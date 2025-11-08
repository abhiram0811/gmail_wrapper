// import { createOAuth2Client, getAuthUrl } from "./auth.js";

// console.log('Step 1: Creating client');
// const client = createOAuth2Client();
// console.log('Client created', client.universeDomain);

// const url = getAuthUrl(client);
// console.log('AuthURL:', url);

// const startOfDay = new Date();
// startOfDay.setHours(0, 0, 0, 0);
// console.log(startOfDay);
// const year = startOfDay.getFullYear();
// console.log(year);
import fs from 'fs';
import { parse } from "json2csv";
import fetch from 'node-fetch';


const url = `https://api.massive.com/v2/reference/news?published_utc.gte=2025-04-02&published_utc.lte=2025-04-09&order=desc&limit=10&sort=published_utc&apiKey=fKXaE_6Zebmprkdmsu9CLuestKcWuBw6`;

async function getAppleNewsCsv() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    const records = data.results.map(item => ({
        published_utc: item.published_utc,
        name: item.publisher.name,
        title: item.title,
        description: item.description,
        article_url: item.article_url,
        sentiment: item.insights[0].sentiment,
        sentiment_reasioning: item.insights[0].sentiment_reasoning
    }));
    console.log(records);
  } catch (error) {
    console.error("Error saving to csv", error);
  }
}

getAppleNewsCsv();
