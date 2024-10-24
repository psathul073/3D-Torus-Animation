
document.addEventListener("DOMContentLoaded", () => {
    // Get the canvas Element From DOM.
    const canvas = document.querySelector("#myCanvas");

    // Set Canvas Height And Width.
    canvas.style.height = "100vh";
    canvas.style.width = "100vw";

    // Set New Width Height.
    canvas.height = canvas.clientHeight;
    canvas.width = canvas.clientWidth;
    // To Draw The Canvas.
    const ctx = canvas.getContext("2d");

    // Add Linear Gradient Color In Particles.
    let particleGradient = ctx.createLinearGradient(0, 0, canvas.clientWidth, 0);
    particleGradient.addColorStop(0, "red" );
    particleGradient.addColorStop(1, "blue" );

    // Make Our Render Canvas Sharper And Small On Loading.
         // If Our Current Device Pixel Ratio Over 1.
         if (window.devicePixelRatio > 1) {
            canvas.width = canvas.clientWidth * 2;
            canvas.height = canvas.clientHeight * 2;
            // Normalize Coordinate.
            ctx.scale(2, 2);
        }

    // Get Exact Canvas dimensions.
    // Exact Canvas Width.
    let width = canvas.offsetWidth;
    // Exact Canvas Height.
    let height = canvas.offsetHeight;
    // Particles Storing Space.
    let dots = [];
    // console.log(dots);

    // No Of Particles Calculate On Windows Size.
    let maxParticles = 1000;
        // maxParticles = Math.min(width, height);
    // X Center Of Canvas.
    let xCenter = width / 2;
    // Y Center of Canvas.
    let yCenter = height / 2;
     // The View Field Of 3D Object.
    let perspectiveView = width * 0.6;
    // Particles Radius.
    let particleRadius = 3;
    // Glob Radius, Based On The Canvas Width.
    let torusRadius = width / 2;
    

        // Create Particles Using Class Constructor.
        class Dots {
            // Add Particle Properties In 3D,2D Space.
            constructor(){
                // Generate Random PI Values.
                 // Random Value [0-2Pi].
                 this.theta = Math.random() * 2 * Math.PI;
                 // Random Value [0-Pi].
                 this.phi = Math.acos(Math.random() * 2 -1); // Math.acos(-1) returns PI.

                // In 3D World X, Y, Z Coordinates.
                // Particles X-axis Coordinates.
                this.x = 0;
                // Particles Y-axis Coordinates.
                this.y = 0;
                // Particles Z-axis Coordinates.
                this.z = 0;
    
                // In 2D World.
                // X-axis  Coordinates.
                this.xParticle = 0;
                // Y-axis Coordinates.
                this.yParticle = 0;
                // Scale Of The Particles.
                this.scaleParticle = 0;
    
                // Animations
                gsap.to(this, {
                    duration:  (Math.random() * 10 + 20),
                    theta: this.theta + Math.PI * 2,
                    repeat: -1 ,
                    ease: "none",
                  });
    
            }
            // 3D To 2D Particles Convert.
            particles2D(){
                // In 3D World X, Y, Z Coordinates.
                this.x = torusRadius * Math.sin(this.phi) * Math.cos(this.theta);
                this.y = torusRadius * Math.cos(this.phi) * Math.sin(this.phi); // To Create Torus.
                // this.y = torusRadius * Math.cos(this.phi) ; // To Create Globe.
                // this.y = torusRadius * Math.cos(this.phi) * Math.sin(this.theta); // To Create Cube.
                this.z = torusRadius * Math.sin(this.phi) * Math.sin(this.theta) + torusRadius;

                // To Store Scale of Particle, Based On Camera Angle Distances.
                this.scaleParticle = perspectiveView / (perspectiveView + this.z);
                // Particle X-axis Position In 2D.
                this.xParticle = (this.x * this.scaleParticle) + xCenter;
                // Particle Y-axis Position In 2D.
                this.yParticle = (this.y * this.scaleParticle) + yCenter;
            }
            // Draw Dot Particles.
            drawDots(){
                // Calculate Particles Value Of Dotes.
                this.particles2D();
                // Set Transparency Value Of Our Particles Based On The Distance.
                // Draw A Circles.
                ctx.beginPath();
                // The arc $fun Has Five Parameters (X, Y, Radius, Angle Start, Angle End). 
                ctx.arc(this.xParticle, this.yParticle, particleRadius * this.scaleParticle, 0, 2 * Math.PI)
                ctx.globalAlpha = Math.abs(1 - this.z / width);
                // Set Particles Color.
                ctx.fillStyle = particleGradient;
                ctx.closePath();
                ctx.fill();
            }
        }
    
        // Create Multiple Dotes Particles $fun
        function createParticles() {
            dots.length = 0;
            for (let i = 0; i < maxParticles; i++) {
                // Create A New Dots Particles And Push Into Arrays.
                dots.push( new Dots());
            }
        }
        // Particles Rendering $fun.
        function particlesRender() {
            // Clear The Canvas.
            ctx.clearRect( 0, 0, width, height);
            // Draw Every Dot Particles To Using For Loop.
            for (let i = 0; i < dots.length; i++) {
                dots[i].drawDots();
                
            }
    
             // Request Animation.
          window.requestAnimationFrame(particlesRender);
        }


    // Canvas Window Size Maintain $Fun.
    function afterResizeWindow() {

         // Define New Exact Canvas Width.
         width = canvas.offsetWidth;
        //  console.log(width);
          // Define New Exact Canvas Height.
          height = canvas.offsetHeight;
        //   console.log(height);
         // Make Our Render Canvas Sharper And Small.
         // If Our Current Device Pixel Ratio Over 1.
         if (window.devicePixelRatio > 1) {
            canvas.width = canvas.clientWidth * 2;
            //  console.log(canvas.width);
             canvas.height = canvas.clientHeight * 2;
            //  console.log(canvas.height);
             // Normalize Coordinate.
             ctx.scale(2,2);
         }
         else{
            // Default Height And Width.
             canvas.width = width;
             canvas.height = height;
         }
         //  Update Particle Positions On Window Resize.
         xCenter = width / 2;
         yCenter = height / 2;
         perspectiveView = width * 0.6;
         torusRadius = width / 2;

        //  Update Particle Quantity On Window Resize.
         maxParticles = 1000;
         // maxParticles = Math.min(width, height);

        //  Update Particle Gradient Color On Window Resize.
         particleGradient = ctx.createLinearGradient(0, 0, canvas.clientWidth, 0);
         particleGradient.addColorStop(0, "red" );
         particleGradient.addColorStop(1, "blue" );
        //  Call new Particles After Resize The Windows.
         createParticles();
    }
    
    // Set Timeout $fun On Window Resize.
    // Store Timeout When Window is Resize.
    let windowResizeTimeout;
    function onResize() {
      windowResizeTimeout =  window.clearTimeout(windowResizeTimeout);
    // Call A Canvas Window Size Maintain $Fun.
       windowResizeTimeout = window.setTimeout(afterResizeWindow, 300);
    }
    // On Loading...
    // Listen Window Resize Event And Call A onResize $Fun.
    window.addEventListener("resize", onResize);
    //  Create Particles In Window Load.
    createParticles();
     // Request Animation.
   window.requestAnimationFrame(particlesRender);

}); 