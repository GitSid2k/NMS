import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

type Params = Promise<{ id: string }>

export async function GET(req: Request, { params }: { params: Params }) {
  const { id } = await params
  try {
    const document = await prisma.document.findUnique({ where: { id } })
    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 })
    }
    return NextResponse.json(document)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch document" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: Params }) {
  const { id } = await params
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const json = await req.json()
    const { name, category, fileUrl, fileType, fileSize, order } = json

    const document = await prisma.document.update({
      where: { id },
      data: { name, category, fileUrl, fileType, fileSize, order }
    })

    return NextResponse.json(document)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update document" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  const { id } = await params
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await prisma.document.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete document" }, { status: 500 })
  }
}
