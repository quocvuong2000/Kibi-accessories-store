import React, { useEffect } from "react";
import s from "./styles.module.scss";
import { Collapse } from "antd";
const { Panel } = Collapse;
const Legal = () => {
  const onChange = (key) => {};
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={s.container}>
      <p className={s.title}>Legal</p>
      <Collapse defaultActiveKey={["1"]} onChange={onChange}>
        <Panel
          header="IMPORTANT: READ THE INFORMATION BELOW TERMS AND CONDITIONS OF USE AND ACCESS OUR RELATIONSHIP CONTENT"
          key="1"
        >
          <p>
            By accessing this content you agree that all the information on this
            site is not intended to be the final word on any topic, or
            conclusively fact. You are not to rely on any specific facts,
            numbers, prices, dimensions, or otherwise as they are subject to
            change or clarification. Information is provided is true according
            to the individual author’s best knowledge. In the event that any
            information is false or misleading, you are agree not to hold the
            ABLOGTOWATCH.COM, its owners, authors, or contributors liable for
            any types of damages whatsoever.
          </p>
        </Panel>
        <Panel header="DMCA NOTICE" key="2">
          <p>
            In the event you feel that any content on this page is in violation
            of a copyright you hold or are authorized to protect, you may
            contact Ariel Adams at: ariel(at)ablogtowatch(dot)com in compliance
            of the notice and take down provision of the DMCA.
          </p>
        </Panel>
        <Panel header="RESTRICTIONS ON USE" key="3">
          <p>
            IMPORTANT! THESE TERMS OF USE GOVERN YOUR USE OF THIS SITE, WHICH IS
            OWNED AND PROVIDED BY ABLOGTOWATCH.COM (ABLOGTOWATCH). BY ACCESSING
            THIS SITE, YOU ARE INDICATING YOUR ACKNOWLEDGMENT AND ACCEPTANCE OF
            THESE TERMS OF USE. THESE TERMS OF USE ARE SUBJECT TO CHANGE BY
            ABLOGTOWATCH.COM AT ANY TIME IN ITS DISCRETION. YOUR USE OF THIS
            SITE AFTER SUCH CHANGES ARE IMPLEMENTED CONSTITUTES YOUR
            ACKNOWLEDGMENT AND ACCEPTANCE OF THE CHANGES. PLEASE CONSULT THESE
            TERMS OF USE REGULARLY. You have a nonexclusive, nontransferable,
            limited, revocable right to use this site solely for informational,
            educational or other non-commercial purposes. You will not use this
            site for any commercial purpose whatsoever without the express prior
            written consent of ABLOGTOWATCH.COM. You will not (and will not
            authorize any other party to) (i) co brand this site or any portion
            thereof, or (ii) frame this site or any portion thereof, or (iii)
            link to this site or any portion thereof from any commercial site or
            for any commercial purpose, in any such case without the express
            prior written permission of an authorized representative of
            ABLOGTOWATCH.COM. (For purposes of these Terms of Use, “co branding”
            means to display a name, logo, trademark, or other means of
            attribution or identification of any party in such a manner as is
            reasonably likely to give a user the impression that such other
            party has the right to display, publish, or distribute the site or
            content accessible within the site.) Notwithstanding the foregoing,
            you may link to this site from a commercial site or for a commercial
            purpose solely to provide general information regarding the subject
            matter of this site, so long as such linking does not result in a
            significant increase in the bandwidth used to transmit information
            from this site. You agree to cooperate with ABLOGTOWATCH.COM in
            causing any unauthorized co-branding, framing or linking immediately
            to cease
          </p>
        </Panel>
        <Panel header="PRIVACY POLICY" key="4">
          <p>
            Third Party Advertiser Cookies and Web Beacons. ABLOGTOWATCH.COM may
            participate in any number of third-party media serving partners.
            Their content may be subject to additional or different policies. A
            “cookie” is a small amount of data, which often includes an
            anonymous unique identifier that is sent to your browser from a web
            site’s computers and stored on your computer’s hard drive. Cookies
            can be used to target advertisements relevant to your interests,
            based on your visits to different Web sites, to provide traffic
            measurement and other analytics and to conduct research. A “Web
            beacon” is an electronic file on a web page that allows a web site
            to count users who have visited that page, to access certain cookies
            and to provide auditing, research and reporting for advertisers.
            When your browser requests a page that displays advertising from one
            of the Advertisers, the Advertiser may view, edit or set its own
            cookie through your browser. In addition, the Advertiser may place
            its own Web beacon in the page, which may be triggered by your
            browser’s request.
          </p>
        </Panel>
        <Panel header="ADVERTISER PRIVACY POLICIES" key="5">
          <p>
            If you would like to contact the Advertisers to learn more about
            their privacy policies and what options (if any) they offer to opt
            out of their data collection and use, please follow these links to
            their Web sites: Some of these third party advertising networks are
            participants in the Network Advertising Initiative (“NAI”), a
            cooperative of online marketing and analytics companies committed to
            building consumer awareness and establishing responsible business
            and data management practices and standards. You can learn more
            about NAI and how you may “opt out” of targeted advertising
            delivered by NAI member ad networks here.
          </p>
        </Panel>
        <Panel header="THEFT OF CONTENT OR BANDWIDTH" key="6">
          <p>
            All content on this site is copyright by ABLOGTOWATCH.COM or a
            contributor who has granted permission to this site for its use
            here. Copying this material for use on other web sites without the
            permission of ABLOGTOWATCH.COM or the copyright holder is illegal
            theft of content. Linking to images on this site for use in other
            web sites — especially for postings in high volume auction sites —
            is strictly prohibited. This is considered illegal theft of
            bandwidth and will be pursued through the auction services and ISPs
            used as part of this theft.
          </p>
        </Panel>
      </Collapse>
    </div>
  );
};
export default Legal;
