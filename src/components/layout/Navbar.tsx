import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Pill, Search, PlusCircle, User, LogOut, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl gradient-primary flex items-center justify-center shadow-soft group-hover:shadow-glow transition-all duration-300">
              <Pill className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold text-gradient">Medi-Share</span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">Open Innovation</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <Link 
              to="/search" 
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
            >
              <Search className="w-4 h-4" />
              Search Medicines
            </Link>
            <Link 
              to="/list" 
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
            >
              <PlusCircle className="w-4 h-4" />
              List Medicine
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 rounded-xl border-2">
                    <User className="w-4 h-4" />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 rounded-xl">
                  <DropdownMenuItem onClick={() => navigate('/dashboard')} className="rounded-lg">
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="rounded-lg text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" className="rounded-xl" onClick={() => navigate('/auth')}>
                  Sign In
                </Button>
                <Button className="gradient-primary text-primary-foreground rounded-xl shadow-soft hover:shadow-glow transition-all duration-300" onClick={() => navigate('/auth?mode=signup')}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-secondary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              <Link
                to="/search"
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                onClick={() => setIsOpen(false)}
              >
                <Search className="w-4 h-4" />
                Search Medicines
              </Link>
              <Link
                to="/list"
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                onClick={() => setIsOpen(false)}
              >
                <PlusCircle className="w-4 h-4" />
                List Medicine
              </Link>
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <button
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-all"
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex gap-2 px-4 pt-2">
                  <Button variant="ghost" className="flex-1 rounded-xl" onClick={() => { navigate('/auth'); setIsOpen(false); }}>
                    Sign In
                  </Button>
                  <Button className="flex-1 gradient-primary text-primary-foreground rounded-xl" onClick={() => { navigate('/auth?mode=signup'); setIsOpen(false); }}>
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}