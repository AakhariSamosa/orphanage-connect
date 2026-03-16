import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { TemplateSelector } from '@/components/templates/TemplateSelector';
import { TemplatePreview } from '@/components/templates/TemplatePreview';
import { sampleData, type TemplateVariant } from '@/components/templates/types';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Check, RotateCcw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function TemplateShowcase() {
  const { activeTemplate, applyTemplate } = useTheme();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateVariant>(activeTemplate || 'premium-dark');
  const [previewTemplate, setPreviewTemplate] = useState<TemplateVariant | null>(null);

  const isApplied = activeTemplate === selectedTemplate;

  const handleApply = () => {
    applyTemplate(selectedTemplate);
    toast({ title: 'Template Applied!', description: `The "${selectedTemplate.replace(/-/g, ' ')}" template is now active across the entire site.` });
  };

  const handleReset = () => {
    applyTemplate(null);
    toast({ title: 'Template Removed', description: 'Reverted to the default theme.' });
  };

  if (previewTemplate) {
    return (
      <TemplatePreview
        template={previewTemplate}
        data={sampleData}
        onClose={() => setPreviewTemplate(null)}
      />
    );
  }

  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="container-custom max-w-4xl">
          <AnimatedSection className="text-center mb-12">
            <span className="text-primary font-medium mb-2 block text-sm tracking-wider uppercase">Customization</span>
            <h1 className="heading-section mb-4">Landing Page Templates</h1>
            <p className="text-body max-w-2xl mx-auto">
              Choose a template to transform the entire website's look and feel instantly.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onSelect={setSelectedTemplate}
              onPreview={setPreviewTemplate}
            />
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <div className="flex items-center justify-center gap-4 mt-10">
              <Button
                size="lg"
                onClick={handleApply}
                disabled={isApplied}
                className="gap-2 min-w-[180px]"
              >
                <Check className="w-4 h-4" />
                {isApplied ? 'Currently Active' : 'Apply Template'}
              </Button>
              {activeTemplate && (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleReset}
                  className="gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset to Default
                </Button>
              )}
            </div>
            {activeTemplate && (
              <p className="text-center text-sm text-muted-foreground mt-3">
                Active template: <span className="font-semibold text-primary">{activeTemplate.replace(/-/g, ' ')}</span>
              </p>
            )}
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}
