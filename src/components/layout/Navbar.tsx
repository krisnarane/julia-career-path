import { Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Sparkles, LogOut, ShieldCheck } from "lucide-react";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { logoutFn } from "@/api/auth";

const links = [
  { to: "/", label: "Sobre" },
  { to: "/objetivo-carreira", label: "Objetivo" },
  { to: "/metas", label: "Metas" },
  { to: "/contribuicoes", label: "Contribuições" },
  { to: "/roadmap", label: "Roadmap" },
  { to: "/soft-skills", label: "Soft Skills" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const isAdmin = useIsAdmin();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutFn();
    await router.invalidate();
  };

  return (
    <header className="sticky top-0 z-40 glass border-b border-border">
      <nav className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold">
          <span className="h-8 w-8 rounded-xl gradient-primary flex items-center justify-center text-white shadow-soft">
            <Sparkles className="h-4 w-4" />
          </span>
          <span>Julia Krisnarane Moraes - Plano de Desenvolvimento Individual</span>
        </Link>
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="px-3 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition"
                activeProps={{
                  className:
                    "px-3 py-2 rounded-full text-sm font-medium gradient-primary text-white shadow-soft",
                }}
                activeOptions={{ exact: true }}
              >
                {l.label}
              </Link>
            </li>
          ))}
          {isAdmin && (
            <li className="flex items-center gap-1 ml-2">
              <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-success/15 text-success">
                <ShieldCheck className="h-3.5 w-3.5" /> Admin
              </span>
              <button
                onClick={handleLogout}
                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition"
                title="Sair"
                aria-label="Sair"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </li>
          )}
        </ul>
        <button
          className="md:hidden p-2 rounded-lg hover:bg-secondary"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-border animate-fade-in">
          <ul className="px-4 py-3 space-y-1">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary"
                  activeProps={{
                    className:
                      "block px-3 py-2 rounded-lg text-sm font-medium gradient-primary text-white",
                  }}
                  activeOptions={{ exact: true }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            {isAdmin && (
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary"
                >
                  <LogOut className="h-4 w-4" /> Sair (Admin)
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
