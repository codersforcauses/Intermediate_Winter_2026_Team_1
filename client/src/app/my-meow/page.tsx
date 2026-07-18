"use client"

import { useState } from "react"
import Avatar from "../../components/Avatar"
import OwnedItem from "../../components/OwnedItem"


const OWNED_ITEMS = [
  { id: 1, name: "Wizard Hat", category: "hat", image: "/images/wizardhat.png" },
  { id: 2, name: "Mustard Sweater", category: "outfit", image: "/images/mustardsweater.png"},
  { id: 3, name: "Monocole", category: "accessory", image: "/images/monocle.png" },
  { id: 4, name: "Bow Tie", category: "accessory", image: "/images/bowtie.png" },
]

type EquippedState = {
  hat: number | null
  outfit: number | null
  acc: number | null
  background: number | null
}

export default function MyMeowPage() {
  const [equipped, setEquipped] = useState<Record<string, number | null>>({
    hat: null,
    outfit: null,
    acc: null,
    background: null,
  })

  function getImage(category: string) {
    const equippedId = equipped[category as keyof EquippedState]
    return OWNED_ITEMS.find(item => item.id === equippedId)?.image
  }

  function toggleEquip(id: number, category: string) {
    setEquipped(prev => ({
        ...prev,
        [category]: prev[category] === id ? null : id
    }))
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden">

      {/* background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: getImage("background") ? `url(${getImage("background")})` : undefined,
          backgroundColor: getImage("background") ? undefined : "#3e62bd",
        }}
      />

      {/* cat */}
      <div className="absolute left-0 top-0 h-full w-[calc(100%-288px)] flex items-center justify-center">
        <Avatar 
          hat={getImage("hat")}
          outfit={getImage("outfit")}
          acc={getImage("accessory")}
          bg={undefined}
        />
      </div>

      {/* wardrobe sidebar */}
      <div className="absolute right-0 top-0 h-full w-72 bg-white/80 backdrop-blur-sm
        flex flex-col p-4 gap-3 overflow-y-auto">

        <h2 className="text-lg font-bold">Wardrobe</h2>

        {OWNED_ITEMS.map((item) => (
          <OwnedItem
            key={item.id}
            name={item.name}
            category={item.category}
            image={item.image}
            equipped={equipped[item.category] === item.id}
            onToggle={() => toggleEquip(item.id, item.category)}
          />
        ))}
      </div>
    </div>
  )
}