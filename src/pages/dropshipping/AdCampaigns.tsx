import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  TrendingUp,
  DollarSign,
  BarChart2,
  Play,
  Users,
  Zap,
} from "lucide-react";

interface BudgetAllocation {
  platform: string;
  amount: string;
  percentage: string;
  focus: string;
  kpi: string;
  color: string;
  badgeVariant: "default" | "secondary" | "destructive" | "outline";
}

interface CampaignType {
  name: string;
  percentage: string;
  description: string;
  detail: string;
}

interface UseCaseTarget {
  segment: string;
  age?: string;
  motivation: string;
  emotional: string;
  cpaTarget: string;
}

interface CreativeFormat {
  name: string;
  duration?: string;
  description: string;
  detail: string;
  icon: React.ReactNode;
}

interface KpiCard {
  label: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface AbTestItem {
  variable: string;
  variantA: string;
  variantB: string;
  status: "Actief" | "Gepland";
  metric: string;
}

const budgetAllocations: BudgetAllocation[] = [
  {
    platform: "Meta Ads",
    amount: "€15,60",
    percentage: "60%",
    focus: "Nieuwe klantenacquisitie",
    kpi: "CPA €3-4 | ROAS 3:1+",
    color: "bg-blue-50 border-blue-200",
    badgeVariant: "default",
  },
  {
    platform: "Google Ads",
    amount: "€7,80",
    percentage: "30%",
    focus: "Hoog-intentie verkeer",
    kpi: "Shopping campagnes",
    color: "bg-green-50 border-green-200",
    badgeVariant: "secondary",
  },
  {
    platform: "TikTok Ads",
    amount: "€2,60",
    percentage: "10%",
    focus: "Virale demonstraties",
    kpi: "Engagement + conversie",
    color: "bg-purple-50 border-purple-200",
    badgeVariant: "outline",
  },
];

const metaCampaignTypes: CampaignType[] = [
  {
    name: "Advantage+ Shopping",
    percentage: "60%",
    description: "Nieuwe klantenacquisitie",
    detail: "Geautomatiseerde creatieve optimalisatie",
  },
  {
    name: "Retargeting",
    percentage: "30%",
    description: "Winkelwagen herstel & herhaalaankoop",
    detail: "15-20% herstelrate target",
  },
  {
    name: "Lookalike Audiences",
    percentage: "10%",
    description: "Schaalbare publieksexpansie",
    detail: "Op basis van converters",
  },
];

const useCaseTargets: UseCaseTarget[] = [
  {
    segment: "Stedelijke Professionals",
    age: "25-45j",
    motivation: "Tijdbesparing",
    emotional: "Stressreductie",
    cpaTarget: "€3,50",
  },
  {
    segment: "Ouders Jonge Kinderen",
    motivation: "Kindveiligheid",
    emotional: "Gemoedsrust",
    cpaTarget: "€4,00",
  },
  {
    segment: "Huisdiereigenaren",
    motivation: "Huisdier beveiliging",
    emotional: "Emotioneel",
    cpaTarget: "€4,50",
  },
  {
    segment: "Reizigers / Forenzen",
    motivation: "Reisstress reductie",
    emotional: "Efficiency",
    cpaTarget: "€3,00",
  },
];

const creativeFormats: CreativeFormat[] = [
  {
    name: "Video Demonstratie",
    duration: "15-30s",
    description: "Use case scenario",
    detail: "Before/after format",
    icon: <Play className="h-5 w-5 text-red-500" />,
  },
  {
    name: "Spark Ads TikTok",
    description: "Platform-native stijl",
    detail: "Virale potentieel",
    icon: <Zap className="h-5 w-5 text-pink-500" />,
  },
  {
    name: "Carousel Ads",
    description: "Meerdere use cases",
    detail: "Productfamilie showcase",
    icon: <BarChart2 className="h-5 w-5 text-blue-500" />,
  },
  {
    name: "Dynamic Product Ads",
    description: "Gepersonaliseerd retargeting",
    detail: "Automatische productaanbevelingen",
    icon: <Target className="h-5 w-5 text-orange-500" />,
  },
];

const kpiCards: KpiCard[] = [
  {
    label: "Break-even",
    value: "4,7 units",
    description: "Minimaal te verkopen per dag",
    icon: <TrendingUp className="h-6 w-6 text-green-600" />,
    color: "bg-green-50 border-green-200",
  },
  {
    label: "Target ROAS",
    value: "3:1",
    description: "Minimum return on ad spend",
    icon: <BarChart2 className="h-6 w-6 text-blue-600" />,
    color: "bg-blue-50 border-blue-200",
  },
  {
    label: "Max CPA",
    value: "€4,50",
    description: "Maximale cost per acquisitie",
    icon: <DollarSign className="h-6 w-6 text-red-600" />,
    color: "bg-red-50 border-red-200",
  },
  {
    label: "Dagelijks Volume",
    value: "5-10 units",
    description: "Doel verkoopvolume per dag",
    icon: <Users className="h-6 w-6 text-purple-600" />,
    color: "bg-purple-50 border-purple-200",
  },
];

const abTests: AbTestItem[] = [
  {
    variable: "Creative type",
    variantA: "Hero afbeelding",
    variantB: "Video",
    status: "Actief",
    metric: "CTR & CVR",
  },
  {
    variable: "Prijs",
    variantA: "€9,99",
    variantB: "€12,99",
    status: "Gepland",
    metric: "CVR & AOV",
  },
  {
    variable: "Copywriting stijl",
    variantA: "Emoji copy",
    variantB: "No-emoji copy",
    status: "Gepland",
    metric: "CTR",
  },
  {
    variable: "Urgentie element",
    variantA: "Countdown timer",
    variantB: "Geen timer",
    status: "Gepland",
    metric: "CVR",
  },
];

export default function AdCampaigns() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Advertentie Campagnes
          </h1>
          <p className="text-gray-500 mt-1">
            GPS Tracker Dropshipping — Benelux Markt
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">
            Totaal Budget
          </p>
          <p className="text-4xl font-bold text-gray-900">€26,00</p>
          <p className="text-sm text-gray-400">initieel dagbudget</p>
        </div>
      </div>

      {/* Budget Allocatie Kaarten */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-gray-600" />
          Budget Allocatie
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {budgetAllocations.map((alloc) => (
            <Card
              key={alloc.platform}
              className={`border-2 ${alloc.color}`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800 text-lg">
                    {alloc.platform}
                  </span>
                  <Badge variant={alloc.badgeVariant}>
                    {alloc.percentage}
                  </Badge>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {alloc.amount}
                </p>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Focus:</span> {alloc.focus}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">KPI:</span> {alloc.kpi}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Campagne Structuur Meta Ads */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-gray-600" />
          Campagne Structuur — Meta Ads
        </h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {metaCampaignTypes.map((campaign) => (
                <div
                  key={campaign.name}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-shrink-0 w-16 text-center">
                    <span className="text-xl font-bold text-blue-600">
                      {campaign.percentage}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {campaign.name}
                    </p>
                    <p className="text-sm text-gray-700">
                      {campaign.description}
                    </p>
                    <p className="text-sm text-gray-500">{campaign.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Use Case Targeting Matrix */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-gray-600" />
          Use Case Targeting Matrix
        </h2>
        <Card>
          <CardContent className="pt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left pb-3 pr-4 font-semibold text-gray-700">
                    Doelgroep segment
                  </th>
                  <th className="text-left pb-3 pr-4 font-semibold text-gray-700">
                    Rationele motivatie
                  </th>
                  <th className="text-left pb-3 pr-4 font-semibold text-gray-700">
                    Emotionele driver
                  </th>
                  <th className="text-right pb-3 font-semibold text-gray-700">
                    CPA Target
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {useCaseTargets.map((target) => (
                  <tr key={target.segment} className="hover:bg-gray-50">
                    <td className="py-3 pr-4">
                      <span className="font-medium text-gray-900">
                        {target.segment}
                      </span>
                      {target.age && (
                        <span className="ml-1 text-gray-400">
                          ({target.age})
                        </span>
                      )}
                    </td>
                    <td className="py-3 pr-4 text-gray-600">
                      {target.motivation}
                    </td>
                    <td className="py-3 pr-4 text-gray-600">
                      {target.emotional}
                    </td>
                    <td className="py-3 text-right">
                      <Badge variant="outline" className="font-mono">
                        {target.cpaTarget}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>

      {/* Creatieve Formaten */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Play className="h-5 w-5 text-gray-600" />
          Creatieve Formaten
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {creativeFormats.map((format) => (
            <Card key={format.name} className="border border-gray-200">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  {format.icon}
                  <span className="font-semibold text-gray-800 text-sm">
                    {format.name}
                  </span>
                </div>
                {format.duration && (
                  <Badge variant="secondary" className="w-fit text-xs">
                    {format.duration}
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="text-sm text-gray-700">{format.description}</p>
                <p className="text-xs text-gray-500">{format.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* KPI Dashboard */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-gray-600" />
          KPI Dashboard
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((kpi) => (
            <Card
              key={kpi.label}
              className={`border-2 ${kpi.color}`}
            >
              <CardHeader className="pb-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    {kpi.label}
                  </span>
                  {kpi.icon}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                <p className="text-xs text-gray-500 mt-1">{kpi.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* A/B Test Protocol */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-gray-600" />
          A/B Test Protocol
        </h2>
        <Card>
          <CardContent className="pt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left pb-3 pr-4 font-semibold text-gray-700">
                    Testvariabele
                  </th>
                  <th className="text-left pb-3 pr-4 font-semibold text-gray-700">
                    Variant A
                  </th>
                  <th className="text-left pb-3 pr-4 font-semibold text-gray-700">
                    Variant B
                  </th>
                  <th className="text-left pb-3 pr-4 font-semibold text-gray-700">
                    Meetwaarde
                  </th>
                  <th className="text-left pb-3 font-semibold text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {abTests.map((test) => (
                  <tr key={test.variable} className="hover:bg-gray-50">
                    <td className="py-3 pr-4 font-medium text-gray-900">
                      {test.variable}
                    </td>
                    <td className="py-3 pr-4 text-gray-600">{test.variantA}</td>
                    <td className="py-3 pr-4 text-gray-600">{test.variantB}</td>
                    <td className="py-3 pr-4 text-gray-500 font-mono text-xs">
                      {test.metric}
                    </td>
                    <td className="py-3">
                      <Badge
                        variant={
                          test.status === "Actief" ? "default" : "secondary"
                        }
                        className={
                          test.status === "Actief"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : ""
                        }
                      >
                        {test.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>

      {/* Footer note */}
      <div className="text-center text-xs text-gray-400 pt-2 pb-6">
        Campagne data gebaseerd op Benelux marktanalyse — dagelijks budget €26 initieel fase
      </div>
    </div>
  );
}
