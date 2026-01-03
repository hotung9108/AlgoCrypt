type NavbarProps = {
  title?: string
}

export default function Navbar({ title = "🔐 AlgoCrypto" }: NavbarProps) {
  return (
    <header className="
      h-14 px-6 flex items-center justify-between
      bg-white dark:bg-gray-800
      border-b dark:border-gray-700
    ">
      <span className="font-bold">
        {title}
      </span>
    </header>
  )
}
