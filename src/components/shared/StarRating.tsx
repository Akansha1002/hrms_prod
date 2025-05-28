import { useState } from 'react'
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa'

const StarRating = ({
    value = 0,
    onChange,
    size = 24,
}: {
    value?: number
    onChange: (val: number) => void
    size?: number
}) => {
    const [hover, setHover] = useState<number | null>(null)

    const handleClick = (index: number, isHalf: boolean) => {
        const newRating = isHalf ? index + 0.5 : index + 1
        onChange(newRating)
    }

    const getIcon = (index: number) => {
        const displayValue = hover ?? value
        if (displayValue >= index + 1)
            return (
                <FaStar
                    className="text-yellow-400 transition-all"
                    size={size}
                />
            )
        if (displayValue >= index + 0.5)
            return (
                <FaStarHalfAlt
                    className="text-yellow-400 transition-all"
                    size={size}
                />
            )
        return (
            <FaRegStar className="text-gray-300 transition-all" size={size} />
        )
    }

    return (
        <div className="flex">
            {[0, 1, 2, 3, 4].map((index) => (
                <div
                    key={index}
                    className="relative group cursor-pointer"
                    style={{ width: size, height: size }}
                >
                    {/* Left half (0.5) */}
                    <div
                        className="absolute left-0 top-0 w-1/2 h-full z-10"
                        onMouseEnter={() => setHover(index + 0.5)}
                        onClick={() => handleClick(index, true)}
                    />
                    {/* Right half (1.0) */}
                    <div
                        className="absolute right-0 top-0 w-1/2 h-full z-10"
                        onMouseEnter={() => setHover(index + 1)}
                        onClick={() => handleClick(index, false)}
                    />
                    <div onMouseLeave={() => setHover(null)}>
                        {getIcon(index)}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default StarRating
