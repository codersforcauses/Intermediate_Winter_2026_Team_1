const BASE_URL = "http://localhost:8000/api/gamification"

export async function getStoreItems() {
    const response = await fetch(`${BASE_URL}/store/`)
    if (!response.ok)
        throw new Error ("Failed to fetch store items.")
    return response.json()
}

export async function getOwnedItems() {
    const response = await fetch(`${BASE_URL}/store/`)
    if (!response.ok)
        throw new Error ("Failed to fetch owned items.")
    return response.json()
}