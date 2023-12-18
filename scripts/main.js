
let scene, camera, renderer, stars, starGeo;
    
function animate() {
        starGeo.vertices.forEach(p => {
          p.velocity += p.acceleration
          p.y -= p.velocity;
          
          if (p.y < -200) {
            p.y = 200;
            p.velocity = 0;
          }
        });
        starGeo.verticesNeedUpdate = true;
        stars.rotation.y +=0.002;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
}
function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
}
function init() {

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.z = 1;
      camera.rotation.x = Math.PI/2;

      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.querySelector("main").appendChild(renderer.domElement);
      starGeo = new THREE.Geometry();
      for(let i=0;i<6000;i++) {
        star = new THREE.Vector3(
          Math.random() * 600 - 300,
          Math.random() * 600 - 300,
          Math.random() * 600 - 300
        );
        star.velocity = 0;
        star.acceleration = 0.02;
        starGeo.vertices.push(star);
      }

      let sprite = new THREE.TextureLoader().load( 'images/star.png' );
      let starMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.7,
        map: sprite
      });

      stars = new THREE.Points(starGeo,starMaterial);
      scene.add(stars);

      window.addEventListener("resize", onWindowResize, false);

      animate(); 
    }

    const handleMouseMove = event => {
    
          const eyes = document.getElementsByClassName('eye')
    
          for (let eye of eyes) {
                 const x = eye.getBoundingClientRect().left + 10;
                 const y = eye.getBoundingClientRect().top + 10;
                 const rad = Math.atan2(event.pageX - x, event.pageY - y);
                 const rot = (rad * (180 / Math.PI) * -1) + 180;
          
                 eye.style.transform = `rotate(${rot}deg)`;
              }
      }
  
    async function handleLangChange() {
      switch (this.checked) {
        case true:
          Array.from(document.getElementsByClassName("eng")).forEach(elem => elem.classList.add("hidden"));
          Array.from(document.getElementsByClassName("fr")).forEach(elem => elem.classList.remove("hidden"));
          break;

        case false:
          Array.from(document.getElementsByClassName("fr")).forEach(elem => elem.classList.add("hidden"));
          Array.from(document.getElementsByClassName("eng")).forEach(elem => elem.classList.remove("hidden"));
          break;
      }
    }
      window.addEventListener("load", init, false);

      document.addEventListener("DOMContentLoaded",function(){
      handleLangChange();
      document.addEventListener("mousemove", event => handleMouseMove(event));
       let langToggle = document.getElementById("langToggle");
       langToggle.addEventListener("change", handleLangChange);});