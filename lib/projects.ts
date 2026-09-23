export type ProjectMaterial = { name: string; origin: string; finish: string; tone: string };
export type ProjectRoom = { name: string; image: string; caption: string };
export type Project = {
  slug: string;
  title: string;
  location: string;
  area: string;
  year: string;
  style: string;
  heroImage: string;
  summary: string;
  concept: string;
  story: string[];
  materials: ProjectMaterial[];
  rooms: ProjectRoom[];
};

export const projects: Project[] = [
  {
    slug: 'the-minimal-residence', title: 'The Minimal Residence', location: 'Juhu, Mumbai', area: '2,600 sq ft', year: '2025', style: 'Quiet minimalism',
    heroImage: 'photo-1600210492486-724fe5c67fb0', summary: 'A measured city home where light, proportion and a patient material palette do the quiet work.',
    concept: 'The project began with one question: what could the home feel like if every room had space to breathe? We opened the central plan, softened the threshold between living and dining, and let daylight become a material in its own right.',
    story: ['A pared-back palette asks for precision. Warm lime plaster shifts gently through the day; pale oak joinery brings continuity from the entrance to the private rooms. Rather than remove every trace of life, we made room for the pieces the family had collected over time.', 'Storage is integrated into the architecture, sightlines remain calm, and each light fitting earns its place. The result is minimal in appearance, but generous in the ways that matter: clear circulation, comfortable seating and a home that settles around its occupants.'],
    materials: [{ name: 'Lime plaster', origin: 'Artisan mixed', finish: 'Soft chalk matte', tone: '#ddd5c8' }, { name: 'White oak', origin: 'Responsibly sourced', finish: 'Natural oil · brushed', tone: '#ae8e6e' }, { name: 'Handloom linen', origin: 'Kutch, India', finish: 'Washed · undyed', tone: '#cfc8b9' }, { name: 'Bronze', origin: 'Moradabad, India', finish: 'Satin patina', tone: '#897353' }],
    rooms: [{ name: 'Living room', image: 'photo-1600607687939-ce8a6c25118c', caption: 'Low, generous seating keeps the view open to the full length of the room.' }, { name: 'Dining room', image: 'photo-1600566753086-00f18fb6b3ea', caption: 'A sculptural oak table sits beneath a quiet pool of warm light.' }, { name: 'Primary suite', image: 'photo-1600607687920-4e2a09cf159d', caption: 'Layered linen and integrated joinery bring softness to the private rooms.' }],
  },
  {
    slug: 'urban-penthouse', title: 'Urban Penthouse', location: 'Worli, Mumbai', area: '3,450 sq ft', year: '2025', style: 'Contemporary refinement',
    heroImage: 'photo-1600607687939-ce8a6c25118c', summary: 'A high-rise home composed around long views, confident lines and a softer relationship with the city.',
    concept: 'A penthouse can easily become a room with a view. Here, the view is the beginning, not the whole story. A long limestone spine organises the public rooms while bronze screens modulate light and create moments of privacy.',
    story: ['The original layout divided the best daylight between too many small rooms. We reworked the plan to bring living, dining and the study into one continuous sequence, with a tucked-away service route preserving the calm of the main space.', 'Walnut cabinetry gives the architecture a darker register, balanced by soft upholstery and pale stone. At dusk, cove lighting traces the ceiling and a collection of smaller lamps draws the room back toward an intimate scale.'],
    materials: [{ name: 'Limestone', origin: 'Kota, Rajasthan', finish: 'Honed · filled', tone: '#c7bdac' }, { name: 'American walnut', origin: 'Responsibly sourced', finish: 'Smoked · satin oil', tone: '#604838' }, { name: 'Bronze mesh', origin: 'Custom fabrication', finish: 'Dark patina', tone: '#776449' }, { name: 'Bouclé wool', origin: 'European mill', finish: 'Ivory loop', tone: '#ddd8ce' }],
    rooms: [{ name: 'View lounge', image: 'photo-1600607687644-c7171b42498f', caption: 'The seating arrangement follows the skyline while keeping conversation at its centre.' }, { name: 'Dining gallery', image: 'photo-1600210492486-724fe5c67fb0', caption: 'A continuous stone surface anchors the open-plan entertaining space.' }, { name: 'Private study', image: 'photo-1600607687920-4e2a09cf159d', caption: 'Bronze screening brings a sense of enclosure without closing off the light.' }],
  },
  {
    slug: 'the-earth-house', title: 'The Earth House', location: 'Coonoor, Tamil Nadu', area: '4,100 sq ft', year: '2024', style: 'Earth-led contemporary',
    heroImage: 'photo-1600566753086-00f18fb6b3ea', summary: 'A hillside retreat grounded in local stone, hand-worked timber and the changing light of the Nilgiris.',
    concept: 'Rather than impose a finished image on the hillside, the home takes its cues from the land. Rooms are arranged to follow the slope, with stone walls holding a steady thermal mass and openings framing specific views through the trees.',
    story: ['Local granite sets the base note, its irregular edges left legible where it meets smooth lime plaster. Oak and reclaimed teak temper the stone, while woven wool brings a softer layer to the rooms used through the cooler months.', 'The transition outside is deliberately gradual: a sheltered verandah, a stone threshold, then the garden. This sequence lets the house feel connected to its site in daily use, not only when the windows are open.'],
    materials: [{ name: 'Local granite', origin: 'Nilgiri foothills', finish: 'Split face · honed', tone: '#77736b' }, { name: 'Reclaimed teak', origin: 'Tamil Nadu', finish: 'Brushed · natural wax', tone: '#76583e' }, { name: 'Wool dhurrie', origin: 'Bhadohi, India', finish: 'Handwoven · undyed', tone: '#c5bba9' }, { name: 'Lime plaster', origin: 'Artisan mixed', finish: 'Earth white', tone: '#d8d0c2' }],
    rooms: [{ name: 'Garden room', image: 'photo-1600607687939-ce8a6c25118c', caption: 'Deep openings frame the garden and provide shade through the afternoon.' }, { name: 'Hearth lounge', image: 'photo-1600566753190-17f0baa2a6c3', caption: 'Stone and oak gather around the hearth for the cooler hill evenings.' }, { name: 'Guest room', image: 'photo-1600607687920-4e2a09cf159d', caption: 'Handwoven wool and timber keep the smaller room grounded and warm.' }],
  },
  {
    slug: 'modern-villa', title: 'Modern Villa', location: 'Alibaug, Maharashtra', area: '5,200 sq ft', year: '2024', style: 'Tropical modernism',
    heroImage: 'photo-1600607687920-4e2a09cf159d', summary: 'A coastal family villa that moves easily between shaded interiors, garden and open sky.',
    concept: 'The architecture is organised as a series of thresholds. A sheltered arrival opens to a double-height living space, then draws the eye through to the pool garden. Timber screens temper the western sun without losing the breeze.',
    story: ['The family wanted a house that could welcome a full table without feeling oversized on an ordinary day. Sliding panels allow the living and dining spaces to expand for gatherings, then settle back into a quieter rhythm.', 'Locally sourced stone continues from the entry into the garden, while teak ceilings add warmth to the shaded verandah. Planting is treated as part of the architecture, bringing privacy and a changing view to every principal room.'],
    materials: [{ name: 'Kandla stone', origin: 'Gujarat, India', finish: 'Brushed · exterior grade', tone: '#b4a48e' }, { name: 'Plantation teak', origin: 'Certified source', finish: 'Natural oil', tone: '#8b6544' }, { name: 'Linen canvas', origin: 'India', finish: 'Sun-washed', tone: '#ded6c7' }, { name: 'Aged brass', origin: 'Moradabad, India', finish: 'Living finish', tone: '#a58258' }],
    rooms: [{ name: 'Garden living', image: 'photo-1600210492486-724fe5c67fb0', caption: 'Wide openings dissolve the edge between the living room and the garden.' }, { name: 'Shaded verandah', image: 'photo-1600607687939-ce8a6c25118c', caption: 'A timber canopy creates a comfortable outdoor room throughout the day.' }, { name: 'Pool suite', image: 'photo-1600566753086-00f18fb6b3ea', caption: 'A restrained palette lets the water and planting carry the colour.' }],
  },
  {
    slug: 'luxury-apartment', title: 'Luxury Apartment', location: 'Bandra West, Mumbai', area: '2,200 sq ft', year: '2023', style: 'Collected contemporary',
    heroImage: 'photo-1600607687644-c7171b42498f', summary: 'A deeply personal city apartment where heirlooms, art and quiet modern detailing find a shared language.',
    concept: 'The brief was not to start over, but to make a new home for a growing collection. We used a warm architectural envelope as a steady backdrop, then built the interior around objects with a history and furniture made to fit the apartment precisely.',
    story: ['Existing stone flooring was restored rather than replaced. New joinery in smoked oak conceals the practical layers of city living, leaving the collected pieces visible and the rooms unburdened.', 'A considered lighting plan gives the art its own presence while maintaining a welcoming ambient layer. The apartment feels composed, but never staged; the materials are allowed to age and the rooms are designed to be used.'],
    materials: [{ name: 'Existing Italian marble', origin: 'Restored in place', finish: 'Re-honed · sealed', tone: '#d4d0c7' }, { name: 'Smoked oak', origin: 'Responsibly sourced', finish: 'Brushed · oil wax', tone: '#725b48' }, { name: 'Velvet', origin: 'Indian mill', finish: 'Olive · matte', tone: '#77745d' }, { name: 'Antique brass', origin: 'Moradabad, India', finish: 'Hand patinated', tone: '#a1845e' }],
    rooms: [{ name: 'Collected living room', image: 'photo-1600607687939-ce8a6c25118c', caption: 'Art and collected objects are given generous breathing room.' }, { name: 'Library dining', image: 'photo-1600607687920-4e2a09cf159d', caption: 'A joinery wall brings books and dining into one intimate setting.' }, { name: 'Guest suite', image: 'photo-1600566753086-00f18fb6b3ea', caption: 'Olive velvet and tactile plaster make a calm contrast to the stone.' }],
  },
  {
    slug: 'contemporary-office', title: 'Contemporary Office', location: 'Fort, Mumbai', area: '6,800 sq ft', year: '2025', style: 'Quietly collaborative',
    heroImage: 'photo-1497366754035-f200968a6e72', summary: 'A studio workplace designed for focused work, chance conversation and a more human pace.',
    concept: 'The office is conceived as a neighbourhood rather than a floor of desks. A clear circulation loop links focused work rooms, shared tables and informal meeting spaces, making collaboration available without making it compulsory.',
    story: ['We retained the generous volume of the existing commercial shell and used a lighter touch to organise it. Oak-framed glazed partitions bring daylight deeper into the plan, while acoustic felt and soft furnishings absorb the energy of a busy studio.', 'A central material library doubles as a shared point of reference. Beyond it, smaller rooms offer quiet for concentrated work and calls. Each setting has its own lighting character, but the restrained palette keeps the whole office coherent.'],
    materials: [{ name: 'FSC oak veneer', origin: 'Certified source', finish: 'Natural matte', tone: '#ad8b67' }, { name: 'Recycled felt', origin: 'Post-consumer fibre', finish: 'Warm grey', tone: '#85847e' }, { name: 'Terrazzo', origin: 'Custom aggregate', finish: 'Honed', tone: '#c8c0b2' }, { name: 'Powder-coated steel', origin: 'Local fabrication', finish: 'Matte black', tone: '#343532' }],
    rooms: [{ name: 'Project studio', image: 'photo-1497366754035-f200968a6e72', caption: 'Shared work tables sit close to daylight and the studio library.' }, { name: 'Material library', image: 'photo-1497366811353-6870744d04b2', caption: 'An open archive makes samples part of the daily working process.' }, { name: 'Quiet room', image: 'photo-1497366216548-37526070297c', caption: 'Acoustic surfaces and adjustable light offer a softer place to focus.' }],
  },
];
