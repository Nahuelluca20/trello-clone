import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

declare global {
  var db: PrismaClient | undefined;
}

const createPrismaClient = () => {
  const client = new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });
  const connectWithRetry = async (retries = 5) => {
    while (retries) {
      try {
        await client.$connect();
        console.log("Connected to the database");
        break;
      } catch (error) {
        retries -= 1;
        console.error(`Retries left: ${retries}`, error);
        if (retries === 0) {
          console.error("Could not connect to the database");
          throw new Error("Could not connect to the database");
        }
        await new Promise((res) => setTimeout(res, 5000));
      }
    }
  };
  connectWithRetry();
  return client;
};

if (process.env.NODE_ENV === "production") {
  db = createPrismaClient();
} else {
  if (!global.db) {
    global.db = createPrismaClient();
  }
  db = global.db;
}

export default db;
