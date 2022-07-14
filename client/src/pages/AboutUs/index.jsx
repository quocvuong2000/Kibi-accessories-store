import React from "react";
import s from "./styles.module.scss";
import about from "../../assets/aboutus/about.jpg";
import TitleAbout from "./Title";

const AboutUs = () => {
  return (
    <div className={s.container}>
      <div className={s.image_feature}>
        <img src={about} alt="" />
        <div className={s.all}>
          <h2 className={s.desc}>
            <p className={s.linkToBlog}>
              Ematelier Introduces Elements Watch Collection Of Unique
              Grand-Feu, Mirror-Polished Enamel Dials
            </p>
          </h2>
        </div>
      </div>
      <br />
      <br />
      <div className={s.content}>
        <p className={`${s.normal_text} ${s.mt_40}`}>
          Kibi is the face of wrist-watch enthusiast publications on the
          internet. Since 2022, Kibi has been educating and connecting watch
          lovers and buyers with the most interesting and novel watches of our
          times.
        </p>
        <br />
        <p className={s.normal_text}>
          A trade publication as well as a consumer resource, Kibi, prides
          itself on connecting a diverse cross-section of society from all
          regions of the globe. Together the Kibi audience community members
          join their unique tastes, cultures, backgrounds, preferences,
          lifestyles, and histories from all walks of life with an appreciation
          of the wearable tool machines we call watches.
        </p>
        <br />
        <p className={s.normal_text}>
          The people who make Kibi possible each agree that watches are a
          bastion of intellectual interest, status validation, artistic beauty,
          and fashionable self-expression. There is no one reason why people
          like watches, with manifests itself in the beautiful reality that such
          a diverse variety of watches exist. Kibi serves to help identify and
          celebrate the best of them, while showcasing the latest watches coming
          to marketing from big name brands, to boutique one-person operations.
        </p>
        <br />
        <div className={s.manifesto}>
          <TitleAbout title="manifesto" />
          <br />
          <p className={s.normal_text}>
            Kibi represents the needs and interests of consumers, while
            operating as a for-profit independent media organization. Kibi staff
            members value the principles of honesty and justice in
            communication, but are not always acting strictly as journalists.
            Kibi is an editorial publication that shares the opinions of its
            various writers. Our hope isn’t that you agree with our opinions,
            but that if you understand the reasons for our opinions, you’ll be
            able to identify whether or not you agree with us. <br />
            Our promise to the Kibi audience community is that we will never
            forget our primary loyalty is to watch owners just like us. We
            further promise to take responsibility for our actions, and to
            promote transparency and accountability when and if the occasion
            calls for it.
          </p>
          <br /> <br />
        </div>

        <div className={s.manifesto}>
          <TitleAbout title="by the numbers" />
          <br />
          <p className={s.normal_text}>
            It’s all how we’ve grown to become a segment leader with the highest
            traffic for any timepiece devoted website; we’re a trusted voice in
            the watch aficionado circles the world over, and we welcome you. If
            you are wondering who we really work for, our audience or the watch
            brands, you can see our clear answer and our editorial policies.
          </p>
          <br />
          <div className={s.statistical}>
            <div className={s.one_content}>
              <p>3</p>
              <p>Months in Business</p>
            </div>
            <div className={s.one_content}>
              <p>001</p>
              <p>Countries Represented</p>
            </div>
            <div className={s.one_content}>
              <p>10,000K</p>
              <p>Comments by Community</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
