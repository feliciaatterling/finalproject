// Component for our contacts page
import "bootstrap/dist/css/bootstrap.css";
import felicia from "./Images/felicia.jpg";
import brayden from "./Images/profilepicture.jpg";

function Contact() {
  // FAQS
  const FAQ = () => {
    return (
      <div class="container">
        <h2>FAQ</h2>
        <p>
          <strong>What is this website for?</strong> <br />
          This website was developed as a final project for a class at Iowa
          State University.
        </p>
        <p>
          <strong>What class was this website developed for?</strong> <br />
          SE/ComS319 Construction of User Interfaces, Spring 2024
        </p>
        <p>
          <strong>When was this project made?</strong> <br />
          The website was finished on May 5th, 2024
        </p>
        <p>
          <strong>By who this project made?</strong> <br />
          Brayden Atkinson and Felicia Atterling
        </p>
        <p>
          <strong>Who was the instructors for this class?</strong> <br />
          Dr. Abraham N. Aldaco Gastelum and Dr. Ali Jannesari
        </p>
      </div>
    );
  };
  // How to Contact
  const Contact = () => {
    return (
      <div class="container">
        <h2>How to Contact</h2>
        <p>
          <strong>Contact Brayden</strong> <br />
          bma2026@iastate.edu
        </p>
        <p>
          <strong>Contact Felicia</strong> <br />
          feliciaa@iastate.edu
        </p>
        <p>
          <strong>Contact Instructors</strong> <br />
          Abraham Aldaco: aaldaco@iastate.edu <br />
          Ali Jannesari: jannesar@iastate.edu
        </p>
      </div>
    );
  };
  // Student info
  const StudentInfo = () => {
    return (
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="card shadow-sm" style={{ width: 350 }}>
              <img src={brayden} class="card-img-top" alt="picture" />
              <div class="card-body">
                <h3>Brayden Atkinson</h3>
                <p class="card-text">
                  Software Engineer
                  <br />
                </p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card shadow-sm" style={{ width: 350 }}>
              <img
                src={felicia}
                class="card-img-top"
                alt="picture"
                height="265px"
              />
              <div class="card-body">
                <h3>Felicia Atterling</h3>
                <p class="card-text">
                  I am an exchange student from Sweden staying at ISU in the
                  spring of 2024.
                  <br />
                  Back home I am currently in my first year of master in
                  Interactive Media Techonolgy, <br />
                  but here I am majoring in Computer Science.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1>Contact</h1>
      <div class="row">
        <div class="col">
          <FAQ />
        </div>
        <div class="col">
          <Contact />
        </div>
      </div>
      <StudentInfo />
    </div>
  );
}

export default Contact;
