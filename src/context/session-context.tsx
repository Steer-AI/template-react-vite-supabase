import { createContext, useContext, useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import LoadingPage from "@/pages/loading";
import { toast } from "sonner";

const SessionContext = createContext<{
  session: Session | null;
  signOut: () => Promise<void>;
}>({
  session: null,
  signOut: async () => {},
});

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

type Props = { children: React.ReactNode };
export const SessionProvider = ({ children }: Props) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStateListener = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setSession(session);
        setIsLoading(false);
      }
    );

    return () => {
      authStateListener.data.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Signed out successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign out");
    }
  };

  return (
    <SessionContext.Provider value={{ session, signOut }}>
      {isLoading ? <LoadingPage /> : children}
    </SessionContext.Provider>
  );
};
