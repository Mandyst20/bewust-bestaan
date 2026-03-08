import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Package,
  ShoppingBag,
  Target,
  Search,
  BarChart2,
  TrendingUp,
  Euro,
  Zap,
  CheckCircle,
  Clock,
  ArrowRight,
  Globe,
  Truck,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const agents = [
  {
    id: 1,
    title: "Leveranciers Beheer",
    icon: Package,
    path: "/dropshipping/leveranciers",
    status: "Actief",
    statusColor: "bg-green-100 text-green-800",
    description: "AliExpress België, CJ Dropshipping, MiniFinder B2B",
    metrics: [
      { label: "Primaire leverancier", value: "AliExpress BE" },
      { label: "COGS per unit", value: "€3,41" },
      { label: "Marge", value: "281%+" },
    ],
    color: "border-green-500",
    bgColor: "bg-green-50",
  },
  {
    id: 2,
    title: "Store Design & UX",
    icon: ShoppingBag,
    path: "/dropshipping/store",
    status: "In uitvoering",
    statusColor: "bg-blue-100 text-blue-800",
    description: "Shopify thema, checkout optimalisatie, betaalmethoden",
    metrics: [
      { label: "Conversie target", value: "2,5-3%" },
      { label: "Betaalmethoden", value: "5 (iDEAL, Bancontact)" },
      { label: "Laadsnelheid", value: "<2 seconden" },
    ],
    color: "border-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: 3,
    title: "Advertentie Campagnes",
    icon: Target,
    path: "/dropshipping/campagnes",
    status: "Gepland",
    statusColor: "bg-purple-100 text-purple-800",
    description: "Meta Ads, Google Shopping, TikTok Spark Ads",
    metrics: [
      { label: "Budget", value: "€26" },
      { label: "Target ROAS", value: "3:1" },
      { label: "Max CPA", value: "€4,50" },
    ],
    color: "border-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    id: 4,
    title: "SEO & Organisch",
    icon: Search,
    path: "/dropshipping/seo",
    status: "Gepland",
    statusColor: "bg-orange-100 text-orange-800",
    description: "Long-tail keywords, blog content, UGC engine",
    metrics: [
      { label: "Keywords", value: "8 primair" },
      { label: "Content doel", value: "1 post/week" },
      { label: "Organisch doel", value: "500/mnd" },
    ],
    color: "border-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    id: 5,
    title: "Analytics & Optimalisatie",
    icon: BarChart2,
    path: "/dropshipping/analytics",
    status: "Monitoring",
    statusColor: "bg-teal-100 text-teal-800",
    description: "KPI dashboard, A/B tests, financiële projecties",
    metrics: [
      { label: "Break-even", value: "5 units" },
      { label: "Mnd 3 doel", value: "€1.344 netto" },
      { label: "CAGR markt", value: "12,62%" },
    ],
    color: "border-teal-500",
    bgColor: "bg-teal-50",
  },
];

const marketStats = [
  { label: "Benelux GPS Markt 2024", value: "$64,5M", icon: Globe },
  { label: "Benelux GPS Markt 2033", value: "$187,9M", icon: TrendingUp },
  { label: "Markt CAGR", value: "12,62%", icon: BarChart2 },
  { label: "Bewezen orders (product)", value: "270.520", icon: Package },
  { label: "Levertijd EU magazijn", value: "2-7 dagen", icon: Truck },
  { label: "Benelux consumenten", value: "29,5M", icon: Users },
];

const financials = [
  { label: "Totaal startbudget", value: "€100", color: "text-gray-900" },
  { label: "COGS per unit", value: "€3,41", color: "text-red-600" },
  { label: "Retail prijs", value: "€12,99", color: "text-blue-600" },
  { label: "Brutowinst/unit", value: "€9,58", color: "text-green-600" },
  { label: "Break-even", value: "5 units", color: "text-orange-600" },
  { label: "Mnd 3 netto projectie", value: "€1.344", color: "text-green-700" },
];

const timeline = [
  {
    week: "Week 1-2",
    title: "Lancering & Validatie",
    tasks: [
      "Shopify store configuratie",
      "Leveranciers integratie (DSers)",
      "Initiële advertentie testen",
      "5 units/dag target",
    ],
    status: "Nu",
  },
  {
    week: "Maand 1",
    title: "Optimalisatie",
    tasks: [
      "A/B test resultaten analyseren",
      "Winnende creatieven schalen",
      "Email flows activeren",
      "10 units/dag target",
    ],
    status: "Binnenkort",
  },
  {
    week: "Maand 2-3",
    title: "Schaling",
    tasks: [
      "Productlijn uitbreiden (pet tracker, bundles)",
      "TikTok campagnes lanceren",
      "UGC content verzamelen",
      "25 units/dag target",
    ],
    status: "Gepland",
  },
  {
    week: "Maand 4-6",
    title: "Expansie",
    tasks: [
      "Belgische markt intensiveren",
      "B2B segment (voertuig trackers)",
      "Abonnementsdienst overwegen",
      "50+ units/dag target",
    ],
    status: "Gepland",
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-600 rounded-lg p-2">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Agent Swarm Dropshipping Blueprint
                </h1>
              </div>
              <p className="text-gray-600 max-w-2xl">
                GPS Tracker Benelux — €100 Budget naar Maximale Cashflow (Maart 2026)
              </p>
              <div className="flex items-center gap-4 mt-3">
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Niche: Smart GPS Trackers
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  <Globe className="w-3 h-3 mr-1" />
                  Markt: Benelux (NL/BE/LU)
                </Badge>
                <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                  <Euro className="w-3 h-3 mr-1" />
                  Budget: €100
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">€9,58</div>
              <div className="text-sm text-gray-500">brutowinst per unit</div>
              <div className="text-xs text-gray-400 mt-1">281% marge</div>
            </div>
          </div>
        </div>

        {/* Market Stats */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Marktdata Validatie
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {marketStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="text-center">
                  <CardContent className="pt-4 pb-3">
                    <Icon className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                    <div className="text-lg font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 leading-tight mt-1">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Agent Cards */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            5 Agent Swarm — Parallelle Uitvoering
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {agents.map((agent) => {
              const Icon = agent.icon;
              return (
                <Card
                  key={agent.id}
                  className={`border-l-4 ${agent.color} hover:shadow-md transition-shadow`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className={`rounded-lg p-2 ${agent.bgColor}`}>
                        <Icon className="w-5 h-5 text-gray-700" />
                      </div>
                      <Badge className={`text-xs ${agent.statusColor}`}>
                        {agent.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-sm mt-2">
                      <span className="text-xs text-gray-400">
                        Agent {agent.id}
                      </span>
                      <br />
                      {agent.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs text-gray-500 mb-3">
                      {agent.description}
                    </p>
                    <div className="space-y-1.5 mb-4">
                      {agent.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="flex justify-between text-xs"
                        >
                          <span className="text-gray-500">{m.label}</span>
                          <span className="font-semibold text-gray-800">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Link to={agent.path}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs"
                      >
                        Bekijk details
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Financials & Timeline in 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Unit Economics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Euro className="w-5 h-5 text-green-600" />
                Unit Economie & Budget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {financials.map((f) => (
                  <div
                    key={f.label}
                    className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-sm text-gray-600">{f.label}</span>
                    <span className={`text-lg font-bold ${f.color}`}>
                      {f.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Execution Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Executie Tijdlijn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeline.map((phase, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          phase.status === "Nu"
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {i + 1}
                      </div>
                      {i < timeline.length - 1 && (
                        <div className="w-0.5 h-8 bg-gray-200 mt-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-400">
                          {phase.week}
                        </span>
                        {phase.status === "Nu" && (
                          <Badge className="bg-green-100 text-green-700 text-xs py-0">
                            Nu
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm font-semibold text-gray-800">
                        {phase.title}
                      </div>
                      <ul className="mt-1 space-y-0.5">
                        {phase.tasks.map((task, j) => (
                          <li
                            key={j}
                            className="text-xs text-gray-500 flex items-center gap-1"
                          >
                            <span className="w-1 h-1 rounded-full bg-gray-400" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Snelle Acties — Start Nu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Link to="/dropshipping/leveranciers">
                <Button className="w-full" variant="outline">
                  <Package className="w-4 h-4 mr-2" />
                  Leveranciers
                </Button>
              </Link>
              <Link to="/dropshipping/store">
                <Button className="w-full" variant="outline">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Store Design
                </Button>
              </Link>
              <Link to="/dropshipping/campagnes">
                <Button className="w-full" variant="outline">
                  <Target className="w-4 h-4 mr-2" />
                  Campagnes
                </Button>
              </Link>
              <Link to="/dropshipping/analytics">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <BarChart2 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
