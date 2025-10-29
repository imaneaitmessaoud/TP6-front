"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface Student {
  id: number
  nom: string
  prenom: string
  dateNaissance: string
}

interface StudentListProps {
  students: Student[]
  loading: boolean
  onDeleteStudent: (id: number) => void
}

export default function StudentList({ students, loading, onDeleteStudent }: StudentListProps) {
  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <p className="text-muted-foreground">Chargement des étudiants...</p>
      </div>
    )
  }

  if (students.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <p className="text-muted-foreground">Aucun étudiant trouvé. Ajoutez-en un pour commencer.</p>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Nom</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Prénom</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date de Naissance</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 text-sm text-foreground font-medium">{student.nom}</td>
                <td className="px-6 py-4 text-sm text-foreground">{student.prenom}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {new Date(student.dateNaissance).toLocaleDateString("fr-FR")}
                </td>
                <td className="px-6 py-4 text-sm">
                  <Button
                    onClick={() => onDeleteStudent(student.id)}
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
