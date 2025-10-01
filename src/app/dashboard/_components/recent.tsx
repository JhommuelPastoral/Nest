import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Page() {
  return (
    <Card className="h-full shadow-none bg-gradient-to-r from-gray-50 via-slate-200 to-gray-100">
      <CardHeader>
        <CardTitle>Recent</CardTitle>
        <CardDescription>Recent activities</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content</p>
      </CardContent>
    </Card>
  );
}