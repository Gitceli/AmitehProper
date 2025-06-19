import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Greetings() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="container mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="text-center sm:text-left mb-6 sm:mb-0">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Welcome to TechInnovate
            </h1>
            <p className="mt-4 text-xl">
              Empowering businesses with cutting-edge AI solutions
            </p>
          </div>
          <Button className="bg-white text-purple-600 hover:bg-gray-100">
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}