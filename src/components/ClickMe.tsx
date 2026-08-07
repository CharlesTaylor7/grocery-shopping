import { toast } from "@/components/toast"

export default function() {
  // greetings traveler
  return (
    <button
      className="btn btn-accent btn-xs"
      onClick={() =>
        toast(() => (
          <div className="p-3 bg-base-300 rounded-full">
            <img src="/grocery-shopping/nyan.gif" />
          </div>
        ))}
    >
      Click Me
    </button>
  )
}

