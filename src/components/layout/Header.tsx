import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Heart, User, LogOut, Settings, Loader2, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Children Needs", href: "/needs" },
  { name: "Donate", href: "/donate" },
  { name: "Earn & Support", href: "/earn" },
  { name: "Feed", href: "/feed" },
  { name: "Events", href: "/events" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, isLoading, isAdmin, isSubAdmin, signOut } = useAuth();
  const { isDevMode, toggleDevMode } = useTheme();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shadow-soft group-hover:shadow-card transition-shadow">
              <img src="/logo.png" alt="Shri Shradhanand Logo" className="w-full h-full object-contain" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display text-lg md:text-xl font-semibold text-foreground leading-tight">
                Shri Shradhanand
              </h1>
              <p className="text-xs text-muted-foreground">Anathalay, Nagpur</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  location.pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button & User Menu */}
          <div className="hidden md:flex items-center gap-3">
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.full_name || 'User'} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(profile?.full_name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {profile?.full_name && (
                        <p className="font-medium">{profile.full_name}</p>
                      )}
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      {(isAdmin || isSubAdmin) && (
                        <span className="text-xs text-primary font-medium">
                          {isAdmin ? 'Admin' : 'Sub-Admin'}
                        </span>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  {(isAdmin || isSubAdmin) && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="cursor-pointer">
                          <Settings className="mr-2 h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={toggleDevMode} className="cursor-pointer">
                        <Palette className="mr-2 h-4 w-4" />
                        {isDevMode ? 'Hide Theme Switcher' : 'Show Theme Switcher'}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" asChild>
                <Link to="/auth">
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            )}
            <Button variant="hero" size="lg" asChild>
              <Link to="/donate">
                <Heart className="w-4 h-4" />
                Donate Now
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-3 text-base font-medium rounded-lg transition-colors",
                    location.pathname === item.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-border space-y-2">
                {user ? (
                  <>
                    <div className="px-4 py-2 flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={profile?.avatar_url || undefined} />
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">
                          {getInitials(profile?.full_name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{profile?.full_name || 'User'}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    {(isAdmin || isSubAdmin) && (
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/admin" onClick={() => setIsOpen(false)}>
                          <Settings className="w-4 h-4 mr-2" />
                          Admin Dashboard
                        </Link>
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      className="w-full text-destructive" 
                      onClick={() => { handleSignOut(); setIsOpen(false); }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      <User className="w-4 h-4 mr-2" />
                      Sign In
                    </Link>
                  </Button>
                )}
                <Button variant="hero" size="lg" className="w-full" asChild>
                  <Link to="/donate" onClick={() => setIsOpen(false)}>
                    <Heart className="w-4 h-4" />
                    Donate Now
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
