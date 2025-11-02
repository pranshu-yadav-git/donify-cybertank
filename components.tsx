import React, { useState, useEffect, useRef, useCallback, createContext, useContext, ReactNode } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// FIX: Import MOCK_CAMPAIGNS to resolve reference error.
import { DonifyLogo, NAV_LINKS, Bars3Icon, XMarkIcon, HomeIcon, GlobeAltIcon, PlusCircleIcon, TrophyIcon, UserCircleIcon, CheckBadgeIcon, ArrowUpIcon, SOCIAL_LINKS, InitialsAvatar, CreditCardIcon, DevicePhoneMobileIcon, BuildingLibraryIcon, ArrowLeftIcon, ChatBubbleOvalLeftEllipsisIcon, MOCK_CAMPAIGNS, MOCK_LOCATION_REQUESTS, EnvelopeIcon, PhotoIcon, generateUniqueCampaigns } from './constants';
import type { Campaign, FAQItem, AuthUser, ChatbotMessage, LocationRequest } from './types';


// =================================================================
// GLOBAL STATE CONTEXT (Auth + Campaigns)
// =================================================================

interface GlobalContextType {
  currentUser: AuthUser | null;
  campaigns: Campaign[];
  locationRequests: LocationRequest[];
  login: (email: string, password: string) => boolean;
  signup: (userData: Omit<UserInDb, 'password' | 'totalDonatedThisMonth' | 'donationHistory' | 'verified'> & { password: string }) => { success: boolean; message?: string };
  logout: () => void;
  recordDonation: (campaignId: string, amount: number) => { campaignCompleted: boolean };
  recordLocalDonation: (requestId: number, amount: number) => void;
  addCampaign: (newCampaignData: Omit<Campaign, 'id' | 'raised' | 'donors' | 'updates' | 'comments' | 'organizer' | 'creatorType' | 'verified' | 'isCompleted' | 'urgency' | 'images'> & { imageUrl: string }) => void;
  addLocationRequest: (requestData: Omit<LocationRequest, 'id' | 'position' | 'type'>) => void;
  getCampaignById: (id: string) => Campaign | undefined;
  getLocationRequestById: (id: number) => LocationRequest | undefined;
  updateUserProfile: (updatedData: Partial<AuthUser>) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

type UserInDb = {
    userType: 'individual' | 'ngo';
    name: string; // Individual name or Contact Person name for NGO
    email: string;
    password: string;
    ngoName?: string;
    phone?: string;
    address?: string;
    pan?: string;
    aadhaar?: string;
    totalDonatedThisMonth: number;
    donationHistory: { campaignId: string; campaignTitle: string; amount: number; date: Date }[];
    verified: boolean;
}

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [users, setUsers] = useState<UserInDb[]>([
        { userType: 'individual', name: 'Priya Sharma', email: 'donor@donify.com', password: 'password123', pan: 'ABXXC1234Z', aadhaar: '', totalDonatedThisMonth: 1500, donationHistory: [{campaignId: '1', campaignTitle: 'Help Children in Need Get Education', amount: 1500, date: new Date()}], verified: true },
        { userType: 'ngo', name: 'Ramesh Gupta', email: 'ngo@donify.com', password: 'password123', ngoName: 'Jal Jeevan Trust', phone: '+91-8765432109', address: '456, Oasis Road, Jaipur, Rajasthan, 302001', pan: 'NGOJPAN123Z', aadhaar: '123456789012', totalDonatedThisMonth: 0, donationHistory: [], verified: true },
        { userType: 'individual', name: 'Guest User', email: 'guest@donify.com', password: 'guest', totalDonatedThisMonth: 0, donationHistory: [], verified: false },
    ]);

    const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
    const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
        try {
            const storedCampaigns = localStorage.getItem('donifyCampaigns');
            if (storedCampaigns) return JSON.parse(storedCampaigns);

            let initialCampaigns = MOCK_CAMPAIGNS;
            const requiredCampaigns = 150 - initialCampaigns.length;
            if (requiredCampaigns > 0) {
                const newCampaigns = generateUniqueCampaigns(requiredCampaigns, initialCampaigns);
                initialCampaigns = [...initialCampaigns, ...newCampaigns];
            }
            return initialCampaigns;
        } catch {
            let initialCampaigns = MOCK_CAMPAIGNS;
            const requiredCampaigns = 150 - initialCampaigns.length;
            if (requiredCampaigns > 0) {
                const newCampaigns = generateUniqueCampaigns(requiredCampaigns, initialCampaigns);
                initialCampaigns = [...initialCampaigns, ...newCampaigns];
            }
            return initialCampaigns;
        }
    });
    const [locationRequests, setLocationRequests] = useState<LocationRequest[]>(MOCK_LOCATION_REQUESTS);

    useEffect(() => {
        localStorage.setItem('donifyCampaigns', JSON.stringify(campaigns));
    }, [campaigns]);
    
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('donifyUser');
            if (storedUser) {
                const parsedUser: AuthUser = JSON.parse(storedUser);
                if (parsedUser.donationHistory) {
                    parsedUser.donationHistory = parsedUser.donationHistory.map(item => ({
                        ...item,
                        date: new Date(item.date),
                    }));
                }
                setCurrentUser(parsedUser);
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            localStorage.removeItem('donifyUser');
        }
    }, []);

    const login = (email: string, password: string): boolean => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            const userData: AuthUser = { 
                userType: user.userType,
                name: user.name, 
                email: user.email, 
                ngoName: user.ngoName,
                phone: user.phone,
                address: user.address,
                pan: user.pan,
                aadhaar: user.aadhaar,
                totalDonatedThisMonth: user.totalDonatedThisMonth || 0,
                donationHistory: user.donationHistory || [],
                verified: user.verified || false,
            };
            setCurrentUser(userData);
            localStorage.setItem('donifyUser', JSON.stringify(userData));
            return true;
        }
        return false;
    };

    const signup = (userData: Omit<UserInDb, 'password' | 'totalDonatedThisMonth' | 'donationHistory' | 'verified'> & { password: string }) => {
        const { email, pan, aadhaar } = userData;
        if (users.some(u => u.email === email)) {
            return { success: false, message: 'This email is already registered.' };
        }
        const verified = !!(pan || aadhaar);
        const newUser: UserInDb = {
            ...userData,
            totalDonatedThisMonth: 0,
            donationHistory: [],
            verified,
        };
        setUsers(prev => [...prev, newUser]);
        return { success: true };
    };
    
    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('donifyUser');
        localStorage.removeItem('paymentSetupComplete');
    };

    const recordDonation = (campaignId: string, amount: number) => {
        let campaignCompleted = false;
        const campaign = campaigns.find(c => c.id === campaignId);
        if (!campaign) return { campaignCompleted };

        setCampaigns(prevCampaigns => 
            prevCampaigns.map(c => {
                if(c.id === campaignId) {
                    const newRaised = c.raised + amount;
                    if (newRaised >= c.goal && !c.isCompleted) {
                        campaignCompleted = true;
                    }
                    return { ...c, raised: newRaised, donors: c.donors + 1, isCompleted: newRaised >= c.goal };
                }
                return c;
            })
        );

        if (currentUser) {
            const updatedUser: AuthUser = {
                ...currentUser,
                totalDonatedThisMonth: currentUser.totalDonatedThisMonth + amount,
                donationHistory: [...currentUser.donationHistory, { campaignId, campaignTitle: campaign.title, amount, date: new Date() }]
            };
            setCurrentUser(updatedUser);
            localStorage.setItem('donifyUser', JSON.stringify(updatedUser));
            
            setUsers(prevUsers => prevUsers.map(u => u.email === currentUser.email ? { ...u, totalDonatedThisMonth: updatedUser.totalDonatedThisMonth, donationHistory: updatedUser.donationHistory } : u));
        }
        return { campaignCompleted };
    };

    const recordLocalDonation = (requestId: number, amount: number) => {
        if (currentUser) {
            const request = locationRequests.find(r => r.id === requestId);
            const updatedUser: AuthUser = {
                ...currentUser,
                totalDonatedThisMonth: currentUser.totalDonatedThisMonth + amount,
                donationHistory: [...currentUser.donationHistory, { campaignId: `local-${requestId}`, campaignTitle: request?.title || 'Local Donation', amount, date: new Date() }]
            };
            setCurrentUser(updatedUser);
            localStorage.setItem('donifyUser', JSON.stringify(updatedUser));
            setUsers(prevUsers => prevUsers.map(u => u.email === currentUser.email ? { ...u, totalDonatedThisMonth: updatedUser.totalDonatedThisMonth, donationHistory: updatedUser.donationHistory } : u));
        }
    };
    
    const addCampaign = (newCampaignData: Omit<Campaign, 'id' | 'raised' | 'donors' | 'updates' | 'comments' | 'organizer' | 'creatorType' | 'verified' | 'isCompleted' | 'urgency' | 'images'> & { imageUrl: string }) => {
        if (!currentUser) return;

        const { imageUrl, ...restData } = newCampaignData;
        const newCampaign: Campaign = {
            ...restData,
            id: `campaign-${Date.now()}`,
            images: [imageUrl, `https://picsum.photos/seed/${restData.title.slice(0, 10)}/600/400`],
            raised: 0,
            donors: 0,
            updates: [],
            comments: [],
            creatorType: currentUser.userType,
            verified: currentUser.userType === 'ngo' || (currentUser.verified && newCampaignData.category === 'Disaster Relief'),
            organizer: {
                name: currentUser.name,
                avatarUrl: '',
                ...(currentUser.userType === 'ngo' && {
                    ngoDetails: {
                        name: currentUser.ngoName!,
                        phone: currentUser.phone!,
                        email: currentUser.email,
                        address: currentUser.address!,
                    }
                })
            },
            urgency: newCampaignData.category === 'Disaster Relief' ? 'High' : 'Medium',
            isCompleted: false,
        };

        setCampaigns(prev => [newCampaign, ...prev]);
    };

    const addLocationRequest = (requestData: Omit<LocationRequest, 'id' | 'position' | 'type'>) => {
        const newRequest: LocationRequest = {
            ...requestData,
            id: Date.now(),
            type: 'recipient',
            position: {
                lat: 28.4595 + (Math.random() - 0.5) * 0.05,
                lng: 77.0266 + (Math.random() - 0.5) * 0.05,
            }
        };
        setLocationRequests(prev => [newRequest, ...prev]);
    };
    
    const getCampaignById = (id: string) => campaigns.find(c => c.id === id);
    const getLocationRequestById = (id: number) => locationRequests.find(r => r.id === id);


    const updateUserProfile = (updatedData: Partial<AuthUser>) => {
        if (!currentUser) return;
    
        // Determine new verification status based on the final state of the user data
        const newPan = updatedData.pan !== undefined ? updatedData.pan : currentUser.pan;
        const newAadhaar = updatedData.aadhaar !== undefined ? updatedData.aadhaar : currentUser.aadhaar;
        const isNowVerified = !!(newPan || newAadhaar);
    
        const updatedUser: AuthUser = {
            ...currentUser,
            ...updatedData,
            verified: isNowVerified, // Update the verified status
        };
    
        setCurrentUser(updatedUser);
        localStorage.setItem('donifyUser', JSON.stringify(updatedUser));
        
        // Also update the main 'users' array which acts as the DB
        setUsers(prevUsers => prevUsers.map(u => {
            if (u.email === currentUser.email) {
                // Merge existing user data with the changes and the new verified status
                // This prevents losing fields like 'password' which are not in AuthUser
                return {
                    ...u, 
                    ...updatedData,
                    verified: isNowVerified
                };
            }
            return u;
        }));
    };

    const value = { currentUser, campaigns, locationRequests, login, signup, logout, recordDonation, recordLocalDonation, addCampaign, addLocationRequest, getCampaignById, getLocationRequestById, updateUserProfile };

    return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
};

// =================================================================
// NAVIGATION COMPONENTS
// =================================================================

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser } = useGlobal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-base font-medium transition-colors duration-300 ${isActive ? 'text-blue-500' : 'text-gray-600 hover:text-blue-500'}`;
  
  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <NavLink to="/" className="flex items-center space-x-2">
              <DonifyLogo className="h-9 w-9" />
              <span className="text-2xl font-bold text-gray-800 tracking-tight">Donify</span>
            </NavLink>

            <nav className="hidden md:flex items-center space-x-8">
              {NAV_LINKS.map(link => (
                <NavLink key={link.name} to={link.path} className={navLinkClasses}>
                  {link.name}
                </NavLink>
              ))}
            </nav>
            
            <div className="hidden md:flex items-center space-x-4">
              {currentUser ? (
                <NavLink to="/profile" className="flex items-center space-x-3 group p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <InitialsAvatar name={currentUser.name} className="h-10 w-10 text-base" />
                    <div>
                        <p className="font-semibold text-gray-800 leading-tight flex items-center gap-1.5">{currentUser.name} {currentUser.verified && <CheckBadgeIcon className="h-4 w-4 text-blue-500" title="Verified User" />}</p>
                        <p className="text-xs text-gray-500 leading-tight">{currentUser.userType === 'ngo' ? currentUser.ngoName : `₹${currentUser.totalDonatedThisMonth.toLocaleString('en-IN')} donated`}</p>
                    </div>
                </NavLink>
              ) : (
                <>
                  <NavLink to="/login" className="text-gray-600 hover:text-blue-500 font-medium">Log In</NavLink>
                  <PrimaryButton to="/discover">Donate Now</PrimaryButton>
                </>
              )}
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
                {isOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-white/90 backdrop-blur-lg shadow-lg"
            >
              <nav className="flex flex-col items-center space-y-4 py-6">
                {NAV_LINKS.map(link => (
                  <NavLink key={link.name} to={link.path} className={navLinkClasses} onClick={() => setIsOpen(false)}>
                    {link.name}
                  </NavLink>
                ))}
                <div className="pt-4 flex flex-col items-center space-y-4 w-full px-8">
                  {currentUser ? (
                    <NavLink to="/profile" className="font-semibold text-gray-800" onClick={() => setIsOpen(false)}>{currentUser.name}</NavLink>
                  ) : (
                    <>
                      <NavLink to="/login" className="text-gray-600 hover:text-blue-500 font-medium" onClick={() => setIsOpen(false)}>Log In</NavLink>
                      <PrimaryButton onClick={() => setIsOpen(false)} to="/discover" className="w-full">Donate Now</PrimaryButton>
                    </>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export const Footer: React.FC = () => (
    <footer className="bg-gradient-to-r from-gray-800 via-slate-900 to-gray-800 text-gray-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2 lg:col-span-1">
                    <div className="flex items-center space-x-2 mb-4">
                       <DonifyLogo className="h-9 w-9" />
                       <span className="text-2xl font-bold text-white tracking-tight">Donify</span>
                    </div>
                    <p className="text-gray-400">Your kindness, their hope.</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><NavLink to="/about" className="text-gray-400 hover:text-white">About Us</NavLink></li>
                        <li><NavLink to="/contact" className="text-gray-400 hover:text-white">Contact</NavLink></li>
                        <li><NavLink to="/faq" className="text-gray-400 hover:text-white">FAQ</NavLink></li>
                    </ul>
                </div>
                 <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
                    <ul className="space-y-2">
                        <li><NavLink to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</NavLink></li>
                        <li><NavLink to="/terms" className="text-gray-400 hover:text-white">Terms of Service</NavLink></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                      {SOCIAL_LINKS.map(social => (
                        <a key={social.name} href={social.href} aria-label={social.name} className="text-gray-400 hover:text-white transition-colors">
                          <social.icon />
                        </a>
                      ))}
                    </div>
                </div>
            </div>
            <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-500">
                <p>&copy; {new Date().getFullYear()} Donify. All rights reserved.</p>
            </div>
        </div>
    </footer>
);


export const BottomNav: React.FC = () => {
  const location = useLocation();
  const navItems = [
    { path: '/', icon: HomeIcon, label: 'Home' },
    { path: '/discover', icon: GlobeAltIcon, label: 'Discover' },
    { path: '/create', icon: PlusCircleIcon, label: 'Create' },
    { path: '/leaderboard', icon: TrophyIcon, label: 'Leaders' },
    { path: '/profile', icon: UserCircleIcon, label: 'Profile' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-lg border-t border-gray-200 z-40">
      <div className="flex justify-around items-center h-full">
        {navItems.map(item => (
          <NavLink key={item.path} to={item.path} className="flex flex-col items-center justify-center space-y-1 w-1/5">
            <item.icon className={`h-6 w-6 transition-colors ${location.pathname === item.path ? 'text-blue-500' : 'text-gray-500'}`} />
            <span className={`text-xs font-medium transition-colors ${location.pathname === item.path ? 'text-blue-500' : 'text-gray-500'}`}>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export const BackButton: React.FC<{ className?: string }> = ({ className }) => {
    const navigate = useNavigate();
    return (
        <button onClick={() => navigate(-1)} className={`inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors ${className}`}>
            <ArrowLeftIcon className="h-5 w-5" />
            Back
        </button>
    );
};

// =================================================================
// UI COMPONENTS
// =================================================================

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  to?: string;
}

export const PrimaryButton: React.FC<ButtonProps> = ({ children, onClick, className, to, ...props }) => {
  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(to) navigate(to);
    if(onClick) onClick(e);
  };
  return (
    <button onClick={handleClick} className={`px-6 py-3 rounded-xl bg-blue-500 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed ${className}`} {...props}>
        {children}
    </button>
  );
};

export const SecondaryButton: React.FC<ButtonProps> = ({ children, onClick, className, to }) => {
    const navigate = useNavigate();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if(to) navigate(to);
      if(onClick) onClick(e);
    };
    return (
        <button onClick={handleClick} className={`px-6 py-3 rounded-xl bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transform hover:scale-105 transition-all duration-300 ${className}`}>
            {children}
        </button>
    );
};

export const CauseCard: React.FC<{ campaign: Campaign }> = ({ campaign }) => {
  const progress = Math.min((campaign.raised / campaign.goal) * 100, 100);
  const navigate = useNavigate();
  const isCompleted = campaign.isCompleted || campaign.raised >= campaign.goal;

  return (
    <motion.div 
      className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 group ${isCompleted ? 'cursor-default' : 'hover:shadow-2xl hover:-translate-y-2 cursor-pointer'}`}
      onClick={() => !isCompleted && navigate(`/cause/${campaign.id}`)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      layout
    >
      <div className="relative">
        <img src={campaign.images[0]} alt={campaign.title} className={`w-full h-48 object-cover transition-all duration-300 ${isCompleted ? 'filter grayscale' : ''}`} loading="lazy" />
        {isCompleted && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center">
                    <CheckBadgeIcon className="h-12 w-12 text-white mx-auto" />
                    <span className="text-white font-bold text-lg mt-2 block">Fundraiser Completed</span>
                </div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                  This fundraiser has reached its goal!
                </div>
            </div>
        )}
        {campaign.verified && !isCompleted && (
          <div className="absolute top-3 right-3 group/tooltip">
              <div className="bg-white/90 rounded-full p-1.5 flex items-center text-blue-500 shadow-md">
                  <CheckBadgeIcon className="h-5 w-5" />
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-full mr-2 w-max bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-md opacity-0 group-hover/tooltip:opacity-100 transition-all pointer-events-none origin-right scale-90 group-hover/tooltip:scale-100">
                  Verified Recipient
              </div>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 truncate">{campaign.title}</h3>
        <p className="text-gray-600 mt-1 text-sm h-10">{campaign.description}</p>
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <motion.div 
                className={`h-2.5 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-gradient-to-r from-yellow-400 to-orange-400'}`} 
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between items-center mt-2 text-sm">
            <p className="font-semibold text-gray-700">₹{campaign.raised.toLocaleString('en-IN')} <span className="font-normal text-gray-500">raised</span></p>
            <p className="font-semibold text-gray-500">{progress.toFixed(0)}%</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const DonationModal: React.FC<{ show: boolean; onClose: () => void; onDonate: (amount: number) => void, onLimitExceeded?: (limit: number) => void; title?: string; moneyLeft?: number }> = ({ show, onClose, onDonate, onLimitExceeded, title, moneyLeft }) => {
  const [amount, setAmount] = useState(1000);
  const amounts = [500, 1000, 2500, 5000];

  const handleDonate = () => {
    if (amount > 0) {
      if (moneyLeft && amount > moneyLeft && onLimitExceeded) {
        onLimitExceeded(moneyLeft);
      } else {
        onDonate(amount);
      }
    }
  };

  const disablePreset = (presetAmount: number) => {
    return moneyLeft ? presetAmount > moneyLeft : false;
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold text-gray-800 text-center">{title || 'Make a Donation'}</h2>
            {moneyLeft && <p className="text-center text-gray-600 mt-2">Only <span className="font-bold text-blue-600">₹{moneyLeft.toLocaleString('en-IN')}</span> needed to reach the goal!</p>}
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {amounts.map(a => (
                <button key={a} onClick={() => setAmount(a)} className={`p-4 rounded-xl font-bold transition-all duration-200 ${amount === a ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} disabled:opacity-50 disabled:cursor-not-allowed`} disabled={disablePreset(a)}>
                  ₹{a}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <label className="text-sm font-medium text-gray-600">Or enter a custom amount</label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                <input 
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full pl-7 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                  min="1"
                  max={moneyLeft}
                />
              </div>
            </div>

            <div className="mt-8">
                <PrimaryButton className="w-full text-lg py-4" onClick={handleDonate} disabled={amount <= 0 || (moneyLeft ? amount > moneyLeft : false)}>
                    Donate ₹{amount.toLocaleString('en-IN')}
                </PrimaryButton>
            </div>

            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// FIX: Define the paymentMethods array used in the PaymentFlowModal.
const paymentMethods = [
    { name: 'Credit/Debit Card', icon: CreditCardIcon },
    { name: 'UPI / Mobile Wallet', icon: DevicePhoneMobileIcon },
    { name: 'Net Banking', icon: BuildingLibraryIcon },
];

export const PaymentFlowModal: React.FC<{ 
    show: boolean; 
    onClose: () => void; 
    onSuccess: () => void;
    amount: number;
}> = ({ show, onClose, onSuccess, amount }) => {
    const [step, setStep] = useState<'method' | 'pin' | 'processing' | 'success'>('method');
    const [selectedMethod, setSelectedMethod] = useState('');
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const pinInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (show) {
            setStep('method');
            setSelectedMethod('');
            setPin('');
            setError('');
        }
    }, [show]);
    
    useEffect(() => {
        if (step === 'pin') {
            setTimeout(() => pinInputRef.current?.focus(), 100);
        }
    }, [step]);

    const handleMethodSelect = (methodName: string) => {
        setSelectedMethod(methodName);
        setStep('pin');
    };

    const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length <= 6) {
            setPin(value);
            setError('');
        }
    };
    
    const handlePinSubmit = () => {
        if (pin.length !== 6) {
            setError('PIN must be 6 digits.');
            return;
        }
        
        setError('');
        setStep('processing');
        
        setTimeout(() => {
            if (pin === '123456') {
                setStep('success');
                setTimeout(() => {
                    onSuccess();
                }, 1500);
            } else {
                setError('Invalid PIN. Please try again.');
                setStep('pin');
                setPin('');
            }
        }, 2000);
    };

    const renderContent = () => {
        switch (step) {
            case 'method':
                return (
                    <>
                        <h2 className="text-3xl font-bold text-gray-800 text-center">Choose Payment Method</h2>
                        <p className="text-center text-gray-600 mt-2">You are donating ₹{amount.toLocaleString('en-IN')}.</p>
                        <div className="space-y-4 mt-8">
                            {paymentMethods.map(method => (
                                <button key={method.name} onClick={() => handleMethodSelect(method.name)} className="w-full flex items-center gap-4 p-4 border border-gray-300 rounded-lg hover:bg-gray-100 hover:border-blue-400 transition-all">
                                    <method.icon className="h-8 w-8 text-blue-500" />
                                    <span className="font-semibold text-lg text-gray-700">{method.name}</span>
                                </button>
                            ))}
                        </div>
                    </>
                );
            case 'pin':
                return (
                    <>
                        <h2 className="text-2xl font-bold text-gray-800 text-center">Enter Your 6-Digit PIN</h2>
                        <p className="text-center text-gray-500 mt-2">To authorize the payment of ₹{amount.toLocaleString('en-IN')} via {selectedMethod}.</p>
                        <div className="mt-8 flex justify-center">
                            <input
                                ref={pinInputRef}
                                type="password"
                                value={pin}
                                onChange={handlePinChange}
                                maxLength={6}
                                className="w-48 text-center text-4xl tracking-[1.5rem] bg-gray-100 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                         <AnimatePresence>
                            {error && (<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-red-600 text-sm text-center mt-4" role="alert">{error}</motion.p>)}
                        </AnimatePresence>
                        <PrimaryButton onClick={handlePinSubmit} className="w-full mt-8 !py-4 text-lg" disabled={pin.length !== 6}>Confirm Payment</PrimaryButton>
                        <button onClick={() => setStep('method')} className="w-full text-center mt-3 text-sm text-gray-500 hover:underline">Change payment method</button>
                    </>
                );
            case 'processing':
                return (
                    <div className="text-center py-12">
                         <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                         <h2 className="text-2xl font-bold text-gray-800 mt-6">Processing Payment...</h2>
                         <p className="text-gray-600 mt-2">Please do not close this window.</p>
                    </div>
                );
            case 'success':
                 return (
                    <div className="text-center py-12">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 10 }}>
                            <CheckBadgeIcon className="h-20 w-20 text-green-500 mx-auto" />
                        </motion.div>
                         <h2 className="text-2xl font-bold text-gray-800 mt-6">Payment Successful!</h2>
                         <p className="text-gray-600 mt-2">Thank you for your generous donation.</p>
                    </div>
                );
        }
    }
    
    return (
        <AnimatePresence>
          {show && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={onClose}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
                
                {step !== 'processing' && step !== 'success' && (
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition">
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    )
};

export const InfoModal: React.FC<{ show: boolean; onClose: () => void; title: string; message: string; }> = ({ show, onClose, title, message }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <p className="text-gray-600 mt-2 mb-6">{message}</p>
            <div className="flex justify-center">
              <PrimaryButton onClick={onClose} className="w-full">OK</PrimaryButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


export const ConfirmationModal: React.FC<{ show: boolean; onClose: () => void; onConfirm: () => void; title: string; message: string; confirmText?: string; }> = ({ show, onClose, onConfirm, title, message, confirmText = "Confirm" }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <p className="text-gray-600 mt-2 mb-6">{message}</p>
            <div className="flex justify-center gap-4">
              <SecondaryButton onClick={onClose} className="w-full">Cancel</SecondaryButton>
              <button onClick={onConfirm} className="w-full px-6 py-3 rounded-xl bg-red-500 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:bg-red-600">
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const GuestActionModal: React.FC<{ show: boolean; onClose: () => void; onLogin: () => void; }> = ({ show, onClose, onLogin }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-800">Login Required</h2>
            <p className="text-gray-600 mt-2 mb-6">You need to log in with a proper account to proceed!</p>
            <div className="flex justify-center gap-4">
              <SecondaryButton onClick={onClose} className="w-full">Go Back</SecondaryButton>
              <PrimaryButton onClick={onLogin} className="w-full">Login</PrimaryButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const AccordionItem: React.FC<{ item: FAQItem, isOpen: boolean, onClick: () => void }> = ({ item, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-200">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left py-5 px-2"
            >
                <span className="text-lg font-medium text-gray-800">{item.question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ArrowUpIcon className="h-5 w-5 text-gray-500 transform rotate-180" />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: 'auto' },
                            collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                    >
                        <p className="pb-5 px-2 text-gray-600">{item.answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
    {isVisible && (
        <motion.button
            onClick={scrollToTop}
            className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 transition-all duration-300 z-30"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
        >
            <ArrowUpIcon className="h-6 w-6" />
        </motion.button>
    )}
    </AnimatePresence>
  );
};

export const RequestHelpModal: React.FC<{ show: boolean; onClose: () => void; }> = ({ show, onClose }) => {
    const { addLocationRequest } = useGlobal();
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', title: '', description: '', imageUrl: '' });
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const { name, email, phone, title, description } = formData;
        if (!name || !email || !phone || !title || !description) {
            return setError('Please fill in all required fields.');
        }
        addLocationRequest(formData);
        onClose();
        setFormData({ name: '', email: '', phone: '', title: '', description: '', imageUrl: '' });
    };
    
    return (
        <AnimatePresence>
            {show && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                    onClick={onClose} >
                    <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }}
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative"
                        onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-3xl font-bold text-gray-800 text-center">Request Assistance</h2>
                        <p className="text-center text-gray-500 mt-2 mb-6">Share your need with the community.</p>
                        <form onSubmit={handleSubmit} noValidate className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300" required />
                                </div>
                                 <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300" required />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300" required />
                            </div>
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Request Title</label>
                                <input id="title" name="title" type="text" value={formData.title} onChange={handleInputChange} placeholder="e.g., Need Textbooks for Class 10" className="mt-1 block w-full rounded-md border-gray-300" required />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Describe Your Need</label>
                                <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows={3} placeholder="Explain your situation and what you need." className="mt-1 block w-full rounded-md border-gray-300" required />
                            </div>
                            <div>
                                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL (Optional)</label>
                                <div className="mt-1 flex items-center gap-2">
                                    <PhotoIcon className="h-5 w-5 text-gray-400" />
                                    <input id="imageUrl" name="imageUrl" type="text" value={formData.imageUrl} onChange={handleInputChange} placeholder="https://example.com/image.jpg" className="block w-full rounded-md border-gray-300" />
                                </div>
                            </div>
                            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
                            <PrimaryButton type="submit" className="w-full !py-3 text-lg">Submit Request</PrimaryButton>
                            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition">
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};


export const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatbotMessage[]>([]);
    const location = useLocation();
    const chatboxRef = useRef<HTMLDivElement>(null);

    const getBotResponse = (userInput: string): Omit<ChatbotMessage, 'id' | 'sender'> => {
        const lowerInput = userInput.toLowerCase();
        
        if(location.pathname.startsWith('/cause/')) {
            if(lowerInput.includes('verify') || lowerInput.includes('trust')) return { text: "All NGO campaigns marked with a blue checkmark are verified by our team. We check their legal status and track record to ensure your donation is safe."};
            if(lowerInput.includes('donate')) return { text: "To donate, just click the big blue 'Donate Now' button on this page. You'll be able to choose an amount and a secure payment method."};
        }
        if(location.pathname === '/discover') {
             if(lowerInput.includes('filter')) return { text: "You can use the filters at the top of the page to see causes from NGOs or individuals. You can also use the search bar to find specific keywords like 'health' or 'education'."};
        }
        if(location.pathname === '/signup') {
            if(lowerInput.includes('ngo')) return { text: "To sign up as an NGO, select the 'NGO' option at the top of the form. You'll need to provide your NGO's details, PAN, and Aadhaar for verification. There is also a one-time ₹499 setup fee."};
            if(lowerInput.includes('verify')) return { text: "To get a verified badge, you need to provide either a PAN or Aadhaar number during signup. For NGOs, both are required."};
        }
        // Generic responses
        if(lowerInput.includes('hello') || lowerInput.includes('hi')) return { text: "Hello! How can I help you today?"};
        if(lowerInput.includes('help')) return { text: "I can help with questions about donating, finding causes, or signing up. What would you like to know?", options: [{text: "How to donate?", payload:"donate"}, {text: "How to sign up?", payload:"signup"}]};

        return { text: "I'm sorry, I'm not sure how to answer that. You can try asking about finding causes, donating, or signing up." };
    }

    const handleSend = (text: string) => {
        if(!text.trim()) return;
        const userMessage: ChatbotMessage = { id: Date.now(), text, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);

        setTimeout(() => {
            const botResponse = getBotResponse(text);
            const botMessage: ChatbotMessage = { id: Date.now() + 1, sender: 'bot', ...botResponse };
            setMessages(prev => [...prev, botMessage]);
        }, 1000);
    }
    
    useEffect(() => {
        if (isOpen) {
            const welcomeMessage: ChatbotMessage = {
                id: Date.now(),
                sender: 'bot',
                text: `Welcome to Donify! I'm here to help. What can I assist you with on the ${location.pathname === '/' ? 'Home' : location.pathname.slice(1)} page?`,
                options: [
                    { text: "How does this work?", payload: "help" },
                    { text: "How do I find causes?", payload: "filter" },
                ]
            };
            setMessages([welcomeMessage]);
        }
    }, [isOpen, location.pathname]);

     useEffect(() => {
        chatboxRef.current?.scrollTo(0, chatboxRef.current.scrollHeight);
    }, [messages]);

    return (
        <>
            <AnimatePresence>
            {isOpen && (
                <motion.div 
                    className="fixed bottom-24 right-4 w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                >
                    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
                        <h3 className="font-bold">Donify Helper</h3>
                        <button onClick={() => setIsOpen(false)}><XMarkIcon className="w-6 h-6"/></button>
                    </header>
                    <div ref={chatboxRef} className="flex-1 p-4 space-y-4 overflow-y-auto">
                        {messages.map(msg => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                                    <p>{msg.text}</p>
                                    {msg.options && (
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {msg.options.map(opt => (
                                                <button key={opt.payload} onClick={() => handleSend(opt.payload)} className="text-xs bg-white border border-blue-500 text-blue-500 px-2 py-1 rounded-full">{opt.text}</button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-2 border-t">
                        <form onSubmit={(e) => { e.preventDefault(); handleSend(e.currentTarget.message.value); e.currentTarget.reset(); }} className="flex gap-2">
                           <input name="message" type="text" placeholder="Ask a question..." className="flex-1 px-3 py-2 border rounded-full focus:ring-2 focus:ring-blue-300" />
                           <button type="submit" className="bg-blue-500 text-white rounded-full px-4 font-bold">Send</button>
                        </form>
                    </div>
                </motion.div>
            )}
            </AnimatePresence>
            <motion.button 
                onClick={() => setIsOpen(!isOpen)} 
                className="fixed bottom-6 right-6 bg-blue-500 text-white rounded-full p-4 shadow-lg z-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <ChatBubbleOvalLeftEllipsisIcon className="w-8 h-8" />
            </motion.button>
        </>
    )
}