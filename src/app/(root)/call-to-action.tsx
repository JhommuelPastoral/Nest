import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <section className="px-4 pb-20 bg-gradient-soft">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="mb-6 text-4xl font-bold leading-tight md:text-5xl text-foreground">
          Start your journey today
        </h2>
        
        <p className="max-w-2xl mx-auto mb-12 text-xl leading-relaxed text-muted-foreground">
          Join thousands who have made Nest their trusted companion for self-reflection and growth.
        </p>
        
        <div className="flex flex-col items-center justify-center gap-4 mb-8 sm:flex-row">
          <Button variant="default" size="lg" className="w-full h-auto px-8 py-4 text-lg rounded-full cursor-pointer sm:w-auto">
            Create your Nest
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Free to start • No credit card required • Private & secure
        </p>
      </div>
    </section>  );
}