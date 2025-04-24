
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Menu,
  ChevronDown,
  ChevronUp,
  BarChart2,
  Calendar,
  Users,
  Star,
  PieChart
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-pl-purple text-white py-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/66088b53-3019-4abb-80c3-ebe9eaa6b4d4.png" 
              alt="FantaSawy Logo" 
              className="h-10 w-auto"
            />
            <span className="font-bold text-xl hidden md:inline">Fantasawy</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/live-tracker" className="hover:text-pl-green transition-colors">
            Live Tracker
          </Link>
          <Link to="/player-stats" className="hover:text-pl-green transition-colors">
            Player Stats
          </Link>
          <Link to="/fixture-planner" className="hover:text-pl-green transition-colors">
            Fixture Planner
          </Link>
          <Link to="/top-picks" className="hover:text-pl-green transition-colors">
            Top Picks
          </Link>
          <Link to="/squad-builder" className="hover:text-pl-green transition-colors">
            Squad Builder
          </Link>
          <Button variant="outline" className="bg-pl-green text-pl-purple hover:bg-green-400">
            Sign In
          </Button>
        </div>
        
        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu} 
            className="text-white hover:text-pl-green"
          >
            <Menu size={24} />
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-pl-purple border-t border-pl-purple/20 animate-slide-in">
          <div className="container mx-auto px-4 py-2">
            <Link 
              to="/live-tracker" 
              className="flex items-center py-3 border-b border-pl-purple/20 text-white hover:text-pl-green"
              onClick={() => setIsMenuOpen(false)}
            >
              <BarChart2 size={18} className="mr-2" />
              Live Tracker
            </Link>
            <Link 
              to="/player-stats" 
              className="flex items-center py-3 border-b border-pl-purple/20 text-white hover:text-pl-green"
              onClick={() => setIsMenuOpen(false)}
            >
              <Users size={18} className="mr-2" />
              Player Stats
            </Link>
            <Link 
              to="/fixture-planner" 
              className="flex items-center py-3 border-b border-pl-purple/20 text-white hover:text-pl-green"
              onClick={() => setIsMenuOpen(false)}
            >
              <Calendar size={18} className="mr-2" />
              Fixture Planner
            </Link>
            <Link 
              to="/top-picks" 
              className="flex items-center py-3 border-b border-pl-purple/20 text-white hover:text-pl-green"
              onClick={() => setIsMenuOpen(false)}
            >
              <Star size={18} className="mr-2" />
              Top Picks
            </Link>
            <Link 
              to="/squad-builder" 
              className="flex items-center py-3 text-white hover:text-pl-green"
              onClick={() => setIsMenuOpen(false)}
            >
              <PieChart size={18} className="mr-2" />
              Squad Builder
            </Link>
            <div className="py-3 mt-2">
              <Button className="w-full bg-pl-green text-pl-purple hover:bg-white">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
