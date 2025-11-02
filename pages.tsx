import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { MOCK_LEADERBOARD, MOCK_FAQS, MOCK_TESTIMONIALS, CheckBadgeIcon, HOW_IT_WORKS_STEPS, TrophyIcon, MagnifyingGlassIcon, DonifyLogo, EnvelopeIcon, LockClosedIcon, GoogleIcon, UserCircleIcon, ABOUT_US_CONTENT, CONTACT_US_CONTENT, generateUniqueUsers, generateUniqueCampaigns, CreditCardIcon, MEET_THE_TEAM, InitialsAvatar, MOCK_LOCATION_REQUESTS, MapPinIcon, XMarkIcon, DISCOVER_CATEGORIES, PhotoIcon, LifebuoyIcon } from './constants';
import { PrimaryButton, SecondaryButton, CauseCard, DonationModal, AccordionItem, useGlobal, ConfirmationModal, PaymentFlowModal, BackButton, InfoModal, RequestHelpModal, GuestActionModal } from './components';
import confetti from 'canvas-confetti';
import { LeaderboardUser, Campaign, AuthUser } from './types';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
        duration: 0.6,
        ease: "easeOut"
    }
  },
};

export const HomePage: React.FC = () => {
    const { campaigns, currentUser } = useGlobal();
    const [showGuestModal, setShowGuestModal] = useState(false);
    const navigate = useNavigate();

    const featuredCampaigns = useMemo(() => {
        return campaigns
            .filter(c => !c.isCompleted)
            .sort((a, b) => {
                if (a.urgency === 'High' && b.urgency !== 'High') return -1;
                if (a.urgency !== 'High' && b.urgency === 'High') return 1;
                return 0;
            })
            .slice(0, 3);
    }, [campaigns]);

    const handleLoginRedirect = () => {
        setShowGuestModal(false);
        navigate('/login', { state: { from: { pathname: '/create' } } });
    };

    const handleCreateFundraiserClick = () => {
        if (currentUser && currentUser.email === 'guest@donify.com') {
            setShowGuestModal(true);
        } else {
            navigate('/create');
        }
    };

    return (
        <div className="bg-gray-50/50">
            {/* Hero Section */}
            <section className="relative h-[90vh] min-h-[600px] flex items-center text-center">
                <div className="absolute inset-0 bg-cover bg-center bg-[url('https://picsum.photos/seed/giving_hands/1800/1200')]"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-blue-100/30 to-blue-300/40"></div>
                <div className="relative container mx-auto px-4 z-10">
                    <motion.h1 
                        className="text-5xl md:text-7xl font-extrabold text-gray-800"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                    >
                        Change a life today.
                    </motion.h1>
                    <motion.p 
                        className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Donify makes donating transparent, simple, and heartfelt.
                    </motion.p>
                    <motion.div 
                        className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <PrimaryButton to="/discover" className="w-full sm:w-auto">
                           {currentUser ? 'Explore Causes' : 'Donate Now'}
                        </PrimaryButton>
                        {currentUser ? (
                            <SecondaryButton onClick={handleCreateFundraiserClick} className="w-full sm:w-auto">Create Fundraiser</SecondaryButton>
                        ) : (
                            <SecondaryButton to="/about" className="w-full sm:w-auto">Learn More</SecondaryButton>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-gray-800">How It Works</h2>
                    <p className="text-center text-gray-600 mt-2">A simple path to making a big impact.</p>
                    <motion.div 
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {HOW_IT_WORKS_STEPS.map((step, index) => (
                            <motion.div key={index} className="text-center p-6" variants={itemVariants}>
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-blue-100 to-green-100 mx-auto">
                                    <step.icon className="h-8 w-8 text-blue-500" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mt-6">{step.title}</h3>
                                <p className="text-gray-600 mt-2">{step.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
            
            {/* Featured Causes Section */}
            <section className="py-20 bg-gray-50/50">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-gray-800">Featured Causes</h2>
                    <p className="text-center text-gray-600 mt-2">Join others in supporting these urgent campaigns.</p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                        {featuredCampaigns.map(campaign => (
                            <CauseCard key={campaign.id} campaign={campaign} />
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <PrimaryButton to="/discover">See All Causes</PrimaryButton>
                    </div>
                </div>
            </section>
            
            {/* Testimonials Section */}
            <section className="py-20 bg-gradient-to-b from-yellow-50/50 to-white">
                 <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-gray-800">Words of Heart</h2>
                    <p className="text-center text-gray-600 mt-2">What our community is saying.</p>
                    <motion.div className="grid md:grid-cols-3 gap-8 mt-12" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        {MOCK_TESTIMONIALS.map((t, i) => (
                             <motion.div key={i} className="bg-white p-8 rounded-2xl shadow-lg" variants={itemVariants}>
                                <InitialsAvatar name={t.name} className="w-16 h-16 rounded-full mx-auto text-xl" />
                                <p className="text-gray-600 mt-6 text-center">"{t.quote}"</p>
                                <p className="text-center font-bold text-gray-800 mt-4">{t.name}</p>
                                <p className="text-center text-sm text-blue-500">{t.role}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800">Be someone's reason to smile today.</h2>
                    <div className="mt-8">
                        <PrimaryButton to="/discover" className="text-lg">Start Donating</PrimaryButton>
                    </div>
                </div>
            </section>
            <GuestActionModal 
                show={showGuestModal} 
                onClose={() => setShowGuestModal(false)} 
                onLogin={handleLoginRedirect}
            />
        </div>
    );
};

export const DiscoverPage: React.FC = () => {
    const { campaigns } = useGlobal();
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<'all' | 'ngo' | 'individual'>('all');
    const [category, setCategory] = useState<Campaign['category'] | 'All'>('All');
    const [visibleCount, setVisibleCount] = useState(12);
    
    const sortedCampaigns = useMemo(() => {
        return [...campaigns].sort((a, b) => {
            if (a.isCompleted !== b.isCompleted) return a.isCompleted ? 1 : -1;
            if (a.urgency === 'High' && b.urgency !== 'High') return -1;
            if (a.urgency !== 'High' && b.urgency === 'High') return 1;
            return 0;
        });
    }, [campaigns]);

    const filteredCampaigns = useMemo(() => {
        return sortedCampaigns.filter(campaign => {
            const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesFilter = filter === 'all' || campaign.creatorType === filter;
            const matchesCategory = category === 'All' || campaign.category === category;
            
            return matchesSearch && matchesFilter && matchesCategory;
        });
    }, [searchTerm, filter, category, sortedCampaigns]);

    const loadMore = () => {
        setVisibleCount(prev => prev + 12);
    };

    const FilterPill: React.FC<{ type: any, current: any, set: (type: any) => void, children: React.ReactNode }> = ({ type, current, set, children }) => (
        <button 
            onClick={() => set(type)}
            className={`px-4 py-2 rounded-full font-medium transition-colors text-sm whitespace-nowrap ${current === type ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
        >
            {children}
        </button>
    );

    return (
        <div className="bg-white min-h-screen">
            <div className="bg-gradient-to-b from-blue-100 to-white pt-32 pb-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold text-gray-800">Find Causes That Move Your Heart</h1>
                    <div className="mt-8 max-w-2xl mx-auto">
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Search for causes, e.g., 'education for children'" 
                                className="w-full py-4 pl-12 pr-4 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
                        </div>
                        <div className="mt-4 flex justify-center gap-3">
                            <FilterPill type="all" current={filter} set={setFilter}>All Creators</FilterPill>
                            <FilterPill type="ngo" current={filter} set={setFilter}>NGOs</FilterPill>
                            <FilterPill type="individual" current={filter} set={setFilter}>Individuals</FilterPill>
                        </div>
                    </div>
                </div>
            </div>
            
             <div className="sticky top-20 bg-white/80 backdrop-blur-lg z-20 py-4 border-b">
                 <div className="container mx-auto px-4">
                     <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 -mb-2">
                        {DISCOVER_CATEGORIES.map(cat => (
                            <FilterPill key={cat.name} type={cat.name} current={category} set={setCategory}>
                                <div className="flex items-center gap-2">
                                    <cat.icon className="h-4 w-4" />
                                    {cat.name}
                                </div>
                            </FilterPill>
                        ))}
                     </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <AnimatePresence>
                    <motion.div 
                        className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {filteredCampaigns.slice(0, visibleCount).map(campaign => (
                            <CauseCard key={campaign.id} campaign={campaign} />
                        ))}
                    </motion.div>
                </AnimatePresence>

                {filteredCampaigns.length === 0 && (
                     <div className="col-span-full text-center py-16">
                        <p className="text-2xl text-gray-600">No campaigns found</p>
                        <p className="text-gray-500 mt-2">Try adjusting your search or filters!</p>
                    </div>
                )}
                
                {visibleCount < filteredCampaigns.length && (
                    <div className="text-center mt-12">
                        <PrimaryButton onClick={loadMore}>See More</PrimaryButton>
                    </div>
                )}
            </div>
        </div>
    );
};

export const DetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { getCampaignById, recordDonation, currentUser } = useGlobal();
    const campaign = getCampaignById(id!);
    const [showDonationModal, setShowDonationModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [donationAmount, setDonationAmount] = useState(0);
    const [infoModalContent, setInfoModalContent] = useState<{title: string, message: string} | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [showGuestModal, setShowGuestModal] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!campaign) {
            setTimeout(() => {
                if (!getCampaignById(id!)) {
                    navigate('/discover');
                }
            }, 100);
        }
    }, [id, campaign, getCampaignById, navigate]);
    
    const handleLoginRedirect = () => {
        setShowGuestModal(false);
        navigate('/login', { state: { from: location, message: "You need to log in to make a donation." } });
    };

    const handleDonateClick = () => {
        if(campaign?.isCompleted) return;
        if (currentUser) {
            if (currentUser.email === 'guest@donify.com') {
                setShowGuestModal(true);
                return;
            }
            setShowDonationModal(true);
        } else {
            navigate('/login', { state: { from: location, message: "You need to log in to make a donation." } });
        }
    };

    const handleDonationAttempt = (amount: number) => {
        setShowDonationModal(false);
        setDonationAmount(amount);
        const paymentSetupComplete = localStorage.getItem('paymentSetupComplete');
        if (!paymentSetupComplete) {
            navigate('/payment-setup', { 
                state: { 
                    from: location, 
                    message: "To complete your donation, please set up a payment method first." 
                } 
            });
        } else {
            setShowPaymentModal(true);
        }
    };
    
    const handleLimitExceeded = (limit: number) => {
        setShowDonationModal(false);
        setInfoModalContent({
            title: "Amount Exceeds Goal",
            message: `Maximum limit for this fundraiser is almost reached! Please keep the amount under ₹${limit.toLocaleString('en-IN')}.`
        });
    }

    const handlePaymentSuccess = () => {
        if(campaign?.id && donationAmount > 0) {
            const { campaignCompleted } = recordDonation(campaign.id, donationAmount);
            setShowPaymentModal(false);

            if(campaignCompleted) {
                confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 }, zIndex: 9999 });
                setInfoModalContent({
                    title: "Congratulations!",
                    message: `You've helped complete this fundraiser! Thank you for making a huge difference.`
                });
            } else {
                confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, zIndex: 9999 });
            }
        } else {
            setShowPaymentModal(false);
        }
    };

    if (!campaign) return <div className="min-h-screen flex items-center justify-center"><p>Loading campaign...</p></div>;

    const progress = Math.min((campaign.raised / campaign.goal) * 100, 100);
    const isCompleted = campaign.isCompleted || campaign.raised >= campaign.goal;

    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-4 pt-8">
                <BackButton />
            </div>
            <div className="relative h-80 bg-cover bg-center mt-4" style={{ backgroundImage: `url(${campaign.images[0]})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="container mx-auto px-4 py-12 -mt-40 relative z-10">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                       <h1 className="text-4xl font-bold text-gray-800">{campaign.title}</h1>
                       {campaign.verified && <div className="flex items-center space-x-2 text-blue-500 font-semibold bg-blue-100/50 px-3 py-1 rounded-full"><CheckBadgeIcon className="h-5 w-5" /><span>Verified Campaign</span></div>}
                    </div>
                    
                    <div className="mt-8">
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <motion.div 
                                className={`h-4 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-gradient-to-r from-yellow-400 to-orange-400'}`}
                                initial={{ width: '0%' }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                            />
                        </div>
                        <div className="flex justify-between items-center mt-4 text-lg">
                            <p><span className="font-bold text-gray-800">₹{campaign.raised.toLocaleString('en-IN')}</span><span className="text-gray-600"> raised of ₹{campaign.goal.toLocaleString('en-IN')}</span></p>
                            <p className="font-bold text-gray-800">{campaign.donors} donors</p>
                        </div>
                    </div>
                    
                    <div className="mt-10 border-t pt-10">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">About this Cause</h2>
                        <p className="text-gray-700 leading-relaxed">{campaign.longDescription}</p>
                    </div>
                    
                    {campaign.images.length > 1 && (
                         <div className="mt-10 border-t pt-10">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Gallery</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {campaign.images.map((img, idx) => (
                                    <img key={idx} src={img} alt={`Cause gallery image ${idx+1}`} className="rounded-lg object-cover w-full h-40" />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-10 border-t pt-10">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Organizer Information</h2>
                        <div className="bg-gray-50 rounded-lg p-6 relative">
                            {campaign.verified && campaign.creatorType === 'ngo' && (
                                <div className="absolute top-1/2 -translate-y-1/2 -right-4 group">
                                    <motion.div 
                                        className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.5, type: 'spring' }}
                                    >
                                        <CheckBadgeIcon className="w-8 h-8"/>
                                    </motion.div>
                                    <div className="absolute top-1/2 -translate-y-1/2 right-full mr-2 w-max bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                                        Verified NGO
                                    </div>
                                </div>
                            )}
                            {campaign.creatorType === 'ngo' && campaign.organizer.ngoDetails ? (
                                <>
                                    <h3 className="text-xl font-bold text-gray-800">{campaign.organizer.ngoDetails.name}</h3>
                                    <p className="text-gray-600">Contact Person: {campaign.organizer.name}</p>
                                    <div className="mt-4 space-y-2 text-gray-700">
                                        <p><strong>Email:</strong> <a href={`mailto:${campaign.organizer.ngoDetails.email}`} className="text-blue-600">{campaign.organizer.ngoDetails.email}</a></p>
                                        <p><strong>Phone:</strong> <a href={`tel:${campaign.organizer.ngoDetails.phone}`} className="text-blue-600">{campaign.organizer.ngoDetails.phone}</a></p>
                                        <p><strong>Address:</strong> {campaign.organizer.ngoDetails.address}</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-xl font-bold text-gray-800">{campaign.organizer.name}</h3>
                                    <p className="text-gray-600">(Individual Organizer)</p>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="mt-10">
                        <PrimaryButton onClick={handleDonateClick} className="text-lg w-full sm:w-auto" disabled={isCompleted}>
                           {isCompleted ? 'Goal Reached!' : 'Donate Now'}
                        </PrimaryButton>
                    </div>
                </div>
            </div>
            <DonationModal 
                show={showDonationModal} 
                onClose={() => setShowDonationModal(false)} 
                onDonate={handleDonationAttempt} 
                onLimitExceeded={handleLimitExceeded}
                moneyLeft={campaign.goal - campaign.raised}
            />
            <PaymentFlowModal 
              show={showPaymentModal}
              onClose={() => setShowPaymentModal(false)}
              onSuccess={handlePaymentSuccess}
              amount={donationAmount}
            />
             <InfoModal 
                show={!!infoModalContent}
                onClose={() => setInfoModalContent(null)}
                title={infoModalContent?.title || ''}
                message={infoModalContent?.message || ''}
            />
            <GuestActionModal
                show={showGuestModal}
                onClose={() => setShowGuestModal(false)}
                onLogin={handleLoginRedirect}
            />
        </div>
    );
};

export const CreateCampaignPage: React.FC = () => {
    const { addCampaign, currentUser } = useGlobal();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ title: '', description: '', longDescription: '', goal: 100000, category: 'Children' as Campaign['category'], imageUrl: '', location: '' });
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState('');
    const [showGuestModal, setShowGuestModal] = useState(false);

    useEffect(() => {
        if (!currentUser) {
            navigate('/login', { state: { from: { pathname: '/create' }, message: 'Please log in to create a campaign.' } });
        } else if (currentUser.email === 'guest@donify.com') {
            setShowGuestModal(true);
        }
    }, [currentUser, navigate]);

    const handleLoginRedirect = () => {
        setShowGuestModal(false);
        navigate('/login', { state: { from: { pathname: '/create' }, message: 'Please log in to create a campaign.' } });
    };

    const handleCloseGuestModal = () => {
        setShowGuestModal(false);
        navigate('/'); // Go back home if they close the modal
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setFormData(prev => ({ ...prev, imageUrl: base64String }));
                setImagePreview(base64String);
            };
            reader.readAsDataURL(file);
        }
        if (fileInputRef.current) {
            fileInputRef.current.removeAttribute('capture');
        }
    };
    
    const triggerCamera = () => {
        if (fileInputRef.current) {
            fileInputRef.current.setAttribute('capture', 'environment');
            fileInputRef.current.click();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const { title, description, longDescription, goal, category, imageUrl, location } = formData;
        if (!title || !description || !longDescription || !goal || !category || !imageUrl || !location) {
            return setError('Please fill in all fields, including the image.');
        }
        if (goal < 1000) {
            return setError('Goal must be at least ₹1,000.');
        }
        if (category === 'Disaster Relief' && currentUser?.userType === 'individual' && !currentUser?.verified) {
             return setError('Individual creators must be verified to start an emergency campaign.');
        }

        addCampaign(formData as any);
        navigate('/discover');
    };
    
    if (!currentUser || currentUser.email === 'guest@donify.com') {
        return (
             <div className="bg-gray-50 min-h-screen">
                <GuestActionModal
                    show={showGuestModal}
                    onClose={handleCloseGuestModal}
                    onLogin={handleLoginRedirect}
                />
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen pt-24 pb-16">
            <div className="container mx-auto px-4">
                 <BackButton />
                 <motion.div 
                    className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-6"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Create a Fundraiser</h1>
                    <p className="text-center text-gray-500 mb-8">Tell your story and start raising funds for a cause you care about.</p>
                    
                    <form onSubmit={handleSubmit} noValidate className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Campaign Title</label>
                            <input id="title" name="title" type="text" value={formData.title} onChange={handleInputChange} placeholder="e.g., Education for 100 Children" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Short Description</label>
                            <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows={2} placeholder="A brief summary of your campaign." className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
                        </div>
                        <div>
                            <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700">Full Story</label>
                            <textarea id="longDescription" name="longDescription" value={formData.longDescription} onChange={handleInputChange} rows={5} placeholder="Tell people why this cause is important." className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
                        </div>
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                            <input id="location" name="location" type="text" value={formData.location} onChange={handleInputChange} placeholder="e.g., Gurugram, Haryana" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="goal" className="block text-sm font-medium text-gray-700">Goal Amount (₹)</label>
                                <input id="goal" name="goal" type="number" value={formData.goal} onChange={handleInputChange} min="1000" step="500" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
                            </div>
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                                <select id="category" name="category" value={formData.category} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required>
                                    {DISCOVER_CATEGORIES.filter(c => c.name !== 'All').map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Campaign Image</label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Campaign preview" className="mx-auto h-32 w-auto rounded-lg object-cover" />
                                    ) : (
                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                    )}
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="imageUrl" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} ref={fileInputRef} />
                                        </label>
                                        <p className="pl-1">or</p>
                                        <button type="button" onClick={triggerCamera} className="pl-1 relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">take a photo</button>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG up to 10MB</p>
                                </div>
                            </div>
                             {formData.category === 'Disaster Relief' && <p className="text-xs text-red-500 mt-2">For emergency causes, please provide clear, relevant photos. This campaign will require verification.</p>}
                        </div>

                        <AnimatePresence>
                            {error && (<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-red-600 text-sm text-center" role="alert">{error}</motion.p>)}
                        </AnimatePresence>
                        
                        <PrimaryButton type="submit" className="w-full !py-3 text-lg">Submit for Review</PrimaryButton>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export const ProfilePage: React.FC = () => {
    const { currentUser, logout, getCampaignById, updateUserProfile } = useGlobal();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState<AuthUser | null>(currentUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        } else {
             setEditData(currentUser);
        }
    }, [currentUser, navigate]);
    
    const handleLogout = () => {
        setShowLogoutConfirm(false);
        logout();
        navigate('/');
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editData) return;
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (editData) {
            updateUserProfile(editData);
        }
        setIsEditing(false);
    };
    
    const handleCancel = () => {
        setIsEditing(false);
        setEditData(currentUser);
    }

    if (!currentUser) return null;

    const isGuest = currentUser.email === 'guest@donify.com';

    if (isGuest) {
        return (
             <div className="bg-gray-50 min-h-screen pt-32 pb-16">
                <div className="container mx-auto px-4">
                    <motion.div 
                        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <UserCircleIcon className="w-24 h-24 mx-auto text-gray-400" />
                        <h1 className="text-3xl font-bold text-gray-800 mt-4">You are browsing as a Guest</h1>
                        <p className="text-gray-600 mt-2 max-w-md mx-auto">
                            Create an account to unlock the full Donify experience, including creating fundraisers, tracking your donations, and getting a verified donor badge.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                            <SecondaryButton onClick={() => navigate('/login')} className="w-full sm:w-auto">Log In</SecondaryButton>
                            <PrimaryButton onClick={() => navigate('/signup')} className="w-full sm:w-auto">Sign Up</PrimaryButton>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen pt-32 pb-16">
            <div className="container mx-auto px-4">
                <motion.div 
                    className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 relative"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="absolute top-8 right-8">
                        {!isEditing && (
                            <SecondaryButton onClick={() => setIsEditing(true)}>Edit Profile</SecondaryButton>
                        )}
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-8">
                        <InitialsAvatar name={currentUser.name} className="w-32 h-32 text-5xl ring-4 ring-offset-2 ring-blue-400"/>
                        <div>
                            <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">{currentUser.name} {currentUser.verified && <CheckBadgeIcon title="Verified User" className="w-8 h-8 text-blue-500" />}</h1>
                            {currentUser.userType === 'ngo' && <p className="text-xl text-gray-600 font-semibold">{currentUser.ngoName}</p>}
                            <p className="text-lg text-gray-500 mt-1">Joined {new Date().getFullYear()}</p>
                        </div>
                    </div>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="bg-blue-50 p-6 rounded-xl">
                            <p className="text-3xl font-bold text-blue-600">₹{currentUser.totalDonatedThisMonth.toLocaleString('en-IN')}</p>
                            <p className="text-gray-600 mt-1">Donated This Month</p>
                        </div>
                        <div className="bg-green-50 p-6 rounded-xl">
                            <p className="text-3xl font-bold text-green-600">{currentUser.donationHistory.length}</p>
                            <p className="text-gray-600 mt-1">Total Donations Made</p>
                        </div>
                         <div className="bg-yellow-50 p-6 rounded-xl">
                            <p className="text-3xl font-bold text-yellow-600">--</p>
                            <p className="text-gray-600 mt-1">Current Rank</p>
                        </div>
                    </div>
                    
                    <form onSubmit={handleSave}>
                        <div className="mt-10 border-t pt-8">
                            <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
                            <div className="mt-4 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 items-center p-4 bg-gray-50 rounded-lg gap-4">
                                    <label htmlFor="name" className="font-semibold text-gray-700">Full Name</label>
                                    {isEditing ? <input id="name" name="name" type="text" value={editData?.name || ''} onChange={handleInputChange} className="w-full p-2 border rounded-md" /> : <span className="text-gray-600">{currentUser.name}</span>}
                                </div>
                                 <div className="grid grid-cols-1 md:grid-cols-2 items-center p-4 bg-gray-50 rounded-lg gap-4">
                                    <label htmlFor="email" className="font-semibold text-gray-700">Email Address</label>
                                    {isEditing ? <input id="email" name="email" type="email" value={editData?.email || ''} onChange={handleInputChange} className="w-full p-2 border rounded-md font-mono" /> : <span className="text-gray-600 font-mono">{currentUser.email}</span>}
                                </div>
                                {currentUser.userType === 'ngo' && (
                                     <div className="grid grid-cols-1 md:grid-cols-2 items-center p-4 bg-gray-50 rounded-lg gap-4">
                                        <label htmlFor="address" className="font-semibold text-gray-700">NGO Address</label>
                                        {isEditing ? <input id="address" name="address" type="text" value={editData?.address || ''} onChange={handleInputChange} className="w-full p-2 border rounded-md" /> : <span className="text-gray-600">{currentUser.address}</span>}
                                    </div>
                                )}
                                 <div className="grid grid-cols-1 md:grid-cols-2 items-center p-4 bg-gray-50 rounded-lg gap-4">
                                    <label htmlFor="pan" className="font-semibold text-gray-700">PAN Card</label>
                                    {isEditing ? <input id="pan" name="pan" type="text" value={editData?.pan || ''} onChange={handleInputChange} placeholder="Add your PAN" className="w-full p-2 border rounded-md font-mono" /> : <span className="text-gray-600 font-mono">{currentUser.pan || 'Not provided'}</span>}
                                </div>
                                 <div className="grid grid-cols-1 md:grid-cols-2 items-center p-4 bg-gray-50 rounded-lg gap-4">
                                    <label htmlFor="aadhaar" className="font-semibold text-gray-700">Aadhaar</label>
                                    {isEditing ? <input id="aadhaar" name="aadhaar" type="text" value={editData?.aadhaar || ''} onChange={handleInputChange} placeholder="Add your Aadhaar" className="w-full p-2 border rounded-md font-mono" /> : <span className="text-gray-600 font-mono">{currentUser.aadhaar || 'Not provided'}</span>}
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 border-t pt-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Donation History</h2>
                            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                                {currentUser.donationHistory.length > 0 ? (
                                    currentUser.donationHistory.slice().reverse().map((donation, index) => {
                                        return (
                                        <NavLink to={`/cause/${donation.campaignId}`} key={index} className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="font-semibold text-gray-800">{donation.campaignTitle}</p>
                                                    <p className="text-sm text-gray-500">on {new Date(donation.date).toLocaleDateString()}</p>
                                                </div>
                                                <p className="font-bold text-green-600">₹{donation.amount.toLocaleString('en-IN')}</p>
                                            </div>
                                        </NavLink>
                                    )})
                                ) : (
                                    <p className="text-gray-600 text-center py-4">You haven't made any donations yet.</p>
                                )}
                            </div>
                        </div>

                        <div className="mt-10 border-t pt-8 text-center">
                           {isEditing ? (
                                <div className="flex justify-center gap-4">
                                    <SecondaryButton type="button" onClick={handleCancel}>Cancel</SecondaryButton>
                                    <PrimaryButton type="submit">Save Changes</PrimaryButton>
                                </div>
                            ) : (
                                <button type="button" onClick={() => setShowLogoutConfirm(true)} className="px-6 py-3 rounded-xl bg-red-100 text-red-700 font-semibold hover:bg-red-200 transform hover:scale-105 transition-all duration-300">
                                    Log Out
                                </button>
                            )}
                        </div>
                    </form>
                </motion.div>
            </div>
            <ConfirmationModal
                show={showLogoutConfirm}
                onClose={() => setShowLogoutConfirm(false)}
                onConfirm={handleLogout}
                title="Confirm Logout"
                message="Are you sure you want to log out of your account?"
                confirmText="Log Out"
            />
        </div>
    );
};

export const LeaderboardPage: React.FC = () => {
    const { currentUser } = useGlobal();
    const [allUsers, setAllUsers] = useState<LeaderboardUser[]>(MOCK_LEADERBOARD);
    const [visibleCount, setVisibleCount] = useState(10);
    const navigate = useNavigate();

    const dynamicLeaderboard = useMemo(() => {
        let board: LeaderboardUser[] = JSON.parse(JSON.stringify(allUsers));
        
        if (currentUser && currentUser.userType === 'individual') {
            const userOnBoardIndex = board.findIndex(u => u.name === currentUser.name);
            const userAsLeaderboardUser = {
                rank: 0, // temp rank
                name: currentUser.name,
                avatarUrl: '', // Will be handled by InitialsAvatar
                total: currentUser.totalDonatedThisMonth,
                donations: currentUser.donationHistory.length,
                verified: currentUser.verified
            };

            if (userOnBoardIndex !== -1) {
                board[userOnBoardIndex] = { ...board[userOnBoardIndex], ...userAsLeaderboardUser };
            } else if (currentUser.totalDonatedThisMonth > 0) {
                board.push(userAsLeaderboardUser);
            }
        }
        
        return board
            .sort((a, b) => b.total - a.total)
            .map((user, index) => ({ ...user, rank: index + 1 }));
            
    }, [allUsers, currentUser]);

    const userRankData = useMemo(() => {
        return dynamicLeaderboard.find(u => u.name === currentUser?.name);
    }, [dynamicLeaderboard, currentUser]);

    const loadMoreUsers = () => {
       setVisibleCount(prev => prev + 10);
    };

    useEffect(() => {
        if (visibleCount > allUsers.length) {
            const newUsers = generateUniqueUsers(10, allUsers);
            setAllUsers(prev => [...prev, ...newUsers]);
        }
    }, [visibleCount, allUsers]);

    return (
        <div className="bg-white min-h-screen">
            <div className="bg-gradient-to-b from-blue-100 to-white pt-32 pb-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold text-gray-800">Top Donors of the Month 💙</h1>
                    <p className="mt-4 text-lg text-gray-600">Celebrating the generosity that powers change.</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    {userRankData && userRankData.total > 0 && (
                        <motion.div 
                            className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-2 border-blue-400"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex items-center space-x-6">
                                <span className="text-2xl font-bold w-10 text-center text-blue-500">{userRankData.rank}</span>
                                <InitialsAvatar name={userRankData.name} className="w-16 h-16 text-2xl" />
                                <div className="flex-1">
                                    <p className="text-xl font-semibold text-gray-800 flex items-center gap-2">{userRankData.name} (You) {userRankData.verified && <CheckBadgeIcon className="h-5 w-5 text-blue-500" title="Verified User" />}</p>
                                    <p className="text-gray-500">{userRankData.donations} donations</p>
                                </div>
                                <p className="text-2xl font-bold text-blue-500">₹{userRankData.total.toLocaleString('en-IN')}</p>
                            </div>
                            {currentUser?.userType === 'individual' && (
                                <div className="mt-4 border-t pt-4 text-center">
                                    <SecondaryButton onClick={() => navigate('/certificate')}>
                                        Generate Certificate
                                    </SecondaryButton>
                                </div>
                            )}
                        </motion.div>
                    )}

                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <ul className="divide-y divide-gray-200">
                            {dynamicLeaderboard.slice(0, visibleCount).map((user, index) => (
                                <motion.li 
                                    key={user.name + user.rank}
                                    className={`p-6 flex items-center space-x-6 transition-colors ${user.rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-amber-50' : 'bg-white'}`}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    layout
                                >
                                    <span className={`text-2xl font-bold w-10 text-center ${user.rank <= 3 ? 'text-amber-500' : 'text-gray-400'}`}>{user.rank}</span>
                                    <InitialsAvatar name={user.name} className="w-16 h-16 text-2xl" />
                                    <div className="flex-1">
                                        <p className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                            {user.name}
                                            {user.verified && <CheckBadgeIcon className="h-5 w-5 text-blue-500" title="Verified Top Donor" />}
                                        </p>
                                        <p className="text-gray-500">{user.donations} donations</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-blue-500">₹{user.total.toLocaleString('en-IN')}</p>
                                        {user.rank <= 3 && (
                                            <div className="mt-1 inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-700 font-semibold px-2 py-0.5 rounded-full text-sm">
                                                <TrophyIcon className="h-4 w-4" />
                                                Top Donor
                                            </div>
                                        )}
                                    </div>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                    {visibleCount < dynamicLeaderboard.length && (
                        <div className="text-center mt-8">
                            <PrimaryButton onClick={loadMoreUsers}>Show More</PrimaryButton>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const AboutPage: React.FC = () => {
    return (
        <div className="bg-white">
            <div className="bg-gradient-to-b from-blue-100 to-white pt-32 pb-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold text-gray-800">{ABOUT_US_CONTENT.title}</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">{ABOUT_US_CONTENT.subtitle}</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto">
                    <p className="text-lg text-gray-700 leading-relaxed">{ABOUT_US_CONTENT.story}</p>
                    <h2 className="text-3xl font-bold text-gray-800 mt-16 mb-8 text-center">Our Core Values</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        {ABOUT_US_CONTENT.values.map(value => (
                            <div key={value.title} className="bg-gray-50 p-6 rounded-lg">
                                <value.icon className="h-10 w-10 text-blue-500 mx-auto" />
                                <h3 className="text-xl font-semibold text-gray-800 mt-4">{value.title}</h3>
                                <p className="text-gray-600 mt-2">{value.description}</p>
                            </div>
                        ))}
                    </div>

                     <h2 className="text-3xl font-bold text-gray-800 mt-20 mb-10 text-center">Meet the Team</h2>
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {MEET_THE_TEAM.map(member => (
                            <div key={member.name} className="text-center bg-gray-50 p-6 rounded-lg">
                                <div className="w-40 h-40 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                                    <UserCircleIcon className="w-24 h-24 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mt-4">{member.name}</h3>
                                <p className="text-blue-600 font-medium">{member.role}</p>
                                <p className="text-gray-500 mt-2 text-sm">{member.description}</p>
                            </div>
                        ))}
                     </div>
                </div>
            </div>
        </div>
    );
};

export const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        const { subject, message, name, email } = formData;
        if (!subject || !message || !name || !email) {
            alert('Please fill out all fields.');
            return;
        }
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        const mailtoLink = `mailto:support@donify.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    };

    return (
        <div className="bg-gray-50/50">
            <div className="bg-gradient-to-b from-blue-100/30 to-gray-50/50 pt-32 pb-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold text-gray-800">{CONTACT_US_CONTENT.title}</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">{CONTACT_US_CONTENT.subtitle}</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-20">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16">
                    <div className="space-y-10">
                        {CONTACT_US_CONTENT.methods.map(method => (
                            <div key={method.title} className="flex items-start gap-4">
                                <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                                    <method.icon className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">{method.title}</h3>
                                    <p className="text-gray-600 mt-1">{method.description}</p>
                                    <a href={`mailto:${method.email}`} className="text-blue-600 font-semibold hover:underline">{method.email}</a>
                                </div>
                            </div>
                        ))}
                         <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                                    <MapPinIcon className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">Our Headquarters</h3>
                                    <p className="text-gray-600 mt-1">{CONTACT_US_CONTENT.address}</p>
                                </div>
                            </div>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
                        <form className="space-y-6" onSubmit={handleSendMessage}>
                            <div><label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label><input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required/></div>
                            <div><label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label><input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required/></div>
                            <div><label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label><input type="text" id="subject" name="subject" value={formData.subject} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required/></div>
                            <div><label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label><textarea id="message" name="message" value={formData.message} onChange={handleInputChange} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required></textarea></div>
                            <PrimaryButton type="submit" className="w-full !py-4 text-base">Send Message</PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <div className="bg-gray-50/50 min-h-screen">
        <div className="bg-gradient-to-b from-blue-100/30 to-gray-50/50 pt-32 pb-16">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-5xl font-bold text-gray-800">Frequently Asked Questions</h1>
                <p className="mt-4 text-lg text-gray-600">Find answers to your questions about Donify.</p>
            </div>
        </div>
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                {MOCK_FAQS.map((faq, index) => (
                    <AccordionItem 
                        key={index}
                        item={faq}
                        isOpen={openIndex === index}
                        onClick={() => handleToggle(index)}
                    />
                ))}
            </div>
        </div>
    </div>
  );
};

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useGlobal();
    
    const from = location.state?.from?.pathname || "/";
    
    useEffect(() => {
        if(location.state?.message) {
            setInfo(location.state.message);
        }
    }, [location.state]);


    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setInfo('');

        if (!email || !password) {
            setError('Please fill in both fields.');
            return;
        }

        const isLoggedIn = auth.login(email, password);

        if (isLoggedIn) {
            const paymentSetupComplete = localStorage.getItem('paymentSetupComplete');
            if (!paymentSetupComplete) {
                navigate('/payment-setup', { 
                    state: { 
                        from,
                        message: "Welcome! Let's set up a payment method for seamless donations."
                    }, 
                    replace: true 
                });
            } else {
                navigate(from, { replace: true });
            }
        } else {
            setError('Invalid email or password. Please try again.');
        }
    };

    const handleGuestLogin = () => {
        const isLoggedIn = auth.login('guest@donify.com', 'guest');
        if (isLoggedIn) {
            navigate(from, { replace: true });
        } else {
            setError('Could not log in as guest. Please try again later.');
        }
    };
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
            <motion.div className="text-center mb-8" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
                <DonifyLogo className="h-20 w-20 mx-auto" />
                <h2 className="mt-4 text-lg font-medium text-gray-600">Give with Trust. Help with Heart.</h2>
            </motion.div>

            <motion.div className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg p-8" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}>
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Log In to Donify</h1>
                <form onSubmit={handleLogin} noValidate>
                    <div className="space-y-5">
                        <div className="relative">
                            <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white/50 transition-all duration-300 ${error ? 'border-red-400' : 'border-gray-200'} focus:border-blue-400 focus:ring-2 focus:ring-blue-200`} required/>
                        </div>
                        <div className="relative">
                            <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white/50 transition-all duration-300 ${error ? 'border-red-400' : 'border-gray-200'} focus:border-blue-400 focus:ring-2 focus:ring-blue-200`} required/>
                        </div>
                    </div>
                    
                     <AnimatePresence>
                        {error && (<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-red-600 text-sm text-center mt-4" role="alert">{error}</motion.p>)}
                        {info && (<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-blue-600 text-sm text-center mt-4" role="alert">{info}</motion.p>)}
                    </AnimatePresence>
                    
                    <PrimaryButton type="submit" className="w-full mt-6 !py-4 text-lg">Log In</PrimaryButton>
                    
                     <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-300"></span></div>
                        <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or continue with</span></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button type="button" className="flex items-center justify-center gap-2 w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"><GoogleIcon className="h-6 w-6"/> Google</button>
                        <button type="button" onClick={handleGuestLogin} className="flex items-center justify-center gap-2 w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"><UserCircleIcon className="h-6 w-6 text-gray-700"/> Guest</button>
                    </div>
                </form>
                 <p className="mt-8 text-center text-sm text-gray-600">
                    Don't have an account? <NavLink to="/signup" state={{from}} className="font-semibold text-blue-600 hover:underline">Sign up</NavLink>
                </p>
            </motion.div>
        </div>
    );
};

export const SignUpPage: React.FC = () => {
    const [userType, setUserType] = useState<'individual' | 'ngo'>('individual');
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', confirmPassword: '',
        ngoName: '', phone: '', address: '', pan: '', aadhaar: '', agreed: false,
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { signup } = useGlobal();
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const isCheckbox = type === 'checkbox';
        setFormData(prev => ({ ...prev, [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); setSuccess('');

        if (formData.password !== formData.confirmPassword) return setError('Passwords do not match.');
        if (!formData.agreed) return setError('You must agree to the Terms of Service.');
        if (userType === 'ngo' && (!formData.ngoName || !formData.phone || !formData.address)) return setError('Please fill in all NGO details.');
        
        const result = signup({
            userType, name: formData.name, email: formData.email, password: formData.password,
            ngoName: userType === 'ngo' ? formData.ngoName : undefined,
            phone: userType === 'ngo' ? formData.phone : undefined,
            address: userType === 'ngo' ? formData.address : undefined,
            pan: formData.pan, aadhaar: formData.aadhaar,
        });

        if (result.success) {
            setSuccess('Account created successfully! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } else {
            setError(result.message || 'Signup failed.');
        }
    };
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
            <motion.div className="w-full max-w-2xl bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg p-8" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h1>
                <div className="flex justify-center bg-gray-200 p-1 rounded-lg mb-6">
                    <button onClick={() => setUserType('individual')} className={`w-1/2 py-2 rounded-md font-semibold transition-colors ${userType === 'individual' ? 'bg-white shadow text-blue-600' : 'text-gray-600'}`}>Individual</button>
                    <button onClick={() => setUserType('ngo')} className={`w-1/2 py-2 rounded-md font-semibold transition-colors ${userType === 'ngo' ? 'bg-white shadow text-blue-600' : 'text-gray-600'}`}>NGO</button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="name" value={formData.name} onChange={handleInputChange} placeholder={userType === 'individual' ? 'Full Name' : 'Contact Person Name'} className="w-full p-3 border rounded-lg" required/>
                    <input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address" className="w-full p-3 border rounded-lg" required/>
                    <div className="grid grid-cols-2 gap-4">
                        <input name="password" type="password" value={formData.password} onChange={handleInputChange} placeholder="Password" className="w-full p-3 border rounded-lg" required/>
                        <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInputChange} placeholder="Confirm Password" className="w-full p-3 border rounded-lg" required/>
                    </div>
                    
                    <AnimatePresence>
                        {userType === 'ngo' && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-4 overflow-hidden">
                                <h3 className="text-lg font-semibold text-gray-700 border-t pt-4">NGO Details</h3>
                                <input name="ngoName" value={formData.ngoName} onChange={handleInputChange} placeholder="NGO Name" className="w-full p-3 border rounded-lg"/>
                                <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number" className="w-full p-3 border rounded-lg"/>
                                <textarea name="address" value={formData.address} onChange={handleInputChange} placeholder="Full Address" className="w-full p-3 border rounded-lg" rows={2}/>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 border-t pt-4">Verification (Optional for Individuals)</h3>
                        <p className="text-sm text-gray-500 mb-2">Providing these helps get your account verified faster.</p>
                        <div className="grid grid-cols-2 gap-4">
                            <input name="pan" value={formData.pan} onChange={handleInputChange} placeholder="PAN Card Number" className="w-full p-3 border rounded-lg"/>
                            <input name="aadhaar" value={formData.aadhaar} onChange={handleInputChange} placeholder="Aadhaar Number" className="w-full p-3 border rounded-lg"/>
                        </div>
                    </div>
                    
                    <div className="flex items-start">
                        <input id="agreed" name="agreed" type="checkbox" checked={formData.agreed} onChange={handleInputChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1" />
                        <label htmlFor="agreed" className="ml-2 block text-sm text-gray-900">I agree to the <NavLink to="/terms" className="text-blue-600 hover:underline">Terms of Service</NavLink>.</label>
                    </div>

                    <AnimatePresence>
                        {error && (<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-red-600 text-sm text-center">{error}</motion.p>)}
                        {success && (<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-green-600 text-sm text-center">{success}</motion.p>)}
                    </AnimatePresence>
                    
                    <PrimaryButton type="submit" className="w-full !py-4 text-lg">Sign Up</PrimaryButton>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">Already have an account? <NavLink to="/login" className="font-semibold text-blue-600 hover:underline">Log in</NavLink></p>
            </motion.div>
        </div>
    );
};

export const PaymentSetupPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/";
    const message = location.state?.message || "Set up your payment method for future donations.";
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [step, setStep] = useState(1); // 1: form, 2: processing, 3: success

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
        setStep(2);
        setTimeout(() => {
            localStorage.setItem('paymentSetupComplete', 'true');
            setStep(3);
            setTimeout(() => {
                navigate(from, { replace: true });
            }, 1500);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <motion.div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <CreditCardIcon className="w-16 h-16 mx-auto text-blue-500" />
                            <h1 className="text-2xl font-bold text-gray-800 mt-4">Secure Payment Setup</h1>
                            <p className="text-gray-600 mt-2">{message}</p>
                            <div className="mt-8 flex justify-center">
                                <input type="password" value={pin} onChange={handlePinChange} maxLength={6} placeholder="Enter 6-Digit PIN" className="w-48 text-center text-4xl tracking-[1.5rem] bg-gray-100 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"/>
                            </div>
                            {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
                            <PrimaryButton onClick={handlePinSubmit} className="w-full mt-8 !py-4 text-lg" disabled={pin.length !== 6}>Save & Continue</PrimaryButton>
                        </motion.div>
                    )}
                    {step === 2 && (
                         <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-12">
                             <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                             <h2 className="text-2xl font-bold text-gray-800 mt-6">Securing...</h2>
                             <p className="text-gray-600 mt-2">Setting up your payment method.</p>
                        </motion.div>
                    )}
                    {step === 3 && (
                         <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-12">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><CheckBadgeIcon className="h-20 w-20 text-green-500 mx-auto" /></motion.div>
                             <h2 className="text-2xl font-bold text-gray-800 mt-6">Setup Complete!</h2>
                             <p className="text-gray-600 mt-2">You can now donate seamlessly.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

const StaticPageLayout: React.FC<{title: string; children: React.ReactNode}> = ({ title, children }) => (
    <div className="bg-gray-50 min-h-screen pt-32 pb-16">
        <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">{title}</h1>
                <div className="prose lg:prose-lg max-w-none text-gray-700">
                    {children}
                </div>
            </div>
        </div>
    </div>
);

export const TermsPage: React.FC = () => (
    <StaticPageLayout title="Terms of Service">
        <p>Welcome to Donify. By accessing or using our platform, you agree to be bound by these terms of service. Please read them carefully.</p>
        <h2 className="font-bold text-2xl mt-6 mb-2">1. Using Our Platform</h2>
        <p>You must follow any policies made available to you within the platform. Don’t misuse our services. For example, don’t interfere with our services or try to access them using a method other than the interface and the instructions that we provide.</p>
        <h2 className="font-bold text-2xl mt-6 mb-2">2. Your Donify Account</h2>
        <p>You may need a Donify Account in order to use some of our services. You are responsible for the activity that happens on or through your Donify Account. Try not to reuse your Donify Account password on third-party applications.</p>
    </StaticPageLayout>
);

export const PrivacyPage: React.FC = () => (
    <StaticPageLayout title="Privacy Policy">
        <p>Your privacy is important to us. It is Donify's policy to respect your privacy regarding any information we may collect from you across our platform.</p>
        <h2 className="font-bold text-2xl mt-6 mb-2">1. Information We Collect</h2>
        <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>
        <h2 className="font-bold text-2xl mt-6 mb-2">2. How We Use Information</h2>
        <p>We use the information we collect to operate, maintain, and provide the features and functionality of the platform, to analyze how the platform is used, diagnose service or technical problems, maintain security, and personalize content.</p>
    </StaticPageLayout>
);

export const LocationPage: React.FC = () => {
    const mapRef = useRef<any>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const { locationRequests, currentUser } = useGlobal();
    const navigate = useNavigate();
    const location = useLocation();
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [showGuestModal, setShowGuestModal] = useState(false);

    const handleLoginRedirect = () => {
        setShowGuestModal(false);
        navigate('/login', { state: { from: location, message: "You need to log in to request help." } });
    };

    const handleRequestHelpClick = () => {
        if (currentUser) {
            if (currentUser.email === 'guest@donify.com') {
                setShowGuestModal(true);
                return;
            }
            setShowRequestModal(true);
        } else {
            navigate('/login', { state: { from: location, message: "You need to log in to request help." } });
        }
    };
    
    useEffect(() => {
        let map: any;
        const L = (window as any).L;
        if (!L) {
          console.error("Leaflet is not loaded");
          return;
        }

        // FIX: Moved icon definitions to the top of the effect to ensure they are always in scope.
        const donorIcon = L.divIcon({
            html: `<div class="p-1 bg-white rounded-full shadow-lg"><div class="w-8 h-8 rounded-full bg-green-500 border-2 border-white"></div></div>`,
            className: 'bg-transparent border-0',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
        });

        const recipientIcon = L.divIcon({
            html: `<div class="p-1 bg-white rounded-full shadow-lg"><div class="w-8 h-8 rounded-full bg-blue-500 border-2 border-white"></div></div>`,
            className: 'bg-transparent border-0',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
        });

        if (mapContainerRef.current && !mapRef.current) {
            map = L.map(mapContainerRef.current).setView([28.4595, 77.0266], 14);
            mapRef.current = map;

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
        }

        if (mapRef.current) {

            const markerLayer = L.layerGroup().addTo(mapRef.current);

            locationRequests.forEach(request => {
                const icon = request.type === 'donor' ? donorIcon : recipientIcon;
                const marker = L.marker([request.position.lat, request.position.lng], { icon });
                
                marker.bindPopup(`<b style="color: ${request.type === 'donor' ? '#10B981' : '#3B82F6'}">${request.title}</b><br>${request.description}`);

                marker.on('mouseover', () => marker.openPopup());
                marker.on('mouseout', () => marker.closePopup());
                marker.on('click', () => navigate(`/location-profile/${request.id}`));
                
                markerLayer.addLayer(marker);
            });

            return () => {
                markerLayer.clearLayers();
            };
        }

    }, [locationRequests, navigate]);

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="bg-gradient-to-b from-blue-100 to-gray-100 pt-32 pb-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold text-gray-800">Local Needs, Local Heroes</h1>
                    <p className="mt-4 text-lg text-gray-600">Discover urgent requests for help right in your community.</p>
                    <div className="mt-8">
                        <PrimaryButton onClick={handleRequestHelpClick} className="inline-flex items-center gap-2">
                           <LifebuoyIcon className="w-5 h-5"/> Request Help
                        </PrimaryButton>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div 
                    ref={mapContainerRef} 
                    className="w-full h-[70vh] max-w-5xl mx-auto rounded-lg shadow-xl z-0"
                />
            </div>
            <RequestHelpModal show={showRequestModal} onClose={() => setShowRequestModal(false)} />
            <GuestActionModal 
                show={showGuestModal}
                onClose={() => setShowGuestModal(false)}
                onLogin={handleLoginRedirect}
            />
        </div>
    );
};

export const LocationProfilePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { getLocationRequestById, currentUser, recordLocalDonation } = useGlobal();
    const [showDonationModal, setShowDonationModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [donationAmount, setDonationAmount] = useState(0);
    const [infoModalContent, setInfoModalContent] = useState<{title: string, message: string} | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [showGuestModal, setShowGuestModal] = useState(false);

    const request = getLocationRequestById(Number(id));
    
    const handleLoginRedirect = () => {
        setShowGuestModal(false);
        navigate('/login', { state: { from: location, message: "You need to log in to make a donation." } });
    }

    const handleDonateClick = () => {
        if (currentUser) {
            if (currentUser.email === 'guest@donify.com') {
                setShowGuestModal(true);
                return;
            }
            setShowDonationModal(true);
        } else {
            navigate('/login', { state: { from: location, message: "You need to log in to make a donation." } });
        }
    };

    const handleDonationAttempt = (amount: number) => {
        setShowDonationModal(false);
        setDonationAmount(amount);
        const paymentSetupComplete = localStorage.getItem('paymentSetupComplete');
        if (!paymentSetupComplete) {
            navigate('/payment-setup', { state: { from: location, message: "To complete your donation, please set up a payment method." } });
        } else {
            setShowPaymentModal(true);
        }
    };
    
    const handlePaymentSuccess = () => {
        if(request && donationAmount > 0) {
            recordLocalDonation(request.id, donationAmount);
            setShowPaymentModal(false);
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, zIndex: 9999 });
            setInfoModalContent({ title: "Thank You!", message: "Your local donation has been recorded. You're making a real difference in your community!"});
        }
    };

    if (!request) return (
        <div className="bg-gray-50 min-h-screen pt-32 pb-16 text-center">
            <h2 className="text-2xl text-gray-700">Request not found.</h2>
            <div className="mt-8">
                <SecondaryButton to="/location">Back to Map</SecondaryButton>
            </div>
        </div>
    );
    
    const isRecipient = request.type === 'recipient';

    return (
        <div className="bg-gray-50 min-h-screen pt-24 pb-16">
            <div className="container mx-auto px-4">
                <BackButton />
                <motion.div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-6" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex flex-col sm:flex-row items-start gap-8">
                        <InitialsAvatar name={request.name} className="w-24 h-24 text-4xl flex-shrink-0" />
                        <div className="flex-grow">
                             <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mb-2 ${isRecipient ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                {isRecipient ? 'Recipient' : 'Donor'}
                            </span>
                            <h1 className="text-4xl font-bold text-gray-800">{request.title}</h1>
                            <p className="text-lg text-gray-600 mt-2">by {request.name}</p>
                        </div>
                    </div>

                    {request.imageUrl && (
                        <img src={request.imageUrl} alt={request.title} className="w-full h-64 object-cover rounded-lg mt-8" />
                    )}

                    <div className="mt-8 border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-800">Details</h2>
                        <p className="text-gray-700 mt-4 leading-relaxed whitespace-pre-wrap">{request.description}</p>
                    </div>

                    <div className="mt-8 border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-800">Contact Information</h2>
                        <div className="mt-4 space-y-2">
                             <p><strong>Email:</strong> <a href={`mailto:${request.email}`} className="text-blue-600">{request.email}</a></p>
                             <p><strong>Phone:</strong> <a href={`tel:${request.phone}`} className="text-blue-600">{request.phone}</a></p>
                        </div>
                    </div>
                    
                    {isRecipient && (
                        <div className="mt-10 text-center">
                            <PrimaryButton onClick={handleDonateClick} className="text-lg px-10">
                                Donate to this Cause
                            </PrimaryButton>
                        </div>
                    )}
                </motion.div>
            </div>
            {isRecipient && (
                <>
                    <DonationModal 
                        show={showDonationModal} 
                        onClose={() => setShowDonationModal(false)} 
                        onDonate={handleDonationAttempt} 
                        title="Help a Local Cause"
                    />
                    <PaymentFlowModal 
                        show={showPaymentModal}
                        onClose={() => setShowPaymentModal(false)}
                        onSuccess={handlePaymentSuccess}
                        amount={donationAmount}
                    />
                     <InfoModal 
                        show={!!infoModalContent}
                        onClose={() => setInfoModalContent(null)}
                        title={infoModalContent?.title || ''}
                        message={infoModalContent?.message || ''}
                    />
                    <GuestActionModal 
                        show={showGuestModal}
                        onClose={() => setShowGuestModal(false)}
                        onLogin={handleLoginRedirect}
                    />
                </>
            )}
        </div>
    );
}

export const CertificatePage: React.FC = () => {
    const { currentUser } = useGlobal();
    const navigate = useNavigate();
    const certificateRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!currentUser || !currentUser.totalDonatedThisMonth || currentUser.totalDonatedThisMonth <= 0) {
            navigate('/leaderboard');
        }
    }, [currentUser, navigate]);
    
    if (!currentUser) return null;

    const handleDownload = () => {
        const { jsPDF } = (window as any).jspdf;
        const html2canvas = (window as any).html2canvas;
        
        if (certificateRef.current && jsPDF && html2canvas) {
            html2canvas(certificateRef.current, { 
                scale: 2,
                useCORS: true,
                backgroundColor: null
            }).then((canvas: HTMLCanvasElement) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'landscape',
                    unit: 'px',
                    format: [canvas.width, canvas.height]
                });
                pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
                pdf.save('Donify-Certificate.pdf');
            });
        } else {
            alert("Could not download certificate. PDF generation library is missing or failed to load.");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen pt-32 pb-16 flex flex-col items-center justify-center">
            <div className="container mx-auto px-4">
                <BackButton className="mb-4" />
                <div ref={certificateRef} className="max-w-3xl mx-auto bg-white rounded-lg shadow-2xl p-8 border-4 border-yellow-400 bg-yellow-50/50">
                    <div className="text-center border-b-2 border-yellow-300 pb-4">
                        <TrophyIcon className="w-16 h-16 mx-auto text-yellow-500" />
                        <h1 className="text-4xl font-bold text-gray-800 mt-2">Certificate of Appreciation</h1>
                        <p className="text-gray-600 text-lg">Proudly Presented To</p>
                    </div>
                    <div className="text-center my-12">
                        <h2 className="text-5xl font-['Satisfy',_cursive] text-blue-600">{currentUser.name}</h2>
                    </div>
                    <div className="text-center">
                        <p className="text-lg text-gray-700">For your outstanding generosity and invaluable contribution of</p>
                        <p className="text-3xl font-bold text-green-600 my-2">₹{currentUser.totalDonatedThisMonth.toLocaleString('en-IN')}</p>
                        <p className="text-lg text-gray-700">during the month of {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}.</p>
                        <p className="mt-6 text-gray-500">Your kindness creates ripples of hope.</p>
                    </div>
                    <div className="flex justify-between items-center mt-12 border-t-2 border-yellow-300 pt-4">
                        <div>
                            <p className="font-bold">Donify Team</p>
                            <p className="text-sm text-gray-500">Issued: {new Date().toLocaleDateString()}</p>
                        </div>
                        <DonifyLogo className="w-12 h-12" />
                    </div>
                </div>
                <div className="text-center mt-8">
                    <PrimaryButton onClick={handleDownload}>Download Certificate</PrimaryButton>
                </div>
            </div>
        </div>
    );
};