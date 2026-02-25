import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const documents = await prisma.document.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(documents)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const json = await req.json()
    const { name, category, fileUrl, fileType, fileSize, order } = json

    if (!name || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const document = await prisma.document.create({
      data: { name, category, fileUrl: fileUrl || "#", fileType: fileType || "PDF", fileSize: fileSize || "0 MB", order: order || 0 }
    })

    return NextResponse.json(document, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create document" }, { status: 500 })
  }
}
