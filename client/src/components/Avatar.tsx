type AvatarProps = {
    hat?: string
    outfit?: string
    acc?: string
    bg?: string
}

export default function Avatar({hat, outfit, acc }: AvatarProps) {
    return(
        <div className="relative w-[500px] h-[500px]">

            {/* cat base */}
            <img
                src="/images/1.png" alt="cat"
                className="absolute inset-0 w-full h-full object-contain"
            />

            {/* layers */}
            {hat && (
                <img
                    src={hat} alt="hat"
                    className="absolute inset-0 w-full h-full object-contain"
                />
            )}

            {outfit && (
                <img
                    src={outfit} alt="outfit"
                    className="absolute inset-0 w-full h-full object-contain"
                />
            )}

            {acc && (
                <img
                    src={acc} alt="accessory"
                    className="absolute inset-0 w-full h-full object-contain"
                />
            )}
        </div>
    )
}