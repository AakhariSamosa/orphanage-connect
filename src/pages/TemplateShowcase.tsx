import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { TemplateSelector } from '@/components/templates/TemplateSelector';
import { TemplatePreview } from '@/components/templates/TemplatePreview';
import { sampleData, type TemplateVariant } from '@/components/templates/types';
import { AnimatedSection } from '@/components/AnimatedSection';

export default function TemplateShowcase() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateVariant>('premium-dark');
  const [previewTemplate, setPreviewTemplate] = useState<TemplateVariant | null>(null);

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
              Choose a stunning template for your page. Each template is fully responsive with modern animations and effects.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onSelect={setSelectedTemplate}
              onPreview={setPreviewTemplate}
            />
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}
