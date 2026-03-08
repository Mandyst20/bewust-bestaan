import { PageBlock, HeroBlockData, TextBlockData, ImageBlockData, CTABlockData, TestimonialsBlockData, SpacerBlockData } from "@/lib/pageBlockTypes";

interface BlockRendererProps {
  block: PageBlock;
  isPreview?: boolean;
}

function HeroBlock({ data }: { data: HeroBlockData }) {
  return (
    <section
      className="flex flex-col items-center justify-center px-6 py-16"
      style={{
        minHeight: data.minHeight || '60vh',
        backgroundColor: data.backgroundColor || undefined,
        backgroundImage: data.backgroundImage ? `url(${data.backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: data.textColor || undefined,
        textAlign: data.alignment || 'center',
      }}
    >
      <div className="mx-auto max-w-4xl" style={{ textAlign: data.alignment }}>
        <h1 className="font-display text-4xl font-bold md:text-6xl">{data.title}</h1>
        {data.subtitle && <p className="mt-4 text-lg md:text-xl opacity-90">{data.subtitle}</p>}
        {data.showButton && data.buttonText && (
          <a
            href={data.buttonLink || '#'}
            className="mt-8 inline-block rounded-lg px-8 py-3 font-medium transition-smooth"
            style={{
              backgroundColor: data.textColor ? `${data.textColor}22` : 'rgba(255,255,255,0.2)',
              color: data.textColor || '#fff',
              border: `2px solid ${data.textColor || '#fff'}`,
            }}
          >
            {data.buttonText}
          </a>
        )}
      </div>
    </section>
  );
}

function TextBlock({ data }: { data: TextBlockData }) {
  const maxWidthClasses: Record<string, string> = {
    sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-3xl', xl: 'max-w-5xl', full: 'max-w-full',
  };
  const fontSizeClasses: Record<string, string> = {
    sm: 'text-sm', base: 'text-base', lg: 'text-lg', xl: 'text-xl', '2xl': 'text-2xl',
  };

  return (
    <section
      className="px-6 py-12"
      style={{ backgroundColor: data.backgroundColor || undefined, color: data.textColor || undefined }}
    >
      <div
        className={`mx-auto ${maxWidthClasses[data.maxWidth] || 'max-w-3xl'} ${fontSizeClasses[data.fontSize] || 'text-base'} leading-relaxed whitespace-pre-wrap`}
        style={{ textAlign: data.alignment || 'left' }}
      >
        {data.content}
      </div>
    </section>
  );
}

function ImageBlock({ data }: { data: ImageBlockData }) {
  const widthClasses: Record<string, string> = {
    sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-3xl', full: 'max-w-full',
  };

  if (!data.src) {
    return (
      <section className="px-6 py-8">
        <div className={`mx-auto ${widthClasses[data.width] || 'max-w-3xl'} flex h-48 items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted`}>
          <p className="text-muted-foreground">Voeg een afbeelding URL toe</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-8">
      <figure className={`mx-auto ${widthClasses[data.width] || 'max-w-3xl'}`}>
        <img
          src={data.src}
          alt={data.alt || ''}
          className={`w-full ${data.rounded ? 'rounded-2xl' : ''}`}
        />
        {data.caption && <figcaption className="mt-3 text-center text-sm text-muted-foreground">{data.caption}</figcaption>}
      </figure>
    </section>
  );
}

function CTABlock({ data }: { data: CTABlockData }) {
  return (
    <section
      className="px-6 py-16"
      style={{ backgroundColor: data.backgroundColor || undefined, color: data.textColor || undefined }}
    >
      <div className={`mx-auto max-w-4xl ${data.layout === 'side-by-side' ? 'flex flex-col items-center justify-between gap-6 md:flex-row' : 'text-center'}`}>
        <div className={data.layout === 'side-by-side' ? '' : ''}>
          <h2 className="font-display text-3xl font-bold">{data.title}</h2>
          {data.description && <p className="mt-3 text-lg opacity-90">{data.description}</p>}
        </div>
        <a
          href={data.buttonLink || '#'}
          className="mt-6 inline-block rounded-lg px-8 py-3 font-semibold transition-smooth"
          style={{
            backgroundColor: data.buttonColor || '#fff',
            color: data.backgroundColor || '#000',
          }}
        >
          {data.buttonText}
        </a>
      </div>
    </section>
  );
}

function TestimonialsBlock({ data }: { data: TestimonialsBlockData }) {
  return (
    <section
      className="px-6 py-16"
      style={{ backgroundColor: data.backgroundColor || undefined, color: data.textColor || undefined }}
    >
      <div className="mx-auto max-w-5xl">
        {data.title && <h2 className="mb-10 text-center font-display text-3xl font-bold">{data.title}</h2>}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.items?.map((item, i) => (
            <div key={i} className="rounded-2xl border border-border/50 bg-card/50 p-6">
              <p className="text-base italic leading-relaxed">"{item.text}"</p>
              <div className="mt-4">
                <p className="font-semibold">{item.name}</p>
                {item.role && <p className="text-sm opacity-70">{item.role}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpacerBlock({ data }: { data: SpacerBlockData }) {
  const heightMap: Record<string, string> = { sm: '2rem', md: '4rem', lg: '6rem', xl: '8rem' };
  return <div style={{ height: heightMap[data.height] || '4rem' }} />;
}

export function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.type) {
    case 'hero': return <HeroBlock data={block.data as HeroBlockData} />;
    case 'text': return <TextBlock data={block.data as TextBlockData} />;
    case 'image': return <ImageBlock data={block.data as ImageBlockData} />;
    case 'cta': return <CTABlock data={block.data as CTABlockData} />;
    case 'testimonials': return <TestimonialsBlock data={block.data as TestimonialsBlockData} />;
    case 'spacer': return <SpacerBlock data={block.data as SpacerBlockData} />;
    default: return <div className="p-4 text-muted-foreground">Onbekend blok type</div>;
  }
}
