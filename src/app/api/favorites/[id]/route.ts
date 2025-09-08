import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET by id
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    const favRepo = await prisma.favorite_repository.findUnique({
        where: { repoId: id.toString() },
    });

    if (!favRepo) {
        return NextResponse.json({ error: "Favorite Repository not found" }, { status: 404 });
    }

    return NextResponse.json(favRepo);
}

// PUT
export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    console.log('Starting')

    const { id } = await context.params;

    const { notes } = await request.json();
    console.log('notes', notes)
    try {
        const updated = await prisma.favorite_repository.update({
            where: { repoId: id.toString() },
            data: { notes },
        });
        console.log('updated', updated)

        return NextResponse.json(updated);
    } catch (e) {
        return NextResponse.json({ error: "Favorite Repository not found." + e }, { status: 404 });
    }
}

// DELETE
export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    console.log("Hola" + id)
    try {
        await prisma.favorite_repository.delete({
            where: { repoId: id.toString() },
        });

        return NextResponse.json({ message: "Favorite Repository deleted" });
    } catch (e) {
        return NextResponse.json({ error: "Favorite Repository not found." + e }, { status: 404 });
    }
}