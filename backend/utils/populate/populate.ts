import * as dotenv from "dotenv";
dotenv.config();

import { db } from "../kysely/index";
import { fakerES as faker } from "@faker-js/faker";

async function generateRandomData(amount: number, seed: number) {
  console.log("Generating dummy data...");
  faker.seed(seed);

  for (let i = 0; i < amount; i++) {
    console.log("Fake data #", i);

    /* ... */
  }
  process.exit();
}

const numEntries = process.argv[2] ? parseInt(process.argv[2]) : 30;
const randomSeed = process.argv[3] ? parseInt(process.argv[3]) : 123;

generateRandomData(numEntries, randomSeed);
