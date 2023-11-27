import React from "react";

function About() {
  // Diretamente use o caminho para a imagem a partir do root
  const lightBulb = "/images/light-bulb.png";

  return (
    <section className="about">
      <div className="about__container">
        <picture>
          <img
            className="about__img"
            src={lightBulb}
            alt="Lâmpada representando ideias"
          />
        </picture>
        <div className="about__briefing">
          <h2 className="about__title">Sobre o autor</h2>
          <div className="about__paragrafh">
            <p className="about__text">
              Evandro M Oliveira - Desenvolvedor Web em Node.js, Express e
              React. Avançando em Ciência de Dados e Design UI/UX.
            </p>
            <p className="about__text">
              Desenvolvi "PesquiseNews" do back-end ao front-end, hospedado na
              Google Cloud. Transformo visões em realidade digital.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
