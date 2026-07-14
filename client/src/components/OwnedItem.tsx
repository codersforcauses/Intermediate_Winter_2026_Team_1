type OwnedItemProps = {
    name: string
    category: string
    image: string
    equipped: boolean
    onToggle: () => void
}

export default function OwnedItem({name, category, image, equipped, onToggle}: OwnedItemProps) {
    return(
        <div className={`border-2 rounded-xl p-2 flex items-center gap-3
            ${equipped ? "border-amber-400 bg-amber-50" : "border-gray-200 bg-white"}`}>
        
            <img
                src={image} alt={name}
                className="w-12 h-12 object-contain rounded-lg"
            />
        
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{name}</p>
                <p className="text-xs text-gray-400">{category}</p>
            </div>
            
            <button
                onClick={onToggle}
                className={`text-xs py-1 px-2 rounded-lg font-medium shrink-0
                    ${equipped ? "bg-amber-400 text-amber-900" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
                {equipped ? "Equipped" : "Equip"}
            </button>
        </div>
    )
}