export type BlogCategory = {
  id: string;
  name: string;
  slug: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string; // cover
  thumbnail?: string;
  author?: string;
  date: string; // ISO
  categories: string[]; // category slugs
  isFeatured?: boolean;
};

export const BLOG_CATEGORIES: BlogCategory[] = [
  { id: "1", name: "اخبار بردگیم", slug: "news" },
  { id: "2", name: "معرفی بازی", slug: "reviews" },
  { id: "3", name: "پرونده‌های حل نشده", slug: "mystery" },
  { id: "4", name: "پشت صحنه رؤیاژه", slug: "behind-the-scenes" },
];

const placeholder = "/images/blog/post-placeholder.svg";

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "p1",
    slug: "splendor-review",
    title: "نقد و بررسی بازی Splendor: جواهرات در دستان شما",
    excerpt:
      "در این مقاله به بررسی عمیق مکانیک‌ها، استراتژی‌ها و جذابیت بصری بازی Splendor می‌پردازیم...",
    content: `<h2>معرفی</h2>
       <p>Splendor یک بازی کارتی-استراتژیک با تم تجارت جواهرات است. هدف بازیکنان جمع‌آوری منابع و کسب امتیاز از طریق کارت‌هاست.</p>
       <h3>چرا محبوب است؟</h3>
       <p>قوانین ساده، تصمیم‌های عمیق و زمان بازی کوتاه باعث محبوبیت آن شده است.</p>
       <h3>جمع‌بندی</h3>
       <p>اگر به بازی‌های سریع با عمق استراتژیک علاقمندید، Splendor گزینه‌ای عالی است.</p>`,
    image: placeholder,
    thumbnail: placeholder,
    author: "تیم رؤیاژه",
    date: "2024-12-10",
    categories: ["reviews"],
    isFeatured: true,
  },
  {
    id: "p2",
    slug: "diamond-theft-case",
    title: "پرونده مرموز سرقت الماس: آیا شما می‌توانید راز را حل کنید؟",
    excerpt:
      "این پرونده‌ی ساختگی، سرنخ‌های متعددی دارد. آیا می‌توانید مجرم را قبل از دیگران شناسایی کنید؟",
    content: `<p>در این مقاله یک پرونده فرضی با جزئیات ارائه شده تا مهارت‌های کارآگاهی شما به چالش کشیده شود.</p>
       <ul><li>زمان وقوع: نیمه‌شب</li><li>مظنونین: ۳ نفر</li><li>سرنخ‌ها: اثر انگشت، دوربین مداربسته</li></ul>
       <p>نتیجه‌گیری به عهده شماست!</p>`,
    image: placeholder,
    thumbnail: placeholder,
    author: "تحریریه رؤیاژه",
    date: "2025-01-05",
    categories: ["mystery"],
    isFeatured: true,
  },
  {
    id: "p3",
    slug: "catan-beginners-guide",
    title: "راهنمای شروع بازی فکری Catan برای مبتدیان",
    excerpt:
      "اگر تازه‌کار هستید، این راهنمای قدم‌به‌قدم کمکتان می‌کند تا در Catan سریع‌تر پیشرفت کنید.",
    content: `<p>از منابع تا ساخت‌وساز، این راهنما اصول پایه را پوشش می‌دهد و نکاتی برای برنده شدن ارائه می‌کند.</p>`,
    image: placeholder,
    thumbnail: placeholder,
    author: "کارشناس استراتژی",
    date: "2025-02-15",
    categories: ["reviews"],
  },
  {
    id: "p4",
    slug: "behind-the-scenes-royazheh",
    title: "نگاهی به پشت صحنه طراحی پرونده‌های جنایی رؤیاژه",
    excerpt:
      "از ایده تا طراحی، ببینید چگونه پرونده‌های جنایی جذاب خلق می‌شوند و چه چالش‌هایی داریم.",
    content: `<p>در این مطلب درباره فرآیند خلاقیت، تست کاربری و تولید محتوا صحبت می‌کنیم.</p>`,
    image: placeholder,
    thumbnail: placeholder,
    author: "تیم تولید محتوا",
    date: "2025-03-01",
    categories: ["behind-the-scenes"],
  },
];
