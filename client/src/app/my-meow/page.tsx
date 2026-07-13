"use client"

import { useState } from "react"
import Avatar from "../../components/Avatar"
import OwnedItem from "../../components/OwnedItem"


const OWNED_ITEMS = [
  { id: 1, name: "Wizard Hat", category: "hat" },
  { id: 2, name: "Pirate Outfit", category: "outfit" },
  { id: 3, name: "Sparkles", category: "acc" },
  { id: 4, name: "Space Background", category: "background" },
]

export default function MyMeowPage() {
  const [equipped, setEquipped] = useState<Record<string, number | null>>({
    hat: null,
    outfit: null,
    acc: null,
    background: null,
  })

  function toggleEquip(id: number, category: string) {
    setEquipped(prev => ({
        ...prev,
        [category]: prev[category] === id ? null : id
    }))
  }

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">My Meow 🐾</h1>

      <div className="bg-gray-50 rounded-2xl p-6 mb-8">
        <Avatar 
            hat={equipped["hat"] !== null}
            outfit={equipped["outfit"] !== null}
            acc={equipped["acc"] !== null}
            bg={equipped["background"] !== null}/>
      </div>

      <h2 className="text-lg font-semibold mb-3">Wardrobe</h2>

      <div className="grid grid-cols-3 gap-3">
        {OWNED_ITEMS.map((item) => (
          <OwnedItem
            key={item.id}
            name={item.name}
            category={item.category}
            equipped={equipped[item.category] === item.id}
            onToggle={() => toggleEquip(item.id, item.category)}
          />
        ))}
      </div>
    </main>
  )
}