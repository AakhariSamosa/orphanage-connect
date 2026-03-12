import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageUpload } from '@/components/ImageUpload';
import { useTheme, themes as themeList } from '@/contexts/ThemeContext';
import { Palette, Type, Image, Video, Save, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

interface PlatformSettings {
  platformLogo: string;
  platformName: string;
  textSizeScale: string;
  backgroundImageUrl: string;
  backgroundVideoUrl: string;
  backgroundOverlayOpacity: string;
}

const defaultSettings: PlatformSettings = {
  platformLogo: '/logo.png',
  platformName: 'Ashram Platform',
  textSizeScale: '100',
  backgroundImageUrl: '',
  backgroundVideoUrl: '',
  backgroundOverlayOpacity: '50',
};

export default function AdminPlatformSettings() {
  const { currentTheme, setTheme } = useTheme();
  const [settings, setSettings] = useState<PlatformSettings>(() => {
    const saved = localStorage.getItem('platform-settings');
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  });
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Apply text size
    const scale = parseInt(settings.textSizeScale) / 100;
    document.documentElement.style.fontSize = `${scale * 16}px`;

    // Apply background
    const body = document.body;
    if (settings.backgroundImageUrl) {
      body.style.backgroundImage = `url(${settings.backgroundImageUrl})`;
      body.style.backgroundSize = 'cover';
      body.style.backgroundAttachment = 'fixed';
      body.style.backgroundPosition = 'center';
    } else {
      body.style.backgroundImage = '';
    }
  }, [settings.textSizeScale, settings.backgroundImageUrl]);

  const handleSave = () => {
    localStorage.setItem('platform-settings', JSON.stringify(settings));
    // Dispatch custom event so Header picks up logo/name changes
    window.dispatchEvent(new CustomEvent('platform-settings-changed', { detail: settings }));
    toast.success('Platform settings saved!');
    setHasChanges(false);
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('platform-settings');
    document.documentElement.style.fontSize = '16px';
    document.body.style.backgroundImage = '';
    window.dispatchEvent(new CustomEvent('platform-settings-changed', { detail: defaultSettings }));
    toast.success('Settings reset to defaults');
    setHasChanges(false);
  };

  const updateField = (field: keyof PlatformSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Platform Settings</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button size="sm" onClick={handleSave} disabled={!hasChanges}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Theme Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Palette className="w-5 h-5 text-primary" />
            Theme
          </CardTitle>
          <CardDescription>Choose the color theme for the entire website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {themeList.map((theme) => (
              <button
                key={theme.id}
                onClick={() => { setTheme(theme.id); setHasChanges(true); }}
                className={`p-3 rounded-xl border-2 transition-all text-left ${
                  currentTheme === theme.id
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-border hover:border-primary/40'
                }`}
              >
                <div className="flex gap-1.5 mb-2">
                  <div className="w-6 h-6 rounded-md border" style={{ backgroundColor: theme.preview.primary }} />
                  <div className="w-6 h-6 rounded-md border" style={{ backgroundColor: theme.preview.secondary }} />
                  <div className="w-6 h-6 rounded-md border" style={{ backgroundColor: theme.preview.accent }} />
                </div>
                <p className="text-xs font-medium truncate">{theme.name}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Logo & Branding */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Image className="w-5 h-5 text-primary" />
            Logo & Branding
          </CardTitle>
          <CardDescription>Upload the main platform logo and set the display name</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Platform Name</Label>
            <Input
              value={settings.platformName}
              onChange={(e) => updateField('platformName', e.target.value)}
              placeholder="Enter platform name"
            />
          </div>
          <div>
            <Label>Platform Logo</Label>
            <ImageUpload
              onUpload={(url) => updateField('platformLogo', url)}
              currentImage={settings.platformLogo || null}
              folder="platform"
            />
          </div>
        </CardContent>
      </Card>

      {/* Text Size */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Type className="w-5 h-5 text-primary" />
            Text Size
          </CardTitle>
          <CardDescription>Adjust the base text size for the entire website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <Select
                value={settings.textSizeScale}
                onValueChange={(val) => updateField('textSizeScale', val)}
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="85">Small (85%)</SelectItem>
                  <SelectItem value="90">Compact (90%)</SelectItem>
                  <SelectItem value="95">Slightly Small (95%)</SelectItem>
                  <SelectItem value="100">Default (100%)</SelectItem>
                  <SelectItem value="105">Slightly Large (105%)</SelectItem>
                  <SelectItem value="110">Large (110%)</SelectItem>
                  <SelectItem value="115">Extra Large (115%)</SelectItem>
                  <SelectItem value="120">Very Large (120%)</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">
                Preview: <span style={{ fontSize: `${parseInt(settings.textSizeScale) / 100}rem` }}>Sample Text</span>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Background Media */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Video className="w-5 h-5 text-primary" />
            Background Media
          </CardTitle>
          <CardDescription>Add a background image or video to the website</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Background Image</Label>
            <ImageUpload
              onUpload={(url) => updateField('backgroundImageUrl', url)}
              currentImage={settings.backgroundImageUrl || null}
              folder="backgrounds"
            />
          </div>
          <div>
            <Label>Background Video URL</Label>
            <Input
              value={settings.backgroundVideoUrl}
              onChange={(e) => updateField('backgroundVideoUrl', e.target.value)}
              placeholder="Paste a video URL (MP4)"
            />
            <p className="text-xs text-muted-foreground mt-1">Paste a direct link to an MP4 video file</p>
          </div>
          {settings.backgroundVideoUrl && (
            <div className="rounded-lg overflow-hidden border">
              <video src={settings.backgroundVideoUrl} className="w-full h-32 object-cover" muted autoPlay loop playsInline />
            </div>
          )}
          <div>
            <Label>Overlay Opacity ({settings.backgroundOverlayOpacity}%)</Label>
            <input
              type="range"
              min="0"
              max="90"
              value={settings.backgroundOverlayOpacity}
              onChange={(e) => updateField('backgroundOverlayOpacity', e.target.value)}
              className="w-full accent-primary"
            />
            <p className="text-xs text-muted-foreground mt-1">Controls darkness of the overlay on background media for readability</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
