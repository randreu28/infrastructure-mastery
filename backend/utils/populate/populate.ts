import * as dotenv from "dotenv";
dotenv.config();

import { db } from "../kysely/index";
import { fakerES as faker } from "@faker-js/faker";

async function generateRandomData(amount: number, seed: number) {
  console.log("Generating dummy data...");
  faker.seed(seed);

  for (let i = 0; i < amount; i++) {
    console.log("Fake data #", i);

    const post = await db
      .insertInto("posts")
      .values({
        createdAt: faker.date.recent(),
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(),
        author: faker.person.fullName(),
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    const commentAmount = Math.floor(Math.random() * 3) + 2;
    for (let j = 0; j < commentAmount; j++) {
      await db
        .insertInto("comments")
        .values({
          content: faker.lorem.sentences(2),
          createdAt: faker.date.recent(),
          postId: Number(post.id),
        })
        .executeTakeFirstOrThrow();
    }
  }
  process.exit();
}

const numEntries = process.argv[2] ? parseInt(process.argv[2]) : 30;
const randomSeed = process.argv[3] ? parseInt(process.argv[3]) : 100;

generateRandomData(numEntries, randomSeed);
