import { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useAshram } from "@/contexts/AshramContext";
import { BackButton } from "@/components/BackButton";

interface PlatformSettings {
  platformLogo: string;
  platformName: string;
  backgroundVideoUrl: string;
  backgroundOverlayOpacity: string;
}

function AshramAwareLayout({ children }: { children: ReactNode }) {
  let ashramName: string | undefined;
  let ashramLogo: string | null | undefined;
  let basePath = '';

  try {
    const ashramCtx = useAshram();
    ashramName = ashramCtx.ashram?.name;
    ashramLogo = ashramCtx.ashram?.logo_url;
    basePath = ashramCtx.basePath;
  } catch {
    // Not within AshramProvider
  }

  const [platformSettings, setPlatformSettings] = useState<PlatformSettings | null>(() => {
    const saved = localStorage.getItem('platform-settings');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setPlatformSettings(detail);
    };
    window.addEventListener('platform-settings-changed', handler);
    return () => window.removeEventListener('platform-settings-changed', handler);
  }, []);

  // Use platform settings for logo/name if no ashram-specific ones
  const displayName = ashramName || platformSettings?.platformName;
  const displayLogo = ashramLogo || platformSettings?.platformLogo;

  const bgVideo = platformSettings?.backgroundVideoUrl;
  const overlayOpacity = parseInt(platformSettings?.backgroundOverlayOpacity || '50') / 100;

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Video */}
      {bgVideo && (
        <>
          <video
            src={bgVideo}
            autoPlay
            loop
            muted
            playsInline
            className="fixed inset-0 w-full h-full object-cover -z-20"
          />
          <div
            className="fixed inset-0 -z-10 bg-background"
            style={{ opacity: overlayOpacity }}
          />
        </>
      )}

      <Header ashramName={displayName} ashramLogo={displayLogo} basePath={basePath} />
      <main className="flex-1 pt-16 md:pt-20">
        <div className="container-custom pt-3">
          <BackButton />
        </div>
        {children}
      </main>
      <Footer ashramName={ashramName} basePath={basePath} />
    </div>
  );
}

const Layout = ({ children }: { children: ReactNode }) => {
  return <AshramAwareLayout>{children}</AshramAwareLayout>;
};

export default Layout;
