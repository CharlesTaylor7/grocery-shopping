import { toast } from "@/components/toast";

export default function NyanCatButton() {
  // greetings traveler
  return (
    <button
      className="btn btn-accent btn-xs"
      onClick={() =>
        toast(() => (
          <img src="/grocery-shopping/nyan.gif" />
        ))}
    >
      Click Me
    </button>
  );
}
