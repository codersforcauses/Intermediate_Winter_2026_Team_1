type OwnedItemProps = {
    name: string
    category: string
    equipped: boolean
    onToggle: () => void
}

export default function OwnedItem({name, category, equipped, onToggle}: OwnedItemProps) {
    return(
        <div className={`border-2 rounded-xl p-3 flex flex-col items-center gap-2
            ${equipped ? "border-amber-400 bg-amber-50" : "border-gray-200"}`}
        >
            <div className="text-4x1 text-center">item img</div>
            <p className="text-xs text-center font-medium">{name}</p>
            <p className="text-xs text-gray-400">{category}</p>
            <button
                onClick={onToggle}
                className={`text-xs py-1 px-2 rounded-lg w-full
                    ${equipped ? "bg-amber-400 text-amber-900" : "bg-gray-100 text-gray-600"}`}
            >
                {equipped ? "Unequip" : "Equip"}
            </button>
        </div>
    )
}