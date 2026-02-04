import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Code2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

/**
 * A button to toggle developer mode - only visible to admins
 * When enabled, shows the theme switcher floating button
 */
const DevModeToggle = () => {
  const { isDevMode, toggleDevMode } = useTheme();
  const { isAdmin, isSubAdmin } = useAuth();

  // Only admins and sub-admins can toggle dev mode
  if (!isAdmin && !isSubAdmin) return null;

  return (
    <Button
      variant={isDevMode ? "default" : "outline"}
      size="sm"
      onClick={toggleDevMode}
      className="gap-2"
    >
      <Code2 className="w-4 h-4" />
      {isDevMode ? 'Dev Mode On' : 'Dev Mode Off'}
    </Button>
  );
};

export default DevModeToggle;
