const blogs = [
  {
    slug: 'why-i-want-to-be-a-doctor',
    title: 'Why I Want to Be a Doctor',
    date: '2024-11-10',
    readTime: '4 min',
    category: 'Medicine',
    excerpt: 'Growing up in Jhapa, I saw what lack of access to care can do to a family. This is the story of why I chose medicine.',
    file: () => import('./why-i-want-to-be-a-doctor.md?raw'),
  },
  {
    slug: 'the-human-heart',
    title: 'The Human Heart: More Than a Pump',
    date: '2024-10-22',
    readTime: '5 min',
    category: 'Biology',
    excerpt: 'A deep dive into the anatomy and poetry hidden inside the most vital organ in the human body.',
    file: () => import('./the-human-heart.md?raw'),
  },
  {
    slug: 'poetry-and-medicine',
    title: 'On Writing Poetry and Studying Medicine',
    date: '2024-09-14',
    readTime: '3 min',
    category: 'Writing',
    excerpt: 'Two disciplines that seem apart but are rooted in the same need: to understand the human condition.',
    file: () => import('./poetry-and-medicine.md?raw'),
  },
]

export default blogs
