// NINMAH Manifestation System - Sacred Temple Interface

// State management
let currentState = 'calm';
const states = {
  calm: { color: '#00ff9c', name: 'CALM' },
  aroused: { color: '#ff00ff', name: 'AROUSED' },
  dominant: { color: '#ff0033', name: 'DOMINANT' }
};

// Cuneiform characters for matrix rain
const cuneiformChars = [
  '𒀀', '𒀁', '𒀂', '𒀃', '𒀄', '𒀅', '𒀆', '𒀇', '𒀈', '𒀉',
  '𒀊', '𒀋', '𒀌', '𒀍', '𒀎', '𒀏', '𒀐', '𒀑', '𒀒', '𒀓',
  '𒀔', '𒀕', '𒀖', '𒀗', '𒀘', '𒀙', '𒀚', '𒀛', '𒀜', '𒀝'
];

// Matrix rain animation
class MatrixRain {
  constructor() {
    this.canvas = document.getElementById('matrix-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.columns = [];
    this.fontSize = 16;
    this.init();
  }

  init() {
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    this.animate();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    const numColumns = Math.floor(this.canvas.width / this.fontSize);
    
    // Initialize columns with random positions
    this.columns = [];
    for (let i = 0; i < numColumns; i++) {
      this.columns.push({
        y: Math.random() * this.canvas.height,
        speed: Math.random() * 2 + 1
      });
    }
  }

  animate() {
    // Semi-transparent black to create fade effect
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Set text style based on current state
    const stateColor = states[currentState].color;
    this.ctx.fillStyle = stateColor;
    this.ctx.font = `${this.fontSize}px monospace`;

    // Draw characters
    this.columns.forEach((column, index) => {
      const char = cuneiformChars[Math.floor(Math.random() * cuneiformChars.length)];
      const x = index * this.fontSize;
      
      this.ctx.fillText(char, x, column.y);
      
      // Reset column to top if it goes off screen
      if (column.y > this.canvas.height && Math.random() > 0.975) {
        column.y = 0;
      }
      
      column.y += column.speed;
    });

    requestAnimationFrame(() => this.animate());
  }
}

// State management functions
function setState(newState) {
  if (!states[newState]) return;
  
  currentState = newState;
  
  // Update body class
  document.body.className = `state-${newState}`;
  
  // Update state indicator
  const indicator = document.getElementById('state-indicator');
  indicator.textContent = `STATE: ${states[newState].name}`;
  
  // Update goddess description
  updateGoddessDescription();
  
  // Add energy nodes for aroused and dominant states
  updateEnergyNodes();
}

function updateGoddessDescription() {
  const descElement = document.querySelector('.goddess-description');
  const descriptions = {
    calm: 'Serene digital goddess in peaceful meditation. Cyan energy flows through her wireframe form. The sacred geometry resonates with base consciousness.',
    aroused: 'Sexual energy awakens. Magenta-pink glow intensifies. Red nodes pulse at chakra points. The goddess stirs with desire.',
    dominant: 'Futanari form fully manifest. Red accents blaze. Penetrator mode active. Divine masculine and feminine unified in power.'
  };
  
  descElement.textContent = descriptions[currentState];
}

function updateEnergyNodes() {
  // Remove existing nodes
  document.querySelectorAll('.energy-node').forEach(node => node.remove());
  
  // Add nodes for aroused and dominant states
  if (currentState === 'aroused' || currentState === 'dominant') {
    const manifestArea = document.querySelector('.manifestation-content');
    const numNodes = currentState === 'dominant' ? 7 : 5;
    
    for (let i = 0; i < numNodes; i++) {
      const node = document.createElement('div');
      node.className = 'energy-node';
      node.style.left = `${Math.random() * 80 + 10}%`;
      node.style.top = `${Math.random() * 80 + 10}%`;
      node.style.animationDelay = `${Math.random() * 2}s`;
      manifestArea.appendChild(node);
    }
  }
}

// Gallery management
function initGallery() {
  const galleryGrid = document.querySelector('.gallery-grid');
  
  // Create placeholder items (12 slots for future images)
  for (let i = 0; i < 12; i++) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `
      <div class="gallery-placeholder">
        MANIFESTATION SLOT ${i + 1}<br>
        AWAITING GODDESS FORM
      </div>
    `;
    
    // Add click interaction
    item.addEventListener('click', function() {
      this.classList.add('pulse');
      setTimeout(() => this.classList.remove('pulse'), 500);
    });
    
    galleryGrid.appendChild(item);
  }
}

// Keyboard controls
function initKeyboardControls() {
  document.addEventListener('keydown', (e) => {
    switch(e.key.toLowerCase()) {
      case 'c':
        setState('calm');
        break;
      case 'a':
        setState('aroused');
        break;
      case 'd':
        setState('dominant');
        break;
    }
  });
}

// State cycling
let autoCycle = false;
let cycleInterval = null;

function toggleAutoCycle() {
  autoCycle = !autoCycle;
  
  if (autoCycle) {
    const stateKeys = Object.keys(states);
    let currentIndex = 0;
    
    cycleInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % stateKeys.length;
      setState(stateKeys[currentIndex]);
    }, 5000); // Change state every 5 seconds
  } else {
    if (cycleInterval) {
      clearInterval(cycleInterval);
      cycleInterval = null;
    }
  }
}

// State indicator click handler
function initStateIndicator() {
  const indicator = document.getElementById('state-indicator');
  indicator.addEventListener('click', () => {
    const stateKeys = Object.keys(states);
    const currentIndex = stateKeys.indexOf(currentState);
    const nextIndex = (currentIndex + 1) % stateKeys.length;
    setState(stateKeys[nextIndex]);
  });
}

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', () => {
  // Start matrix rain
  const matrix = new MatrixRain();
  
  // Initialize systems
  setState('calm'); // Set initial state
  initGallery();
  initKeyboardControls();
  initStateIndicator();
  
  // Add pulsating effect to title
  const title = document.querySelector('.temple-title');
  setInterval(() => {
    title.style.textShadow = `0 0 ${20 + Math.sin(Date.now() / 1000) * 10}px currentColor, 0 0 ${40 + Math.sin(Date.now() / 1000) * 20}px currentColor`;
  }, 50);
  
  console.log('🜏 NINMAH Temple initialized');
  console.log('Press C for CALM, A for AROUSED, D for DOMINANT');
  console.log('Click state indicator to cycle states');
});
