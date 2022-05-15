const express = require('express');
require('./services/passport'); //nothing is exported in that file

const app = express();

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
