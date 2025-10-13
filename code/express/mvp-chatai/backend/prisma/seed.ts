import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create default agents
  const openai = await prisma.agent.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'GPT-4',
      type: 'openai',
      model: 'gpt-4',
      apiKey: process.env.OPENAI_API_KEY,
    },
  });

  const gemini = await prisma.agent.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Gemini Pro',
      type: 'gemini',
      model: 'gemini-pro',
      apiKey: process.env.GEMINI_API_KEY || '',
      active: false, // Disable if no API key
    },
  });

  console.log('✅ Seeded agents:', { openai, gemini });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
