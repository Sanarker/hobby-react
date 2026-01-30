/**
 * SoundManager Utility
 * Provides synthesized sound effects inspired by Genshin Impact UI.
 * Uses Web Audio API to avoid external asset dependencies.
 */

class SoundManager {
    private ctx: AudioContext | null = null;

    private init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playClick() {
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.1);
    }

    playWish() {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        
        // Iconic twinkle chime
        const playTink = (freq: number, delay: number) => {
            const osc = this.ctx!.createOscillator();
            const gain = this.ctx!.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + delay);
            gain.gain.setValueAtTime(0, now + delay);
            gain.gain.linearRampToValueAtTime(0.1, now + delay + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.5);
            osc.connect(gain);
            gain.connect(this.ctx!.destination);
            osc.start(now + delay);
            osc.stop(now + delay + 0.5);
        };

        [1046.50, 1318.51, 1567.98, 2093.00].forEach((f, i) => playTink(f, i * 0.1));
    }

    playBurst() {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const duration = 1.5;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(55, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + duration);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(100, now);
        filter.frequency.exponentialRampToValueAtTime(2000, now + 0.5);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(now + duration);
    }
}

export const soundManager = new SoundManager();
