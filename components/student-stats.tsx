"use client"

import { useEffect, useState } from "react"
import { Users } from "lucide-react"
import { API_BASE_URL, fetchWithErrorHandling } from "@/lib/api-config"

export default function StudentStats() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const data = await fetchWithErrorHandling(`${API_BASE_URL}/students?action=count`)
        setCount(data)
        setError(null)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch student count"
        console.error("[v0] Error fetching student count:", errorMessage)
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchCount()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total des Étudiants</p>
            {error ? (
              <p className="text-sm text-destructive">Erreur de connexion</p>
            ) : (
              <p className="text-3xl font-bold text-foreground">{loading ? "-" : count}</p>
            )}
          </div>
          <div className="bg-primary/10 p-3 rounded-lg">
            <Users className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Statut</p>
            <p className="text-3xl font-bold text-foreground">{error ? "Hors ligne" : "Actif"}</p>
          </div>
          <div className={`${error ? "bg-red-100" : "bg-green-100"} p-3 rounded-lg`}>
            <div className={`w-6 h-6 ${error ? "bg-red-500" : "bg-green-500"} rounded-full`}></div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Dernière Mise à Jour</p>
            <p className="text-3xl font-bold text-foreground">Maintenant</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg">
            <div className="w-6 h-6 text-blue-500">⚡</div>
          </div>
        </div>
      </div>
    </div>
  )
}
