# BewustBestaan API Documentatie

> Interne API referentie voor ontwikkelaars

## Overzicht

Deze documentatie beschrijft de beschikbare API endpoints en functionaliteiten van het BewustBestaan platform.

---

## Authenticatie

Het platform gebruikt Supabase Auth met JWT tokens voor authenticatie.

### Endpoints

#### Login
```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: string,
  password: string
});
```

#### Registratie
```typescript
const { data, error } = await supabase.auth.signUp({
  email: string,
  password: string,
  options: {
    emailRedirectTo: window.location.origin,
    data: { username: string }
  }
});
```

#### Uitloggen
```typescript
const { error } = await supabase.auth.signOut();
```

#### Wachtwoord Reset
```typescript
const { error } = await supabase.auth.resetPasswordForEmail(email, {
  redirectTo: `${window.location.origin}/reset-password`
});
```

---

## Database Tabellen

### profiles
Gebruikersprofielen gekoppeld aan auth.users

| Kolom | Type | Nullable | Beschrijving |
|-------|------|----------|--------------|
| id | uuid | Nee | Primary key |
| user_id | uuid | Nee | FK naar auth.users |
| username | text | Nee | Unieke gebruikersnaam |
| bio | text | Ja | Profielbeschrijving (max 500 chars) |
| avatar_url | text | Ja | URL naar profielafbeelding |
| allow_dm | boolean | Ja | Privéberichten toestaan |
| created_at | timestamp | Ja | Aanmaakdatum |

**RLS Policies:**
- `SELECT`: Alle geauthenticeerde gebruikers kunnen profielen bekijken
- `INSERT`: Gebruikers kunnen alleen hun eigen profiel aanmaken
- `UPDATE`: Gebruikers kunnen alleen hun eigen profiel bijwerken

### topics
Forum onderwerpen

| Kolom | Type | Beschrijving |
|-------|------|--------------|
| id | uuid | Primary key |
| category_id | uuid | FK naar categories |
| author_id | uuid | FK naar auth.users |
| title | text | Titel (5-200 chars) |
| body | text | Inhoud (10-10000 chars) |
| tags | jsonb | Array van tags |
| status | enum | 'open' of 'locked' |
| created_at | timestamp | Aanmaakdatum |
| updated_at | timestamp | Laatst bijgewerkt |

**RLS Policies:**
- `SELECT`: Alle geauthenticeerde gebruikers
- `INSERT/UPDATE/DELETE`: Alleen de auteur

### topic_replies
Reacties op forum onderwerpen

| Kolom | Type | Beschrijving |
|-------|------|--------------|
| id | uuid | Primary key |
| topic_id | uuid | FK naar topics |
| author_id | uuid | FK naar auth.users |
| body | text | Inhoud (2-5000 chars) |
| created_at | timestamp | Aanmaakdatum |

### dm_threads
Privébericht threads

| Kolom | Type | Beschrijving |
|-------|------|--------------|
| id | uuid | Primary key |
| user_a | uuid | Eerste deelnemer |
| user_b | uuid | Tweede deelnemer |
| last_message_at | timestamp | Tijd laatste bericht |
| created_at | timestamp | Aanmaakdatum |

### dm_messages
Privéberichten (realtime enabled)

| Kolom | Type | Beschrijving |
|-------|------|--------------|
| id | uuid | Primary key |
| thread_id | uuid | FK naar dm_threads |
| sender_id | uuid | Verzender |
| body | text | Berichtinhoud |
| created_at | timestamp | Verzendtijd |

---

## Edge Functions

### ai-chat
AI chatbot voor mindfulness vragen

**Endpoint:** `POST /functions/v1/ai-chat`

**Request:**
```typescript
{
  messages: Array<{ role: "user" | "assistant", content: string }>,
  context?: "mindfulness" | "community" | "general"
}
```

**Response:** Server-Sent Events (SSE) stream

**Voorbeeld:**
```typescript
const response = await fetch(`${SUPABASE_URL}/functions/v1/ai-chat`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${ANON_KEY}`
  },
  body: JSON.stringify({
    messages: [{ role: "user", content: "Wat is mindfulness?" }],
    context: "mindfulness"
  })
});
```

### content-moderation
Automatische content moderatie

**Endpoint:** `POST /functions/v1/content-moderation`

**Request:**
```typescript
{
  content: string,
  contentType: "topic" | "reply" | "message" | "profile",
  contentId?: string,
  userId?: string
}
```

**Response:**
```typescript
{
  isSafe: boolean,
  riskLevel: "low" | "medium" | "high",
  categories: string[],
  reason?: string
}
```

### text-analysis
Tekstanalyse functionaliteiten

**Endpoint:** `POST /functions/v1/text-analysis`

**Request:**
```typescript
{
  text: string,
  type: "summarize" | "sentiment" | "keywords" | "translate",
  targetLanguage?: string  // Voor translate
}
```

**Response (summarize):**
```typescript
{
  type: "summarize",
  result: {
    summary: string,
    wordCount: number
  }
}
```

**Response (sentiment):**
```typescript
{
  type: "sentiment",
  result: {
    sentiment: "positive" | "negative" | "neutral" | "mixed",
    score: number,  // -1 tot 1
    explanation: string,
    emotions?: string[]
  }
}
```

**Response (keywords):**
```typescript
{
  type: "keywords",
  result: {
    keywords: Array<{ keyword: string, relevance: "high" | "medium" | "low" }>,
    mainTopic: string
  }
}
```

---

## Rollen & Autorisatie

### Rollen
- `member`: Standaard rol voor alle gebruikers
- `admin`: Beheerdersrechten

### has_role functie
```sql
SELECT has_role(auth.uid(), 'admin');
```

### RLS Policy Voorbeeld
```sql
CREATE POLICY "Admins can manage content"
ON public.blog_posts
FOR ALL
USING (has_role(auth.uid(), 'admin'));
```

---

## Input Validatie

Alle input wordt gevalideerd met Zod schemas:

```typescript
import { 
  usernameSchema,
  emailSchema,
  passwordSchema,
  topicTitleSchema,
  topicBodySchema,
  replyBodySchema,
  messageBodySchema 
} from "@/lib/validations";
```

### Validatieregels

| Veld | Min | Max | Regels |
|------|-----|-----|--------|
| username | 3 | 30 | Alphanumeriek + underscore |
| email | - | 255 | Geldig e-mailadres |
| password | 8 | 128 | - |
| topic title | 5 | 200 | - |
| topic body | 10 | 10000 | - |
| reply | 2 | 5000 | - |
| message | 1 | 5000 | - |
| bio | - | 500 | - |

---

## Error Handling

### Error Codes

| Code | Beschrijving |
|------|--------------|
| AUTH_001 | Ongeldige inloggegevens |
| AUTH_002 | Sessie verlopen |
| AUTH_003 | Geen toegang |
| AUTH_004 | E-mail niet bevestigd |
| DB_001 | Database verbinding mislukt |
| DB_002 | Query mislukt |
| DB_003 | RLS violation |
| DB_004 | Niet gevonden |
| VAL_001 | Validatie mislukt |
| AI_001 | AI service niet beschikbaar |
| AI_002 | Rate limited |

### Gebruik
```typescript
import { 
  createAppError, 
  logError, 
  parseSupabaseError,
  getUserMessage 
} from "@/lib/errorHandling";

try {
  // operatie
} catch (error) {
  const appError = parseSupabaseError(error);
  logError(appError);
  toast.error(appError.userMessage);
}
```

---

## Realtime

Realtime is ingeschakeld voor `dm_messages`:

```typescript
const channel = supabase
  .channel('dm-messages')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'dm_messages',
      filter: `thread_id=eq.${threadId}`
    },
    (payload) => {
      // Handle new message
    }
  )
  .subscribe();
```

---

## Rate Limits

- AI endpoints: Gelimiteerd per workspace
- Database: 1000 rijen per query standaard

---

*Laatste update: Januari 2026*
