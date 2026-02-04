import { useState } from 'react';
import { useTheme, ThemeConfig } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Palette, Settings, X, Check, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const ThemeCard = ({ 
  theme, 
  isActive, 
  onSelect 
}: { 
  theme: ThemeConfig; 
  isActive: boolean; 
  onSelect: () => void;
}) => {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "relative w-full p-4 rounded-xl border-2 transition-all duration-300 text-left group",
        isActive 
          ? "border-primary bg-primary/5 shadow-lg scale-[1.02]" 
          : "border-border hover:border-primary/50 hover:bg-muted/50"
      )}
    >
      {/* Color Preview */}
      <div className="flex gap-2 mb-3">
        <div 
          className="w-10 h-10 rounded-lg shadow-sm border border-white/20" 
          style={{ backgroundColor: theme.preview.primary }}
        />
        <div 
          className="w-10 h-10 rounded-lg shadow-sm border border-black/10" 
          style={{ backgroundColor: theme.preview.secondary }}
        />
        <div 
          className="w-10 h-10 rounded-lg shadow-sm border border-white/20" 
          style={{ backgroundColor: theme.preview.accent }}
        />
      </div>
      
      {/* Theme Info */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-sm">{theme.name}</h4>
          {isActive && (
            <Check className="w-4 h-4 text-primary" />
          )}
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {theme.description}
        </p>
      </div>

      {/* Category Badge */}
      <Badge 
        variant="secondary" 
        className="absolute top-2 right-2 text-[10px] capitalize"
      >
        {theme.category}
      </Badge>
    </button>
  );
};

const ThemeSwitcher = () => {
  const { currentTheme, setTheme, themes, isDevMode, toggleDevMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const brandThemes = themes.filter(t => t.category === 'brand');
  const paletteThemes = themes.filter(t => t.category === 'palette');
  const specialThemes = themes.filter(t => t.category === 'special');

  if (!isDevMode) return null;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full shadow-elevated bg-background/95 backdrop-blur-sm border-2 border-primary/20 hover:border-primary hover:scale-110 transition-all duration-300"
        >
          <Palette className="h-5 w-5 text-primary" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader className="pb-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Theme Settings
              </SheetTitle>
              <SheetDescription className="mt-1">
                Customize the look and feel of your website
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-12rem)] mt-4 pr-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
              <TabsTrigger value="brand" className="text-xs">Brand</TabsTrigger>
              <TabsTrigger value="palette" className="text-xs">Palette</TabsTrigger>
              <TabsTrigger value="special" className="text-xs">Special</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {/* Special Themes */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Original Theme
                </h3>
                <div className="grid gap-3">
                  {specialThemes.map(theme => (
                    <ThemeCard
                      key={theme.id}
                      theme={theme}
                      isActive={currentTheme === theme.id}
                      onSelect={() => setTheme(theme.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Brand Themes */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  Famous Cafe Brands
                </h3>
                <div className="grid gap-3">
                  {brandThemes.map(theme => (
                    <ThemeCard
                      key={theme.id}
                      theme={theme}
                      isActive={currentTheme === theme.id}
                      onSelect={() => setTheme(theme.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Palette Themes */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Coffee Palettes
                </h3>
                <div className="grid gap-3">
                  {paletteThemes.map(theme => (
                    <ThemeCard
                      key={theme.id}
                      theme={theme}
                      isActive={currentTheme === theme.id}
                      onSelect={() => setTheme(theme.id)}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="brand" className="space-y-3">
              {brandThemes.map(theme => (
                <ThemeCard
                  key={theme.id}
                  theme={theme}
                  isActive={currentTheme === theme.id}
                  onSelect={() => setTheme(theme.id)}
                />
              ))}
            </TabsContent>

            <TabsContent value="palette" className="space-y-3">
              {paletteThemes.map(theme => (
                <ThemeCard
                  key={theme.id}
                  theme={theme}
                  isActive={currentTheme === theme.id}
                  onSelect={() => setTheme(theme.id)}
                />
              ))}
            </TabsContent>

            <TabsContent value="special" className="space-y-3">
              {specialThemes.map(theme => (
                <ThemeCard
                  key={theme.id}
                  theme={theme}
                  isActive={currentTheme === theme.id}
                  onSelect={() => setTheme(theme.id)}
                />
              ))}
            </TabsContent>
          </Tabs>
        </ScrollArea>

        {/* Footer with Dev Mode Toggle */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-background">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Developer Mode</span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={toggleDevMode}
              className="text-destructive hover:text-destructive"
            >
              <X className="w-4 h-4 mr-1" />
              Disable
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ThemeSwitcher;
