type ShopItemProps = {
    name: string
    coinCost: number
    category: string
    owned: boolean
    onBuy: () => void // takes no args and returns nothing
}

export default function ShopItem({name, coinCost, category, owned, onBuy}: ShopItemProps) {
    return(
        <div className="border rounded-x1 p-4 flex flex-col gap-2">
            <div className="text-4x1 text-center">hat</div>
            <h3 className="font-semibold text-center">{name}</h3>
            <p className="text-sm text-gray-500 text-center">{category}</p>
            <p className="text-center">{coinCost}</p>
            <button
                onClick={onBuy}
                disabled={owned}
                className="mt-auto rounded-lg py-2 px-4 bg-amber-400 text-amber-900 font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                    {owned ? "Owned" : "Buy"}
                </button>
        </div>
    )
}