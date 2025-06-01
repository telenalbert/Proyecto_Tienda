const express = require("express");
const app     = express(); 
const PORT    = 3000

app.use(express.json())

app.use('/category', require('./routes/category'));
app.use('/product', require('./routes/product'));
app.use('/order', require('./routes/order'));
app.use('/users', require('./routes/user'));

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
}); 