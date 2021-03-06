module.exports = {
    /**
     * Name of the integration which is displayed in the Polarity integrations user interface
     *
     * @type String
     * @required
     */
    name: "VirusTotal",
    /**
     * The acronym that appears in the notification window when information from this integration
     * is displayed.  Note that the acronym is included as part of each "tag" in the summary information
     * for the integration.  As a result, it is best to keep it to 4 or less characters.  The casing used
     * here will be carried forward into the notification window.
     *
     * @type String
     * @required
     */
    acronym: "VT",
    /**
     * Description for this integration which is displayed in the Polarity integrations user interface
     *
     * @type String
     * @optional
     */
    description: "VirusTotal Integration for File and IP Address Reports",
    entityTypes: ['IPv4', 'hash'],
    /**
     * An array of style files (css or less) that will be included for your integration. Any styles specified in
     * the below files can be used in your custom template.
     *
     * @type Array
     * @optional
     */
    "styles": [
        "./styles/virustotal.less"
    ],
    /**
     * Provide custom component logic and template for rendering the integration details block.  If you do not
     * provide a custom template and/or component then the integration will display data as a table of key value
     * pairs.
     *
     * @type Object
     * @optional
     */
    block: {
        component: {
            file: "./components/virustotal.js"
        },
        template: {
            file: "./templates/virustotal.hbs"
        }
    },
    settings:{
        /**
         * This is an experimental feature designed to reduce the number of lookups made to VirusTotal.  It works
         * by tracking pending lookups and then queuing additional lookups on an indicator until after
         * any pending lookups are returned.
         *
         * Important: You must be running Polarity-Server >= 2.5.0 if you want to set this value to true
         */
        trackPendingLookups: false
    },
    request: {
        // Provide the path to your certFile. Leave an empty string to ignore this option.
        // Relative paths are relative to the VT integration's root directory
        cert: '',
        // Provide the path to your private key. Leave an empty string to ignore this option.
        // Relative paths are relative to the VT integration's root directory
        key: '',
        // Provide the key passphrase if required.  Leave an empty string to ignore this option.
        // Relative paths are relative to the VT integration's root directory
        passphrase: '',
        // Provide the Certificate Authority. Leave an empty string to ignore this option.
        // Relative paths are relative to the VT integration's root directory
        ca: '',
        // An HTTP proxy to be used. Supports proxy Auth with Basic Auth, identical to support for
        // the url parameter (by embedding the auth info in the uri)
        proxy: ''
    },
    logging: {
        // directory is relative to the this integrations directory
        // e.g., if the integration is in /app/polarity-server/integrations/virustotal
        // and you set directoryPath to be `integration-logs` then your logs will go to
        // `/app/polarity-server/integrations/integration-logs`
        // You can also set an absolute path.  If you set an absolute path you must ensure that
        // the directory you specify is writable by the `polarityd:polarityd` user and group.

        //directoryPath: '/var/log/polarity-integrations',
        level: 'info',  //trace, debug, info, warn, error, fatal
        // Special flag to log per hour unique hash and ip counts to the log file
        // Counts are reset every 24 hours
        logLookupStats: true
        //fileName: 'virustotal.log'
    },
    /**
     * Options that are displayed to the user/admin in the Polarity integration user-interface.  Should be structured
     * as an array of option objects.
     *
     * @type Array
     * @optional
     */
    "options": [
        {
            /**
             * A Unique name for the option.  Should be camelcased (lowercase first letter, uppercase letters for
             * subsequent words).
             *
             * @property key
             * @type String             *
             */
            "key": "apiKey",
            /**
             * Human Readable name for the option which will be displayed in the Polarity user interface
             *
             * @property name
             * @type String
             */
            "name": "VirusTotal API Key",
            /**
             * A short description for what the option does.  This description is displayed in the user interface
             *
             * @property description
             * @type String
             */
            "description": "Your VirusTotal API Key",
            /**
             * The default value for the option.  Note this value can be either a String or Boolean depending on
             * the @type specified by the `type` property.
             *
             * @property default
             * @type String|Boolean
             */
            "default": "",
            /**
             * The type for this option.  Can be either "string", "boolean", or "password"
             *
             * @property type
             * @type String
             */
            "type": "text",
            /**
             * If `true`, non-admin users can edit the value of this option and the option will be stored on a
             * per-user basis.  If `false`, the option will be server wide.  Note that for this setting to have
             * an effect, the property `admin-only` must be set to false.
             *
             * @property user-can-edit
             * @type Boolean
             */
            "userCanEdit": true,
            /**
             * If set to true, the setting can only be viewed by admins.  For all other users the setting will not appear.
             * Note that if `admin-only` is set to true the value of `user-can-edit` is not applicable.
             *
             * @property admin-only
             * @type Boolean
             */
            "adminOnly": false
        },
        {
            "key": "lookupIps",
            "name": "Lookup IP Addresses",
            "description": "If checked, the integration will lookup IP addresses in VirusTotal",
            "default": true,
            "type": "boolean",
            "userCanEdit": true,
            "adminOnly": false
        },
        {
            "key": "lookupFiles",
            "name": "Lookup Files (Hashes)",
            "description": "If checked, the integration will lookup files (MD5, SHA1, SHA256) in VirusTotal",
            "default": true,
            "type": "boolean",
            "userCanEdit": true,
            "adminOnly": false
        },
        {
            "key": "showHashesWithNoDetections",
            "name": "Show Files (Hashes) with No Detections",
            "description": "If checked, the integration will show results for files that have no positive detections.",
            "default": false,
            "type": "boolean",
            "userCanEdit": true,
            "adminOnly": false
        },
        {
            "key": "warnOnLookupLimit",
            "name": "API Key Limit Reached Warning",
            "description": "Displays a Warning in the Notification Window if you have reached your" +
            " VirusTotal API key lookup limit",
            "default": false,
            "type": "boolean",
            "userCanEdit": true,
            "adminOnly": false
        },
        {
            "key": "isPrivateApi",
            "name": "Is Private API",
            "description": "If true, the integration will treat your key as a paid private API key which allows for more efficient hash lookups",
            "default": false,
            "type": "boolean",
            "userCanEdit": true,
            "adminOnly": false
        }
    ]
};