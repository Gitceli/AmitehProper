
const products = [
  {
    id: 1,
    name: "Eco-Friendly Water Bottle",
    description: "Stay hydrated with our new sustainable water bottle. Made from recycled materials, this bottle keeps your drinks cold for up to 24 hours.",
    image: "/placeholder.svg?height=200&width=200"
  },
  {
    id: 2,
    name: "Smart Home Hub",
    description: "Control your entire home with our latest smart home hub. Compatible with all major smart home devices and voice assistants.",
    image: "/placeholder.svg?height=200&width=200"
  },
  {
    id: 3,
    name: "Wireless Noise-Cancelling Headphones",
    description: "Immerse yourself in crystal-clear audio with our new wireless headphones. Features active noise cancellation and 30-hour battery life.",
    image: "/placeholder.svg?height=200&width=200"
  },
  {
    id: 4,
    name: "Ultra-Thin Laptop",
    description: "Experience lightning-fast performance in an incredibly slim package. Our new laptop weighs just 2.2 lbs and lasts up to 18 hours on a single charge.",
    image: "/placeholder.svg?height=200&width=200"
  }
]

export default function ProductShowcase() {
  return (
    <section className="py-12 bg-gradient-to-b from-[#8A7764] to-[#006FB1]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-12">New Products Showcase</h2>
        <div className="space-y-12">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center bg-white rounded-lg overflow-hidden shadow-lg`}
            >
              <div className="w-full md:w-1/3">
                <img
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="w-full md:w-2/3 p-6">
                <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}