export interface Cat { slug:string; title:string; desc:string; topics:string[]; info?:boolean }
export const IMAGES:string[] = ["https://images.unsplash.com/photo-1441974231531-c6227db76b6e", "https://images.unsplash.com/photo-1451187580459-43490279c0fa", "https://images.unsplash.com/photo-1485827404703-89b55fcc595e", "https://images.unsplash.com/photo-1504711434969-e33886168f5c", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", "https://images.unsplash.com/photo-1507413245164-6160d8298b31", "https://images.unsplash.com/photo-1518770660439-4636190af475", "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620", "https://images.unsplash.com/photo-1530026405186-ed1f139313f5", "https://images.unsplash.com/photo-1532375810709-75b1da00537c", "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf", "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e", "https://images.unsplash.com/photo-1551279076-6be5e5a5a9e2", "https://images.unsplash.com/photo-1555255707-c07966088b7b", "https://images.unsplash.com/photo-1559757148-5c350d0d3c56", "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3", "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9", "https://images.unsplash.com/photo-1620712943543-bcc4688e7485", "https://images.unsplash.com/photo-1642790551116-18e150f248e3", "https://images.unsplash.com/photo-1677442135703-1787eea5ce01"];
export const CATEGORIES:Cat[] = [
{
"slug": "latest",
"title": "Latest",
"desc": "Breaking stories as they happen.",
"topics": [
"Breaking",
"Overnight",
"Developing",
"Live"
]
},
{
"slug": "world",
"title": "World",
"desc": "Global news from every region.",
"topics": [
"Diplomacy",
"Conflict",
"Summit",
"Migration"
]
},
{
"slug": "technology",
"title": "Technology",
"desc": "Gadgets, software and the future of tech.",
"topics": [
"Chips",
"Robotics",
"Cloud",
"Wearables"
]
},
{
"slug": "business",
"title": "Business",
"desc": "Companies, deals and the global economy.",
"topics": [
"Mergers",
"Earnings",
"Supply chains",
"Retail"
]
},
{
"slug": "politics",
"title": "Politics",
"desc": "Governments, elections and policy.",
"topics": [
"Elections",
"Congress",
"Trade policy",
"Sanctions"
]
},
{
"slug": "ai",
"title": "AI",
"desc": "Artificial intelligence research and industry.",
"topics": [
"AGI",
"Language models",
"AI regulation",
"Robotics AI"
]
},
{
"slug": "markets",
"title": "Markets",
"desc": "Stocks, bonds, currencies and commodities.",
"topics": [
"Equities",
"Bonds",
"Oil",
"Gold"
]
},
{
"slug": "science",
"title": "Science",
"desc": "Discoveries from labs around the world.",
"topics": [
"Physics",
"Biology",
"Quantum",
"Materials"
]
},
{
"slug": "health",
"title": "Health & Medicine",
"desc": "Medical breakthroughs and public health.",
"topics": [
"Vaccines",
"Cancer research",
"Mental health",
"Longevity"
]
},
{
"slug": "sports",
"title": "Sports",
"desc": "Scores, transfers and highlights.",
"topics": [
"Football",
"Basketball",
"Tennis",
"Olympics"
]
},
{
"slug": "global-markets",
"title": "Global Markets",
"desc": "Cross-border capital and trade flows.",
"topics": [
"Emerging markets",
"Currencies",
"Central banks",
"Debt"
]
},
{
"slug": "startups",
"title": "Startups",
"desc": "Founders, funding and new ventures.",
"topics": [
"Seed rounds",
"Unicorns",
"Founders",
"Accelerators"
]
},
{
"slug": "crypto",
"title": "Crypto",
"desc": "Digital assets and blockchain.",
"topics": [
"Bitcoin",
"Ethereum",
"Regulation",
"DeFi"
]
},
{
"slug": "climate",
"title": "Climate Crisis",
"desc": "Climate science, policy and impact.",
"topics": [
"Emissions",
"COP summit",
"Heatwaves",
"Net zero"
]
},
{
"slug": "environment",
"title": "Environment",
"desc": "Nature, conservation and sustainability.",
"topics": [
"Oceans",
"Forests",
"Wildlife",
"Recycling"
]
},
{
"slug": "space",
"title": "Space",
"desc": "Exploration, launches and astronomy.",
"topics": [
"Starship",
"Mars",
"Moon missions",
"Telescopes"
]
},
{
"slug": "cybersecurity",
"title": "Cybersecurity",
"desc": "Hacks, threats and digital defense.",
"topics": [
"Ransomware",
"Data breaches",
"Zero-days",
"Encryption"
]
},
{
"slug": "social-media",
"title": "Social Media",
"desc": "Platforms, creators and online culture.",
"topics": [
"Platforms",
"Creators",
"Moderation",
"Algorithms"
]
},
{
"slug": "research",
"title": "Research",
"desc": "Studies and academic findings.",
"topics": [
"Peer review",
"Clinical trials",
"Funding",
"Open data"
]
},
{
"slug": "lifestyle",
"title": "Lifestyle",
"desc": "Culture, travel, food and living.",
"topics": [
"Travel",
"Food",
"Design",
"Wellness"
]
},
{
"slug": "middle-east",
"title": "Middle East",
"desc": "Reporting from the Middle East.",
"topics": [
"Gaza",
"Iran",
"Gulf states",
"Energy"
]
},
{
"slug": "africa",
"title": "Africa",
"desc": "Reporting from across Africa.",
"topics": [
"Elections",
"Trade",
"Climate",
"Tech hubs"
]
},
{
"slug": "asia-pacific",
"title": "Asia Pacific",
"desc": "Reporting from Asia and the Pacific.",
"topics": [
"China",
"Japan",
"India",
"ASEAN"
]
},
{
"slug": "north-america",
"title": "North America",
"desc": "United States, Canada and Mexico.",
"topics": [
"Washington",
"Canada",
"Mexico",
"Border"
]
},
{
"slug": "europe",
"title": "Europe",
"desc": "Reporting from across Europe.",
"topics": [
"EU",
"Ukraine",
"Energy",
"Elections"
]
},
{
"slug": "big-tech",
"title": "Big Tech",
"desc": "The largest technology companies.",
"topics": [
"Apple",
"Google",
"Microsoft",
"Antitrust"
]
},
{
"slug": "biodiversity",
"title": "Biodiversity",
"desc": "Species, ecosystems and conservation.",
"topics": [
"Extinction",
"Reefs",
"Rewilding",
"Pollinators"
]
},
{
"slug": "about",
"title": "About Asouva",
"desc": "Information about About Asouva.",
"topics": [],
"info": true
},
{
"slug": "newsletter",
"title": "Newsletter",
"desc": "Information about Newsletter.",
"topics": [],
"info": true
},
{
"slug": "mobile-app",
"title": "Mobile App",
"desc": "Information about Mobile App.",
"topics": [],
"info": true
},
{
"slug": "subscribe",
"title": "Subscribe",
"desc": "Information about Subscribe.",
"topics": [],
"info": true
},
{
"slug": "advertise",
"title": "Advertise",
"desc": "Information about Advertise.",
"topics": [],
"info": true
},
{
"slug": "contact",
"title": "Contact Us",
"desc": "Information about Contact Us.",
"topics": [],
"info": true
},
{
"slug": "privacy",
"title": "Privacy Policy",
"desc": "Information about Privacy Policy.",
"topics": [],
"info": true
},
{
"slug": "terms",
"title": "Terms of Use",
"desc": "Information about Terms of Use.",
"topics": [],
"info": true
}
];
export const PAGES:Record<string,string[]> = {"about": ["Asouva is a global news platform built around speed, clarity and AI-assisted understanding of the day's events.", "Our stories link back to the original reporting so readers can always check the source. Where we summarise, we say so.", "Asouva AI, in the chat drawer, helps readers ask questions about what they are reading."], "contact": ["Editorial tips and corrections: editorial@asouva.com", "Subscriptions and billing: support@asouva.com", "Advertising and partnerships: ads@asouva.com", "We aim to reply within two business days. (Replace these addresses with your real ones.)"], "privacy": ["This is a template Privacy Policy and must be reviewed by a lawyer before publication.", "We collect the minimum data needed to run Asouva: account details you provide, basic usage analytics and chat messages you send to Asouva AI.", "We do not sell personal data. You can request access to or deletion of your data by contacting privacy@asouva.com."], "terms": ["This is a template Terms of Use and must be reviewed by a lawyer before publication.", "By using Asouva you agree not to misuse the service, scrape it at scale or reproduce our content without permission.", "Summaries link to original sources, which remain the property of their publishers. Asouva AI answers may contain errors; verify important facts."], "newsletter": ["A short daily briefing with the top stories, delivered each morning.", "Newsletter sign-up is not connected yet. Add your email provider in this page's component."], "subscribe": ["Free: breaking news and 5 AI queries per day.", "Pro ($9/mo): unlimited AI queries and a personalised feed.", "Use the Subscribe button in the navbar to view all plans."], "advertise": ["Reach a global, news-focused audience with sponsored placements and newsletter slots.", "Contact ads@asouva.com for rates and formats."], "mobile-app": ["The Asouva mobile app is in development.", "Until then, the website is fully responsive on phones and tablets."]};
