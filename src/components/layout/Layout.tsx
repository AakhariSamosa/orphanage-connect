import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useAshram } from "@/contexts/AshramContext";

interface LayoutProps {
  children: ReactNode;
}

function AshramAwareLayout({ children }: LayoutProps) {
  let ashramName: string | undefined;
  let ashramLogo: string | null | undefined;
  let basePath = '';

  try {
    const ashramCtx = useAshram();
    ashramName = ashramCtx.ashram?.name;
    ashramLogo = ashramCtx.ashram?.logo_url;
    basePath = ashramCtx.basePath;
  } catch {
    // Not within AshramProvider — that's fine for landing/auth pages
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header ashramName={ashramName} ashramLogo={ashramLogo} basePath={basePath} />
      <main className="flex-1 pt-16 md:pt-20">
        {children}
      </main>
      <Footer ashramName={ashramName} basePath={basePath} />
    </div>
  );
}

const Layout = ({ children }: LayoutProps) => {
  return <AshramAwareLayout>{children}</AshramAwareLayout>;
};

export default Layout;
