import type { Config } from "tailwindcss";

const config: Config = {
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			// ── Atlas named tokens (source: docs/design system/atlas/atlas.css :root) ──
  			bg: 'var(--bg)',
  			'bg-2': 'var(--bg-2)',
  			surface: 'var(--surface)',
  			ink: {
  				DEFAULT: 'var(--ink)',
  				2: 'var(--ink-2)'
  			},
  			soft: {
  				DEFAULT: 'var(--soft)',
  				2: 'var(--soft-2)'
  			},
  			line: 'var(--line)',
  			green: {
  				DEFAULT: 'var(--green)',
  				d: 'var(--green-d)',
  				soft: 'var(--green-soft)'
  			},
  			clay: {
  				DEFAULT: 'var(--clay)',
  				soft: 'var(--clay-soft)'
  			},
  			// ── Existing shadcn semantic tokens (remapped to Atlas in globals.css) ──
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				'50': '#eff6ff',
  				'100': '#dbeafe',
  				'200': '#bfdbfe',
  				'300': '#93c5fd',
  				'400': '#60a5fa',
  				'500': '#3b82f6',
  				'600': '#2563eb',
  				'700': '#1d4ed8',
  				'800': '#1e40af',
  				'900': '#1e3a8a',
  				'950': '#172554',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			accent: {
  				'50': '#fff7ed',
  				'100': '#ffedd5',
  				'200': '#fed7aa',
  				'300': '#fdba74',
  				'400': '#fb923c',
  				'500': '#f97316',
  				'600': '#ea580c',
  				'700': '#c2410c',
  				'800': '#9a3412',
  				'900': '#7c2d12',
  				'950': '#431407',
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			neutral: {
  				'50': '#f8fafc',
  				'100': '#f1f5f9',
  				'200': '#e2e8f0',
  				'300': '#cbd5e1',
  				'400': '#94a3b8',
  				'500': '#64748b',
  				'600': '#475569',
  				'700': '#334155',
  				'800': '#1e293b',
  				'900': '#0f172a',
  				'950': '#020617',
  				DEFAULT: '#64748b'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			success: {
  				DEFAULT: 'hsl(var(--success))',
  				foreground: 'hsl(var(--success-foreground))'
  			},
  			badge: {
  				amazon: {
  					bg: 'hsl(var(--badge-amazon-bg))',
  					text: 'hsl(var(--badge-amazon-text))'
  				},
  				etsy: {
  					bg: 'hsl(var(--badge-etsy-bg))',
  					text: 'hsl(var(--badge-etsy-text))'
  				}
  			}
  		},
  		fontFamily: {
  			// Atlas text font (Hanken Grotesk)
  			sans: [
  				'var(--font-sans)',
  				'system-ui',
  				'sans-serif'
  			],
  			// Atlas display font (Space Grotesk) — headings, buttons, eyebrows
  			disp: [
  				'var(--font-display)',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		borderRadius: {
  			DEFAULT: '0.5rem',
  			lg: 'var(--radius)',
  			xl: '1rem',
  			'2xl': '1.5rem',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		// Atlas elevation tokens
  		boxShadow: {
  			'sh-sm': 'var(--sh-sm)',
  			'sh-md': 'var(--sh-md)',
  			'sh-lg': 'var(--sh-lg)'
  		},
  		// Atlas container width
  		maxWidth: {
  			wrap: 'var(--maxw)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			// Atlas marquee scroll (atlas.css:129) — translate the duplicated
  			// track by -50% so the seamless loop point aligns.
  			scrollx: {
  				to: {
  					transform: 'translateX(-50%)'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			marquee: 'scrollx 32s linear infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
