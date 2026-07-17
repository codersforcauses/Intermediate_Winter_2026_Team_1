"use client"

import { useState, useEffect } from "react"
import { getStoreItems } from "../../lib/api"
import ShopItem from "../../components/ShopItem"

type storeItem = {
  id: number
  name: string
  coin_cost: number
  category: string
  img_url: string
  description: string
}

export default function storePage() {
    const [coins, setCoins] = useState(300)
    const [owned, setOwned] = useState<number[]>([])
    const [items, setItems] = useState<storeItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // fetch items from Django when page loads
    useEffect(() => {
        getStoreItems()
        .then(data => {
            setItems(data)
            setLoading(false)
        })
        .catch(err => {
            setError("Could not load store items")
            setLoading(false)
        })
    }, [])

    function buyItem(id: number, cost: number) {
        if (coins >= cost && !owned.includes(id)) {
            setCoins(coins - cost)
            setOwned([...owned, id])
        }
    }

    if (loading) return <p className="p-6">Loading store...</p>
    if (error) return <p className="p-6 text-red-500">{error}</p>

    return (
        <main className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Shop</h1>
                <p className="text-amber-600 font-semibold">{coins} coins</p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {items.map((item) => (
                    <ShopItem
                        key={item.id}
                        name={item.name}
                        coinCost={item.coin_cost}
                        category={item.category}
                        image={item.img_url}
                        owned={owned.includes(item.id)}
                        onBuy={() => buyItem(item.id, item.coin_cost)}
                    />
                ))}
            </div>
        </main>
    )
}