export function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="container flex items-center justify-center px-4 md:px-8">
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
      </div>
    </footer>
  );
}
