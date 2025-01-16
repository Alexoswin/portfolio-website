import './nav.css';

function Nav(){
return(
    <nav class="navbar bg-body-tertiary fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Oswin Alex</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Oswin Alex</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li class="nav-item">
            <a class="nav-link "  href="https://github.com/Alexoswin">Github</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://www.linkedin.com/in/oswin-alex-727773260/">Linked in </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://leetcode.com/u/Alexoswin/">Leetcode </a>
          </li>
          <li class="nav-item">
          <a class="nav-link" href="Resume.pdf" target="_blank">Resume</a>

          </li>
         
        </ul>
        
      </div>
    </div>
  </div>
</nav>
)
}
    
export default Nav;