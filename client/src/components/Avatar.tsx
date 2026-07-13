type AvatarProps = {
    hat: boolean
    outfit: boolean
    acc: boolean
    bg: boolean
}

export default function Avatar({hat, outfit, acc, bg}: AvatarProps) {
    return(
        <div className="relative w-64 h-64 mx-auto">
            <div className={`absolute inset-0 rounded-2xl ${bg ? "bg-purple-100" : "bg-gray-100"}`}/>
            
            <div className="absolute inset-0 flex items-center justify-center text-9xl">
                cat
            </div>

            {hat && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-4xl">
                    tophat
                </div>
            )}
            {outfit && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-4xl">
                    shirt
                </div>
            )}
            {acc && (
                <div className="left-1/2 -translate-x-1/2 text-4xl">
                    sparkle
                </div>
            )}
        </div>
    )
}