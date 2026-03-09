import { PageBlock, BlockType, HeroBlockData, TextBlockData, ImageBlockData, CTABlockData, TestimonialsBlockData, SpacerBlockData, VideoBlockData, FAQBlockData, FAQItem, PricingBlockData, PricingTier, TestimonialItem } from "@/lib/pageBlockTypes";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImageUpload } from "./ImageUpload";

interface BlockPropertyPanelProps {
  block: PageBlock;
  onChange: (block: PageBlock) => void;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <Field label={label}>
      <div className="flex gap-2">
        <input type="color" value={value || '#000000'} onChange={e => onChange(e.target.value)} className="h-9 w-9 cursor-pointer rounded border border-input" />
        <Input value={value} onChange={e => onChange(e.target.value)} placeholder="#000000" className="flex-1 text-xs" />
      </div>
    </Field>
  );
}

function HeroProperties({ data, onChange }: { data: HeroBlockData; onChange: (d: HeroBlockData) => void }) {
  const update = (partial: Partial<HeroBlockData>) => onChange({ ...data, ...partial });
  return (
    <div className="space-y-4">
      <Field label="Titel"><Input value={data.title} onChange={e => update({ title: e.target.value })} /></Field>
      <Field label="Subtitel"><Input value={data.subtitle} onChange={e => update({ subtitle: e.target.value })} /></Field>
      <ImageUpload label="Achtergrond afbeelding" value={data.backgroundImage} onChange={v => update({ backgroundImage: v })} />
      <ColorField label="Achtergrondkleur" value={data.backgroundColor} onChange={v => update({ backgroundColor: v })} />
      <ColorField label="Tekstkleur" value={data.textColor} onChange={v => update({ textColor: v })} />
      <Field label="Uitlijning">
        <Select value={data.alignment} onValueChange={v => update({ alignment: v as any })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Links</SelectItem>
            <SelectItem value="center">Midden</SelectItem>
            <SelectItem value="right">Rechts</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field label="Minimale hoogte"><Input value={data.minHeight} onChange={e => update({ minHeight: e.target.value })} placeholder="60vh" /></Field>
      <div className="flex items-center justify-between">
        <Label className="text-xs text-muted-foreground">Toon knop</Label>
        <Switch checked={data.showButton} onCheckedChange={v => update({ showButton: v })} />
      </div>
      {data.showButton && (
        <>
          <Field label="Knoptekst"><Input value={data.buttonText} onChange={e => update({ buttonText: e.target.value })} /></Field>
          <Field label="Knop link"><Input value={data.buttonLink} onChange={e => update({ buttonLink: e.target.value })} /></Field>
        </>
      )}
    </div>
  );
}

function TextProperties({ data, onChange }: { data: TextBlockData; onChange: (d: TextBlockData) => void }) {
  const update = (partial: Partial<TextBlockData>) => onChange({ ...data, ...partial });
  return (
    <div className="space-y-4">
      <Field label="Tekst"><Textarea value={data.content} onChange={e => update({ content: e.target.value })} rows={6} /></Field>
      <Field label="Uitlijning">
        <Select value={data.alignment} onValueChange={v => update({ alignment: v as any })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Links</SelectItem>
            <SelectItem value="center">Midden</SelectItem>
            <SelectItem value="right">Rechts</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field label="Tekstgrootte">
        <Select value={data.fontSize} onValueChange={v => update({ fontSize: v as any })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="sm">Klein</SelectItem>
            <SelectItem value="base">Normaal</SelectItem>
            <SelectItem value="lg">Groot</SelectItem>
            <SelectItem value="xl">Extra groot</SelectItem>
            <SelectItem value="2xl">Kop</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field label="Max breedte">
        <Select value={data.maxWidth} onValueChange={v => update({ maxWidth: v as any })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="sm">Klein</SelectItem>
            <SelectItem value="md">Medium</SelectItem>
            <SelectItem value="lg">Groot</SelectItem>
            <SelectItem value="xl">Extra groot</SelectItem>
            <SelectItem value="full">Volledig</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <ColorField label="Tekstkleur" value={data.textColor} onChange={v => update({ textColor: v })} />
      <ColorField label="Achtergrondkleur" value={data.backgroundColor} onChange={v => update({ backgroundColor: v })} />
    </div>
  );
}

function ImageProperties({ data, onChange }: { data: ImageBlockData; onChange: (d: ImageBlockData) => void }) {
  const update = (partial: Partial<ImageBlockData>) => onChange({ ...data, ...partial });
  return (
    <div className="space-y-4">
      <ImageUpload label="Afbeelding" value={data.src} onChange={v => update({ src: v })} />
      <Field label="Alt tekst"><Input value={data.alt} onChange={e => update({ alt: e.target.value })} /></Field>
      <Field label="Breedte">
        <Select value={data.width} onValueChange={v => update({ width: v as any })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="sm">Klein</SelectItem>
            <SelectItem value="md">Medium</SelectItem>
            <SelectItem value="lg">Groot</SelectItem>
            <SelectItem value="full">Volledig</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <div className="flex items-center justify-between">
        <Label className="text-xs text-muted-foreground">Afgeronde hoeken</Label>
        <Switch checked={data.rounded} onCheckedChange={v => update({ rounded: v })} />
      </div>
      <Field label="Bijschrift"><Input value={data.caption} onChange={e => update({ caption: e.target.value })} /></Field>
    </div>
  );
}

function CTAProperties({ data, onChange }: { data: CTABlockData; onChange: (d: CTABlockData) => void }) {
  const update = (partial: Partial<CTABlockData>) => onChange({ ...data, ...partial });
  return (
    <div className="space-y-4">
      <Field label="Titel"><Input value={data.title} onChange={e => update({ title: e.target.value })} /></Field>
      <Field label="Beschrijving"><Textarea value={data.description} onChange={e => update({ description: e.target.value })} rows={3} /></Field>
      <Field label="Knoptekst"><Input value={data.buttonText} onChange={e => update({ buttonText: e.target.value })} /></Field>
      <Field label="Knop link"><Input value={data.buttonLink} onChange={e => update({ buttonLink: e.target.value })} /></Field>
      <Field label="Layout">
        <Select value={data.layout} onValueChange={v => update({ layout: v as any })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="centered">Gecentreerd</SelectItem>
            <SelectItem value="side-by-side">Naast elkaar</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <ColorField label="Achtergrondkleur" value={data.backgroundColor} onChange={v => update({ backgroundColor: v })} />
      <ColorField label="Tekstkleur" value={data.textColor} onChange={v => update({ textColor: v })} />
      <ColorField label="Knopkleur" value={data.buttonColor} onChange={v => update({ buttonColor: v })} />
    </div>
  );
}

function TestimonialsProperties({ data, onChange }: { data: TestimonialsBlockData; onChange: (d: TestimonialsBlockData) => void }) {
  const update = (partial: Partial<TestimonialsBlockData>) => onChange({ ...data, ...partial });
  const updateItem = (index: number, partial: Partial<TestimonialItem>) => {
    const items = [...data.items];
    items[index] = { ...items[index], ...partial };
    update({ items });
  };
  const addItem = () => update({ items: [...data.items, { name: '', text: '', role: '' }] });
  const removeItem = (index: number) => update({ items: data.items.filter((_, i) => i !== index) });

  return (
    <div className="space-y-4">
      <Field label="Titel"><Input value={data.title} onChange={e => update({ title: e.target.value })} /></Field>
      <ColorField label="Achtergrondkleur" value={data.backgroundColor} onChange={v => update({ backgroundColor: v })} />
      <ColorField label="Tekstkleur" value={data.textColor} onChange={v => update({ textColor: v })} />
      <div className="space-y-3">
        <Label className="text-xs font-medium text-muted-foreground">Testimonials</Label>
        {data.items.map((item, i) => (
          <div key={i} className="space-y-2 rounded-lg border border-border p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">#{i + 1}</span>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeItem(i)}><Trash2 className="h-3 w-3" /></Button>
            </div>
            <Input value={item.name} onChange={e => updateItem(i, { name: e.target.value })} placeholder="Naam" className="text-xs" />
            <Input value={item.role} onChange={e => updateItem(i, { role: e.target.value })} placeholder="Rol / functie" className="text-xs" />
            <Textarea value={item.text} onChange={e => updateItem(i, { text: e.target.value })} placeholder="Tekst" rows={2} className="text-xs" />
          </div>
        ))}
        <Button variant="outline" size="sm" className="w-full" onClick={addItem}><Plus className="mr-1 h-3 w-3" />Toevoegen</Button>
      </div>
    </div>
  );
}

function SpacerProperties({ data, onChange }: { data: SpacerBlockData; onChange: (d: SpacerBlockData) => void }) {
  return (
    <Field label="Hoogte">
      <Select value={data.height} onValueChange={v => onChange({ ...data, height: v as any })}>
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="sm">Klein (2rem)</SelectItem>
          <SelectItem value="md">Medium (4rem)</SelectItem>
          <SelectItem value="lg">Groot (6rem)</SelectItem>
          <SelectItem value="xl">Extra groot (8rem)</SelectItem>
        </SelectContent>
      </Select>
    </Field>
  );
}

function VideoProperties({ data, onChange }: { data: VideoBlockData; onChange: (d: VideoBlockData) => void }) {
  const update = (partial: Partial<VideoBlockData>) => onChange({ ...data, ...partial });
  return (
    <div className="space-y-4">
      <Field label="Video URL (YouTube/Vimeo)"><Input value={data.url} onChange={e => update({ url: e.target.value })} placeholder="https://youtube.com/watch?v=..." /></Field>
      <Field label="Titel"><Input value={data.title} onChange={e => update({ title: e.target.value })} /></Field>
      <Field label="Max breedte">
        <Select value={data.maxWidth} onValueChange={v => update({ maxWidth: v as any })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="sm">Klein</SelectItem>
            <SelectItem value="md">Medium</SelectItem>
            <SelectItem value="lg">Groot</SelectItem>
            <SelectItem value="xl">Extra groot</SelectItem>
            <SelectItem value="full">Volledig</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <div className="flex items-center justify-between">
        <Label className="text-xs text-muted-foreground">Autoplay</Label>
        <Switch checked={data.autoplay} onCheckedChange={v => update({ autoplay: v })} />
      </div>
      <div className="flex items-center justify-between">
        <Label className="text-xs text-muted-foreground">Gedempt</Label>
        <Switch checked={data.muted} onCheckedChange={v => update({ muted: v })} />
      </div>
      <ColorField label="Achtergrondkleur" value={data.backgroundColor} onChange={v => update({ backgroundColor: v })} />
    </div>
  );
}

function FAQProperties({ data, onChange }: { data: FAQBlockData; onChange: (d: FAQBlockData) => void }) {
  const update = (partial: Partial<FAQBlockData>) => onChange({ ...data, ...partial });
  const updateItem = (index: number, partial: Partial<FAQItem>) => {
    const items = [...data.items];
    items[index] = { ...items[index], ...partial };
    update({ items });
  };
  const addItem = () => update({ items: [...data.items, { question: '', answer: '' }] });
  const removeItem = (index: number) => update({ items: data.items.filter((_, i) => i !== index) });

  return (
    <div className="space-y-4">
      <Field label="Titel"><Input value={data.title} onChange={e => update({ title: e.target.value })} /></Field>
      <ColorField label="Achtergrondkleur" value={data.backgroundColor} onChange={v => update({ backgroundColor: v })} />
      <ColorField label="Tekstkleur" value={data.textColor} onChange={v => update({ textColor: v })} />
      <Field label="Max breedte">
        <Select value={data.maxWidth} onValueChange={v => update({ maxWidth: v as any })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="sm">Klein</SelectItem>
            <SelectItem value="md">Medium</SelectItem>
            <SelectItem value="lg">Groot</SelectItem>
            <SelectItem value="xl">Extra groot</SelectItem>
            <SelectItem value="full">Volledig</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <div className="space-y-3">
        <Label className="text-xs font-medium text-muted-foreground">Vragen & Antwoorden</Label>
        {data.items.map((item, i) => (
          <div key={i} className="space-y-2 rounded-lg border border-border p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">#{i + 1}</span>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeItem(i)}><Trash2 className="h-3 w-3" /></Button>
            </div>
            <Input value={item.question} onChange={e => updateItem(i, { question: e.target.value })} placeholder="Vraag" className="text-xs" />
            <Textarea value={item.answer} onChange={e => updateItem(i, { answer: e.target.value })} placeholder="Antwoord" rows={2} className="text-xs" />
          </div>
        ))}
        <Button variant="outline" size="sm" className="w-full" onClick={addItem}><Plus className="mr-1 h-3 w-3" />Vraag toevoegen</Button>
      </div>
    </div>
  );
}

function PricingProperties({ data, onChange }: { data: PricingBlockData; onChange: (d: PricingBlockData) => void }) {
  const update = (partial: Partial<PricingBlockData>) => onChange({ ...data, ...partial });
  const updateTier = (index: number, partial: Partial<PricingTier>) => {
    const tiers = [...data.tiers];
    tiers[index] = { ...tiers[index], ...partial };
    update({ tiers });
  };
  const addTier = () => update({
    tiers: [...data.tiers, {
      name: 'Nieuw plan',
      price: '€0',
      description: '',
      features: ['Feature 1'],
      buttonText: 'Kies dit plan',
      buttonLink: '#',
      highlighted: false,
    }],
  });
  const removeTier = (index: number) => update({ tiers: data.tiers.filter((_, i) => i !== index) });
  const updateFeature = (tierIdx: number, featIdx: number, value: string) => {
    const tiers = [...data.tiers];
    const features = [...tiers[tierIdx].features];
    features[featIdx] = value;
    tiers[tierIdx] = { ...tiers[tierIdx], features };
    update({ tiers });
  };
  const addFeature = (tierIdx: number) => {
    const tiers = [...data.tiers];
    tiers[tierIdx] = { ...tiers[tierIdx], features: [...tiers[tierIdx].features, ''] };
    update({ tiers });
  };
  const removeFeature = (tierIdx: number, featIdx: number) => {
    const tiers = [...data.tiers];
    tiers[tierIdx] = { ...tiers[tierIdx], features: tiers[tierIdx].features.filter((_, i) => i !== featIdx) };
    update({ tiers });
  };

  return (
    <div className="space-y-4">
      <Field label="Titel"><Input value={data.title} onChange={e => update({ title: e.target.value })} /></Field>
      <Field label="Subtitel"><Input value={data.subtitle} onChange={e => update({ subtitle: e.target.value })} /></Field>
      <ColorField label="Achtergrondkleur" value={data.backgroundColor} onChange={v => update({ backgroundColor: v })} />
      <ColorField label="Tekstkleur" value={data.textColor} onChange={v => update({ textColor: v })} />
      <div className="space-y-3">
        <Label className="text-xs font-medium text-muted-foreground">Prijsplannen</Label>
        {data.tiers.map((tier, i) => (
          <div key={i} className="space-y-2 rounded-lg border border-border p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">{tier.name || `Plan ${i + 1}`}</span>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeTier(i)}><Trash2 className="h-3 w-3" /></Button>
            </div>
            <Input value={tier.name} onChange={e => updateTier(i, { name: e.target.value })} placeholder="Naam" className="text-xs" />
            <Input value={tier.price} onChange={e => updateTier(i, { price: e.target.value })} placeholder="€19/mnd" className="text-xs" />
            <Input value={tier.description} onChange={e => updateTier(i, { description: e.target.value })} placeholder="Beschrijving" className="text-xs" />
            <Input value={tier.buttonText} onChange={e => updateTier(i, { buttonText: e.target.value })} placeholder="Knoptekst" className="text-xs" />
            <Input value={tier.buttonLink} onChange={e => updateTier(i, { buttonLink: e.target.value })} placeholder="Link" className="text-xs" />
            <div className="flex items-center justify-between">
              <Label className="text-[10px] text-muted-foreground">Uitgelicht</Label>
              <Switch checked={tier.highlighted} onCheckedChange={v => updateTier(i, { highlighted: v })} />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground">Features</Label>
              {tier.features.map((f, fi) => (
                <div key={fi} className="flex gap-1">
                  <Input value={f} onChange={e => updateFeature(i, fi, e.target.value)} className="text-xs flex-1" />
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => removeFeature(i, fi)}><Trash2 className="h-3 w-3" /></Button>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full text-[10px] h-7" onClick={() => addFeature(i)}><Plus className="mr-1 h-3 w-3" />Feature</Button>
            </div>
          </div>
        ))}
        <Button variant="outline" size="sm" className="w-full" onClick={addTier}><Plus className="mr-1 h-3 w-3" />Plan toevoegen</Button>
      </div>
    </div>
  );
}

export function BlockPropertyPanel({ block, onChange }: BlockPropertyPanelProps) {
  const updateData = (newData: any) => onChange({ ...block, data: newData });

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        {block.type === 'hero' && <HeroProperties data={block.data as HeroBlockData} onChange={updateData} />}
        {block.type === 'text' && <TextProperties data={block.data as TextBlockData} onChange={updateData} />}
        {block.type === 'image' && <ImageProperties data={block.data as ImageBlockData} onChange={updateData} />}
        {block.type === 'cta' && <CTAProperties data={block.data as CTABlockData} onChange={updateData} />}
        {block.type === 'testimonials' && <TestimonialsProperties data={block.data as TestimonialsBlockData} onChange={updateData} />}
        {block.type === 'spacer' && <SpacerProperties data={block.data as SpacerBlockData} onChange={updateData} />}
        {block.type === 'video' && <VideoProperties data={block.data as VideoBlockData} onChange={updateData} />}
        {block.type === 'faq' && <FAQProperties data={block.data as FAQBlockData} onChange={updateData} />}
        {block.type === 'pricing' && <PricingProperties data={block.data as PricingBlockData} onChange={updateData} />}
      </div>
    </ScrollArea>
  );
}
