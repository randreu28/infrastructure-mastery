import * as dotenv from "dotenv";
dotenv.config();

import { db } from "../kysely/index";
import { fakerES as faker } from "@faker-js/faker";

async function generateRandomData(amount: number, seed: number) {
  console.log("Generating dummy data...");
  faker.seed(seed);

  for (let i = 0; i < amount; i++) {
    console.log("Fake data #", i);

    const user = await db
      .insertInto("users")
      .values({
        name: faker.person.fullName(),
        oauthId: faker.string.uuid(),
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    const postAmount = Math.floor(Math.random() * 4) + 2;
    for (let j = 0; j < postAmount; j++) {
      const post = await db
        .insertInto("posts")
        .values({
          createdAt: faker.date.recent(),
          content: faker.lorem.paragraphs(),
          title: faker.lorem.sentence(),
          userId: Number(user.id),
        })
        .returningAll()
        .executeTakeFirstOrThrow();

      const commentAmount = Math.floor(Math.random() * 3) + 2;
      for (let k = 0; k < commentAmount; k++) {
        await db
          .insertInto("comments")
          .values({
            content: faker.lorem.sentences(2),
            createdAt: faker.date.recent(),
            postId: Number(post.id),
            userId: Number(user.id),
          })
          .executeTakeFirstOrThrow();
      }
    }
  }
  process.exit();
}

const numEntries = process.argv[2] ? parseInt(process.argv[2]) : 30;
const randomSeed = process.argv[3] ? parseInt(process.argv[3]) : 100;

generateRandomData(numEntries, randomSeed);
