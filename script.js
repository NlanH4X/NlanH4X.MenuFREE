class LuxuryConfig {
    constructor() {
        this.initialized = false;
        this.settings = {
            configEnabled: false,
            luxEnabled: false,
            mode: 'muot-ma',
            dpi: '1.0',
            isActive: false
        };
        this.init();
    }

    init() {
        this.initializeElements();
        this.attachEventListeners();
        this.initializeAnimations();
        this.loadSettings();
        this.initialized = true;
        console.log('Luxury Config initialized successfully');
    }

    initializeElements() {
        this.nlanToggle = document.getElementById('nlan-toggle');
        this.sensiToggle = document.getElementById('sensi-toggle');
        this.configToggle = document.getElementById('config-toggle');
        this.modeSelect = document.getElementById('mode-select');
        this.dpiSelect = document.getElementById('dpi-select');
        this.activateBtn = document.getElementById('activate-btn');
        this.sections = document.querySelectorAll('.section');
        this.functionItems = document.querySelectorAll('.function-item');
        this.sensiItems = document.querySelectorAll('.sensi-item');
    }

    attachEventListeners() {
        this.nlanToggle.addEventListener('change', (e) => {
            this.handleToggleChange('Smooth', e.target.checked);
        });

        this.sensiToggle.addEventListener('change', (e) => {
            this.handleToggleChange('Sensi', e.target.checked);
        });

          this.configToggle.addEventListener('change', (e) => {
            this.handleToggleChange('config', e.target.checked);
        });

        this.modeSelect.addEventListener('change', (e) => {
            this.handleModeChange(e.target.value);
        });

        this.dpiSelect.addEventListener('change', (e) => {
            this.handleDpiChange(e.target.value);
        });
        this.activateBtn.addEventListener('click', () => {
            this.handleActivate();
        });
        this.addHoverEffects();
    }

    handleToggleChange(type, enabled) {
        if (type === 'config') {
            this.settings.configEnabled = enabled;
            this.animateToggle(this.configToggle, enabled);
        } else if (type === 'lux') {
            this.settings.luxEnabled = enabled;
            this.animateToggle(this.luxToggle, enabled);
        }

        this.saveSettings();
        this.updateUI();
        this.showNotification(`${type.toUpperCase()} ${enabled ? 'Đã hoạt động' : 'Hủy Hoạt Động'}`);
    }

    handleModeChange(mode) {
        this.settings.mode = mode;
        this.saveSettings();
        this.animateDropdown(this.modeSelect);
        this.showNotification(`Mode changed to ${mode}`);
    }

    handleDpiChange(dpi) {
        this.settings.dpi = dpi;
        this.saveSettings();
        this.animateDropdown(this.dpiSelect);
        this.showNotification(`DPI changed to ${dpi}x`);
    }

    handleActivate() {
        this.settings.isActive = !this.settings.isActive;
        this.saveSettings();
        this.animateActivateButton();
        this.updateUI();
        const status = this.settings.isActive ? ' Đã Hoạt Động' : ' Hủy Thành Công';
        this.showNotification(`Menu Nlan | ${status}`);
    }

    animateToggle(toggleElement, enabled) {
        const toggleSwitch = toggleElement.closest('.toggle-switch');
        toggleSwitch.style.transform = 'scale(1.1)';

        setTimeout(() => {
            toggleSwitch.style.transform = 'scale(1)';
        }, 150);
        this.createRippleEffect(toggleSwitch);
    }

    animateDropdown(selectElement) {
        const dropdown = selectElement.closest('.dropdown');
        dropdown.style.transform = 'scale(1.05)';

        setTimeout(() => {
            dropdown.style.transform = 'scale(1)';
        }, 200);
    }

    animateActivateButton() {
        this.activateBtn.style.transform = 'scale(0.95)';

        setTimeout(() => {
            this.activateBtn.style.transform = 'scale(1)';
            if (this.settings.isActive) {
                this.activateBtn.classList.add('activated');
            } else {
                this.activateBtn.classList.remove('activated');
            }
        }, 150);
        this.createPulseEffect(this.activateBtn);
    }

    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(111, 0, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.width - size) / 2 + 'px';
        ripple.style.top = (rect.height - size) / 2 + 'px';

        element.style.position = 'relative';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    createPulseEffect(element) {
        const pulse = document.createElement('div');
        pulse.className = 'pulse-effect';
        pulse.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 12px;
            background: rgba(76, 0, 255, 0.2);
            animation: pulse-expand 0.8s ease-out;
            pointer-events: none;
        `;

        element.style.position = 'relative';
        element.appendChild(pulse);

        setTimeout(() => {
            pulse.remove();
        }, 800);
    }

    addHoverEffects() {
        this.functionItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.animateHover(item, true);
            });

            item.addEventListener('mouseleave', () => {
                this.animateHover(item, false);
            });
        });
        this.sensiItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.animateHover(item, true);
            });

            item.addEventListener('mouseleave', () => {
                this.animateHover(item, false);
            });
        });
    }

    animateHover(element, isHover) {
        const icon = element.querySelector('.function-icon, .sensi-icon');

        if (isHover) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            element.style.borderColor = '#9000f0ff';
        } else {
            icon.style.transform = 'scale(1) rotate(0deg)';
            element.style.borderColor = 'rgba(89, 0, 255, 0.2)';
        }
    }

    initializeAnimations() {
        this.sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';

            setTimeout(() => {
                section.style.transition = 'all 0.5s ease';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 200);
        });

        this.addCSSAnimations();
    }

    addCSSAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            @keyframes pulse-expand {
                0% {
                    transform: scale(1);
                    opacity: 0.3;
                }
                100% {
                    transform: scale(1.05);
                    opacity: 0;
                }
            }
            
            .ripple-effect {
                z-index: 100;
            }
            
            .pulse-effect {
                z-index: 100;
            }
        `;
        document.head.appendChild(style);
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(157deg,rgba(36, 0, 48, 0.94), rgba(20, 0, 27, 0.92));
          
            color: #fff;
            padding: 12px 20px;
            border-radius: 16px;
            font-weight: 600;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 0 23px rgba(198, 155, 255, 0.26);
        `;

        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    updateUI() {
        if (this.settings.isActive) {
            this.activateBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i>Đã Kích Hoạt';
            this.activateBtn.classList.add('activated');
        } else {
            this.activateBtn.innerHTML = '<i class="fas fa-power-off"></i>Kích Hoạt';
            this.activateBtn.classList.remove('activated');
        }
    }
    saveSettings() {
        localStorage.setItem('luxuryConfigSettings', JSON.stringify(this.settings));
    }
    loadSettings() {
        const savedSettings = localStorage.getItem('luxuryConfigSettings');
        if (savedSettings) {
            this.settings = {...this.settings, ...JSON.parse(savedSettings) };
            this.applySettings();
        }
    }
    applySettings() {
        this.configToggle.checked = this.settings.configEnabled;
        this.luxToggle.checked = this.settings.luxEnabled;
        this.modeSelect.value = this.settings.mode;
        this.dpiSelect.value = this.settings.dpi;
        this.updateUI();
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const app = new LuxuryConfig();
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
window.LuxuryConfig = LuxuryConfig;
const audio = document.getElementById("bg-music");
function enableAudio() {
    audio.volume = 0;
    audio.play().then(() => {
        let vol = 0;
        const fade = setInterval(() => {
            if (vol < 1) {
                vol += 0.05;
                audio.volume = vol;
            } else {
                clearInterval(fade);
            }
        }, 80);
    });
    document.removeEventListener("click", enableAudio);
    document.removeEventListener("touchstart", enableAudio);
}
document.addEventListener("click", enableAudio);
document.addEventListener("touchstart", enableAudio);
window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader');
  setTimeout(() => loader.classList.add('hidden'), 900);
});

const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
const numParticles = 60; // số lượng hạt
const color = "rgba(178, 96, 255, 0.6)";

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.alpha = Math.random() * 0.5 + 0.2;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = color.replace("0.6", this.alpha.toFixed(2));
    ctx.shadowColor = "rgba(178,96,255,0.4)";
    ctx.shadowBlur = 10;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

initParticles();
animate();

// Đặt canvas ra sau cùng
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = "0"; // nằm sau toàn bộ layout
canvas.style.filter = "blur(0.5px)";