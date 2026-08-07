import { toast } from "@/components/toast"

export default function() {
  return (
    <button
      className="btn btn-accent btn-xs"
      onClick={() =>
        toast(() => (
          <div className="p-3 bg-base-300 rounded-full">
            greetings traveler
          </div>
        ))}
    >
      Click Me
    </button>
  )
}

