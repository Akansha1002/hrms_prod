import Card from '@/components/ui/Card'

const GallerySection = () => {
    return (
        <Card>
            <div className="flex items-center justify-between">
                <h4>Gallery</h4>
            </div>
            <div className="mt-4">
                <p>
                    In C++ its harder to shoot yourself in the foot, but
                    when you do, you blow off your whole leg. (Bjarne
                    Stroustrup)
                </p>
            </div>
        </Card>
    )
}

export default GallerySection