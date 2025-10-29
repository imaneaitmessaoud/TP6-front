export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

export async function fetchWithErrorHandling(url: string, options?: RequestInit) {
  try {
    console.log("[v0] Fetching:", url)
    const response = await fetch(url, options)

    if (!response.ok) {
      console.error("[v0] API error:", response.status, response.statusText)
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log("[v0] Response received:", data)
    return data
  } catch (error) {
    console.error("[v0] Fetch failed:", error)
    throw error
  }
}
