import { useNavigate, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export const TopNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/login");
  };

  // Don't show on landing or login pages
  const showNavigation = location.pathname !== "/" && location.pathname !== "/login";

  if (!showNavigation) return null;

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
      <ThemeToggle />
      <Button
        variant="outline"
        size="icon"
        onClick={handleLogout}
        className="glassmorphism border-destructive/30 hover:border-destructive hover:bg-destructive/10 transition-all duration-300"
        aria-label="Logout"
      >
        <LogOut className="h-5 w-5 text-destructive" />
      </Button>
    </div>
  );
};
