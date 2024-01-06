import { Button } from "react-aria-components";

export default function Header() {
  return (
    <nav className="fixed z-10 bg-dark-100 w-full border-b-2 py-2 px-20">
      <h2>Trellix</h2>

      <ul>
        <li>boards</li>
        <li>info</li>
        <li>
          <Button>Login</Button>
        </li>
      </ul>
    </nav>
  );
}
