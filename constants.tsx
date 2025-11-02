import React from 'react';
import type { Campaign, Testimonial, LeaderboardUser, FAQItem, LocationRequest, AuthUser } from './types';

// =================================================================
// ICONS
// =================================================================

export const DonifyLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7FC8F8" />
        <stop offset="100%" stopColor="#55E0A3" />
      </linearGradient>
    </defs>
    <path 
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
      fill="url(#logoGradient)"
    />
    <path d="M12 15V7m0 0l-3 3m3-3l3 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const HeartIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 20.25l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>);
export const CheckBadgeIcon: React.FC<{className?: string; title?: string}> = ({className, title}) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><title>{title}</title><path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12c0 1.357-.6 2.573-1.549 3.397a4.49 4.49 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.491 4.491 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" /></svg>);
export const MagnifyingGlassIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>);
export const ArrowUpIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>);
export const XMarkIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>);
export const Bars3Icon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>);
export const GlobeAltIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A11.953 11.953 0 0012 13.5c-2.998 0-5.74-1.1-7.843-2.918" /></svg>);
export const HomeIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" /></svg>);
export const PlusCircleIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
export const TrophyIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9 9 0 119 0zM16.5 18.75a9 9 0 00-9 0m9 0v-6.75m0 6.75a9 9 0 01-9 0m9 0V9.75m-9 9V9.75m0 9a9 9 0 01-9-9m9 9a9 9 0 009-9m-9 9H3m13.5 0H21m-3.75-9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);
export const UserCircleIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);
export const EnvelopeIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>);
export const LockClosedIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>);
export const GoogleIcon: React.FC<{className?: string}> = ({className}) => (<svg className={className} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.223 0-9.657-3.657-11.303-8h-6.852C8.748 35.846 15.828 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C44.272 36.846 48 30.828 48 24c0-1.341-.138-2.65-.389-3.917z"/></svg>);
export const AppleIcon: React.FC<{className?: string}> = ({className}) => (<svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M17.2 20.3c-.6.6-1.3.8-2.2.8-.8 0-1.7-.3-2.6-.8-.9-.5-1.7-1.4-2.8-1.4s-1.8.9-2.7 1.4c-.9.5-1.8.8-2.7.8-.9 0-1.6-.2-2.2-.8-.6-.6-.9-1.3-1-2.2.1-.9.4-1.8 1-2.6.6-.8 1.3-1.4 2.1-1.8.8-.4 1.6-.6 2.4-.6.9 0 1.7.3 2.5.8.8.5 1.5 1.4 2.6 1.4.9 0 1.9-.9 2.7-1.4.8-.5 1.7-.8 2.5-.8.8 0 1.6.2 2.4.6.8.4 1.5 1 2.1 1.8.6.8.9 1.7 1 2.6-.1.9-.4 1.6-1 2.2M14.6 2c0 .9-.2 1.8-.7 2.7-.5.9-1.2 1.6-2.1 2.1-.8.4-1.7.6-2.6.5-.4 0-1.1-.1-1.9-.2l-1.3.1c-.8 0-1.5.1-2.1.2-1.3.3-2.3 1.1-3.1 2.4-.6 1.1-.9 2.3-.9 3.4 0 .9.2 1.8.6 2.6.4.8.9 1.5 1.5 2 .1 0 .2.1.3.1.2 0 .4-.1.6-.2.4-.2.8-.5 1.2-.8.5-.3.9-.5 1.3-.5s.8.2 1.3.5c.5.3.9.6 1.2.8.2.1.4.2.6.2.1 0 .2 0 .3-.1.6-.5 1.1-1.2 1.5-2 .4-.8.6-1.7.6-2.6 0-1.1-.3-2.2-.9-3.4-.6-1.2-1.6-2-2.8-2.4-.4-.1-.8-.1-1.2-.1-.5 0-1 .1-1.5.2-.8-1.2-1.2-2.5-1.2-3.8 0-.8.2-1.6.5-2.3.2-.5.5-.9.9-1.2.4-.3.8-.5 1.3-.5.4 0 .8.1 1.2.3.4.2.7.5.9.8.3.4.4.8.4 1.3z"/></svg>);
export const CreditCardIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h6m3-5.25H21a.75.75 0 00.75-.75V5.25a.75.75 0 00-.75-.75H5.25a.75.75 0 00-.75.75v3.75a.75.75 0 00.75.75z" /></svg>);
export const ArrowRightOnRectangleIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>);
export const EyeIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);
export const ShieldCheckIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>);
export const SparklesIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 21.75l-.648-1.188a2.25 2.25 0 01-1.4-1.4L13.063 18l1.188-.648a2.25 2.25 0 011.4 1.4l.648 1.188z" /></svg>);
export const QuestionMarkCircleIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>);
export const LifebuoyIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0a8.949 8.949 0 005.67-2.062m-11.34 0A8.949 8.949 0 0012 21zm5.67-15.878A8.949 8.949 0 006.33 5.122m11.34 0A8.949 8.949 0 0012 3m5.67 2.122l-2.122 2.122m0 0l-2.122 2.122M12 15l-2.122-2.122m0 0l-2.122-2.122m2.122-2.122l2.122 2.122m0 0l2.122 2.122" /></svg>);
export const UserGroupIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.952A3 3 0 006 13.5m-2.25-2.25a3 3 0 00-3.75 0M12 15.75a3 3 0 01-3-3m3 3a3 3 0 003-3m-3 3V12m0-3.75a3 3 0 013-3m-3 3a3 3 0 00-3-3m-3 3a3 3 0 013-3m9 9a3 3 0 01-3 3m3-3a3 3 0 003-3m-3 3a3 3 0 01-3-3m-3 3a3 3 0 01-3-3" /></svg>);
export const MapPinIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>);
export const DevicePhoneMobileIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18h3" /></svg>);
export const BuildingLibraryIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg>);
export const ArrowLeftIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>);
export const ChatBubbleOvalLeftEllipsisIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.761 9.761 0 01-2.542-.383m-2.846-1.141a3.375 3.375 0 00-2.823-2.823m-1.14-2.846a9.761 9.761 0 01-.383-2.542c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>);
export const ExclamationTriangleIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>);
export const PhotoIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>);


// Social Icons
const TwitterIcon: React.FC = () => (<svg role="img" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085 4.93 4.93 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>);
const FacebookIcon: React.FC = () => (<svg role="img" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.732 0 1.325-.593 1.325-1.325V1.325C24 .593 23.407 0 22.675 0z"/></svg>);
const InstagramIcon: React.FC = () => (<svg role="img" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126s1.338.935 2.126 1.384c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.717 2.126-1.384s.935-1.338 1.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.148-.558-2.913-.306-.789-.717-1.459-1.384-2.126S20.65.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.056 1.17-.249 1.805-.413 2.227-.217.562-.477.96-.896 1.382-.42.419-.82.679-1.38.896-.422.164-1.057.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.585-.015-4.85-.07c-1.17-.056-1.805-.249-2.227-.413-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.82-1.381-.896-.164-.422-.36-1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.015-3.585.07-4.85c.056-1.17.249 1.805.413-2.227.217-.562.477.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.057.36 2.227-.413 1.266-.057 1.646-.07 4.85-.07zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg>);

export const SOCIAL_LINKS = [
  { name: 'Facebook', icon: FacebookIcon, href: '#' },
  { name: 'Instagram', icon: InstagramIcon, href: '#' },
  { name: 'Twitter', icon: TwitterIcon, href: '#' },
];

// =================================================================
// UTILITY COMPONENTS
// =================================================================
export const InitialsAvatar: React.FC<{ name: string; className?: string }> = ({ name, className = '' }) => {
    const initials = (name || '')
        .split(' ')
        .map((n) => n[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase();

    const colors = [
        'bg-blue-200 text-blue-800', 'bg-green-200 text-green-800',
        'bg-yellow-200 text-yellow-800', 'bg-purple-200 text-purple-800',
        'bg-red-200 text-red-800', 'bg-indigo-200 text-indigo-800',
        'bg-pink-200 text-pink-800', 'bg-teal-200 text-teal-800',
    ];

    const charCode = (name || ' ').charCodeAt(0) || 65;
    const colorIndex = charCode % colors.length;
    
    return (
        <div className={`flex items-center justify-center rounded-full font-bold ${colors[colorIndex]} ${className}`}>
            <span className="text-sm">{initials}</span>
        </div>
    );
};

// =================================================================
// NAVIGATION
// =================================================================

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Discover', path: '/discover' },
  { name: 'Location', path: '/location' },
  { name: 'Leaderboard', path: '/leaderboard' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export const DISCOVER_CATEGORIES: { name: Campaign['category'] | 'All'; icon: React.FC<{className?: string}> }[] = [
    { name: 'All', icon: GlobeAltIcon },
    { name: 'Disaster Relief', icon: ExclamationTriangleIcon },
    { name: 'Children', icon: UserGroupIcon },
    { name: 'Elderly', icon: UserGroupIcon },
    { name: 'Medical', icon: HeartIcon },
    { name: 'Education', icon: BuildingLibraryIcon },
    { name: 'Animals', icon: HeartIcon },
    { name: 'Environment', icon: GlobeAltIcon },
];

// =================================================================
// MOCK DATA
// =================================================================

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: '4',
    title: 'Emergency Medical Aid for Flood Victims',
    description: 'Provide immediate medical supplies and support to disaster-stricken areas.',
    longDescription: 'Recent flash floods have left thousands without homes, food, and medical care. This is an urgent appeal to fund emergency medical kits, mobile clinics, and volunteer doctors to provide life-saving aid to the victims.',
    images: ['https://picsum.photos/seed/flood_relief/600/400', 'https://picsum.photos/seed/flood_victims/600/400'],
    goal: 2000000,
    raised: 1560000,
    donors: 412,
    category: 'Disaster Relief',
    creatorType: 'ngo',
    organizer: { name: 'Deepa Krishnan', avatarUrl: '' , ngoDetails: { name: 'Aapada Rahat Team', phone: '+91-2345678901', email: 'relief@aapada.org', address: '101, Relief Road, Kochi, Kerala, 682001' } },
    verified: true,
    urgency: 'High',
    location: 'Kerala',
    updates: [],
    comments: [],
  },
  {
    id: '1',
    title: 'Help Children in Need Get Education',
    description: 'Provide books and school supplies for underprivileged children.',
    longDescription: 'In many remote villages, children lack the basic tools for education. This campaign aims to provide 1,000 children with a complete school kit, including books, stationery, and a school bag. Your donation can light up a child\'s future.',
    images: ['https://picsum.photos/seed/child_education/600/400'],
    goal: 800000,
    raised: 600000,
    donors: 123,
    category: 'Children',
    creatorType: 'ngo',
    organizer: { 
        name: 'Priya Singh', 
        avatarUrl: '',
        ngoDetails: {
            name: 'Asha Foundation',
            phone: '+91-9876543210',
            email: 'contact@ashafoundation.org',
            address: '123, Learning Lane, New Delhi, 110001'
        }
    },
    verified: true,
    urgency: 'Medium',
    location: 'Rural India',
    updates: [{ date: '2024-07-20', title: 'First Batch of Kits Distributed!', content: 'We are thrilled to announce that the first 200 kits have reached the children of a rural school. Their smiles were priceless!' }],
    comments: [{ name: 'Priya Sharma', avatarUrl: '', comment: 'So happy to be a part of this!' }]
  },
  {
    id: '2',
    title: 'Clean Water for a Rural Village',
    description: 'Fund a new well to provide clean, safe drinking water.',
    longDescription: 'A village of 500 people is currently relying on a contaminated river for their daily water needs, leading to widespread illness. This project will fund the construction of a deep borehole well, ensuring a sustainable source of clean water for generations to come.',
    images: ['https://picsum.photos/seed/clean_water/600/400'],
    goal: 400000,
    raised: 400000,
    donors: 85,
    category: 'Medical',
    creatorType: 'ngo',
    organizer: { 
        name: 'Ramesh Gupta', 
        avatarUrl: '',
        ngoDetails: {
            name: 'Jal Jeevan Trust',
            phone: '+91-8765432109',
            email: 'water@jaljeevan.org',
            address: '456, Oasis Road, Jaipur, Rajasthan, 302001'
        }
    },
    verified: true,
    urgency: 'High',
    location: 'Rajasthan',
    updates: [], comments: [],
    isCompleted: true
  },
  { 
    id: '13', 
    title: 'Help Sumita Devi Rebuild Her Home', 
    description: 'A single mother lost her home in a fire. Help her rebuild.',
    longDescription: 'Sumita Devi, a hardworking single mother of two, lost everything when a fire engulfed her small home. She and her children are currently staying in a temporary shelter. This campaign aims to raise funds to rebuild her house and provide essential household items, giving this family a chance to start over.', 
    images: ['https://picsum.photos/seed/rebuild_home/600/400'], 
    goal: 250000, 
    raised: 50000, 
    donors: 30, 
    category: 'Disaster Relief', 
    creatorType: 'individual',
    organizer: { name: 'Sumita Devi', avatarUrl: '' }, 
    verified: false, 
    urgency: 'High', 
    location: 'Bihar', 
    updates: [], 
    comments: [] 
   },
    { id: '3', title: 'Plant 10,000 Trees to Fight Climate Change', description: 'Help reforest areas affected by logging and wildfires.', longDescription: 'Forests are the lungs of our planet. This campaign is an ambitious project to plant 10,000 native trees in a region devastated by recent wildfires. Each tree costs just ₹80 to plant and nurture for its first year. Join us in restoring this vital ecosystem.', images: ['https://picsum.photos/seed/forest_trees/600/400'], goal: 800000, raised: 256000, donors: 250, category: 'Environment', creatorType: 'ngo', organizer: { name: 'Anil Verma', avatarUrl: '', ngoDetails: { name: 'Harit Prithvi Initiative', phone: '+91-1234567890', email: 'green@haritprithvi.org', address: '789, Forest Way, Ooty, Tamil Nadu, 643001' } }, verified: true, urgency: 'Low', location: 'Western Ghats', updates: [], comments: [] },
    { id: '5', title: 'Support Animal Shelters', description: 'Provide food and medical care for stray animals.', longDescription: 'Our city\'s animal shelters are overflowing with abandoned and injured animals. This campaign will help provide nutritious food, essential vaccinations, and medical treatments to give these animals a second chance at life.', images: ['https://picsum.photos/seed/animal_shelter/600/400'], goal: 500000, raised: 150000, donors: 95, category: 'Animals', creatorType: 'individual', organizer: { name: 'Paws for Cause', avatarUrl: '' }, verified: true, urgency: 'Medium', location: 'Mumbai', updates: [], comments: [] },
    { id: '6', title: 'Digital Literacy for Seniors', description: 'Help elderly citizens learn essential digital skills.', longDescription: 'In an increasingly digital world, many senior citizens are left behind. This program offers free workshops to teach them how to use smartphones, access online services, and connect with their loved ones, combating loneliness and empowering them.', images: ['https://picsum.photos/seed/senior_citizens/600/400'], goal: 300000, raised: 280000, donors: 78, category: 'Elderly', creatorType: 'individual', organizer: { name: 'Senior Connect', avatarUrl: '' }, verified: false, urgency: 'Low', location: 'Bangalore', updates: [], comments: [] },
    { id: '7', title: 'Mid-Day Meals for School Children', description: 'Ensure no child goes hungry at school.', longDescription: 'A nutritious meal is crucial for a child\'s concentration and development. This campaign provides hot, healthy mid-day meals to 5,000 children in government schools, improving attendance and academic performance.', images: ['https://picsum.photos/seed/school_meals/600/400'], goal: 1500000, raised: 950000, donors: 350, category: 'Children', creatorType: 'ngo', organizer: { name: 'Sunil Mehta', avatarUrl: '', ngoDetails: { name: 'Annapoorna Foundation', phone: '+91-3456789012', email: 'meals@annapoorna.org', address: '222, Nutrition Blvd, Delhi, 110002' } }, verified: true, urgency: 'High', location: 'Delhi', updates: [], comments: [] },
    { id: '8', title: 'Cyclone Relief for Coastal Communities', description: 'Rebuild homes and livelihoods after the recent cyclone.', longDescription: 'A powerful cyclone has devastated coastal villages, destroying homes and fishing boats. We are providing immediate relief with temporary shelters, food supplies, and financial aid to help families rebuild their lives.', images: ['https://picsum.photos/seed/cyclone_disaster/600/400'], goal: 2500000, raised: 1100000, donors: 520, category: 'Disaster Relief', creatorType: 'ngo', organizer: { name: 'Kavita Das', avatarUrl: '', ngoDetails: { name: 'Samudra Rakshak', phone: '+91-4567890123', email: 'coast@rakshak.org', address: '333, Coastal Hwy, Puri, Odisha, 752001' } }, verified: true, urgency: 'High', location: 'Odisha', updates: [], comments: [] },
    { id: '9', title: 'Skill Development for Unemployed Youth', description: 'Provide vocational training for better job opportunities.', longDescription: 'This project offers courses in high-demand trades like plumbing, electrical work, and computer skills to unemployed youth. By equipping them with practical skills, we aim to help them secure stable employment and build a brighter future.', images: ['https://picsum.photos/seed/skill_training/600/400'], goal: 900000, raised: 300000, donors: 110, category: 'Education', creatorType: 'individual', organizer: { name: 'Kaushal Kendra', avatarUrl: '' }, verified: true, urgency: 'Medium', location: 'Pune', updates: [], comments: [] },
    { id: '10', title: 'Clean Up the Ganges River', description: 'Community-driven initiative to remove plastic waste.', longDescription: 'The sacred Ganges is choking on plastic pollution. This campaign organizes and equips local volunteer groups for large-scale river clean-up drives, while also running awareness programs to reduce plastic usage in nearby towns.', images: ['https://picsum.photos/seed/ganges_river/600/400'], goal: 600000, raised: 450000, donors: 280, category: 'Environment', creatorType: 'ngo', organizer: { name: 'Rajiv Tiwari', avatarUrl: '', ngoDetails: { name: 'Ganga Prahari', phone: '+91-5678901234', email: 'clean@ganga.org', address: '555, Ghat Rd, Varanasi, Uttar Pradesh, 221001' } }, verified: true, urgency: 'Medium', location: 'Varanasi', updates: [], comments: [] },
    { id: '11', title: 'Mental Health Support Hotline', description: 'Fund a free, confidential counseling service.', longDescription: 'Mental health is often stigmatized and inaccessible. This project funds a 24/7 hotline staffed by trained counselors, providing a safe space for anyone to talk and receive professional guidance during times of distress.', images: ['https://picsum.photos/seed/mental_health/600/400'], goal: 1200000, raised: 550000, donors: 150, category: 'Medical', creatorType: 'individual', organizer: { name: 'Mann Seva', avatarUrl: '' }, verified: true, urgency: 'High', location: 'All India', updates: [], comments: [] },
    { id: '12', title: 'Preserve Indian Folk Art', description: 'Support traditional artists and keep ancient art forms alive.', longDescription: 'Many traditional Indian art forms are on the verge of extinction. This campaign provides financial support and a platform for folk artists to practice their craft, teach the next generation, and showcase their work to a wider audience.', images: ['https://picsum.photos/seed/folk_art/600/400'], goal: 400000, raised: 180000, donors: 60, category: 'Education', creatorType: 'individual', organizer: { name: 'Kala Sanskriti Foundation', avatarUrl: '' }, verified: false, urgency: 'Low', location: 'Jaipur', updates: [], comments: [] },
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  { name: 'Ananya Iyer', role: 'Donor', quote: 'Donify makes it so easy to find causes I care about. Seeing the impact of my donation is incredibly rewarding.', avatarUrl: '' },
  { name: 'Rani Devi', role: 'Recipient', quote: 'The new well in our village, funded through Donify, has changed our lives. My children are healthier, and we have hope for the future.', avatarUrl: '' },
  { name: 'Rohan Mehta', role: 'Donor', quote: 'The transparency and regular updates are what set Donify apart. I trust that my money is going where it\'s needed most.', avatarUrl: '' }
];

export const MOCK_LEADERBOARD: LeaderboardUser[] = [
    { rank: 1, name: 'Vikram Singh', avatarUrl: '', donations: 42, total: 420000, verified: true },
    { rank: 2, name: 'Sunita Gupta', avatarUrl: '', donations: 35, total: 384000, verified: true },
    { rank: 3, name: 'Rajesh Kumar', avatarUrl: '', donations: 50, total: 360000, verified: true },
    { rank: 4, name: 'Deepa Patel', avatarUrl: '', donations: 28, total: 256000 },
    { rank: 5, name: 'Arjun Desai', avatarUrl: '', donations: 15, total: 224000 },
    { rank: 6, name: 'Meera Krishnan', avatarUrl: '', donations: 22, total: 210000 },
    { rank: 7, name: 'Amit Varma', avatarUrl: '', donations: 30, total: 205000 },
    { rank: 8, name: 'Sneha Reddy', avatarUrl: '', donations: 18, total: 198000 },
    { rank: 9, name: 'Karan Malhotra', avatarUrl: '', donations: 25, total: 190000 },
    { rank: 10, name: 'Pooja Bhatt', avatarUrl: '', donations: 12, total: 185000 },
    { rank: 11, name: 'Nikhil Joshi', avatarUrl: '', donations: 20, total: 180000 },
    { rank: 12, name: 'Isha Nair', avatarUrl: '', donations: 16, total: 176000 },
    { rank: 13, name: 'Ravi Shankar', avatarUrl: '', donations: 14, total: 172000 },
    { rank: 14, name: 'Divya Rao', avatarUrl: '', donations: 19, total: 168000 },
    { rank: 15, name: 'Sanjay Menon', avatarUrl: '', donations: 11, total: 160000 },
    { rank: 16, name: 'Anjali Sharma', avatarUrl: '', donations: 21, total: 155000 },
    { rank: 17, name: 'Mahesh Agarwal', avatarUrl: '', donations: 13, total: 150000 },
    { rank: 18, name: 'Aditi Singh', avatarUrl: '', donations: 17, total: 145000 },
    { rank: 19, name: 'Gaurav Chauhan', avatarUrl: '', donations: 10, total: 140000 },
    { rank: 20, name: 'Neha Dubey', avatarUrl: '', donations: 9, total: 135000 },
    { rank: 21, name: 'Varun Anand', avatarUrl: '', donations: 8, total: 130000 },
    { rank: 22, name: 'Kavita Mishra', avatarUrl: '', donations: 15, total: 125000 },
    { rank: 23, name: 'Harish Chandra', avatarUrl: '', donations: 7, total: 120000 },
    { rank: 24, name: 'Ritu Verma', avatarUrl: '', donations: 12, total: 115000 },
    { rank: 25, name: 'Alok Nath', avatarUrl: '', donations: 6, total: 110000 },
];

export const MOCK_FAQS: FAQItem[] = [
    { question: 'Is my donation secure?', answer: 'Yes, absolutely. We use industry-leading encryption and payment processing partners to ensure your financial information is safe and secure.' },
    { question: 'Can I get a tax receipt for my donation?', answer: 'Yes, for all donations made to verified non-profit organizations by individual donors, you will automatically receive a tax-deductible receipt via email. This option is not available for accounts registered as NGOs.' },
    { question: 'How much of my donation goes to the cause?', answer: 'We believe in transparency. Donify deducts a small 5% platform fee to cover operational costs. The remaining 95% goes directly to the campaign organizer.' },
    { question: 'How are campaigns verified?', answer: 'Our dedicated team performs a rigorous verification process for organizations, which includes checking their registration documents, financial history, and mission alignment to ensure they are legitimate and trustworthy. All emergency-related campaigns must undergo this verification process.' },
    { question: 'Can I create my own fundraiser?', answer: 'Yes! Both individuals and registered NGOs can create fundraisers on Donify. Just navigate to the "Create" page after logging in to get started.' },
];

export const HOW_IT_WORKS_STEPS = [
  {
    icon: MagnifyingGlassIcon,
    title: 'Discover a Cause',
    description: 'Browse through verified campaigns that align with your passion, from education to disaster relief.'
  },
  {
    icon: HeartIcon,
    title: 'Make a Donation',
    description: 'Choose a campaign and donate securely using our simple and transparent payment process.'
  },
  {
    icon: CheckBadgeIcon,
    title: 'Track Your Impact',
    description: 'Receive updates from organizers and see the tangible difference your kindness makes.'
  },
  {
    icon: GlobeAltIcon,
    title: 'Spread the Word',
    description: 'Share the cause with your friends and family to inspire more people to contribute and create change.'
  }
];

export const MOCK_LOCATION_REQUESTS: LocationRequest[] = [
    { id: 1, type: 'recipient', title: 'Urgent Food Supply Needed', description: 'A family of 5 is in urgent need of groceries.', position: { lat: 28.46, lng: 77.03 }, name: 'Sunita Sharma', email: 'sunita.s@example.com', phone: '9876543210' },
    { id: 2, type: 'recipient', title: 'Winter Blankets for Shelter', description: 'Shelter requires 50 warm blankets for the cold season.', position: { lat: 28.45, lng: 77.02 }, name: 'Rajiv Memorial Trust', email: 'rajiv.trust@example.com', phone: '9876543211', imageUrl: 'https://picsum.photos/seed/shelter_need/600/400' },
    { id: 3, type: 'donor', title: 'Monthly Grocery Donor', description: 'Willing to provide monthly groceries for a family in need.', position: { lat: 28.47, lng: 77.04 }, name: 'Ankit Gupta', email: 'ankit.g@example.com', phone: '9876543212' },
    { id: 4, type: 'recipient', title: 'Medical Aid for an Elder', description: 'An elderly resident needs assistance for medical bills.', position: { lat: 28.44, lng: 77.01 }, name: 'Kamla Devi', email: 'kamla.d@example.com', phone: '9876543213' },
    { id: 5, type: 'donor', title: 'Education Sponsor', description: 'Happy to sponsor the education of a bright student.', position: { lat: 28.48, lng: 77.025 }, name: 'Priya Singh', email: 'priya.s@example.com', phone: '9876543214' },
];


// =================================================================
// DYNAMIC DATA GENERATORS
// =================================================================

const firstNames = ['Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan', 'Krishna', 'Ishaan', 'Saanvi', 'Aanya', 'Aadhya', 'Aaradhya', 'Ananya', 'Pari', 'Anika', 'Navya', 'Diya', 'Myra'];
const lastNames = ['Patel', 'Sharma', 'Singh', 'Kumar', 'Gupta', 'Reddy', 'Jain', 'Verma', 'Yadav', 'Mehta'];
const campaignNouns = ['Hope', 'Futures', 'Smiles', 'Dreams', 'Beginnings', 'Lives', 'Communities', 'Health', 'Knowledge', 'Shelter'];
const campaignActions = ['Building', 'Empowering', 'Supporting', 'Restoring', 'Funding', 'Providing', 'Nurturing', 'Creating', 'Delivering', 'Saving'];
const campaignTargets = ['Children', 'Villages', 'Animals', 'the Environment', 'Students', 'Seniors', 'Families', 'Patients', 'the Youth', 'Artisans'];

const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateUniqueUsers = (count: number, existingUsers: LeaderboardUser[]): LeaderboardUser[] => {
    const newUsers: LeaderboardUser[] = [];
    const existingNames = new Set(existingUsers.map(u => u.name));
    const lastExistingUser = existingUsers[existingUsers.length - 1] || { rank: 0, total: 110000, donations: 0 };

    let lastTotal = lastExistingUser.total;

    for (let i = 0; i < count; i++) {
        let name = '';
        do {
            name = `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}`;
        } while (existingNames.has(name));
        
        existingNames.add(name);
        const total = Math.max(lastTotal - getRandomNumber(3000, 8000), 1000);
        lastTotal = total;

        newUsers.push({
            rank: lastExistingUser.rank + i + 1,
            name,
            avatarUrl: '',
            donations: getRandomNumber(5, 20),
            total: total,
        });
    }
    return newUsers;
};

export const generateUniqueCampaigns = (count: number, existingCampaigns: Campaign[]): Campaign[] => {
    const newCampaigns: Campaign[] = [];
    const existingTitles = new Set(existingCampaigns.map(c => c.title));
    const categories: Campaign['category'][] = ['Medical', 'Education', 'Environment', 'Disaster Relief', 'Children', 'Elderly', 'Animals', 'Women Empowerment'];

    for (let i = 0; i < count; i++) {
        let title = '';
        do {
            title = `${getRandomElement(campaignActions)} ${getRandomElement(campaignNouns)} for ${getRandomElement(campaignTargets)}`;
        } while (existingTitles.has(title));

        existingTitles.add(title);
        const goal = getRandomNumber(2, 20) * 100000;
        const raised = Math.floor(goal * Math.random() * 0.9);

        newCampaigns.push({
            id: `gen-${Date.now()}-${i}`,
            title,
            description: `A new initiative to help ${getRandomElement(campaignTargets).toLowerCase()}.`,
            longDescription: `This is a detailed description for the campaign '${title}'. Our goal is to make a significant impact by focusing our efforts on this crucial cause. We believe that with your support, we can achieve great things and bring positive change.`,
            images: [`https://picsum.photos/seed/${title.substring(0, 15).replace(/\s/g, '_')}/600/400`],
            goal,
            raised,
            donors: getRandomNumber(50, 500),
            category: getRandomElement(categories),
            creatorType: 'individual',
            organizer: { name: `${getRandomElement(lastNames)} Foundation`, avatarUrl: '' },
            verified: Math.random() > 0.3,
            urgency: getRandomElement(['High', 'Medium', 'Low']),
            location: 'India',
            updates: [],
            comments: [],
            isCompleted: false,
        });
    }
    return newCampaigns;
};


// =================================================================
// STATIC PAGE CONTENT
// =================================================================

export const ABOUT_US_CONTENT = {
  title: "Our Mission: To Bridge the Gap Between Compassion and Action",
  subtitle: "Donify is a non-profit platform built with passion by two students - Shaurya, and Pranshu—from Lions Public School, Gurugram. We are a team of aspiring technologists and storytellers dedicated to making charitable giving more transparent, accessible, and impactful.",
  story: "Donify was born from a simple idea: what if giving to a cause you care about was as easy as a single tap, and what if you could see the real-world change your contribution creates? As students, we saw a world full of compassion but also full of complexities that prevented people from helping. We set out to build a platform that puts trust and connection at its heart. We connect donors directly with verified, on-the-ground organizations and individuals making a tangible difference. Every campaign on our platform is carefully vetted to ensure your generosity reaches those who need it most. Our mission is not just to facilitate donations, but to build a global community united by a shared desire to create a better world, starting right from our school.",
  values: [
    { title: "Transparency", icon: EyeIcon, description: "We provide clear insights into how every rupee is used and offer regular updates directly from the campaign organizers." },
    { title: "Trust", icon: ShieldCheckIcon, description: "Our rigorous verification process ensures that every organization on our platform is legitimate, accountable, and effective." },
    { title: "Impact", icon: SparklesIcon, description: "We focus on tangible outcomes, enabling you to see and share the incredible difference your donation makes." }
  ]
};

export const MEET_THE_TEAM = [
        { name: 'Shaurya', role: 'UI/UX Designer', imageUrl: '', description: 'The creative visionary who crafted the beautiful and intuitive user experience.' },
    { name: 'Pranshu', role: 'Product Manager', imageUrl: '', description: 'The strategic mind ensuring the platform meets the needs of both donors and recipients.' },
]

export const CONTACT_US_CONTENT = {
    title: "Get in Touch",
    subtitle: "We'd love to hear from you. Whether you have a question, a suggestion, or need support, our team is here to help.",
    methods: [
        { title: "General Inquiries", icon: QuestionMarkCircleIcon, email: "hello@donify.com", description: "For any general questions about Donify, our mission, or how to get started." },
        { title: "Campaign Support", icon: LifebuoyIcon, email: "support@donify.com", description: "If you need help with a donation, your account, or a campaign you are running." },
        { title: "Partnerships", icon: UserGroupIcon, email: "partners@donify.com", description: "For organizations interested in collaborating with us or being featured on Donify." }
    ],
    address: "Donify Headquarters (Official), c/o Lions Public School, Sector 10A, Gurugram, Haryana, 122001, India"
};

export const TERMS_CONTENT = `...`; // Placeholder, will be expanded in pages.tsx
export const PRIVACY_CONTENT = `...`; // Placeholder, will be expanded in pages.tsx