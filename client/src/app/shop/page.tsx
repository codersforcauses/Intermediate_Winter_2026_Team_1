"use client"

import { useState } from "react"
import ShopItem from "../../components/ShopItem"

const PLACEHOLDERS = [
    { id: 1, name: "Wizard Hat", coinCost: 50, category: "hat", image: "/images/wizardhat.png"},
    { id: 2, name: "Mustard Sweater", coinCost: 120, category: "outfit", image: "/images/mustardsweater.png"},
]

export default function ShopPage() {
    const [coins, setCoins] = useState(300)
    const [owned, setOwned] = useState<number[]>([])

    function buyItem(id: number, cost: number) {
        if (coins >= cost && !owned.includes(id)) {
            setCoins(coins - cost)
            setOwned([...owned, id])
        }
    }

    return (
        <main className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Shop</h1>
                <p className="text-amber-600 font-semibold">{coins} coins</p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {PLACEHOLDERS.map((item) => (
                    <ShopItem
                        key={item.id}
                        name={item.name}
                        coinCost={item.coinCost}
                        category={item.category}
                        image={item.image}
                        owned={owned.includes(item.id)}
                        onBuy={() => buyItem(item.id, item.coinCost)}
                    />
                ))}
            </div>
        </main>
    )
}