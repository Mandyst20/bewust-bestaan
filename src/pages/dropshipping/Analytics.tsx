import {
  BarChart2,
  TrendingUp,
  DollarSign,
  Target,
  AlertTriangle,
  CheckCircle,
  Zap,
  Package,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const budgetItems = [
  { categorie: "Shopify Basic (3mnd)", bedrag: "€3", gebruik: "Platform", status: "Actief" },
  { categorie: "Domeinregistratie", bedrag: "€12", gebruik: "Merkidentiteit", status: "Actief" },
  { categorie: "Syncee Pro (mnd 1)", bedrag: "€29", gebruik: "Leveranciers integratie", status: "Actief" },
  { categorie: "Klaviyo (betaald tier)", bedrag: "€20", gebruik: "Email automatisering", status: "Actief" },
  { categorie: "Initiële advertenties", bedrag: "€26", gebruik: "Meta/Google validatie", status: "In uitvoering" },
  { categorie: "Contingentie", bedrag: "€10", gebruik: "Reserve", status: "Beschikbaar" },
];

const kpiRows = [
  { metric: "Dagelijkse sessies", week1: "50", week4: "200", mnd3: "500" },
  { metric: "Conversieratio", week1: "1,5%", week4: "2,5%", mnd3: "3%" },
  { metric: "Dagelijkse orders", week1: "1", week4: "5", mnd3: "15" },
  { metric: "Maandelijks omzet", week1: "€130", week4: "€650", mnd3: "€5.850" },
  { metric: "CPA", week1: "€8", week4: "€5", mnd3: "€3,50" },
  { metric: "ROAS", week1: "1,5:1", week4: "2,5:1", mnd3: "3,5:1" },
];

const escalatieTriggers = [
  { trigger: "Leverancier uitverkocht >24u", actie: "Activeer CJ Dropshipping failover" },
  { trigger: "Checkout fout >5% impact", actie: "Onmiddellijk technisch onderzoek" },
  { trigger: "Ad account suspensie", actie: "Stop alle campagnes, backup account activeren" },
  { trigger: "CPA >€6", actie: "Campagne pauzeren, creatieve review" },
  { trigger: "ROAS <2:1", actie: "Budget verlagen 50%, strategie herziening" },
];

const reviewItems = [
  "Leverancier scorecard evaluatie",
  "Product portfolio performance analyse",
  "Markttrend monitoring",
  "Concurrentiebewegingen assessment",
  "Expansie evaluatie (nieuwe categorieën)",
];

const groeiTraject = [
  { maand: "Maand 1", label: "Lancering & validatie", target: "5 units/dag", netto: "€144" },
  { maand: "Maand 2", label: "Optimalisatie", target: "10 units/dag", netto: "€479" },
  { maand: "Maand 3", label: "Schaling", target: "25 units/dag", netto: "€1.344" },
  { maand: "Maand 6", label: "Expansie", target: "50 units/dag", netto: "€2.870" },
];

const getStatusBadge = (status: string) => {
  if (status === "Actief") return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Actief</Badge>;
  if (status === "In uitvoering") return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">In uitvoering</Badge>;
  if (status === "Beschikbaar") return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Beschikbaar</Badge>;
  return <Badge>{status}</Badge>;
};

export default function Analytics() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <BarChart2 className="w-8 h-8 text-indigo-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Performance Dashboard</h1>
          <p className="text-gray-500 text-sm">GPS Tracker Dropshipping — Benelux markt</p>
        </div>
      </div>

      {/* Financiële Projecties Kaarten */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-indigo-500" />
          Financiële Projecties
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">€100 <span className="text-sm font-normal text-gray-400">totaal</span></p>
              <div className="mt-3 space-y-1">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Ingezet: €74</span>
                  <span>Resterend: €26</span>
                </div>
                <Progress value={74} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Break-even</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">5 units</p>
              <p className="text-xs text-gray-500 mt-1">verkopen nodig om break-even te bereiken</p>
              <div className="mt-3">
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">4,7 ≈ 5 units</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Doel Dagelijks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">5–10 <span className="text-sm font-normal text-gray-400">units/dag</span></p>
              <p className="text-xs text-gray-500 mt-1">initiële dagelijkse verkoopdoelstelling</p>
              <div className="mt-3">
                <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">Fase 1 target</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Doel Maandwinst</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">€479+</p>
              <p className="text-xs text-gray-500 mt-1">netto maandwinst doelstelling</p>
              <div className="mt-3">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Netto target</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Budget Allocatie */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-500" />
          Budget Allocatie
        </h2>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Categorie</TableHead>
                  <TableHead>Bedrag</TableHead>
                  <TableHead>Gebruik</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {budgetItems.map((item) => (
                  <TableRow key={item.categorie}>
                    <TableCell className="font-medium">{item.categorie}</TableCell>
                    <TableCell className="font-semibold text-indigo-700">{item.bedrag}</TableCell>
                    <TableCell className="text-gray-600">{item.gebruik}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      {/* Unit Economie */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-indigo-500" />
          Unit Economie Breakdown
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: "Gemiddelde COGS", value: "€3,41", sub: "product + verzending", color: "text-red-600" },
            { label: "Gemiddelde verkoopprijs", value: "€12,99", sub: "consumentenprijs", color: "text-gray-900" },
            { label: "Brutowinst per unit", value: "€9,58", sub: "281% marge", color: "text-green-600" },
            { label: "Vaste maandkosten", value: "€45", sub: "platform & tools", color: "text-amber-600" },
            { label: "Break-even punt", value: "4,7 ≈ 5 units", sub: "maandelijks minimum", color: "text-indigo-600" },
            { label: "Target maandvolume", value: "50+ units", sub: "voor €479+ winst", color: "text-green-700" },
          ].map((item) => (
            <Card key={item.label}>
              <CardContent className="pt-5">
                <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* GPS Tracker Marktdata */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-500" />
          GPS Tracker Marktdata
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Benelux markt 2024", value: "$64,5M", icon: <BarChart2 className="w-4 h-4 text-indigo-400" /> },
            { label: "Benelux markt 2033", value: "$187,9M", icon: <TrendingUp className="w-4 h-4 text-green-400" /> },
            { label: "CAGR", value: "12,62%", icon: <Zap className="w-4 h-4 text-amber-400" /> },
            { label: "Mondiale dropshipping 2026", value: "$537,8B", icon: <DollarSign className="w-4 h-4 text-blue-400" /> },
            { label: "Product orders bewezen", value: "270.520", icon: <Package className="w-4 h-4 text-purple-400" /> },
            { label: "7-daagse velocity", value: "20 units", icon: <Zap className="w-4 h-4 text-orange-400" /> },
            { label: "Verlanglijsten", value: "71.900", icon: <Target className="w-4 h-4 text-red-400" /> },
          ].map((item) => (
            <Card key={item.label}>
              <CardContent className="pt-5">
                <div className="flex items-center gap-2 mb-1">
                  {item.icon}
                  <p className="text-xs text-gray-500">{item.label}</p>
                </div>
                <p className="text-xl font-bold text-gray-900">{item.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Wekelijks Performance Dashboard */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-indigo-500" />
          Wekelijks Performance Dashboard — KPI Targets
        </h2>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead className="text-center">Target Week 1</TableHead>
                  <TableHead className="text-center">Target Week 4</TableHead>
                  <TableHead className="text-center">Target Mnd 3</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {kpiRows.map((row) => (
                  <TableRow key={row.metric}>
                    <TableCell className="font-medium">{row.metric}</TableCell>
                    <TableCell className="text-center text-gray-700">{row.week1}</TableCell>
                    <TableCell className="text-center text-indigo-700 font-semibold">{row.week4}</TableCell>
                    <TableCell className="text-center text-green-700 font-bold">{row.mnd3}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      {/* Groeitraject */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-500" />
          Groeitraject — Maandelijkse Projecties
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {groeiTraject.map((item, index) => (
            <Card key={item.maand} className={index === groeiTraject.length - 1 ? "border-indigo-300 bg-indigo-50" : ""}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-indigo-600">{item.maand}</CardTitle>
                <p className="text-xs text-gray-500">{item.label}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-400">Dagelijks target</p>
                    <p className="text-base font-bold text-gray-800">{item.target}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Netto winst</p>
                    <p className="text-xl font-bold text-green-600">{item.netto}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Escalatie Triggers */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          Escalatie Triggers — Alert Protocol
        </h2>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Trigger</TableHead>
                  <TableHead>Actie</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {escalatieTriggers.map((item) => (
                  <TableRow key={item.trigger}>
                    <TableCell>
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                        <span className="font-medium text-gray-800">{item.trigger}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{item.actie}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      {/* Maandelijkse Review Protocol */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          Maandelijkse Review Protocol
        </h2>
        <Card>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              {reviewItems.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded border-2 border-indigo-300 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3 h-3 text-indigo-400" />
                  </div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-gray-100">
              <Button variant="outline" className="gap-2 text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                <Zap className="w-4 h-4" />
                Review starten
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
