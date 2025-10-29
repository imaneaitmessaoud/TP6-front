"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface StudentFormProps {
  onAddStudent: (student: { nom: string; prenom: string; dateNaissance: string }) => void
}

export default function StudentForm({ onAddStudent }: StudentFormProps) {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    dateNaissance: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.nom || !formData.prenom || !formData.dateNaissance) {
      setError("Veuillez remplir tous les champs")
      return
    }

    setLoading(true)
    setError(null)
    try {
      console.log("[v0] Submitting student form:", formData)
      await onAddStudent(formData)
      setFormData({ nom: "", prenom: "", dateNaissance: "" })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to add student"
      console.error("[v0] Error in form submission:", errorMessage)
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-foreground mb-6">Ajouter un Étudiant</h2>

      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Nom</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Dupont"
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Prénom</label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            placeholder="Jean"
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Date de Naissance</label>
          <input
            type="date"
            name="dateNaissance"
            value={formData.dateNaissance}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {loading ? "Ajout en cours..." : "Ajouter l'Étudiant"}
        </Button>
      </form>
    </div>
  )
}
