/**
 * Pinecone Vector Database Client
 * 
 * LEARNING: Vector databases store embeddings and let you
 * search by similarity instead of exact matches
 * 
 * Traditional DB: "Find emails with subject = 'Meeting'"
 * Vector DB: "Find emails similar to 'project discussion'"
 */
import { Pinecone } from "@pinecone-database/pinecone";
import { chatStream } from "@pinecone-database/pinecone/dist/assistant/data/chatStream";
import { configDotenv } from "dotenv";

configDotenv();

const INDEX_NAME = 'gmail-emails';

let pineconeClient = null;
let index = null;

/**
 * Initialize Pinecone connection
 * 
 * LEARNING: This sets up connection to your vector database
 * You only need to do this once per script run
 */

export async function initializePinecone() {
    if (pineconeClient) {
        return { client: pineconeClient, index };
    }
    console.log('Connecting to Pinecone...');

    pineconeClient = new Pinecone({
        apiKey: process.env.PINECONE_APPI_KEY
    });

    //Check if the index exists
    const indexList = await pineconeClient.listIndexes();
    const indexExists = indexList.indexes?.some(idx => idx.name === INDEX_NAME);

    if (!indexExists) {
        console.log(`Creating a new Index: ${INDEX_NAME}...`);

        await pineconeClient.createIndex({
            name: INDEX_NAME,
            dimension: 1536, // OpenAI embedding size
            metric: 'cosine', // Measures similarity between vectors
            spec: {
                serverless: {
                    cloud: 'aws',
                    region: 'us-east-1'
                }
            }
        });
        console.log('Waiting for the idx to be ready...');
        await new Promise(resolve => setTimeout(resolve, 60000));
    }

    index = pineconeClient.index(INDEX_NAME);
    console.log(`Pinecone connected!\n`);

    return { client: pineconeClient, index };
}

/**
 * Upsert (insert or update) emails into Pinecone
 * 
 * LEARNING: "Upsert" = Update if exists, Insert if new
 * We send vectors with metadata to Pinecone
 * 
 * @param {Array} embeddedEmails - Array of {id, values, metadata}
 */
export async function upsertEmails(embeddedEmails) {
    const { index } = await initializePinecone();

    console.log(`Uploading ${embeddedEmails.length} emails to Pinecone...`);

    const batchSize = 100;
    for(let i = 0; i < embeddedEmails.length; i = i + batchSize){
        const batch = embeddedEmails.slice(i, i + batchSize);
        await index.upsert(batch);
    }
}