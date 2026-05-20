import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - listar provas
export async function GET() {
  const provas = await prisma.prova.findMany({
    include: {
      usuario: true, // traz quem criou
    },
  });

  return Response.json(provas);
}

// POST - criar prova
export async function POST(req: Request) {
  const body = await req.json();

  const prova = await prisma.prova.create({
    data: {
      nome: body.nome,
      tipo: body.tipo,
      usuarioId: body.usuarioId,
    },
  });

  return Response.json(prova);
}
