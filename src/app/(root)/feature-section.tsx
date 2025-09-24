import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock, PenLine, Sparkles, BarChart3 } from "lucide-react";

export default function FeatureSection() {
  return (
    <>
      <div className="flex flex-col justify-center gap-3 px-3 mt-16 item-center">
        <h1 className="text-3xl font-bold text-center text-black font-nunito sm:text-5xl">
          Everything you need to journal mindfully
        </h1>
        <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
          <p className="w-full text-center text-black font-nunito sm:text-lg">
            Thoughtfully designed features that make journaling a peaceful and enriching experience
          </p>
        </div>
      </div>

      <div className="grid w-full max-w-6xl gap-6 px-3 pb-20 mx-auto mt-12 md:grid-cols-2">
        {/* Safe & Private */}
        <Card className="transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1" data-aos="fade-right">
          <CardHeader className="flex flex-row items-center gap-3">
            <Lock className="text-red-600 w-7 h-7" />
            <CardTitle className="text-xl font-bold">Safe & Private</CardTitle>
          </CardHeader>
          <CardDescription className="px-6 pb-4 text-gray-600">
            Your thoughts are encrypted and stored securely. Only you have access to your personal journal entries.
          </CardDescription>
          <CardContent />
        </Card>

        {/* Daily Reflection */}
        <Card className="transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1" data-aos="fade-right">
          <CardHeader className="flex flex-row items-center gap-3">
            <PenLine className="text-blue-600 w-7 h-7" />
            <CardTitle className="text-xl font-bold">Daily Reflection</CardTitle>
          </CardHeader>
          <CardDescription className="px-6 pb-4 text-gray-600">
            Capture your thoughts and reflect each day with a clean, distraction-free interface.
          </CardDescription>
          <CardContent />
        </Card>

        {/* Mindful Prompts */}
        <Card className="transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1" data-aos="fade-right">
          <CardHeader className="flex flex-row items-center gap-3">
            <Sparkles className="text-yellow-600 w-7 h-7" />
            <CardTitle className="text-xl font-bold">Mindful Prompts</CardTitle>
          </CardHeader>
          <CardDescription className="px-6 pb-4 text-gray-600">
            Gentle prompts encourage deeper reflection, helping you focus on gratitude and growth.
          </CardDescription>
          <CardContent />
        </Card>

        {/* Growth Insights */}
        <Card className="transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1" data-aos="fade-right">
          <CardHeader className="flex flex-row items-center gap-3">
            <BarChart3 className="text-green-600 w-7 h-7" />
            <CardTitle className="text-xl font-bold">Growth Insights</CardTitle>
          </CardHeader>
          <CardDescription className="px-6 pb-4 text-gray-600">
            Track patterns in your thoughts and watch your personal development unfold over time.
          </CardDescription>
          <CardContent />
        </Card>
      </div>
    </>
  );
}
