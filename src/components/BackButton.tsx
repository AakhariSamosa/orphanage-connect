import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on root/landing pages
  if (location.pathname === '/' || location.pathname === '') return null;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => navigate(-1)}
      className="gap-2 text-muted-foreground hover:text-foreground mb-2"
    >
      <ArrowLeft className="w-4 h-4" />
      Back
    </Button>
  );
}
