/**
 * TTS Utility for Empire Protocol
 * Handles speech synthesis using the Web Speech API.
 */

class TTSManager {
    constructor() {
        this.synth = window.speechSynthesis;
        this.voice = null;
        this.isInitialized = false;

        // Try to init immediately
        this._initVoice();

        // Voices are loaded asynchronously
        if (this.synth.onvoiceschanged !== undefined) {
            this.synth.onvoiceschanged = () => this._initVoice();
        }
    }

    _initVoice() {
        if (this.isInitialized && this.voice) return;

        const voices = this.synth.getVoices();
        if (!voices.length) return;

        // Prefer professional/natural sounding English voices
        const preferredVoices = [
            'Microsoft Guy Online (Natural)',
            'David',
            'Daniel',
            'Alex'
        ];

        for (const name of preferredVoices) {
            const found = voices.find(v => v.name.includes(name));
            if (found) {
                this.voice = found;
                break;
            }
        }

        // Fallback to any English voice
        if (!this.voice) {
            this.voice = voices.find(v => v.lang.startsWith('en')) || voices[0];
        }

        if (this.voice) {
            this.isInitialized = true;
            console.log(`[TTS] Voice initialized: ${this.voice.name}`);
        }
    }

    /**
     * Speak the given text
     * @param {string} text - The text to speak
     * @param {Object} options - Speech options
     */
    speak(text, options = {}) {
        if (!this.synth) return;

        // Cancel any ongoing speech
        this.synth.cancel();

        // Clean text: remove emojis and handle abbreviations
        const cleanText = text
            .replace(/💰|🚀|😊|⚙️|📊|💰|🏭|📢|⚔️|🔬|🔒|🚚|🛠️|✨|🎁|👥|✋/g, '')
            .replace(/HQ/g, 'Headquarters')
            .replace(/HUD/g, 'H.U.D.')
            .replace(/RD/g, 'R and D')
            .replace(/CEO/g, 'C.E.O.');

        const utterance = new SpeechSynthesisUtterance(cleanText);

        if (this.voice) {
            utterance.voice = this.voice;
        }

        utterance.pitch = options.pitch || 1.0;
        utterance.rate = options.rate || 1.2; // Slightly slower for clarity
        utterance.volume = options.volume || 1.0;

        this.synth.speak(utterance);
    }

    stop() {
        if (this.synth) {
            this.synth.cancel();
        }
    }
}

export const tts = new TTSManager();
