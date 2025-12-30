-- Enums
CREATE TYPE public.app_role AS ENUM ('member', 'admin');
CREATE TYPE public.topic_status AS ENUM ('open', 'locked');
CREATE TYPE public.risk_level AS ENUM ('low', 'medium', 'high');

-- Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  allow_dm BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User Roles (separate table for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'member',
  UNIQUE(user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own role" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);

-- Categories
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT
);
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Everyone can view categories" ON public.categories FOR SELECT USING (true);

-- Topics
CREATE TABLE public.topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  tags JSONB DEFAULT '[]',
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status topic_status DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view topics" ON public.topics FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create topics" ON public.topics FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update own topics" ON public.topics FOR UPDATE TO authenticated USING (auth.uid() = author_id);

-- Topic Replies
CREATE TABLE public.topic_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID REFERENCES public.topics(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.topic_replies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view replies" ON public.topic_replies FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create replies" ON public.topic_replies FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);

-- DM Threads
CREATE TABLE public.dm_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_a UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  user_b UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  last_message_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_a, user_b)
);
ALTER TABLE public.dm_threads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own threads" ON public.dm_threads FOR SELECT TO authenticated USING (auth.uid() = user_a OR auth.uid() = user_b);
CREATE POLICY "Users can create threads" ON public.dm_threads FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_a OR auth.uid() = user_b);

-- DM Messages
CREATE TABLE public.dm_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID REFERENCES public.dm_threads(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.dm_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Thread participants can view messages" ON public.dm_messages FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.dm_threads WHERE id = thread_id AND (user_a = auth.uid() OR user_b = auth.uid()))
);
CREATE POLICY "Thread participants can send messages" ON public.dm_messages FOR INSERT TO authenticated WITH CHECK (
  auth.uid() = sender_id AND EXISTS (SELECT 1 FROM public.dm_threads WHERE id = thread_id AND (user_a = auth.uid() OR user_b = auth.uid()))
);

-- Blog Posts
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  cover_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published blogs visible to authenticated" ON public.blog_posts FOR SELECT TO authenticated USING (published = true);

-- Exercises
CREATE TABLE public.exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  audio_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published exercises visible to authenticated" ON public.exercises FOR SELECT TO authenticated USING (published = true);

-- Safety Alerts
CREATE TABLE public.safety_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  ref_id UUID NOT NULL,
  risk_level risk_level NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ,
  resolved_by UUID REFERENCES auth.users(id)
);
ALTER TABLE public.safety_alerts ENABLE ROW LEVEL SECURITY;

-- Seed Categories
INSERT INTO public.categories (slug, name, description) VALUES
  ('emoties-innerlijke-onrust', 'Emoties & innerlijke onrust', 'Een veilige plek om te delen wat je voelt.'),
  ('grenzen-relaties', 'Grenzen & relaties', 'Praat over relaties en het stellen van grenzen.'),
  ('zelfbeeld', 'Zelfbeeld', 'Ontdek wie je bent en wie je wilt zijn.'),
  ('zingeving', 'Zingeving', 'Grote levensvragen, doel en betekenis.');

-- Seed Blogs
INSERT INTO public.blog_posts (slug, title, body, cover_url, published) VALUES
  ('de-kracht-van-stilte', 'De kracht van stilte in een drukke wereld', 'In onze altijd verbonden wereld is stilte zeldzaam geworden...', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', true),
  ('omgaan-met-verandering', 'Omgaan met verandering: een zachte benadering', 'Verandering is onvermijdelijk, maar hoe we ermee omgaan is een keuze...', 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800', true);

-- Seed Exercises
INSERT INTO public.exercises (slug, title, body, published) VALUES
  ('ademhalingsoefening-rust', '4-7-8 Ademhalingsoefening', 'Een kalmerende ademhalingstechniek...', true),
  ('body-scan-meditatie', 'Body Scan Meditatie', 'Breng aandacht naar elk deel van je lichaam...', true);