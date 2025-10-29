"use client"

import { useState, useEffect } from "react"
import StudentForm from "@/components/student-form"
import StudentList from "@/components/student-list"
import StudentStats from "@/components/student-stats"
import { API_BASE_URL, fetchWithErrorHandling } from "@/lib/api-config"

interface Student {
  id: number
  nom: string
  prenom: string
  dateNaissance: string
}

export default function Home() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStudents = async () => {
    try {
      setLoading(true)
      const data = await fetchWithErrorHandling(`${API_BASE_URL}/students?action=all`)
      setStudents(data)
      setError(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      console.error("[v0] Error fetching students:", errorMessage)
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const handleAddStudent = async (newStudent: Omit<Student, "id">) => {
    try {
      await fetchWithErrorHandling(`${API_BASE_URL}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      })
      await fetchStudents()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to add student"
      console.error("[v0] Error adding student:", errorMessage)
      setError(errorMessage)
    }
  }

  const handleDeleteStudent = async (id: number) => {
    try {
      await fetchWithErrorHandling(`${API_BASE_URL}/students?id=${id}`, {
        method: "DELETE",
      })
      await fetchStudents()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete student"
      console.error("[v0] Error deleting student:", errorMessage)
      setError(errorMessage)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Gestion des Étudiants</h1>
          <p className="text-muted-foreground">Gérez facilement votre liste d'étudiants</p>
        </div>

        {/* Stats */}
        <StudentStats />

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <p className="font-semibold">Erreur</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1">
            <StudentForm onAddStudent={handleAddStudent} />
          </div>

          {/* List */}
          <div className="lg:col-span-2">
            <StudentList students={students} loading={loading} onDeleteStudent={handleDeleteStudent} />
          </div>
        </div>
      </div>
    </main>
  )
}
