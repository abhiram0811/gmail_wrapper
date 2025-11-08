/**
 * PRACTICE CHALLENGE: Write these functions from scratch
 * 
 * Don't look at auth.js - try to implement based on requirements!
 */

import fs from 'fs/promises';
import path from 'path';

// Challenge 1: Write an async function that reads a JSON file
// If file doesn't exist, return a default object: { count: 0 }
export async function readConfig(filepath) {
  try {
   
  } catch (error) {
    console.error('Error:', error)
  }
}

// Challenge 2: Write an async function that increments the count
// and saves it back to the file
export async function incrementAndSave(filepath) {
  // YOUR CODE HERE
  // Hint: Use readConfig(), modify the object, then write it back
}

// Challenge 3: Write a function that does multiple operations in parallel
// It should read 3 different files simultaneously using Promise.all()
export async function readMultipleFiles(file1, file2, file3) {
  // YOUR CODE HERE
}

// Challenge 4: Add error handling to this function
export async function safeFileOperation(filepath) {
  try {
    // Read file
    // Parse JSON
    // Return data
  } catch (error) {
    // Handle different error types:
    // - File not found
    // - Invalid JSON
    // - Permission denied
  }
}