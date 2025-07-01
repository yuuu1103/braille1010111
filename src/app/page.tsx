import { BrailleConverter } from '@/components/braille-converter';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold text-primary font-headline">BrailleMate</h1>
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto p-4 sm:p-6 md:p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Braille Conversion Tool</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              Easily convert English or Zhuyin (Bopomofo) to accessible 6-dot Braille and back.
            </p>
          </div>
          <BrailleConverter />
        </div>
      </main>
      <footer className="py-6 md:px-8 md:py-0 border-t">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            &copy; {new Date().getFullYear()} BrailleMate. Designed for accessibility.
          </p>
        </div>
      </footer>
    </div>
  );
}
