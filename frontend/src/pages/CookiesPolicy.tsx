import classes from "./CookiesPolicy.module.css";
import Table from "react-bootstrap/Table";
import React from "react";


const CookiesPolicy = () => {
  return (
    <div className={classes.title}>
      <h1>Cookies</h1>
      <p>Cookies are small files saved on your computer, tablet or phone when you visit a website.</p>
      <p>This site use only essential cookies.</p>

      <h2>Essential cookies</h2>
      <p>Essential cookies keep information needed for your security. We do not need to ask permission to use them.</p>
      <Table className={classes.table}>
        <thead>
        <tr>
          <th>Name</th>
          <th>Purpose</th>
          <th>Expires</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>csrftoken</td>
          <td>Needed to prevent Cross-Site Request Forgery</td>
          <td>1 year</td>
        </tr>
        <tr>
          <td>_GRECAPTCHA</td>
          <td>Needed to generate contact requests</td>
          <td>6 months</td>
        </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default CookiesPolicy;