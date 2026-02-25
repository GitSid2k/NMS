import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const contact = await prisma.contactInfo.findFirst()
    return NextResponse.json(contact)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const json = await req.json()
    const { phone, email, address, address2, workHours } = json

    const contact = await prisma.contactInfo.upsert({
      where: { id: "contact-main" },
      update: { phone, email, address, address2, workHours },
      create: { id: "contact-main", phone, email, address, address2, workHours }
    })

    return NextResponse.json(contact)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update contacts" }, { status: 500 })
  }
}
