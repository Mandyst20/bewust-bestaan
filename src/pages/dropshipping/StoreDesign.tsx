import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ShoppingBag,
  CreditCard,
  Smartphone,
  CheckCircle,
  TrendingUp,
  Package,
  Star,
} from "lucide-react";

interface Product {
  name: string;
  priceRange: string;
  description: string;
  badge: string;
  badgeVariant: "default" | "secondary" | "destructive" | "outline";
  icon: React.ReactNode;
  tags: string[];
}

interface Bundle {
  name: string;
  price: string;
  savings: string;
  target: string;
  highlight?: boolean;
}

interface PaymentMethod {
  name: string;
  region: string;
  marketShare: string;
  integration: string;
}

interface ConversionItem {
  label: string;
  progress: number;
  status: string;
  statusColor: string;
}

const products: Product[] = [
  {
    name: "Mini GPS Locator",
    priceRange: "€9,99 – €14,99",
    description: "Multi-use: sleutels, huisdier, bagage",
    badge: "Bestseller",
    badgeVariant: "default",
    icon: <Star className="w-5 h-5 text-yellow-500" />,
    tags: ["Sleutels", "Huisdier", "Bagage"],
  },
  {
    name: "Smart Sleutelvinder",
    priceRange: "€6,99 – €8,99",
    description: "Instap model, impuls aankoop",
    badge: "Instap",
    badgeVariant: "secondary",
    icon: <ShoppingBag className="w-5 h-5 text-blue-500" />,
    tags: ["Instap", "Impuls"],
  },
  {
    name: "GPS Huisdier Halsband",
    priceRange: "€24,99 – €39,99",
    description: "Emotioneel premium, waterdicht",
    badge: "Premium",
    badgeVariant: "outline",
    icon: <Star className="w-5 h-5 text-purple-500" />,
    tags: ["Waterdicht", "Premium", "Huisdier"],
  },
  {
    name: "Voertuig Tracker",
    priceRange: "€34,99 – €59,99",
    description: "B2B potentieel, fleet management",
    badge: "B2B",
    badgeVariant: "destructive",
    icon: <TrendingUp className="w-5 h-5 text-green-500" />,
    tags: ["B2B", "Fleet", "Voertuig"],
  },
];

const bundles: Bundle[] = [
  {
    name: "2-Pack",
    price: "€17,99",
    savings: "bespaar 25%",
    target: "Koppels, dual-locatie",
  },
  {
    name: "3-Pack Familie",
    price: "€24,99",
    savings: "bespaar 31%",
    target: "Gezinnen, cadeaus",
    highlight: true,
  },
  {
    name: "Familie Pack 5×",
    price: "€37,99",
    savings: "bespaar 37%",
    target: "Uitgebreide bescherming",
  },
];

const paymentMethods: PaymentMethod[] = [
  {
    name: "iDEAL",
    region: "Nederland",
    marketShare: "70%+ marktaandeel",
    integration: "Mollie integratie ✓",
  },
  {
    name: "Bancontact",
    region: "België",
    marketShare: "45% marktaandeel",
    integration: "Mollie integratie ✓",
  },
  {
    name: "Creditcard",
    region: "België",
    marketShare: "35% marktaandeel",
    integration: "Visa/MC/Amex ✓",
  },
  {
    name: "PayPal",
    region: "Beide",
    marketShare: "15% marktaandeel",
    integration: "Geïntegreerd ✓",
  },
  {
    name: "BNPL/Klarna",
    region: "Groeiend",
    marketShare: "5-10%",
    integration: "Optioneel ✓",
  },
];

const conversionItems: ConversionItem[] = [
  {
    label: "Mobile Responsiviteit",
    progress: 100,
    status: "Voltooid",
    statusColor: "text-green-600",
  },
  {
    label: "Checkout Flow",
    progress: 90,
    status: "Bijna klaar",
    statusColor: "text-blue-600",
  },
  {
    label: "Laadsnelheid <2s",
    progress: 85,
    status: "In progress",
    statusColor: "text-yellow-600",
  },
  {
    label: "Trust Signals",
    progress: 100,
    status: "Voltooid",
    statusColor: "text-green-600",
  },
  {
    label: "Verlaten Winkelwagen Recovery",
    progress: 75,
    status: "In progress",
    statusColor: "text-yellow-600",
  },
];

const checkoutRequirements = [
  {
    icon: <Smartphone className="w-5 h-5 text-blue-500" />,
    title: "One-page checkout",
    description: "Gestroomlijnde, eenstaps betaalervaring",
  },
  {
    icon: <CreditCard className="w-5 h-5 text-purple-500" />,
    title: "Express betaling",
    description: "Apple Pay & Google Pay ondersteuning",
  },
  {
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    title: "Auto BTW berekening EU",
    description: "Nederland 21% · België 21% · Luxemburg 17%",
  },
];

const StoreDesign = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <ShoppingBag className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            Store Design &amp; UX Optimalisatie
          </h1>
        </div>
        <p className="text-gray-500 text-lg ml-11">
          GPS Tracker Dropshipping Store — Benelux Markt
        </p>
      </div>

      {/* Product Catalog */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">
            Product Catalogus
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Card
              key={product.name}
              className="hover:shadow-md transition-shadow border border-gray-200"
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {product.icon}
                    <span className="font-semibold text-gray-800 text-sm leading-tight">
                      {product.name}
                    </span>
                  </div>
                  <Badge variant={product.badgeVariant} className="text-xs shrink-0">
                    {product.badge}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700 font-bold text-base mb-1">
                  {product.priceRange}
                </p>
                <p className="text-gray-500 text-sm mb-3">
                  {product.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Bundle Configuraties */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingBag className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">
            Bundle Configuraties
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {bundles.map((bundle) => (
            <Card
              key={bundle.name}
              className={`border transition-shadow hover:shadow-md ${
                bundle.highlight
                  ? "border-blue-400 bg-blue-50 shadow-md"
                  : "border-gray-200"
              }`}
            >
              <CardContent className="pt-6">
                {bundle.highlight && (
                  <div className="flex justify-center mb-2">
                    <Badge className="bg-blue-600 text-white text-xs">
                      Meest populair
                    </Badge>
                  </div>
                )}
                <h3 className="text-lg font-bold text-gray-800 text-center mb-1">
                  {bundle.name}
                </h3>
                <p className="text-3xl font-extrabold text-blue-700 text-center mb-1">
                  {bundle.price}
                </p>
                <p className="text-green-600 font-medium text-sm text-center mb-3">
                  {bundle.savings}
                </p>
                <p className="text-gray-500 text-sm text-center mb-4">
                  {bundle.target}
                </p>
                <Button
                  className={`w-full ${
                    bundle.highlight
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  variant={bundle.highlight ? "default" : "outline"}
                >
                  Selecteren
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Betaalmethoden */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">
            Betaalmethoden
          </h2>
        </div>
        <Card className="border border-gray-200">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">
                      Methode
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">
                      Regio
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">
                      Marktaandeel
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">
                      Integratie
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paymentMethods.map((method, index) => (
                    <tr
                      key={method.name}
                      className={`border-b border-gray-100 last:border-0 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {method.name}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {method.region}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {method.marketShare}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-green-600 font-medium">
                          {method.integration}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Conversie Optimalisatie */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">
            Conversie Optimalisatie
          </h2>
        </div>
        <Card className="border border-gray-200">
          <CardContent className="pt-6 space-y-5">
            {conversionItems.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-medium text-gray-700">
                    {item.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">
                      {item.progress}%
                    </span>
                    <span className={`text-xs font-medium ${item.statusColor}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
                <Progress value={item.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Checkout Vereisten */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">
            Checkout Vereisten
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {checkoutRequirements.map((req) => (
            <Card
              key={req.title}
              className="border border-gray-200 hover:shadow-md transition-shadow"
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  {req.icon}
                  <h3 className="font-semibold text-gray-800">{req.title}</h3>
                </div>
                <p className="text-gray-500 text-sm">{req.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StoreDesign;
