import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for students (persists during session)
let students: Array<{ id: number; nom: string; prenom: string; dateNaissance: string }> = [
  { id: 1, nom: "Dupont", prenom: "Jean", dateNaissance: "2000-05-15" },
  { id: 2, nom: "Martin", prenom: "Marie", dateNaissance: "2001-08-22" },
  { id: 3, nom: "Bernard", prenom: "Pierre", dateNaissance: "1999-12-03" },
]

let nextId = 4

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get("action")

  if (action === "count") {
    return NextResponse.json(students.length)
  }

  if (action === "all") {
    return NextResponse.json(students)
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newStudent = {
      id: nextId++,
      nom: body.nom,
      prenom: body.prenom,
      dateNaissance: body.dateNaissance,
    }
    students.push(newStudent)
    return NextResponse.json(newStudent, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = Number.parseInt(searchParams.get("id") || "0")

  students = students.filter((s) => s.id !== id)
  return NextResponse.json({ success: true })
}
