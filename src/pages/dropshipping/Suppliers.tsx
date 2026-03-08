import { Package, Truck, Star, TrendingUp, CheckCircle, AlertCircle, Clock } from "lucide-react";
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

interface Supplier {
  id: string;
  name: string;
  priceRange: string;
  deliveryTime: string;
  status: "Actief (Primair)" | "Actief (Backup)" | "In Overweging";
  highlights: string[];
  metrics: {
    label: string;
    value: string;
    icon: React.ReactNode;
  }[];
}

interface ProductVariant {
  name: string;
  purchasePrice: string;
  retailPrice: string;
  margin: string;
}

const suppliers: Supplier[] = [
  {
    id: "aliexpress",
    name: "AliExpress België Magazijn",
    priceRange: "€0,91 – €6,21 per unit",
    deliveryTime: "2–7 dagen",
    status: "Actief (Primair)",
    highlights: [
      "270.520 orders bewezen",
      "Kwaliteitsscore 4,8/5",
      "Snelle Benelux levering",
    ],
    metrics: [
      {
        label: "Prijsrange",
        value: "€0,91 – €6,21",
        icon: <TrendingUp className="h-4 w-4 text-green-500" />,
      },
      {
        label: "Levertijd",
        value: "2–7 dagen",
        icon: <Truck className="h-4 w-4 text-blue-500" />,
      },
      {
        label: "Kwaliteitsscore",
        value: "4,8 / 5",
        icon: <Star className="h-4 w-4 text-yellow-500" />,
      },
      {
        label: "Bewezen Orders",
        value: "270.520",
        icon: <Package className="h-4 w-4 text-purple-500" />,
      },
    ],
  },
  {
    id: "cjdropshipping",
    name: "CJ Dropshipping EU",
    priceRange: "€1,20 – €5,50 per unit",
    deliveryTime: "3–7 dagen",
    status: "Actief (Backup)",
    highlights: [
      "EU magazijn netwerk",
      "Automatische Shopify integratie",
      "Betrouwbare back-up leverancier",
    ],
    metrics: [
      {
        label: "Prijsrange",
        value: "€1,20 – €5,50",
        icon: <TrendingUp className="h-4 w-4 text-green-500" />,
      },
      {
        label: "Levertijd",
        value: "3–7 dagen",
        icon: <Truck className="h-4 w-4 text-blue-500" />,
      },
      {
        label: "Magazijn",
        value: "EU Netwerk",
        icon: <Package className="h-4 w-4 text-purple-500" />,
      },
      {
        label: "Integratie",
        value: "Shopify Auto",
        icon: <CheckCircle className="h-4 w-4 text-green-500" />,
      },
    ],
  },
  {
    id: "minifinder",
    name: "MiniFinder B2B",
    priceRange: "€8,50 – €15,00 per unit",
    deliveryTime: "1–3 werkdagen",
    status: "In Overweging",
    highlights: [
      "B2B reseller programma",
      "Premium kwaliteit",
      "Snelste levertijd",
    ],
    metrics: [
      {
        label: "Prijsrange",
        value: "€8,50 – €15,00",
        icon: <TrendingUp className="h-4 w-4 text-yellow-500" />,
      },
      {
        label: "Levertijd",
        value: "1–3 werkdagen",
        icon: <Truck className="h-4 w-4 text-blue-500" />,
      },
      {
        label: "Segment",
        value: "B2B Premium",
        icon: <Star className="h-4 w-4 text-yellow-500" />,
      },
      {
        label: "Kwaliteit",
        value: "Premium",
        icon: <CheckCircle className="h-4 w-4 text-yellow-500" />,
      },
    ],
  },
];

const productVariants: ProductVariant[] = [
  {
    name: "Basis Bluetooth Tracker",
    purchasePrice: "€0,91",
    retailPrice: "€9,99",
    margin: "281%",
  },
  {
    name: "Standaard GPS Tracker",
    purchasePrice: "€2,30",
    retailPrice: "€12,99",
    margin: "465%",
  },
  {
    name: "Premium GPS Tracker",
    purchasePrice: "€3,68",
    retailPrice: "€14,99",
    margin: "307%",
  },
  {
    name: "Pet GPS Halsband",
    purchasePrice: "€5,50",
    retailPrice: "€29,99",
    margin: "445%",
  },
];

const protocolSteps = [
  {
    step: 1,
    title: "Order Ontvangst",
    description:
      "Nieuwe order binnenkomt via Shopify webshop. Systeem controleert automatisch voorraadniveaus bij primaire leverancier.",
    icon: <Package className="h-5 w-5 text-blue-600" />,
  },
  {
    step: 2,
    title: "Leverancier Selectie",
    description:
      "Primaire keuze: AliExpress België Magazijn. Bij voorraadtekort of levertijdprobleem automatisch doorschakelen naar CJ Dropshipping EU.",
    icon: <CheckCircle className="h-5 w-5 text-green-600" />,
  },
  {
    step: 3,
    title: "Order Doorsturen",
    description:
      "Order wordt automatisch doorgezet naar geselecteerde leverancier inclusief klantgegevens en leveradres.",
    icon: <Truck className="h-5 w-5 text-blue-600" />,
  },
  {
    step: 4,
    title: "Track & Trace Activering",
    description:
      "Zodra leverancier verzendt, ontvangt klant automatisch track & trace code per e-mail.",
    icon: <Clock className="h-5 w-5 text-purple-600" />,
  },
  {
    step: 5,
    title: "Kwaliteitscontrole",
    description:
      "Na levering wordt klant gevraagd om beoordeling. Slechte scores leiden tot heroverweging van leveranciersstatus.",
    icon: <Star className="h-5 w-5 text-yellow-600" />,
  },
];

function getStatusBadge(status: Supplier["status"]) {
  switch (status) {
    case "Actief (Primair)":
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">
          <CheckCircle className="h-3 w-3 mr-1" />
          {status}
        </Badge>
      );
    case "Actief (Backup)":
      return (
        <Badge className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100">
          <CheckCircle className="h-3 w-3 mr-1" />
          {status}
        </Badge>
      );
    case "In Overweging":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100">
          <AlertCircle className="h-3 w-3 mr-1" />
          {status}
        </Badge>
      );
  }
}

function getSupplierBorderColor(status: Supplier["status"]) {
  switch (status) {
    case "Actief (Primair)":
      return "border-l-4 border-l-green-500";
    case "Actief (Backup)":
      return "border-l-4 border-l-blue-500";
    case "In Overweging":
      return "border-l-4 border-l-yellow-500";
  }
}

function getMarginColor(margin: string) {
  const value = parseInt(margin);
  if (value >= 400) return "text-green-700 font-bold";
  if (value >= 300) return "text-green-600 font-semibold";
  return "text-blue-600 font-semibold";
}

export default function Suppliers() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Package className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Leveranciers Beheer</h1>
            <p className="text-gray-500 mt-1">
              GPS tracker dropshipping — Benelux markt
            </p>
          </div>
        </div>

        {/* Supplier Cards */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Leveranciers Overzicht</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {suppliers.map((supplier) => (
              <Card
                key={supplier.id}
                className={`bg-white shadow-sm hover:shadow-md transition-shadow ${getSupplierBorderColor(supplier.status)}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base font-semibold text-gray-900 leading-snug">
                      {supplier.name}
                    </CardTitle>
                    {getStatusBadge(supplier.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {supplier.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="bg-gray-50 rounded-lg p-3 flex flex-col gap-1"
                      >
                        <div className="flex items-center gap-1.5">
                          {metric.icon}
                          <span className="text-xs text-gray-500">{metric.label}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-800">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-1">
                    {supplier.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <CheckCircle className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  {/* Detail Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-gray-200 text-gray-700 hover:bg-gray-50"
                  >
                    Details bekijken
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Product Selection Table */}
        <section>
          <Card className="bg-white shadow-sm">
            <CardHeader className="border-b border-gray-100">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Product Selectie
                </CardTitle>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                GPS tracker varianten met inkoopprijs, adviesprijs en winstmarge
              </p>
            </CardHeader>
            <CardContent className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-gray-700">Product</TableHead>
                    <TableHead className="font-semibold text-gray-700">Inkoopprijs</TableHead>
                    <TableHead className="font-semibold text-gray-700">Retailprijs</TableHead>
                    <TableHead className="font-semibold text-gray-700">Marge</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productVariants.map((product) => (
                    <TableRow key={product.name} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-900">
                        {product.name}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {product.purchasePrice}
                      </TableCell>
                      <TableCell className="text-gray-800 font-semibold">
                        {product.retailPrice}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-green-50 ${getMarginColor(product.margin)}`}
                        >
                          <TrendingUp className="h-3 w-3" />
                          {product.margin}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        {/* Supplier Protocol */}
        <section>
          <Card className="bg-white shadow-sm">
            <CardHeader className="border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Leverancier Protocol
                </CardTitle>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Order routing automatisering — stap voor stap
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="relative">
                {/* Vertical connector line */}
                <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-gray-200" />

                <ol className="space-y-6">
                  {protocolSteps.map((item, index) => (
                    <li key={item.step} className="flex gap-4 relative">
                      {/* Step Icon */}
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center z-10 shadow-sm">
                        {item.icon}
                      </div>

                      {/* Step Content */}
                      <div className="flex-1 pb-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                            Stap {item.step}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
