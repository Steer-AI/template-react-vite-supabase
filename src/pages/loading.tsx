import { Loader2 } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="container mx-auto min-h-screen flex flex-col items-center justify-center">
      <Loader2 className="w-4 h-4 animate-spin" />
    </div>
  );
};

export default LoadingPage;
