import {
  Search,
  FileText,
  TrendingUp,
  Share2,
  Star,
  Users,
  Globe,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Keyword {
  keyword: string;
  volume: string;
  competition: "Hoog" | "Middel" | "Laag";
  priority: "Hoog" | "Middel";
  tag?: string;
}

interface ContentItem {
  week: string;
  title: string;
  status: "Concept" | "Gepland";
}

interface OrganicChannel {
  icon: React.ReactNode;
  name: string;
  description: string;
  details: string[];
  goal: string;
}

interface UgcItem {
  trigger: string;
  incentive: string;
  value: string;
}

interface SeoCheckItem {
  label: string;
  progress: number;
}

const keywords: Keyword[] = [
  {
    keyword: "GPS tracker kopen",
    volume: "2.400/mnd",
    competition: "Hoog",
    priority: "Hoog",
  },
  {
    keyword: "mini GPS tracker Benelux",
    volume: "880/mnd",
    competition: "Middel",
    priority: "Hoog",
  },
  {
    keyword: "sleutelvinder bluetooth",
    volume: "1.900/mnd",
    competition: "Middel",
    priority: "Hoog",
  },
  {
    keyword: "GPS tracker huisdier",
    volume: "3.600/mnd",
    competition: "Hoog",
    priority: "Middel",
  },
  {
    keyword: "hoe nooit meer sleutels kwijtraken",
    volume: "320/mnd",
    competition: "Laag",
    priority: "Hoog",
    tag: "long-tail",
  },
  {
    keyword: "beste GPS tracker 2026",
    volume: "1.300/mnd",
    competition: "Middel",
    priority: "Middel",
  },
  {
    keyword: "GPS tracker fiets diefstal",
    volume: "590/mnd",
    competition: "Laag",
    priority: "Hoog",
    tag: "Benelux specifiek",
  },
  {
    keyword: "kind tracker veiligheid",
    volume: "720/mnd",
    competition: "Laag",
    priority: "Hoog",
  },
];

const contentCalendar: ContentItem[] = [
  {
    week: "Week 1",
    title: "Hoe nooit meer je sleutels kwijtraken: De complete gids",
    status: "Concept",
  },
  {
    week: "Week 2",
    title: "GPS Tracker voor je hond: Top 5 voordelen",
    status: "Gepland",
  },
  {
    week: "Week 3",
    title: "Mini GPS tracker test 2026: Welke is beste?",
    status: "Gepland",
  },
  {
    week: "Week 4",
    title: "Fietsdiefstal voorkomen met GPS tracker",
    status: "Gepland",
  },
  {
    week: "Week 5",
    title: "GPS tracker kind veiligheid: Gids voor ouders",
    status: "Gepland",
  },
  {
    week: "Week 6",
    title: "5 redenen waarom elke reiziger een tracker nodig heeft",
    status: "Gepland",
  },
];

const organicChannels: OrganicChannel[] = [
  {
    icon: <FileText className="h-6 w-6 text-blue-600" />,
    name: "Blog (SEO)",
    description: "Long-tail keywords & informatieve content",
    details: ["Long-tail keywords", "1 post/week"],
    goal: "500 organisch/mnd",
  },
  {
    icon: <Share2 className="h-6 w-6 text-pink-500" />,
    name: "Instagram",
    description: "Lifestyle content & use cases",
    details: ["Lifestyle content", "Use cases"],
    goal: "1.000 volgers/mnd 1",
  },
  {
    icon: <Globe className="h-6 w-6 text-red-500" />,
    name: "Pinterest",
    description: "Evergreen visuele content",
    details: ["Product pins", "DIY veiligheid", "Evergreen content"],
    goal: "Organisch bereik",
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-red-600" />,
    name: "YouTube",
    description: "Video content & demonstraties",
    details: ["Product reviews", "How-to's", "Unboxing"],
    goal: "Abonnees & views",
  },
];

const ugcItems: UgcItem[] = [
  {
    trigger: "Automatisch review verzoek",
    incentive: "7 dagen na levering",
    value: "—",
  },
  {
    trigger: "Foto review incentive",
    incentive: "Korting volgende aankoop",
    value: "€2,50",
  },
  {
    trigger: "Video testimonial",
    incentive: "Korting volgende aankoop",
    value: "€5,00",
  },
  {
    trigger: "Social share incentive",
    incentive: "Gratis accessoire bij foto met tag",
    value: "Gratis",
  },
];

const seoChecklist: SeoCheckItem[] = [
  { label: "Meta titles & descriptions", progress: 100 },
  { label: "Structured Data (JSON-LD)", progress: 80 },
  { label: "Sitemap & robots.txt", progress: 100 },
  { label: "Page speed <2s", progress: 85 },
  { label: "Mobile-friendly", progress: 100 },
  { label: "Interne linking structuur", progress: 70 },
];

function competitionBadgeVariant(
  competition: Keyword["competition"]
): "destructive" | "secondary" | "outline" {
  if (competition === "Hoog") return "destructive";
  if (competition === "Middel") return "secondary";
  return "outline";
}

function priorityBadgeVariant(
  priority: Keyword["priority"]
): "default" | "secondary" {
  return priority === "Hoog" ? "default" : "secondary";
}

function statusBadgeVariant(
  status: ContentItem["status"]
): "default" | "secondary" {
  return status === "Concept" ? "default" : "secondary";
}

function progressColor(progress: number): string {
  if (progress === 100) return "bg-green-500";
  if (progress >= 80) return "bg-blue-500";
  return "bg-yellow-500";
}

export default function SeoContent() {
  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Search className="h-8 w-8 text-blue-600" />
          SEO &amp; Organische Groei
        </h1>
        <p className="mt-2 text-muted-foreground text-lg">
          Content strategie &amp; zoekwoord optimalisatie voor de Benelux GPS
          tracker markt
        </p>
      </div>

      {/* Keyword Strategie */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-600" />
            Keyword Strategie
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Top zoekwoorden voor de Benelux GPS tracker markt
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Keyword</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Concurrentie</TableHead>
                <TableHead>Prioriteit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keywords.map((kw) => (
                <TableRow key={kw.keyword}>
                  <TableCell className="font-medium">
                    <span>{kw.keyword}</span>
                    {kw.tag && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        {kw.tag}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {kw.volume}
                  </TableCell>
                  <TableCell>
                    <Badge variant={competitionBadgeVariant(kw.competition)}>
                      {kw.competition}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={priorityBadgeVariant(kw.priority)}>
                      {kw.priority}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Content Kalender */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-green-600" />
            Content Kalender
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Geplande blogposts voor de komende 6 weken
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Week</TableHead>
                <TableHead>Titel</TableHead>
                <TableHead className="w-28">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contentCalendar.map((item) => (
                <TableRow key={item.week}>
                  <TableCell className="font-semibold text-muted-foreground">
                    {item.week}
                  </TableCell>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
                    <Badge variant={statusBadgeVariant(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Organische Kanalen */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Globe className="h-5 w-5 text-purple-600" />
          Organische Kanalen
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {organicChannels.map((channel) => (
            <Card key={channel.name} className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  {channel.icon}
                  <CardTitle className="text-base">{channel.name}</CardTitle>
                </div>
                <p className="text-xs text-muted-foreground">
                  {channel.description}
                </p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between gap-3">
                <ul className="space-y-1">
                  {channel.details.map((detail) => (
                    <li
                      key={detail}
                      className="text-sm text-muted-foreground flex items-center gap-1"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current inline-block" />
                      {detail}
                    </li>
                  ))}
                </ul>
                <div className="rounded-md bg-muted px-3 py-2 text-xs font-semibold text-foreground">
                  Doel: {channel.goal}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* UGC Engine */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-orange-500" />
            User Generated Content (UGC) Engine
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Automatische systemen om klantreviews en social proof te stimuleren
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trigger / Actie</TableHead>
                <TableHead>Incentive</TableHead>
                <TableHead className="w-28 text-right">Waarde</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ugcItems.map((item) => (
                <TableRow key={item.trigger}>
                  <TableCell className="font-medium">{item.trigger}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.incentive}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-green-700">
                    {item.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* SEO Technische Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            SEO Technische Checklist
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Status van technische SEO optimalisaties
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {seoChecklist.map((item) => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.label}</span>
                  <span
                    className={`text-sm font-bold ${
                      item.progress === 100
                        ? "text-green-600"
                        : item.progress >= 80
                        ? "text-blue-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {item.progress}%
                  </span>
                </div>
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full transition-all ${progressColor(item.progress)}`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Verwijzingsprogramma */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Verwijzingsprogramma
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Bestaande klanten inzetten als groeikanaal
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-lg border bg-muted/40 p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Share2 className="h-4 w-4 text-blue-600" />
                Verwijzer korting
              </div>
              <p className="text-2xl font-bold text-blue-700">€3,00</p>
              <p className="text-xs text-muted-foreground">
                Per succesvolle verwijzing
              </p>
            </div>
            <div className="rounded-lg border bg-muted/40 p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Users className="h-4 w-4 text-green-600" />
                Nieuwe klant korting
              </div>
              <p className="text-2xl font-bold text-green-700">10%</p>
              <p className="text-xs text-muted-foreground">
                Op de eerste bestelling
              </p>
            </div>
            <div className="rounded-lg border bg-muted/40 p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <TrendingUp className="h-4 w-4 text-purple-600" />
                Automatische afhandeling
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Tracking &amp; uitbetaling volledig geautomatiseerd
              </p>
              <Badge variant="secondary" className="w-fit mt-auto">
                Actief
              </Badge>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <Button variant="default" size="sm">
              Verwijzingslink genereren
            </Button>
            <Button variant="outline" size="sm">
              Statistieken bekijken
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
