const express = require('express');

const app = express();

app.use('/', express.static(__dirname + '/public'));

app.get('/:time', (req, res) => {
  let time = req.params.time;
  console.log(time);
  console.log(typeof time);
  if (!isNaN(time)) {
    console.log("time is a number");
    const unix = time;
    const natural = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(unix);

    res.send({
      unix,
      natural
    });
  } else if (Date.parse(time)) {

    res.send({
      unix: Date.parse(time),
      natural: new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
        }).format(Date.parse(time))
    });
  } else {
    res.send({
      unix: null,
      natural: null
    })
  }
});


app.listen(process.env.PORT || 3000, () => {
  console.log(`Started server`);
});
