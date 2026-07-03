import { useLanguage } from "@/lib/LanguageContext";
import { uiExtra } from "@/lib/translations";

export function Footer() {
  const { language } = useLanguage();
  return (
    <footer className="border-t py-6">
      <div className="container flex flex-col items-center justify-center gap-2 px-4 md:px-8 text-center">
        <p className="text-sm text-muted-foreground">
          Powered by{" "}
          <a
            href="https://devs.foundation"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground hover:text-primary transition-colors"
          >
            Dev&apos;s Foundation
          </a>
          {" "}&middot; &copy; {new Date().getFullYear()}
        </p>
        <p className="text-xs text-muted-foreground/70 max-w-2xl">
          {uiExtra[language].disclaimer}
        </p>
      </div>
    </footer>
  );
}
