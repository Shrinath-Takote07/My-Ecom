// components/AccessibilityHub.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
    Accessibility,
    Eye,
    EyeOff,
    Volume2,
    VolumeX,
    Contrast,
    Type,
    MousePointer,
    Keyboard,
    Plus,
    Brain,
    Trash2,
    Captions,
    ZoomIn,
    ZoomOut,
    HelpCircle,
    Settings,
    Check,
    X,
    Moon,
    Sun,
    AlertCircle,
    Headphones,
    Shield,
    Globe,
    ChevronRight,
    ChevronDown,
    RotateCcw,
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Maximize,
    Minimize,
    MessageSquare,
    Download,
    Upload,
    Bell,
    User
} from 'lucide-react';

const AccessibilityHub = () => {
    // State for accessibility features
    const [activeTab, setActiveTab] = useState('vision');
    const [highContrast, setHighContrast] = useState(false);
    const [fontSize, setFontSize] = useState(16);
    const [lineHeight, setLineHeight] = useState(1.5);
    const [letterSpacing, setLetterSpacing] = useState(0);
    const [screenReader, setScreenReader] = useState(false);
    const [captions, setCaptions] = useState(true);
    const [reducedMotion, setReducedMotion] = useState(false);
    const [focusHighlight, setFocusHighlight] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [voiceOver, setVoiceOver] = useState(false);
    const [voiceSpeed, setVoiceSpeed] = useState(1);
    const [showVoiceControls, setShowVoiceControls] = useState(false);
    const [keyboardNavigation, setKeyboardNavigation] = useState(true);
    const [focusVisible, setFocusVisible] = useState(true);
    const [colorBlindMode, setColorBlindMode] = useState('none');
    const [audioDescription, setAudioDescription] = useState(false);
    const [showQuickActions, setShowQuickActions] = useState(false);
    const [savedProfiles, setSavedProfiles] = useState([]);
    const [activeProfile, setActiveProfile] = useState('default');
    const [speechText, setSpeechText] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);

    const speechRef = useRef(null);
    const mainContentRef = useRef(null);
    const focusTrapRef = useRef(null);

    // Apply accessibility styles
    useEffect(() => {
        document.documentElement.style.setProperty('--font-size', `${fontSize}px`);
        document.documentElement.style.setProperty('--line-height', `${lineHeight}`);
        document.documentElement.style.setProperty('--letter-spacing', `${letterSpacing}px`);

        if (highContrast) {
            document.documentElement.classList.add('high-contrast');
        } else {
            document.documentElement.classList.remove('high-contrast');
        }

        if (reducedMotion) {
            document.documentElement.classList.add('reduce-motion');
        } else {
            document.documentElement.classList.remove('reduce-motion');
        }

        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // Apply color blindness simulation
        document.documentElement.classList.remove(
            'protanopia',
            'deuteranopia',
            'tritanopia',
            'achromatopsia'
        );
        if (colorBlindMode !== 'none') {
            document.documentElement.classList.add(colorBlindMode);
        }

        // Focus highlight
        if (focusHighlight) {
            document.documentElement.classList.add('focus-highlight');
        } else {
            document.documentElement.classList.remove('focus-highlight');
        }

        // Announce changes to screen readers
        if (screenReader) {
            const announcement = document.getElementById('accessibility-announcement');
            if (announcement) {
                announcement.textContent = `Accessibility settings updated. High contrast: ${highContrast ? 'on' : 'off'}, Font size: ${fontSize}px`;
            }
        }
    }, [highContrast, fontSize, lineHeight, letterSpacing, reducedMotion, darkMode, colorBlindMode, focusHighlight, screenReader]);

    // Initialize Speech Synthesis
    useEffect(() => {
        if ('speechSynthesis' in window) {
            speechRef.current = window.speechSynthesis;
        }
    }, []);

    const speakText = (text) => {
        if (!speechRef.current) return;

        if (isSpeaking) {
            speechRef.current.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = voiceSpeed;
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        speechRef.current.speak(utterance);
        setIsSpeaking(true);
    };

    const stopSpeaking = () => {
        if (speechRef.current) {
            speechRef.current.cancel();
            setIsSpeaking(false);
        }
    };

    const tabs = [
        { id: 'vision', label: 'Vision', icon: Eye, ariaLabel: 'Vision accessibility settings' },
        { id: 'hearing', label: 'Hearing', icon: Volume2, ariaLabel: 'Hearing accessibility settings' },
        { id: 'mobility', label: 'Mobility', icon: MousePointer, ariaLabel: 'Mobility accessibility settings' },
        { id: 'cognitive', label: 'Cognitive', icon: Brain, ariaLabel: 'Cognitive accessibility settings' },
        { id: 'profiles', label: 'Profiles', icon: User, ariaLabel: 'Saved accessibility profiles' }
    ];

    const visionSettings = [
        {
            id: 'contrast',
            label: 'High Contrast Mode',
            description: 'Increase color contrast for better readability',
            icon: Contrast,
            value: highContrast,
            onChange: setHighContrast,
            type: 'toggle'
        },
        {
            id: 'font-size',
            label: 'Font Size',
            description: 'Adjust text size for better readability',
            icon: Type,
            value: fontSize,
            onChange: setFontSize,
            type: 'slider',
            min: 12,
            max: 24,
            step: 1,
            unit: 'px'
        },
        {
            id: 'line-height',
            label: 'Line Height',
            description: 'Adjust spacing between lines of text',
            icon: Type,
            value: lineHeight,
            onChange: setLineHeight,
            type: 'slider',
            min: 1,
            max: 2.5,
            step: 0.1
        },
        {
            id: 'letter-spacing',
            label: 'Letter Spacing',
            description: 'Adjust spacing between letters',
            icon: Type,
            value: letterSpacing,
            onChange: setLetterSpacing,
            type: 'slider',
            min: 0,
            max: 3,
            step: 0.1,
            unit: 'px'
        },
        {
            id: 'color-blind',
            label: 'Color Vision',
            description: 'Simulate different types of color blindness',
            icon: EyeOff,
            value: colorBlindMode,
            onChange: setColorBlindMode,
            type: 'select',
            options: [
                { value: 'none', label: 'Normal Vision' },
                { value: 'protanopia', label: 'Protanopia (Red-blind)' },
                { value: 'deuteranopia', label: 'Deuteranopia (Green-blind)' },
                { value: 'tritanopia', label: 'Tritanopia (Blue-blind)' },
                { value: 'achromatopsia', label: 'Achromatopsia (Monochrome)' }
            ]
        },
        {
            id: 'dark-mode',
            label: 'Dark Mode',
            description: 'Switch to dark color scheme',
            icon: Moon,
            value: darkMode,
            onChange: setDarkMode,
            type: 'toggle'
        }
    ];

    const hearingSettings = [
        {
            id: 'captions',
            label: 'Closed Captions',
            description: 'Display text captions for audio content',
            icon: Captions,
            value: captions,
            onChange: setCaptions,
            type: 'toggle'
        },
        {
            id: 'audio-description',
            label: 'Audio Description',
            description: 'Narrate visual content',
            icon: Headphones,
            value: audioDescription,
            onChange: setAudioDescription,
            type: 'toggle'
        },
        {
            id: 'volume-boost',
            label: 'Volume Boost',
            description: 'Increase audio volume by 30%',
            icon: Volume2,
            value: false,
            onChange: () => { },
            type: 'toggle'
        },
        {
            id: 'visual-alerts',
            label: 'Visual Alerts',
            description: 'Replace audio alerts with visual indicators',
            icon: Bell,
            value: false,
            onChange: () => { },
            type: 'toggle'
        }
    ];

    const mobilitySettings = [
        {
            id: 'keyboard-nav',
            label: 'Keyboard Navigation',
            description: 'Enable full keyboard navigation support',
            icon: Keyboard,
            value: keyboardNavigation,
            onChange: setKeyboardNavigation,
            type: 'toggle'
        },
        {
            id: 'focus-highlight',
            label: 'Focus Highlight',
            description: 'Highlight focused elements clearly',
            icon: MousePointer,
            value: focusHighlight,
            onChange: setFocusHighlight,
            type: 'toggle'
        },
        {
            id: 'focus-visible',
            label: 'Focus Visible',
            description: 'Always show focus indicators',
            icon: MousePointer,
            value: focusVisible,
            onChange: setFocusVisible,
            type: 'toggle'
        },
        {
            id: 'skip-links',
            label: 'Skip to Content',
            description: 'Add skip navigation links',
            icon: SkipForward,
            value: true,
            onChange: () => { },
            type: 'toggle'
        }
    ];

    const cognitiveSettings = [
        {
            id: 'reduced-motion',
            label: 'Reduce Motion',
            description: 'Minimize animations and transitions',
            icon: RotateCcw,
            value: reducedMotion,
            onChange: setReducedMotion,
            type: 'toggle'
        },
        {
            id: 'simplified-layout',
            label: 'Simplified Layout',
            description: 'Show simplified interface layout',
            icon: Minimize,
            value: false,
            onChange: () => { },
            type: 'toggle'
        },
        {
            id: 'reading-assist',
            label: 'Reading Assistance',
            description: 'Enable text-to-speech for content',
            icon: Volume2,
            value: voiceOver,
            onChange: setVoiceOver,
            type: 'toggle'
        },
        {
            id: 'focus-mode',
            label: 'Focus Mode',
            description: 'Reduce distractions by hiding non-essential elements',
            icon: Eye,
            value: false,
            onChange: () => { },
            type: 'toggle'
        }
    ];

    const quickActions = [
        { label: 'High Contrast', action: () => setHighContrast(!highContrast), icon: Contrast },
        { label: 'Text Size +', action: () => setFontSize(Math.min(24, fontSize + 2)), icon: ZoomIn },
        { label: 'Text Size -', action: () => setFontSize(Math.max(12, fontSize - 2)), icon: ZoomOut },
        { label: 'Read Aloud', action: () => speakText(getPageContent()), icon: Volume2 },
        { label: 'Pause Animations', action: () => setReducedMotion(!reducedMotion), icon: Pause },
        { label: 'Dark Mode', action: () => setDarkMode(!darkMode), icon: Moon },
    ];

    const getPageContent = () => {
        if (mainContentRef.current) {
            return mainContentRef.current.innerText;
        }
        return document.body.innerText;
    };

    const saveCurrentProfile = (name) => {
        const profile = {
            id: Date.now().toString(),
            name,
            settings: {
                highContrast,
                fontSize,
                lineHeight,
                letterSpacing,
                darkMode,
                reducedMotion,
                captions,
                colorBlindMode
            },
            timestamp: new Date().toISOString()
        };

        setSavedProfiles([...savedProfiles, profile]);
        setActiveProfile(profile.id);
    };

    const loadProfile = (profileId) => {
        const profile = savedProfiles.find(p => p.id === profileId);
        if (profile) {
            const { settings } = profile;
            setHighContrast(settings.highContrast);
            setFontSize(settings.fontSize);
            setLineHeight(settings.lineHeight);
            setLetterSpacing(settings.letterSpacing);
            setDarkMode(settings.darkMode);
            setReducedMotion(settings.reducedMotion);
            setCaptions(settings.captions);
            setColorBlindMode(settings.colorBlindMode);
            setActiveProfile(profileId);
        }
    };

    const resetSettings = () => {
        setHighContrast(false);
        setFontSize(16);
        setLineHeight(1.5);
        setLetterSpacing(0);
        setScreenReader(false);
        setCaptions(true);
        setReducedMotion(false);
        setFocusHighlight(true);
        setDarkMode(false);
        setVoiceOver(false);
        setVoiceSpeed(1);
        setKeyboardNavigation(true);
        setFocusVisible(true);
        setColorBlindMode('none');
        setAudioDescription(false);
        setActiveProfile('default');
    };

    const renderSetting = (setting) => {
        switch (setting.type) {
            case 'toggle':
                return (
                    <button
                        onClick={() => setting.onChange(!setting.value)}
                        aria-label={`${setting.label}: ${setting.value ? 'Enabled' : 'Disabled'}. ${setting.description}`}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${setting.value ? 'bg-blue-600' : 'bg-gray-200'}`}
                        role="switch"
                        aria-checked={setting.value}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${setting.value ? 'translate-x-6' : 'translate-x-1'}`}
                        />
                    </button>
                );

            case 'slider':
                return (
                    <div className="space-y-2">
                        <input
                            type="range"
                            min={setting.min}
                            max={setting.max}
                            step={setting.step}
                            value={setting.value}
                            onChange={(e) => setting.onChange(parseFloat(e.target.value))}
                            aria-label={`${setting.label}: ${setting.value}${setting.unit || ''}`}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>{setting.min}{setting.unit || ''}</span>
                            <span className="font-medium">{setting.value}{setting.unit || ''}</span>
                            <span>{setting.max}{setting.unit || ''}</span>
                        </div>
                    </div>
                );

            case 'select':
                return (
                    <select
                        value={setting.value}
                        onChange={(e) => setting.onChange(e.target.value)}
                        aria-label={setting.description}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        {setting.options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            default:
                return null;
        }
    };

    const renderSettingsList = (settings) => (
        <div className="space-y-4">
            {settings.map((setting) => (
                <div
                    key={setting.id}
                    className="bg-white rounded-xl shadow-sm p-4"
                    role="region"
                    aria-labelledby={`setting-${setting.id}`}
                >
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3">
                            <setting.icon className="w-5 h-5 text-blue-600" aria-hidden="true" />
                            <div>
                                <h3
                                    id={`setting-${setting.id}`}
                                    className="font-semibold text-gray-900"
                                >
                                    {setting.label}
                                </h3>
                                <p className="text-sm text-gray-600">{setting.description}</p>
                            </div>
                        </div>
                        {renderSetting(setting)}
                    </div>
                </div>
            ))}
        </div>
    );

    const VoiceControls = () => (
        <div className="fixed bottom-20 left-4 right-4 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Voice Controls</h3>
                <button
                    onClick={() => setShowVoiceControls(false)}
                    className="p-1 text-gray-500 hover:text-gray-700"
                    aria-label="Close voice controls"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Speech Speed: {voiceSpeed.toFixed(1)}x
                    </label>
                    <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={voiceSpeed}
                        onChange={(e) => setVoiceSpeed(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
                    />
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <button
                        onClick={() => speakText("Testing voice controls. Accessibility features are now active.")}
                        className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                        aria-label="Test speech"
                    >
                        <Play className="w-4 h-4 mr-2" />
                        Test Voice
                    </button>
                    <button
                        onClick={stopSpeaking}
                        className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300"
                        aria-label="Stop speech"
                    >
                        <Pause className="w-4 h-4 mr-2" />
                        Stop
                    </button>
                </div>
            </div>
        </div>
    );

    const QuickActionsPanel = () => (
        <div className="fixed bottom-20 left-4 right-4 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Quick Actions</h3>
                <button
                    onClick={() => setShowQuickActions(false)}
                    className="p-1 text-gray-500 hover:text-gray-700"
                    aria-label="Close quick actions"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
                {quickActions.map((action, index) => (
                    <button
                        key={index}
                        onClick={action.action}
                        className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label={action.label}
                    >
                        <action.icon className="w-5 h-5 text-blue-600 mb-1" />
                        <span className="text-xs text-gray-700 text-center">{action.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div
            className="min-h-screen bg-gray-50 pb-24 transition-colors duration-200"
            ref={mainContentRef}
            role="main"
            aria-label="Accessibility settings hub"
        >
            {/* Screen reader announcements */}
            <div
                id="accessibility-announcement"
                className="sr-only"
                aria-live="polite"
                aria-atomic="true"
            >
                Accessibility settings loaded
            </div>

            {/* Skip to main content link */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium"
            >
                Skip to main content
            </a>

            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-30">
                <div className="px-4 py-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Accessibility className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Accessibility Hub</h1>
                                <p className="text-sm text-gray-500">Customize your experience</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setShowQuickActions(true)}
                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                                aria-label="Quick accessibility actions"
                            >
                                <Settings className="w-5 h-5" />
                            </button>
                            <button
                                onClick={resetSettings}
                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                                aria-label="Reset all accessibility settings"
                            >
                                <RotateCcw className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Tabs - Accessible tablist */}
                    <div className="overflow-x-auto" role="tablist" aria-label="Accessibility categories">
                        <div className="flex space-x-1 pb-2 min-w-max">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    id={`tab-${tab.id}`}
                                    role="tab"
                                    aria-selected={activeTab === tab.id}
                                    aria-controls={`panel-${tab.id}`}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.id
                                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                                        : 'text-gray-600 hover:bg-gray-100 border border-transparent'
                                        }`}
                                >
                                    <tab.icon className="w-4 h-4 mr-1.5" aria-hidden="true" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            <main id="main-content" className="px-4 pt-4">
                {/* Current Profile Indicator */}
                <section className="mb-4">
                    <div className="bg-white rounded-xl shadow-sm p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="font-semibold text-gray-900">Active Profile</h2>
                                <p className="text-sm text-gray-600">
                                    {activeProfile === 'default' ? 'Default settings' : 'Custom profile'}
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    const name = prompt('Enter profile name:');
                                    if (name) saveCurrentProfile(name);
                                }}
                                className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                                aria-label="Save current settings as new profile"
                            >
                                Save Profile
                            </button>
                        </div>
                    </div>
                </section>

                {/* Tab Panels */}
                <div role="tabpanel" id="panel-vision" aria-labelledby="tab-vision" hidden={activeTab !== 'vision'}>
                    {renderSettingsList(visionSettings)}
                </div>

                <div role="tabpanel" id="panel-hearing" aria-labelledby="tab-hearing" hidden={activeTab !== 'hearing'}>
                    {renderSettingsList(hearingSettings)}

                    {/* Voice Control Section */}
                    <div className="mt-4 bg-white rounded-xl shadow-sm p-4">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="font-semibold text-gray-900">Voice Control</h3>
                                <p className="text-sm text-gray-600">Control interface with voice commands</p>
                            </div>
                            <button
                                onClick={() => setShowVoiceControls(!showVoiceControls)}
                                className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                                aria-expanded={showVoiceControls}
                                aria-controls="voice-controls"
                            >
                                {showVoiceControls ? 'Hide Controls' : 'Show Controls'}
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label htmlFor="speech-text" className="block text-sm font-medium text-gray-700 mb-2">
                                    Text to Speech
                                </label>
                                <div className="flex space-x-2">
                                    <input
                                        id="speech-text"
                                        type="text"
                                        value={speechText}
                                        onChange={(e) => setSpeechText(e.target.value)}
                                        placeholder="Enter text to speak..."
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <button
                                        onClick={() => speakText(speechText)}
                                        disabled={!speechText.trim()}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium ${speechText.trim()
                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            }`}
                                        aria-label="Speak the entered text"
                                    >
                                        Speak
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div role="tabpanel" id="panel-mobility" aria-labelledby="tab-mobility" hidden={activeTab !== 'mobility'}>
                    {renderSettingsList(mobilitySettings)}

                    {/* Keyboard Shortcuts */}
                    <div className="mt-4 bg-white rounded-xl shadow-sm p-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Keyboard Shortcuts</h3>
                        <div className="space-y-2">
                            {[
                                { key: 'Tab', action: 'Navigate through elements' },
                                { key: 'Shift + Tab', action: 'Navigate backwards' },
                                { key: 'Enter/Space', action: 'Activate selected element' },
                                { key: 'Arrow Keys', action: 'Navigate within components' },
                                { key: 'Escape', action: 'Close modals/cancel' },
                                { key: 'Ctrl + Z', action: 'Undo last action' },
                            ].map((shortcut, index) => (
                                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                    <kbd className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm font-mono">
                                        {shortcut.key}
                                    </kbd>
                                    <span className="text-sm text-gray-600">{shortcut.action}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div role="tabpanel" id="panel-cognitive" aria-labelledby="tab-cognitive" hidden={activeTab !== 'cognitive'}>
                    {renderSettingsList(cognitiveSettings)}

                    {/* Reading Assistance */}
                    <div className="mt-4 bg-white rounded-xl shadow-sm p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <h3 className="font-semibold text-gray-900">Reading Assistance</h3>
                                <p className="text-sm text-gray-600">Tools to help with reading comprehension</p>
                            </div>
                            <button
                                onClick={() => setVoiceOver(!voiceOver)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${voiceOver ? 'bg-blue-600' : 'bg-gray-200'}`}
                                role="switch"
                                aria-checked={voiceOver}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${voiceOver ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>

                        {voiceOver && (
                            <div className="space-y-3 mt-3">
                                <button
                                    onClick={() => speakText(getPageContent())}
                                    className="w-full flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                                    aria-label="Read entire page content aloud"
                                >
                                    <Volume2 className="w-4 h-4 mr-2" />
                                    Read Page Aloud
                                </button>

                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => speakText("This is a test of the reading assistance feature.")}
                                        className="flex-1 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                                        aria-label="Test reading assistance"
                                    >
                                        Test Voice
                                    </button>
                                    <button
                                        onClick={stopSpeaking}
                                        className="flex-1 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                                        aria-label="Stop reading"
                                    >
                                        Stop Reading
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div role="tabpanel" id="panel-profiles" aria-labelledby="tab-profiles" hidden={activeTab !== 'profiles'}>
                    {/* Saved Profiles */}
                    <div className="space-y-4">
                        <div className="bg-white rounded-xl shadow-sm p-4">
                            <h3 className="font-semibold text-gray-900 mb-3">Saved Profiles</h3>

                            <div className="space-y-3">
                                {/* Default Profile */}
                                <button
                                    onClick={() => resetSettings()}
                                    className={`w-full flex items-center justify-between p-3 rounded-lg border ${activeProfile === 'default'
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:bg-gray-50'
                                        }`}
                                    aria-label="Load default accessibility settings"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <Settings className="w-4 h-4 text-gray-600" />
                                        </div>
                                        <div className="text-left">
                                            <h4 className="font-medium text-gray-900">Default Settings</h4>
                                            <p className="text-xs text-gray-500">Original accessibility settings</p>
                                        </div>
                                    </div>
                                    {activeProfile === 'default' && (
                                        <Check className="w-5 h-5 text-blue-600" aria-hidden="true" />
                                    )}
                                </button>

                                {/* Saved Profiles */}
                                {savedProfiles.map((profile) => (
                                    <button
                                        key={profile.id}
                                        onClick={() => loadProfile(profile.id)}
                                        className={`w-full flex items-center justify-between p-3 rounded-lg border ${activeProfile === profile.id
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:bg-gray-50'
                                            }`}
                                        aria-label={`Load ${profile.name} accessibility profile`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <User className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <div className="text-left">
                                                <h4 className="font-medium text-gray-900">{profile.name}</h4>
                                                <p className="text-xs text-gray-500">
                                                    Saved on {new Date(profile.timestamp).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {activeProfile === profile.id && (
                                                <Check className="w-5 h-5 text-blue-600" aria-hidden="true" />
                                            )}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSavedProfiles(savedProfiles.filter(p => p.id !== profile.id));
                                                }}
                                                className="p-1 text-gray-400 hover:text-red-600"
                                                aria-label={`Delete ${profile.name} profile`}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </button>
                                ))}

                                {savedProfiles.length === 0 && (
                                    <div className="text-center py-6">
                                        <User className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                                        <p className="text-gray-500 text-sm">No saved profiles yet</p>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => {
                                    const name = prompt('Enter profile name:');
                                    if (name) saveCurrentProfile(name);
                                }}
                                className="w-full mt-4 flex items-center justify-center px-4 py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50"
                                aria-label="Save current settings as new profile"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Save Current Settings
                            </button>
                        </div>
                    </div>
                </div>

                {/* Accessibility Guidelines */}
                <section className="mt-6">
                    <div className="bg-white rounded-xl shadow-sm p-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Accessibility Guidelines</h3>
                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                                <div>
                                    <h4 className="font-medium text-gray-900">WCAG 2.1 Compliant</h4>
                                    <p className="text-sm text-gray-600">Meets Web Content Accessibility Guidelines level AA</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <Globe className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div>
                                    <h4 className="font-medium text-gray-900">ARIA Support</h4>
                                    <p className="text-sm text-gray-600">Proper ARIA labels and roles implemented</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <Keyboard className="w-5 h-5 text-purple-600 mt-0.5" />
                                <div>
                                    <h4 className="font-medium text-gray-900">Keyboard Accessible</h4>
                                    <p className="text-sm text-gray-600">Full keyboard navigation support</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Floating Action Buttons */}
            <div className="fixed bottom-24 right-4 flex flex-col items-end space-y-2 z-40">
                <button
                    onClick={() => setShowQuickActions(true)}
                    className="w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Quick accessibility actions"
                >
                    <Settings className="w-5 h-5" />
                </button>
                <button
                    onClick={() => speakText("Accessibility help activated. Use tab key to navigate, space or enter to activate buttons, and escape to close dialogs.")}
                    className="w-12 h-12 bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    aria-label="Get accessibility help"
                >
                    <HelpCircle className="w-5 h-5" />
                </button>
            </div>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-6 z-30">
                <div className="flex justify-between items-center">
                    {[
                        { icon: Accessibility, label: 'Hub', active: true },
                        { icon: Download, label: 'Import', active: false },
                        { icon: Upload, label: 'Export', active: false },
                        { icon: MessageSquare, label: 'Feedback', active: false },
                        { icon: HelpCircle, label: 'Help', active: false },
                    ].map((item, index) => (
                        <button
                            key={index}
                            className={`flex flex-col items-center p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg ${item.active ? 'text-blue-600' : 'text-gray-500'}`}
                            aria-label={item.label}
                        >
                            <item.icon className="w-5 h-5" aria-hidden="true" />
                            <span className="text-xs mt-1">{item.label}</span>
                        </button>
                    ))}
                </div>
            </nav>

            {/* Modals */}
            {showVoiceControls && <VoiceControls />}
            {showQuickActions && <QuickActionsPanel />}
        </div>
    );
};



export default AccessibilityHub;