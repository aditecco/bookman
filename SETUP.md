# BookMan Setup Guide

## New Architecture

This project has been migrated from Firebase + Redux-Saga to:
- **Supabase** for backend (database + auth)
- **TanStack Query** for data fetching and caching
- **Zustand** for global state management
- **Next.js App Router** for routing

## Environment Variables

Create a `.env.local` file in the root directory with:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# App Configuration
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_SOURCE=https://github.com/yourusername/bookman
```

## Supabase Setup

1. Create a new Supabase project
2. Run the following SQL to create the database schema:

```sql
-- Users table (handled by Supabase Auth)
-- No need to create manually

-- Bookmarks table
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  title VARCHAR(500),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tags table
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, name)
);

-- Bookmark-Tag relationship table
CREATE TABLE bookmark_tags (
  bookmark_id UUID REFERENCES bookmarks(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (bookmark_id, tag_id)
);

-- User settings table
CREATE TABLE user_settings (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  show_descriptions BOOLEAN DEFAULT true,
  admin_mode BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_bookmarks_user_id ON bookmarks(user_id);
CREATE INDEX idx_bookmarks_created_at ON bookmarks(created_at DESC);
CREATE INDEX idx_tags_user_id ON tags(user_id);
CREATE INDEX idx_tags_name ON tags(name);
CREATE INDEX idx_bookmark_tags_bookmark_id ON bookmark_tags(bookmark_id);
CREATE INDEX idx_bookmark_tags_tag_id ON bookmark_tags(tag_id);

-- Enable Row Level Security
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmark_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can manage own bookmarks" ON bookmarks
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own tags" ON tags
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own bookmark tags" ON bookmark_tags
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM bookmarks 
      WHERE bookmarks.id = bookmark_tags.bookmark_id 
      AND bookmarks.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own settings" ON user_settings
  FOR ALL USING (auth.uid() = user_id);
```

3. Copy your Supabase URL and anon key to `.env.local`

## Development

```bash
npm install
npm run dev
```

## Migration Status

- ✅ Next.js App Router setup
- ✅ Supabase client configuration
- ✅ Zustand store setup
- ✅ TanStack Query setup
- ✅ Authentication hooks
- ✅ Bookmarks service and hooks
- ✅ Tags service and hooks
- ✅ Updated components
- ✅ Auth pages (login/signup)
- ❌ Legacy code cleanup (moved to `src/legacy/`)

## Legacy Code

The old Redux-Saga + Firebase code has been moved to `src/legacy/` for reference. You can delete this directory once you're confident with the new implementation.

## Key Files

- `src/lib/supabase.ts` - Supabase client configuration
- `src/stores/appStore.ts` - Zustand store
- `src/hooks/useAuth.ts` - Authentication hook
- `src/hooks/useBookmarks.ts` - Bookmarks data hook
- `src/hooks/useTags.ts` - Tags data hook
- `src/services/bookmarks.ts` - Bookmarks API service
- `src/services/tags.ts` - Tags API service 