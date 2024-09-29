import { service } from "@/lib/services";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function Services() {
  return (
    <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {service.map((service) => (
        <Card key={service.title} className="service flex flex-col gap-2 p-2">
          <CardHeader>
            <service.icon className="text-3xl" />
            <CardTitle className="text-2xl font-semibold">{service.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-sm">{service.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}