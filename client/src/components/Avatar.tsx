type AvatarProps = {
    name: string
    hat: string
    outfit: string
    acc: string
    wearing: boolean
    onWear: () => void
}

export default function Avatar({name, hat, outfit, acc, wearing, onWear}: AvatarProps) {
    return(
        <div>
            <button
                onClick={onWear}
                disabled={wearing}>
            </button>
        </div>
    )
}