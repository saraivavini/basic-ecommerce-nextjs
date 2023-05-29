import Link from "next/link";

export default function Header() {
  return (
    <div className="flex px-6 py-4">
      <Link href="/products">
        <p className="font-bold text-lg">Minishop</p>
      </Link>
    </div>
  )
}
