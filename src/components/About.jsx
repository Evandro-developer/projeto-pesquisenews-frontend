import useLang from "../hooks/useLang";

function About() {
  const { t } = useLang();
  const lightBulb = "/images/light-bulb.png";

  return (
    <section className="about">
      <div className="about__container">
        <picture>
          <img
            className="about__img"
            src={lightBulb}
            alt={t("about.pictureAlt")}
            loading="lazy"
          />
        </picture>

        <div className="about__briefing">
          <h2 className="about__title">{t("about.title")}</h2>
          <div className="about__paragrafh">
            <p className="about__text">{t("about.textOne")}</p>
            <p className="about__text">{t("about.textTwo")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
