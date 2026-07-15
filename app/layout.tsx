import type { Metadata } from "next";
import { Quicksand, Inter } from "next/font/google";
import "./globals.css";
import { SideNav } from "@/components/nav/SideNav";
import { Preloader } from "@/components/ui/Preloader";

const quicksand = Quicksand({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Inovaxio Brandbook",
  description:
    "Guia de identidade da Inovaxio: sistema verbal, visual, aplicações e recursos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${quicksand.variable} ${inter.variable}`}>
      <body>
        <Preloader />
        <a href="#main-content" className="skip-link">
          Ir para o conteúdo principal
        </a>
        <div className="site-shell">
          <SideNav />
          <main id="main-content" className="site-content">
            {children}
            {/* Assinatura compartilhada com o site: wordmark gigante esmaecido */}
            <footer className="brand-footer" aria-hidden="true">
              <span className="brand-footer__marca">Inovaxio</span>
            </footer>
          </main>
        </div>
      </body>
    </html>
  );
}
