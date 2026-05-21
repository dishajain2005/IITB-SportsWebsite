export type BlogPost = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
  tags: string[];
  imageText: string;
  featured?: boolean;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    category: 'Featured Story',
    title: 'Lakshya Sen Electrifies IIT Bombay',
    excerpt: "The campus was buzzing as we had the incredible opportunity to host one of India's finest badminton players for an electrifying session. The event delivered on its promise of speed, precision, and power — 500+ attendees witnessed greatness on our own court.",
    content: `
      <p>The air in the New SAC Indoor Hall was thick with anticipation. Even before the clock struck five, the stands were packed with students, faculty, and local enthusiasts, all waiting for a glimpse of the man who has redefined Indian badminton on the global stage: Lakshya Sen.</p>
      
      <p>As he stepped onto the court, a roar erupted that could likely be heard across the entire campus. But the noise quickly faded into a focused silence as Lakshya began his warm-up. Every stroke was a masterclass in economy of motion—minimum effort for maximum devastating effect.</p>
      
      <h3>The Exhibition Match</h3>
      <p>The highlight of the evening was an exhibition match between Lakshya and our own Inter-IIT team captain. While the difference in professional level was evident, the rally intensity was staggering. Lakshya showcased his signature defensive retrievals and that lightning-fast smash that has troubled even the world's top seeds.</p>
      
      <blockquote>"The energy here at IIT Bombay is incredible. It's heartening to see so much passion for sports in an institute known for its academic rigor. Sports and academics are two sides of the same coin of excellence." — Lakshya Sen</blockquote>
      
      <h3>Inspiring the Next Generation</h3>
      <p>Following the match, Lakshya spent nearly an hour in a candid Q&A session. He spoke about the mental fortitude required at the highest level, his recovery routines, and the sacrifice involved in representing the nation. For the hundreds of students present, it wasn't just about watching a star; it was about understanding the discipline required to reach the pinnacle of any field.</p>
      
      <p>As the event concluded with a commemorative plaque presentation by the Dean of Student Affairs, the impact was clear. The "Lakshya Effect" had taken root at IIT Bombay, leaving us inspired to push our limits on and off the court.</p>
    `,
    image: '/149487696.1535742278.webp',
    date: 'September 18, 2024',
    readTime: '6 min read',
    author: 'Sports Council Media',
    tags: ['Badminton', 'Campus Event', 'Inter-IIT'],
    imageText: 'BADMINTON',
    featured: true
  },
  {
    id: '2',
    category: 'Tournament Report',
    title: 'Inter-Hostel Football Showdown',
    excerpt: 'The annual hostel championship returned with record participation across all 14 hostels. Finals went into penalty shootout.',
    content: `
      <p>The rain didn't dampen the spirits; it only added to the drama. The 2024 Inter-Hostel Football General Championship reached its fever pitch this weekend at the Main Ground.</p>
      <p>Hostel 8 and Hostel 3 faced off in a final that will be talked about for semesters to come...</p>
    `,
    image: '/france_v_united_states_mens_football_olympic_games_paris_2024_day_2_021cda8c42.jpg',
    date: 'May 12, 2024',
    readTime: '4 min read',
    author: 'Football Council',
    tags: ['Football', 'GC', 'Inter-Hostel'],
    imageText: 'FOOTBALL'
  },
  {
    id: '3',
    category: 'August 2024',
    title: 'UG Sports Orientation',
    excerpt: 'The new undergraduate batch was officially welcomed to the vibrant world of IITB sports.',
    content: `
      <p>Welcoming the freshers to the sports culture of IIT Bombay...</p>
    `,
    image: '/Athletics.jpg',
    date: 'August 2024',
    readTime: '3 min read',
    author: 'BlackCats Media',
    tags: ['Orientation', 'BlackCats'],
    imageText: 'RUNNING'
  },
  {
    id: '4',
    category: 'July 2024',
    title: 'PG Mania 2025',
    excerpt: 'The ultimate test of skill and teamwork for the PG community across weekend showdowns.',
    content: `
      <p>A look back at the PG Mania event...</p>
    `,
    image: '/swimming.jpeg',
    date: 'July 2024',
    readTime: '5 min read',
    author: 'PG Sports Council',
    tags: ['PG Exclusive'],
    imageText: 'YEARBOOK'
  }
];
