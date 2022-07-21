import emailjs from "@emailjs/browser";
import { message } from "antd";
const sendEmail = (
  email,
  status,
  id,
  product,
  price,
  shippingcost,
  totalprice,
  recipientname,
  recipientphone
) => {
  emailjs
    .send(
      "service_svd0vh6",
      "template_wq78g1r",
      {
        to_name: email,
        status: status,
        id: id,
        product: product,
        price: price,
        shippingcost: shippingcost,
        totalprice: totalprice,
        recipientname: recipientname,
        recipientphone: recipientphone,
      },
      "KGyIBN8FPg7Pa63NP"
    )
    .then(
      (res) => {
        console.log(res);
        if (res.status === 200) {
          // message.success("Send email successful");
        }
      },
      (error) => {
        console.log(error);
      }
    )
    .catch((err) => console.log(err));
};

export default sendEmail;
