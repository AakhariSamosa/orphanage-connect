import { X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PremiumDarkTemplate } from './PremiumDarkTemplate';
import { ModernProductTemplate } from './ModernProductTemplate';
import { MinimalPortfolioTemplate } from './MinimalPortfolioTemplate';
import { CreativeAgencyTemplate } from './CreativeAgencyTemplate';
import { sampleData, type TemplateVariant, type TemplateData } from './types';

interface TemplatePreviewProps {
  template: TemplateVariant;
  data?: TemplateData;
  onClose: () => void;
}

export function TemplatePreview({ template, data = sampleData, onClose }: TemplatePreviewProps) {
  const renderTemplate = () => {
    switch (template) {
      case 'premium-dark': return <PremiumDarkTemplate data={data} />;
      case 'modern-product': return <ModernProductTemplate data={data} />;
      case 'minimal-portfolio': return <MinimalPortfolioTemplate data={data} />;
      case 'creative-agency': return <CreativeAgencyTemplate data={data} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-auto">
      {/* Sticky close bar */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onClose} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Settings
        </Button>
        <span className="text-sm text-muted-foreground font-medium">
          Preview: {template.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </span>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>
      {renderTemplate()}
    </div>
  );
}
