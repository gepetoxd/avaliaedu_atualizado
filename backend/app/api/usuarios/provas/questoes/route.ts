import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - listar questões
export async function GET() {
  const questoes = await prisma.questao.findMany();
  return Response.json(questoes);
}

// POST - criar questão
export async function POST(req: Request) {
  const body = await req.json();

  const questao = await prisma.questao.create({
    data: {
      enunciado: body.enunciado,
      alternativaA: body.alternativaA,
      alternativaB: body.alternativaB,
      alternativaC: body.alternativaC,
      alternativaD: body.alternativaD,
      correta: body.correta,
    },
  });

  return Response.json(questao);
}
