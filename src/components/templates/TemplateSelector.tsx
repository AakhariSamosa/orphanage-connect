import { Check, Eye, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { templateConfigs, type TemplateVariant } from './types';
import { cn } from '@/lib/utils';

interface TemplateSelectorProps {
  selectedTemplate: TemplateVariant;
  onSelect: (template: TemplateVariant) => void;
  onPreview: (template: TemplateVariant) => void;
}

export function TemplateSelector({ selectedTemplate, onSelect, onPreview }: TemplateSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Layout className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Landing Page Templates</h3>
          <p className="text-sm text-muted-foreground">Choose a template style for your page</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templateConfigs.map((template) => {
          const isSelected = selectedTemplate === template.id;
          return (
            <Card
              key={template.id}
              className={cn(
                'cursor-pointer transition-all duration-500 overflow-hidden group',
                isSelected
                  ? 'ring-2 ring-primary shadow-elevated'
                  : 'hover:shadow-card hover:-translate-y-1'
              )}
              onClick={() => onSelect(template.id)}
            >
              {/* Mini preview */}
              <div
                className="h-36 relative overflow-hidden"
                style={{ background: template.preview.bg }}
              >
                {/* Decorative elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="space-y-2.5 w-3/4">
                    <div
                      className="h-3 rounded-full w-1/2 opacity-90"
                      style={{ background: template.preview.accent }}
                    />
                    <div
                      className="h-2 rounded-full w-3/4 opacity-25"
                      style={{ background: template.preview.text }}
                    />
                    <div
                      className="h-2 rounded-full w-2/3 opacity-15"
                      style={{ background: template.preview.text }}
                    />
                    <div className="flex gap-2 pt-3">
                      <div
                        className="h-7 w-20 rounded-lg"
                        style={{ background: template.preview.accent }}
                      />
                      <div
                        className="h-7 w-20 rounded-lg border opacity-30"
                        style={{ borderColor: template.preview.text }}
                      />
                    </div>
                  </div>
                </div>

                {/* Selected badge */}
                {isSelected && (
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="backdrop-blur-md shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPreview(template.id);
                    }}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      {template.name}
                      {isSelected && (
                        <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">
                          Active
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
