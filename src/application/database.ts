import {PrismaClient} from "@prisma/client"
import { logger } from "./logging"

  export const prisma = new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
      {
        emit: 'event',
        level: 'error',
      },
      {
        emit: 'event',
        level: 'info',
      },
      {
        emit: 'event',
        level: 'warn',
      },
    ],
  })


  prisma.$on("error", (e: any)=> {
    logger.error(e)
  })
  prisma.$on("warn", (e: any)=> {
    logger.warn(e)
  })
  prisma.$on("info", (e: any)=> {
    logger.info(e)
  })
  prisma.$on("query", (e: any)=> {
    logger.info(e)
  })

