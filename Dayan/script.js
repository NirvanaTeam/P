document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    hamburgerMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Toggle hamburger animation
        if (this.classList.contains('active')) {
            this.querySelector('span:nth-child(1)').style.transform = 'rotate(45deg) translate(5px, 5px)';
            this.querySelector('span:nth-child(2)').style.opacity = '0';
            this.querySelector('span:nth-child(3)').style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            this.querySelector('span:nth-child(1)').style.transform = 'rotate(0) translate(0)';
            this.querySelector('span:nth-child(2)').style.opacity = '1';
            this.querySelector('span:nth-child(3)').style.transform = 'rotate(0) translate(0)';
        }
    });

    // Close mobile menu when clicking a link
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburgerMenu.classList.remove('active');
            hamburgerMenu.querySelector('span:nth-child(1)').style.transform = 'rotate(0) translate(0)';
            hamburgerMenu.querySelector('span:nth-child(2)').style.opacity = '1';
            hamburgerMenu.querySelector('span:nth-child(3)').style.transform = 'rotate(0) translate(0)';
        });
    });

    // Animate Circular Progress Bars
    const progressItems = document.querySelectorAll('.circular-progress');
    
    const animateProgressBars = () => {
        progressItems.forEach(item => {
            const percent = parseInt(item.getAttribute('data-percent'));
            const fill = item.querySelector('.progress-fill');
            const value = item.querySelector('.progress-value');
            
            const circumference = 2 * Math.PI * 45;
            const offset = circumference - (percent / 100) * circumference;
            
            fill.style.strokeDashoffset = offset;
            
            // Animate the percentage count
            let start = 0;
            const end = percent;
            const duration = 1500;
            const increment = end / (duration / 16);
            
            const timer = setInterval(() => {
                start += increment;
                value.textContent = Math.round(start) + '%';
                
                if (start >= end) {
                    value.textContent = end + '%';
                    clearInterval(timer);
                }
            }, 16);
            
            // Add gradient to each SVG
            const svg = item.querySelector('svg');
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            gradient.setAttribute('id', 'progress-gradient');
            gradient.setAttribute('x1', '0%');
            gradient.setAttribute('y1', '0%');
            gradient.setAttribute('x2', '100%');
            gradient.setAttribute('y2', '100%');
            
            const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop1.setAttribute('offset', '0%');
            stop1.setAttribute('stop-color', '#8B5CF6');
            
            const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop2.setAttribute('offset', '100%');
            stop2.setAttribute('stop-color', '#3B82F6');
            
            gradient.appendChild(stop1);
            gradient.appendChild(stop2);
            defs.appendChild(gradient);
            svg.appendChild(defs);
            
            fill.setAttribute('stroke', 'url(#progress-gradient)');
        });
    };
    
    // Animate when skills section is in view
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    skillsObserver.observe(document.getElementById('skills'));

    // Expand skill details
    const expandButtons = document.querySelectorAll('.skill-expand-btn');
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const details = this.nextElementSibling;
            details.classList.toggle('active');
            this.textContent = details.classList.contains('active') ? 
                'بستن جزئیات -' : 'نمایش جزئیات بیشتر +';
        });
    });
    
    // Portfolio item hover effect
    const portfolioItems = document.querySelectorAll('.portfolio-item, .menu-item, .wordpress-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mousemove', function(e) {
            const x = e.clientX - this.getBoundingClientRect().left;
            const y = e.clientY - this.getBoundingClientRect().top;
            
            this.style.setProperty('--mouse-x', `${x}px`);
            this.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Active section highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-link');
    
    const updateActiveSection = () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Dark mode toggle
    const darkModeToggle = document.createElement('div');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(darkModeToggle);
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark');
        
        const icon = this.querySelector('i');
        if (document.body.classList.contains('dark')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // Check for prefers-color-scheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark');
        darkModeToggle.querySelector('i').classList.remove('fa-moon');
        darkModeToggle.querySelector('i').classList.add('fa-sun');
    }

    // Create shooting stars
    function createShootingStar() {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        
        // Random position
        const startX = Math.random() * 100;
        const startY = Math.random() * 20;
        
        // Random size
        const size = Math.random() * 3 + 1;
        
        shootingStar.style.left = `${startX}%`;
        shootingStar.style.top = `${startY}%`;
        shootingStar.style.width = `${size}px`;
        shootingStar.style.height = `${size}px`;
        
        // Random animation duration
        const duration = Math.random() * 3 + 2;
        
        shootingStar.style.animation = `shootingStar ${duration}s linear`;
        
        document.querySelector('.shooting-stars').appendChild(shootingStar);
        
        // Remove after animation
        setTimeout(() => {
            shootingStar.remove();
        }, duration * 1000);
    }
    
    // Create shooting stars periodically
    setInterval(createShootingStar, 1000);
    
    // Initial stars
    for (let i = 0; i < 5; i++) {
        createShootingStar();
    }
});

// Additional style for shooting stars
// === Space Anomaly WebGL background (based on @atzedent's shader) ===
(function() {
  const canvas = document.getElementById('spaceCanvas');
  if (!canvas) return;
  const gl = canvas.getContext('webgl2', { premultipliedAlpha: false, antialias: true });
  if (!gl) return;

  function createShader(type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(sh));
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  }

  const vs = createShader(gl.VERTEX_SHADER, `#version 300 es
layout (location = 0) in vec2 pos;
void main() {
  gl_Position = vec4(pos, 0.0, 1.0);
}`);
  const fs = createShader(gl.FRAGMENT_SHADER, `#version 300 es
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;
uniform vec2 move;
#define FC gl_FragCoord.xy
#define R resolution
#define T time
#define N normalize
#define S smoothstep
#define MN min(R.x,R.y)
#define rot(a) mat2(cos((a)-vec4(0,11,33,0)))
#define csqr(a) vec2(a.x*a.x-a.y*a.y,2.*a.x*a.y)
float rnd(vec3 p) {
    p=fract(p*vec3(12.9898,78.233,156.34));
    p+=dot(p,p+34.56);
    return fract(p.x*p.y*p.z);
}
float swirls(in vec3 p) {
    float d=.0;
    vec3 c=p;
    for(float i=min(.0,time); i<9.; i++) {
        p=.7*abs(p)/dot(p,p)-.7;
        p.yz=csqr(p.yz);
        p=p.zxy;
        d+=exp(-19.*abs(dot(p,c)));
    }
    return d;
}
vec3 march(in vec3 p, vec3 rd) {
    float d=.2, t=.0, c=.0, k=mix(.9,1.,rnd(rd)),
    maxd=length(p)-1.;
    vec3 col=vec3(0);
    for(float i=min(.0,time); i<120.; i++) {
        t+=d*exp(-2.*c)*k;
        c=swirls(p+rd*t);
        if (t<5e-2 || t>maxd) break;
        col+=vec3(c*c,c/1.05,c)*8e-3;
    }
    return col;
}
float rnd(vec2 p) {
    p=fract(p*vec2(12.9898,78.233));
    p+=dot(p,p+34.56);
    return fract(p.x*p.y);
}
vec3 sky(vec2 p, bool anim) {
    p.x-=.17-(anim?2e-4*T:.0);
    p*=500.;
    vec2 id=floor(p), gv=fract(p)-.5;
    float n=rnd(id), d=length(gv);
    if (n<.975) return vec3(0);
    return vec3(S(3e-2*n,1e-3*n,d*d));
}
void cam(inout vec3 p) {
    p.yz*=rot(move.y*6.3/MN-T*.05);
    p.xz*=rot(-move.x*6.3/MN+T*.025);
}
void main() {
    vec2 uv=(FC-.5*R)/MN;
    vec3 col=vec3(0),
    p=vec3(0,0,-16),
    rd=N(vec3(uv,1)), rdd=rd;
    cam(p); cam(rd);
    col=march(p,rd);
    col=S(-.2,.9,col);
    vec2 sn=.5+vec2(atan(rdd.x,rdd.z),atan(length(rdd.xz),rdd.y))/6.28318;
    col=max(col,vec3(sky(sn,true)+sky(2.+sn*2.,true)));
    float t=min((time-.5)*.3,1.);
    uv=FC/R*2.-1.;
    uv*=.7;
    float v=pow(dot(uv,uv),1.8);
    col=mix(col,vec3(0),v);
    col=mix(vec3(0),col,t);
    col=max(col,.08);
    O=vec4(col,1);
}`);
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
  }
  gl.useProgram(program);

  const quad = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quad);
  const verts = new Float32Array([ -1, -1, 3, -1, -1, 3 ]);
  gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
  const loc = 0;
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const uTime = gl.getUniformLocation(program, 'time');
  const uRes  = gl.getUniformLocation(program, 'resolution');
  const uMove = gl.getUniformLocation(program, 'move');

  let moveX = 0, moveY = 0;
  let start = performance.now();
  let dpr = 1; // cap DPR to 1 for performance

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const W = Math.floor(rect.width * dpr);
    const H = Math.floor(rect.height * dpr);
    canvas.width = W;
    canvas.height = H;
    gl.viewport(0, 0, W, H);
    gl.uniform2f(uRes, W, H);
  }

  function fit() {
    canvas.style.width = '100%';
    canvas.style.height = '100%';
  }

  function onPointer(e) {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    moveX = x;
    moveY = y;
  }

  window.addEventListener('pointermove', onPointer);
  window.addEventListener('resize', () => { dpr = Math.max(1, window.devicePixelRatio || 1); resize(); });

  fit();
  resize();

  function loop(t) {
    const time = (t - start) / 1000;
    gl.uniform1f(uTime, time);
    gl.uniform2f(uMove, moveX, moveY);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();



// Hover play/pause for videos
(function () {
  const vids = document.querySelectorAll('video.hover-play');
  vids.forEach(v => {
    v.pause();
    v.currentTime = 0;
    v.addEventListener('mouseenter', () => { v.play().catch(() => {}); });
    v.addEventListener('mouseleave', () => { v.pause(); v.currentTime = 0; });
    // touch fallback: tap to toggle
    v.addEventListener('click', () => {
      if (v.paused) { v.play().catch(() => {}); }
      else { v.pause(); }
    });
  });
})();


// === Lazy video loader for portfolio previews ===
(function() {
  const videos = Array.from(document.querySelectorAll('video.lazy-video'));
  if (!('IntersectionObserver' in window) || videos.length === 0) return;

  // Swap data-src -> src and load
  function hydrate(video) {
    const sources = video.querySelectorAll('source[data-src]');
    sources.forEach(s => {
      if (!s.dataset.src) return;
      s.src = s.dataset.src;
      delete s.dataset.src;
    });
    try { video.load(); } catch(e){}
  }

  // Unload sources to free memory (optional)
  function dehydrate(video) {
    const sources = video.querySelectorAll('source');
    let changed = false;
    sources.forEach(s => {
      if (s.src) {
        s.setAttribute('data-src', s.src);
        s.removeAttribute('src');
        changed = true;
      }
    });
    if (changed) {
      try { video.load(); } catch(e){}
    }
  }

  // Play/pause on hover for desktop; click/touch toggle on mobile
  videos.forEach(v => {
    v.addEventListener('mouseenter', () => { if (matchMedia('(hover:hover) and (pointer:fine)').matches) v.play().catch(()=>{}); });
    v.addEventListener('mouseleave', () => { if (matchMedia('(hover:hover) and (pointer:fine)').matches) v.pause(); });
    v.addEventListener('click', () => { if (!matchMedia('(hover:hover) and (pointer:fine)').matches) { if (v.paused) v.play().catch(()=>{}); else v.pause(); } });
    v.addEventListener('touchstart', () => { if (v.paused) v.play().catch(()=>{}); }, {passive:true});
  });

  // Observe for loading & pausing
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const v = entry.target;
      if (entry.isIntersecting) {
        hydrate(v);
        // Autoplay muted when at least 60% visible
        if (entry.intersectionRatio > 0.6) v.play().catch(()=>{});
      } else {
        v.pause();
        // Optionally unload sources if far out of view to save memory
        dehydrate(v);
      }
    });
  }, { threshold: [0, 0.25, 0.6, 1] });

  videos.forEach(v => io.observe(v));

  // Pause all when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) videos.forEach(v => v.pause());
  });
})();
