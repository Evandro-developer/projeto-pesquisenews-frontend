import React from "react";
import aboutImg from "../images/about_img.png";

function About() {
  return (
    <section className="about">
      <div className="about__container">
        <picture>
          <img className="about__img" src={aboutImg} alt="" />
        </picture>
        <div className="about__briefing">
          <h2 className="about__title">Sobre o autor</h2>
          <div className="about__paragrafh">
            <p className="about__text">
              Esse bloco descreve o autor do projeto. Aqui você deve indicar seu
              nome, o que você faz e quais tecnologias de desenvolvedor você
              conhece.
            </p>
            <p className="about__text">
              Você também pode falar sobre sua experiência com o Practicum, o
              que aprendeu lá e como pode ajudar clientes em potencial.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
