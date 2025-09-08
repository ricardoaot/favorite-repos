import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    // Get paginated items
    const repos = await prisma.favorite_repository.findMany({
        orderBy: { id: "asc" },
    });

    // Get total
    const total = await prisma.favorite_repository.count();

    return NextResponse.json({
        data: repos,
        pagination: {
            total,
        },
    });
}

// POST: create 
export async function POST(req: Request) {
    // TODO use JWT to get appUserId from the user session 
    const appUserId = "550e8400-e29b-41d4-a716-446655440000"
    const { repoId, notes = null } = await req.json();
    const newItem = await prisma.favorite_repository.create(
        {
            data:
            {
                appUserId,
                repoId: repoId.toString(),
                notes
            }
        });
    return NextResponse.json(newItem, { status: 201 });
}

