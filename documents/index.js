module.exports = (jokes) => {
    return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style> 
          .box {
              display: block;
              font-size: x-large;
              color: midnightblue;
              margin: 4%;
          }
          .joke {
              line-height: 35px;
          }
          </style>
       </head>
       <body>
          <div class="box">
             <div class="joke">${jokes}</div>
          </div>
       </body>
    </html>
    `;
}