import { Loader2 } from "lucide-react";

function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
        <p className="text-lg font-medium">Loading movies data...</p>
      </div>
    </div>
  );
}

export default Loading;
