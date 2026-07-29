import { Link } from "wouter";

export default function Nav() {
  return (
    <nav>
      <ul className="flex flex-col gap-3 p-4">
        <li>
          <Link className="underline" to="/store">Stores</Link>
        </li>
        <li>
          <Link className="underline" to="/trip">Trips</Link>
        </li>
      </ul>
    </nav>
  );
}
