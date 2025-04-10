import Input from "@/components/ui/Input"
import { FaMagnifyingGlass } from "react-icons/fa6";
export const Search = () => {
  return (
    <div className="flex items-center justify-end mb-5">
      <div>
        <Input
          placeholder="Enter your name"
          prefix={<FaMagnifyingGlass className="text-lg" />}
        />
      </div>
    </div>
  )
}