import heroData from '@/data/hero.json';

export const Hero = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Gradient Accent */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top right, hsl(195 100% 50% / 0.2) 0%, transparent 50%)'
        }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 lg:px-16 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8">
            {/* Name Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-mono text-primary">Available for work</span>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold leading-tight tracking-tight">
                <span className="text-foreground">Hi, I'm </span>
                <span className="gradient-text">{heroData.name.split(' ')[0]}</span>
              </h1>
              <p className="text-2xl lg:text-3xl font-heading font-semibold text-muted-foreground">
                {heroData.title}
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed font-body">
              {heroData.description}
            </p>

            {/* Tech Highlights */}
            <div className="flex flex-wrap gap-3">
              {heroData.highlights.map((item, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-lg text-sm font-mono bg-muted text-foreground border border-border"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href={heroData.cta.primary.link}
                className="btn-glow"
              >
                {heroData.cta.primary.text}
              </a>
              <a
                href={heroData.cta.secondary.link}
                className="btn-outline"
              >
                {heroData.cta.secondary.text}
              </a>
            </div>
          </div>

          {/* Right: Visual Element */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-80 h-80">
              {/* Animated rings */}
              <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-pulse" />
              <div className="absolute inset-4 border border-primary/30 rounded-full" style={{ animationDelay: '0.5s' }} />
              <div className="absolute inset-8 border border-primary/40 rounded-full" />

              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-heading font-bold gradient-text">{'</>'}</div>
                  <div className="text-sm font-mono text-muted-foreground mt-2">Code & Create</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-muted-foreground tracking-widest">SCROLL</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </div>
  );
};
