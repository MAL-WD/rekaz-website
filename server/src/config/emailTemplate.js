const getEmailHTML = ({ tag, title, fields, message }) => {
  const fieldsHTML = fields
    .map(
      (f) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #f5f5f7; font-size: 14px; font-weight: 600; color: #636363; width: 35%; vertical-align: top;">${f.label}</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #f5f5f7; font-size: 14px; color: #010212; width: 65%; vertical-align: top;">${f.value || 'N/A'}</td>
      </tr>
    `
    )
    .join('');

  const messageHTML = message
    ? `
      <div style="margin-top: 30px;">
        <h3 style="font-size: 15px; font-weight: 700; color: #010212; margin-bottom: 10px;">Message / Notes:</h3>
        <div style="background-color: #fafafa; border: 1px solid #e0e0e0; border-radius: 14px; padding: 20px; font-size: 14px; line-height: 1.6; color: #292929; white-space: pre-wrap;">${message}</div>
      </div>
    `
    : '';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
    </head>
    <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #fbfaff; color: #292929; margin: 0; padding: 0; -webkit-font-smoothing: antialiased;">
      <div style="width: 100%; background-color: #fbfaff; padding: 40px 20px; box-sizing: border-box;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 28px; overflow: hidden; box-shadow: 0 10px 30px rgba(4, 18, 250, 0.04); border: 1px solid #e0e0e0;">
          <!-- Brand Top Accent Bar (Rekaz Gradient) -->
          <div style="height: 6px; background: linear-gradient(90deg, #00a5ff 0%, #0412fa 100%);"></div>
          
          <!-- Header -->
          <div style="padding: 30px 40px; background-color: #ffffff; border-bottom: 1px solid #f0f0f0;">
            <table style="width: 100%;">
              <tr>
                <td>
                  <h1 style="font-size: 24px; font-weight: 700; color: #010212; letter-spacing: -0.5px; margin: 0; font-family: 'Satoshi', sans-serif;">Rekaz</h1>
                  <div style="display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #0412fa; background-color: rgba(4, 18, 250, 0.06); padding: 4px 10px; border-radius: 9999px; margin-top: 8px;">${tag}</div>
                </td>
              </tr>
            </table>
          </div>

          <!-- Content Body -->
          <div style="padding: 40px;">
            <h2 style="font-size: 22px; font-weight: 700; color: #010212; margin-top: 0; margin-bottom: 25px; letter-spacing: -0.3px;">${title}</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              ${fieldsHTML}
            </table>

            ${messageHTML}
          </div>

          <!-- Footer -->
          <div style="padding: 30px 40px; background-color: #010212; color: #fafafa; text-align: center; font-size: 12px; font-weight: 500;">
            <p style="margin: 0 0 8px 0; color: #757575;">This is an automated notification from Rekaz Institute.</p>
            <p style="margin: 0;">&copy; 2026 <a href="https://rekaz.dz" style="color: #00a5ff; text-decoration: none; font-weight: 600;">Rekaz Institute</a>. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = { getEmailHTML };
