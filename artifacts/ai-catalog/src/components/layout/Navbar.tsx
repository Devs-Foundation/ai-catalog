import { Link, useLocation } from "wouter";
import { useLanguage } from "@/lib/LanguageContext";
import { languageLabels, LanguageCode } from "@/lib/translations";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Languages } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();
  const { t, language, setLanguage } = useLanguage();

  const navItems = [
    { href: "/", label: t.app.nav.home },
    { href: "/providers", label: t.app.nav.providers },
    { href: "/compare", label: t.app.nav.compare },
    { href: "/local-llms", label: t.app.nav.localLlms },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4 md:px-8">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">IA</span>
            </div>
            <span className="hidden font-bold sm:inline-block">
              {t.app.title}
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  location === item.href || (location.startsWith(item.href) && item.href !== "/")
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <Select value={language} onValueChange={(value) => setLanguage(value as LanguageCode)}>
          <SelectTrigger className="w-[130px] h-8 text-sm" aria-label={t.common.language}>
            <Languages className="w-3.5 h-3.5 mr-1.5 shrink-0" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end">
            {(Object.keys(languageLabels) as LanguageCode[]).map((code) => (
              <SelectItem key={code} value={code}>
                {languageLabels[code]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </header>
  );
}
