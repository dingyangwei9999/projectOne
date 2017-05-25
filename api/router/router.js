var path = require('path');
var accountRouter = require('./Account.router.js');
var userRouter = require('./User.router.js');
var orderRouter = require('./Order.router.js');
var productRouter = require('./Product.router.js');
var GoodRouter = require('./GOOD.router.js');
exports.handle = function(express){
	var app = express();
	accountRouter.handle(app);
	userRouter.handle(app);
	orderRouter.handle(app);
	productRouter.handle(app);
	productRouter.photo(app);
	GoodRouter.Register(app);
	app.use(express.static(path.join(path.resolve(__dirname, '../../'), '/')));

	app.listen(8080);
}