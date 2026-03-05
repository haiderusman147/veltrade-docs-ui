import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200">
      <div className="mx-auto max-w-[1400px] px-4 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-zinc-600">
            © {new Date().getFullYear()} VelTrade. All rights reserved.
          </div>

          <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <Link className="text-zinc-700 hover:text-zinc-900" href="/docs">
              Docs
            </Link>
            <Link className="text-zinc-700 hover:text-zinc-900" href="/about">
              About
            </Link>
            <Link className="text-zinc-700 hover:text-zinc-900" href="/contact">
              Contact
            </Link>
            <Link
              className="text-zinc-700 hover:text-zinc-900"
              href="/privacy-policy"
            >
              Privacy Policy
            </Link>
            <Link className="text-zinc-700 hover:text-zinc-900" href="/terms">
              Terms
            </Link>
            <Link
              className="text-zinc-700 hover:text-zinc-900"
              href="/disclaimer"
            >
              Disclaimer
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
