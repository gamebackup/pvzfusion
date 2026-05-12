// sdk.js - Mock Yandex Games SDK (Updated with serverTime)
const YaGames = {
    init: () => Promise.resolve({
        // Core player
        getPlayer: () => Promise.resolve({
            isAuthorized: () => false,
            getName: () => "Guest",
            getUniqueID: () => "guest-" + Date.now(),
            getPhoto: (size) => "",
            getPayingStatus: () => "unknown",
            setData: (data, flush) => Promise.resolve(),
            getData: (keys) => Promise.resolve({ saves: null }),
            getStats: () => Promise.resolve({}),
            setStats: (stats) => Promise.resolve(),
        }),

        // Auth
        auth: {
            openAuthDialog: () => Promise.resolve()
        },

        // Ads
        adv: {
            showFullscreenAdv: (options) => {
                console.log("[YG Mock] Fullscreen ad requested");
                options?.callbacks?.onOpen?.();
                setTimeout(() => options?.callbacks?.onClose?.(true), 100);
            },
            showRewardedVideo: (options) => {
                console.log("[YG Mock] Rewarded video requested");
                options?.callbacks?.onOpen?.();
                options?.callbacks?.onRewarded?.();
                options?.callbacks?.onClose?.();
            },
            getBannerAdvStatus: () => Promise.resolve({ stickyAdvIsShowing: false }),
            showBannerAdv: () => {},
            hideBannerAdv: () => {}
        },

        // Payments
        getPayments: () => Promise.resolve({
            getCatalog: () => Promise.resolve([]),
            getPurchases: () => Promise.resolve([]),
            purchase: (id) => Promise.resolve(),
            consumePurchase: (token) => Promise.resolve()
        }),

        // Leaderboards
        leaderboards: {
            setScore: (name, score, extra) => Promise.resolve(),
            getDescription: (name) => Promise.resolve({
                default: false,
                description: {
                    invert_sort_order: false,
                    score_format: { options: { decimal_offset: 0 } },
                    type: "numeric"
                }
            }),
            getEntries: (name, options) => Promise.resolve({ entries: [] })
        },

        // Feedback & Shortcuts
        feedback: {
            canReview: () => Promise.resolve({ value: false }),
            requestReview: () => Promise.resolve({ feedbackSent: false })
        },
        shortcut: {
            canShowPrompt: () => Promise.resolve({ canShow: false }),
            showPrompt: () => Promise.resolve({ outcome: "rejected" })
        },

        // Features & Environment
        features: {
            GamesAPI: {
                getAllGames: () => Promise.resolve({ games: [], developerURL: "" })
            }
        },
        deviceInfo: {
            type: "desktop",
            isMobile: () => false,
            isDesktop: () => true,
            isTablet: () => false,
            isTV: () => false
        },
        environment: {
            i18n: { lang: "en", tld: "com" },
            app: { id: "mock" },
            browser: { lang: "en" },
            payload: null
        },

        // Event handling
        on: (event, callback) => {
            console.log(`[YG Mock] Event "${event}" registered`);
        },

        // ** NEW: Server time method **
        serverTime: () => {
            // Return current Unix timestamp in milliseconds
            // (Yandex SDK returns server time to prevent client clock cheating)
            return Date.now();
        },

        // Some games also call these methods; include stubs to be safe
        isInitialized: () => true,
        getLanguage: () => "en",
        getPlatform: () => "mock"
    })
};

console.log("[YG Mock] SDK loaded – YaGames defined with serverTime");
