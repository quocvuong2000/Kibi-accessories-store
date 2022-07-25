function templateEmail(content, email) {
  var zz = `
  <!DOCTYPE html>
  <html>
  <head>
  <style type="text/css">
*,
::after,
::before {
  box-sizing: border-box;
}
​
body {
  padding: 0px;
  margin: 0px;
  background-color: #ffffff;
}
​
body,
table {
  font-family: "Roboto", sans-serif !important;
  font-size: 14px;
  color: #333333;
  line-height: 1.42857143;
}
​
table {
  border-collapse: collapse;
  width: 100%;
}
​
td {
  padding: 0;
  font-family: "Roboto", sans-serif !important;
}
​
img {
  max-width: 100%;
  height: auto;
}
​
h2 {
  font-weight: normal;
  margin-top: 0px;
  margin-bottom: 17px;
}
​
.title-form {
  font-size: 24px;
  color: #003d75;
  text-transform: uppercase;
  font-weight: bold;
}
​
.name {
  color: #5a5a5a ;
  font-size: 27.34px ;
  font-weight: 700;
}
​
.text {
  font-size: 18px;
  font-weight: 300;
  color: #5a5a5a;
}
​
.text-blue {
  color: #003d75;
  font-size: 14px;
}
​
.italic {
  font-style: italic;
}
​
.link {
  color: #0000ff;
  cursor: pointer;
}
​
.line {
  width: 30%;
  height: 1px;
  background-color: #dddddd;
  display: inline-block;
}
​
.email {
  border: 1px solid #333333;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  max-width: 450px;
  padding: 10px 15px;
  color: #333333;
  font-weight: 300;
  overflow: hidden;
  text-overflow: ellipsis;
}
​
.signing {
  font-size: 20px;
  border: 1px solid #003d75;
  background: #003d75;
  padding: 12px 25px 12px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  color: #ffffff;
  display: inline-block;
  line-height: 1.1;
  text-align: center;
  text-decoration: none;
  margin-bottom: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
}
​
.signing:hover {
  background: #003d75;
}
​
.pin-code {
  font-size: 17.5px;
  color: #5a5a5a;
  font-style: italic;
  font-weight: 400;
  text-align: center;
  margin-bottom: 5px;
}
​
.code {
  font-size: 34.18px;
  font-weight: 700;
  letter-spacing: 0.6em;
  text-align: center;
  text-indent: 0.9em;
  color: #5a5a5a;
}
​
.text-desc {
  font-size: 17.5px;
  line-height: 21px;
}
​
.text-explain-question {
  font-size: 11.2px;
  font-weight: 500;
}
​
.text-explain {
  font-size: 11.2px;
  line-height: 14px;
}
</style>
</head>
<body>
<p>​</p>
<table style="width: 100%; max-width: 450px; margin: auto auto; border-collapse: unset;">
<tbody>
<tr>
<td style="height: 30px;">&nbsp;</td>
</tr>
<tr>
<td>
<table style="border: 1px solid #dddddd; border-radius: 5px; border-collapse: unset;">
<tbody>
<tr>
<td style="padding: 20px;">
<table>
<tbody>
<tr style="text-align: center;">
<td style="padding-bottom: 10px;"><button style="background: #d84727; border: none; color: white; padding: 10px 40px; border-radius: 7px;"> KIBI </button></td>
</tr>
<tr>
<td style="padding-bottom: 10px;">&nbsp;</td>
</tr>
<tr>
</tr>
<tr>
<td style="padding-bottom: 15px;">
<div class="text text-desc" style="margin-bottom: 10px;">
${content}
<tr style="border-top: 0.5px solid #dcdedf;">
<td>
<div style="padding-top: 5px;">
<p style="color: #5a5a5a; font-weight: 500; font-size: 13px;">Need support ?</p>
</div>
</td>
</tr>
<tr>
<td>
<div style="padding-top: 10px; padding-bottom: 9px; font-weight: 300; font-size: 12px;">Feel free to email us if you have any questions, comments or suggestions. We&rsquo;ll be happy to resolve your issues.</div>
</td>
</tr>
<tr>
<td style="/*  */                          font-size: 12px; font-weight: 300; color: #989898;">Question? Email us at <a style="font-style: normal; text-decoration: none;" href="mailto:support@kibi.vn">support@kibi.vn</a></td>
</tr>
<tr>
<td style="font-size: 12px; font-weight: 300; color: #989898;">If u dont want receive new news from us.<a style="font-style: normal; text-decoration: none;" href="http://localhost:5000/api/subscribe/del/${email}">Unsubcribe</a></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td style="height: 30px;">&nbsp;</td>
</tr>
</tbody>
</table> </body></html>`;
  return zz;
}

module.exports = { templateEmail };
